//강의의 모든 정보를 가져온다.
export function getAllLectuer() {
  return fetch(`http://localhost:8080/api/products`, {
    method: "GET",
  }).then((response) => response.json());
}
