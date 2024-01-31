import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { getMyInfo, getPurchaseById } from "./api";
import { useNavigate } from "react-router-dom";

const Header = styled.div``;
const Container = styled.div``;
const Member = styled.div``;
const MyLecture = styled.div``;
const Delete = styled.div``;
const OnLogOut = styled.button``;
const Info = styled.button``;
export function Dashboard() {
  const { loginState, setLoginState } = useContext(LectureContext);
  const navigate = useNavigate();
  // const { data, isLoading } = useQuery("getPurchaseById", () =>
  //   getPurchaseById(loginState?.id)
  // );

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
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginState");
    setLoginState({ id: null });
    navigate("/");
  };

  function onMyInfo() {
    alert(
      `내 정보 \n-아이디 : ${loginState.loginId} \n-이메일 : ${loginState.email} \n-이름 : ${loginState.name} \n-생일 : ${loginState.birthDate}`
    );
  }

  return (
    <>
      <h1>마이페이지</h1>
      <Header>{loginState?.loginId}님 안녕하세요!</Header>
      <Container>
        <Member>회원정보수정</Member>
        <MyLecture>내 강의목록</MyLecture>
        <Delete>회원탈퇴</Delete>
        <OnLogOut onClick={logOut}>로그아웃</OnLogOut>
        <Info onClick={onMyInfo}>내 정보보기</Info>
      </Container>
    </>
  );
}
