package com.mainproject.member.entity;

import com.mainproject.audit.Auditable;
import com.mainproject.doctor_comment.entity.DoctorComment;
import com.mainproject.member_comment.entity.MemberComment;
import com.mainproject.post.entity.Post;
import com.mainproject.review.entity.review;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long memberId;

    // 수정 X, 중복 X
    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    // 실명
    @Column(length = 10, nullable = false)
    private String name;

    // 닉네임
    @Column(length = 30, nullable = false)
    private String displayName;

    @Column(length = 100, nullable = false)
    private String password;

    @Column
    private int point = 0;

    // 회원 활동, 휴면, 탈퇴 여부
    @Enumerated(value = EnumType.STRING)
    @Column(name = "MEMBER_STATUS", length = 30, nullable = false)
    private MemberStatus memberStatus = MemberStatus.MEMBER_ACTIVE;

    // 회원 등급
    @Enumerated(value = EnumType.STRING)
    @Column(name = "MEMBER_RATING", length = 30, nullable = false)
    private MemberRating memberRating = MemberRating.UNRANKED;

    // Post 클래스 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Post> posts = new ArrayList<>();

    // Review 클래스 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<review> reviews = new ArrayList<>();

    // Comment 클래스 1;n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.PERSIST)
    private List<MemberComment> memberComments = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "doctor", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<DoctorComment> doctorComments = new ArrayList<>();

    // 게시글, 댓글 신고, 좋아요 매핑 필요

    public enum MemberStatus {
        MEMBER_ACTIVE("활동 상태"),
        MEMBER_SLEEP("휴면 상태"),
        MEMBER_QUIT("탈퇴 상태");

        @Getter
        private String status;

        MemberStatus(String status) {
            this.status = status;
        }
    }

    public enum MemberRating {
        UNRANKED("등급 없음"),
        BRONZE("동뱃지"),
        SLIVER("은뱃지"),
        GOLD("금뱃지");

        @Getter
        private String rating;

        MemberRating(String rating) {
            this.rating = rating;
        }
    }
}
