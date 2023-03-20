package com.mainproject.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentPatchDto {

    @NotBlank(message = "내용을 입력하세요.")
    private String content;
}
