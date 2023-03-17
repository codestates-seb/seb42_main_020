package com.mainproject.comment.dto;

import com.mainproject.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class CommentResponseDtoDoctorInfo {

    private long commentId;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Comment.CommentStatus commentStatus;
    private Integer totalLike;
}
