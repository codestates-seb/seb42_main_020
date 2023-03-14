package com.mainproject.comment.mapper;

import com.mainproject.comment.dto.CommentPatchDto;
import com.mainproject.comment.dto.CommentPostDto;
import com.mainproject.comment.dto.CommentResponseDto;
import com.mainproject.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);
    CommentResponseDto commentToCommentResponseDto(Comment comment);
}
