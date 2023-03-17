package com.mainproject.member.controller;

import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.entity.Member;
import com.mainproject.member.mapper.MemberMapper;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    // 회원가입
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {

        Member member = memberMapper.memberPostToMember(requestBody);

        memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원 수정
    @PatchMapping
    public ResponseEntity patchMember(@AuthenticationPrincipal String email,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {

        Member patchMember =
                memberService.updateMember(memberMapper.memberPatchToMember(requestBody), email);

        return new ResponseEntity<>(response(patchMember), HttpStatus.OK);
    }

    // 특정 회원 조회
    @GetMapping
    public ResponseEntity getMember(@AuthenticationPrincipal String email) {

        Member member = memberService.findMember(email);

        return new ResponseEntity<>(response(member), HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity deleteMember(@AuthenticationPrincipal String email) {

        memberService.deleteMember(email);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 답변 채택 로직 필요

    public MemberDto.response response(Member member) {
        return memberMapper.memberToMemberResponse(member);
    }
}
