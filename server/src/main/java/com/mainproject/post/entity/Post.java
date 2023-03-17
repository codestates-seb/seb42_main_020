package com.mainproject.post.entity;

import com.mainproject.audit.Auditable;
import com.mainproject.member.entity.Member;
import com.mainproject.comment.entity.Comment;
import com.mainproject.postReport.entity.PostReport;
import com.mainproject.subEntity.hospital.Hospital;
import com.mainproject.subEntity.medicalTag.MedicalTag;
import com.mainproject.subEntity.region.Region;
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
public class Post extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    // 제목
    @Column(name = "POST_TITLE", length = 50, nullable = false)
    private String title;

    // 본문
    @Column(name = "CONTENT", length = 1000, nullable = false)
    private String content;

    // 리뷰 별점
    @Column(name = "STAR_RATING")
    private int starRating;

    // 질문인지 리뷰인지
    @Column(nullable = false)
    private String postType;

    @Column(length = 10000000)
    private byte[] receipt;

    // 상태
    @Enumerated(value = EnumType.STRING)
    @Column(name = "POST_STATUS", length = 30, nullable = false)
    private PostStatus postStatus;

    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    // 회원 댓글 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<Comment> comments = new ArrayList<>();

    // 좋아요 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE}, orphanRemoval = true)
    private List<PostLike> likes = new ArrayList<>();

    // 진료과목 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEDICAL_TAG_ID")
    private MedicalTag medicalTag;

    // 지역 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "REGION_ID")
    private Region region;

    // 병원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "HOSPITAL_ID")
    private Hospital hospital;

    // 신고 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "post", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<PostReport> postReports = new ArrayList<>();

    public enum PostStatus{
        POST_PENDING("등록 대기"),
        POST_REGISTERED("게시글 등록"),
        POST_COMMENTED("댓글 등록"),
        POST_ACCEPTED("채택 완료"),
        POST_DELETED("게시글 삭제");

        @Getter
        private String string;

        PostStatus(String string) {
            this.string = string;
        }
    }

    public PostLike addLike(PostLike like) {
        this.likes.add(like);
        like.setPost(this);
        return like;
    }
}
