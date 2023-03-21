package com.mainproject.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PendingReviewResponse {

    private Long postId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String hospitalName;
}
