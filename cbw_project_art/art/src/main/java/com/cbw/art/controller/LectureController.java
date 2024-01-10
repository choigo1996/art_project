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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.cbw.art.dto.LectureDto;
import com.cbw.art.model.Lecture;
import com.cbw.art.service.impl.LectureServiceImpl;

@RestController
@RequestMapping("api/products")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT})
public class LectureController {
	
	private LectureServiceImpl lectureServiceImpl;

	@Autowired
	public LectureController(LectureServiceImpl lectureServiceImpl) {
		super();
		this.lectureServiceImpl = lectureServiceImpl;
	}
	//DB저장~
	@PostMapping()
	public ResponseEntity<Lecture> saveLecture(@RequestBody Lecture lecture){
		return new ResponseEntity<Lecture>(
				lectureServiceImpl.saveLecture(lecture),HttpStatus.CREATED);
	}
	//모든 정보 가져오기
	@GetMapping()
	public ResponseEntity<List<LectureDto>> getAllLectuer() {
		return new ResponseEntity<List<LectureDto>>(
				lectureServiceImpl.getAllLectuer(),HttpStatus.OK);
	}
	//하나만 가져오기
	@GetMapping("{id}")
	public ResponseEntity<Lecture> getLectureById(@PathVariable long id) {
		return new ResponseEntity<Lecture>(
				lectureServiceImpl.getLectureById(id),HttpStatus.OK);
	}
	//id로 해당 정보 업뎃
	@PutMapping("/update/{id}")
	public ResponseEntity<Lecture> updateLectureById(
			@RequestBody Lecture lecture,@PathVariable long id) {
		return new ResponseEntity<Lecture>(
				lectureServiceImpl.updateLectureById(lecture, id),HttpStatus.OK);
	}
	//해당 정보 삭제
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteLectureById(@PathVariable long id) {
		return new ResponseEntity<String>(
				"삭제 완료.",HttpStatus.OK);
	}
}
