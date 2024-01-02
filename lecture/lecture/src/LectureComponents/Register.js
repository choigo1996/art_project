import styled from "styled-components";

const Container = styled.div``;
const Header = styled.div``;
const Righter = styled.div``;
const Left = styled.div``;
const Box = styled.div``;
const CheckBox = styled.div``;
const Text = styled.div``;
const Button = styled.button``;

export function Register() {
  function onSubmit(e) {
    e.preventDefault();
  }
  return (
    <>
      <Container>
        <form onSubmit={onSubmit}>
          <Header>회원가입</Header>
          <Righter>
            <Header>필수입력정보</Header>
            <div>
              <label>아이디</label>
              <br />
            </div>
            <div>
              <label>비밀번호</label>
            </div>
            <div>
              <label>비밀번호 확인</label>
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
    </>
  );
}
