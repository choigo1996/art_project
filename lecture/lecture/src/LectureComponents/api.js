//강의의 모든 정보를 가져온다.
export function getAllLectuer() {
  return fetch(`http://localhost:8080/api/products`, {
    method: "GET",
  }).then((response) => response.json());
}
//강의 하나의 정보를 가져온다.
export function getLectureById(id) {
  return fetch(`http://localhost:8080/api/products/${id}`, {
    method: "GET",
  }).then((response) => response.json());
}
//회원가입
export function signUp(user) {
  return fetch(`http://localhost:8080/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
}
//로그인
export function login(user) {
  return fetch(`http://localhost:8080/api/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
}
//중복확인
export function checkDuplicate(loginId) {
  return fetch(`http://localhost:8080/api/CheckDuplicate/${loginId}`, {
    method: "GET",
  }).then((response) => response.json());
}
//구매한 상품이 대시보드에 표시
export function purchaseAllLecture(lectures, loginId) {
  const purchases = lectures.map((lecture) => ({
    lecture: lecture,
    loginId: loginId,
    quantity: 1, // 원하는 구매 수량을 여기에 설정
  }));
  return fetch(`http://localhost:8080/api/products/purchase/list`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(purchases),
  })
    .then((response) => response.json())
    .catch(() => "ERROR");
}
//각 회원마다 구매한 강의 목록 관리
export function getPurchaseById(loginId) {
  return fetch(`http://localhost:8080/api/products/purchase/${loginId}`, {
    method: "GET",
  }).then((response) => response.json());
}
//공지사항 생성
export function getAllNotifi() {
  return fetch(`http://localhost:8080/api/board`, {
    method: "GET",
  }).then((response) => response.json());
}
