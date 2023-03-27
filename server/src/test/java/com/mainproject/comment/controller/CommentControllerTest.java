package com.mainproject.comment.controller;

import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.service.CommentService;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.service.PostService;
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

import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.mockito.ArgumentMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class CommentControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private CommentService commentService;

    @MockBean
    private PostService postService;

    @MockBean
    private MemberService memberService;

    @Nested
    @DisplayName("댓글 생성 테스트")
    class CreateComment {
        @Test
        @DisplayName("댓글 생성에 성공")
        void createCommentTest_case1() throws Exception {

            // Given
            Comment comment = new Comment();
            comment.setCommentId(1L);
            comment.setContent("test content");
            comment.setCommentStatus(Comment.CommentStatus.COMMENT_REGISTERED);

            Member member = new Member();
            member.setEmail("test@test.com");

            Post post = new Post();
            post.setPostId(1L);
            post.setPostType("post");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            given(memberService.findMemberByEmail(anyString()))
                    .willReturn(member);
            given(postService.findPost(anyLong()))
                    .willReturn(post);
            given(commentService.createComment(any(Comment.class), anyString(), anyLong()))
                    .willReturn(comment);

            // When
            ResultActions actions = mockMvc.perform(post("/comments?post-id=1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"content\": \"test content\"}"));


            // Then
            actions
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.commentId").value(comment.getCommentId()))
                    .andExpect(jsonPath("$.content").value(comment.getContent()))
                    .andExpect(jsonPath("$.commentStatus").value(comment.getCommentStatus().name()));
        }

        @Test
        @DisplayName("댓글 생성에 실패")
        void postCommentTest_case2() throws Exception {

            // Given
            Member member = new Member();
            member.setEmail("test@test.com");

            Post post = new Post();
            post.setPostId(1L);
            post.setPostType("post");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            given(memberService.findMemberByEmail(anyString()))
                    .willReturn(member);
            given(postService.findPost(anyLong()))
                    .willReturn(post);

            // When
            ResultActions actions = mockMvc.perform(post("/comments?post-id=1")
                    .contentType(MediaType.APPLICATION_JSON)
                    .content("{\"content\": \"\"}"));

            // Then
            actions
                    .andExpect(status().isBadRequest());
        }
    }
}


