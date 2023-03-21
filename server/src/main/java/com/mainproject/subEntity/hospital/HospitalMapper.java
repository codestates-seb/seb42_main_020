package com.mainproject.subEntity.hospital;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface HospitalMapper {

    Hospital hospitalPostToHospital(HospitalPostDto postDto);
}
