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
const CategoryList = styled.div`
  display: flex;
  list-style: none;
`;
const Buy = styled.button``;
const Basket = styled.button``;

export function SingleProduct() {
  const { lectures } = useContext(LectureContext);

  const { id } = useParams();

  const lecture = lectures.find((l) => l.id === +id);

  const { title: lectureTitle, teacher, image, price } = lecture;
  console.log(lecture);
  return (
    <>
      <Title>{lectureTitle}</Title>
      <Container>
        <Img src={image} />
        <Content>
          <p>가격 : {price}원</p>
          <p>강사 : {teacher}</p>
          <CategoryList>
            카테고리 :
            {lecture.categorys
              .filter((category) => category.categoryType !== "ALL")
              .map((category, i) => (
                <li key={i}>{category.categoryType}</li>
              ))}
          </CategoryList>
        </Content>
        <Basket>장바구니</Basket>
        <Buy>수강신청</Buy>
        <LectureNav />
      </Container>
    </>
  );
}
