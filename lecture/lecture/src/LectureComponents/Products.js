import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LectureContext } from "./Lecture";
import styled from "styled-components";
import { getAllCategory } from "./api";

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
const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex; /* 수정된 부분 */
  flex-wrap: wrap; /* 수정된 부분 */
`;
const CategoryItem = styled.li`
  /* 수정된 부분 */
  margin-right: 5px; /* 수정된 부분 */
  margin-bottom: 5px; /* 수정된 부분 */
`;

export function Products() {
  const navigate = useNavigate();
  const { lectures } = useContext(LectureContext);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchCate = async () => {
      try {
        const response = await getAllCategory();
        setCategory(category);
      } catch (error) {
        console.error("카테고리 목록 조회 중 오류 발생", error);
      }
    };
    fetchCate();
  }, []);

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
              <CategoryList>
                {lecture.categories.map((category) => (
                  <CategoryItem key={category}>{category}</CategoryItem>
                ))}
              </CategoryList>
            </div>
          </Card>
        ))}
      </Container>
    </>
  );
}
