import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { LectureNav } from "./LectureNav";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;
const Img = styled.img`
  width: 40%;
  display: block;
  margin: 0px auto;
`;

const Content = styled.div`
  margin-left: 10px;
  font-size: 1rem;
`;
export function SingleProduct() {
  const { lectures } = useContext(LectureContext);

  const { id } = useParams();

  const lecture = lectures.find((l) => l.id === +id);

  const { title: lectureTitle, category, teacher, image, price } = lecture;
  return (
    <>
      <Title>{lectureTitle}</Title>
      <Container>
        <Img src={image} />
        <Content>
          <p>카테고리 : {category}</p>
          <p>가격 : {price}원</p>
          <p>강사 : {teacher}</p>
        </Content>
        <LectureNav />
      </Container>
    </>
  );
}
