import { useContext, useEffect } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";

export function LogOut() {
  const { setLoginState } = useContext(LectureContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("loginState", JSON.stringify({ id: null }));
    setLoginState({ id: null });
    navigate("/");
  }, []);
}
