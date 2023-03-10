package com.mainproject.post.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostPostDto {

    // 제목
    @NotBlank(message = "제목은 공백이 아니어야 합니다.")
    private String title;

    // 본문
    @NotBlank(message = "내용은 공백이 아니어야 합니다.")
    private String content;

    // 진료과목

    // 지역

}
