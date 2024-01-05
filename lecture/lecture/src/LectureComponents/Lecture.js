import { createContext, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getAllLectuer } from "./api";
import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Cart } from "./Cart";
import { ProductWrapper } from "./ProductWrapper";
import { Products } from "./Products";
import { SingleProduct } from "./SingleProduct";
import { ProtectedRoute } from "./ProtectedRoute";
import { Login } from "./Login";
import { LogOut } from "./LogOut";
import { Register } from "./Register";
import { Error } from "./Error";
import { Dashboard } from "./Dashboard";
import { Notification } from "./Notification";

const client = new QueryClient();
export const LectureContext = createContext();

export function Lecture() {
  const { data, isLoading } = useQuery("lectures", getAllLectuer);
  return (
    <>
      <QueryClientProvider client={client}>
        {!isLoading && data && (
          <LectureLoader
            lectures={data}
            lecturesCheckList={data.map((l) => {
              return { id: l.id, checked: false };
            })}
          />
        )}
      </QueryClientProvider>
    </>
  );
}

function LectureLoader({ lelists, lectures, lecturescheckList }) {
  const [CheckList, setCheckList] = useState(lecturescheckList);
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
          CheckList,
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
          <Routes>
            <Route path="/" element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="products" element={<ProductWrapper />}>
                <Route index element={<Products />} />
                <Route path=":id" element={<SingleProduct />} />
              </Route>
              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              ></Route>
              <Route path="notification" element={<Notification />} />
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
