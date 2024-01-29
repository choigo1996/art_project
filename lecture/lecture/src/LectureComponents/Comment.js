import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllComment } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Ul = styled.ul``;
const Li = styled.li``;
const Text = styled.div``;

export function Comment() {
  const { id: commentId } = useParams();
  console.log("CommentId 파라미터 :", commentId);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getAllComment(commentId);
        setComments(response.data);
      } catch (error) {
        console.error("댓글 목록 조회 중 오류 발생", error);
      }
    };
    fetchComment();
  }, [commentId]);

  const sortedComments =
    comments.length > 0
      ? comments
          .filter((comment) => comment.commentId.id === Number(commentId))
          .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
          .map((comment, i, arr) => ({
            ...comment,
            number: arr.length - i,
          }))
      : [];

  return (
    <>
      <Container>
        <h3>댓글 목록</h3>
        {sortedComments.map((comment) => (
          <Ul key={comment.id}>
            <Li>
              <Text>{comment.author}</Text>
              <Text>{comment.text}</Text>
              <Text>{comment.createAt}</Text>
            </Li>
          </Ul>
        ))}
      </Container>
    </>
  );
}
