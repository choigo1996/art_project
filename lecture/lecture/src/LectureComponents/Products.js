import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LectureContext } from "./Lecture";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 10px;
  width: 1000px;
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Header = styled.div`
  text-align: center;
  background-color: black;
  color: white;
  font-size: 1.5rem;
  padding: 10px;
`;
const Card = styled.div`
  width: 240px;
  border: 2px solid dodgerblue;
  margin-bottom: 20px;
  font-size: 0.8rem;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
`;
const Text = styled.p``;

export function Products() {
  const navigate = useNavigate();
  const { lectures } = useContext(LectureContext);

  function onClick(id) {
    navigate(`${id}`);
  }

  return (
    <>
      <Header>강의목록</Header>
      <Container>
        {lectures.map((lecture, i) => (
          <Card key={lecture.id}>
            <div onClick={() => onClick(lecture.id)}>
              <Img src={lecture.image} />
              <Text>강의명 : {lecture.title}</Text>
              <Text>강사 : {lecture.teacher}</Text>
              <Text>가격 : {lecture.price}원</Text>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}
