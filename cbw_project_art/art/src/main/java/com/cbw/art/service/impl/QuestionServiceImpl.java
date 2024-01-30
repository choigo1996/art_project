package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.QuestionDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Lecture;
import com.cbw.art.model.Question;
import com.cbw.art.model.User;
import com.cbw.art.repository.LectureRepository;
import com.cbw.art.repository.QuestionRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.service.QuestionService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QuestionServiceImpl implements QuestionService{
	
	private final QuestionRepository questionRepository;
	private final UserRepository userRepository;
	private final LectureRepository lectureRepository;
	
	@Autowired
	public QuestionServiceImpl(QuestionRepository questionRepository, UserRepository userRepository,
			LectureRepository lectureRepository) {
		super();
		this.questionRepository = questionRepository;
		this.userRepository = userRepository;
		this.lectureRepository = lectureRepository;
	}
	//게시글 생성
	public BaseResponse<Void> createQuest(Authentication authentication,QuestionDto questionDto) {
		//사용자 정보가 null이거나 인증되지 않은 경우 예외처리
		if(authentication == null||!authentication.isAuthenticated()) {
			throw new InvalidRequestException("Invalid Authentication", "인증되지않은 사용자입니다.");
		}
		//사용자 정보 가져오기
		String loginId = authentication.getName();
		Optional<User> user = userRepository.findOneWithAuthoritiesByLoginId(loginId);
		if(!user.isPresent()) {
			throw new InvalidRequestException("Invalid Writer", "글쓰기 권한이 없습니다");
		}
		//강의 정보 가져오기
		Optional<Lecture> lecture = lectureRepository.findById(questionDto.getLectureId());
		if(lecture == null) {
			throw new InvalidRequestException("Invalid lecture", "존재하지않는 강의입니다.");
		}
		Question question = new Question();
		question.setCreateAt(LocalDateTime.now());
		question.setTitle(questionDto.getTitle());
		question.setText(questionDto.getText());
		
		question.setUser(user.get());
		question.setLecture(lecture.get());
		questionRepository.save(question);
		
		return new BaseResponse<>(
	                ResultCode.SUCCESS.name(),
	                null,
	                "질문 생성 완료되었습니다");
	}

	//게시글목록 가져오기
	public BaseResponse<List<Question>> getAllQuest() {
		List<Question> questions = questionRepository.findAll();
		if(questions.isEmpty()) {
			throw new InvalidRequestException("noti empty", "존재하지 않는 질문사항입니다.");
		}
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				questions,
				ResultCode.SUCCESS.getMsg());
	}
	//게시글 삭제
	public BaseResponse<Long> deleteQuest(Long id) {
		
		Optional<Question> question = questionRepository.findById(id);
		
		if(question.isEmpty()) {
			throw new InvalidRequestException(Long.toString(id), "해당 질문사항은 존재하지 않습니다.");
		}
		
		questionRepository.deleteById(id);
		return new BaseResponse<>(
				ResultCode.SUCCESS.name(),
				id,
				"질문사항이 삭제되었습니다.");
	}
	//게시글 하나만 가져옴.
	@Override
	public Question getQuestById(long id) {
	    return questionRepository.findById(id)
	            .orElseThrow(() -> new InvalidRequestException(String.valueOf(id), "해당 ID의 질문이 존재하지 않습니다."));
	}

}
