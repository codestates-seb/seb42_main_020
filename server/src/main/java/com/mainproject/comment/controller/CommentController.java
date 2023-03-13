package com.mainproject.comment.controller;

import com.mainproject.comment.dto.CommentPatchDto;
import com.mainproject.comment.dto.CommentPostDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Min;

@RestController
@RequestMapping(path = "/comments")
@Validated
public class CommentController {

    // 댓글 등록
    @PostMapping
    public ResponseEntity postComment(@Valid @RequestBody CommentPostDto commentPostDto) {
        return new ResponseEntity<CommentPostDto>(commentPostDto, HttpStatus.CREATED);
    }

    // 댓글 수정
    @PatchMapping("/{comment-id}")
    public ResponseEntity patchComment(@PathVariable("comment-id") @Min(1) long commentId,
                                       @Valid @RequestBody CommentPatchDto commentPatchDto) {
        commentPatchDto.setCommentId(commentId);

        return new ResponseEntity<CommentPatchDto>(commentPatchDto, HttpStatus.OK);
    }

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity getComments() {
        System.out.println("# get comments");

        // 미구현 !!!


        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 특정 댓글 조회
    @GetMapping("/{comment-id}")
    public ResponseEntity getComment(@PathVariable("comment_id") long CommentId) {
        System.out.println("# commentId: " + CommentId);

        // 미구현 !!!

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 특정 댓글 삭제
    @DeleteMapping("/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment_id") long CommentId) {

        // No need business logic

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}