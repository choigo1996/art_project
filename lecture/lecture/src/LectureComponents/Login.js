import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";
import { login } from "./api";

const Container = styled.div`
  width: 300px;
  background-color: #eee;
  box-shadow: 2px 2px 5px grey;
  padding: 20px;
  border-radius: 20px;
  margin: 50px;
`;
const Header = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;
const Button = styled.button`
  width: 100%;
  height: 25px;
  margin-top: 20px;
  background-color: lightblue;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;
  font-weight: bold;
  color: white;
  border: 1px solid blue;
`;
const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #333;
  margin-left: 60px;
  &.active {
    background-color: dodgerblue;
    color: white;
  }
`;
export function Login() {
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [userLogin, setUserLogin] = useState(null);
  const [logginIn, setLoggingIn] = useState(false);
  const { loginState, setLoginState } = useContext(LectureContext);

  const navigate = useNavigate();

  useEffect(() => {
    //로컬 스토리지에서 로그인 정보 가져오기
    const storedLoginState = sessionStorage.getItem("loginState");
    //로그인 정보가 있으면 자동으로 로그인 상태설정
    if (storedLoginState) {
      const parsedLoginState = JSON.parse(storedLoginState);
      setLoginState(parsedLoginState);
    }
  }, [setLoginState]);

  const { data, isLoading, refetch } = useQuery(
    "login",
    () => {
      if (userLogin) {
        setLoggingIn(true);
        return login(userLogin);
      }
    },
    { retry: 0 }
  );
  useEffect(() => {
    if (data && data.resultCode === "SUCCESS" && userLogin) {
      console.log("성공!", data.resultCode);
      sessionStorage.setItem(
        "loginState",
        JSON.stringify({ id: userLogin.loginId })
      );
      console.log("userLogin", userLogin);
      setLoginState({ id: userLogin.loginId });
      setTimeout(() => {
        navigate("/dashboard");
        setLoggingIn(false);
      }, 1000);
      alert("환영합니다.");
    } else if (data && data.resultCode === "ERROR" && userLogin) {
      alert("아이디 또는 비밀번호를 확인하세요.");
      setLoggingIn(false);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [userLogin]);

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      loginId: loginId,
      password: password,
    };
    if (!loginId || !password) {
      alert("아이디 및 비밀번호를 입력하세요");
    } else {
      setUserLogin(user);
    }
  }
  return (
    <>
      {logginIn ? (
        <h1>로그인 중입니다...</h1>
      ) : loginState?.id ? (
        <h1>이미 로그인되어 있습니다. {loginState.id}</h1>
      ) : (
        <>
          <Container>
            <form onSubmit={onSubmit}>
              <Header>로그인</Header>
              <div>
                <label>아이디</label>
                <br />
                <input
                  id="loginId"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
              </div>
              <div>
                <label>비밀번호</label>
                <br />
                <input
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit">로그인</Button>
            </form>
          </Container>
          <StyledNavLink to="/register">회원가입</StyledNavLink>
        </>
      )}
    </>
  );
}
