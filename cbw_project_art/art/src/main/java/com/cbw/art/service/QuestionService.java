package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.QuestionDto;
import com.cbw.art.model.Question;


public interface QuestionService {
		//게시글 생성
		public BaseResponse<Void> createQuest(QuestionDto questionDto);
		//게시글 목록
		public BaseResponse<List<Question>> getAllQuest();
		//게시글 삭제
		public BaseResponse<Long> deleteQuest(Long id);
		//게시글 하나의 정보만을 가져온
		Question getQuestById(long id);
}
