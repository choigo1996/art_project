import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const client = new QueryClient();
export const LectureContext = createContext(LectureContext);

export function Lecture() {
  const { data, isLoading } = useQuery("lectures", getAllLectuer);
  return (
    <>
      <QueryClientProvider client={client}>
        {!isLoading && data && <LectureLoader />}
      </QueryClientProvider>
    </>
  );
}

function LectureLoader({ lelists, lectures, lecturesCheckList }) {
  const [checkList, setCheckList] = useState(lecturesCheckList);
  const [loginState, setLoginState] = useState(null);
  const [passwordState, setPasswordState] = useState(null);
  useEffect(() => {
    const storedLoginState = setLoginState(
      JSON.parse(localStorage.getItem("loginState"))
    );
    console.log("Login State", storedLoginState);
    setLoginState(storedLoginState);
  }, []);

  return (
    <>
      <LectureContext.Provider
        value={{
          checkList,
          setCheckList,
          loginState,
          setLoginState,
          lectures,
          passwordState,
          setPasswordState,
          lelists,
        }}
      >
        <BrowserRouter>
          <Routes></Routes>
        </BrowserRouter>
      </LectureContext.Provider>
    </>
  );
}
