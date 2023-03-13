package com.mainproject.member.controller;

import com.mainproject.member.dto.DoctorDto;
import com.mainproject.doctor.entity.Doctor;
import com.mainproject.doctor.mapper.DoctorMapper;
import com.mainproject.doctor.service.DoctorService;
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

    @PostMapping("signup")
    public ResponseEntity postDoctor(@Valid @RequestBody DoctorDto.Post requestBody) {

        Member member = memberMapper.doctorPostToMember(requestBody);

        memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    public DoctorDto.response response(Member member) {
        return memberMapper.memberToDoctorResponse(member);
    }
}