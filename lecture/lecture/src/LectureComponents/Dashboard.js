import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { apiGetMyInfo, getPurchaseById } from "./api";
import { LogOut } from "./LogOut";

const Header = styled.div``;
const Container = styled.div``;
const Member = styled.div``;
const MyLecture = styled.div``;
const Delete = styled.div``;
const OnLogOut = styled.button``;
const Info = styled.button``;
export function Dashboard() {
  const { loginState } = useContext(LectureContext);
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

  async function onMyInfo() {
    try {
      const response = await apiGetMyInfo();
      if (response.data.resultCode === "SUCCESS") {
        console.log(response.data.data);
      } else {
        alert(response.data.message);
      }
    } catch (err) {
      console.log(err.response.data);
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
        <OnLogOut onClick={LogOut}>로그아웃</OnLogOut>
        <Info onClick={onMyInfo}>내 정보보기</Info>
      </Container>
    </>
  );
}
