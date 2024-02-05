package com.cbw.art.service;


import java.util.List;

import org.springframework.security.core.Authentication;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.PurchaseDto;
import com.cbw.art.model.Purchase;

public interface PurchaseService {
	//카트에 담긴 것을 구매
	public BaseResponse<Void> savePurchase(Authentication authentication, PurchaseDto purchseDto);
	//모든 회원의 구매정보 불러오기
	public BaseResponse<List<Purchase>> getAllPurchase();
	//특정 강의 ID에 해당하는 모든 사용자의 정보 조회
	public BaseResponse<List<Purchase>> getPurchaseByLectureId(long lectureId);
	//특정 사용자가 구매한 모든 강의의 정보 조회
	public BaseResponse<List<Purchase>> getPurchaseByUserId(long userId);
}
