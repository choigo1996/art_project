//강의의 모든 정보를 가져온다.
export function getAllLectuer() {
  return fetch(`http://localhost:8080/api/products`, {
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
//중복확인
export function checkDuplicate(loginId) {
  return fetch(`http://localhost:8080:api/cheackDuplicate/${loginId}`, {
    method: "GET",
  }).then((response) => response.json());
}
