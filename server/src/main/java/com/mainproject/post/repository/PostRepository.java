package com.mainproject.post.repository;

import com.mainproject.post.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    Page<Post> findByTitleContainingAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn(String keyword, String postType, String name, String title, List<Post.PostStatus> status, Pageable pageable);

    Page<Post> findByContentContainingAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn(String keyword, String postType, String name, String title, List<Post.PostStatus> status, Pageable pageable);

    Page<Post> findByMember_displayNameAndPostTypeContainingAndMedicalTag_titleContainingAndRegion_nameContainingAndPostStatusNotIn(String keyword, String postType, String name, String title, List<Post.PostStatus> status, Pageable pageable);

    /*// 직접 쿼리
    @Query(value = "SELECT * FROM Post WHERE post.post_title LIKE %:titleKeyword%  AND post_Status NOT IN :status", nativeQuery = true)
    Page<Post> findByTitleContainsAndPostStatusNotIn(@Param("titleKeyword") String titleKeyword,  @Param("status") List<Post.PostStatus> status, Pageable pageable);

    @Query(value = "SELECT * FROM Post WHERE Post.post_title LIKE %:titleKeyword% AND Post.post_Status NOT IN :status AND Post.post_Type = :postType", nativeQuery = true)
    Page<Post> findByTitleContainsAndPostStatusNotInAndPostType(@Param("titleKeyword") String titleKeyword, @Param("status") List<Post.PostStatus> status, @Param("postType") String postType, Pageable pageable);

    @Query(value = "SELECT * FROM Post JOIN Medical_Tag on Post.medical_Tag_Id = Medical_Tag.medical_Tag_Id WHERE " +
            "Post.post_title LIKE %:titleKeyword% " +
            "AND Post.post_Status NOT IN :status " +
            "AND Medical_Tag.title = :medicalTagTitle", nativeQuery = true)
    Page<Post> findByTitleContainsAndPostStatusNotInAndMedicalTagTitle(@Param("titleKeyword") String titleKeyword, @Param("status") List<Post.PostStatus> status, @Param("medicalTagTitle") String medicalTagTitle, Pageable pageable);

    @Query(value = "SELECT * FROM Post JOIN Region on Post.regionId = Region.regionId WHERE " +
            "Post.post_title LIKE %:titleKeyword% " +
            "AND Post.post_Status NOT IN :status " +
            "AND Region.name = :regionName", nativeQuery = true)
    Page<Post> findByTitleContainsAndPostStatusNotInAndRegionName(@Param("titleKeyword") String titleKeyword, @Param("status") List<Post.PostStatus> status, @Param("regionName") String regionName, Pageable pageable);*/
}
