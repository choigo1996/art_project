import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getLectureByTeacher, login } from "./api";
import styled from "styled-components";

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

export function TeacherLecture() {
  const { loginState } = useContext(LectureContext);
  const navigate = useNavigate();
  //선생님이 가지고 있는 강의 정보 저장
  const [lectureList, setLectureList] = useState([]);
  const [loading, setLoading] = useState(true);
  const teacher =
    loginState.authorityDtoSet[0].authorityName === "ROLE_TEACHER";

  //선생님이 가지고 있는 강의 목록을 가져온다.
  const { data, isLoading } = useQuery(["lecture", loginState.id], () =>
    getLectureByTeacher(loginState.id)
  );

  useEffect(() => {
    if (!teacher) {
      alert("없어임마!");
      navigate("/");
    }
  }, [teacher, navigate]);
  useEffect(() => {
    if (!isLoading && data) {
      setLectureList(data.data.data);
      setLoading(false);
    }
  }, [isLoading, data]);

  function onClick(lectureId) {
    navigate(`/products/${lectureId}`);
  }

  console.log("lectureList", lectureList);
  return (
    <>
      <Header>{loginState.loginId}의 강의 목록</Header>
      <Container>
        {loading ? (
          <div>강의 없지롱~</div>
        ) : (
          lectureList.map((lecture) => (
            <Card key={lecture.id}>
              <div onClick={() => onClick(lecture.id)}>
                <Img src={lecture.image} />
                <Text>강의명: {lecture.title}</Text>
                <Text>강사: {lecture.teacher.name}</Text>
              </div>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}
