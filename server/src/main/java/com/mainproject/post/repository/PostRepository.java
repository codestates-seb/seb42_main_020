package com.mainproject.post.repository;

import com.mainproject.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PostRepository extends JpaRepository<Post,Long> {

    Page<Post> findByTitleContainingAndPostStatusNot(String keyword, String status, Pageable pageable);

    Page<Post> findByTitleContainingAndPostStatusIn(String keyword, List<String> status, Pageable pageable);

    Page<Post> findByMember_memberIdAndPostStatusNot(Long memberId, String status, Pageable pageable);

}
