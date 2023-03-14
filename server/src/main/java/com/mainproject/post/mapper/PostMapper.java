package com.mainproject.post.mapper;

import com.mainproject.post.dto.PostPatchDto;
import com.mainproject.post.dto.PostPostDto;
import com.mainproject.post.dto.PostResponseDto;
import com.mainproject.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostMapper {

    Post postPostDtoToPost(PostPostDto postPostDto);
    Post postPatchDtoToPost(PostPatchDto postPatchDto);
    PostResponseDto postToPostResponseDto(Post post);
    Post postResponseDtoToPost(PostResponseDto postResponseDto);

}
