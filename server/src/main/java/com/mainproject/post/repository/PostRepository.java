package com.mainproject.post.repository;

import com.mainproject.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface PostRepository extends JpaRepository<Post,Long> {

    // 키워드 검색 and 삭제상태 제외
    Page<Post> findByTitleContainingAndPostStatusNot(String keyword, String status, Pageable pageable);

    Page<Post> findByTitleContainingAndPostStatusIn(String keyword, List<String> status, Pageable pageable);

    Page<Post> findByContentContainingAndPostStatusNot(String keyword, String status, Pageable pageable);

    Page<Post> findByContentContainingAndPostStatusIn(String keyword, List<String> status, Pageable pageable);

    Page<Post> findByMember_memberIdAndPostStatusNot(Long memberId, String status, Pageable pageable);

    Page<Post> findByMedicalTag_medicalTagIdAndPostStatusNot(Long medicalTagId, String status, Pageable pageable);

    Page<Post> findByRegion_regionIdAndPostStatusNot(Long regionId, String status, Pageable pageable);

    Page<Post> findByTitleContainingAndContentContainingAndPostStatusNotIn(String titleKeyword, String contentKeyword, List<Post.PostStatus> status, Pageable pageable);

    Page<Post> findByTitleContainingAndContentContainingAndPostStatusNotInAndPostType(String titleKeyword, String contentKeyword, List<Post.PostStatus> status, String postType, Pageable pageable);

    Page<Post> findByTitleContainingAndContentContainingAndPostStatusNotInAndMedicalTag_title(String titleKeyword, String contentKeyword, List<Post.PostStatus> status, String title, Pageable pageable);

    Page<Post> findByTitleContainingAndContentContainingAndPostStatusNotInAndRegion_name(String titleKeyword, String contentKeyword, List<Post.PostStatus> status, String name, Pageable pageable);
}
