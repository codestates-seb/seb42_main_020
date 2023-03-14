package com.mainproject.comment.service;

import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.entity.CommentLike;
import com.mainproject.comment.repository.CommentLikeRepository;
import com.mainproject.comment.repository.CommentRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final CommentLikeRepository commentLikeRepository;
    private final MemberService memberService;

    // 댓글 작성
    public Comment createComment(Comment comment, Long memberId) {

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        comment.setMember(member);
        comment.setContent(comment.getContent());

        return commentRepository.save(comment);
    }

    public Comment updateComment(Comment comment) {
        // TODO should business logic

        // TODO member 객체는 나중에 DB에 업데이트 후, 되돌려 받는 것으로 변경 필요.
        Comment updatedComment = comment;
        return updatedComment;
    }


    public void deleteComment(long commentId) {

    }

    // 좋아요 기능
    public void addLike(long commentId, String email, Integer like) {

        Member member = memberService.findMemberByEmail(email);
        Comment comment = commentRepository.findById(commentId).get();

        verifyExistsLike(member, comment);

        commentLikeRepository.save(comment.addLike(new CommentLike(comment, member, like)));
    }

    // 좋아요 여부 검증
    private void verifyExistsLike(Member member, Comment comment) {

        Optional<CommentLike> like = commentLikeRepository.findByMemberAndComment(member, comment);
        if (like.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_VOTED);
        }
    }
}