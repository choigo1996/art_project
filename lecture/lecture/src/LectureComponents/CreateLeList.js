import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { createLelist } from "./api";
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

export function CreateLeList() {
  //제목,비디오,선생,영상길이,lectureId
  const [title, setTitle] = useState("");
  const [video, setVideo] = useState("");
  const [teacher, setTeacher] = useState("");
  const [duration, setDuration] = useState("");
  const { id: lectureId } = useParams();
  //작성글 저장
  const [adminLeList, setAdminLeList] = useState(null);
  const [lelisting, setLeListing] = useState(false);
  const [lelistComplete, setLelistComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //lectureLelist로 목록으로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const { data, isLoading, refetch } = useQuery("lelist", () => {
    if (adminLeList) {
      setLeListing(true);
      return CreateLeList(adminLeList);
    }
  });

  useEffect(() => {
    refetch();
  }, [adminLeList]);

  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능합니다.");
      navigate("/home");
    }
  }, [admin, navigate]);

  const handleBack = () => {
    navigate(`/products/${lectureId}/lecturelist`);
  };

  function onSubmit(e) {
    e.preventDefault();

    const lelist = {
      title: title,
      video: video,
      teacher: teacher,
      duration: duration,
      lectureId: lectureId,
    };

    if (!lelist) {
      window.alert("빈 공간이 존재합니다!");
    }

    console.log(lelist);
    //API호출
    createLelist(lelist)
      .then((response) => {
        console.log("응답 확인 : ", response);
        if (response.resultCode === "SUCCESS") {
          alert("글 작성이 완료되었습니다.");
          //작성이 완료되면 목록으로 이동
          setLelistComplete(true);
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
      {lelisting ? (
        <h1>글 작성중입니다...</h1>
      ) : lelistComplete ? (
        navigate(`/products/${lectureId}/lecturelist`)
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
              <span>비디오</span>
              <input
                id="video"
                value={video}
                placeholder="비디오 링크를 넣어"
                onChange={(e) => setVideo(e.target.value)}
              />
            </div>
            <div>
              <span>선생님</span>
              <input
                id="teacher"
                value={teacher}
                placeholder="선생님 이름"
                onChange={(e) => setTeacher(e.target.value)}
              />
            </div>
            <div>
              <span>영상길이</span>
              <input
                id="duration"
                value={duration}
                placeholder="영상길이"
                onChange={(e) => setDuration(e.target.value)}
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
