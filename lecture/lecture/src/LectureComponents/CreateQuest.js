import { useNavigate, useParams } from "react-router-dom";
import { createQuest } from "./api";
import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import styled from "styled-components";
import { useQuery } from "react-query";

const Container = styled.div`
  width: 500px;
  background-color: #eee;
  box-shadow: 2px 2px 5px gray;
  padding: 20px;
  border-radius: 20px;
  margin: 50px;
`;
const Button = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 20px;
  background-color: lightblue;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border: 1px solid blue;
`;
const BackButton = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 20px;
  background-color: lightblue;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border: 1px solid blue;
`;
const Header = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

export function CreateQuest() {
  //제목,내용,lectureId
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const { id: lectureId } = useParams();
  //작성글 저장
  const [userQuest, setUserQuest] = useState(null);
  const [questing, setQuesting] = useState(false);
  const [questComplete, setQuestComplete] = useState(false);
  //로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //Question목록으로 넘김
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery("question", () => {
    if (userQuest) {
      setQuesting(true);
      return createQuest(userQuest);
    }
  });

  useEffect(() => {
    refetch();
  }, [userQuest]);

  useEffect(() => {
    if (!loginState) {
      alert("로그인 후에 작성바랍니다.");
      navigate("/login");
    }
  }, [loginState, navigate]);
  const handleBack = () => {
    navigate(`/products/${lectureId}/question`);
  };

  function onSubmit(e) {
    e.preventDefault();

    if (!title || !text) {
      window.alert("죄송하지만, 빈 공간이 존재합니다.");
      return;
    } else {
      const questData = {
        title: title,
        text: text,
        lectureId: lectureId,
      };

      console.log(questData);
      //API호출
      createQuest(questData)
        .then((response) => {
          console.log("응답확인 :", response);
          if (response.data.resultCode === "SUCCESS") {
            alert("글 작성이 완료되었습니다.");
            //작성이 완료되면 목록으로 이동
            setQuestComplete(true);
          } else if (response.data.resultCode === "ERROR") {
            const errorMassage =
              response.data.message || response.data["Invalid Writer"];
            console.log(response);
            console.log(errorMassage);
            window.alert(errorMassage);
          }
        })
        .catch((error) => {
          console.error("호출 실패 :", error);
          window.alert("에러 발생");
        });
    }
  }
  return (
    <>
      {questing ? (
        <h1>글 작성중입니다...</h1>
      ) : questComplete ? (
        navigate(`/products/${lectureId}/question`)
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>질문 사항 작성</Header>
            <div>
              <span>제목</span>
              <input
                id="title"
                value={title}
                placeholder="제목을 입력하세요."
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <span>내용</span>
              <textarea
                name="text"
                style={{ resize: "none", width: "100%", height: "100px" }}
                value={text}
                placeholder="내용을 입력하세요"
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <Button>글 작성</Button>
            <BackButton onClick={handleBack}>취소</BackButton>
          </form>
        </Container>
      )}
    </>
  );
}
