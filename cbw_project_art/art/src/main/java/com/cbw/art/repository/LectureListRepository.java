package com.cbw.art.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cbw.art.model.Lecture;
import com.cbw.art.model.LectureList;

public interface LectureListRepository extends JpaRepository<LectureList, Long>{
	@Query("SELECT l FROM LectureList l WHERE l.lecture.id = :lectureId")
	List<LectureList> findByLectureId(@Param("lectureId") Long lectureId);
}
