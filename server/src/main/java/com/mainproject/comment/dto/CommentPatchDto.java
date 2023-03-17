package com.mainproject.comment.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class CommentPatchDto {

    @NotBlank(message = "내용을 입력하세요.")
    private String content;

}
