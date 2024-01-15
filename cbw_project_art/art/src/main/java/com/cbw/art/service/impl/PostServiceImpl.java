package com.cbw.art.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.PostDto;
import com.cbw.art.enumstatus.ResultCode;
import com.cbw.art.exception.InvalidRequestException;
import com.cbw.art.model.Post;
import com.cbw.art.model.User;
import com.cbw.art.repository.PostRepository;
import com.cbw.art.repository.UserRepository;
import com.cbw.art.service.PostService;

@Service
@Transactional
public class PostServiceImpl implements PostService{
	
	private PostRepository postRepository;
	private UserRepository userRepository;
	
	@Autowired
	public PostServiceImpl(PostRepository postRepository, UserRepository userRepository) {
		super();
		this.postRepository = postRepository;
		this.userRepository = userRepository;
	}
	//게시글 생성
	// 게시글 생성
	public BaseResponse<Void> createPost(PostDto postDto, String loginId) {
	    Optional<User> userOptional = userRepository.findOneWithAuthoritiesByLoginId(postDto.getWriter());

	    if (userOptional.isPresent()) {
	        User user = userOptional.get();

	        Post post = new Post();
	        post.setCreatedAt(LocalDateTime.now());
	        post.setTitle(postDto.getTitle());
	        post.setText(postDto.getText());
	        post.setWriter(postDto.getWriter());

	        postRepository.save(post);

	        return new BaseResponse<>("Success", null, "게시글이 작성되었습니다.");
	    } else {
	        throw new InvalidRequestException("Invalid Writer", "글쓰기 권한이 없습니다.");
	    }
	}

	public BaseResponse<List<PostDto>> getAllPost() {
		// TODO Auto-generated method stub
		return null;
	}

	public BaseResponse<Long> deletePost(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	public PostDto getPostById(long id) {
		// TODO Auto-generated method stub
		return null;
	}

	
	


}
