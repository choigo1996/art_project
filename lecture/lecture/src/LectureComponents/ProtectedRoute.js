import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { Navigate } from "react-router-dom";
import { getMyInfo } from "./api";

export function ProtectedRoute({ children }) {
  const { loginState, setLoginState } = useContext(LectureContext);
  const [loading, setLoading] = useState(true);

  // 사용자 정보 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      const userInfo = response.data;

      // 사용자 정보와 권한을 state에 저장
      setLoginState(userInfo);
      // user의 정보가 제대로 들어와있는지 확인
      console.log("loginState :", userInfo);
    } catch (error) {
      console.error("ERROR fetching user info: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [setLoginState]);

  // 로딩 중일 때는 대기 화면을 보여줌
  if (loading) {
    return <div>Loading</div>;
  }

  if (loginState?.loginId) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}
