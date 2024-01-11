import { useContext, useState } from "react";
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
  const [selectedCategory, setSelectedCategory] = useState(null);

  function onClick(id) {
    navigate(`${id}`);
  }

  const filteredLectures = selectedCategory
    ? lectures.filter((lecture) => lecture.category === selectedCategory)
    : lectures;

  return (
    <>
      <Header>강의목록</Header>
      <div>
        <label>카테고리: </label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">전체</option>
          {/* 여기에 강의에 존재하는 모든 카테고리 목록을 추가하세요. */}
          <option value="만화 > 웹툰"> 웹툰</option>
          <option value="만화 > 상업지 만화">상업지 만화</option>
          <option value="소설 > 판타지">임마!</option>
        </select>
      </div>
      <Container>
        {filteredLectures.map((lecture, i) => (
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
