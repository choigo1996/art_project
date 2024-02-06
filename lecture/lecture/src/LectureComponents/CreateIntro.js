import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { createIntro } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;
const Button = styled.button``;
const BackButton = styled.button``;
export function CreateIntro() {
  //강의 소개글,lectureId
  const [text, setText] = useState("");
  const [lectureId, setLectureId] = useState(0);
  //작성글 저장
  const [adminIntro, setAdminIntro] = useState(null);
  const [intring, setIntring] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //lectureIntro로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const { data, isLoading, refetch } = useQuery("intro", () => {
    if (adminIntro) {
      setIntring(true);
      return CreateIntro(adminIntro);
    }
  });

  useEffect(() => {
    refetch();
  }, [adminIntro]);

  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능합니다.");
      navigate("/home");
    }
  }, [admin, navigate]);

  const handleBack = () => {
    navigate("/admin");
  };

  function onSubmit(e) {
    e.preventDefault();

    const intro = {
      text: text,
      lectureId: lectureId,
    };

    if (!intro) {
      window.alert("빈 공간이 존재합니다.");
    }

    console.log(intro);

    //API호출
    createIntro(intro)
      .then((response) => {
        console.log("응답 확인 :", response);
        if (response.data.resultCode === "SUCCESS") {
          alert("글 작성이 완료 되었습니다.");
          //작성이 완료되면 목록으로 이동
          setIntroComplete(true);
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
        window.alert("에러발생");
      });
  }
  return (
    <>
      {intring ? (
        <h1>글 작성중...</h1>
      ) : introComplete ? (
        navigate(`/products/${lectureId}/intro`)
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>강의 소개글 작성</Header>
            <div>
              <span>강의ID</span>
              <input
                type="text"
                id="lectureId"
                value={lectureId}
                placeholder="강의 아이디를 입력하세요."
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value);
                  //숫자인지 확인
                  if (!isNaN(inputValue)) {
                    const clampedValue = Math.min(Math.max(inputValue));
                    setLectureId(clampedValue);
                  } else {
                    setLectureId(0);
                  }
                }}
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
