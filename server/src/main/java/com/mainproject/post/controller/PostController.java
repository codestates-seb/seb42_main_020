package com.mainproject.post.controller;

import com.mainproject.comment.service.CommentService;
import com.mainproject.global.dto.MultiResponseDto;
import com.mainproject.post.dto.*;
import com.mainproject.post.entity.Post;
import com.mainproject.post.mapper.PostMapper;
import com.mainproject.post.service.PostService;
import com.mainproject.postReport.dto.PostReportPostDto;
import com.mainproject.postReport.entity.PostReport;
import com.mainproject.postReport.mapper.PostReportMapper;
import com.mainproject.postReport.service.PostReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@Validated
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;
    private final PostMapper postMapper;
    private final PostReportMapper postReportMapper;
    private final PostReportService postReportService;
    private final CommentService commentService;
    private static final int PAGE_SIZE = 20;

    // 페이징 조회
    @GetMapping
    public ResponseEntity getQuestions(@RequestParam(value = "page", defaultValue = "0") int page,
                                       @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                       @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                       @RequestParam(value = "filterType", defaultValue = "1") int filterType,
                                       @RequestParam(value = "keyword", defaultValue = "") String keyword,
                                       @RequestParam(value = "postType", defaultValue = "") String postType,
                                       @RequestParam(value = "medicalTag", defaultValue = "") String medicalTag,
                                       @RequestParam(value = "region", defaultValue = "") String region) {

        PageRequest pageable = PageRequest.of(page, PAGE_SIZE, Sort.by(direction, sortBy));

        Page<Post> postPage = postService.findQuestions(filterType, keyword, postType, medicalTag, region,
                Arrays.asList(Post.PostStatus.POST_DELETED, Post.PostStatus.POST_PENDING), pageable);

        List<Post> posts = postPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(postMapper.postsToPostsResponsePageDto(posts), postPage), HttpStatus.OK);
    }

    // 단일 조회
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") @Positive long postId) {

        Post post = postService.findPost(postId);

        if (post.getPostType() == "question") {
            PostResponseDto postResponseDto = postMapper.postToPostResponseDto(post);

            return new ResponseEntity<>(postResponseDto, HttpStatus.OK);
        } else {
            ReviewResponseDto reviewResponseDto = postMapper.reviewToReviewResponseDto(post);

            return new ResponseEntity<>(reviewResponseDto, HttpStatus.OK);
        }
    }

    // 글 작성
    @PostMapping
    public ResponseEntity createPost(@RequestBody @Valid PostPostDto postDto,
                                     @AuthenticationPrincipal String email) {

        Post post = postMapper.postPostDtoToPost(postDto);
        Long postId = postService.createPost(post, email, postDto.getMedicalTagTitle(), postDto.getRegionName());

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }

    // 글 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") @Positive long postId,
                                     @RequestBody @Valid PostPatchDto patchDto,
                                     @AuthenticationPrincipal String email){

        Post updatedPost = postMapper.postPatchDtoToPost(patchDto);

        postService.updatePost(updatedPost, postId, email, patchDto.getMedicalTagTitle(), patchDto.getRegionName());

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }

    // 글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive long postId,
                                     @AuthenticationPrincipal String email){

        postService.deletePost(postId, email);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 게시글 좋아요
    @PostMapping("/{post-id}/likes")
    public ResponseEntity postLike(@PathVariable("post-id") long postId,
                                   @AuthenticationPrincipal String email) {

        postService.addLike(postId, email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 신고
    @PostMapping("/{post-id}/report")
    public ResponseEntity postReport(@PathVariable("post-id") long postId,
                                     @AuthenticationPrincipal String email,
                                     @RequestBody @Valid PostReportPostDto postDto) {

        PostReport postReport = postReportMapper.postReportPostDtoToPostReport(postDto);

        postReportService.createReport(postReport, email, postId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 답변 채택
    @PatchMapping("/{post-id}/comments/{comment-id}")
    public ResponseEntity acceptComment(@PathVariable("post-id") long postId,
                                        @PathVariable("comment-id") long commentId,
                                        @AuthenticationPrincipal String email) {

        commentService.acceptComment(email, postId, commentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
