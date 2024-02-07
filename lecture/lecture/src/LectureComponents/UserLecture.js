import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { getPurchaseById } from "./api";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Img = styled.image``;
export function UserLecture() {
  const { loginState } = useContext(LectureContext);
  const { data, isLoading } = useQuery("getPurchaseById", () =>
    getPurchaseById(loginState?.id)
  );
  console.log("loginstate :", loginState.login);
  const navigate = useNavigate();
  function onClick(id) {
    navigate(`/products/${id}`);
  }
  return (
    <>
      <h3>{loginState.login}의 강의 목록</h3>
    </>
  );
}
