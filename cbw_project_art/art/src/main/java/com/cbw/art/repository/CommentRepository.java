package com.cbw.art.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Comment;

public interface CommentRepository extends JpaRepository<Comment, Long>{

}
