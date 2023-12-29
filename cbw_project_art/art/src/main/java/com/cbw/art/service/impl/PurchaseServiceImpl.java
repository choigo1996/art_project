package com.cbw.art.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbw.art.model.Purchase;
import com.cbw.art.repository.PurchaseRepository;
import com.cbw.art.service.PurchaseService;

@Service
public class PurchaseServiceImpl implements PurchaseService{
	private PurchaseRepository purchaseRepository;

	@Autowired
	public PurchaseServiceImpl(PurchaseRepository purchaseRepository) {
		super();
		this.purchaseRepository = purchaseRepository;
	}

	@Override
	public Purchase savePurchase(Purchase purchase) {
		return purchaseRepository.save(purchase);
	}

	@Override
	public List<Purchase> getAllPurchase() {
		return purchaseRepository.findAll();
	}

	@Override
	public List<Purchase> getPurchaseById(String loginId) {
		return purchaseRepository.findByLoginId(loginId);
	}
	
	
}
