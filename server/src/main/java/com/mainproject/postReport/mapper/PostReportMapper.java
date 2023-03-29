package com.mainproject.postReport.mapper;

import com.mainproject.postReport.dto.PostReportPostDto;
import com.mainproject.postReport.entity.PostReport;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface PostReportMapper {

    PostReport postReportPostDtoToPostReport(PostReportPostDto postDto);
}
