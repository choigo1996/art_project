package com.cbw.art.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Question;

public interface QuestionRepository extends JpaRepository<Question, Long>{
}
