import React, { useContext, useEffect, useState } from "react";
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

const CategoryContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CategoryItem = styled.div`
  display: inline-block;
  margin-right: 10px;
  cursor: pointer;
  color: ${(props) => (props.selected ? "red" : "black")};
`;

export function Products() {
  const navigate = useNavigate();
  const { lectures } = useContext(LectureContext);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategoryList(response);
        // 초기값을 첫 번째 카테고리로 설정
        if (response.length > 0) {
          setSelectedCategory("");
        }
      } catch (error) {
        console.error("카테고리 목록 조회 중 오류 발생", error);
      }
    };

    fetchCategories();
  }, []);

  function onClick(id) {
    navigate(`${id}`);
  }

  const filteredLectures =
    selectedCategory === ""
      ? lectures
      : lectures.filter((lecture) =>
          lecture.categorys.some(
            (category) => category.categoryType === selectedCategory
          )
        );

  return (
    <>
      <Header>강의목록</Header>
      <CategoryContainer>
        <CategoryItem
          key="all"
          selected={selectedCategory == ""}
          onClick={() => setSelectedCategory("")}
        >
          ALL
        </CategoryItem>
        {categoryList.map((category) => (
          <CategoryItem
            key={category}
            selected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </CategoryItem>
        ))}
      </CategoryContainer>
      {filteredLectures.length === 0 ? (
        <div>No lectures available.</div>
      ) : (
        <Container>
          {filteredLectures.map((lecture) => (
            <Card key={lecture.id}>
              <div onClick={() => onClick(lecture.id)}>
                <Img src={lecture.image} />
                <Text>강의명: {lecture.title}</Text>
                <Text>강사: {lecture.teacher}</Text>
                <Text>가격: {lecture.price}원</Text>
                <div>
                  카테고리:
                  {lecture.categorys.map((category) => (
                    <CategoryItem key={category.categoryType}>
                      {category.categoryType}
                    </CategoryItem>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </Container>
      )}
    </>
  );
}
