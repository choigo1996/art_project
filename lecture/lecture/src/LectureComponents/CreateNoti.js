import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createNoti } from "./api";

export function CreateNoti() {
  //제목,내용
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  //작성글 저장
  const [adminNoti, setAdminNoti] = useState(null);
  const [noting, setNoting] = useState(false);
  const [notiComplete, stNotiComplete] = useState(false);

  const navigate = useNavigate();

  const { data, isLoading, refetch } = useQuery("question", () => {
    if (adminNoti) {
      setNoting(true);
      return createNoti(adminNoti);
    }
  });

  useEffect(() => {
    refetch();
  }, [adminNoti]);

  const handleBack = () => {
    navigate(`/notification`);
  };
  function onSubmit(e) {
    e.preventDefault();

    if (!title || !text) {
      window.alert("빈 공간이 존재");
    } else {
      const admin = {
        title: title,
        text: text,
      };

      console.log(admin);
      //API호출
      createNoti(admin).then((response) => {
        console.log("응답 확인 : ", response);
        if (response.resultCode === "SUCCESS") {
          alert("글 작성이 완료되었습니다.");
        } else if (response.resultCode === "ERROR") {
          const errorMassage =
            response.data.massage || response.data["Invalid writer"];
        }
      });
    }
  }
}
