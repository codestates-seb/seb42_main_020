package com.mainproject.doctor_comment.controller;

import com.mainproject.doctor_comment.dto.DoctorCommentDto;
import com.mainproject.doctor_comment.entity.DoctorComment;
import com.mainproject.doctor_comment.repository.DoctorCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/doctorComments")
public class DoctorCommentController {

    @Autowired
    private DoctorCommentRepository doctorCommentRepository;

    @PostMapping
    public ResponseEntity postDoctorComment(DoctorCommentDto doctorCommentDto) {
        return new ResponseEntity<DoctorCommentDto>(doctorCommentDto, HttpStatus.CREATED);
    }

    // 특정 댓글 조회
    @GetMapping("/{doctorComment-id}")
    public ResponseEntity getDoctorComment(@PathVariable("doctorComment_id") long doctorCommentId) {
        System.out.println("# doctorCommentId: " + doctorCommentId);

        // 구현 안됨 !!!

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 모든 댓글 조회
    @GetMapping
    public ResponseEntity getDoctorComments() {
        System.out.println("# get DoctorComments");

        // 구현 안됨 !!!

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 특정 댓글 수정
    @PutMapping("/{doctorComment-id}")
    public ResponseEntity updateDoctorComments(@PathVariable("doctorComment_id") long doctorCommentId, @RequestBody DoctorComment doctorComment) {

        // 구현 안됨 !!!

        return new ResponseEntity(HttpStatus.OK);
    }

    // 특정 댓글 삭제
    @DeleteMapping("/{doctorComment-id}")
    public ResponseEntity deleteDoctorComment(@PathVariable("doctorComment_id") long doctorCommentId) {

        // 구현 안됨 !!!

        return new ResponseEntity(HttpStatus.OK);
    }
}