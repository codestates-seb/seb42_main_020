package com.mainproject.member.controller;

import com.mainproject.member.entity.Member;
import com.mainproject.member.mapper.MemberMapper;
import com.mainproject.member.service.AdminService;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.service.PostService;
import com.mainproject.subEntity.hospital.Hospital;
import com.mainproject.subEntity.hospital.HospitalMapper;
import com.mainproject.subEntity.hospital.HospitalPostDto;
import com.mainproject.subEntity.service.SubService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/admin")
@Validated
@RequiredArgsConstructor
public class AdminController {

    private final MemberService memberService;
    private final PostService postService;
    private final MemberMapper memberMapper;
    private final AdminService adminService;
    private final SubService subService;
    private final HospitalMapper hospitalMapper;

    @GetMapping
    public ResponseEntity getPendingList() {
        List<Member> members = memberService.findPendingMembers();
        List<Post> posts = postService.findPendingReviews();

        return new ResponseEntity<>(memberMapper.pendingResponse(members, posts), HttpStatus.OK);
    }

    // 병원 저장
    @PostMapping("/hospital")
    public ResponseEntity postHospital(@RequestBody @Valid HospitalPostDto post) {
        Hospital hospital = hospitalMapper.hospitalPostToHospital(post);
        subService.createHospital(hospital);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 병원 회원 연관짓기
    @PatchMapping("/members/{member-id}")
    public ResponseEntity associateMember(@PathVariable("member-id") long memberId,
                                          @RequestParam(name = "hospitalName") String hospitalName) {
        adminService.associateHospitalToMember(memberId, hospitalName);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 병원 리뷰글 연관짓기
    @PatchMapping("/posts/{post-id}")
    public ResponseEntity associatePost(@PathVariable("post-id") long postId,
                                        @RequestParam(name = "hospitalName") String hospitalName) {
        adminService.associateHospitalToReview(postId, hospitalName);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/members/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") long memberId) {

        adminService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/posts/{post-id}")
    public ResponseEntity deletePost(@PathVariable("post-id") long postId) {

        adminService.deletePost(postId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("/comments/{comment-id}")
    public ResponseEntity deleteComment(@PathVariable("comment-id") long commentId) {

        adminService.deleteComment(commentId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
