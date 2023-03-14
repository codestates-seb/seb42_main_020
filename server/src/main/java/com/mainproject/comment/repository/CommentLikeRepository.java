package com.mainproject.comment.repository;

import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.entity.CommentLike;
import com.mainproject.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CommentLikeRepository extends JpaRepository<CommentLike, Long> {

    @Query("select v from CommentLike v where v.member = :member and v.comment = :comment")
    Optional<CommentLike> findByMemberAndComment(Member member, Comment comment);
}
