import { useState } from "react";
import { addCategory } from "./api";

export function AddCategory() {
  const [categoryData, setCategoryData] = useState({
    lectureId: 0,
    categoryType: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddCategory = async () => {
    try {
      const response = await addCategory(categoryData);
      console.log("응답확인 :", response.data);
      window.alert("카테고리가 변경되었습니다.");
    } catch (error) {
      console.error("응답 실패!", error);
      window.alert("에러발생");
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
        <label>강의 ID:</label>
        <input
          type="text"
          id="lectureId"
          value={categoryData.lectureId}
          placeholder="강의의 아이디를 넣어주세요."
          onChange={(e) => {
            const inputValue = parseInt(e.target.value);
            //숫자인지 확인
            if (!isNaN(inputValue)) {
              setCategoryData((prevData) => ({
                ...prevData,
                lectureId: inputValue,
              }));
            }
          }}
        />
      </div>
    </>
  );
}
