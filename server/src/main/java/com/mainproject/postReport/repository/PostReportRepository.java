package com.mainproject.postReport.repository;

import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
import com.mainproject.postReport.entity.PostReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostReportRepository extends JpaRepository<PostReport, Long> {

    @Query("select v from PostReport v where v.member = :member and v.post = :post")
    Optional<PostReport> findByMemberAndPost(Member member, Post post);
}
