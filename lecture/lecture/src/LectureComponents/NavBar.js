import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { ProductWrapper } from "./ProductWrapper";

const NavBarContainer = styled.div`
  background-color: #3498db;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  font-size: 1.5rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #2979b5;
  }

  &.active {
    background-color: #2979b5;
  }
`;

export function NavBar() {
  const { loginState } = useContext(LectureContext);
  const navigate = useNavigate();

  function home() {
    navigate("/home");
  }
  return (
    <>
      <NavBarContainer>
        <Logo onClick={() => home()}>Logo</Logo>
        <NavLinks>
          <StyledNavLink to="/notification">공지사항</StyledNavLink>
          <StyledNavLink to="/products">강의목록</StyledNavLink>
          <StyledNavLink to="/dashboard">마이페이지</StyledNavLink>
          {loginState?.id ? (
            <StyledNavLink to="/logOut">로그아웃</StyledNavLink>
          ) : (
            <StyledNavLink to="login">로그인</StyledNavLink>
          )}
          <StyledNavLink to="/cart">장바구니</StyledNavLink>
        </NavLinks>
      </NavBarContainer>
      <ProductWrapper />
    </>
  );
}
