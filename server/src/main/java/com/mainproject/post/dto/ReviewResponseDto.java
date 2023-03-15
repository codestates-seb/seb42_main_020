package com.mainproject.post.dto;

import com.mainproject.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class ReviewResponseDto {

    private Long postId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private Post.PostStatus postStatus;

    /*    private Integer likes;*/

    private String hospitalName;

    private String medicalTagTitle;

    private String regionName;
}
