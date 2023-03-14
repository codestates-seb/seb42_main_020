package com.mainproject.review.mapper;

import com.mainproject.review.dto.ReviewPatchDto;
import com.mainproject.review.dto.ReviewPostDto;
import com.mainproject.review.dto.ReviewResponseDto;
import com.mainproject.review.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface ReviewMapper {

    Review reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    Review reviewPatchDtoToReview(ReviewPatchDto reviewPatchDto);
    ReviewResponseDto reviewToReviewResponseDto(Review review);
    Review reviewResponseDtoToReview(ReviewResponseDto reviewResponseDto);
}
