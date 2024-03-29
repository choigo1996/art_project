package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CommentDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Comment;
import com.cbw.art.model.Question;
import com.cbw.art.model.User;
import com.cbw.art.repository.CommentRepository;
import com.cbw.art.repository.QuestionRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.service.CommentService;

@Service
public class CommentServiceImpl implements CommentService{
	
	private final CommentRepository commentRepository;
	private final QuestionRepository questionRepository;
	private final UserRepository userRepository;
	
	@Autowired
	public CommentServiceImpl(CommentRepository commentRepository, QuestionRepository questionRepository,
			UserRepository userRepository) {
		super();
		this.commentRepository = commentRepository;
		this.questionRepository = questionRepository;
		this.userRepository = userRepository;
	}

	//댓글작성
	@Override
	public BaseResponse<Void> createComment(Authentication authentication,CommentDto commentDto) {
		//사용자 정보가 null이거나 인증되지않은 경우 예외처리
		if(authentication == null || !authentication.isAuthenticated()) {
			throw new InvalidRequestException("Invalid Authentication", "인증되지않은 사용자입니다.");
		}
		//사용자 정보 가져오기
		String loginId = authentication.getName();
		Optional<User> user = userRepository.findOneWithAuthoritiesByLoginId(loginId);
		if(!user.isPresent()) {
			throw new InvalidRequestException("Invalid Writer", "글쓰기 권한이 없습니다.");
		}
		//강의 질문 정보 가져오기
		Optional<Question> question = questionRepository.findById(commentDto.getQuestionId());
		if(question == null) {
			throw new InvalidRequestException("Invalid question", "존재하지않는 질문입니다.");
		}
		Comment comment = new Comment();
		comment.setCreateAt(LocalDateTime.now());
		comment.setText(commentDto.getText());
		comment.setUser(user.get());
		comment.setQuestion(question.get());
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
