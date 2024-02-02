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
  const navigate = useNavigate();

  function onClick(id) {
    navigate(`/products/${id}`);
  }
  return (
    <>
      <h3>내 강의 목록</h3>
      <h3>{loginState.id}의 강의 목록</h3>
      {!isLoading
        ? data.map((u, i) => (
            <p key={i}>
              <Img
                src={u.lecture.image}
                onClick={() => onClick(u.lecture.id)}
              />
              <br />
              제목 : {u.lecture.title}
              <br />
              강사 : {u.lecture.teacher}
            </p>
          ))
        : null}
    </>
  );
}
