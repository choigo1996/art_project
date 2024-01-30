package com.cbw.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.ReviewDto;
import com.cbw.art.model.Review;
import com.cbw.art.service.impl.ReviewServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/review")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class ReviewController {
	
	private final ReviewServiceImpl reviewServiceImpl;

	@Autowired
	public ReviewController(ReviewServiceImpl reviewServiceImpl) {
		super();
		this.reviewServiceImpl = reviewServiceImpl;
	}
	
	//후기 작성
	@PostMapping
	@PreAuthorize("hasAnyRole('USER','ADMIN','TEACHER')")
	public ResponseEntity<BaseResponse<Void>> createReview(@RequestBody @Valid ReviewDto reviewDto,Authentication authentication){
		return new ResponseEntity<>(
				reviewServiceImpl.createReview(authentication, reviewDto),
				HttpStatus.CREATED);
	}
	//후기 목록
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<Review>>> getAllReview(){
		return new ResponseEntity<>(
				reviewServiceImpl.getAllReview(),
				HttpStatus.OK);
	}
	//후기삭제
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<BaseResponse<Long>> deleteReview(@PathVariable Long id) {
		return new ResponseEntity<>(
				reviewServiceImpl.deleteReview(id),
				HttpStatus.OK);
	}
	
}
