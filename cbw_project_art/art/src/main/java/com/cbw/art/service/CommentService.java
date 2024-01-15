package com.cbw.art.service;

import java.util.List;

import com.cbw.art.dto.BaseResponse;
import com.cbw.art.dto.CommentDto;

public interface CommentService {
    // 댓글 작성
    BaseResponse<Void> createComment(CommentDto commentDto,String loginId);
    
    // 댓글 목록
    BaseResponse<List<CommentDto>> getAllComment();

    // 댓글 삭제
    BaseResponse<Long> deleteComment(Long id);

    // 댓글 하나만 불러오기
    CommentDto getCommentById(long id);
}
