package com.mainproject.comment.mapper;

import com.mainproject.comment.dto.CommentPatchDto;
import com.mainproject.comment.dto.CommentPostDto;
import com.mainproject.comment.dto.CommentResponseDto;
import com.mainproject.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostDtoToComment(CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    @Mapping(target = "memberId", source = "comment.member.memberId")
    @Mapping(target = "writerResponse", source = "comment.member")
    CommentResponseDto commentToCommentResponseDto(Comment comment);
}
