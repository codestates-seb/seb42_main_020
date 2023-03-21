package com.mainproject.member.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class PendingMemberResponse {

    private long memberId;
    private String email;
    private String name;
    private String hospitalName;
    private String area;
    private boolean isDoctor;
    private LocalDateTime createdAt;
}
