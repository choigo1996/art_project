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

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CommentDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.service.impl.CommentServiceImpl;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins="http://localhost:3000",
methods= {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE,RequestMethod.PUT})
public class CommentController {
	private final CommentServiceImpl commentServiceImpl;

	@Autowired
	public CommentController(CommentServiceImpl commentServiceImpl) {
		super();
		this.commentServiceImpl = commentServiceImpl;
	}
	
	//답글생성
	@PostMapping("/question/{questionId}")
	public ResponseEntity<BaseResponse<CommentDto>> createComment(
            @PathVariable Long questionId,
            @RequestBody CommentDto commentDto) {
        // 특정 질문에 댓글을 추가하는 요청을 처리
        CommentDto addedComment = commentServiceImpl.createComment(questionId, commentDto);
        return new ResponseEntity<>(
                new BaseResponse<>(ResultCode.SUCCESS.name(), addedComment, "댓글이 추가되었습니다."),
                HttpStatus.CREATED);
    }
	 @GetMapping("/question/{questionId}")
	    public ResponseEntity<BaseResponse<List<CommentDto>>> getCommentsByQuestionId(
	            @PathVariable Long questionId) {
	        List<CommentDto> comments = commentServiceImpl.getCommentsByQuestionId(questionId);
	        return new ResponseEntity<>(
	                new BaseResponse<>(ResultCode.SUCCESS.name(), comments, "댓글 목록 조회 성공"),
	                HttpStatus.OK);
	    }

	    // 댓글 수정
	    @PutMapping("/{commentId}")
	    public ResponseEntity<BaseResponse<CommentDto>> updateComment(
	            @PathVariable Long commentId,
	            @RequestBody CommentDto updatedCommentDto) {
	        CommentDto updatedComment = commentServiceImpl.updateComment(commentId, updatedCommentDto);
	        return new ResponseEntity<>(
	                new BaseResponse<>(ResultCode.SUCCESS.name(), updatedComment, "댓글 수정 성공"),
	                HttpStatus.OK);
	    }

	    // 댓글 삭제
	    @DeleteMapping("/{commentId}")
	    public ResponseEntity<BaseResponse<Void>> deleteComment(
	            @PathVariable Long commentId) {
	        commentServiceImpl.deleteComment(commentId);
	        return new ResponseEntity<>(
	                new BaseResponse<>(ResultCode.SUCCESS.name(), null, "댓글 삭제 성공"),
	                HttpStatus.NO_CONTENT);
	    }
}
