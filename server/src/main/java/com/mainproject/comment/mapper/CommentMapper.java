package com.mainproject.comment.mapper;

import com.mainproject.comment.dto.CommentPatchDto;
import com.mainproject.comment.dto.CommentPostDto;
import com.mainproject.comment.dto.CommentResponseDto;
import com.mainproject.comment.dto.CommentResponseDtoDoctorInfo;
import com.mainproject.comment.entity.Comment;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentMapper {

    Comment commentPostDtoToComment(CommentPostDto commentPostDto);
    Comment commentPatchDtoToComment(CommentPatchDto commentPatchDto);

    @Mapping(target = "writerResponse", source = "comment.member")
    CommentResponseDto commentToCommentResponseDto(Comment comment);

    List<CommentResponseDto> commentsToCommentsResponseDto(List<Comment> comments);

    CommentResponseDtoDoctorInfo commentToDoctorInfo(Comment comment);
}
