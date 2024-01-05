import { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { ProductWrapper } from "./ProductWrapper";

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
  const { loginState } = useContext(LectureContext);

  return (
    <>
      <Container>
        <StyledNavLink to="/home">Logo</StyledNavLink>
        <StyledNavLink to="/notification">공지사항</StyledNavLink>
        <StyledNavLink to="/products">강의목록</StyledNavLink>
        <StyledNavLink to="/dashboard">마이페이지</StyledNavLink>
        {loginState?.id ? (
          <StyledNavLink to="/logOut">로그아웃</StyledNavLink>
        ) : (
          <StyledNavLink to="login">로그인</StyledNavLink>
        )}
        <StyledNavLink to="/cart">장바구니</StyledNavLink>
      </Container>
      <ProductWrapper />
    </>
  );
}
