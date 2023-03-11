package com.mainproject.post.entity;


import com.mainproject.doctor_comment.entity.DoctorComment;
import com.mainproject.member.entity.Member;
import com.mainproject.member_comment.entity.MemberComment;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    // 제목
    @Column(length = 50, nullable = false)
    private String title;

    // 본문
    @Column(length = 1000, nullable = false)
    private String content;

//    // 생성 시간
//    private LocalDateTime createdAt = LocalDateTime.now();
//
//    // 수정 시간
//    private LocalDateTime modifiedAt = LocalDateTime.now();

    // 상태
    @Enumerated(value = EnumType.STRING)
    @Column(name = "POST_STATUS", length = 30, nullable = false)
    private Post.PostStatus postStatus = PostStatus.POST_REGISTRATION;

    public enum PostStatus{
        POST_REGISTRATION("게시글 등록"),
        POST_DELETE("게시글 삭제");

        @Getter
        private String string;

        PostStatus(String string) {
            this.string = string;
        }
    }


    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 회원 댓글 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<MemberComment> memberComments = new ArrayList<>();

    // 의사 댓글 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<DoctorComment>  doctorComments= new ArrayList<>();

//    // 진료과목 1:n 양방향
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Tag> tag = new ArrayList<>();
//
//    // 지역 1:n 양방향
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Region> region = new ArrayList<>();


//    // 신고
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Report> reports = new ArrayList<>();
//
//    // 좋아요
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
//    private List<Like> likes = new ArrayList<>();

}
