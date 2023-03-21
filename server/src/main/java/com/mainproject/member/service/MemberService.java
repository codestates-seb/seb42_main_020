package com.mainproject.member.service;

import com.mainproject.auth.CustomAuthorityUtils;
import com.mainproject.comment.entity.Comment;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Transactional
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils authorityUtils;

    // 일반 회원가입
    public Member createMember(Member member) {

        emailDuplicateCheck(member.getEmail());

        member.setIsDoctor(false);
        member.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);
        member.setCreatedAt(LocalDateTime.now());
        member.setModifiedAt(LocalDateTime.now());

        // 패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // USER Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    // 의사 회원가입
    public Member createDoctor(Member member, MultipartFile img) throws IOException {

        emailDuplicateCheck(member.getEmail());

        byte[] imgByte = convertMultipartFileToByte(img);

        member.setIsDoctor(true);
        member.setMemberStatus(Member.MemberStatus.MEMBER_PENDING);
        member.setCreatedAt(LocalDateTime.now());
        member.setModifiedAt(LocalDateTime.now());
        member.setImg(imgByte);

        // 패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        // USER Role 저장
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        return memberRepository.save(member);
    }

    // 회원 수정 (로그인 정보 검증 필요)
    public Member updateMember(Member member, String email) {

        Member findMember = findMemberByEmail(email);

        Optional.ofNullable(member.getDisplayName())
                .ifPresent(displayName -> findMember.setDisplayName(displayName));
        Optional.ofNullable(member.getPassword())
                .ifPresent(password -> findMember.setPassword(password));
        Optional.ofNullable(member.getArea())
                .ifPresent(area -> findMember.setArea(area));

        // 패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        findMember.setModifiedAt(LocalDateTime.now());

        return memberRepository.save(findMember);
    }

    // 특정 회원 찾기
    public Member findMember(String email) {

        Member findMember = findMemberByEmail(email);

        if(findMember.getIsDoctor() != false) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        // 삭제 및 대기 상태 질문 필터링
        List<Post> filteredPosts = findMember.getPosts().stream()
                .filter(post -> post.getPostStatus() != Post.PostStatus.POST_DELETED && post.getPostStatus() != Post.PostStatus.POST_PENDING)
                .collect(Collectors.toList());

        findMember.setPosts(filteredPosts);

        return findMember;
    }

    // 특정 의사 찾기
    public Member findDoctor(String email) {

        Member findMember = findMemberByEmail(email);

        if(findMember.getIsDoctor() != true) {
            throw new BusinessLogicException(ExceptionCode.DOCTOR_NOT_FOUND);
        }

        // 삭제 상태 댓글 필터링
        List<Comment> filteredComments = findMember.getComments().stream()
                .filter(comment -> comment.getCommentStatus() != Comment.CommentStatus.COMMENT_DELETED)
                .collect(Collectors.toList());

        findMember.setComments(filteredComments);

        return findMember;
    }

    // 회원 삭제 (로그인 정보 검증 필요)
    public Member deleteMember(String email) {

        Member member = findMemberByEmail(email);
        long memberId = member.getMemberId();

        Member findMember = findVerifiedMember(memberId);

        findMember.setModifiedAt(LocalDateTime.now());
        findMember.setMemberStatus(Member.MemberStatus.MEMBER_QUIT);

        return memberRepository.save(findMember);
    }

    // 회원가입 승인
    public Member approveMemberSignup(long memberId) {

        // 관리자 검증 필요

        Member findMember = findPendingMember(memberId);

        findMember.setMemberStatus(Member.MemberStatus.MEMBER_ACTIVE);

        return memberRepository.save(findMember);
    }

    // 이메일 중복 체크 로직
    public void emailDuplicateCheck(String email) {

        // 회원 이메일 체크
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    // 이메일로 회원 찾기
    public Member findMemberByEmail(String email) {

        Optional<Member> optionalMember = memberRepository.findByEmail(email);

        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }

    // 회원가입 승인 대기중인 회원 찾기
    public Member findPendingMember(long memberId) {

        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.DOCTOR_NOT_FOUND));
        if(findMember.getMemberStatus() != Member.MemberStatus.MEMBER_PENDING) throw new BusinessLogicException(ExceptionCode.DOCTOR_NOT_FOUND);

        return findMember;
    }

    // 회원가입 승인 대기중인 회원 조회(관리자)
    public List<Member> findPendingMembers() {
        return memberRepository.findByMemberStatus(Member.MemberStatus.MEMBER_PENDING);
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
    public void updateRating(Member member) {

        if (member.getPoint() >= 300) {
            member.setMemberRating(Member.MemberRating.GOLD);
        } else if (member.getPoint() >= 200) {
            member.setMemberRating(Member.MemberRating.SLIVER);
        } else if (member.getPoint() >= 100) {
            member.setMemberRating(Member.MemberRating.BRONZE);
        }
    }

    // multipartFile -> byte 변환
    private byte[] convertMultipartFileToByte(MultipartFile multipartFile) throws IOException {
        return multipartFile.getBytes();
    }
}
