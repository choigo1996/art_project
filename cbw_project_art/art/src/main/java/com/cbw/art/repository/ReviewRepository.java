package com.cbw.art.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Lecture;
import com.cbw.art.model.Review;
import com.cbw.art.model.User;

public interface ReviewRepository extends JpaRepository<Review, Long>{
	boolean existsByUserAndLecture(User user,Lecture lecture);
}
