package com.mainproject.member_comment.entity;

import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;

@Entity
@Getter
@Setter
public class MemberComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    private Long commentId;

    // 댓글 본문
    @Column(length = 50, nullable = false)
    private String content;

    // 생성 시간
    @Column(name = "created_at", columnDefinition = "DATETIME")
    private LocalDateTime createdAt;

    // 수정 시간
    @Column(name = "modified_at", columnDefinition = "DATETIME")
    private LocalDateTime modifiedAt;

    // 상태

    // ----------------------------------- 연관관계 매핑 ----------------------------------- //

    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("member_id")
    private Member member;

    // 게시글 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("post_id")
    private Post post;

    // 좋아요 1:n
    @OneToMany(fetch = FetchType.LAZY)
    private List<Like> likes = new ArrayList<>();

    // 신고 1:n
    @OneToMany(fetch = FetchType.LAZY)
    private List<Report> reports = new ArrayList<>();
}
