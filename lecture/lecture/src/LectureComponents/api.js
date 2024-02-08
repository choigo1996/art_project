import axios from "axios";

//강의를 만듬
export function createLecture(lecture) {
  const token = sessionStorage.getItem("accessToken");
  console.log("Bearer Token :", token);
  return axios.post(`http://localhost:8080/api/lecture`, lecture, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
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
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("로그인 데이터들:", data);
      if (data.data.token) {
        sessionStorage.setItem("accessToken", data.data.token);
        console.log("bearerToken :", data.data.token);
      }
      return data;
    });
}
//바로구매
export function buyPurchase(lecture) {
  const token = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("loginState");
  const lectureId = {
    lectureId: lecture.id,
    userId: userId.id,
  };
  console.log("purchase :", lectureId);
  return axios.post(`http://localhost:8080/api/purchase`, lectureId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
//카트에 있는 상품 구매
export function purchaseAllLecture(lectures) {
  const token = sessionStorage.getItem("accessToken");
  const userId = sessionStorage.getItem("loginState");
  const lectureId = lectures.map((lecture) => ({
    lectureId: lecture.id,
    userId: userId.id,
  }));
  console.log("lectureID :", lectureId);
  return axios.post(`http://localhost:8080/api/purchase/list`, lectureId, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
//각 회원마다 구매한 강의 목록 관리
export function getPurchaseById(userId) {
  const token = sessionStorage.getItem("accessToken");
  return axios.get(`http://localhost:8080/api/purchase/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
//강의 하나에 해당하는 모든 사용자
export function getPurchaseByLectureId(lectureId) {
  return fetch(`http://localhost:8080/api/purchase/lecture/${lectureId}`, {
    method: "GET",
  }).then((response) => response.json());
}

//모든 회원이 구매한 강의 목록을 불러온다
export function getAllPurchase() {
  const token = sessionStorage.getItem("accessToken");
  console.log("bearer Token :", token);
  return axios.get(`http://localhost:8080/api/purchase/list/user`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

//공지사항 생성(ADMIN)
export function createNoti(admin) {
  const token = sessionStorage.getItem("accessToken");
  console.log("bearer Token:", token);
  return axios.post(`http://localhost:8080/api/board`, admin, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
  })
    .then((response) => response.json())
    .then((notificaion) => {
      notificaion.author = notificaion.user.loginId;
      return notificaion;
    });
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
export function createQuest(questData) {
  const token = sessionStorage.getItem("accessToken");
  console.log("bearer Token :", token);
  return axios.post(`http://localhost:8080/api/question`, questData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 토큰을 추가합니다.
    },
  });
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
  })
    .then((response) => response.json())
    .then((question) => {
      //작성자 정보 추가
      question.author = question.user.loginId;
      return question;
    });
}
//QnA게시글 삭제
export function deleteQuest(id) {
  return fetch(`http://localhost:8080/api/question/delete/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}

//강의목록 만들기
export function createLelist(lelistData) {
  const token = sessionStorage.getItem("accessToken");
  console.log("Bearer :", token);
  return axios.post(`http://localhost:8080/api/lelist`, lelistData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
export function createReview(reviewData) {
  const token = sessionStorage.getItem("accessToken");
  console.log("bearer Token :", token);
  return axios.post(`http://localhost:8080/api/review`, reviewData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
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
        author: review.user.loginId,
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
  }).then((response) => response.json());
}
//소개글 작성(ADMIN만 사용가능)
export function createIntro(admin) {
  const token = sessionStorage.getItem("accessToken");
  console.log("BeareToken:", token);
  return axios.post(`http://localhost:8080/api/intro`, admin, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
//소개글 가져와
export function getIntroByLectureId(lectureId) {
  return fetch(`http://localhost:8080/api/intro/${lectureId}`, {
    method: "GET",
  }).then((response) => response.json());
}
//카테고리 목록 불러오기
export function getAllCategory() {
  return fetch(`http://localhost:8080/api/lecture/category`, {
    method: "GET",
  }).then((response) => response.json());
}

//댓글 작성
export function createComment(commentData) {
  const token = sessionStorage.getItem("accessToken");
  console.log("Bearer Token :", token);
  return axios.post(`http://localhost:8080/api/comment`, commentData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
//댓글 목록
export function getAllComment(questionId) {
  return fetch(
    `http://localhost:8080/api/comment/list?questionId=${questionId}`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((response) => {
      const commentWithAuthor = response.data.map((comment) => ({
        ...comment,
        author: comment.user.loginId,
      }));
      return {
        ...response,
        data: commentWithAuthor,
      };
    });
}
//댓글 삭제
export function deleteComment(id) {
  return fetch(`http://localhost:8080/api/comment/delete/${id}`, {
    method: "DELETE",
  }).then((response) => response.json());
}
//사용자 정보
export function getMyInfo() {
  const token = sessionStorage.getItem("accessToken");
  return axios
    .get(`http://localhost:8080/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      const userInfo = response.data;
      userInfo.authorityDtoSet = userInfo.authorityDtoSet || [];
      return userInfo;
    });
}
//카테고리 변경
export function addCategory(category) {
  const token = sessionStorage.getItem("accessToken");
  return axios.post(
    `http://localhost:8080/api/lecture/category/add`,
    category,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
}
//권한 부여
export function updateAutority(authority) {
  const token = sessionStorage.getItem("accessToken");
  return axios.post(`http://localhost:8080/api/update/authority`, authority, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
//권한 목록 불러오기
export function getAllAuthority() {
  return fetch(`http://localhost:8080/api/authority`, {
    method: "GET",
  }).then((response) => response.json());
}
//선생님별로 강의를 가져옴
export function getLectureByTeacher(teacherId) {
  const token = sessionStorage.getItem("accessToken");
  return axios.get(`http://localhost:8080/api/lecture/teacher/${teacherId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
