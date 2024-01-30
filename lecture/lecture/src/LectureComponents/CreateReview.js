import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { createReview } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;
const Button = styled.button``;
const BackButton = styled.button``;
export function CreateReview() {
  //내용,별점,lectureId
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const { id: lectureId } = useParams();
  //후기저장
  const [useReview, setUseReview] = useState(null);
  const [reviewing, setReviewing] = useState(false);
  const [reviewComplete, setReviewComplete] = useState(false);
  //로그인 확인용
  const { loginState } = useContext(LectureContext);
  //리뷰 목록으로 돌아가기
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery("question", () => {
    if (useReview) {
      setReviewing(true);
      return createReview(useReview);
    }
  });

  useEffect(() => {
    refetch();
  }, [useReview]);

  useEffect(() => {
    if (!loginState) {
      alert("로그인후 작성바람");
      navigate("/login");
    }
  }, [loginState, navigate]);

  const handleBack = () => {
    navigate(-1);
  };

  function onSubmit(e) {
    e.preventDefault();

    if (!text || !rating) {
      window.alert("죄송하지만, 빈 공간이 존재합니다.");
      return;
    } else {
      const reviewData = {
        text: text,
        rating: rating,
        lectureId: lectureId,
      };

      console.log(reviewData);
      //API호출
      createReview(reviewData)
        .then((response) => {
          console.log("응답확인 :", response);
          if (response.data.resultCode === "SUCCESS") {
            alert("후기가 작성되었습니다.");
            setReviewComplete(true);
          } else if (response.data.resultCode === "ERROR") {
            const errorMassage =
              response.data.message || response.data["Invalid Writer"];
            console.log(response);
            console.log(errorMassage);
            window.alert(errorMassage);
          }
        })
        .catch((error) => {
          console.log("respons :", error.response.data.data);
          alert(error.response.data.message);
        });
    }
  }
  return (
    <>
      {reviewing ? (
        <h1>후기 작성중입니다...</h1>
      ) : reviewComplete ? (
        navigate(`/products/${lectureId}/review`)
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>후기 작성</Header>
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
            <div>
              <span>점수(1~10까지 주실수있습니다.)</span>
              <input
                type="text"
                id="rating"
                value={rating}
                placeholder="점수"
                onChange={(e) => {
                  const inputValue = parseInt(e.target.value, 10);
                  //숫자인지 확인
                  if (!isNaN(inputValue)) {
                    //입력값이 1~10사이인지 확인
                    const clampedValue = Math.min(Math.max(inputValue, 1), 10);
                    setRating(clampedValue);
                  } else {
                    setRating(0);
                  }
                }}
              />
            </div>
            <Button type="submit">후기 작성</Button>
            <BackButton onClick={handleBack}>취소</BackButton>
          </form>
        </Container>
      )}
    </>
  );
}
