import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { checkDuplicateEmail, checkDuplicateLogin, signUp } from "./api";
const Container = styled.div`
  width: 80%;
  background-color: #eee;
  box-shadow: 2px 2px 5px grey;
  padding: 30px;
  border-radius: 20px;
  margin-top: 25px;
`;

const Header = styled.div`
  font-size: 1.5rem;
  text-align: center;
`;

const Righter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  & > div {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }
  label {
    font-size: 1rem;
    margin-bottom: 8px;
    color: #555;
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    transition: border-color 0.3s;

    &:focus {
      border-color: #4caf50;
    }
  }

  .message {
    font-size: 0.8rem;
    margin-top: 8px;

    &.success {
      color: green;
    }

    &.error {
      color: red;
    }
  }
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  ul > li {
    margin-bottom: 12px;
    display: flex;
    align-items: center;

    input[type="checkbox"] {
      margin-right: 8px;
      appearance: none;
      width: 18px;
      height: 18px;
      border: 2px solid #4caf50;
      border-radius: 3px;
      outline: none;
      cursor: pointer;

      &:checked {
        background-color: #4caf50;
        border: 2px solid #4caf50;
      }
    }

    label {
      font-size: 1rem;
      color: #333;
    }
  }
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

const DupliButton = styled.button`
  margin-left: 10px;
`;

const Ul = styled.ul`
  list-style-type: none;
`;

// 추가된 스타일
const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const Message = styled.span`
  &.success {
    color: green;
  }

  &.error {
    color: red;
  }
`;

const Li = styled.li`
  margin-bottom: 10px;
`;

