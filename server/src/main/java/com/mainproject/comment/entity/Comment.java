package com.mainproject.comment.entity;

import com.mainproject.audit.Auditable;
import com.mainproject.commentReport.entity.CommentReport;
import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends Auditable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id", nullable = false)
    private Long commentId;

    // 댓글 본문
    @Column(length = 50, nullable = false)
    private String content;

    // 상태
    @Enumerated(value = EnumType.STRING)
    @Column(name = "COMMENT_STATUS", length = 30, nullable = false)
    private Comment.CommentStatus commentStatus = Comment.CommentStatus.COMMENT_REGISTERED;

    public enum CommentStatus{
        COMMENT_REGISTERED("댓글 등록"),
        COMMENT_ACCEPTED("채택됨"),
        COMMENT_DELETED("댓글 삭제");

        @Getter
        private String string;

        CommentStatus(String string) {
            this.string = string;
        }
    }
    // ----------------------------------- 연관관계 매핑 ----------------------------------- //

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "comment", cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    private List<CommentLike> likes = new ArrayList<>();

    public CommentLike addLike(CommentLike like) {
        this.likes.add(like);
        like.setComment(this);
        return like;
    }

    // 회원 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("member_id")
    private Member member;

    // 게시글 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("post_id")
    private Post post;

    // 신고 1:n
    @OneToMany(fetch = FetchType.LAZY)
    private List<CommentReport> reports = new ArrayList<>();
}
