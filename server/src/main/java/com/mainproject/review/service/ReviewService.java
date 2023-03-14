package com.mainproject.review.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import com.mainproject.review.entity.Review;
import com.mainproject.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;

    private final MemberRepository memberRepository;

    // 페이징 조회

    // 단일 조회
    public Review getReview(Long reviewId){

        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        return existingReview;
    }


    // 글 작성
    public Long createReview(Review review, Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        review.setMember(member);
        review.setTitle(review.getTitle());
        review.setContent(review.getContent());
//        review.setTagId(review.getTagId());
//        review.setRegionId(review.getRegionId());

        reviewRepository.save(review);

        return review.getReviewId();
    }


    // 글 수정
    public void updateReview(Review review, Long reviewId){

        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        existingReview.setTitle(review.getTitle());
        existingReview.setContent(review.getContent());
//        existingReview.setTagId(review.getTagId());
//        existingReview.setRegionId(review.getRegionId());

        reviewRepository.save(existingReview);
    }


    // 글 삭제
    public void deleteReview(Long reviewId){

        Review existingReview = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.REVIEW_NOT_FOUND));

        existingReview.setModifiedAt(LocalDateTime.now());
        existingReview.setReviewStatus(Review.ReviewStatus.REVIEW_DELETED);

        reviewRepository.save(existingReview);
    }
}
