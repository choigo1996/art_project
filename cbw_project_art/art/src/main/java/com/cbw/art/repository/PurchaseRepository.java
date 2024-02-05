package com.cbw.art.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Lecture;
import com.cbw.art.model.Purchase;
import com.cbw.art.model.User;

public interface PurchaseRepository extends JpaRepository<Purchase, Long>{
	List<Purchase> findByUserId(Long userId);
	List<Purchase> findByLectureId(Long lectureId);

}
