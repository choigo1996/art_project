import { useContext, useEffect } from "react";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { getMyInfo } from "./api";

export function AdminDashBoard() {
  const { loginState, setLoginState } = useContext(LectureContext);
  const navigate = useNavigate();

  const fetchAdminInfo = async () => {
    try {
      const response = await getMyInfo();
      const adminInfo = response.data;

      setLoginState(adminInfo);
      console.log("adminInfo : ", adminInfo);
    } catch (error) {
      console.error("ERROR fetching admin info: ", error);
    }
  };
  useEffect(() => {
    fetchAdminInfo();
  }, [setLoginState]);
  return (
    <>
      <h1>관리자님 환영합니다.</h1>
    </>
  );
}
