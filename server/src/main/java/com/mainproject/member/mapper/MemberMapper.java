package com.mainproject.member.mapper;

import com.mainproject.member.dto.*;
import com.mainproject.member.entity.Member;
import com.mainproject.post.dto.PendingReviewResponse;
import com.mainproject.post.dto.PostResponseMyPageInfo;
import com.mainproject.post.entity.Post;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    /// 일반회원
    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);

    @Mapping(target = "memberId", source = "member.memberId")
    @Mapping(target = "postResponseMyPageInfos", source = "member.posts")
    MemberDto.response memberToMemberResponse(Member member);

    // 의사회원
    Member doctorPostToMember(DoctorDto.Post requestBody);
    Member doctorPatchToMember(DoctorDto.Patch requestBody);

    @Mapping(target = "memberId", source = "member.memberId")
    DoctorDto.response memberToDoctorResponse(Member member);

    List<DoctorDto.response> membersToDoctorResponses(List<Member> members);

    // 게시글 작성자
    WriterResponse memberToWriterResponse(Member member);

    PendingMemberResponse pendingMemberResponse(Member member);
    List<PendingMemberResponse> pendingMemberResponses(List<Member> members);

    PendingReviewResponse pendingReviewResponse(Post post);
    List<PendingReviewResponse> pendingReviewResponses(List<Post> posts);

    // 승인 대기중인 회원, 리뷰글 조회
    @Mapping(target = "pendingMemberResponses", source = "members")
    @Mapping(target = "pendingReviewResponses", source = "posts")
    PendingResponse pendingResponse(List<Member> members, List<Post> posts);

    // 마이페이지 매핑
    @Mapping(target = "medicalTagTitle", source = "post.medicalTag.title")
    @Mapping(target = "regionName", source = "post.region.name")
    @Mapping(target = "hospitalName", source = "post.hospital.name")
    PostResponseMyPageInfo postToMyPageInfo(Post post);
}
