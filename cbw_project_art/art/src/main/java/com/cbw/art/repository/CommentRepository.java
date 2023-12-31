package com.cbw.art.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{
	List<Comment> findByQuestionId(Long questionId);
}
