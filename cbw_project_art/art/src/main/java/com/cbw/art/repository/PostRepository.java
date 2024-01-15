package com.cbw.art.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cbw.art.model.Post;

public interface PostRepository extends JpaRepository<Post, Long>{

}
