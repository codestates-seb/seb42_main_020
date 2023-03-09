package com.mainproject.review.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 진료과목 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Tag> tag = new ArrayList<>();

    // 지역 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Region> region = new ArrayList<>();

    // 병원 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Hospital> hospital = new ArrayList<>();

    // 본문
    @Column(length = 50, nullable = false)
    private String title;

    // 댓글
    @Column(length = 1000, nullable = false)
    private String content;

    // 상태

    // 영수증

    // 신고

    // 좋아요

}