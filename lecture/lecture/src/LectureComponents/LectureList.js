import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div``;
const ListItem = styled.div``;

export function LectureList() {
  const [lectureLists, setLectureLists] = useState([]);

  return (
    <>
      <Container>
        <h2>강의목록</h2>
        {lectureLists.map((lectureList) => (
          <Link
            key={lectureList.list}
            to={`${setLectureLists}/${lectureList.id}`}
          >
            <ListItem>{lectureList.list}</ListItem>
          </Link>
        ))}
      </Container>
    </>
  );
}
