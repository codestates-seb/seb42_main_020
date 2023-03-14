package com.mainproject.comment.entity;

import com.mainproject.member.entity.Member;
import com.mainproject.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class CommentLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long commentLikesId;

    // Post 클래스 n:1 양방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "POST_ID")
    private Post post;

    // member 클래스 n:1 단방향
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    private Integer commentVote;

    public CommentLike(Post post, Member member, Integer commentVote) {
        this.post = post;
        this.member = member;
        this.commentVote = commentVote;
    }
}
