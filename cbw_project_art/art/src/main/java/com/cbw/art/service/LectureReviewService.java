package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.LectureReviewDto;
import com.cbw.art.model.LectureReview;

public interface LectureReviewService {
	//댓글 작성
	public BaseResponse<Void> createReview(LectureReviewDto lectureReviewDto);
	//댓글 목록
	public BaseResponse<List<LectureReview>> getAllReview();
	//댓글 삭제
	public BaseResponse<Long> deleteReview(Long id);
	//댓글 상세 조회
	LectureReview getReviewById(long id);
}