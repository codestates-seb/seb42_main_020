package com.mainproject.subEntity.service;

import com.mainproject.global.exception.BusinessLogicException;
import com.mainproject.global.exception.ExceptionCode;
import com.mainproject.subEntity.hospital.Hospital;
import com.mainproject.subEntity.hospital.HospitalRepository;
import com.mainproject.subEntity.medicalTag.MedicalTag;
import com.mainproject.subEntity.medicalTag.MedicalTagRepository;
import com.mainproject.subEntity.region.Region;
import com.mainproject.subEntity.region.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class SubService {

    private final HospitalRepository hospitalRepository;
    private final MedicalTagRepository medicalTagRepository;
    private final RegionRepository regionRepository;

    public Hospital findHospital(String name) {

        return hospitalRepository.findByName(name).get();
    }

    public MedicalTag findMedicalTag(String title) {

        return medicalTagRepository.findByTitle(title).get();
    }

    public Region findRegion(String name) {

        return regionRepository.findByName(name).get();
    }

    public void updateHospitalGrade(Long hospitalId, int newStarRating) {
        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.HOSPITAL_NOT_FOUND));

        double totalStarRating = (hospital.getGrade() * hospital.getReviewCount()) + newStarRating;
        double newGrade = totalStarRating / (hospital.getReviewCount() + 1);

        hospital.setGrade(newGrade);
        hospital.setReviewCount(hospital.getReviewCount() + 1);

        hospitalRepository.save(hospital);
    }
}
