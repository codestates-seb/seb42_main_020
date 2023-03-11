package com.mainproject.doctor.repository;

import com.mainproject.doctor.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // 이메일 찾기
    Optional<Doctor> findByEmail(String email);
}
