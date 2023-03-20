package com.mainproject.post.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.mainproject.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@NoArgsConstructor
@Getter
@Setter
@Entity
public class PostLike {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postLikesId;

    // Post 클래스 n:1 양방향
    @ManyToOne
    @JoinColumn(name = "POST_ID")
    @JsonBackReference
    private Post post;

    // member 클래스 n:1 단방향
    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    @JsonBackReference
    private Member member;

    public PostLike(Post post, Member member) {
        this.post = post;
        this.member = member;
    }
}
