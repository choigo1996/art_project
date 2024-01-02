import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  padding: 5px;
  background-color: lightblue;
  &.active {
    background-color: dodgerblue;
    color: white;
  }
`;
export function NavBar() {
  return (
    <>
      <Container>
        <StyledNavLink to="/home">Logo</StyledNavLink>
        <StyledNavLink to="/notification">공지사항</StyledNavLink>
        <StyledNavLink to="/products">강의목록</StyledNavLink>
        <StyledNavLink to="/login">로그인 및 회원가입</StyledNavLink>
        <StyledNavLink to="/dashboard">마이페이지</StyledNavLink>
        <StyledNavLink to="/cart">장바구니</StyledNavLink>
      </Container>
    </>
  );
}
