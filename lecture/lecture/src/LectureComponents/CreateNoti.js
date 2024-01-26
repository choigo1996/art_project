import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function CreateNoti() {
  //제목,내용
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //작성글 저장
  const [adminNoti, setAdminNoti] = useState(null);
  const [noting, setNoting] = useState(false);
  const [notiComplete, stNotiComplete] = useState(false);
  const { id: notiId } = useParams();
  const navigate = useNavigate();
}
