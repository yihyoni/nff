## nff
React 기반 쇼핑몰 프로젝트입니다.
상품 탐색부터 장바구니까지의 흐름을 직접 설계하며,
상태 관리 구조와 확장성을 중심으로 구현했습니다.

🚀 Live Demo
👉 [https://yihyoni.github.io/nff_product/](https://nff.netlify.app/)

📌 주요 기능
- 카테고리 기반 동적 상세페이지
- Redux 기반 전역 상태 관리
- 사이즈 선택 조건 분기 (fingers 카테고리 전용)
- 검색 및 정렬 기능
- 장바구니 수량 및 옵션 변경 기능

📌 구조 설계 포인트
1. Redux slice 단위 상태 관리
cart / wishlist / sidebar / search 상태를 모듈화하여 관리
props drilling 제거 및 유지보수성 개선

2. category 기반 동적 라우팅
useParams를 활용해 ${category}/${id} 구조 구현
이미지 경로와 JSON 데이터 구조 통일

3. originalData / visibleData 패턴 적용
원본 데이터 유지 후 필터링 및 정렬 적용
데이터 흐름 명확화

📂 프로젝트 구조
```
src
 ┣ components
 ┣ pages
 ┣ store
 ┃ ┣ cartSlice
 ┃ ┣ wishlistSlice
 ┃ ┣ sidebarSlice
 ┃ ┗ searchSlice
 ┗ data (category JSON)
```
📷 Screenshots
![main](./screenshots/main.png)
![detail](./screenshots/detail.png)
![cart](./screenshots/cart.png)

📌 개선 및 확장 계획
- 결제 흐름 구현
- 로그인 기능 연동
- API 서버 연결
- 마이페이지 기능?



🛠 Tech Stack
<p> <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Redux_Toolkit-593D88?style=flat-square&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white"/> <img src="https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> </p>
