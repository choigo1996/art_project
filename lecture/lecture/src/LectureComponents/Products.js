import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Header = styled.div``;
const Container = styled.div``;
export function Products() {
  const navigate = useNavigate();
  return (
    <>
      <Header>강의목록</Header>
      <Container></Container>
    </>
  );
}
