package com.mainproject.postReport.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import com.mainproject.postReport.entity.PostReport;
import com.mainproject.postReport.repository.PostReportRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class PostReportService {

    private final PostReportRepository postReportRepository;
    private final MemberService memberService;
    private final PostRepository postRepository;

    public PostReport createReport(PostReport postReport, String email, long postId) {

        Member member = memberService.findMemberByEmail(email);
        Post post = postRepository.findById(postId).get();

        verifyExistsLike(member, post);

        postReport.setCreatedAt(LocalDateTime.now());

        return postReportRepository.save(postReport);
    }

    // 신고 여부 검증
    private void verifyExistsLike(Member member, Post post)  {

        Optional<PostReport> report = postReportRepository.findByMemberAndPost(member, post);
        if (report.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_REPORTED);
        }
    }
}
