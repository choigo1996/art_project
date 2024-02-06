import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { createLecture } from "./api";
import styled from "styled-components";

const Container = styled.div`
  width: 80%;
  background-color: #eee;
  box-shadow: 2px 2px 5px gray;
  padding: 30px;
  border-radius: 20px;
  margin-top: 25px;
`;
const Header = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;
const Button = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 20px;
  background-color: lightblue;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border: 1px solid blue;
`;
const BackButton = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 20px;
  background-color: lightblue;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border: 1px solid blue;
`;
export function CreateLecture() {
  //제목,선생님,가격,이미지
  const [title, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  //강의 저장
  const [adminLecture, setAdminLecture] = useState(null);
  const [lecturing, setLecturing] = useState(false);
  const [lectureComplete, setLectureComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //Lecture목록으로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const { data, isLoading, refetch } = useQuery("lecture", () => {
    if (adminLecture) {
      setLecturing(true);
      return createLecture(adminLecture);
    }
  });

  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능");
      navigate("/home");
    }
  }, [admin, navigate]);

  const handleBack = () => {
    navigate("/admin");
  };
  useEffect(() => {
    refetch();
  }, [adminLecture]);

  function onSubmit(e) {
    e.preventDefault();

    const lecture = {
      title: title,
      teacher: teacher,
      price: price,
      image: image,
    };
    if (!lecture) {
      window.alert("빈 공간이 존재합니다.");
    }
    console.log("lecture :", lecture);

    //API호출
    createLecture(lecture)
      .then((response) => {
        console.log("응답확인 :", response);
        if (response.data.resultCode === "SUCCESS") {
          alert("글 작성 완료");
          setLectureComplete(true);
        } else if (response.data.resultCode === "ERROR") {
          const errorMessage =
            response.data.message || response.data["Invalid Writer"];
          console.log(response);
          console.log(errorMessage);
          window.alert(errorMessage);
        }
      })
      .catch((error) => {
        console.error("호출 실패!", error);
        window.alert("에러발생");
      });
  }
  return (
    <>
      {lecturing ? (
        <h1>강의 생성중...</h1>
      ) : lectureComplete ? (
        navigate("/products")
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>강의 생성</Header>
            <div>
              <span>제목</span>
              <input
                id="title"
                value={title}
                placeholder="제목을 입력하세요"
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <span>선생님</span>
              <input
                id="teacher"
                value={teacher}
                placeholder="선생님 입력하세요"
                onChange={(e) => setTeacher(e.target.value)}
              />
              <br />
              <span>가격</span>
              <input
                id="price"
                value={price}
                placeholder="가격을 입력하세요"
                onChange={(e) => setPrice(e.target.value)}
              />
              <br />
              <img src={image} alt="이미지" />
              <input
                id="image"
                value={image}
                placeholder="이미지 URL을 입력하세요."
                onChange={(e) => setImage(e.target.value)}
              />
            </div>
            <Button>강의 등록</Button>
            <BackButton onClick={handleBack}>취소</BackButton>
          </form>
        </Container>
      )}
    </>
  );
}
