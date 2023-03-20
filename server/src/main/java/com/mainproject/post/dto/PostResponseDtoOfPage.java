package com.mainproject.post.dto;

import com.mainproject.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class PostResponseDtoOfPage {

    private Long postId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private Post.PostStatus postStatus;
    private String postType;
    private Integer totalLike;
    private String medicalTagTitle;
    private String regionName;
    private String hospitalName;
}
