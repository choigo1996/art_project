import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { CheckDuplicate, signUp } from "./api";
const Container = styled.div`
  width: 350px;
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
const Righter = styled.div``;
const Left = styled.div``;
const Box = styled.div``;
const CheckBox = styled.div``;
const Text = styled.div``;
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
const CheckButton = styled.button``;
export function Register() {
  //오류메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  //유효성 검사
  const [isPassword, setIsPassword] = useState("");
  const [isPasswordCheck, setIsPasswordCheck] = useState("");
  //회원가입란
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
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
    if (password === passwordCheck) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지않습니다");
      setIsPasswordCheck();
    }
  });

  function onSubmit(e) {
    e.preventDefault();
    const user = {
      loginId: loginId,
      password: password,
      passwordCheck: passwordCheck,
      name: username,
      birthDate: birthDate,
      email: email,
    };
    if (password === passwordCheck) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setUserRegister(user);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지 않습니다.");
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
                <CheckButton>중복확인</CheckButton>
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
                  id="passwordCheck"
                  value={passwordCheck}
                  type="password"
                  onChange={(e) => setPasswordCheck(e.target.value)}
                />
                {passwordCheck.length > 0 && (
                  <span
                    className={`message ${
                      isPasswordCheck ? "success" : "error"
                    }`}
                  >
                    {passwordCheckMessage}
                  </span>
                )}
              </div>
              <div>
                <label>이름</label>
                <br />
                <input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>생년월일</label>
                <br />
                <input
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div>
                <label>이메일</label>
                <br />
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
