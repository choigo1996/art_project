package com.cbw.art.service;

import java.util.List;

import com.cbw.art.model.Purchase;

public interface PurchaseService {
	Purchase savePurchase(Purchase purchase);
	List<Purchase> getAllPurchase();
	List<Purchase> getPurchaseById(String loginId);
}
