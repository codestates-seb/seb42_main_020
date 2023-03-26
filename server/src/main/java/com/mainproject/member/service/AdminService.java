package com.mainproject.member.service;

import com.mainproject.comment.repository.CommentRepository;
import com.mainproject.comment.service.CommentService;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import com.mainproject.member.service.MemberService;
import com.mainproject.post.entity.Post;
import com.mainproject.post.repository.PostRepository;
import com.mainproject.post.service.PostService;
import com.mainproject.subEntity.hospital.Hospital;
import com.mainproject.subEntity.service.SubService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class AdminService {

    private final MemberService memberService;
    private final PostService postService;
    private final CommentService commentService;
    private final SubService subService;
    private final MemberRepository memberRepository;
    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    // 멤버 병원 저장
    public void associateHospitalToMember(long memberId, String hospitalName) {
        Hospital hospital = subService.findHospital(hospitalName);
        Member member = memberService.findPendingMember(memberId);

        member.setHospital(hospital);
    }

    // 리뷰글 병원 저장
    public void associateHospitalToReview(long postId, String hospitalName) {
        Hospital hospital = subService.findHospital(hospitalName);
        Post post = postService.findPendingPost(postId);

        post.setHospital(hospital);
    }

    public void deleteMember(long memberId) {
        memberRepository.deleteById(memberId);
    }

    public void deletePost(long postId) {
        postRepository.deleteById(postId);
    }

    public void deleteComment(long commentId) {
        commentRepository.deleteById(commentId);
    }
}
