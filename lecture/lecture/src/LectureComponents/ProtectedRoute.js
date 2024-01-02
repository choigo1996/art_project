import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { NavBar } from "./NavBar";

export function ProtectedRoute({ children }) {
  const { loginState } = useContext(LectureContext);

  if (loginState?.id) {
    return children;
  } else {
    return <NavBar to="/login" />;
  }
}
