package com.mainproject.post.controller;

import com.mainproject.post.dto.ReviewPostDto;
import com.mainproject.post.entity.Post;
import com.mainproject.post.mapper.PostMapper;
import com.mainproject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/reviews")
public class ReviewController {

    private final PostService postService;
    private final PostMapper postMapper;

    // 글 작성
    @PostMapping
    public ResponseEntity createReview(@RequestPart(value = "post") ReviewPostDto reviewDto,
                                       @RequestPart(value = "img", required = false) MultipartFile img,
                                       @AuthenticationPrincipal String email) throws IOException {

        Post review = postMapper.reviewPostDtoToReview(reviewDto);

        Long reviewId = postService.createReview(review, email, reviewDto.getMedicalTagTitle(), reviewDto.getRegionName(), img);

        return new ResponseEntity<>(reviewId, HttpStatus.OK);
    }

    @PatchMapping("/{post-id}/approval")
    public ResponseEntity approveReview(@PathVariable("post-id") long postId) {

        postService.approveReview(postId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
