package com.cbw.art.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cbw.art.model.Lecture;
import com.cbw.art.model.LectureReview;

public interface LectureRepository extends JpaRepository<Lecture, Long>{
	@Query("SELECT lr FROM LectureReview lr WHERE lr.lecture.id = :lectureId")
	List<LectureReview> findLectureReivewsById(@Param("lectureId") long lectureId);
}
