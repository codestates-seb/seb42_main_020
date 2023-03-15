package com.mainproject.member.dto;

import com.mainproject.comment.entity.Comment;
import com.mainproject.member.entity.Member;
import com.mainproject.post.dto.PostResponseMyPageInfo;
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

public class MemberDto {

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Post {

        @NotBlank
        @Email
        private String email;

        @NotBlank(message = "이름은 공백이 허용되지 않습니다.")
        private String name;

        @NotBlank(message = "닉네임은 공백이 허용되지 않습니다.")
        private String displayName;

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z\\\\d`~!@#$%^&*()-_=+]{8,15}$",
                message = "영어와 숫자 특수문자를 사용해야 하며 8~15자리를 허용한다.")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {

        @NotNull
        private long memberId;

        @NotBlank(message = "닉네임은 공백이 허용되지 않습니다.")
        private String displayName;

        @Pattern(regexp = "^[a-zA-Z\\\\d`~!@#$%^&*()-_=+]{8,15}$",
                message = "영어와 숫자 특수문자를 사용해야 하며 8~15자리를 허용한다.")
        private String password;

        public Patch addMemberId(Long memberId) {
            Assert.notNull(memberId, "member id must not be null.");
            this.memberId = memberId;
            return this;
        }
    }

    @AllArgsConstructor
    @Getter
    public static class response {

        private long memberId;
        private String email;
        private String name;
        private String displayName;
        private boolean isDoctor;
        private Member.MemberRating memberRating;
        private Member.MemberStatus memberStatus;
        private List<PostResponseMyPageInfo> postResponseMyPageInfos;
    }
}
