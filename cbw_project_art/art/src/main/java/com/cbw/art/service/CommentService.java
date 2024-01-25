package com.cbw.art.service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CommentDto;
import com.cbw.art.model.Comment;

import java.util.List;

import org.springframework.security.core.Authentication;


public interface CommentService {
	//댓글작성
	public BaseResponse<Void> createComment(Authentication authentication, CommentDto commentDto);
	//댓글 목록
	public BaseResponse<List<Comment>> getAllComment();
	//댓글 삭제
	public BaseResponse<Long> deleteComment(Long id);
}
