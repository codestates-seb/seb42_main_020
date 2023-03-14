package com.mainproject.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    NOT_IMPLEMENTATION(501, "Not Implementation"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    DOCTOR_NOT_FOUND(404, "Doctor not found"),
    DOCTOR_EXISTS(409, "Doctor exists"),
    INVALID_DOCTOR_STATUS(400, "Invalid Doctor status"),
    MEMBER_ALREADY_VOTED(400, "Member already voted"),
    NOT_RESOURCE_OWNER(400, "Not resource owner"),
    POST_NOT_FOUND(404, "Post not found");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
