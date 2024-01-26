import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllLectuer } from "./api";
import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { ProductWrapper } from "./ProductWrapper";
import { Products } from "./Products";
import { LectureList } from "./LectureList";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { LogOut } from "./LogOut";
import { Register } from "./Register";
import { Error } from "./Error";
import { Dashboard } from "./Dashboard";
import { Notification } from "./Notification";
import { NotificationWrapper } from "./NotificationWrapper";
import { SingleNoti } from "./SingleNoti";
import { Question } from "./Question";
import { Intro } from "./Intro";
import { Review } from "./Review";
import { SingleProduct } from "./SingleProduct";
import { QuestionWrapper } from "./QuestionWrapper";
import { SingleQuest } from "./SingleQuest";
import { CreateQuest } from "./CreateQuest";

const client = new QueryClient();
export const LectureContext = createContext();

export function Lecture() {
  const { data, isLoading } = useQuery("lectures", getAllLectuer);
  return (
    <>
      <QueryClientProvider client={client}>
        {!isLoading && data && (
          <LectureLoader
            lectures={data.data}
            // lecturesCheckList={data.data.map((l) => ({
            //   id: l.id,
            //   checked: false,
            // }))}
          />
        )}
      </QueryClientProvider>
    </>
  );
}

function LectureLoader({ lectures, lecturescheckList }) {
  const [CheckList, setCheckList] = useState(lecturescheckList);
  const [loginState, setLoginState] = useState(null);
  const [passwordState, setPasswordState] = useState(null);
  useEffect(() => {
    const storedLoginState = setLoginState(
      JSON.parse(localStorage.getItem("loginState"))
    );
    setLoginState(storedLoginState);
    console.log("Login State", storedLoginState);
  }, []);

  return (
    <>
      <LectureContext.Provider
        value={{
          CheckList,
          setCheckList,
          loginState,
          setLoginState,
          lectures,
          passwordState,
          setPasswordState,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="products" element={<ProductWrapper />}>
                <Route index element={<Products />} />
                <Route path=":id" element={<SingleProduct />}>
                  <Route path="intro" element={<Intro />} />
                  <Route path="lecturelist" element={<LectureList />} />
                  <Route path="question" element={<QuestionWrapper />}>
                    <Route index element={<Question />} />
                    <Route path="create" element={<CreateQuest />} />
                    <Route path=":questionid" element={<SingleQuest />} />
                  </Route>
                  <Route path="review" element={<Review />} />
                </Route>
              </Route>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="notification" element={<NotificationWrapper />}>
                <Route index element={<Notification />} />
                <Route path=":id" element={<SingleNoti />} />
              </Route>
              <Route path="cart" element={<Cart />} />
              <Route path="login" element={<Login />} />
              <Route path="logOut" element={<LogOut />} />
              <Route path="register" element={<Register />} />
              <Route path="*" element={<Error />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LectureContext.Provider>
    </>
  );
}
