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
import java.time.LocalDateTime;
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

        private String area;

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z\\\\d`~!@#$%^&*()-_=+]{8,15}$",
                message = "영어와 숫자 특수문자를 사용해야 하며 8~15자리를 허용한다.")
        private String password;
    }

    @Getter
    @AllArgsConstructor
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Patch {

        @NotBlank(message = "닉네임은 공백이 허용되지 않습니다.")
        private String displayName;

        private String area;

        @Pattern(regexp = "^[a-zA-Z\\\\d`~!@#$%^&*()-_=+]{8,15}$",
                message = "영어와 숫자 특수문자를 사용해야 하며 8~15자리를 허용한다.")
        private String password;
    }

    @AllArgsConstructor
    @Getter
    public static class response {

        private long memberId;
        private String email;
        private String name;
        private String displayName;
        private String area;
        private int point;
        private boolean isDoctor;
        private LocalDateTime createdAt;
        private Member.MemberRating memberRating;
        private Member.MemberStatus memberStatus;
        private List<PostResponseMyPageInfo> postResponseMyPageInfos;
        private int totalComments;
        private int acceptComments;
    }
}
