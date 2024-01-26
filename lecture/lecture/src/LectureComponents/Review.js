import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { getAllReview } from "./api";
import { LectureContext } from "./Lecture";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  display: grid-template-columns(5fr);
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

const Button = styled.button``;
const Rating = styled.p`
  margin: 0;
  padding: 8px;
`;
export function Review() {
  const { id: lectureId } = useParams();
  const [reviews, setReview] = useState([]);
  const { loginState } = useContext(LectureContext);
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await getAllReview(lectureId);
        setReview(response.data);
      } catch (error) {
        console.error("질문 목록 조회 중 오류 발생", error);
      }
    };
    fetchReview();
  }, [lectureId]);
  function handleWriterButtonClick() {
    console.log(loginState);
    if (loginState && loginState.id) {
      navigator("create");
    }
  }
  const sortedReview =
    reviews.length > 0
      ? reviews
          .filter(
            (review) =>
              review.lecture && review.lecture.id === Number(lectureId)
          )
          .sort((a, b) => new Date(a.createAt) - new Date(b.createAt))
          .map((review, i) => ({
            ...review,
            number: i + 1,
          }))
      : [];

  return (
    <>
      <Container>
        <h2>수강후기</h2>
        <Button>글쓰기</Button>
        <Ul>
          <span>번호</span>
          <Title>후기</Title>
          <Text>작성자</Text>
          <Text>작성일</Text>
          <Rating>점수</Rating>
        </Ul>
        {sortedReview.map((review) => (
          <Ul key={review.id}>
            <Li>
              <span>{review.number}</span>
              <Title>{review.text}</Title>
              <Text>{review.author}</Text>
              <Text>{review.createAt}</Text>
              <Rating>{review.rating}</Rating>
            </Li>
          </Ul>
        ))}
      </Container>
    </>
  );
}
