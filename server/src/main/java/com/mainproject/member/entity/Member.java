package com.mainproject.member.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.mainproject.audit.Auditable;
import com.mainproject.comment.entity.Comment;
import com.mainproject.post.entity.Post;
import com.mainproject.subEntity.hospital.Hospital;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

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
    @Column(length = 30)
    private String displayName;

    @Column(name = "HOSPITAL_NAME")
    private String hospitalName;

    @Column(length = 30)
    private String area;

    @Column(length = 100, nullable = false)
    private String password;

    @Column
    private boolean isDoctor;

    @Column(length = 10000000)
    private byte[] img;

    @Column
    private int point = 0;

    // 권한 컬럼 추가
    // 사용자 등록 시 사용자 권한을 등록하기 위한 테이블 생성
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    // 회원 활동, 휴면, 탈퇴 여부
    @Enumerated(value = EnumType.STRING)
    @Column(name = "MEMBER_STATUS", length = 30, nullable = false)
    private MemberStatus memberStatus;

    // 회원 등급
    @Enumerated(value = EnumType.STRING)
    @Column(name = "MEMBER_RATING", length = 30, nullable = false)
    private MemberRating memberRating = MemberRating.UNRANKED;

    // Post 클래스 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JsonManagedReference
    private List<Post> posts = new ArrayList<>();

    // Comment 클래스 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "member", cascade = CascadeType.PERSIST)
    @JsonManagedReference
    private List<Comment> comments = new ArrayList<>();

    // Hospital 클래스 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HOSPITAL_ID")
    @JsonBackReference
    private Hospital hospital;

    public enum MemberStatus {
        MEMBER_PENDING("승인 대기"),
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

    public boolean getIsDoctor() {
        return isDoctor;
    }

    public void setIsDoctor(boolean isDoctor) {
        this.isDoctor = isDoctor;
    }

    // 댓글 수
    public int getTotalComments() {
        int totalComments = comments.size();
        return totalComments;
    }

    // 채택된 댓글 수
    public int getAcceptComments() {

        List<Comment> filterComments = comments.stream()
                .filter(comment -> comment.getCommentStatus() == Comment.CommentStatus.COMMENT_ACCEPTED)
                .collect(Collectors.toList());

        int totalAcceptComments = filterComments.size();

        return totalAcceptComments;
    }
}
