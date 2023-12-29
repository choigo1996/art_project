export function Register() {
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
            <Headers>약관동의</Headers>
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
