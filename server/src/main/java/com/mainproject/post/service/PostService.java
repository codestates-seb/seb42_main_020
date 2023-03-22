package com.mainproject.post.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.entity.PostLike;
import com.mainproject.post.repository.PostLikeRepository;
import com.mainproject.post.repository.PostRepository;
import com.mainproject.subEntity.medicalTag.MedicalTag;
import com.mainproject.subEntity.region.Region;
import com.mainproject.subEntity.service.SubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import static com.mainproject.post.entity.Post.PostStatus.*;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberService memberService;
    private final PostLikeRepository postLikeRepository;
    private final SubService subService;

    // 페이징 조회
    public Page<Post> findQuestions(int filterType, String keyword, String postType, String medicalTag, String region, List<Post.PostStatus> status, Pageable pageable) {

        if (filterType == 1) {
            return postRepository.findByTitleContainingAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn
                    (keyword, postType, medicalTag, region, status, pageable); // 제목으로 검색
        } else if(filterType == 2) {
            return postRepository.findByContentContainingAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn
                    (keyword, postType, medicalTag, region, status, pageable); // 내용으로 검색
        } else if (filterType == 3) {
            return postRepository.findByMember_displayNameAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn
                    (keyword, postType, medicalTag, region, status, pageable); // 작성자로 검색
        } else if (filterType == 4) {
            return postRepository.findByTitleContainingAndContentContainingAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn
                    (keyword, keyword, postType, medicalTag, region, status, pageable); // 제목 + 내용 검색
        }
        throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
    }

    /*public Page<Post> findQuestions(int page, String titleKeyword, String sortType, int filterType, String medicalTagTitle, String regionName) {

        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.by(sortType).descending());
        List<Post.PostStatus> status = Arrays.asList(POST_PENDING, POST_DELETED);

        if(filterType == 1) {
            return postRepository.findByTitleContainingAndPostStatusNotIn(titleKeyword, status, pageRequest);
        } else if(filterType == 2) {
            return postRepository.findByTitleContainingAndPostStatusNotInAndPostType(titleKeyword, status, "question", pageRequest);
        } else if(filterType == 3) {
            return postRepository.findByTitleContainingAndPostStatusNotInAndPostType(titleKeyword, status, "review", pageRequest);
        } else if (filterType == 4) {
            return postRepository.findByTitleContainingAndPostStatusNotInAndRegion_name(titleKeyword, status, regionName, pageRequest);
        } else if (filterType == 5) {
            return postRepository.findByTitleContainingAndPostStatusNotInAndMedicalTag_title(titleKeyword, status, medicalTagTitle, pageRequest);
        }
        throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
    }*/

    // 단일 조회
    public Post findPost(Long postId) {

        Post post = findVerifiedPost(postId);

        return post;
    }

    // 게시글 작성
    public Long createPost(Post post, String email, String medicalTitle, String regionName) {

        Member member = memberService.findMemberByEmail(email);
        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);

        if (member.getIsDoctor() == true) {
            throw new BusinessLogicException(ExceptionCode.DOCTOR_CANNOT_POST);
        }

        // 포인트 수정
        member.setPoint(member.getPoint() + 5);
        memberService.updateRating(member);

        post.setMedicalTag(medicalTag);
        post.setRegion(region);
        post.setMember(member);
        post.setPostType("question");
        post.setPostStatus(Post.PostStatus.POST_REGISTERED);
        post.setCreatedAt(LocalDateTime.now());
        post.setModifiedAt(LocalDateTime.now());

        postRepository.save(post);

        return post.getPostId();
    }

    // 리뷰글 작성
    public Long createReview(Post post, String email, String medicalTitle, String regionName, MultipartFile img) throws IOException{

        Member member = memberService.findMemberByEmail(email);
        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);
        byte[] imgByte = convertMultipartFileToByte(img);

        if (member.getIsDoctor()) {
            throw new BusinessLogicException(ExceptionCode.DOCTOR_CANNOT_POST);
        }

        post.setMedicalTag(medicalTag);
        post.setRegion(region);
        post.setMember(member);
        post.setPostType("review");
        post.setPostStatus(POST_PENDING);
        post.setCreatedAt(LocalDateTime.now());
        post.setModifiedAt(LocalDateTime.now());
        post.setReceipt(imgByte);

        postRepository.save(post);

        return post.getPostId();
    }

    // 게시글 수정
    public void updatePost(Post post, Long postId, String email, String medicalTitle, String regionName){

        // 본인 검증
        Member member = memberService.findMemberByEmail(email);
        Post findPost = findVerifiedPost(postId);
        if(member.getMemberId() != findPost.getMember().getMemberId()) throw new BusinessLogicException(ExceptionCode.NOT_POSTS_MEMBER);

        if(post.getPostStatus() == POST_ACCEPTED) throw new BusinessLogicException(ExceptionCode.POST_ACCEPTED);

        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);

        findPost.setTitle(post.getTitle());
        findPost.setContent(post.getContent());
        findPost.setMedicalTag(medicalTag);
        findPost.setRegion(region);
        findPost.setModifiedAt(LocalDateTime.now());

        postRepository.save(findPost);
    }

    // 글 삭제
    public void deletePost(Long postId, String email){

        // 본인 검증
        Member member = memberService.findMemberByEmail(email);
        Post post = findVerifiedPost(postId);

        if(member.getMemberId() != post.getMember().getMemberId()) throw new BusinessLogicException(ExceptionCode.NOT_POSTS_MEMBER);

        if(post.getPostStatus() == POST_ACCEPTED) throw new BusinessLogicException(ExceptionCode.POST_ACCEPTED);

        post.setModifiedAt(LocalDateTime.now());
        post.setPostStatus(POST_DELETED);

        postRepository.save(post);
    }

    // 리뷰글 등록 승인
    public void approveReview(long postId) {

        // 관리자 검증 필요

        Post post = findPendingPost(postId);

        if(post.getHospital() == null) throw new BusinessLogicException(ExceptionCode.CANNOT_APPROVE_POST);

        subService.updateHospitalGrade(post.getHospital().getHospitalId(), post.getStarRating());

        // 포인트 수정
        Member memberForPoint = post.getMember();
        memberForPoint.setPoint(memberForPoint.getPoint() + 10);
        memberService.updateRating(memberForPoint);

        post.setMember(memberForPoint);
        post.setPostStatus(Post.PostStatus.POST_REGISTERED);

        postRepository.save(post);
    }

    // 좋아요 기능
    public void addLike(long postId, String email) {

        Member member = memberService.findMemberByEmail(email);
        Post post = findVerifiedPost(postId);

        if(member == post.getMember()) throw new BusinessLogicException(ExceptionCode.CANNOT_LIKE_MYSELF);

        // 포인트 수정
        Member memberForPoint = post.getMember();
        memberForPoint.setPoint(memberForPoint.getPoint() + 1);
        memberService.updateRating(memberForPoint);

        verifyExistsLike(member, post);

        postLikeRepository.save(post.addLike(new PostLike(post, member)));
    }

    // 좋아요 여부 검증
    private void verifyExistsLike(Member member, Post post) {

        Optional<PostLike> like = postLikeRepository.findByMemberAndPost(member, post);
        if (like.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }
    }

    // 삭제, 승인대기인 게시글 검증
    private Post findVerifiedPost(long postId) {

        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        if (findPost.getPostStatus() == POST_DELETED) {
            throw new BusinessLogicException(ExceptionCode.POST_DELETED);
        } else if (findPost.getPostStatus() == POST_PENDING) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_APPROVED);
        }

        return findPost;
    }

    // 승인 대기중인 게시글 찾기(관리자)
    public Post findPendingPost(long postId) {

        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        if (findPost.getPostStatus() != POST_PENDING) throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);

        return findPost;
    }

    // 승인 대기중인 리뷰글 조회(관리자)
    public List<Post> findPendingReviews() {
        return postRepository.findByPostStatus(POST_PENDING);
    }

    // multipartFile -> byte 변환
    private byte[] convertMultipartFileToByte(MultipartFile multipartFile) throws IOException {
        return multipartFile.getBytes();
    }
}
