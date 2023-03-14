package com.mainproject.post.dto;


import com.mainproject.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class PostResponseDto {

    private Long postId;

    private String title;

    private String content;

    private LocalDateTime createdAt;

    private LocalDateTime modifiedAt;

    private Post.PostStatus postStatus;

/*    private Integer likes;*/

    private String medicalTagTitle;

    private String regionName;

    // comment 부분 코드 작성되면 수정 필요
/*    private List<CommentDto> memberComments;
*/
}
