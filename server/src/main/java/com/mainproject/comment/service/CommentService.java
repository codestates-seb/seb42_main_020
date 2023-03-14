package com.mainproject.comment.service;

import com.mainproject.comment.entity.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {
    public Comment createComment(Comment comment) {
        // TODO should business logic

        // TODO member 객체는 나중에 DB에 저장 후, 되돌려 받는 것으로 변경 필요.
        Comment createdComment = comment;
        return createdComment;
    }

    public Comment updateComment(Comment comment) {
        // TODO should business logic

        // TODO member 객체는 나중에 DB에 업데이트 후, 되돌려 받는 것으로 변경 필요.
        Comment updatedComment = comment;
        return updatedComment;
    }

    public List<Comment> findComments() {
        // TODO should business logic

        // TODO member 객체는 나중에 DB에서 조회하는 것으로 변경 필요.
        List<Comment> comments = List.of(
                new Comment(1L,"2019년 12월 중국 우한에서 처음 발생한 이후 중국 전역과 전 세계로 확산된, 새로운 유형의 코로나바이러스(SARS-CoV-2)에 의한 호흡기 감염질환이다."),
                new Comment(2L, "아무 병이든 걸리면 안돼!")
        );

        return comments;
    }

    public void deleteComment(long commentId) {

    }



    // ????? 이 기능 안쓸듯 ?????
    public Comment findComment(long commentId) {
        Comment comment = new Comment(commentId,"2019년 12월 중국 우한에서 처음 발생한 이후 중국 전역과 전 세계로 확산된, 새로운 유형의 코로나바이러스(SARS-CoV-2)에 의한 호흡기 감염질환이다.");
        return null;
    }
}