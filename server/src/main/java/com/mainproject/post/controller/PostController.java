package com.mainproject.post.controller;

import com.mainproject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("/posts")
@Validated
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

//    // 생성
//    @PostMapping("/ask")
//    public ResponseEntity postPost(@RequestBody @Valid PostPostDto dto){
//        return ResponseEntity.status(HttpStatus.CREATED)
//    }
}
