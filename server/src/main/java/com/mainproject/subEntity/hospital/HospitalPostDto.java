package com.mainproject.subEntity.hospital;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;

@Getter
@AllArgsConstructor
public class HospitalPostDto {

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;
}
