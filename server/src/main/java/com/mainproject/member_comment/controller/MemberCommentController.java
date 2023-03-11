package com.mainproject.member_comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/memberComments")
public class MemberCommentController {
    @PostMapping
    public ResponseEntity postMemberComment(@RequestParam("content") String content,
                                            @RequestParam("createdAt") LocalDateTime createdAt,
                                            @RequestParam("modifiedAt") LocalDateTime modifiedAt) {
        Map<String, String> map = new HashMap<>();
        map.put("content", content);
        map.put("createdAt", String.valueOf(createdAt));
        map.put("modifiedAt", String.valueOf(modifiedAt));

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    // 특정 댓글 조회
    @GetMapping("/{memberComment-id}")
    public ResponseEntity getMemberComment(@PathVariable("memberComment_id") long memberCommentId) {
        System.out.println("# memberCommentId: " + memberCommentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity getMemberComments() {
        System.out.println("# get MemberComments");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}