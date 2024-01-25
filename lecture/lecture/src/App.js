import { createGlobalStyle } from "styled-components";
import { QueryClient, QueryClientProvider } from "react-query";
import { Lecture } from "./LectureComponents/Lecture";
const GlobalStyle = createGlobalStyle`
@font-face{
  font-family:'bitbit';
  src:url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff'),url('//cdn.df.nexon.com/img/common/font/DNFBitBit-Regular.woff2') ;
}
  *{width: 95%; /* 전체 화면의 80%를 차지하도록 설정 */
  margin: 0 auto; /* 중앙 정렬을 위해 사용 */
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins','bitbit';
  
  }`;
const client = new QueryClient();

//component는 반드시 대문자로 시작
export function App() {
  return (
    <>
      <GlobalStyle />
      <QueryClientProvider client={client}>
        <Lecture />
      </QueryClientProvider>
    </>
  );
}
