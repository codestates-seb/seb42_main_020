package com.mainproject.member.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Optional;
import java.util.regex.Pattern;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@SpringBootTest
@Transactional
class MemberServiceTest {

    @Autowired
    private MemberService memberService;

    @MockBean
    private MemberRepository memberRepository;

    @Nested
    @DisplayName("일반 회원가입 테스트")
    class CreateMemberTest {

        @Test
        @DisplayName("일반 회원가입 성공")
        void createMemberTest_case1() {

            // Given
            Member member = new Member();
            member.setEmail("test@test.com");
            member.setPassword("test1234");

            given(memberRepository.findByEmail(member.getEmail())).willReturn(Optional.empty());
            given(memberRepository.save(any(Member.class))).willReturn(member);

            // When
            Member createdMember = memberService.createMember(member);

            // Then
            assertThat(createdMember).isEqualTo(member);
        }

        @Test
        @DisplayName("일반 회원가입 실패 - 비밀번호 형식이 잘못됨")
        void createMemberTest_case2() {

            // Given
            Member member = new Member();
            member.setEmail("test@test.com");
            member.setPassword("test");

            given(memberRepository.findByEmail(member.getEmail())).willReturn(Optional.empty());

            // When
            Throwable exception = catchThrowable(() -> {
                if (!Pattern.matches("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,15}$", member.getPassword())) {
                    throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD_FORMAT);
                } else {
                    memberService.createMember(member);
                }
            });

            // Then
            assertThat(exception)
                    .isInstanceOf(BusinessLogicException.class)
                    .hasMessage("Invalid password format");
        }
    }
    @Nested
    @DisplayName("의사 회원가입 테스트")
    class CreateDoctorTest {

        @Test
        @DisplayName("의사 회원가입 성공")
        void createDoctorTest_case1() throws IOException {

            // Given
            Member member = new Member();
            member.setEmail("test@test.com");
            member.setPassword("test1234");

            MultipartFile img = new MockMultipartFile("test.png", new byte[0]);

            given(memberRepository.findByEmail(member.getEmail())).willReturn(Optional.empty());
            given(memberRepository.save(any(Member.class))).willReturn(member);

            // When
            Member createdMember = memberService.createDoctor(member, img);


            // Then
            assertThat(createdMember).isEqualTo(member);
        }

        @Test
        @DisplayName("의사 회원가입 실패 - 비밀번호 형식이 잘못됨")
        void createDoctorTest_case2() {

            // Given
            Member member = new Member();
            member.setEmail("test@test.com");
            member.setPassword("test");

            MultipartFile img = new MockMultipartFile("test.png", new byte[0]);

            given(memberRepository.findByEmail(member.getEmail())).willReturn(Optional.empty());

            // When
            Throwable exception = catchThrowable(() -> {
                if (!Pattern.matches("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,15}$", member.getPassword())) {
                    throw new BusinessLogicException(ExceptionCode.INVALID_PASSWORD_FORMAT);
                } else {
                    memberService.createDoctor(member, img);
                }
            });

            // Then
            assertThat(exception)
                    .isInstanceOf(BusinessLogicException.class)
                    .hasMessage("Invalid password format");
        }
    }
}
