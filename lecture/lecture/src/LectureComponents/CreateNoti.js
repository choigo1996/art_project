import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createNoti } from "./api";
import { LectureContext } from "./Lecture";
import styled from "styled-components";

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

export function CreateNoti() {
  //제목,내용
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //작성글 저장
  const [adminNoti, setAdminNoti] = useState(null);
  const [noting, setNoting] = useState(false);
  const [notiComplete, stNotiComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //Notification목록으로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const { data, isLoading, refetch } = useQuery("question", () => {
    if (adminNoti) {
      setNoting(true);
      return createNoti(adminNoti);
    }
  });

  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능합니다.");
      navigate("/home");
    }
  }, [admin, navigate]);
  const handleBack = () => {
    navigate("/notification");
  };
  useEffect(() => {
    refetch();
  }, [adminNoti]);

  function onSubmit(e) {
    e.preventDefault();

    if (!title || !text) {
      window.alert("빈 공간이 존재");
    } else {
      const admin = {
        title: title,
        text: text,
      };

      console.log(admin);
      //API호출
      createNoti(admin)
        .then((response) => {
          console.log("응답 확인 : ", response);
          if (response.resultCode === "SUCCESS") {
            alert("글 작성이 완료되었습니다.");
          } else if (response.resultCode === "ERROR") {
            const errorMassage =
              response.data.massage || response.data["Invalid writer"];
            console.log(response);
            console.log(errorMassage);
            window.alert(errorMassage);
          }
        })
        .catch((error) => {
          console.error("호출 실패:", error);
          window.alert("에러발생");
        });
    }
  }
  return (
    <>
      {noting ? (
        <h1>글 작성중입니다...</h1>
      ) : notiComplete ? (
        navigate("/notification")
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
