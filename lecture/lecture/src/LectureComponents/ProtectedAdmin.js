import { useContext } from "react";
import { LectureContext } from "./Lecture";
import { getMyInfo } from "./api";

export function ProtectedAdmin({ children, authority }) {
  const { loginState, setLoginState } = useContext(LectureContext);
  const [loading, setLoading] = useState(true);

  const fetchUserInfo = async () => {
    try {
      const response = await getMyInfo();
      const userInfo = response.data;

      setLoginState(userInfo);
      console.log("loginState");
    } catch (error) {}
  };
}
