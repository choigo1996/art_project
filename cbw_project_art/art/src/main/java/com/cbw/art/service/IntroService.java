package com.cbw.art.service;


import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.IntroDto;

public interface IntroService {
	//강의소개 생성
	public BaseResponse<Void> createIntro(IntroDto introDto);
	//강의소개 표시
	public BaseResponse<IntroDto> getIntro();
}
