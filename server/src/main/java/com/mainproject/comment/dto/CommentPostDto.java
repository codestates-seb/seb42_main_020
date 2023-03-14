package com.mainproject.comment.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentPostDto {

    @NotBlank(message = "내용을 입력하세요.")
    private String content;
    public LocalDateTime createdAt;
    private LocalDateTime modifiedAt;


    // Getter Setter

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
    }
}
