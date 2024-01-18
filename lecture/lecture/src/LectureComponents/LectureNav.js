import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ProductWrapper } from "./ProductWrapper";

const NavContainer = styled.div`
  background-color: #3498db;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.1);
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
export function LectureNav() {
  return (
    <>
      <NavContainer>
        <NavLinks>
          <StyledNavLink to="/intro">강의 소개</StyledNavLink>
          <StyledNavLink to="/lecturelist">강의 목록</StyledNavLink>
          <StyledNavLink to="/question">QnA게시글</StyledNavLink>
          <StyledNavLink to="/review">강의 후기</StyledNavLink>
        </NavLinks>
      </NavContainer>
      <ProductWrapper />
    </>
  );
}
