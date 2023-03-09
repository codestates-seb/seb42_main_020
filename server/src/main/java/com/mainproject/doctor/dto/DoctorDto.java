package com.mainproject.doctor.dto;

import com.mainproject.doctor.entity.Doctor;
import com.mainproject.doctor_comment.entity.DoctorComment;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.util.Assert;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.util.List;

public class DoctorDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {
        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "이름은 공백이 허용되지 않습니다.")
        private String name;

        @NotNull(message = "의사면허증 또는 면허 번호가 명시된 서류 사진을 첨부해야 합니다.")
        private String img;

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z\\\\d`~!@#$%^&*()-_=+]{8,15}$",
                message = "영어와 숫자 특수문자를 사용해야 하며 8~15자리를 허용한다.")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {
        private long doctorId;

        // 보안 적용 후 패스워드 추가 예정

        public Patch addDoctorId(Long doctorId) {
            Assert.notNull(doctorId, "doctor id must not be null.");
            this.doctorId = doctorId;
            return this;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class response {
        private long doctorId;
        private String email;
        private String name;
        // DoctorCommentResponseDto로 변경 가능
        private List<DoctorComment> doctorComments;
        private Doctor.DoctorStatus doctorStatus;
    }
}
