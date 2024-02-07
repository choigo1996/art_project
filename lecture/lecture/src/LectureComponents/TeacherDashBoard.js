import { useContext, useEffect } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const Lelist = styled.button``;

export function TeacherDashBoard() {
  const { loginState } = useContext(LectureContext);
  const navigate = useNavigate();

  const teacher =
    loginState.authorityDtoSet[0].authorityName === "ROLE_TEACHER";
  useEffect(() => {
    if (!teacher) {
      alert("선생님만 접근가능!");
      navigate("/");
    }
  }, [teacher, navigate]);

  function createLelist() {
    navigate("lelist");
  }
  function handleBack() {
    navigate("/dashboard");
  }
  return (
    <>
      <h1>선생님 환영합니다.</h1>
      <Container>
        <Lelist onClick={createLelist}>강의 목록 작성</Lelist>
        <button onClick={handleBack}>마이페이지로 돌아가기</button>
      </Container>
    </>
  );
}
