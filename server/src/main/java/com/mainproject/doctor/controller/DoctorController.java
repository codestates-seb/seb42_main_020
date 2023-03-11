package com.mainproject.doctor.controller;

import com.mainproject.doctor.dto.DoctorDto;
import com.mainproject.doctor.entity.Doctor;
import com.mainproject.doctor.mapper.DoctorMapper;
import com.mainproject.doctor.service.DoctorService;
import com.mainproject.member.dto.MemberDto;
import com.mainproject.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/doctors")
@Validated
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;
    private final DoctorMapper doctorMapper;

    @PostMapping
    public ResponseEntity postDoctor(@Valid @RequestBody DoctorDto.Post requestBody) {

        Doctor doctor = doctorMapper.doctorPostToDoctor(requestBody);

        doctorService.createDoctor(doctor);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("{doctor-id}")
    public ResponseEntity patchDoctor(@PathVariable("{doctor-id}") long doctorId,
                                      @Valid @RequestBody DoctorDto.Patch requestBody) {

        requestBody.addDoctorId(doctorId);

        Doctor doctor =
                doctorService.updateDoctor(doctorMapper.doctorPatchToDoctor(requestBody));

        return new ResponseEntity<>(response(doctor), HttpStatus.OK);
    }

    @GetMapping("{doctor-id}")
    public ResponseEntity getDoctor(@PathVariable("{doctor-id}") long doctorId) {

        Doctor doctor = doctorService.findDoctor(doctorId);

        return new ResponseEntity<>(response(doctor), HttpStatus.OK);
    }

    @DeleteMapping("{doctor-id}")
    public ResponseEntity deleteDoctor(@PathVariable("{doctor-id}") long doctorId) {

        doctorService.deleteDoctor(doctorId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public DoctorDto.response response(Doctor doctor) {
        return doctorMapper.doctorToDoctorResponse(doctor);
    }
}
