import styled from "react";

const Container = styled.div``;
const Number = styled.div``;
const Title = styled.div``;
const Write = styled.div``;
const CreateNoti = styled.div``;

export function Notification() {
  return (
    <>
      <h1>공지사항</h1>
      <Container>
        <Number></Number>
        <Title></Title>
        <Write></Write>
        <CreateNoti></CreateNoti>
      </Container>
    </>
  );
}
