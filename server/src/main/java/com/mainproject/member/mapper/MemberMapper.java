package com.mainproject.member.mapper;

import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface MemberMapper {

    Member memberPostToMember(MemberDto.Post requestBody);
    Member memberPatchToMember(MemberDto.Patch requestBody);

    @Mapping(target = "memberId", source = "member.memberId")
    MemberDto.response memberToMemberResponse(Member member);

    List<MemberDto.response> membersToMemberResponses(List<Member> members);
}
