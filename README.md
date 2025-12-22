# MJC 챗봇 UI

명지전문대학(MJC) 학사 정보 챗봇의 프론트엔드 애플리케이션입니다. React 기반으로 구축되었으며, 사용자 친화적인 인터페이스를 제공합니다.

## 프로젝트 개요

이 프로젝트는 React 기반의 챗봇 프론트엔드 애플리케이션으로, 다음과 같은 기능을 제공합니다:

### 주요 기능
- **챗봇 대화**: RAG 기반 챗봇과 실시간 대화
- **대화 기록 관리**: 로컬스토리지를 활용한 대화 세션 관리 (최대 10개)
- **대시보드**: 최근 대화 목록 및 새 대화 시작
- **관리자 페이지**: 토큰 사용량 통계 및 모니터링
- **공지사항 표시**: 최신 공지사항 자동 표시
- **반응형 디자인**: 다양한 화면 크기에 최적화

## 실행 방법

### 로컬 개발 환경 실행

1. **의존성 설치**
```bash
npm install
```

2. **환경변수 설정**
프로젝트 루트에 `.env` 파일을 생성하고 필요한 환경변수를 설정합니다:

```bash
# .env 파일 예시
REACT_APP_API_BASE_URL=http://localhost:8000
REACT_APP_NOTICE_API_URL=http://localhost:8010
```

3. **개발 서버 실행**
```bash
npm start
```

개발 서버는 `http://localhost:3000`에서 실행됩니다.

### 프로덕션 빌드

1. **빌드 생성**
```bash
npm run build
```

빌드된 파일은 `build` 디렉토리에 생성됩니다.

2. **빌드 파일 서빙**
빌드된 파일을 정적 파일 서버로 서빙할 수 있습니다:

```bash
# serve 패키지 사용 예시
npx serve -s build -l 3000
```

### Docker를 사용한 빌드 및 실행

프로젝트에 Dockerfile이 없는 경우, 다음 예시를 참고하여 생성할 수 있습니다:

**Dockerfile 예시:**
```dockerfile
# 빌드 단계
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 서빙 단계
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**docker-compose.yml 예시:**
```yaml
version: "3.9"

services:
  ui:
    build: .
    container_name: mjc_chatbot_ui
    ports:
      - "3000:80"
    environment:
      - REACT_APP_API_BASE_URL=http://localhost:8000
      - REACT_APP_NOTICE_API_URL=http://localhost:8010
    restart: unless-stopped
```

## 환경변수

프로젝트 루트에 `.env` 파일을 생성하고 다음 환경변수를 설정해야 합니다:

### 필수 환경변수

| 변수명 | 설명 | 기본값 | 예시 |
|--------|------|--------|------|
| `REACT_APP_API_BASE_URL` | 챗봇 API 서버 URL | `http://10.51.61.37:8000` | `http://localhost:8000` |
| `REACT_APP_NOTICE_API_URL` | 공지사항 API 서버 URL | - | `http://localhost:8010` |

### 환경변수 파일 예시 (.env)

```bash
# 챗봇 API 서버 URL
REACT_APP_API_BASE_URL=http://localhost:8000

# 공지사항 API 서버 URL
REACT_APP_NOTICE_API_URL=http://localhost:8010
```

**주의사항:**
- React에서 환경변수를 사용하려면 `REACT_APP_` 접두사가 필요합니다
- 환경변수 변경 후 서버를 재시작해야 합니다
- 빌드 시점에 환경변수가 번들에 포함되므로, 프로덕션 빌드 전에 올바른 값으로 설정해야 합니다

## 주요 페이지 및 라우트

### 1. 대시보드 (`/`)
- 최근 대화 목록 표시
- 새 대화 시작
- 대화 세션 삭제
- 관리자 페이지 이동

### 2. 챗봇 페이지 (`/chat`)
- 챗봇과의 실시간 대화
- 마크다운 형식 응답 지원
- 대화 기록 자동 저장

### 3. 특정 대화 세션 (`/chat/:chatId`)
- 저장된 대화 세션 불러오기
- 대화 기록 표시 및 계속하기

### 4. 관리자 페이지 (`/admin`)
- 토큰 사용량 통계
- 일별/주별/월별/연별 조회
- 차트 및 그래프 시각화

## API 연동

### 챗봇 API
- **엔드포인트**: `POST {REACT_APP_API_BASE_URL}/api/chat_v`
- **기능**: 사용자 메시지를 전송하고 챗봇 응답을 받습니다

### 공지사항 API
- **엔드포인트**: `GET {REACT_APP_NOTICE_API_URL}/api/notice/latest`
- **기능**: 최신 공지사항을 조회합니다

### 관리자 API
- **엔드포인트**: `GET {REACT_APP_API_BASE_URL}/api/admin/token-usage?period={period}`
- **기능**: 토큰 사용량 통계를 조회합니다

## 로컬스토리지 관리

애플리케이션은 브라우저의 로컬스토리지를 사용하여 대화 세션을 관리합니다:

- **최대 세션 수**: 10개
- **저장 키**: `mjc_chat_sessions`
- **현재 세션 키**: `mjc_current_session`

각 세션은 다음 정보를 포함합니다:
- 세션 ID
- 제목
- 메시지 목록
- 생성 시간
- 수정 시간

## 기술 스택

- **React 18.2.0**: UI 라이브러리
- **React Router 7.9.4**: 라우팅
- **React Markdown 10.1.0**: 마크다운 렌더링
- **Tailwind CSS 3.1.6**: 스타일링
- **React Scripts 5.0.1**: 빌드 도구

## 개발 스크립트

```bash
# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# 테스트 실행
npm test

# Eject (Create React App 설정 노출)
npm run eject
```

## 빌드 및 배포

### 빌드 최적화

프로덕션 빌드는 자동으로 최적화됩니다:
- 코드 압축 및 최소화
- 불필요한 코드 제거
- 정적 자산 최적화

### 배포 전 확인사항

1. 환경변수 설정 확인
2. API 서버 연결 확인
3. 빌드 파일 테스트
4. 브라우저 호환성 확인

## 문제 해결

### 환경변수가 적용되지 않는 경우
- `.env` 파일이 프로젝트 루트에 있는지 확인
- `REACT_APP_` 접두사가 있는지 확인
- 개발 서버를 재시작

### API 연결 오류
- `REACT_APP_API_BASE_URL` 값 확인
- CORS 설정 확인
- 네트워크 연결 확인

### 빌드 오류
- Node.js 버전 확인 (권장: 18.x 이상)
- `node_modules` 삭제 후 `npm install` 재실행
- 캐시 삭제: `npm cache clean --force`

## 참고 자료

- [React 공식 문서](https://react.dev/)
- [React Router 문서](https://reactrouter.com/)
- [Create React App 문서](https://create-react-app.dev/)

