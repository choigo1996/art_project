import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteQuest, getQuestById } from "./api";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { Comment } from "./Comment";
import { CreateComment } from "./CreateComment";

const Container = styled.div`
  max-width: 80%;
  margin: 20px auto;
  padding: 20px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #333;
`;

const Writer = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
`;

const Time = styled.p`
  font-size: 0.8rem;
  color: #888;
  margin-top: 10px;
`;

const BackButton = styled.button`
  background-color: #3498db;
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  width: 70%;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #267bb5;
  }
`;

export function SingleQuest() {
  const { questionid } = useParams();
  console.log("questionId 파라미터 id:", questionid);
  const navigate = useNavigate();
  const [quest, setQuest] = useState(null);
  const { loginState } = useContext(LectureContext);
  //댓글기능
  const [comment, setComment] = useState(null);

  //댓글 핸들러
  useEffect(() => {
    getQuestById(questionid)
      .then((response) => {
        console.log("응답 확인:", response);
        if (response) {
          setQuest(response);
        } else {
          console.error("로딩 실패: 응답이 없음");
        }
      })
      .catch((error) => console.error("로딩 실패 :", error));
  }, [questionid]);

  if (!quest) {
    return <div>로딩중.......</div>;
  }

  //목록으로 가기
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Container>
        <Title>{quest.title}</Title>
        <Writer>작성자: {quest.author}</Writer>
        <Time>작성일: {quest.createAt}</Time>
        <Text>{quest.text}</Text>

        <Comment />
        <CreateComment />
      </Container>

      <BackButton onClick={handleBack}>목록으로 돌아가기</BackButton>
    </>
  );
}
