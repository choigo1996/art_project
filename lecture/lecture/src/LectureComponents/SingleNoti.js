import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNotiById } from "./api";
import styled from "styled-components";

const Container = styled.div`
  max-width: 600px;
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
  cursor: pointer;
  font-size: 1rem;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #267bb5;
  }
`;

export function SingleNoti() {
  const { id: notiId } = useParams();
  const navigate = useNavigate();
  const [noti, setNoti] = useState(null);

  useEffect(() => {
    getNotiById(notiId)
      .then((response) => setNoti(response))
      .catch((error) => console.error("로딩 실패:", error));
  }, [notiId]);

  const handleBack = () => {
    navigate("/Notification");
  };

  if (!noti) {
    return <div>로딩 중....</div>;
  }

  return (
    <Container>
      <Title>{noti.title}</Title>
      <Writer>작성자: {noti.writer}</Writer>
      <Time>작성일: {noti.createAt}</Time>
      <Text>{noti.text}</Text>
      <BackButton onClick={handleBack}>목록으로</BackButton>
    </Container>
  );
}
