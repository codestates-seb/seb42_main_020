package com.mainproject.member.repository;

import com.mainproject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 이메일 찾기
    Optional<Member> findByEmail(String email);

    List<Member> findByMemberStatus(Member.MemberStatus memberStatus);
}
