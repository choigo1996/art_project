import { useNavigate, useParams } from "react-router-dom";
import { createQuest } from "./api";
import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import styled from "styled-components";

const Container = styled.div``;
const Button = styled.button``;
export function CreateQuest() {
  const navigate = useNavigate();
  const { loginState } = useContext(LectureContext);
  const { id: questionId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState([]);

  useEffect(() => {
    if (!loginState) {
      alert("로그인 후에 작성바랍니다.");
      navigate("/login");
    }
  }, [loginState, navigate]);

  function onSubmit(e) {
    e.preventDefault();

    try {
      if (!title) {
        alert("제목이 비었습니다.");
      } else if (!text) {
        alert("내용이 없습니다.");
      } else {
        const response = createQuest({ title, text });
        console.log("글 작성이 완료되었습니다.", response);
        navigate(`/products/${id}/question`);
      }
    } catch (error) {
      console.error("글작성중 오류", error);
    }
  }
  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <label>
            제목 :
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label>
            내용 :
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <Button type="submit">글 작성</Button>
        </form>
      </Container>
    </>
  );
}
