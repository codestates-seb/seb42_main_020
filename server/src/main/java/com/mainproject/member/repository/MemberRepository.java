package com.mainproject.member.repository;

import com.mainproject.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    // 이메일 찾기
    Optional<Member> findByEmail(String email);

    @Override
    @Query(value = "SELECT * FROM MEMBER WHERE Member_Status <> 'MEMBER_QUIT'", nativeQuery = true)
    Page<Member> findAll(Pageable pageable);
}
