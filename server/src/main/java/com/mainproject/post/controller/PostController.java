package com.mainproject.post.controller;

import com.mainproject.post.dto.PostPatchDto;
import com.mainproject.post.dto.PostPostDto;
import com.mainproject.post.dto.PostResponseDto;
import com.mainproject.post.entity.Post;
import com.mainproject.post.mapper.PostMapper;
import com.mainproject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    private final PostMapper postMapper;

    // 페이징 조회

    // 단일 조회
    @GetMapping("/{post-id}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable("post-id") @Positive Long postId){

        Post post = postService.getPost(postId);
        PostResponseDto postResponseDto = postMapper.postToPostResponseDto(post);

        return new ResponseEntity<>(postResponseDto, HttpStatus.OK);

    }


    // 글 작성
    @PostMapping("/post")
    public ResponseEntity createPost(@RequestBody @Valid PostPostDto postDto, @RequestParam Long memberId) {

        Post post = postMapper.postPostDtoToPost(postDto);
        Long postId = postService.createPost(post, memberId);

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }


    // 글 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") @Positive Long postId,
                                     @RequestBody @Valid PostPatchDto patchDto){

        Post updatedPost = postMapper.postPatchDtoToPost(patchDto);
        postService.updatePost(updatedPost, postId);

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }


    // 글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long postId){

        postService.deletePost(postId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
