import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getIntroByLectureId } from "./api";

export function Intro() {
  const { id: lectureId } = useParams();
  const [intro, setIntro] = useState(null); // 객체로 초기화

  console.log("lectureId", lectureId);
  useEffect(() => {
    const fetchIntro = async () => {
      try {
        const response = await getIntroByLectureId(lectureId);
        setIntro(response.data[0]);
      } catch (error) {
        console.error("소개글 조회 중 오류 발생", error);
        setIntro({ text: "소개글을 불러오는 중 오류가 발생했습니다." }); // 에러 메시지 출력
      }
    };
    fetchIntro();
  }, [lectureId]);

  console.log("Intro :", intro);
  return (
    <div>
      <h1>강의 소개</h1>
      {intro && <p>{intro.text}</p>}
    </div>
  );
}
