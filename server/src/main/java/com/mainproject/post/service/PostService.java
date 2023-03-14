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


    // 페이징 조회


    // 단일 조회
    public Post getPost(Long postId){

        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

       return existingPost;
    }


    // 글 작성
    public Long createPost(Post post, Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        post.setMember(member);
        post.setTitle(post.getTitle());
        post.setContent(post.getContent());
//        post.setTagId(post.getTagId());
//        post.setRegionId(post.getRegionId());

        postRepository.save(post);

        return post.getPostId();
    }


    // 글 수정
    public void updatePost(Post post, Long postId){

        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        existingPost.setTitle(post.getTitle());
        existingPost.setContent(post.getContent());
//        existingPost.setTagId(post.getTagId());
//        existingPost.setRegionId(post.getRegionId());

        postRepository.save(existingPost);
    }


    // 글 삭제
    public void deletePost(Long postId){

        Post existingPost = postRepository.findById(postId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        existingPost.setModifiedAt(LocalDateTime.now());
        existingPost.setPostStatus(Post.PostStatus.POST_DELETED);

        postRepository.save(existingPost);
    }

    // 좋아요 기능
    public void addLike(long postId, String email, Integer like) {

        Member member = memberService.findMemberByEmail(email);
        Post post = postRepository.findById(postId).get();

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
}
