package com.cbw.art.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
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
import com.cbw.art.dto.LectureListDto;
import com.cbw.art.model.LectureList;
import com.cbw.art.service.impl.LectureListServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/lelist")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class LectureListController {
	private final LectureListServiceImpl lectureListServiceImpl;

	public LectureListController(LectureListServiceImpl lectureListServiceImpl) {
		super();
		this.lectureListServiceImpl = lectureListServiceImpl;
	}
	
	//강의목록에 강의추가
	@PostMapping
	@PreAuthorize("hasAnyRole('ADMIN','TEACHER')")
	public ResponseEntity<BaseResponse<Void>> createLeList(@RequestBody @Valid LectureListDto lectureListDto){
		return new ResponseEntity<>(
				lectureListServiceImpl.createLeList(lectureListDto),
				HttpStatus.CREATED);
	}
	//목록
	@GetMapping
	public ResponseEntity<BaseResponse<List<LectureList>>> getAllLeList() {
		return new ResponseEntity<>(
				lectureListServiceImpl.getAllLeList(),
				HttpStatus.OK);
	}
	@DeleteMapping("delete/{id}")
	@PreAuthorize("hasAnyRole('ADMIN')")
	public ResponseEntity<BaseResponse<Long>> deleteLeList(@PathVariable Long id){
		return new ResponseEntity<>(
				lectureListServiceImpl.deleteLeList(id),
				HttpStatus.OK);
	}
}