package com.mainproject.doctor.mapper;

import com.mainproject.doctor.dto.DoctorDto;
import com.mainproject.doctor.entity.Doctor;
import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface DoctorMapper {

    Doctor doctorPostToDoctor(DoctorDto.Post requestBody);
    Doctor doctorPatchToDoctor(DoctorDto.Patch requestBody);

    @Mapping(target = "doctorId", source = "doctor.doctorId")
    DoctorDto.response doctorToDoctorResponse(Doctor doctor);

    List<DoctorDto.response> doctorsToDoctorResponses(List<Doctor> doctors);
}
