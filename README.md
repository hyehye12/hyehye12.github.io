# Embedded SW Developer Portfolio

신입 임베디드 SW·펌웨어 개발자 포트폴리오 사이트 (React + TypeScript + Tailwind CSS + Vite).

## 실행

Node.js 20 이상 권장.

```bash
npm install
npm run dev
```

브라우저에서 터미널에 표시된 로컬 주소를 열어 확인합니다.

## 정적 빌드

```bash
npm run build
npm run preview
```

완성 파일은 `dist/`에 생성됩니다.

## 수정할 곳

- `src/data/projects.ts`: 프로젝트명, 설명, 역할, 기술, 이미지 및 GitHub URL
- `src/data/profile.ts`: About Me 기본 정보와 자기소개
- `src/HeroIntro.tsx`: 첫 화면 소개 문구와 애니메이션
- `src/App.tsx`: 자기소개, 교육·수상·인턴 경험, 연락처, 화면 구성
- `src/styles.css`: 디자인, 모바일 반응형 스타일
- `index.html`: 페이지 제목과 검색 메타데이터

## 프로젝트 구성

프로젝트 상세는 소개, 담당 업무, 프로젝트 저장소로 구성됩니다. 선풍기 저장소의 엔코더 코드는 다른 팀원의 코드이므로 상세 페이지에서 작성자를 구분합니다.

프로젝트 사진은 각 저장소의 원격 이미지를 사용하며, 불러올 수 없을 때 대체 그래픽을 표시합니다.

## GitHub Pages 배포

이 프로젝트는 `https://hyehye12.github.io/` 같은 **사용자 사이트**를 기준으로 설정되어 있습니다.

1. 본인 GitHub 계정에 `hyehye12.github.io` 저장소 생성
2. 프로젝트 파일을 저장소에 올림 (**commit / push 전에 반드시 본인 승인**)
3. GitHub 저장소 Settings → Pages → Build and deployment → GitHub Actions 선택
4. `.github/workflows/deploy.yml` 워크플로 실행 후 사이트 확인

GitHub 계정 이름이나 저장소명이 다른 경우 `vite.config.ts`의 `base` 및 배포 경로를 맞춰 주세요. Vite+BrowserRouter 사용 시 GitHub Pages에 직접 새로고침할 때 404가 발생할 수 있으므로 제공된 `404.html` 대응을 함께 확인해야 합니다.

