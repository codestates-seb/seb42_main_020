package com.mainproject.member.dto;

import com.mainproject.post.dto.PendingReviewResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class PendingResponse {

    List<PendingMemberResponse> pendingMemberResponses;
    List<PendingReviewResponse> pendingReviewResponses;
}
