import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { getMyInfo } from "./api";
import { useNavigate } from "react-router-dom";

const Header = styled.div``;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Member = styled.div``;
const MyLecture = styled.button``;
const Delete = styled.div``;
const OnLogOut = styled.button``;
const Info = styled.button``;
const ModeButton = styled.button`
  display: flex;
  width: 30%;
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export function Dashboard() {
  const { loginState, setLoginState } = useContext(LectureContext);
  const navigate = useNavigate();

  console.log("user:", loginState);

  const admin = loginState?.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const teacher =
    loginState?.authorityDtoSet[0].authorityName === "ROLE_TEACHER";

  function handleAdminModeClick() {
    navigate("/admin");
    alert("관리자 모드를 실행합니다.");
  }
  function handleTeacherModeClick() {
    alert("선생님 모드를 실행합니다.");
  }
  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      const userInfo = response.data;

      setLoginState(userInfo);
      console.log("loginState :", userInfo);
    } catch (error) {
      console.error("ERROR fetching user info: ", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [setLoginState]);

  const logOut = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("loginState");
    setLoginState({ id: null });
    navigate("/");
  };

  function onMyInfo() {
    alert(
      `내 정보 \n-아이디 : ${loginState.loginId} \n-이메일 : ${loginState.email} \n-이름 : ${loginState.name} \n-생일 : ${loginState.birthDate}`
    );
  }

  function myLecture() {
    navigate("/userlecture");
  }
  return (
    <>
      <h1>마이페이지</h1>
      <Header>{loginState?.loginId}님 안녕하세요!</Header>
      {admin && (
        <ModeButton onClick={handleAdminModeClick}>
          관리자 모드로 전환
        </ModeButton>
      )}
      {teacher && (
        <ModeButton onClick={{ handleTeacherModeClick }}>
          선생님 모드로 전환
        </ModeButton>
      )}
      <Container>
        <MyLecture onClick={myLecture}>내 강의목록</MyLecture>
        <Delete>회원탈퇴</Delete>
        <OnLogOut onClick={logOut}>로그아웃</OnLogOut>
        <Info onClick={onMyInfo}>내 정보보기</Info>
      </Container>
    </>
  );
}
