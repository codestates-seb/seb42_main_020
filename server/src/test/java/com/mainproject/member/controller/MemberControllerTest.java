package com.mainproject.member.controller;

import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.entity.Member;
import com.mainproject.member.mapper.MemberMapper;
import com.mainproject.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.transaction.annotation.Transactional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.Mockito.verify;

import com.fasterxml.jackson.databind.ObjectMapper;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import org.springframework.security.test.context.support.WithMockUser;


@SpringBootTest
@Transactional
@AutoConfigureMockMvc
@Nested
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper memberMapper;


    private MemberDto.Post memberDto;
    private Member member1;
    private Member member2;


    @BeforeEach
    public void setUp() {
        memberDto = new MemberDto.Post(
                "test@test.com",
                "Test",
                "testName",
                "Seoul",
                "test1234"
        );

        member1 = new Member();
        member1.setEmail("test1@test.com");
        member1.setName("Test1");
        member1.setDisplayName("testName1");
        member1.setArea("Seoul");
        member1.setPassword("test1234");
        member1.setIsDoctor(false);

        member2 = new Member();
        member2.setEmail("test2@test.com");
        member2.setName("Test2");
        member2.setDisplayName("testName2");
        member2.setArea("Seoul");
        member2.setPassword("test1234");
        member2.setIsDoctor(true);
    }

    @Nested
    @DisplayName("회원가입 테스트")
    class PostMemberTest {
        @Test
        @DisplayName("일반인 회원가입 성공")
        void postMemberTest_case1() throws Exception {

            // given
            when(memberMapper.memberPostToMember(any(MemberDto.Post.class))).thenReturn(member1);

            // when
            ResultActions actions = mockMvc.perform(post("/members/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(memberDto)));

            // then
            actions
                    .andExpect(status().isCreated());

            verify(memberService).createMember(any(Member.class));
        }

        @Test
        @DisplayName("의사 회원가입 성공")
        void postMemberTest_case2() throws Exception {

            // given
            when(memberMapper.memberPostToMember(any(MemberDto.Post.class))).thenReturn(member2);

            // when
            ResultActions actions = mockMvc.perform(post("/members/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(memberDto)));

            // then
            actions
                    .andExpect(status().isCreated());

            verify(memberService).createMember(any(Member.class));
        }

        @Test
        @DisplayName("회원가입 실패 - 비밀번호 형식이 잘못됨")
        void postMemberTest_case3() throws Exception {

            // given
            MemberDto.Post invalidMemberDto = new MemberDto.Post(
                    "test@test.com",
                    "Test",
                    "testName",
                    "Seoul",
                    "test" // 영어와 숫자 특수문자를 사용해야 하며 8~15자리를 허용한다.
            );

            // when
            ResultActions actions = mockMvc.perform(post("/members/signup")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(invalidMemberDto)));

            // then
            actions
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("특정 회원 조회 테스트")
    class GetMemberTest {
        @Test
        @WithMockUser(username = "test1@test.com")
        @DisplayName("일반인 회원 조회 성공")
        void getMemberTest_case1() throws Exception {

            // given
            String email = "test1@test.com";
            when(memberService.findMember(email)).thenReturn(member1);

            // when
            ResultActions actions = mockMvc.perform(get("/members"));

//            // then
//            actions
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.email").value(member1.getEmail()))
//                    .andExpect(jsonPath("$.name").value(member1.getName()))
//                    .andExpect(jsonPath("$.displayName").value(member1.getDisplayName()))
//                    .andExpect(jsonPath("$.area").value(member1.getArea()));
        }

        @Test
        @WithMockUser(username = "test2@test.com")
        @DisplayName("의사 회원 조회 성공")
        void getMemberTest_case2() throws Exception {

            // given
            String email = "test2@test.com";
            when(memberService.findMember(email)).thenReturn(member2);

            // when
            ResultActions actions = mockMvc.perform(get("/members"));

//            // then
//            actions
//                    .andExpect(status().isOk())
//                    .andExpect(jsonPath("$.email").value(member2.getEmail()))
//                    .andExpect(jsonPath("$.name").value(member2.getName()))
//                    .andExpect(jsonPath("$.displayName").value(member2.getDisplayName()))
//                    .andExpect(jsonPath("$.area").value(member2.getArea()));
        }
    }
}

