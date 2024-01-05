import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const { loginState } = useContext(LectureContext);

  if (loginState?.id) {
    return children;
  } else {
    return <Navigate to="login" />;
  }
}
