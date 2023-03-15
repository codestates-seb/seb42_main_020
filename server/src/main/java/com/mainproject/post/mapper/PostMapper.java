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
    PostResponseDto postToPostResponseDto(Post post);

    // 리뷰글 매핑
    Post reviewPostDtoToReview(ReviewPostDto reviewPostDto);

    @Mapping(target = "medicalTagTitle", source = "review.medicalTag.title")
    @Mapping(target = "regionName", source = "review.region.name")
    @Mapping(target = "hospitalName", source = "review.hospital.name")
    ReviewResponseDto reviewToReviewResponseDto(Post review);

    // 마이페이지 매핑
    @Mapping(target = "medicalTagTitle", source = "post.medicalTag.title")
    @Mapping(target = "regionName", source = "post.region.name")
    PostResponseMyPageInfo postToMyPageInfo(Post post);

    List<PostResponseMyPageInfo> postsToMyPageInfos(List<Post> posts);
}
