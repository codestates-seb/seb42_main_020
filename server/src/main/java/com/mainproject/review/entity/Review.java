package com.mainproject.review.entity;

import com.mainproject.audit.Auditable;
import com.mainproject.member.entity.Member;
import com.mainproject.subEntity.Hospital;
import com.mainproject.subEntity.MedicalTag;
import com.mainproject.subEntity.Region;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Review extends Auditable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    // 제목
    @Column(length = 50, nullable = false)
    private String title;

    // 본문
    @Column(length = 1000, nullable = false)
    private String content;

    // 상태
    @Enumerated(value = EnumType.STRING)
    @Column(name = "REVIEW_STATUS", length = 30, nullable = false)
    private Review.ReviewStatus reviewStatus = ReviewStatus.REVIEW_REGISTERED;

    public enum ReviewStatus{
        REVIEW_REGISTERED("리뷰 등록"),
        REVIEW_DELETED("리뷰 삭제");

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
}
