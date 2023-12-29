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
import com.cbw.art.dto.QuestionDto;
import com.cbw.art.model.Question;
import com.cbw.art.service.impl.QuestionServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/question")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class QuestionController {
	
	private final QuestionServiceImpl questionServiceImpl;

	@Autowired
	public QuestionController(QuestionServiceImpl questionServiceImpl) {
		super();
		this.questionServiceImpl = questionServiceImpl;
	}
	
	//공지사항 생성
	@PostMapping
	public ResponseEntity<BaseResponse<Void>> createQuest(@RequestBody @Valid QuestionDto questionDto){
		return new ResponseEntity<>(
				questionServiceImpl.createQuest(questionDto),
				HttpStatus.CREATED);
	}
	//공지사항 목록
	@GetMapping
	public ResponseEntity<BaseResponse<List<Question>>> getAllQuest()
	{
		return new ResponseEntity<>(
				questionServiceImpl.getAllQuest(),
				HttpStatus.OK);
		}
	//공지사항 삭제
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<BaseResponse<Long>> deleteQuest (@PathVariable Long id) {
		return new ResponseEntity<>(
				questionServiceImpl.deleteQuest(id),
					HttpStatus.OK);
		}
}
