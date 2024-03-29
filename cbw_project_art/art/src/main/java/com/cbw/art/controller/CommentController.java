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
import com.cbw.art.dto.CommentDto;
import com.cbw.art.model.Comment;
import com.cbw.art.service.impl.CommentServiceImpl;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE})
public class CommentController {
	private final CommentServiceImpl commentServiceImpl;

	@Autowired
	public CommentController(CommentServiceImpl commentServiceImpl) {
		super();
		this.commentServiceImpl = commentServiceImpl;
	}
	
	//댓글생성
	@PostMapping
	@PreAuthorize("hasAnyRole('USER','ADMIN','TEACHER')")
	public ResponseEntity<BaseResponse<Void>> createComment(@RequestBody @Valid CommentDto commentDto,Authentication authentication){
		return new ResponseEntity<> (
				commentServiceImpl.createComment(authentication, commentDto),
				HttpStatus.CREATED);
	}
	//댓글목록
	@GetMapping("/list")
	public ResponseEntity<BaseResponse<List<Comment>>> getAllComment()
	{
		return new ResponseEntity<>(
				commentServiceImpl.getAllComment(),
				HttpStatus.OK);
	}
	//댓글삭제
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<BaseResponse<Long>> deleteComment(@PathVariable Long id) {
		return new ResponseEntity<> (
				commentServiceImpl.deleteComment(id),
				HttpStatus.OK);
	}
}
