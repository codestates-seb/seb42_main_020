package com.mainproject.member.controller;

import com.mainproject.member.dto.DoctorDto;
import com.mainproject.member.entity.Member;
import com.mainproject.member.mapper.MemberMapper;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/doctors")
@Validated
@RequiredArgsConstructor
public class DoctorController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    @PostMapping("/signup")
    public ResponseEntity postDoctor(@Valid @RequestBody DoctorDto.Post requestBody) {

        Member member = memberMapper.doctorPostToMember(requestBody);

        memberService.createDoctor(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{member-id}/approval")
    public ResponseEntity approveDoctor(@PathVariable("member-id") long memberId) {

        memberService.approveMemberSignup(memberId);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{member-id}")
    public ResponseEntity getDoctor(@PathVariable("member-id") long memberId) {

        Member member = memberService.findDoctor(memberId);

        return new ResponseEntity<>(response(member), HttpStatus.OK);
    }

    public DoctorDto.response response(Member member) {
        return memberMapper.memberToDoctorResponse(member);
    }
}
