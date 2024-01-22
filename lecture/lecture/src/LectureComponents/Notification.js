import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllNotifi } from "./api";
import { useNavigate } from "react-router-dom";

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  border-bottom: 1px solid #ccc;
  display: flex;
  display: grid-template-columns(4fr);
  align-items: center;
  span {
    flex: 1;
    font-weight: bold;
    padding: 8px;
  }

  p {
    flex: 3;
    margin: 0;
    padding: 8px;
  }
`;
const Li = styled.li`
  display: flex;
  display: grid-template-columns(4fr);
  align-items: center;
  padding: 8px;
  width: 100%;
`;
const Title = styled.p`
  margin: 0;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

const Container = styled.div`
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Text = styled.p`
  margin: 0;
  padding: 8px;
`;
export function Notification() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState([]);

  function onClick(id) {
    navigate(`${id}`);
  }
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await getAllNotifi();

        if (response.data.length > 0) {
          setNotices(response.data.reverse());
        } else {
          console.error(
            "API에서 반환된 데이터의 data 배열이 비어있습니다.",
            response.data
          );
        }
      } catch (error) {
        console.error("공지사항 목록 조회 중 오류 발생", error);
      }
    };

    fetchNotices();
  }, []);

  return (
    <>
      <Container>
        <h2>공지사항</h2>
        <Ul>
          <span>번호</span>
          <Text>제목</Text>
          <Text>작성자</Text>
          <Text>작성일</Text>
        </Ul>
        {notices.map((notice, i) => (
          <Ul key={i}>
            <Li>
              <span>{notices.length - i}</span>
              <Title onClick={() => onClick(notice.id)}>{notice.title}</Title>
              <Text>{notice.writer}</Text>
              <Text>{notice.createAt}</Text>
            </Li>
          </Ul>
        ))}
      </Container>
    </>
  );
}
