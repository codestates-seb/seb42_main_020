package com.mainproject.post.repository;

import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
import com.mainproject.post.entity.PostLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostLikeRepository extends JpaRepository<PostLike, Long> {

    @Query("select v from PostLikes v where v.member = :member and v.post = :post")
    Optional<PostLike> findByMemberAndPost(Member member, Post post);
}
