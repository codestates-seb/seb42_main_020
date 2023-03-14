package com.mainproject.commentReport.repository;

import com.mainproject.commentReport.entity.CommentReport;
import com.mainproject.comment.entity.Comment;
import com.mainproject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentReportRepository extends JpaRepository<CommentReport, Long> {

    @Query("select v from CommentReport v where v.member = :member and v.comment = :comment")
    Optional<CommentReport> findByMemberAndPost(Member member, Comment comment);
}
