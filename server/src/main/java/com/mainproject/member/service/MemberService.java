package com.mainproject.member.service;

import com.mainproject.doctor.entity.Doctor;
import com.mainproject.doctor.repository.DoctorRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final DoctorRepository doctorRepository;

    // 회원가입
    public Member createMember(Member member) {

        emailDuplicateCheck(member.getEmail());

        member.setCreatedAt(LocalDateTime.now());
        member.setModifiedAt(LocalDateTime.now());

        // 패스워드 암호화

        // USER Role 저장

        return memberRepository.save(member);
    }

    // 회원 수정 (로그인 정보 검증 필요)
    public Member updateMember(Member member) {

        Member findMember = findVerifiedMember(member.getMemberId());

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(displayName -> findMember.setDisplayName(displayName));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));

        // 패스워드 암호화

        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    // 특정 회원 찾기
    public Member findMember(long memberId) {
        return findVerifiedMember(memberId);
    }

    // 회원 삭제 (로그인 정보 검증 필요)
    public Member deleteMember(long memberId) {

        Member findMember = findVerifiedMember(memberId);

        findMember.setModifiedAt(LocalDateTime.now());
        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);

        return memberRepository.save(findMember);
    }

    // 이메일 중복 체크 로직
    public void emailDuplicateCheck(String email) {

        // 회원 이메일 체크
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);

        // 의사 이메일 체크
        Optional<Doctor> doctor = doctorRepository.findByEmail(email);
        if (doctor.isPresent())
            throw new BusinessLogicException(ExceptionCode.DOCTOR_EXISTS);
    }

    // 회원 존재와 휴면,탈퇴 유무 체크
    public Member findVerifiedMember(long memberId) {

        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        if(findMember.getMemberStatus() != Member.MemberStatus.MEMBER_ACTIVE) throw new BusinessLogicException(ExceptionCode.INVALID_MEMBER_STATUS);

        return findMember;
    }

    // 좋아요, 채택, 게시글, 리뷰 작성 로직에 추가하는 등급 업데이트 로직
    public Member updateRating(Member member) {

        if (member.getPoint() >= 300) {
            member.setMemberRating(Member.MemberRating.GOLD);
        } else if (member.getPoint() >= 200) {
            member.setMemberRating(Member.MemberRating.SLIVER);
        } else if (member.getPoint() >= 100) {
            member.setMemberRating(Member.MemberRating.BRONZE);
        } member.setMemberRating(Member.MemberRating.UNRANKED);

        return memberRepository.save(member);
    }
}
