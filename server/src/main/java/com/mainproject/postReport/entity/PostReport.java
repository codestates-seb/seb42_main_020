package com.mainproject.postReport.entity;

import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class PostReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postReportId;

    @Column(name = "REASON",columnDefinition = "TEXT", nullable = false)
    private String reason;

    @Column(name = "CONTENT",columnDefinition = "TEXT", nullable = false)
    private String content;

    private LocalDateTime createdAt;

    // post 클래스 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    // member 클래스 n:1 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
}
