package com.mainproject.comment.controller;

import com.mainproject.comment.dto.CommentPatchDto;
import com.mainproject.comment.dto.CommentPostDto;
import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.mapper.CommentMapper;
import com.mainproject.comment.service.CommentService;
import com.mainproject.commentReport.dto.CommentReportPostDto;
import com.mainproject.commentReport.entity.CommentReport;
import com.mainproject.commentReport.mapper.CommentReportMapper;
import com.mainproject.commentReport.service.CommentReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@Validated
public class CommentController {

    // 실시간 알림 메시지 템플릿
    @Autowired
    private SimpMessagingTemplate messageTemplate;

    private final CommentService commentService;
    private final CommentMapper mapper;
    private final CommentReportMapper commentReportMapper;
    private final CommentReportService commentReportService;

    public CommentController(CommentService commentService, CommentMapper mapper, CommentReportMapper commentReportMapper, CommentReportService commentReportService) {
        this.commentService = commentService;
        this.mapper = mapper;
        this.commentReportMapper = commentReportMapper;
        this.commentReportService = commentReportService;
    }

    // 하나의 댓글 등록
    @PostMapping
    public ResponseEntity postComment(@RequestBody @Valid CommentPostDto commentPostDto,
                                      @AuthenticationPrincipal String email,
                                      @RequestParam(name = "post-id") long postId) {

        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        Comment response = commentService.createComment(comment, email, postId);

        // 댓글 알림
        commentService.noticeComment(response);

        return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.CREATED);
    }

    // 하나의 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                       @RequestBody @Valid CommentPatchDto patchDto,
                                       @AuthenticationPrincipal String email) {

        Comment response = commentService.updateComment(mapper.commentPatchDtoToComment(patchDto), commentId, email);
        return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }

    // 하나의 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId,
                                        @AuthenticationPrincipal String email) {

        System.out.println("# delete comment");

        commentService.deleteComment(commentId, email);

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    // 댓글 좋아요
    @PostMapping("/{comment-id}/likes")
    public ResponseEntity commentLike(@PathVariable("comment-id") long commentId,
                                      @AuthenticationPrincipal String email) {

        commentService.addLike(commentId, email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 댓글 신고
    @PostMapping("/{comment-id}/report")
    public ResponseEntity postReport(@PathVariable("comment-id") long commentId,
                                     @AuthenticationPrincipal String email,
                                     @RequestBody @Valid CommentReportPostDto postDto) {

        CommentReport commentReport = commentReportMapper.commentReportPostDtoToCommentReport(postDto);

        commentReportService.createReport(commentReport, email, commentId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}