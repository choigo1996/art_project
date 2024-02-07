package com.cbw.art.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.IntroDto;

import com.cbw.art.model.Intro;
import com.cbw.art.service.impl.IntroServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/intro")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST})
public class IntroController {
	private final IntroServiceImpl introServiceImpl;

	@Autowired
	public IntroController(IntroServiceImpl introServiceImpl) {
		super();
		this.introServiceImpl = introServiceImpl;
	}
	
	//소개글 생성
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<Void>> createIntro(@RequestBody @Valid IntroDto introDto){
		return new ResponseEntity<>(
				introServiceImpl.createIntro(introDto),
				HttpStatus.CREATED);
	}
	//소개글 가져와
	@GetMapping("{lectureId}")
	public ResponseEntity<BaseResponse<List<Intro>>> getIntroByLectureId(@PathVariable long lectureId){
		return new ResponseEntity<>(
				introServiceImpl.getIntroByLectureId(lectureId),
				HttpStatus.OK);
	}
}
