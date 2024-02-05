import { useContext, useState } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

export function CreateLecture() {
  //제목,선생님,가격,이미지
  const [tite, setTitle] = useState("");
  const [teacher, setTeacher] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  //강의 저장
  const [adminLecture, setAdminLecture] = useState(null);
  const [lecturing, setLecturing] = useState(false);
  const [lectureComplete, setLectureComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //Lecture목록으로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";
}
