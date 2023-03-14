package com.mainproject.commentReport.dto;

import javax.validation.constraints.NotBlank;

public class CommentReportPostDto {

    @NotBlank(message = "신고 사유는 공백이 아니어야 합니다.")
    private String reason;

    @NotBlank(message = "신고 내용은 공백이 아니어야 합니다.")
    private String content;
}
