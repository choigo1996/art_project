package com.cbw.art.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.service.impl.LectureReviewServiceImpl;

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
	
	//댓글기능 
	
}
