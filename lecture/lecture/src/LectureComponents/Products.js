import { useNavigate } from "react-router-dom";

export function Products() {
  const navigate = useNavigate();
  return (
    <>
      <Header>강의목록</Header>
      <Container></Container>
    </>
  );
}
