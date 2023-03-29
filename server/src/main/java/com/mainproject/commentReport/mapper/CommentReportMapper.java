package com.mainproject.commentReport.mapper;

import com.mainproject.commentReport.dto.CommentReportPostDto;
import com.mainproject.commentReport.entity.CommentReport;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface CommentReportMapper {

    CommentReport commentReportPostDtoToCommentReport(CommentReportPostDto postDto);
}
