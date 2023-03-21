package com.mainproject.member.dto;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.mainproject.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
@JsonAutoDetect(fieldVisibility = JsonAutoDetect.Visibility.ANY)
public class WriterResponse {

    private long memberId;
    private boolean isDoctor;
    private String name;
    private String displayName;
    private String hospitalName;
    private Member.MemberRating memberRating;
}
