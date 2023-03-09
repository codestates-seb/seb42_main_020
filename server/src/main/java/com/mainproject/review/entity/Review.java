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
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    // 본문
    @Column(length = 50, nullable = false)
    private String title;

    // 댓글
    @Column(length = 1000, nullable = false)
    private String content;

    // 상태
    @Enumerated(value = EnumType.STRING)
    @Column(name = "REVIEW_STATUS", length = 30, nullable = false)
    private Review.ReviewStatus reviewStatus = Review.ReviewStatus.REVIEW_REGISTRATION;

    public enum ReviewStatus{
        REVIEW_REGISTRATION("리뷰 등록"),
        REVIEW_DELETE("리뷰 삭제");

        @Getter
        private String string;

        ReviewStatus(String string) {
            this.string = string;
        }
    }

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

//    // 영수증
//
//    // 신고
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Report> reports = new ArrayList<>();
//
//    // 좋아요
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "review", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Like> likes = new ArrayList<>();


}
