package com.cbw.art.controller;


import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.PurchaseDto;
import com.cbw.art.model.Purchase;
import com.cbw.art.service.impl.PurchaseServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/purchase")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class PurchaseController {
	
	private final PurchaseServiceImpl purchaseServiceImpl;
	
	@Autowired
	public PurchaseController(PurchaseServiceImpl purchaseServiceImpl) {
		super();
		this.purchaseServiceImpl = purchaseServiceImpl;
	}

	//카트에 담긴 것을 구매
	@PostMapping
	@PreAuthorize("hasAnyRole('USER')")
	public ResponseEntity<BaseResponse<Void>> savePurchase(@RequestBody @Valid PurchaseDto purchaseDto,Authentication authentication){
		return new ResponseEntity<>(
				purchaseServiceImpl.savePurchase(authentication, purchaseDto),
				HttpStatus.OK);
	}
	//모든 회원이 구매한 목록을 저장
	@PostMapping("/list")
	public ResponseEntity<List<PurchaseDto>> savePurchaseList(
	        @RequestBody @Valid List<PurchaseDto> purchaseList,
	        Authentication authentication) {
	    List<PurchaseDto> savedPurchaseList = new ArrayList<PurchaseDto>();
	    for (PurchaseDto purchaseDto : purchaseList) {
	        // 중복 체크
	        if (!savedPurchaseList.contains(purchaseDto)) {
	            BaseResponse<Void> savePurchaseResponse = purchaseServiceImpl.savePurchase(authentication, purchaseDto);
	            if ("SUCCESS".equals(savePurchaseResponse.getResultCode())) {
	                savedPurchaseList.add(purchaseDto);
	            } else {
	                System.out.println("실패! 임마!");
	            }
	        }
	    }
	    return new ResponseEntity<>(
	    		savedPurchaseList,
	    		HttpStatus.OK);
	}


	//모든 회원의 구매정보 불러오기
	@GetMapping("/list/user")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<List<Purchase>>> getAllPurchase() {
		return new ResponseEntity<>(
				purchaseServiceImpl.getAllPurchase(),
				HttpStatus.OK);
	}
	
	//특정 강의 ID에 해당하는 모든 사용자의 정보 조회
	@GetMapping("lecture/{lectureId}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<List<Purchase>>> getPurchaseByLectureId(@PathVariable long lectureId){
		return new ResponseEntity<>(
				purchaseServiceImpl.getPurchaseByLectureId(lectureId),
				HttpStatus.OK);
	}
	
	//각 회원이 구매한 모든 강의의 정보 조회
	@GetMapping("user/{userId}")
	public ResponseEntity<BaseResponse<List<Purchase>>> getPurchaseByUserId(@PathVariable long userId){
		return new ResponseEntity<>(
				purchaseServiceImpl.getPurchaseByUserId(userId),
				HttpStatus.OK);
	}

}
