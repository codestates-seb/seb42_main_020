package com.mainproject.global.dto;

import lombok.Getter;

import java.security.Principal;

@Getter
public class PrincipalDto implements Principal {

    Long memberId;
    String email;

    public PrincipalDto(Long memberId, String email) {
        this.memberId = memberId;
        this.email = email;
    }

    @Override
    public String getName() {
        return email;
    }
}