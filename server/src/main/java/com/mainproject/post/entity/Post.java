package com.mainproject.post.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    // 본문
    @Column(length = 50, nullable = false)
    private String title;

    // 댓글
    @Column(length = 1000, nullable = false)
    private String content;

    // 상태
    @Enumerated(value = EnumType.STRING)
    @Column(name = "POST_STATUS", length = 30, nullable = false)
    private Post.PostStatus postStatus = PostStatus.POST_REGISTRATION;

    public enum PostStatus{
        POST_REGISTRATION("게시글 등록"),
        POST_DELETE("게시글 삭제");
    }


    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 진료과목 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Tag> tag = new ArrayList<>();

    // 지역 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Region> region = new ArrayList<>();


//    // 신고
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Report> reports = new ArrayList<>();
//
//    // 좋아요
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Like> likes = new ArrayList<>();

}
