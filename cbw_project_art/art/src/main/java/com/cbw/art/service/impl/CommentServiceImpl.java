package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;


import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CommentDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Comment;
import com.cbw.art.model.Question;
import com.cbw.art.repository.CommentRepository;
import com.cbw.art.repository.QuestionRepository;
import com.cbw.art.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{
	
	private final CommentRepository commentRepository;
	private final QuestionRepository questionRepository;

	public CommentServiceImpl(CommentRepository commentRepository, QuestionRepository questionRepository) {
		super();
		this.commentRepository = commentRepository;
		this.questionRepository = questionRepository;
	}

	//댓글작성
	@Override
	public BaseResponse<Void> createComment(CommentDto commentDto) {
		if(commentDto.getWriter() == null || commentDto.getWriter().isEmpty()) {
			throw new InvalidRequestException("Invalid Writer" , "댓글 작성자가 없습니다.");
		}
		Question question = questionRepository.findById(commentDto.getQuestion())
				.orElseThrow(() -> new InvalidRequestException("Invalid Question","존재하지 않는 질문입니다."));
		Comment comment = new Comment();
		comment.setWriter(commentDto.getWriter());
		comment.setText(commentDto.getText());
		comment.setCreateAt(LocalDateTime.now());
		
		comment.setQuestion(question);
		
		commentRepository.save(comment);
		
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				null,
				"댓글이 작성되었습니다.");
	}
	
	//댓글 목록
	@Override
	public BaseResponse<List<Comment>> getAllComment() {
		List<Comment> comments = commentRepository.findAll();
		if(comments.isEmpty()) {
			throw new InvalidRequestException("Not Found","등록된 댓글이 없음.");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				comments,
				ResultCode.SUCCESS.getMsg());
	}
	//댓삭
	@Override
    public BaseResponse<Long> deleteComment(Long id) {
        // 댓글의 존재 여부 확인
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new InvalidRequestException("Invalid Comment", "존재하지 않는 댓글입니다."));
        // 댓글 삭제
        commentRepository.deleteById(id);
        return new BaseResponse<>(
                ResultCode.SUCCESS.name(),
                id,
                "댓글이 성공적으로 삭제되었습니다.");
    }

}
