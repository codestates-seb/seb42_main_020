package com.mainproject.member.controller;

import com.mainproject.member.dto.DoctorDto;
import com.mainproject.member.entity.Member;
import com.mainproject.member.mapper.MemberMapper;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/doctors")
@Validated
@RequiredArgsConstructor
public class DoctorController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/signup")
    public ResponseEntity postDoctor(@RequestPart(value = "post") DoctorDto.Post post,
                                     @RequestPart(value = "img") MultipartFile img) throws IOException {

        Member member = memberMapper.doctorPostToMember(post);

        memberService.createDoctor(member, img);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}/approval")
    public ResponseEntity approveDoctor(@PathVariable("member-id") long memberId) {

        memberService.approveMemberSignup(memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity getDoctor(@AuthenticationPrincipal String email) {

        Member member = memberService.findDoctor(email);

        return new ResponseEntity<>(response(member), HttpStatus.OK);
    }

    public DoctorDto.response response(Member member) {
        return memberMapper.memberToDoctorResponse(member);
    }
}
