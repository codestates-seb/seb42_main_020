package com.mainproject.comment.service;

import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.repository.CommentRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.service.PostService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.transaction.annotation.Transactional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@SpringBootTest
@Transactional
class CommentServiceTest {

    @Autowired
    private CommentService commentService;

    @MockBean
    private CommentRepository commentRepository;

    @MockBean
    private MemberService memberService;

    @MockBean
    private PostService postService;

    @Nested
    @DisplayName("댓글 작성 테스트")
    class CreateCommentTest {

        @Test
        @DisplayName("댓글 작성 성공")
        void createCommentTest_case1() {

            // Given
            Comment comment = new Comment();
            comment.setContent("test content");

            String email = "test@test.com";
            long postId = 1L;

            Member member = new Member();
            member.setEmail(email);

            Post post = new Post();
            post.setPostId(postId);
            post.setPostType("post");

            given(memberService.findMemberByEmail(email)).willReturn(member);
            given(postService.findPost(postId)).willReturn(post);
            given(commentRepository.save(any(Comment.class))).willReturn(comment);

            // When
            Comment createdComment = commentService.createComment(comment, email, postId);

            // Then
            assertThat(createdComment).isEqualTo(comment);
        }

        @Test
        @DisplayName("댓글 작성 실패 - 리뷰에는 댓글 작성 불가능")
        void createCommentTest_case2() {

            // Given
            Comment comment = new Comment();
            comment.setContent("test content");

            String email = "test@test.com";
            long postId = 1L;

            Member member = new Member();
            member.setEmail(email);

            Post post = new Post();
            post.setPostId(postId);
            post.setPostType("review");

            given(memberService.findMemberByEmail(email)).willReturn(member);
            given(postService.findPost(postId)).willReturn(post);

            // When
            Throwable exception = catchThrowable(() -> commentService.createComment(comment, email, postId));

            // Then
            assertThat(exception)
                    .isInstanceOf(BusinessLogicException.class)
                    .hasMessage("Post not found");
        }
    }
}
