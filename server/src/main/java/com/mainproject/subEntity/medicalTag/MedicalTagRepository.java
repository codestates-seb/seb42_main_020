package com.mainproject.subEntity.medicalTag;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MedicalTagRepository extends JpaRepository<MedicalTag, Long> {

    Optional<MedicalTag> findByTitle(String title);
}
