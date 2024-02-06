import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { LectureNav } from "./LectureNav";
import { buyPurchase } from "./api";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;
const Img = styled.img`
  width: 40%;
  display: block;
  margin: 0px auto;
`;

const Content = styled.div`
  margin-left: 10px;
  font-size: 1rem;
`;
const CategoryList = styled.div`
  display: flex;
  list-style: none;
`;
const Buy = styled.button``;
const Basket = styled.button``;

export function SingleProduct() {
  const { loginState, lectures, checkList, setCheckList } =
    useContext(LectureContext);

  const navigate = useNavigate();
  const { id } = useParams();

  const lecture = lectures.find((l) => l.id === +id);
  function addCart(e) {
    const temp = checkList.map((item) => {
      if (item.id === lecture.id) {
        return { ...item, checked: true };
      } else {
        return item;
      }
    });
    console.log("temp :", temp);
    setCheckList(temp);
    navigate("/cart");
  }

  function application() {
    console.log(loginState);
    if (loginState && loginState.id) {
      //사용자 확인 메시지 표시
      const confirmPurchase = window.confirm("정말 구매하시겠습니까?");
      if (confirmPurchase) {
        buyPurchase(lecture)
          .then((response) => {
            //구매완료
            window.alert("바로구매가 완료되었습니다.");
          })
          .catch((error) => {
            console.error("바로구매 도중 오류:", error);
          });
      } else {
        window.alert("구매를 취소했습니다.");
      }
    } else {
      window.alert("로그인이 필요합니다.");
      console.log("로그인 페이지로 이동");
      navigate("/login");
    }
  }
  const { title: lectureTitle, teacher, image, price } = lecture;
  console.log(lecture);
  return (
    <>
      <Title>{lectureTitle}</Title>
      <Container>
        <Img src={image} />
        <Content>
          <p>가격 : {price}원</p>
          <p>강사 : {teacher}</p>
          <CategoryList>
            카테고리 :
            {lecture.categorys.map((category, i) => (
              <li key={i}>{category.categoryType}</li>
            ))}
          </CategoryList>
        </Content>
        <Basket onClick={addCart}>장바구니</Basket>
        <Buy onClick={application}>수강신청</Buy>
        <LectureNav />
      </Container>
    </>
  );
}
