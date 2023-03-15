package com.mainproject.member.dto;

import com.mainproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class WriterResponse {

    private long memberId;
    private boolean isDoctor;
    private String name;
    private String displayName;
    private Member.MemberRating memberRating;
}
