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
  const { data, isLoading } = useQuery("getPurchaseById", () =>
    getPurchaseById(loginState?.id)
  );
  const [token, setToken] = useState(null);
  useEffect(() => {
    if (loginState?.token) {
      setToken(loginState.token);
      sessionStorage.setItem("token", loginState.token);
    } else {
      setToken(null);
      sessionStorage.setItem("token", null);
    }
  }, [loginState?.token]);

  const logOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginState");
    setLoginState({ id: null });
    navigate("/");
  };

  async function onMyInfo() {
    try {
      const response = await getMyInfo();
      if (response.data.resultCode === "SUCCESS") {
        const userInfo = response.data.data;
        alert(
          `User Information\n-loginId:${userInfo.loginId}\n-Email: ${userInfo.email}\n-birthDate:${userInfo.birthDate}\n-name:${userInfo.name}`
        );
        console.log(userInfo);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  }
  return (
    <>
      <h1>마이페이지</h1>
      <Header>{loginState?.id}님 안녕하세요!</Header>
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
