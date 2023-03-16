package com.mainproject.post.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.entity.PostLike;
import com.mainproject.post.repository.PostLikeRepository;
import com.mainproject.post.repository.PostRepository;
import com.mainproject.subEntity.hospital.Hospital;
import com.mainproject.subEntity.hospital.HospitalRepository;
import com.mainproject.subEntity.medicalTag.MedicalTag;
import com.mainproject.subEntity.medicalTag.MedicalTagRepository;
import com.mainproject.subEntity.region.Region;
import com.mainproject.subEntity.region.RegionRepository;
import com.mainproject.subEntity.service.SubService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static com.mainproject.post.entity.Post.PostStatus.POST_DELETED;
import static com.mainproject.post.entity.Post.PostStatus.POST_PENDING;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private int pageSize = 20;
    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final PostLikeRepository postLikeRepository;
    private final SubService subService;
    private final HospitalRepository hospitalRepository;
    private final MedicalTagRepository medicalTagRepository;
    private final RegionRepository regionRepository;

    // 페이징 조회
    public Page<Post> findByTitleContainingAndPostStatusNot(String keyword, String status, Pageable pageable) {
        return postRepository.findByTitleContainingAndPostStatusNot(keyword, status, pageable);
    }

    public Page<Post> findByTitleContainingAndPostStatusIn(String keyword, List<String> status, Pageable pageable) {
        return postRepository.findByTitleContainingAndPostStatusIn(keyword, status, pageable);
    }

    public Page<Post> findByContentContainingAndPostStatusNot(String keyword, String status, Pageable pageable) {
        return postRepository.findByContentContainingAndPostStatusNot(keyword, status, pageable);
    }

    public Page<Post> findByContentContainingAndPostStatusIn(String keyword, List<String> status, Pageable pageable) {
        return postRepository.findByContentContainingAndPostStatusIn(keyword, status, pageable);
    }

    public Page<Post> findByMember_memberIdAndPostStatusNot(Long memberId, String status, Pageable pageable) {
        return postRepository.findByMember_memberIdAndPostStatusNot(memberId, status, pageable);
    }

    public Page<Post> findByMedicalTag_medicalTagIdAndPostStatusNot(Long medicalTagId, String status, Pageable pageable) {
        return postRepository.findByMedicalTag_medicalTagIdAndPostStatusNot(medicalTagId, status, pageable);
    }

    public Page<Post> findByRegion_regionIdAndPostStatusNot(Long regionId, String status, Pageable pageable) {
        return postRepository.findByRegion_regionIdAndPostStatusNot(regionId, status, pageable);
    }

    public Page<Post> findQuestions(int page, String titleKeyword, String contentKeyword, String sortType, int filterType, String medicalTagTitle, String regionName) {

        PageRequest pageRequest = PageRequest.of(page, pageSize, Sort.by(sortType).descending());
        List<Post.PostStatus> status = Arrays.asList(POST_PENDING, POST_DELETED);

        if(filterType == 1) {
            return postRepository.findByTitleContainingAndContentContainingAndPostStatusNotIn(titleKeyword, contentKeyword, status, pageRequest);
        } else if(filterType == 2) {
            return postRepository.findByTitleContainingAndContentContainingAndPostStatusNotInAndPostType(titleKeyword, contentKeyword, status, "question", pageRequest);
        } else if(filterType == 3) {
            return postRepository.findByTitleContainingAndContentContainingAndPostStatusNotInAndPostType(titleKeyword, contentKeyword, status, "review", pageRequest);
        } else if (filterType == 4) {
            return postRepository.findByTitleContainingAndContentContainingAndPostStatusNotInAndMedicalTag_title(titleKeyword, contentKeyword, status, medicalTagTitle, pageRequest);
        } else if (filterType == 5) {
            return postRepository.findByTitleContainingAndContentContainingAndPostStatusNotInAndRegion_name(titleKeyword, contentKeyword, status, regionName, pageRequest);
        }
        throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
    }

    // 단일 조회
    public Post findPost(Long postId){

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
    public Long createReview(Post post, String email, String hospitalName, String medicalTitle, String regionName, MultipartFile img) throws IOException{

        Member member = memberService.findMemberByEmail(email);
        Hospital hospital = subService.findHospital(hospitalName);
        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);
        byte[] imgByte = convertMultipartFileToByte(img);

        if (member.getIsDoctor() == true) {
            throw new BusinessLogicException(ExceptionCode.DOCTOR_CANNOT_POST);
        }

        post.setHospital(hospital);
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
        if(member.getMemberId() != post.getMember().getMemberId()) throw new BusinessLogicException(ExceptionCode.NOT_POSTS_MEMBER);

        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);

        Post findPost = findVerifiedPost(postId);

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

        post.setModifiedAt(LocalDateTime.now());
        post.setPostStatus(POST_DELETED);

        postRepository.save(post);
    }

    // 리뷰글 등록 승인
    public void approveReview(long postId) {

        // 관리자 검증 필요

        Post post = findPendingPost(postId);

        post.setPostStatus(Post.PostStatus.POST_REGISTERED);
    }

    // 좋아요 기능
    public void addLike(long postId, String email, Integer like) {

        Member member = memberService.findMemberByEmail(email);
        Post post = findVerifiedPost(postId);

        verifyExistsLike(member, post);

        postLikeRepository.save(post.addLike(new PostLike(post, member, like)));
    }

    // 좋아요 여부 검증
    private void verifyExistsLike(Member member, Post post)  {

        Optional<PostLike> like = postLikeRepository.findByMemberAndPost(member, post);
        if (like.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }
    }

    // 삭제, 승인대기인 게시글 검증
    private Post findVerifiedPost(long postId) {

        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        if(findPost.getPostStatus() == POST_DELETED ) {
            throw new BusinessLogicException(ExceptionCode.POST_DELETED);
        } else if (findPost.getPostStatus() == POST_PENDING) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_APPROVED);
        }

        return findPost;
    }

    // 승인대기중인 게시글 찾기
    private Post findPendingPost(long postId) {

        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        if(findPost.getPostStatus() != POST_PENDING) throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);

        return findPost;
    }

    private byte[] convertMultipartFileToByte(MultipartFile multipartFile) throws IOException {
        return multipartFile.getBytes();
    }
}
