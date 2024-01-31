import { useContext, useEffect, useState } from "react";
import { LectureContext } from "./Lecture";
import { Navigate } from "react-router-dom";
import { getMyInfo } from "./api";

export function ProtectedRoute({ children, requiredRole }) {
  const { loginState, setLoginState } = useContext(LectureContext);
  const [loading, setLoading] = useState(true);

  // 사용자 정보 가져오는 함수
  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      const userInfo = response.data;

      // 사용자 정보와 권한을 state에 저장
      setLoginState(userInfo);
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

  // user의 정보가 제대로 들어와있는지 확인
  console.log("User Info:", loginState);

  // 권한이 있는지 확인
  if (loginState?.authorityDtoSet) {
    // authorityDtoSet 배열에 어떤 값이 들어있는지 확인
    console.log("AuthorityDtoSet:", loginState?.authorityDtoSet);

    // requiredRole이 각 authority와 맞는지 확인
    const roleMatches = loginState.authorityDtoSet.some(
      (authority) => authority.authorityName === requiredRole
    );
    console.log(requiredRole);
    console.log("Role Matches:", roleMatches);

    // 필요한 권한이 있는지 확인
    const hasRequiredRole = roleMatches;

    console.log("Role authority", hasRequiredRole);

    // 필요한 권한이 있는 경우 children 렌더링, 아닌 경우 로그인 페이지로 이동
    if (hasRequiredRole) {
      return children;
    } else {
      // 필요한 권한이 없는 경우 권한 정보만 초기화
      setLoginState((prevLoginState) => ({
        ...prevLoginState,
        authorityDtoSet: [],
      }));

      return <Navigate to="/login" />;
    }
  } else {
    console.error("authorityDtoSet is undefined or null");
    return <Navigate to="/login" />;
  }
}
