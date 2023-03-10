package com.mainproject.doctor_comment.entity;

import com.mainproject.doctor.entity.Doctor;
import com.mainproject.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class DoctorComment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "doctor_comment_id", nullable = false)
    private Long doctorCommentId;

    // 본문
    @Column(length = 50, nullable = false)
    private String content;
    // 생성 시간

    // 수정 시간

    // 상태

    // 신고

    // 좋아요


    // ----------------------------------- 연관관계 매핑 ----------------------------------- //

    // 의사회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("doctor_id")
    private Doctor doctor;

    // 게시글 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("post_id")
    private Post post;
}
