package com.mainproject.post.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import com.mainproject.subEntity.medicalTag.MedicalTag;
import com.mainproject.subEntity.region.Region;
import com.mainproject.subEntity.service.SubService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.catchThrowable;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;

@SpringBootTest
@Transactional
@AutoConfigureMockMvc
class PostServiceTest {

    @Autowired
    private PostService postService;

    @MockBean
    private MemberService memberService;

    @MockBean
    private SubService subService;

    @MockBean
    private PostRepository postRepository;

    @Nested
    @DisplayName("게시글 작성 테스트")
    class CreatePostTest {

        @Test
        @DisplayName("게시글 작성 성공")
        void createPostTest_case1() {

            // Given
            Post post = new Post();
            post.setTitle("test title");
            post.setContent("test content");

            String email = "test@test.com";
            String medicalTitle = "test medical title";
            String regionName = "test region name";

            Member member = new Member();
            member.setEmail(email);
            member.setIsDoctor(false);

            MedicalTag medicalTag = new MedicalTag();
            Region region = new Region();

            given(memberService.findMemberByEmail(email)).willReturn(member);
            given(subService.findMedicalTag(medicalTitle)).willReturn(medicalTag);
            given(subService.findRegion(regionName)).willReturn(region);
            given(postRepository.save(any(Post.class))).willReturn(post);

            // When
            Long postId = postService.createPost(post, email, medicalTitle, regionName);

            // Then
            assertThat(postId).isEqualTo(post.getPostId());
        }

        @Test
        @DisplayName("게시글 작성 실패 - 의사 회원은 게시글 작성 불가능")
        void createPostTest_case2() {

            // Given
            Post post = new Post();
            post.setTitle("test title");
            post.setContent("test content");

            String email = "test@test.com";
            String medicalTitle = "test medical title";
            String regionName = "test region name";

            Member member = new Member();
            member.setEmail(email);
            member.setIsDoctor(true);

            given(memberService.findMemberByEmail(email)).willReturn(member);

            // When
            Throwable exception = catchThrowable(() -> postService.createPost(post, email, medicalTitle, regionName));

            // Then
            assertThat(exception)
                    .isInstanceOf(BusinessLogicException.class)
                    .hasMessage("Doctor cannot post");
        }
    }

    @Nested
    @DisplayName("리뷰글 작성 테스트")
    class CreateReviewTest {

        @Test
        @DisplayName("리뷰글 작성 성공")
        void createReviewTest_case1() throws IOException {

            // Given
            Post post = new Post();
            post.setTitle("test title");
            post.setContent("test content");

            String email = "test@test.com";
            String medicalTitle = "test medical title";
            String regionName = "test region name";

            Member member = new Member();
            member.setEmail(email);
            member.setIsDoctor(false);

            MedicalTag medicalTag = new MedicalTag();
            Region region = new Region();

            MultipartFile img = new MockMultipartFile("test.jpg", new byte[0]);

            given(memberService.findMemberByEmail(email)).willReturn(member);
            given(subService.findMedicalTag(medicalTitle)).willReturn(medicalTag);
            given(subService.findRegion(regionName)).willReturn(region);
            given(postRepository.save(any(Post.class))).willReturn(post);

            // When
            Long postId = postService.createReview(post, email, medicalTitle, regionName, img);

            // Then
            assertThat(postId).isEqualTo(post.getPostId());
        }

        @Test
        @DisplayName("리뷰글 작성 실패 - 의사 회원은 리뷰글 작성 불가능")
        void createReviewTest_case2() throws IOException {

            // Given
            Post post = new Post();
            post.setTitle("test title");
            post.setContent("test content");

            String email = "test@test.com";
            String medicalTitle = "test medical title";
            String regionName = "test region name";

            Member member = new Member();
            member.setEmail(email);
            member.setIsDoctor(true);

            MultipartFile img = new MockMultipartFile("test.jpg", new byte[0]);

            given(memberService.findMemberByEmail(email)).willReturn(member);

            // When
            Throwable exception = catchThrowable(() -> postService.createReview(post, email, medicalTitle, regionName, img));

            // Then
            assertThat(exception)
                    .isInstanceOf(BusinessLogicException.class)
                    .hasMessage("Doctor cannot post");
        }
    }
}


