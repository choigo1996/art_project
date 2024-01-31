import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { createComment } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;
const Button = styled.button``;
export function CreateComment() {
  //내용,questId
  const [text, setText] = useState("");
  const { questionid: questionId } = useParams();
  //댓글 저장
  const [userComment, setUserComment] = useState(null);
  const [commenting, setCommenting] = useState(false);
  //로그인 확인
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery("comment", () => {
    if (userComment) {
      setCommenting(true);
      return createComment(userComment);
    }
  });

  useEffect(() => {
    refetch();
  }, [userComment]);

  function onSubmit(e) {
    e.preventDefault();

    const authToken = localStorage.getItem("accessToken");
    if (!authToken) {
      window.alert("로그인 후 이용바랍니다.");
      navigate("/login");
    }
    if (!text) {
      window.alert("죄송하지만,댓글을 입력해주세요.");
    } else {
      const commentData = {
        text: text,
        questionId: questionId,
      };

      console.log(commentData);
      //API호출
      createComment(commentData)
        .then((response) => {
          console.log("응답 확인 : ", response);
          if (response.data.resultCode === "SUCCESS") {
            alert("댓글이 작성되었습니다.");
          } else if (response.data.resultCode === "ERROR") {
            const errorMessage =
              response.data.message || response.data["Invalid Writer"];
            console.log(response);
            console.log(errorMessage);
            window.alert(errorMessage);
          }
        })
        .catch((error) => {
          console.error("호출 실패 :", error);
        });
    }
  }
  return (
    <>
      {commenting ? (
        <h1>댓글 작성중...</h1>
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>댓글작성</Header>
            <div>
              <span>내용</span>
              <textarea
                id="text"
                style={{ resize: "none", width: "100%", height: "100px" }}
                value={text}
                placeholder="타인의 권리를 침해하거나 명예를 훼손하는 댓글은 운영원칙 및 관련 법률에 제재를 받을 수 있습니다."
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <Button>등록</Button>
          </form>
        </Container>
      )}
    </>
  );
}
