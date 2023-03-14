package com.mainproject.comment.controller;

import com.mainproject.comment.dto.CommentPatchDto;
import com.mainproject.comment.dto.CommentPostDto;
import com.mainproject.comment.dto.CommentResponseDto;
import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.mapper.CommentMapper;
import com.mainproject.comment.service.CommentService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/comments")
@Validated
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper mapper;

    public CommentController(CommentService commentService, CommentMapper mapper) {
        this.commentService = commentService;
        this.mapper = mapper;
    }

    // 하나의 댓글 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto) {
        Comment comment = mapper.commentPostDtoToComment(commentPostDto);
        Comment response = commentService.createComment(comment);
        return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.CREATED);
    }

    // 하나의 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        commentPatchDto.setCommentId(commentId);
        Comment response = commentService.updateComment(mapper.commentPatchDtoToComment(commentPatchDto));
        return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.OK);
    }

    // ????? 이 기능 안쓸듯 ?????
    // 하나의 댓글 조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment_id") long commentId) {
        Comment response = commentService.findComment(commentId);
        return new ResponseEntity<>(mapper.commentToCommentResponseDto(response), HttpStatus.NO_CONTENT);
    }

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity getComments() {
        List<Comment> comments = commentService.findComments();
        List<CommentResponseDto> response =
                comments.stream()
                        .map(comment -> mapper.commentToCommentResponseDto(comment))
                        .collect(Collectors.toList());
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 하나의 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment_id") long commentId) {
        System.out.println("# delete comment");
        commentService.deleteComment(commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }







}