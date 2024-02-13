import { useContext, useEffect } from "react";
import { useState } from "react";
import { getAllLectuer } from "./api";
import { LectureContext } from "./Lecture";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Img = styled.img`
  width: 100%;
`;
const Container = styled.div`
  margin-top: 10px;
  width: 1000px;
  display: grid;
  position: relative;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;
const Card = styled.div`
  width: 240px;
  border: 2px solid dodgerblue;
  margin-bottom: 20px;
  font-size: 0.8rem;
  cursor: pointer;
`;
const Text = styled.div``;
const Header = styled.div`
  text-align: center;
  background-color: black;
  color: white;
  font-size: 1.5rem;
  padding: 10px;
`;
export function AdminLecture() {
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);
  const { loginState } = useContext(LectureContext);
  const navigate = useNavigate();
  const admin = loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  useEffect(() => {
    if (!admin) {
      alert("출입금지");
      navigate("/");
    }
  }, [admin, navigate]);
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const data = await getAllLectuer();
        setLectures(data.data); // data.data에 실제 강의 목록이 들어있음
        setLoading(false);
      } catch (error) {
        console.error("강의목록 조회 중 오류 발생", error);
        setLoading(false);
      }
    };

    fetchLectures();
  }, []);

  console.log("lecture :", lectures);

  function onClick(lectureId) {
    navigate(`/products/${lectureId}`);
  }
  return (
    <>
      {loginState ? (
        <>
          <Header>{loginState.loginId}의 강의 목록</Header>
          <Container>
            {loading ? (
              <p>Loading...</p>
            ) : (
              lectures.map((lecture) => (
                <Card key={lecture.id}>
                  <div onClick={() => onClick(lecture.id)}>
                    <Img src={lecture.image} />
                    <Text>{lecture.title}</Text>
                    <Text>{lecture.teacher.name}</Text>
                  </div>
                </Card>
              ))
            )}
          </Container>
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </>
  );
}
