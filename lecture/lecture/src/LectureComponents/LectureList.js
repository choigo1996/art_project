import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllLeList } from "./api";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  grid-template-columns: 4fr; /* 수정된 부분 */
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

  a {
    flex: 3;
    margin: 0;
    padding: 8px;
  }
`;

const Li = styled.li`
  display: flex;
  grid-template-columns: 4fr; /* 수정된 부분 */
  align-items: center;
  padding: 8px;
  width: 100%;
`;
const Title = styled.p`
  margin: 0;
  font-weight: bold;
`;
const Container = styled.div`
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 80%; /* 원하는 넓이로 조절하세요 */
`;

const Text = styled.p`
  margin: 0;
  padding: 8px;
`;
const Video = styled.a`
  margin: 0;
  padding: 8px;
`;
export function LectureList() {
  const { id: lectureId } = useParams();
  const [lelists, setLelists] = useState([]);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const response = await getAllLeList();
        setLelists(response.data);
      } catch (error) {
        console.error("질문 목록 조회 중 오류 발생", error);
      }
    };

    fetchQuestion();
  }, []);

  const sortedLelist =
    lelists.length > 0
      ? lelists
          .filter(
            (lelist) =>
              lelist.lecture && lelist.lecture.id === Number(lectureId)
          )
          .sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
          .map((lelist, i) => ({
            ...lelist,
            number: i + 1,
          }))
      : [];

  return (
    <>
      <Container>
        <h2>강의목록</h2>
        <Ul>
          <span>강</span>
          <Title>제목</Title>
          <Text>강의시간</Text>
          <Video>학습하기</Video>
        </Ul>
        {sortedLelist.map((lelist) => (
          <Ul key={lelist.id}>
            <Li>
              <span>{lelist.number}</span>
              <Title>{lelist.title}</Title>
              <Text>{lelist.duration}</Text>
              <Video href={lelist.video}>플레이</Video>
            </Li>
          </Ul>
        ))}
      </Container>
    </>
  );
}
