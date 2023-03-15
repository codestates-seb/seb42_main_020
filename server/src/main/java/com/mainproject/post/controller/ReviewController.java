package com.mainproject.post.controller;

import com.mainproject.post.dto.ReviewPostDto;
import com.mainproject.post.entity.Post;
import com.mainproject.post.mapper.PostMapper;
import com.mainproject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/reviews")
public class ReviewController {

    private final PostService postService;
    private final PostMapper postMapper;

    // 글 작성
    @PostMapping
    public ResponseEntity createReview(@RequestBody @Valid ReviewPostDto reviewDto, @RequestParam Long memberId) {

        Post review = postMapper.reviewPostDtoToReview(reviewDto);
        Long reviewId = postService.createReview(review, memberId, reviewDto.getHospitalName(), reviewDto.getMedicalTagTitle(), reviewDto.getRegionName());

        return new ResponseEntity<>(reviewId, HttpStatus.OK);
    }

    @PatchMapping("/{post-id}")
    public ResponseEntity approveReview(@PathVariable("post-id") long postId) {

        postService.approveReview(postId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
