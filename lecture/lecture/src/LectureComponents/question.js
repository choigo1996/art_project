import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllQuest } from "./api";
import styled from "styled-components";

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
const Title = styled.p`
  margin: 0;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;
const Container = styled.div`
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  margin: 0;
  padding: 8px;
`;
export function Question() {
  const navigate = useNavigate();
  const { id: lectureId } = useParams();
  const [questions, setQuestions] = useState([]);

  function onClick(id) {
    navigate(`${id}`);
  }

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getAllQuest();
        setQuestions(response.data);
      } catch (error) {
        console.error("질문 목록 조회 중 오류 발생", error);
      }
    };

    fetchQuestion();
  }, []);

  const sortedQuestions = questions
    .filter((question) => question.lecture.id === Number(lectureId))
    .sort((a, b) => new Date(b.createAt) - new Date(a.createAt))
    .map((question, i, arr) => ({
      ...question,
      number: arr.length - i,
    }));

  return (
    <>
      <Container>
        <h2>QnA게시글</h2>
        <Link to="create">글쓰기</Link>
        <Ul>
          <span>번호</span>
          <Text>제목</Text>
          <Text>작성자</Text>
          <Text>작성일</Text>
        </Ul>
        {sortedQuestions.map((question) => (
          <Ul key={question.id}>
            <Li>
              <span>{question.number}</span>
              <Title onClick={() => onClick(question.id)}>
                {question.title}
              </Title>
              <Text>{question.writer}</Text>
              <Text>{question.createAt}</Text>
            </Li>
          </Ul>
        ))}
      </Container>
    </>
  );
}
