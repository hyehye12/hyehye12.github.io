// 값을 채운 항목만 화면에 표시됩니다. 비워 두면 해당 버튼·기간은 나타나지 않습니다.

export const contact = {
  email: '', // 예: 'name@example.com' → Contact 영역에 이메일 버튼 표시
  resumeUrl: '', // 예: '/resume.pdf' (public 폴더에 파일을 넣은 경우) → 이력서 버튼 표시
  techDocUrl: '', // 예: '/project-description.pdf' → 프로젝트 기술서 버튼 표시
};

export type TimelineItem = {
  eyebrow: string;
  title: string;
  description: string;
  period: string; // 예: '2026.03 ~ 2026.12'
};

export const education: TimelineItem[] = [
  { eyebrow: 'IN PROGRESS', title: '시스템반도체 SW 개발자 양성과정 2기', description: '서울상공회의소 · 임베디드 SW, STM32, FPGA 및 Linux 학습', period: '' },
  { eyebrow: 'COMPLETED', title: '프론트엔드 웹서비스 개발자 양성과정', description: '웹 개발 및 팀 프로젝트 수행', period: '' },
];

export const experience: TimelineItem[] = [
  { eyebrow: 'AWARD', title: '팀 프로젝트 우수상', description: '웹서비스 개발 교육과정 내 팀 프로젝트 수상', period: '' },
  { eyebrow: 'INTERNSHIP · 2 MONTHS', title: '웹서비스 개발 인턴십', description: '웹 개발 실무 및 팀 협업 경험', period: '' },
];