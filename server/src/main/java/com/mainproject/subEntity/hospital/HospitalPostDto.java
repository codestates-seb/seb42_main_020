package com.mainproject.subEntity.hospital;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class HospitalPostDto {

    @NotBlank
    private String name;

    @NotBlank
    private String phone;

    @NotBlank
    private String address;
}
