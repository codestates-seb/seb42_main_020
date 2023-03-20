package com.mainproject.member.mapper;

import com.mainproject.member.dto.DoctorDto;
import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.dto.WriterResponse;
import com.mainproject.member.entity.Member;
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
}
