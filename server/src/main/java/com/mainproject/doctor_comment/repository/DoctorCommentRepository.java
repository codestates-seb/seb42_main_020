package com.mainproject.doctor_comment.repository;

import com.mainproject.doctor_comment.entity.DoctorComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DoctorCommentRepository extends JpaRepository<DoctorComment, Long> {

}
