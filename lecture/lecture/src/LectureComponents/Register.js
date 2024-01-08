import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { signUp } from "./api";
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
          if (response.resultCode === "SUCCESS") {
            alert("회원가입을 축하드립니다!");
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
              </div>
            </Righter>

            <Left>
              <Header>약관동의</Header>
              <ul>
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
              </ul>
            </Left>
            <Button>회원가입</Button>
          </form>
        </Container>
      )}
    </>
  );
}
