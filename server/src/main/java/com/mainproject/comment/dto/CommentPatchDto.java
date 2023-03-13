package com.mainproject.comment.dto;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

public class CommentPatchDto {
    private Long commentId;
    @NotBlank(message = "내용을 입력하세요.")
    private String content;
    private LocalDateTime modifiedAt;


    // Getter Setter

    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(LocalDateTime modifiedAt) {
        this.modifiedAt = modifiedAt;
    }


}
