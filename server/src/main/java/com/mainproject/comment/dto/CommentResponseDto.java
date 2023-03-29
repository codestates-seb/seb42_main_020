package com.mainproject.comment.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mainproject.comment.entity.Comment;
import com.mainproject.member.dto.WriterResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class CommentResponseDto {

    private long commentId;
    private String content;
    private LocalDateTime createdAt;
    private Integer totalLike;
    private Comment.CommentStatus commentStatus;
    private WriterResponse writerResponse;
}
