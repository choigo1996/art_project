package com.cbw.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
import com.cbw.art.dto.LectureReviewDto;
import com.cbw.art.model.LectureReview;
import com.cbw.art.service.impl.LectureReviewServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("api/review")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT})
public class LectureReviewController {
	private LectureReviewServiceImpl lectureReviewServiceImpl;
	
	@Autowired
	public LectureReviewController(LectureReviewServiceImpl lectureReviewServiceImpl) {
		super();
		this.lectureReviewServiceImpl = lectureReviewServiceImpl;
	}
	
	//후기기능 
	@PostMapping
	public ResponseEntity<BaseResponse<Void>> createReview(@RequestBody @Valid LectureReviewDto lectureReviewDto){
		return new ResponseEntity<>(
				lectureReviewServiceImpl.createReview(lectureReviewDto),
				HttpStatus.CREATED);
	}
	//후기목록
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<LectureReview>>> getAllReview(){
		return new ResponseEntity<>(
				lectureReviewServiceImpl.getAllReview(),
				HttpStatus.OK);
	}
	//후기삭제
	@DeleteMapping("delete/{id}")
	public ResponseEntity<BaseResponse<Long>> deleteReview (@PathVariable Long id) {
		return new ResponseEntity<> (
				lectureReviewServiceImpl.deleteReview(id),
				HttpStatus.OK);
	}
	//후기 하나의 정보를 가져옴
	@GetMapping("/list/{id}")
	public ResponseEntity<LectureReview> getReviewById (@PathVariable long id) {
		return new ResponseEntity<LectureReview>(
				lectureReviewServiceImpl.getReviewById(id),
				HttpStatus.OK);
	}
}
