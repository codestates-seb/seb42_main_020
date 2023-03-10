package com.mainproject.doctor_comment.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/doctorComments", produces = {MediaType.APPLICATION_JSON_VALUE})
public class DoctorCommentController {
    @PostMapping
    public ResponseEntity postDoctorComment(@RequestParam("content") String content,
                                            @RequestParam("createdAt") LocalDateTime createdAt,
                                            @RequestParam("modifiedAt") LocalDateTime modifiedAt) {

        Map<String, String> map = new HashMap<>();
        map.put("content", content);
        map.put("createdAt", String.valueOf(createdAt));
        map.put("modifiedAt", String.valueOf(modifiedAt));

        return new ResponseEntity<>(map, HttpStatus.CREATED);
    }

    // 특정 댓글 조회
    @GetMapping("/{doctorComment-id}")
    public ResponseEntity getDoctorComment(@PathVariable("doctorComment_id") long doctorCommentId) {
        System.out.println("# doctorCommentId: " + doctorCommentId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity getDoctorComments() {
        System.out.println("# get DoctorComments");

        return new ResponseEntity<>(HttpStatus.OK);
    }
}