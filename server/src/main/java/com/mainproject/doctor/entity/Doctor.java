package com.mainproject.doctor.entity;

import com.mainproject.audit.Auditable;
import com.mainproject.doctor_comment.entity.DoctorComment;
import com.mainproject.member.entity.Member;
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
public class Doctor extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long doctorId;

    // 수정 X, 중복 X
    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    // 실명
    @Column(length = 10, nullable = false)
    private String name;

    @Column(length = 100, nullable = false)
    private String password;

    // 의사 면허증 사진
    @Column(nullable = false)
    private String img;

    @Column
    private int point;

    // 의사 활동, 휴면, 탈퇴 여부
    @Enumerated(value = EnumType.STRING)
    @Column(name = "DOCTOR_STATUS", length = 30, nullable = false)
    private DoctorStatus doctorStatus = DoctorStatus.DOCTOR_ACTIVE;

    // 의사 등급
    @Enumerated(value = EnumType.STRING)
    @Column(name = "DOCTOR_RATING", length = 30, nullable = false)
    private DoctorRating doctorRating = DoctorRating.UNRANKED;

    // DoctorComment 클래스 1:n 양방향
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "doctor", cascade = CascadeType.PERSIST)
    private List<DoctorComment> doctorComments = new ArrayList<>();

    public enum DoctorStatus {
        DOCTOR_ACTIVE("활동 상태"),
        DOCTOR_SLEEP("휴면 상태"),
        DOCTOR_QUIT("탈퇴 상태");

        @Getter
        private String status;

        DoctorStatus(String status) {
            this.status = status;
        }
    }

    public enum DoctorRating {
        UNRANKED("등급 없음"),
        BRONZE("동뱃지"),
        SLIVER("은뱃지"),
        GOLD("금뱃지");

        @Getter
        private String rating;

        DoctorRating(String rating) {
            this.rating = rating;
        }
    }
}
