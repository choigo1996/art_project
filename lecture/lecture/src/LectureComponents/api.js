//강의의 모든 정보를 가져온다.
export function getAllLectuer() {
  return fetch(`http://localhost:8080/api/lecture/list`, {
    method: "GET",
  }).then((response) => response.json());
}
//강의 하나의 정보를 가져온다.
export function getLectureById(id) {
  return fetch(`http://localhost:8080/api/lecture/list/${id}`, {
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
//구매한 상품이 대시보드에 표시
export function purchaseAllLecture(lectures, loginId) {
  const purchases = lectures.map((lecture) => ({
    lecture: lecture,
    loginId: loginId,
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
//공지사항 생성(ADMIN)
export function createNoti(admin) {
  return fetch(`http://localhost:8080/api/board`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  }).then((response) => response.json());
}
//공지사항 목록
export function getAllNotifi() {
  return fetch(`http://localhost:8080/api/board/list`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const notiWithAuthor = response.data.map((notification) => ({
        ...notification,
        author: notification.user.loginId,
      }));
      return {
        ...response,
        data: notiWithAuthor,
      };
    });
}
//공지사항 하나의 정보를 가져온다.
export function getNotiById(id) {
  return fetch(`http://localhost:8080/api/board/list/${id}`, {
    method: "GET",
  }).then((response) => response.json());
}
//공지사항 삭제
export function deleteNotifi(id) {
  return fetch(`http://localhost:8080/api/board/delete/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}
// 중복체크 API - loginId
export function checkDuplicateLogin(loginId) {
  return fetch(`http://localhost:8080/api/checkDuplicate/loginId/${loginId}`, {
    method: "GET",
  }).then((response) => response.json());
}
// 중복체크 API - email
export function checkDuplicateEmail(email) {
  return fetch(`http://localhost:8080/api/checkDuplicate/email/${email}`, {
    method: "GET",
  }).then((response) => response.json());
}
//QnA게시글 작성
export function createQuest(user) {
  return fetch(`http://localhost:8080/api/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
}
//QnA게시글 목록
export function getAllQuest(lectureId) {
  return fetch(
    `http://localhost:8080/api/question/list?lectureId=${lectureId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      const questionsWithAuthor = response.data.map((question) => ({
        ...question,
        author: question.user.loginId,
      }));
      return {
        ...response,
        data: questionsWithAuthor,
      };
    });
}
//QnA게시글 하나만 가져옴
export function getQuestById(id) {
  return fetch(`http://localhost:8080/api/question/list/${id}`, {
    method: "GET",
  }).then((response) => response.json());
}
//강의목록 불러오기
export function getAllLeList(lectureId) {
  return fetch(
    `http://localhost:8080/api/lelist/lecturelist?lectureId=${lectureId}`,
    {
      method: "GET",
    }
  ).then((response) => response.json());
}
//후기 작성
export function createReview(user) {
  fetch(`http://localhost:8080/api/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).then((response) => response.json());
}
//후기 목록
export function getAllReview() {
  return fetch(`http://localhost:8080/api/review/list`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      const reviewWithAuthor = response.data.map((review) => ({
        ...review,
        author: review.loginId,
      }));
      return {
        ...response,
        data: reviewWithAuthor,
      };
    });
}
//후기 삭제
export function deleteReview(id) {
  return fetch(`http://localhost:8080/api/review/delete/${id}`, {
    method: "DELETE",
  }).then((response) => response.json);
}
//소개글 작성(ADMIN만 사용가능)
export function createIntro(admin) {
  return fetch(`http://localhost:8080/api/intro`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(admin),
  }).then((response) => response.json());
}
//소개글 가져와
export function getIntro(id) {
  return fetch(`http://localhost:8080/api/intro/${id}`, {
    method: "GET",
  }).then((response) => response.json());
}
//카테고리 목록 불러오기
export function getAllCategory() {
  return fetch(`http://localhost:8080/api/lecture/category`, {
    method: "GET",
  }).then((response) => response.json());
}
