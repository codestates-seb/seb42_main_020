package com.mainproject.post.controller;

import com.mainproject.comment.service.CommentService;
import com.mainproject.global.dto.MultiResponseDto;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.dto.PostPatchDto;
import com.mainproject.post.dto.PostPostDto;
import com.mainproject.post.dto.PostResponseDto;
import com.mainproject.post.dto.ReviewResponseDto;
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
    private final MemberService memberService;

    // 전체 질문 조회
    @GetMapping
    public ResponseEntity getQuestions(@RequestParam(value = "page", defaultValue = "0") int page,
                                                   @RequestParam(value = "titleKeyword", required = false) String titleKeyword,
                                                   @RequestParam(value = "sort", defaultValue = "createdAt") String sortType,
                                                   @RequestParam(value = "filterType", defaultValue = "1") int filterType,
                                                   @RequestParam(value = "medicalTagTitle", required = false) String medicalTagTitle,
                                                   @RequestParam(value = "regionName", required = false) String regionName) {
        Page<Post> postPage = postService.findQuestions(page, titleKeyword, sortType, filterType, medicalTagTitle, regionName);
        List<Post> posts = postPage.getContent();

        return new ResponseEntity<>(
                new MultiResponseDto<>(postMapper.postsToPostsResponseDto(posts), postPage), HttpStatus.OK);
    }

    // 페이징 조회 - 제목 검색
    @GetMapping("/title")
    public ResponseEntity<Page<Post>> getPostsByTitle(@RequestParam(value = "page", defaultValue = "0") int page,
                                                      @RequestParam(value = "size", defaultValue = "10") int size,
                                                      @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                                      @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                                      @RequestParam(value = "keyword", required = false) String keyword,
                                                      @RequestParam(value = "status", required = false) List<String> status) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Post> posts = postService.findByTitleContainingAndPostStatusNotIn(keyword,
                Arrays.asList(Post.PostStatus.POST_DELETED, Post.PostStatus.POST_PENDING), pageable);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 페이징 조회 = 내용 검색
    @GetMapping("/content")
    public ResponseEntity<Page<Post>> getPostsByContent(@RequestParam(value = "page", defaultValue = "0") int page,
                                                        @RequestParam(value = "size", defaultValue = "10") int size,
                                                        @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                                        @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                                        @RequestParam(value = "keyword", required = false) String keyword,
                                                        @RequestParam(value = "status", required = false) List<String> status) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Post> posts = postService.findByContentContainingAndPostStatusNotIn(keyword,
                Arrays.asList(Post.PostStatus.POST_DELETED, Post.PostStatus.POST_PENDING), pageable);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 페이징 조회 - 작성자
    @GetMapping("/member")
    public ResponseEntity<Page<Post>> getPostsByMemberId(@RequestParam(value = "page", defaultValue = "0") int page,
                                                         @RequestParam(value = "size", defaultValue = "10") int size,
                                                         @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                                         @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                                         @RequestParam(value = "keyword", required = false) String keyword,
                                                         @RequestParam(value = "status", required = false) List<String> status) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Post> posts = postService.findByMember_displayNameAndPostStatusNotIn(keyword,
                Arrays.asList(Post.PostStatus.POST_DELETED, Post.PostStatus.POST_PENDING), pageable);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 페이징 조회 - 진료과목
    @GetMapping("/medicalTag")
    public ResponseEntity<Page<Post>> getPostsByMedicalTag(@RequestParam(value = "page", defaultValue = "0") int page,
                                                           @RequestParam(value = "size", defaultValue = "10") int size,
                                                           @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                                           @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                                           @RequestParam(value = "keyword", required = false) String keyword,
                                                           @RequestParam(value = "status", required = false) List<String> status) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Post> posts = postService.findByMedicalTag_titleContainingAndPostStatusNotIn(keyword,
                Arrays.asList(Post.PostStatus.POST_DELETED, Post.PostStatus.POST_PENDING), pageable);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 페이징 조회 - 지역
    @GetMapping("/region")
    public ResponseEntity<Page<Post>> getPostsByRegion(@RequestParam(value = "page", defaultValue = "0") int page,
                                                       @RequestParam(value = "size", defaultValue = "10") int size,
                                                       @RequestParam(value = "sort", defaultValue = "createdAt") String sortBy,
                                                       @RequestParam(value = "direction", defaultValue = "DESC") Sort.Direction direction,
                                                       @RequestParam(value = "keyword", required = false) String keyword,
                                                       @RequestParam(value = "status", required = false) List<String> status) {

        PageRequest pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        Page<Post> posts = postService.findByRegion_nameContainingAndPostStatusNotIn(keyword,
                Arrays.asList(Post.PostStatus.POST_DELETED, Post.PostStatus.POST_PENDING), pageable);

        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    // 단일 조회
    @GetMapping("/{post-id}")
    public ResponseEntity getPost(@PathVariable("post-id") @Positive Long postId) {

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
    public ResponseEntity updatePost(@PathVariable("post-id") @Positive Long postId,
                                     @RequestBody @Valid PostPatchDto patchDto,
                                     @AuthenticationPrincipal String email){

        Post updatedPost = postMapper.postPatchDtoToPost(patchDto);
        postService.updatePost(updatedPost, postId, email, patchDto.getMedicalTagTitle(), patchDto.getRegionName());

        return new ResponseEntity<>(postId, HttpStatus.OK);
    }


    // 글 삭제
    @DeleteMapping("/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") @Positive Long postId,
                                     @AuthenticationPrincipal String email){

        postService.deletePost(postId, email);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 게시글 좋아요
    @PostMapping("/{post-id}/likes")
    public ResponseEntity postLike(@PathVariable("post-id") long postId,
                                   @AuthenticationPrincipal String email) {

        postService.addLike(postId, email, 1);

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
