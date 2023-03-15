package com.mainproject.comment.dto;

import com.mainproject.comment.entity.Comment;
import com.mainproject.member.dto.WriterResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentResponseDto {

    private long commentId;
    private String content;
    private LocalDateTime createdAt;
    /*private Integer likes;*/
    private Comment.CommentStatus commentStatus;
    private WriterResponse writerResponse;
}
