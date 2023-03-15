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
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;
    private final MemberRepository memberRepository;
    private final MemberService memberService;
    private final PostLikeRepository postLikeRepository;
    private final SubService subService;
    private final HospitalRepository hospitalRepository;
    private final MedicalTagRepository medicalTagRepository;
    private final RegionRepository regionRepository;

    // 페이징 조회

    // 단일 조회
    public Post findPost(Long postId){

        Post post = findVerifiedPost(postId);

       return post;
    }

    // 게시글 작성
    public Long createPost(Post post, Long memberId, String medicalTitle, String regionName) {

        // 로그인 검증 필요

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);

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
    public Long createReview(Post post, Long memberId, String hospitalName, String medicalTitle, String regionName) {

        // 로그인 검증 필요

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        Hospital hospital = subService.findHospital(hospitalName);
        MedicalTag medicalTag = subService.findMedicalTag(medicalTitle);
        Region region = subService.findRegion(regionName);

        post.setHospital(hospital);
        post.setMedicalTag(medicalTag);
        post.setRegion(region);
        post.setMember(member);
        post.setPostType("review");
        post.setPostStatus(Post.PostStatus.POST_PENDING);
        post.setCreatedAt(LocalDateTime.now());
        post.setModifiedAt(LocalDateTime.now());

        postRepository.save(post);

        return post.getPostId();
    }

    // 게시글 수정
    public void updatePost(Post post, Long postId, Long memberId, String medicalTitle, String regionName){

        // 본인 검증 필요

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
    public void deletePost(Long postId){

        Post post = findVerifiedPost(postId);

        post.setModifiedAt(LocalDateTime.now());
        post.setPostStatus(Post.PostStatus.POST_DELETED);

        postRepository.save(post);
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

    private Post findVerifiedPost(long postId) {

        Post findPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));
        if(findPost.getPostStatus() == Post.PostStatus.POST_DELETED ) {
            throw new BusinessLogicException(ExceptionCode.POST_DELETED);
        } else if (findPost.getPostStatus() == Post.PostStatus.POST_PENDING) {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_APPROVED);
        }

        return findPost;
    }
}
