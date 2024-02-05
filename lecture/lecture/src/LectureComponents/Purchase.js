import { useEffect } from "react";
import { useQuery } from "react-query";
import { purchaseAllLecture } from "./api";

export function Purchase({
  items,
  setPurchasing,
  setPurchaseComplete,
  setPurchaseFailed,
}) {
  const { data } = useQuery("purchase", () => purchaseAllLecture(items), {
    retry: 0,
    staleTime: 1000,
  });

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
