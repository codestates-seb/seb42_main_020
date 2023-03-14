package com.mainproject.post.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class PostService {

    private final PostRepository postRepository;

    private final MemberRepository memberRepository;


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
}
