package com.mainproject.post.dto;


import com.mainproject.comment.dto.CommentResponseDto;
import com.mainproject.member.dto.WriterResponse;
import com.mainproject.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class PostResponseDto {

    private Long postId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private Post.PostStatus postStatus;

    private String postType;

    /*    private Integer likes;*/

    private String medicalTagTitle;

    private String regionName;

    private WriterResponse writerResponse;

    private List<CommentResponseDto> comments;
}
