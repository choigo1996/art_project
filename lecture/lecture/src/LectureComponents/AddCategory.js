import { useEffect, useState } from "react";
import { addCategory, getAllCategory } from "./api";

export function AddCategory() {
  const [categoryData, setCategoryData] = useState({
    lectureId: 0,
    categoryType: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  //카테고리 목록 불러오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response);
      } catch (error) {
        console.error("카테고리 목록 조회 중 오류발생", error);
        window.alert("카테고리 목록을 불러오는 중 오류가 발생했습니다.");
      }
    };
    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      //강의 ID가 0인 경우 에러처리
      if (categoryData.lectureId === 0) {
        setError("강의 ID를 입력하세요.");
        return;
      }

      const response = await addCategory(categoryData);
      console.log("응답 확인:", response.data);
      window.alert("카테고리가 변경되었습니다.");
      setError(""); //에러 메시지 초기화
    } catch (error) {
      console.error("응답 실패 :", error);
      setError("에러 발생");
    }
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleCategorySelection = (selectedCategory) => {
    setCategoryData((prevData) => ({
      ...prevData,
      categoryType: selectedCategory,
    }));
    setIsDropdownOpen(false);
  };

  return (
    <>
      <div>
        <label>강의 ID :</label>
        <input
          type="text"
          id="lectureId"
          value={categoryData.lectureId}
          placeholder="강의의 아이디를 넣어주세요."
          onChange={(e) => {
            const inputValue = parseInt(e.target.value);
            setCategoryData((prevData) => ({
              ...prevData,
              lectureId: inputValue,
            }));
          }}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
      </div>
      <div>
        <label>카테고리 :</label>
        <select
          value={categoryData.categoryType}
          onChange={(e) =>
            setCategoryData((prevData) => ({
              ...prevData,
              categoryType: e.target.value,
            }))
          }
        >
          <option value="" disabled>
            카테고리를 선택하세요.
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.categoryType}>
              {category.categoryType}
            </option>
          ))}
        </select>
      </div>
      <buton onClick={handleAddCategory}>카테고리 변경</buton>
    </>
  );
}
