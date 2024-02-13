import styled from "styled-components";

const Container = styled.div`
  background-color: #87ceeb;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Body = styled.div`
  font-size: 2.5rem;
  text-align: center;
`;

export function Home() {
  return (
    <>
      <Container>
        <Body>Art</Body>
      </Container>
    </>
  );
}
