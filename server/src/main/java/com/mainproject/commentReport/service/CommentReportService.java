package com.mainproject.commentReport.service;

import com.mainproject.comment.entity.Comment;
import com.mainproject.comment.repository.CommentRepository;
import com.mainproject.commentReport.entity.CommentReport;
import com.mainproject.commentReport.repository.CommentReportRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentReportService {

    private final CommentReportRepository commentReportRepository;
    private final MemberService memberService;
    private final CommentRepository commentRepository;

    public CommentReport createReport(CommentReport commentReport, String email, long commentId) {

        Member member = memberService.findMemberByEmail(email);
        Comment comment = commentRepository.findById(commentId).get();

        verifyExistsLike(member, comment);

        commentReport.setCreatedAt(LocalDateTime.now());

        return commentReportRepository.save(commentReport);
    }

    // 신고 여부 검증
    private void verifyExistsLike(Member member, Comment comment)  {

        Optional<CommentReport> report = commentReportRepository.findByMemberAndPost(member, comment);
        if (report.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_REPORTED);
        }
    }
}
