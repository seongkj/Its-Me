# ✍[It's me]()
### 포트폴리오 생성 웹빌더 서비스

<br>

## :white_check_mark: 서비스 소개


#### 기획 의도, 목적

- 기존의 구인구직 플랫폼보다 쉽고 빠르게 포트폴리오를 만드는 솔루션에 대한 니즈가 존재
- 개발자, 디자이너 등의 다양한 직무의 취준생이 간편하게 포트폴리오를 제작할 수 있는 웹사이트를 만드는 플랫폼 개발을 진행
- 유저들은 포트폴리오의 내용에만 집중하여 완성도 높은 포트폴리오를 만들 수 있을 것으로 기대됨

## 🚗 [기능](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project_2/team10/portfolio-manager/-/wikis/feature)
- 주제: 포트폴리오 생성 웹빌더 서비스 <br>
- 메인 기능
  1. 포트폴리오를 `pdf` 파일 형태로 출력
  2. 유저별로 개인 정보를 저장 및 수정 가능
  3. 원하는 테마를 포트폴리오에 적용
- 서브 기능
  1. 프로젝트 관련 이미지 저장
  2. 계정 비밀번호 분실시 임시 비밀번호 발급

|메인페이지|
|--|
|![main](/uploads/fc807939cb2b01601c4e4ea806a89dcb/main.png)|

|회원가입|
|--|
|![signup](/uploads/6efb297550ad42d6c9230d974696ae1a/signup.png)|


|로그인|
|--|
|![login](/uploads/8c59940333f64186867f4fe41f96979f/login.png)|



|마이페이지|
|--|
|![mypage](/uploads/a32ad9af84c832595053fe665f4219ee/mypage.png)|


|포트폴리오 편집 페이지|
|--|
|![edit](/uploads/21ad7696ea93a2589cd8106035edcf50/edit.png)|

|포트폴리오 조회 페이지|
|--|
|![portfolio](/uploads/1c002e8aaed0a73c1ebdaafc05c1b043/portfolio.png)|
<br>

## 🚗  프로젝트만의 차별점, 기대 효과
- 클릭 몇번으로 원하는 테마의 포트폴리오를 작성할 수 있다.
- 타 플랫폼에 비해 용이한 사용법을 가지고 있어 유저들이 포트폴리오 본연의 내용에 집중할 수 있다.
<br>

## 🛠️ 기술 스택

<p>
    <img src="https://img.shields.io/badge/React-v18.0.0-blue?logo=Reac"/>
    <img src="https://img.shields.io/badge/node.js-v16.13.0-green?logo=Node.js"/>
    <img src="https://img.shields.io/badge/eslint-%5E8.14.0-yellow?logo=eslint"/>
    <img src="https://img.shields.io/badge/mysql-v2.18.1-%234479A1?logo=Mysql">
  <img src="https://img.shields.io/badge/Nodemon-v2.0.15-76D04B?logo=Nodemon"/>
  <img src="https://img.shields.io/badge/Express-v2.0.15-000000?logo=Express"/>
</p>

`+ AWS S3`

<br>


## [와이어프레임](https://www.figma.com/file/eAAo0mHJzeVxdQinTSGbHJ/2차프로젝트-10팀?node-id=0%3A1)
  
## 스토리보드 및 유저 시나리오
  - 홈 화면에서 만들기 버튼을 클릭하여 마이페이지로 이동할 수 있다.
  - 로그인이 되어있지 않다면 로그인 페이지로 이동하거나 필요시 회원가입을 한다.
  - 마이페이지에서 프로필 정보를 수정하거나 포트폴리오를 생성/삭제할 수 있다.
  - 마이페이지에서 포트폴리오 수정 버튼을 누르면 해당 포트폴리오 수정 페이지로 이동한다.
  - 수정 페이지에서 수정 후 완료 버튼을 누르면 마이페이지로 자동 이동하고, 완성된 포트폴리오 사이트가 새 창으로 열린다.
  

## 👨‍👩‍👧‍ 구성원 역할

| 이름   | 역할       | 구현 기능                                                               |
| ------ | ---------- | ----------------------------------------------------------------------- |
| [김다윤](https://github.com/many-yun) | `FE` | 마이페이지, edit페이지 프로젝트 섹션 구현, edit페이지/포트폴리오 페이지 css 적용, 이미지 업로드 구현 |
| [김종한](https://github.com/longlive-jonghan) | `FE` | 로그인/회원가입/비밀번호 재설정 페이지 구현, 경력 및 교육이력 섹션 구현 |
| [박세령](https://github.com/ssryoung) | `FE` | Main페이지 구현 / 포트폴리오를 `pdf` 파일 형태로 출력 /수상, 시험 및 자격증, 외국어 섹션 구현 |
| [성경주](https://github.com/seongkj) | `FE` | edit페이지 포트폴리오 내용 생성, 수정, 삭제 구현 / 한 줄 소개, 기술 스택, 학력 섹션 구현  |
| [오승준](https://github.com/tmdwns1521) | `BE` | section DB api, aws-s3 middleware, DB 설계 및 생성 |
| [황시원](https://github.com/cone26) | `BE` | 유저 관리 api, 로그인/회원가입/비밀번호 재설정 api, DB 설계 및 생성 |






## 📌 [기술 및 스크럼 - WIKI](https://kdt-gitlab.elice.io/sw_track/class_02_seoul/web_project_2/team10/portfolio-manager/-/wikis/home)

<br>


