import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { checkDuplicate, signUp } from "./api";
const Container = styled.div``;
const Header = styled.div``;
const Righter = styled.div``;
const Left = styled.div``;
const Box = styled.div``;
const CheckBox = styled.div``;
const Text = styled.div``;
const Button = styled.button``;
const CheackButton = styled.button``;
export function Register() {
  //오류메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheackMessage, setPasswordCheackMessage] = useState("");
  //유효성 검사
  const [isPassword, setIsPassword] = useState("");
  const [isPasswordCheack, setIsPasswordCheack] = useState("");
  //회원가입란
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheack, setPasswordCheack] = useState("");
  const [username, setUsername] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  //회원정보 저장
  const [userRegister, setUserRegister] = useState(null);
  const [registering, setRegistering] = useState(false);
  const [registerComplete, setRegisteringComplete] = useState(false);
  const { loginState, setLoginState } = useContext(LectureContext);

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery("register", () => {
    if (userRegister) {
      setRegistering(true);
      return signUp(userRegister);
    }
  });
  //아이디 중복확인
  const [message, setMassage] = useState("");

  const handleCheackDuplicate = () => {
    checkDuplicate(loginId)
      .then((data) => {
        setMassage(data.massage);
      })
      .catch(() => {
        setMassage("죄송하지만,아이디가 중복됩니다.");
      });
  };
  useEffect(() => {
    if (data && data.resultCode === "SUCCESS" && userRegister) {
      console.log(data);
      // 1. 가입완료된 이후 자동로그인 하기
      localStorage.setItem(
        "loginState",
        JSON.stringify({ id: userRegister.loginId })
      );
      setLoginState({ id: userRegister.loginId });
      setTimeout(() => {
        navigate("/dashboard");
        setRegistering(false);
      }, 1000);
      // 2. 가입완료된 이후 다시 로그인하도록 하기
      // setRegistering(false);
      // setRegisteringComplete(true);
    } else if (data && data.resultCode === "ERROR") {
      console.log(data);
      navigate("/login");
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, [userRegister]);
  //비밀번호 확인맨
  useEffect(() => {
    if (password === passwordCheack) {
      setPasswordCheackMessage("비밀번호가 일치합니다.");
      setIsPasswordCheack(false);
    } else {
      setPasswordCheackMessage("비밀번호가 일치하지않습니다");
      setIsPasswordCheack();
    }
  });

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      loginId: loginId,
      password: password,
      passwordCheack: passwordCheack,
      name: username,
      birthDate: birthDate,
      email: email,
    };
    if (password === passwordCheack) {
      setPasswordCheackMessage("비밀번호가 일치합니다.");
      setUserRegister(user);
    } else {
      setPasswordCheackMessage("비밀번호가 일치하지 않습니다.");
      window.alert("비밀번호를 일치하게 입력하세요.");
    }
  }
  return (
    <>
      {registering ? (
        <h1>로그인중...</h1>
      ) : registerComplete ? (
        <h1>환영합니다.{username}님</h1>
      ) : loginState?.id ? (
        <>
          <h1>이미 로그인되어 있습니다.({loginState.id})</h1>
        </>
      ) : (
        <Container>
          <form onSubmit={onSubmit}>
            <Header>회원가입</Header>
            <Righter>
              <Header>필수입력정보</Header>
              <div>
                <label>아이디</label>
                <br />
                <input
                  id="loginId"
                  value={loginId}
                  onChange={(e) => setLoginId(e.target.value)}
                />
                <CheackButton>중복확인</CheackButton>
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
                {password.length > 0 && (
                  <span
                    className={`message ${isPassword ? "success" : "error"}`}
                  >
                    {passwordMessage}
                  </span>
                )}
              </div>
              <div>
                <label>비밀번호 확인</label>
                <br />
                <input
                  id="passwordCheack"
                  value={passwordCheack}
                  type="password"
                  onChange={(e) => setPasswordCheack(e.target.value)}
                />
                {passwordCheack.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordCheack ? "success" : "error"
                    }`}
                  >
                    {passwordCheackMessage}
                  </span>
                )}
              </div>
              <div>
                <label>이름</label>
              </div>
              <div>
                <label>생년월일</label>
              </div>
              <div>
                <label>이메일</label>
              </div>
            </Righter>

            <Left>
              <Header>약관동의</Header>
              <Box>
                <CheckBox></CheckBox>
                <Text>전체동의</Text>
              </Box>
              <Box>
                <CheckBox></CheckBox>
                <Text>[필수] 이용약관 동의</Text>
              </Box>
              <Box>
                <CheckBox></CheckBox>
                <Text>[필수] 이용약관 동의</Text>
              </Box>
              <Box>
                <CheckBox></CheckBox>
                <Text>[선택]</Text>
              </Box>
              <Box>
                <CheckBox></CheckBox>
                <Text>[선택]</Text>
              </Box>
              <Box>
                <CheckBox></CheckBox>
                <Text>[선택]</Text>
              </Box>
            </Left>
            <Button>회원가입</Button>
          </form>
        </Container>
      )}
    </>
  );
}