export function Register() {
  //오류메시지 상태저장
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordCheckMessage, setPasswordCheckMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  //유효성 검사
  const [isPassword, setIsPassword] = useState("");
  const [isPasswordCheck, setIsPasswordCheck] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isLoginValid, setIsLoginValid] = useState(false);
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
  //체크박스맨~
  const [allAgreed, setAllAgreed] = useState(false);
  const [agreements, setAgreements] = useState({
    termsAgreed: false,
    personalInfoAgreed: false,
    provisionAgreed: false,
    locationAgreed: false,
    eventAlarmAgreed: false,
    serviceAlarmAgreed: false,
  });
  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery("register", () => {
    if (userRegister) {
      setRegistering(true);
      return signUp(userRegister);
    }
  });
  useEffect(() => {
    refetch();
  }, [userRegister]);
  //필수사항 및 선택사항 체크
  const handleAgreementChange = (e) => {
    const { name, checked } = e.target;
    setAgreements((prevAgreements) => ({ ...prevAgreements, [name]: checked }));
    const allChecked = Object.values({ ...agreements, [name]: checked }).every(
      (value) => value === true
    );
    setAllAgreed(allChecked);
  };

  const handleAllAgreementChange = (e) => {
    const { checked } = e.target;
    setAgreements((prevAgreements) =>
      Object.keys(prevAgreements).reduce(
        (newAgreements, agreementKey) => ({
          ...newAgreements,
          [agreementKey]: checked,
        }),
        {}
      )
    );
    setAllAgreed(checked);
  };
  //비밀번호 확인맨()
  useEffect(() => {
    if (password === passwordCheck) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");
      setIsPasswordCheck(false);
    } else {
      setPasswordCheckMessage("비밀번호가 일치하지않습니다");
      setIsPasswordCheck();
    }
  });
  // 비밀번호 형식 체크맨
  useEffect(() => {
    // 비밀번호 정규식 (영문, 숫자, 특수문자 포함하여 8~20자리)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    if (passwordRegex.test(password)) {
      setPasswordMessage("올바른 비밀번호 형식입니다.");
      setIsPassword(true);
    } else {
      setPasswordMessage(
        "비밀번호는 영문, 숫자, 특수문자를 포함하여 8~20자리여야 합니다."
      );
      setIsPassword(false);
    }
  }, [password]);

  // 이메일 형식 체크맨
  useEffect(() => {
    // 이메일 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(email)) {
      setEmailMessage("올바른 이메일 형식입니다.");
      setIsEmailValid(true);
    } else {
      setEmailMessage("올바른 이메일 형식이 아닙니다.");
      setIsEmailValid(false);
    }
  }, [email]);
  //아이디 형식 체크맨
  useEffect(() => {
    //아이디 정규식
    const loginRegex = /^[a-z0-9]{4,20}$/;
    if (loginRegex.test(loginId)) {
      setLoginMessage("올바른 아이디 형식입니다.");
      setIsLoginValid(true);
    } else {
      setLoginMessage("올바른 아이디 형식이 아닙니다.");
      setIsLoginValid(false);
    }
  });
  // 아이디 중복확인 버튼 클릭 시 실행될 함수
  const handleCheckDuplicateId = async () => {
    try {
      if (!/^[a-z0-9]{4,20}$/.test(loginId)) {
        // 아이디 정규화에 맞지 않는 경우
        window.alert(
          "아이디는 영어 소문자와 숫자만 사용하여 4~20자리여야 합니다."
        );
        return;
      }

      const isIdTaken = await checkDuplicateLogin(loginId);
      console.log(isIdTaken);

      if (isIdTaken) {
        window.alert(isIdTaken.message);
      } else {
        window.alert("Id is available!"); // 또는 다른 메시지 출력
      }
    } catch (error) {
      console.error("Error while checking for duplicate ID:", error);
      window.alert("아이디 입력란이 비었습니다.");
    }
  };

  // 이메일 중복확인 버튼 클릭 시 실행될 함수
  const handleCheckDuplicateEmail = async () => {
    try {
      // 이메일 정규식
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        window.alert("이메일을 올바른 형식으로 입력해주세요.");
        return; // 이메일 형식이 아니라면 중복 확인을 하지 않음
      }

      const isEmailTaken = await checkDuplicateEmail(email);
      console.log(isEmailTaken);

      if (isEmailTaken) {
        window.alert(isEmailTaken.message);
      } else {
        window.alert("Email is available!");
      }
    } catch (error) {
      console.error("Error while checking for duplicate ID:", error);
      window.alert("이메일입력란이 비었습니다.");
    }
  };
  function onSubmit(e) {
    e.preventDefault();
    if (
      !loginId ||
      !password ||
      !passwordCheck ||
      !username ||
      !birthDate ||
      !email
    ) {
      window.alert("죄송하지만, 가입란에 빈 공간을 발견했습니다.");
      return;
    }
    if (password === passwordCheck) {
      setPasswordCheckMessage("비밀번호가 일치합니다.");

      const user = {
        loginId: loginId,
        password: password,
        passwordCheck: passwordCheck,
        name: username,
        birthDate: birthDate,
        email: email,
      };

      //API 호출
      signUp(user)
        .then((response) => {
          console.log("응답 확인 :", response);
          if (response.resultCode === "SUCCESS") {
            alert("회원가입을 축하드립니다!");
            console.log(response);
            navigate("/login");
          } else if (response.resultCode === "ERROR") {
            const errorMessage =
              response.data.message || response.data["Duplicated member"];
            console.log(errorMessage);
            window.alert(errorMessage);
          }
        })
        .catch((error) => {
          console.error("호출 실패 : ", error);
          window.alert("에러가 발생했습니다.");
        });
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
                  placeholder="영문 및 숫자만 입력"
                  onChange={(e) => setLoginId(e.target.value)}
                />
                <DupliButton onClick={handleCheckDuplicateId}>
                  중복확인
                </DupliButton>
                {loginMessage && (
                  <span
                    className={`message${isLoginValid ? "succes" : "error"}`}
                  >
                    {loginMessage}
                  </span>
                )}
              </div>
              <div>
                <label>비밀번호</label>
                <br />
                <input
                  id="password"
                  value={password}
                  type="password"
                  placeholder="영문 숫자 특수문자를 포함한 8~20자리"
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
                  placeholder="영문 숫자 특수문자를 포함한 8~20자리"
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
                  placeholder="2글자 이상 기입하세요."
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label>생년월일</label>
                <br />
                <input
                  id="birthDate"
                  placeholder="날짜형식(YYYY-MM-DD)"
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
                  placeholder="이메일 형식에 맞게 기입"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <DupliButton type="button" onClick={handleCheckDuplicateEmail}>
                  중복확인
                </DupliButton>
                {emailMessage && (
                  <span
                    className={`message ${isEmailValid ? "success" : "error"}`}
                  >
                    {emailMessage}
                  </span>
                )}
              </div>
            </Righter>

            <Left>
              <Header>약관동의</Header>
              <Ul>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_all"
                    name="agree_check_all"
                    checked={allAgreed}
                    onChange={handleAllAgreementChange}
                  />
                  <label htmlFor="agree_check_all">전체 동의</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_used"
                    name="termsAgreed"
                    required
                    checked={agreements.termsAgreed}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agree_check_used">[필수] 이용약관 동의</label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_info"
                    name="personalInfoAgreed"
                    required
                    checked={agreements.personalInfoAgreed}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agree_check_info">
                    [필수]개인정보 이용 수집 방침
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_info_other"
                    name="provisionAgreed"
                    checked={agreements.provisionAgreed}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agree_check_info_other">
                    [필수]개인정보 제 3자 제공동의
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_pos"
                    name="locationAgreed"
                    required
                    checked={agreements.locationAgreed}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agree_check_pos">
                    [필수] 위치정보 동의 약관
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_event_receive"
                    name="eventAlarmAgreed"
                    checked={agreements.eventAlarmAgreed}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agree_check_event_receive">
                    [선택] 이벤트 및 혜택 알림 수신 동의
                  </label>
                </li>
                <li>
                  <input
                    type="checkbox"
                    id="agree_check_push"
                    name="serviceAlarmAgreed"
                    checked={agreements.serviceAlarmAgreed}
                    onChange={handleAgreementChange}
                  />
                  <label htmlFor="agree_check_push">
                    [선택] 서비스 알림 수신동의
                  </label>
                </li>
              </Ul>
            </Left>
            <Button
              disabled={
                !agreements.termsAgreed ||
                !agreements.personalInfoAgreed ||
                !agreements.locationAgreed
              }
            >
              회원가입
            </Button>
          </form>
        </Container>
      )}
    </>
  );
}
