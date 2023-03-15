package com.mainproject.post.controller;

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
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
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

    // 페이징 조회
    @GetMapping
    public ResponseEntity<Page<Post>> getPosts(@RequestParam(value = "page", defaultValue = "0") int page,
                                               @RequestParam(value = "size", defaultValue = "10") int size,
                                               @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                               @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                               @RequestParam(value = "keyword", required = false) String keyword,
                                               @RequestParam(value = "status", required = false) List<String> status) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Post> posts;

        if (status == null) {
            posts = postService.findByTitleContainingAndPostStatusNot(keyword, "POST_DELETED", pageable);
        } else {
            posts = postService.findByTitleContainingAndPostStatusIn(keyword, status, pageable);
        }

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("/member/{memberId}")
    public ResponseEntity<Page<Post>> getPostsByMemberId(@PathVariable Long memberId,
                                                         @RequestParam(value = "page", defaultValue = "0") int page,
                                                         @RequestParam(value = "size", defaultValue = "10") int size,
                                                         @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                                         @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));
        Page<Post> posts = postService.findByMember_memberIdAndPostStatusNot(memberId, "POST_DELETED", pageable);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 단일 조회
    @GetMapping("/{post-id}")
    public ResponseEntity<PostResponseDto> getPost(@PathVariable("post-id") @Positive Long postId){

        Post post = postService.findPost(postId);
        PostResponseDto postResponseDto = postMapper.postToPostResponseDto(post);

        return new ResponseEntity<>(postResponseDto, HttpStatus.OK);
    }

    // 글 작성
    @PostMapping
    public ResponseEntity createPost(@RequestBody @Valid PostPostDto postDto, @RequestParam Long memberId) {

        Post post = postMapper.postPostDtoToPost(postDto);
        Long postId = postService.createPost(post, memberId, postDto.getMedicalTagTitle(), postDto.getRegionName());

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }


    // 글 수정
    @PatchMapping("/{post-id}")
    public ResponseEntity updatePost(@PathVariable("post-id") @Positive Long postId,
                                     @RequestBody @Valid PostPatchDto patchDto){

        Post updatedPost = postMapper.postPatchDtoToPost(patchDto);
        postService.updatePost(updatedPost, postId, patchDto.getMemberId(), patchDto.getMedicalTagTitle(), patchDto.getRegionName());

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }


    // 글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long postId){

        postService.deletePost(postId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 게시글 좋아요
    @PostMapping("/{post-id}/likes")
    public ResponseEntity postLike(@PathVariable("post-id") long postId,
                                   /*@AuthenticationPrincipal*/ String email) {

        postService.addLike(postId, email, 1);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 게시글 신고
    @PostMapping("/{post-id}/report")
    public ResponseEntity postReport(@PathVariable("post-id") long postId,
                                     /*@AuthenticationPrincipal*/ String email,
                                     @RequestBody @Valid PostReportPostDto postDto) {

        PostReport postReport = postReportMapper.postReportPostDtoToPostReport(postDto);

        postReportService.createReport(postReport, email, postId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
