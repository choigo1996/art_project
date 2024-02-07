package com.cbw.art.service;


import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.IntroDto;
import com.cbw.art.model.Intro;

public interface IntroService {
	//강의소개 생성
	public BaseResponse<Void> createIntro(IntroDto introDto);
	//강의 ID에 해당하는 소개글 가져오기
	public BaseResponse<List<Intro>> getIntroByLectureId(long lectureId);
}
