import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getAllAuthority, updateAutority } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;
const BackButton = styled.button``;
const Button = styled.button``;
const Select = styled.select`
  padding: 0.5rem;
  margin-top: 0.5rem;
`;
const Option = styled.option``;
export function UpdateAuthority() {
  //userID,권한
  const [authorityName, setAuthorityName] = useState("");
  const [selectAutority, setSelecAuthority] = useState([]);
  const [userId, setUserId] = useState("");
  //유저 권한 변경(부여)
  const [authorityChange, setAuthorityChange] = useState(null);
  const [authoriting, setAuthoiriting] = useState(false);
  const [authorityComplete, setAuthorityComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인
  const { loginState } = useContext(LectureContext);
  //admin페이지로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const { data, isLoading, refetch } = useQuery("updataAuthority", () => {
    if (authorityChange) {
      setAuthoiriting(true);
      return updateAutority(authorityChange);
    }
  });

  //관리자만 접근가능
  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능");
      navigate("/");
    }
  }, [admin, navigate]);

  //취소시, admin대시보드로
  const handleBack = () => {
    navigate("/admin");
  };

  useEffect(() => {
    refetch();
  }, [authorityChange]);

  //Authority가져오기
  useEffect(() => {
    const fetchAuthority = async () => {
      try {
        const response = await getAllAuthority();
        setSelecAuthority(response);
        console.log("권한을 가져옵니다.", response);
      } catch (error) {
        console.error("권한 목록 조회 중 오류 발생 ", error);
      }
    };
    fetchAuthority();
  }, []);
  console.log("selectAuthority :", selectAutority);

  function onSubmit(e) {
    e.preventDefault();

    const auth = {
      userId: userId,
      authorityName: authorityName,
    };

    if (!auth) {
      window.alert("빈 공간이 존재합니다");
    }

    console.log(auth);
    //API호출
    updateAutority(auth)
      .then((response) => {
        console.log("응답확인 :", response);
        if (response.data.resultCode === "SUCCESS") {
          alert("권한이 업데이트되었습니다.");
          setAuthorityComplete(true);
        } else if (response.data.resultCode === "ERROR") {
          const errorMassage =
            response.data.message || response.data["Invalid writer"];
          console.log(response);
          console.log(errorMassage);
          window.alert(errorMassage);
        }
      })
      .catch((error) => {
        console.error("호출 실패 :", error);
        window.alert("에러발생");
      });
  }
  return (
    <>
      {authoriting ? (
        <h1>권한을 부여중입니다...</h1>
      ) : authorityComplete ? (
        navigate("/admin")
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>권한 부여</Header>
            <div>
              <span>유저ID</span>
              <input
                type="text"
                id="userId"
                value={userId}
                placeholder="유저ID를 입력하세요"
                onChange={(e) => setUserId(e.target.value)}
              />
              <Select
                value={authorityName}
                onChange={(e) => setAuthorityName(e.target.value)}
              >
                <Option value="">권한 선택</Option>
                {selectAutority.map((authority, index) => (
                  <Option key={index} value={authority}>
                    {authority}
                  </Option>
                ))}
              </Select>
            </div>
            <Button type="submit">권한 부여</Button>
            <BackButton onClick={handleBack}>취소</BackButton>
          </form>
        </Container>
      )}
    </>
  );
}
