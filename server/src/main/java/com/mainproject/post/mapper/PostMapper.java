package com.mainproject.post.mapper;

import com.mainproject.post.dto.*;
import com.mainproject.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    // 게시글 매핑
    Post postPostDtoToPost(PostPostDto postPostDto);
    Post postPatchDtoToPost(PostPatchDto postPatchDto);

    @Mapping(target = "medicalTagTitle", source = "post.medicalTag.title")
    @Mapping(target = "regionName", source = "post.region.name")
    @Mapping(target = "writerResponse", source = "post.member")
    PostResponseDto postToPostResponseDto(Post post);

    List<PostResponseDto> postsToPostsResponseDto(List<Post> posts);

    // 리뷰글 매핑
    Post reviewPostDtoToReview(ReviewPostDto reviewPostDto);

    @Mapping(target = "medicalTagTitle", source = "review.medicalTag.title")
    @Mapping(target = "regionName", source = "review.region.name")
    @Mapping(target = "hospitalName", source = "review.hospital.name")
    @Mapping(target = "writerResponse", source = "review.member")
    ReviewResponseDto reviewToReviewResponseDto(Post review);

    List<ReviewResponseDto> reviewsToReviewsResponseDto(List<Post> reviews);

    // 마이페이지 매핑
    @Mapping(target = "medicalTagTitle", source = "post.medicalTag.title")
    @Mapping(target = "regionName", source = "post.region.name")
    @Mapping(target = "hospitalName", source = "post.hospital.name")
    PostResponseMyPageInfo postToMyPageInfo(Post post);

    List<PostResponseMyPageInfo> postsToMyPageInfos(List<Post> posts);
}
