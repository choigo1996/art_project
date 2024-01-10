import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotiById } from "./api";
import styled from "styled-components";

const Container = styled.div``;
const Text = styled.p``;
export function SingleNoti() {
  const { id } = useParams();

  const [noti, setNoti] = useState(null);

  useEffect(() => {
    getNotiById(id)
      .then((response) => setNoti(response))
      .catch((error) => console.error("없어!", error));
  }, [id]);

  if (!noti) {
    return <div>로딩중....</div>;
  }

  return (
    <Container>
      <h1>{noti.title}</h1>
      <Text>{noti.writer}</Text>
      <Text>{noti.text}</Text>
      <Text>{noti.createAt}</Text>
    </Container>
  );
}
