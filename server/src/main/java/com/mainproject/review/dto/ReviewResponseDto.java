package com.mainproject.review.dto;

import com.mainproject.review.entity.Review;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class ReviewResponseDto {

    private Long reviewId;

    private Long tagId;

    private Long memberId;

    private Long regionId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private Review.ReviewStatus status;


//    // 신고
//    private List<신고dto> 신고s;
//
//    // 좋아요
//    private List<조아요dto> 조아요s;
}
