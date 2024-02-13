import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { LectureNav } from "./LectureNav";
import { buyPurchase, getPurchaseByLectureId } from "./api";

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
  const [isPurchased, setIsPurchased] = useState(false);
  const adminId = loginState?.authorityDtoSet[0].authorityName === "ROLE_ADMIN";
  const teacherId =
    loginState?.authorityDtoSet[0].authorityName === "ROLE_TEACHER";
  const lecture = lectures.find((l) => l.id === +id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPurchaseByLectureId(id); // 해당 강의를 구매한 모든 사용자의 정보 가져오기
        console.log("Response:", response);

        if (response.resultCode === "SUCCESS") {
          const purchaseData = response.data;
          const purchasedUsers = purchaseData.map(
            (purchase) => purchase.user.id
          ); // 사용자 ID 목록 가져오기
          const loggedInUserId = loginState?.id; // 로그인한 사용자의 ID 가져오기
          console.log("PurchaseData :", purchaseData);

          // 로그인한 사용자가 해당 강의를 구매했는지 확인
          if (!loggedInUserId || !purchasedUsers.includes(loggedInUserId)) {
            setIsPurchased(false); // 사용자가 로그인하지 않거나 강의를 구매하지 않은 경우
          } else {
            setIsPurchased(true);
          }
        } else {
          console.error("Error fetching purchase info:", response.message);
        }
      } catch (error) {
        console.error("Error fetching purchase info:", error);
      }
    };

    fetchData();
  }, [id, loginState]);

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
          <p>강사 : {lecture.teacher.name}</p>
          <CategoryList>
            카테고리 :
            {lecture.categorys.map((category, i) => (
              <li key={i}>{category.categoryType}</li>
            ))}
          </CategoryList>
        </Content>
        {!isPurchased && !adminId && !teacherId && (
          <Basket onClick={addCart}>장바구니</Basket>
        )}
        {!isPurchased && !adminId && !teacherId && (
          <Buy onClick={application}>수강신청</Buy>
        )}
        <LectureNav />
      </Container>
    </>
  );
}
