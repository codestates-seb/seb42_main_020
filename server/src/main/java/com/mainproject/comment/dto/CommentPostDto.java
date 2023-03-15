package com.mainproject.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentPostDto {

    @NotBlank(message = "내용을 입력하세요.")
    private String content;
}
