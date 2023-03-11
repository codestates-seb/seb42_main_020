package com.mainproject.member.controller;

import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.entity.Member;
import com.mainproject.member.mapper.MemberMapper;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/members")
@Validated
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper memberMapper;

    // 회원가입
    @PostMapping
    public ResponseEntity postMember(@Valid @RequestBody MemberDto.Post requestBody) {

        Member member = memberMapper.memberPostToMember(requestBody);

        memberService.createMember(member);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 회원 수정
    @PatchMapping("{member-id}")
    public ResponseEntity patchMember(@PathVariable("{member-id}") @Positive long memberId,
                                      @Valid @RequestBody MemberDto.Patch requestBody) {

        requestBody.addMemberId(memberId);

        Member member =
                memberService.updateMember(memberMapper.memberPatchToMember(requestBody));

        return new ResponseEntity<>(response(member), HttpStatus.OK);
    }

    // 특정 회원 조회
    @GetMapping("{member-id}")
    public ResponseEntity getMember(@PathVariable("{member-id}") @Positive long memberId) {

        Member member = memberService.findMember(memberId);

        return new ResponseEntity<>(response(member), HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("{member-id}")
    public ResponseEntity deleteMember(@PathVariable("{member-id}") @Positive long memberId) {

        memberService.deleteMember(memberId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 답변 채택 로직 필요

    public MemberDto.response response(Member member) {
        return memberMapper.memberToMemberResponse(member);
    }
}
