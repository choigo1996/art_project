import { useNavigate } from "react-router-dom";
import { createQuest } from "./api";
import { useContext, useState } from "react";
import { LectureContext } from "./Lecture";

export function CreateQuest() {
  const navigate = useNavigate();
  const { loginState } = useContext(LectureContext);
  const [title, setTitle] = useState("");
}
