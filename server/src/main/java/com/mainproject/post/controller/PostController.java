package com.mainproject.post.controller;

import com.mainproject.global.dto.ResponseDto;
import com.mainproject.post.dto.PostPatchDto;
import com.mainproject.post.dto.PostPostDto;
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

    // 페이징 조회

    // 단일 조회
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") @Positive Long id){
        return ResponseEntity
                .status((HttpStatus.OK))
                .body(new ResponseDto(postService.getPost(id),200));
    }

    // 글 작성
    @PostMapping("/post")
    public ResponseEntity postPost(@RequestBody @Valid PostPostDto dto){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ResponseDto(postService.createPost(dto), 200));

    }

    // 글 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") @Positive Long id,
                                     @RequestBody @Valid PostPatchDto dto){
        postService.updatePost(dto, id);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(new ResponseDto(id, 200));

    }

    // 삭제 -> 상태 바꾸기로 수정해야됨
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long id){
        postService.deletePost(id);
        return ResponseEntity
                .status(HttpStatus.NO_CONTENT)
                .build();
    }


}
