package com.mainproject.post.controller;

import com.mainproject.post.entity.Post;
import com.mainproject.post.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import javax.transaction.Transactional;
import java.util.Collections;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class PostControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockBean
    private PostService postService;

    @Nested
    @DisplayName("Post 검색")
    class getQuestions {
        @Test
        @DisplayName("post 조회")
        void getQuestionsTest_case1() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("post");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(1), any(), eq("post"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "1")
                    .param("keyword", "")
                    .param("postType", "post")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }

        @Test
        @DisplayName("제목으로 검색")
        void getQuestionsTest_case2() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("post");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(1), eq("title"), eq("post"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "1")
                    .param("keyword", "title")
                    .param("postType", "post")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }

        @Test
        @DisplayName("내용으로 검색")
        void getQuestionsTest_case3() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("post");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(2), eq("content"), eq("post"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "2")
                    .param("keyword", "content")
                    .param("postType", "post")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }

        @Test
        @DisplayName("작성자로 검색")
        void getQuestionsTest_case4() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("post");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);;

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(3), eq("조건희"), eq("post"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "3")
                    .param("keyword", "조건희")
                    .param("postType", "post")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));

        }
    }

    @Nested
    @DisplayName("Review 검색")
    class ReviewSearch {
        @Test
        @DisplayName("review 조회")
        void getQuestionsTest_case5() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("review");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(1), any(), eq("review"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "1")
                    .param("keyword", "")
                    .param("postType", "review")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }

        @Test
        @DisplayName("제목으로 검색")
        void getQuestionsTest_case6() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("review");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(1), eq("title"), eq("review"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "1")
                    .param("keyword", "title")
                    .param("postType", "review")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }

        @Test
        @DisplayName("내용으로 검색")
        void getQuestionsTest_case7() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("review");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(2), eq("content"), eq("review"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "2")
                    .param("keyword", "content")
                    .param("postType", "review")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }

        @Test
        @DisplayName("작성자로 검색")
        void getQuestionsTest_case8() throws Exception {

            // Given
            Post post = new Post();
            post.setPostId(1L);
            post.setTitle("test title");
            post.setContent("test content");
            post.setPostType("review");
            post.setPostStatus(Post.PostStatus.POST_REGISTERED);

            Page<Post> postPage = new PageImpl<>(Collections.singletonList(post), PageRequest.of(0, 20), 1);

            given(postService.findQuestions(eq(3), eq("조건희"), eq("review"), any(), any(), anyList(), any()))
                    .willReturn(postPage);

            // When
            ResultActions actions = mockMvc.perform(get("/posts")
                    .param("page", "0")
                    .param("sort", "createdAt")
                    .param("direction", "DESC")
                    .param("filterType", "3")
                    .param("keyword", "조건희")
                    .param("postType", "review")
                    .param("medicalTag", "")
                    .param("region", "")
                    .contentType(MediaType.APPLICATION_JSON));

            // Then
            actions
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.data[0].postId").value(post.getPostId()))
                    .andExpect(jsonPath("$.data[0].title").value(post.getTitle()))
                    .andExpect(jsonPath("$.data[0].content").value(post.getContent()))
                    .andExpect(jsonPath("$.data[0].postType").value(post.getPostType()))
                    .andExpect(jsonPath("$.data[0].postStatus").value(post.getPostStatus().name()));
        }
    }
}