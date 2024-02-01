import { useContext, useEffect } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "./api";

export function AdminDashBoard() {
  const { loginState, setLoginState } = useContext(LectureContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>관리자님 환영합니다.</h1>
    </>
  );
}
