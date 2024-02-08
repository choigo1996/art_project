package com.cbw.art.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Lecture;
import com.cbw.art.model.User;

public interface LectureRepository extends JpaRepository<Lecture, Long>{
	List<Lecture> findByTeacher(User teacher);
}
