// 값을 채운 항목만 화면에 표시됩니다. 비워 두면 해당 버튼·기간은 나타나지 않습니다.

export const contact = {
  email: 'gtg1349@gmail.com',
  resumeUrl: '',
  techDocUrl: '/public/project_description.pdf',
};

export type TimelineItem = {
  eyebrow: string;
  title: string;
  description: string;
  period: string; 
};

export const education: TimelineItem[] = [
  { eyebrow: 'IN PROGRESS', title: '시스템반도체 SW 개발자 양성과정 2기', description: '서울상공회의소 · 임베디드 SW, STM32, FPGA 및 Linux 학습', period: '2026.06~2026.12' },
  { eyebrow: 'COMPLETED', title: '웹서비스 개발자 양성과정', description: '웹 개발 및 팀 프로젝트 수행', period: '2025.06.~2025.10.' },
];

export const experience: TimelineItem[] = [
  { eyebrow: 'AWARD', title: '팀 프로젝트 우수상', description: '웹서비스 개발 교육과정 내 팀 프로젝트 수상', period: '2025.09.30' },
  { eyebrow: 'INTERNSHIP · 2 MONTHS', title: '웹서비스 개발 인턴십', description: '웹 개발 실무 및 팀 협업 경험', period: '2025.10~2025.12' },
];

