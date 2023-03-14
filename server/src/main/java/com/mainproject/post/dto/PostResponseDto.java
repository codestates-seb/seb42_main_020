package com.mainproject.post.dto;

import com.mainproject.comment.dto.CommentDto;
import com.mainproject.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostResponseDto {

    private Long postId;

    private Long tagId;

    private Long memberId;

    private Long regionId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private Post.PostStatus status;

    // comment 부분 코드 작성되면 수정 필요
    private List<CommentDto> memberComments;

    private List<CommentDto> doctorComments;


//    // 신고
//    private List<신고dto> 신고s;
//
//    // 좋아요
//    private List<조아요dto> 조아요s;
}
