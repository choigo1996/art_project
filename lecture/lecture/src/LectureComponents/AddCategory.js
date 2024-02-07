import { useContext, useEffect, useState } from "react";
import { addCategory, getAllCategory } from "./api";
import { LectureContext } from "./Lecture";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";

export function AddCategory() {
  //카테고리,강의ID
  const [categoryType, setCategoryType] = useState("");
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [lectureId, setLectureId] = useState(0);
  //강의 카테고리 변경
  const [categoryChange, setCategoryChange] = useState(null);
  const [categoring, setCategoring] = useState(false);
  const [categoryComplete, setCategoryComplete] = useState(false);
  //admin으로 로그인 되어있는지 확인용
  const { loginState } = useContext(LectureContext);
  //lecture목록으로 이동
  const navigate = useNavigate();

  const admin =
    loginState?.authorityDtoSet &&
    loginState.authorityDtoSet.length > 0 &&
    loginState.authorityDtoSet[0].authorityName === "ROLE_ADMIN";

  const { data, isLoading, refetch } = useQuery("addCategory", () => {
    if (categoryChange) {
      setCategoring(true);
      return addCategory(categoryChange);
    }
  });

  //관리자만 접근가능
  useEffect(() => {
    if (!admin) {
      alert("관리자만 접근가능");
      navigate("/home");
    }
  }, [admin, navigate]);
  //취소시,admin대시보드로
  const handleBack = () => {
    navigate("/admin");
  };
  useEffect(() => {
    refetch();
  }, [categoryChange]);

  //카테고리 가져오기 함수
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setSelectedCategory(response);
        if (response.length > 0) {
          setCategoryType("");
        }
      } catch (error) {
        console.error("카테고리 목록 조회 중 오류 발생", error);
      }
    };
    fetchCategories();
  }, []);

  function onSubmit(e) {
    e.preventDefault();

    const addCate = {
      lectureId: lectureId,
      categoryType: categoryType,
    };

    if (!addCate) {
      window.alert("빈공간이 존재합니다!");
    }

    console.log(addCate);
    //API호출
    addCategory(addCate)
      .then((response) => {
        console.log("응답확인 :", response);
        if (response.resultCode === "SUCCESS") {
          alert("글 작성이 완료되었습니다.");
          setCategoryComplete(true);
        } else if (response.resultCode === "ERROR") {
          const errorMassage =
            response.data.massage || response.data["Invalid writer"];
          console.log(response);
          console.log(errorMassage);
          window.alert(errorMassage);
        }
      })
      .catch((error) => {
        console.error("호출 실패 :", error);
        window.alert("에러발생");
      });
  }
}
