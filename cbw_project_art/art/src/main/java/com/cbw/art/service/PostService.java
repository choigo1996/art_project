package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.PostDto;

public interface PostService {
    // 게시글 생성
    BaseResponse<Void> createPost(PostDto postDto,String loginId);

    // 게시글 목록
    BaseResponse<List<PostDto>> getAllPost();

    // 게시글 삭제
    BaseResponse<Long> deletePost(long id);

    // 게시글 하나의 정보만을 가져오기
    PostDto getPostById(long id);
}
