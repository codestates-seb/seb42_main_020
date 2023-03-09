package com.mainproject.doctor.repository;

import com.mainproject.doctor.entity.Doctor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    // 이메일 찾기
    Optional<Doctor> findByEmail(String email);

    @Override
    @Query(value = "SELECT * FROM DOCTOR WHERE Doctor_Status <> 'DOCTOR_QUIT'", nativeQuery = true)
    Page<Doctor> findAll(Pageable pageable);
}
