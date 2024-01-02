import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;
const Body = styled.div``;
const Image = styled.img``;

export function Home() {
  return (
    <>
      <Container>
        <Header>강의배너</Header>
        <Body>
          <h1>인기강의</h1>
          <Image src="">빵빵아</Image>
          <Image src="">빵빵아</Image>
          <Image src="">빵빵아</Image>
          <Image src="">빵빵아</Image>
          <Image src="">빵빵아</Image>
        </Body>
      </Container>
    </>
  );
}
