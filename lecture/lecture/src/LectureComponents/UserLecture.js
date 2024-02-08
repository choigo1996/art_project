import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { getPurchaseById } from "./api";
import { useNavigate } from "react-router-dom";
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
export function UserLecture() {
  const { loginState } = useContext(LectureContext);
  const navigate = useNavigate();
  //사용자가 구매한 강의 정보 저장
  const [purchaseList, setPurchaseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = loginState.authorityDtoSet[0].authorityName === "ROLE_USER";

  //사용자가 구매한 강의 목록을 가져온다.
  const { data, isLoading } = useQuery(["purchase", loginState.id], () =>
    getPurchaseById(loginState.id)
  );

  useEffect(() => {
    if (!user) {
      alert("없는 페이지입니다.");
      navigate("/");
    }
  }, [user, navigate]);
  //데이터가 로드되면 상태 업데이트
  useEffect(() => {
    if (!isLoading && data) {
      setPurchaseList(data.data.data);
      setLoading(false);
    }
  }, [isLoading, data]);

  function onClick(lectureid) {
    navigate(`/products/${lectureid}`);
  }

  console.log("purchaseList", purchaseList);

  return (
    <>
      <Header>{loginState.loginId}의 강의 목록</Header>
      <Container>
        {loading ? (
          <div>강의없지롱~</div>
        ) : (
          purchaseList.map((purchase) => (
            <Card key={purchase.id}>
              <div onClick={() => onClick(purchase.lecture.id)}>
                <Img src={purchase.lecture.image} />
                <Text>강의명: {purchase.lecture.title}</Text>
                <Text>강사: {purchase.lecture.teacher.name}</Text>
              </div>
            </Card>
          ))
        )}
      </Container>
    </>
  );
}
