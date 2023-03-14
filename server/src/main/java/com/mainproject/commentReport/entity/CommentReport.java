package com.mainproject.commentReport.entity;

import com.mainproject.comment.entity.Comment;
import com.mainproject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class CommentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentReportId;

    @Column(name = "REASON",columnDefinition = "TEXT", nullable = false)
    private String reason;

    @Column(name = "CONTENT",columnDefinition = "TEXT", nullable = false)
    private String content;

    private LocalDateTime createdAt;

    // post 클래스 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "COMMENT_ID")
    private Comment comment;

    // member 클래스 n:1 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
