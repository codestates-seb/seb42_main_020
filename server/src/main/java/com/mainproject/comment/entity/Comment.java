package com.mainproject.comment.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    private Long commentId;

    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("member_id")
    private Member member;

    // 게시글 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("post_id")
    private Post post;

    // 댓글 본문
    @Column(length = 50, nullable = false)
    private String content;

    // 생성 시간

    // 수정 시간

    // 상태

    // 신고

    // 좋아요
}
