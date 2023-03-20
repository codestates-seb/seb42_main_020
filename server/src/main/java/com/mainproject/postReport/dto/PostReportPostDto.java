package com.mainproject.postReport.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class PostReportPostDto {

    @NotBlank(message = "신고 사유는 공백이 아니어야 합니다.")
    private String reason;

    @NotBlank(message = "신고 내용은 공백이 아니어야 합니다.")
    private String content;
}
