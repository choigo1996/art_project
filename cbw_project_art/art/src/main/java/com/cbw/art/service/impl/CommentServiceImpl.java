package com.cbw.art.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CommentDto;
import com.cbw.art.service.CommentService;

@Service
@Transactional
public class CommentServiceImpl implements CommentService{

	@Override
	public BaseResponse<Void> createComment(CommentDto commentDto,String loginId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseResponse<List<CommentDto>> getAllComment() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BaseResponse<Long> deleteComment(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public CommentDto getCommentById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
