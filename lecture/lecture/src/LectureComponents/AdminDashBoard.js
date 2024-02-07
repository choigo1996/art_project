import { useContext, useEffect } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const Noti = styled.button``;
const Intro = styled.button``;
const Lecture = styled.button``;
const Lelist = styled.button``;
const Authority = styled.button``;
const Category = styled.button``;
export function AdminDashBoard() {
  const { loginState, setLoginState } = useContext(LectureContext);
  const navigate = useNavigate();

  const admin = loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";
  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능합니다.");
      navigate("/");
    }
  }, [admin, navigate]);
  function createNoti() {
    navigate("noticreate");
  }

  function createLecture() {
    navigate("lecreate");
  }

  function createLelist() {
    navigate("lelist");
  }

  function addCategory() {
    navigate("addcate");
  }

  function updateAuth() {
    navigate("updateAuth");
  }

  function createIntro() {
    navigate("intro");
  }

  function handleBack() {
    navigate("/dashboard");
  }
  return (
    <>
      <h1>관리자님 환영합니다.</h1>
      <Container>
        <Noti onClick={createNoti}>공지사항 작성</Noti>
        <Intro onClick={createIntro}>강의소개 작성</Intro>
        <Lecture onClick={createLecture}>강의 작성</Lecture>
        <Lelist onClick={createLelist}>강의 목록 작성</Lelist>
        <Authority onClick={updateAuth}>권한 변경</Authority>
        <Category onClick={addCategory}>카테고리 변경</Category>
        <button onClick={handleBack}>마이페이지로 돌아가기</button>
      </Container>
    </>
  );
}
