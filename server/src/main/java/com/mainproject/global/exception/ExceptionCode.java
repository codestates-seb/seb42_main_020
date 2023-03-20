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
    MEMBER_ALREADY_REPORTED(400, "Member already reported"),

    POST_NOT_FOUND(404, "Post not found"),
    REVIEW_NOT_FOUND(404, "Review not found"),
    POST_DELETED(404, "Post deleted"),
    POST_NOT_APPROVED(400, "Post not approved"),
    CANNOT_ACCEPT_COMMENT(400, "Cannot accept comment"),
    DOCTOR_CANNOT_POST(400, "Doctor cannot post"),

    NOT_COMMENTS_MEMBER(400, "Not comment's member"),
    NOT_POSTS_MEMBER(400, "Not post's member"),
    POST_NOT_CHANGED(400, "Post not changed"),
    COMMENT_NOT_CHANGED(400, "Comment not changed"),
    NOT_RESOURCE_OWNER(400, "Not resource owner"),
    HOSPITAL_NOT_FOUND(404, "Hospital not found");


    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
