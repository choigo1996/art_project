package com.cbw.art.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Review;

public interface ReviewRepository extends JpaRepository<Review, Long>{

}
