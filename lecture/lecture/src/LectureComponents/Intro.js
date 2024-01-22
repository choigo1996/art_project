import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIntro } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Text = styled.div``;
export function Intro() {
  const { id: lectureId } = useParams();
  const [intro, setIntro] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const introData = await getIntro(lectureId);
        setIntro(introData);
      } catch (error) {
        console.error("Error fetching intro:", error.message);
        setIntro(null); // 에러 발생 시 intro를 명시적으로 null로 설정
      }
    }

    fetchData();
  }, [lectureId]);

  return (
    <div>
      <h1>강의 소개</h1>
      {intro ? <p>{intro.text}</p> : <p>Loading...</p>}
    </div>
  );
}
