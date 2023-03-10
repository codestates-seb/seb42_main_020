package com.mainproject.doctor.service;

import com.mainproject.doctor.entity.Doctor;
import com.mainproject.doctor.repository.DoctorRepository;
import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.member.entity.Member;
import com.mainproject.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Transactional
@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctorRepository;
    private final MemberRepository memberRepository;

    // 의사 회원가입
    public Doctor createDoctor(Doctor doctor) {

        doctor.setCreatedAt(LocalDateTime.now());
        doctor.setModifiedAt(LocalDateTime.now());

        // 패스워드 암호화

        // USER Role 저장

        return doctorRepository.save(doctor);
    }

    // 의사 회원 수정 (로그인 검증 필요)
    public Doctor updateDoctor(Doctor doctor) {

        Doctor findDoctor = findVerifiedDoctor(doctor.getDoctorId());

        findDoctor.setPassword(doctor.getPassword());

        // 패스워드 암호화

        findDoctor.setModifiedAt(LocalDateTime.now());

        return doctorRepository.save(findDoctor);
    }

    // 특정 의사 찾기
    public Doctor findDoctor(long doctorId) {
        return findVerifiedDoctor(doctorId);
    }

    // 의사 삭제 (로그인 검증 필요)
    public Doctor deleteDoctor(long doctorId) {

        Doctor findDoctor = findVerifiedDoctor(doctorId);

        findDoctor.setModifiedAt(LocalDateTime.now());
        findDoctor.setDoctorStatus(Doctor.DoctorStatus.DOCTOR_QUIT);

        return doctorRepository.save(findDoctor);
    }

    // 이메일 중복 체크 로직
    public void emailDuplicateCheck(String email) {

        // 의사 이메일 체크
        Optional<Doctor> doctor = doctorRepository.findByEmail(email);
        if (doctor.isPresent())
            throw new BusinessLogicException(ExceptionCode.DOCTOR_EXISTS);

        // 회원 이메일 체크
        Optional<Member> member = memberRepository.findByEmail(email);
        if (member.isPresent())
            throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
    }

    // 의사회원 존재와 휴면,탈퇴 유무 체크
    public Doctor findVerifiedDoctor(long doctorId) {

        Optional<Doctor> optionalDoctor =
                doctorRepository.findById(doctorId);
        Doctor findDoctor =
                optionalDoctor.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.DOCTOR_NOT_FOUND));
        if(findDoctor.getDoctorStatus() != Doctor.DoctorStatus.DOCTOR_ACTIVE) throw new BusinessLogicException(ExceptionCode.INVALID_DOCTOR_STATUS);

        return findDoctor;
    }

    // 좋아요, 채택, 게시글, 리뷰 작성 로직에 추가하는 등급 업데이트 로직
    public Doctor updateRating(Doctor doctor) {

        if (doctor.getPoint() >= 300) {
            doctor.setDoctorRating(Doctor.DoctorRating.GOLD);
        } else if (doctor.getPoint() >= 200) {
            doctor.setDoctorRating(Doctor.DoctorRating.SLIVER);
        } else if (doctor.getPoint() >= 100) {
            doctor.setDoctorRating(Doctor.DoctorRating.BRONZE);
        } doctor.setDoctorRating(Doctor.DoctorRating.UNRANKED);

        return doctorRepository.save(doctor);
    }
}
