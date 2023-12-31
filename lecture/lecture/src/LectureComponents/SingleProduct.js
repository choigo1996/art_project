import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { useParams } from "react-router-dom";
import styled from "styled-components";

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

  const {
    title: lectureTitle,
    category,
    teacher,
    image,
    price,
    lectureLists,
  } = lecture;
  console.log(lecture);
  return (
    <>
      <Title>{lectureTitle}</Title>
      <Container>
        <Img src={image} />
        <Content>
          <p>카테고리 : {category}</p>
          <p>가격 : {price}원</p>
          <p>강사 : {teacher}</p>
          <h2>강의목록</h2>
          <ul>
            {lectureLists.map((lectureList) => (
              <li key={lectureList.id}>
                {lectureList.list}. {lectureList.title}
              </li>
            ))}
          </ul>
        </Content>
      </Container>
    </>
  );
}
