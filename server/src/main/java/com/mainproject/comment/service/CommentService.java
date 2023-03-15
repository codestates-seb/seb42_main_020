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

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final CommentLikeRepository commentLikeRepository;

    // 댓글 작성
    public Comment createComment(Comment comment, Long memberId) {

        Member member = memberService.findMember(memberId);

        comment.setMember(member);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, Long commentId) {

        Comment findComment = findVerifiedComment(commentId);

        findComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(findComment);
    }


    public Comment deleteComment(long commentId) {

        Comment findComment = findVerifiedComment(commentId);

        findComment.setModifiedAt(LocalDateTime.now());
        findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETED);

        return commentRepository.save(findComment);
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

    // 댓글 채택 또는 수정 여부 확인
    private Comment findVerifiedComment(long commentId) {

        Comment findComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.POST_NOT_FOUND));

        if(findComment.getCommentStatus() != Comment.CommentStatus.COMMENT_REGISTERED) throw new BusinessLogicException(ExceptionCode.COMMENT_NOT_CHANGED);

        return findComment;
    }
}