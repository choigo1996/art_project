package com.cbw.art.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.model.Purchase;
import com.cbw.art.service.PurchaseService;
import com.cbw.art.service.impl.PurchaseServiceImpl;

@RestController
@RequestMapping("api/products/purchase")
public class PurchaseController {
	
	private PurchaseServiceImpl purchaseServiceImpl;
	
	@Autowired
	public PurchaseController(PurchaseServiceImpl purchaseServiceImpl) {
		super();
		this.purchaseServiceImpl = purchaseServiceImpl;
	}

	//카트에 담긴 목록을 구매 후 저장
	@PostMapping()
	public ResponseEntity<Purchase> savePurchase(@RequestBody Purchase purchase) {
		return new ResponseEntity<Purchase>(
				purchaseServiceImpl.savePurchase(purchase),HttpStatus.OK);
	}
	//모든 회원이 구매한 목록을 저장
	@PostMapping("list")
	public ResponseEntity<List<Purchase>> savePurchaseList(
			@RequestBody List<Purchase> purchaseList) {
		List<Purchase> savedPurchaseList = new ArrayList<Purchase>();
		for (Purchase purchase : purchaseList) {
			savedPurchaseList.add(purchaseServiceImpl.savePurchase(purchase));
		}
		return new ResponseEntity<List<Purchase>>(savedPurchaseList,HttpStatus.OK);
	}
	//모든 회원이 구매한 모든 목록을 불러오기
	@GetMapping()
	public ResponseEntity<List<Purchase>> getAllPurchase() {
		return new ResponseEntity<List<Purchase>>(purchaseServiceImpl.getAllPurchase(), HttpStatus.OK);
	}
	//각 회원이 구매한 모든 목록을 불러온다
	@GetMapping("{loginId}")
	public ResponseEntity<List<Purchase>> getPurchaseById(@PathVariable String loginId) {
		return new ResponseEntity<List<Purchase>>(
				purchaseServiceImpl.getPurchaseById(loginId),HttpStatus.OK);
	}
}
