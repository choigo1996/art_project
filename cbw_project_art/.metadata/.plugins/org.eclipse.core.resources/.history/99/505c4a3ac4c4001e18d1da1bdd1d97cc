package com.cbw.art.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Intro;
import com.cbw.art.model.Lecture;

public interface IntroRepository extends JpaRepository<Intro, Long>{
	Optional<Intro> findByLecture(Lecture lecture);
}
