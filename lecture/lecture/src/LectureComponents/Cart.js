import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { Purchase } from "./Purchase";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;
const Card = styled.div`
  width: 500px;
  height: 100px;
  display: flex;
  border: 1px solid dodgerblue;
  position: relative;
`;
const Img = styled.img`
  height: calc(100%-2);
  margin: 1px;
`;
const Text = styled.p`
  margin-left: 10px;
  font-size: 0.8rem;
`;
const Delete = styled.button`
  width: 30px;
  height: 100%;
  background-color: teal;
  position: absolute;
  right: 0;
  text-align: center;
  line-height: 100px;
  border: none;
  cursor: pointer;
`;

export function Cart() {
  const { checkList, setCheckList, lectures, loginState } =
    useContext(LectureContext);
  const [totalPrice, setTotalPrice] = useState(0);
  const [newList, setNewList] = useState([]);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);
  const [purchaseFailed, setPurchaseFailed] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setNewList(lectures.filter((l, i) => checkList[i].checked));
    console.log("checkList", checkList);
  }, [checkList, lectures]);

  function onClick(e) {
    const temp = checkList.map((item) => {
      if (item && item.id === +e.target.id) {
        return { ...item, checked: false };
      } else {
        return item;
      }
    });
    setCheckList(temp);
  }

  function onClickBtn() {
    if (loginState && loginState.loginId) {
      setPurchasing(true);
    } else {
      alert("로그인이 필요합니다.");
      console.log("login page");
      navigate("/login");
    }
  }
  useEffect(() => {
    console.log("Login State : ", loginState);
  }, [loginState]);

  useEffect(() => {
    console.log("newList", newList.length);
    let price = 0;
    for (let i = 0; i < newList?.length; i++) {
      price = price + newList[i].price;
    }
    setTotalPrice(price);
  }, [newList]);

  useEffect(() => {
    if (purchaseComplete) {
      const temp = checkList.map((item) => {
        return { ...item, checked: false };
      });
      setCheckList(temp);
      setPurchaseComplete(false);
      window.confirm("결제가 완료 되었습니다.");
      navigate("/userlecture");
    }
  }, [purchaseComplete]);

  useEffect(() => {
    if (purchaseFailed) {
      window.confirm("죄송하지만, 구매요청이 실패했습니다.");
      setPurchaseFailed(false);
    }
  }, [purchaseFailed]);

  return (
    <>
      {purchasing ? (
        <Purchase
          items={newList}
          setPurchasing={setPurchasing}
          setPurchaseComplete={setPurchaseComplete}
          setPurchaseFailed={setPurchaseFailed}
        />
      ) : (
        <>
          <Container>
            {newList?.map((lecture) => (
              <Card key={lecture.id}>
                <Img src={lecture.image} />
                <div>
                  <Text>타이틀 : {lecture.title}</Text>
                  <Text>강사 : {lecture.teacher.name}</Text>
                  <Text>가격 : {lecture.price}</Text>
                </div>
                <Delete id={lecture.id} onClick={onClick}>
                  X
                </Delete>
              </Card>
            ))}
          </Container>
          <h3>총결제금액 : {totalPrice}원</h3>
          {newList?.length > 0 && (
            <button onClick={onClickBtn}>결제하기</button>
          )}
        </>
      )}
    </>
  );
}
