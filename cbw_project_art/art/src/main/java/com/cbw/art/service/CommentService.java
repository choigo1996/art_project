package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.CommentDto;

public interface CommentService {
	
	CommentDto createComment(Long questionId,CommentDto commentDto);
	List<CommentDto> getCommentsByQuestionId(Long questionId);
	CommentDto updateComment(Long commentId,CommentDto updatedCommentDto);
	void deleteComment(Long commentId);
}
