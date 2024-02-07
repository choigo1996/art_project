package com.cbw.art.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Lecture;
import com.cbw.art.model.User;

public interface LectureRepository extends JpaRepository<Lecture, Long>{
	//해당 강의의 ID를 가진 선생님만 등록가능
}
