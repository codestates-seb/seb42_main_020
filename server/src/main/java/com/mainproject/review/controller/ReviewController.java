package com.mainproject.review.controller;

import com.mainproject.review.dto.ReviewPatchDto;
import com.mainproject.review.dto.ReviewPostDto;
import com.mainproject.review.dto.ReviewResponseDto;
import com.mainproject.review.entity.Review;
import com.mainproject.review.mapper.ReviewMapper;
import com.mainproject.review.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    private final ReviewMapper reviewMapper;

    // 페이징 조회

    // 단일 조회
    @GetMapping("/{review-id}")
    public ResponseEntity<ReviewResponseDto> getPost(@PathVariable("review-id") @Positive Long reviewId){

        Review review = reviewService.getReview(reviewId);
        ReviewResponseDto reviewResponseDto = reviewMapper.reviewToReviewResponseDto(review);

        return new ResponseEntity<>(reviewResponseDto, HttpStatus.OK);
    }

    // 글 작성
    @PostMapping("/review")
    public ResponseEntity createReview(@RequestBody @Valid ReviewPostDto reviewDto, @RequestParam Long memberId) {

        Review review = reviewMapper.reviewPostDtoToReview(reviewDto);
        Long reviewId = reviewService.createReview(review, memberId);

        return new ResponseEntity<>(reviewId, HttpStatus.OK);
    }


    // 글 수정
    @PatchMapping("/{review-id}")
    public ResponseEntity updatePost(@PathVariable("review-id") @Positive Long reviewId,
                                     @RequestBody @Valid ReviewPatchDto patchDto){

        Review updatedReview = reviewMapper.reviewPatchDtoToReview(patchDto);
        reviewService.updateReview(updatedReview, reviewId);

        return new ResponseEntity<>(reviewId, HttpStatus.OK);
    }


    // 글 삭제
    @DeleteMapping("/{review-id}")
    public ResponseEntity deletePost(@PathVariable("review-id") @Positive Long reviewId){

        reviewService.deleteReview(reviewId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
