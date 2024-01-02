import { useContext, useEffect } from "react";
import { LectureContext } from "./Lecture";
import { useQuery } from "react-query";

export function Purchase({
  items,
  setPurchasing,
  setPurchaseComplete,
  setPurchaseFailed,
}) {
  const { loginState } = useContext(LectureContext);
  const { data } = useQuery(
    "purchase",
    () => purchaseLectures(items, loginState.id),
    {
      retry: 0,
      staleTime: 1000,
    }
  );

  useEffect(() => {
    if (data && data !== "ERROR") {
      console.log("구매완료", data);
      setTimeout(() => {
        setPurchaseComplete(true);
        setPurchasing(false);
      }, 1000);
    } else if (data === "ERROR") {
      console.log("구매실패");
      setTimeout(() => {
        setPurchaseFailed(true);
        setPurchasing(false);
      }, 1000);
    }
  }, [data]);
  return <h1>구매중입니다. 잠시만 기다려 주세요....</h1>;
}
