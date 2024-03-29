package com.mainproject.comment.service;

import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.entity.CommentLike;
import com.mainproject.comment.notice.NoticePayload;
import com.mainproject.comment.repository.CommentLikeRepository;
import com.mainproject.comment.repository.CommentRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import com.mainproject.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final MemberService memberService;
    private final PostService postService;
    private final CommentLikeRepository commentLikeRepository;

    @Autowired
    private SimpMessagingTemplate messageTemplate;

    // 댓글 작성
    public Comment createComment(Comment comment, String email, long postId) {

        Member member = memberService.findMemberByEmail(email);
        Post post = postService.findPost(postId);

        if(member == post.getMember()) throw new BusinessLogicException(ExceptionCode.CANNOT_COMMENT_MYSELF);

        if (post.getPostType() == "review") {
            throw new BusinessLogicException(ExceptionCode.POST_NOT_FOUND);
        }

        post.setPostStatus(Post.PostStatus.POST_COMMENTED);

        comment.setPost(post);
        comment.setMember(member);
        comment.setCreatedAt(LocalDateTime.now());
        comment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(comment);
    }

    // 댓글 수정
    public Comment updateComment(Comment comment, Long commentId, String email) {

        // 본인 검증
        Member member = memberService.findMemberByEmail(email);
        Comment findComment = findVerifiedComment(commentId);

        if(member.getMemberId() != findComment.getMember().getMemberId()) throw new BusinessLogicException(ExceptionCode.NOT_POSTS_MEMBER);
        if(findComment.getPost().getPostStatus() == Post.PostStatus.POST_ACCEPTED) throw new BusinessLogicException(ExceptionCode.POST_ACCEPTED);
        if(findComment.getCommentStatus() == Comment.CommentStatus.COMMENT_ACCEPTED) throw new BusinessLogicException(ExceptionCode.COMMENT_ACCEPTED);

        findComment.setMember(member);
        findComment.setContent(comment.getContent());
        findComment.setModifiedAt(LocalDateTime.now());

        return commentRepository.save(findComment);
    }

    // 댓글 삭제
    public Comment deleteComment(long commentId, String email) {

        // 본인 검증
        Member member = memberService.findMemberByEmail(email);
        Comment findComment = findVerifiedComment(commentId);
        if(member.getMemberId() != findComment.getMember().getMemberId()) throw new BusinessLogicException(ExceptionCode.NOT_POSTS_MEMBER);

        findComment.setModifiedAt(LocalDateTime.now());
        findComment.setCommentStatus(Comment.CommentStatus.COMMENT_DELETED);

        return commentRepository.save(findComment);
    }

    // 댓글 채택
    public void acceptComment(String email, long postId, long commentId) {

        Member member = memberService.findMemberByEmail(email);
        long memberId = member.getMemberId();
        Comment comment = findVerifiedComment(commentId);
        Post post = postService.findPost(postId);
        long findMemberId = post.getMember().getMemberId();

        // 포인트 수정
        Member memberForPoint = comment.getMember();
        memberForPoint.setPoint(memberForPoint.getPoint() + 15);
        memberService.updateRating(memberForPoint);

        if(memberId != findMemberId || postId != comment.getPost().getPostId() || comment.getCommentStatus() == Comment.CommentStatus.COMMENT_ACCEPTED
        || post.getPostStatus() == Post.PostStatus.POST_ACCEPTED) {
            throw new BusinessLogicException(ExceptionCode.CANNOT_ACCEPT_COMMENT);
        } else {
            post.setPostStatus(Post.PostStatus.POST_ACCEPTED);
            comment.setCommentStatus(Comment.CommentStatus.COMMENT_ACCEPTED);
        }

        postRepository.save(post);
        commentRepository.save(comment);
    }

    // 좋아요 기능
    public void addLike(long commentId, String email) {

        Member member = memberService.findMemberByEmail(email);
        Comment comment = commentRepository.findById(commentId).get();

        if(member == comment.getMember()) throw new BusinessLogicException(ExceptionCode.CANNOT_LIKE_MYSELF);

        // 포인트 수정
        Member memberForPoint = comment.getMember();
        memberForPoint.setPoint(memberForPoint.getPoint() + 1);
        memberService.updateRating(memberForPoint);

        verifyExistsLike(member, comment);

        commentLikeRepository.save(comment.addLike(new CommentLike(comment, member)));
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

    // 실시간 댓글 알림
    public void noticeComment(Comment comment) {

        // 알림 페이로드 생성
        NoticePayload payload = new NoticePayload();
        payload.setType("comment");
        payload.setMessage("새로운 댓글이 달렸습니다.");

        // 게시글 작성한 회원에게 알림 전송
        messageTemplate.convertAndSendToUser(comment.getPost().getMember().getEmail(),
                "/members", payload);
    }
}