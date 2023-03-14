package com.mainproject.post.mapper;

import com.mainproject.post.dto.*;
import com.mainproject.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    // 게시글 매핑
    Post postPostDtoToPost(PostPostDto postPostDto);
    Post postPatchDtoToPost(PostPatchDto postPatchDto);

    PostResponseDto postToPostResponseDto(Post post);

    // 리뷰글 매핑
    Post reviewPostDtoToReview(ReviewPostDto reviewPostDto);
    ReviewResponseDto reviewToReviewResponseDto(Post review);

    // 마이페이지 매핑
    /*PostResponseMyPageInfo postToMyPageInfo(Post post);*/
}
