import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllComment } from "./api";
import styled from "styled-components";

const Container = styled.div`
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%; /* 원하는 넓이로 조절하세요 */
`;
const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  display: grid-template-columns(4fr);
  align-items: center;
  span {
    flex: 1;
    font-weight: bold;
    padding: 8px;
  }

  p {
    flex: 3;
    margin: 0;
    padding: 8px;
  }
`;
const Li = styled.li`
  display: flex;
  display: grid-template-columns(4fr);
  align-items: center;
  padding: 8px;
  width: 100%;
`;

export function Comment() {
  const { questionid } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await getAllComment(questionid);
        setComments(response.data);
      } catch (error) {
        console.error("댓글 목록 조회 중 오류 발생", error);
      }
    };
    fetchComment();
  }, [questionid]);

  const sortedComments =
    comments.length > 0
      ? comments
          .filter((comment) => comment.question.id === Number(questionid))
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
              <div>{comment.author}</div>
              <div>{comment.text}</div>
              <div>{comment.createAt}</div>
            </Li>
          </Ul>
        ))}
      </Container>
    </>
  );
}
