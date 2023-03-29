package com.mainproject.global.exception;

import lombok.Getter;

public enum ExceptionCode {
    MEMBER_NOT_FOUND(404, "Member not found"),
    MEMBER_EXISTS(409, "Member exists"),
    DOCTOR_NOT_FOUND(404, "Doctor not found"),
    INVALID_MEMBER_STATUS(400, "Invalid member status"),
    MEMBER_ALREADY_VOTED(400, "Member already voted"),
    MEMBER_ALREADY_REPORTED(400, "Member already reported"),
    CANNOT_APPROVE_MEMBER(400, "Cannot approve member"),
    CANNOT_APPROVE_POST(400, "Cannot approve post"),
    EXPIRED_TOKEN(401, "This is expired token!"),

    POST_NOT_FOUND(404, "Post not found"),
    POST_DELETED(404, "Post deleted"),
    POST_NOT_APPROVED(400, "Post not approved"),
    CANNOT_ACCEPT_COMMENT(400, "Cannot accept comment"),
    DOCTOR_CANNOT_POST(400, "Doctor cannot post"),
    POST_ACCEPTED(400, "Post accepted"),
    COMMENT_ACCEPTED(400, "Comment accepted"),
    CANNOT_LIKE_MYSELF(400, "Cannot like myself"),
    CANNOT_COMMENT_MYSELF(400, "Cannot comment myself"),

    NOT_COMMENTS_MEMBER(400, "Not comment's member"),
    NOT_POSTS_MEMBER(400, "Not post's member"),
    POST_NOT_CHANGED(400, "Post not changed"),
    COMMENT_NOT_CHANGED(400, "Comment not changed"),
    NOT_RESOURCE_OWNER(400, "Not resource owner"),
    HOSPITAL_NOT_FOUND(404, "Hospital not found"),
    INVALID_PASSWORD_FORMAT(400,"Invalid password format");



    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }
}
