import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { Navigate } from "react-router-dom";
import { getMyInfo } from "./api";

export function ProtectedRoute({ children }) {
  const { loginState, setLoginState } = useContext(LectureContext);

  if (loginState?.loginId) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
