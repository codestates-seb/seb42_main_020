package com.mainproject.member_comment.controller;

import com.mainproject.member_comment.dto.MemberCommentDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/memberComments")
public class MemberCommentController {

    // 댓글 등록
    @PostMapping
    public ResponseEntity postMemberComment(MemberCommentDto memberCommentDto) {
        return new ResponseEntity<MemberCommentDto>(memberCommentDto, HttpStatus.CREATED);
    }

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity getMemberComments() {
        System.out.println("# get MemberComments");

        // 미구현 !!!


        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 특정 댓글 조회
    @GetMapping("/{memberComment-id}")
    public ResponseEntity getMemberComment(@PathVariable("memberComment_id") long memberCommentId) {
        System.out.println("# memberCommentId: " + memberCommentId);

        // 미구현 !!!

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 특정 댓글 수정
    @PutMapping("/{memberComment-id}")
    public ResponseEntity putMemberComment(@PathVariable("memberComment_id") long memberCommentId) {

        // 미구현 !!!

        return new ResponseEntity<>(HttpStatus.OK);
    }


    // 특정 댓글 삭제
    @DeleteMapping("/{memberComment-id}")
    public ResponseEntity deleteMemberComment(@PathVariable("memberComment_id") long memberCommentId) {

        // 미구현 !!!

        return new ResponseEntity<>(HttpStatus.OK);
    }



}