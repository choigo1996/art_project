package com.cbw.art.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.CommentDto;
import com.cbw.art.model.Comment;
import com.cbw.art.model.Question;
import com.cbw.art.model.User;
import com.cbw.art.repository.CommentRepository;
import com.cbw.art.repository.QuestionRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.service.CommentService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class CommentServiceImpl implements CommentService{
	
	@Autowired
	private CommentRepository commentRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private QuestionRepository questionRepository;
	
	@Autowired
	public CommentServiceImpl(CommentRepository commentRepository, UserRepository userRepository,
			QuestionRepository questionRepository) {
		super();
		this.commentRepository = commentRepository;
		this.userRepository = userRepository;
		this.questionRepository = questionRepository;
	}

	@Override
	public CommentDto createComment(Long questionId, CommentDto commentDto) {
        // 필요한 정보 추출
        String content = commentDto.getContent();
        Long userId = commentDto.getUserId();
        Long parentCommentId = commentDto.getParentCommentId();

        // 특정 질문을 찾음
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new EntityNotFoundException("Question not found with id: " + questionId));

        // 사용자를 찾음
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id: " + userId));

        // 부모 댓글을 찾음
        Comment parentComment = null;
        if (parentCommentId != null) {
            parentComment = commentRepository.findById(parentCommentId)
                    .orElseThrow(() -> new EntityNotFoundException("Parent comment not found with id: " + parentCommentId));
        }

        // 새로운 댓글 생성
        Comment comment = new Comment();
        comment.setContent(content);
        comment.setUser(user);
        comment.setQuestion(question);
        comment.setParentComment(parentComment);

        // 댓글 저장
        Comment savedComment = commentRepository.save(comment);

        // 저장된 댓글을 다시 CommentDto로 변환하여 반환
        CommentDto savedCommentDto = new CommentDto();
        savedCommentDto.setId(savedComment.getId());
        savedCommentDto.setContent(savedComment.getContent());
        savedCommentDto.setUserId(savedComment.getUser().getId());
        savedCommentDto.setQuestionId(savedComment.getQuestion().getId());
        savedCommentDto.setParentCommentId(savedComment.getParentComment() != null ? savedComment.getParentComment().getId() : null);

        return savedCommentDto;
    }

	@Override
	public List<CommentDto> getCommentsByQuestionId(Long questionId) {
		List<Comment> comments = commentRepository.findByQuestionId(questionId);
		return comments.stream().map(this::mapCommentToCommentDto).collect(Collectors.toList());
	}
	
	@Override
	public CommentDto updateComment(Long commentId, CommentDto updatedCommentDto) {
		Comment comment = commentRepository.findById(commentId)
				.orElseThrow(()-> new EntityNotFoundException("Comment not found with id: " + commentId));
		
		comment.setContent(updatedCommentDto.getContent());
		
		Comment updatedComment = commentRepository.save(comment);
		return mapCommentToCommentDto(updatedComment);
	}

	@Override
	public void deleteComment(Long commentId) {
		Comment comment = commentRepository.findById(commentId)
				.orElseThrow(() -> new EntityNotFoundException("Comment not found with id:" + commentId));
		commentRepository.delete(comment);
	}

	private CommentDto mapCommentToCommentDto(Comment comment) {
		CommentDto commentDto = new CommentDto();
		commentDto.setId(comment.getId());
		commentDto.setContent(comment.getContent());
		commentDto.setUserId(comment.getUser().getId());
		commentDto.setQuestionId(comment.getQuestion().getId());
		if(comment.getParentComment() != null) {
			commentDto.setParentCommentId(comment.getParentComment().getId());
		}
		return commentDto;
		
	}

	
}
