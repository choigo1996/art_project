import { useContext } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { getPurchaseById } from "./api";

const Header = styled.div``;
const Container = styled.div``;
const Member = styled.div``;
const MyLecture = styled.div``;
const Delete = styled.div``;

export function Dashboard() {
  const { loginState } = useContext(LectureContext);
  const { data, isLoading } = useQuery("getPurchaseById", () =>
    getPurchaseById(loginState?.id)
  );
  return (
    <>
      <h1>마이페이지</h1>
      <Header>{loginState?.id}님 안녕하세요!</Header>
      <Container>
        <Member>회원정보수정</Member>
        <MyLecture>내 강의목록</MyLecture>
        <Delete>회원탈퇴</Delete>
      </Container>
    </>
  );
}
