package com.cbw.art.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Lecture;

public interface LectureRepository extends JpaRepository<Lecture, Long>{

}
