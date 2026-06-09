import { Profile } from "./types";

export const defaultProfile: Profile = {
  name: "김지호",
  englishName: "Jiho Kim",
  role: "프론트엔드 & 풀스택 개발자",
  tagline: "기술과 디자인을 결합하여 가치 있는 사용자 경험을 창조합니다.",
  avatarUrl: "/src/assets/images/profile_avatar_1780991329267.png",
  aboutMeShort: "안녕하세요! 아름다운 인터페이스와 견고한 백엔드를 조화롭게 구축하는 5년 차 개발자 김지호입니다. 단순한 기능 구현을 넘어 인간 중심의 디지털 경험을 설계하는 과정에서 큰 보람을 느낍니다.",
  aboutMeDetailed: "저는 프론트엔드의 화려하고 세밀한 인터랙션부터, 효율적이고 트랜잭션이 안전한 백엔드 아키텍처 설계까지 개발의 전 영역을 아우르는 것을 즐깁니다.\n\n특히 사용자가 인터랙션을 하면서 편안함과 즐거움을 느낄 수 있도록 애니메이션 디테일이나 성능 최적화에 깊은 관심을 쏟고 있습니다. 팀원들과는 오픈되고 배려 깊은 대화를 지향하며, 비즈니스의 성공과 유려한 엔지니어링의 완벽한 밸런스를 끊임없이 탐구합니다.",
  email: "jiho.dev@example.com",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  blogUrl: "https://velog.io",
  skills: [
    {
      id: "cat_frontend",
      categoryName: "Frontend",
      items: [
        { name: "React", level: 5, color: "text-blue-500 bg-blue-50" },
        { name: "TypeScript", level: 5, color: "text-indigo-500 bg-indigo-50" },
        { name: "Next.js", level: 4, color: "text-slate-800 bg-slate-100" },
        { name: "Tailwind CSS", level: 5, color: "text-teal-500 bg-teal-50" },
        { name: "Framer Motion", level: 4, color: "text-pink-500 bg-pink-50" }
      ]
    },
    {
      id: "cat_backend",
      categoryName: "Backend & Database",
      items: [
        { name: "Node.js / Express", level: 4, color: "text-green-600 bg-green-50" },
        { name: "PostgreSQL", level: 4, color: "text-sky-600 bg-sky-50" },
        { name: "RESTful API / GraphQL", level: 5, color: "text-purple-500 bg-purple-50" },
        { name: "Firebase", level: 4, color: "text-amber-500 bg-amber-50" }
      ]
    },
    {
      id: "cat_tools",
      categoryName: "UI/UX & DevOps",
      items: [
        { name: "Figma", level: 4, color: "text-orange-500 bg-orange-50" },
        { name: "Git & GitHub", level: 5, color: "text-gray-700 bg-gray-100" },
        { name: "Docker", level: 3, color: "text-cyan-500 bg-cyan-50" },
        { name: "Vite / Webpack", level: 4, color: "text-yellow-600 bg-yellow-50" }
      ]
    }
  ],
  projects: [
    {
      id: "proj_1",
      title: "HealthFlow - 스마트 건강 기록 관리 앱",
      description: "사용자가 실시간으로 식단 사진을 올리면 칼로리 분석과 맞춤 피드백을 제공하고, 세부적인 운동 성과 추이를 우아한 차트로 대시보딩해 주는 풀스택 플랫폼입니다.",
      detailedDescription: "이 프로젝트는 사용자가 매일 복잡하게 손으로 적던 칼로리 기록을 사진 업로드 한 번으로 자동화하는 솔루션입니다. 프론트엔드 대시보드를 Recharts를 이용해 완벽히 인터랙티브하게 마크업하였으며, 점진적 이미지 로딩 기법을 적용해 초기 이미지 렌더링 속도를 획기적으로 낮췄습니다.",
      role: "Lead Fullstack Developer (Backend API & Interactive Dashboard)",
      period: "2024.05 ~ 2024.11 (6개월)",
      tags: ["React", "TypeScript", "Tailwind CSS", "Recharts", "Node.js", "Express"],
      imageUrl: "https://picsum.photos/seed/healthflow/600/400"
    },
    {
      id: "proj_2",
      title: "OnSpace - 초고속 공동 작업 화이트보드 캔버스",
      description: "여러 명의 기획자와 디자이너가 독립 리얼타임 캔버스 영역 위에서 자유롭게 목업 스케치, 포스트잇 의견 공유, 마인드맵핑을 동시에 가동할 수 있는 협업 도구입니다.",
      detailedDescription: "WebSockets 기반 가벼운 동기화 프로토콜을 구축하여 전송 레이턴시를 15ms 미만으로 제어하였습니다. 복잡한 마우스 드래그 이벤트를 캔버스 레이어 상에서 최소 지연으로 추적하는 브러쉬 최적화 렌더링을 적용했으며, React의 불필요한 리렌더링 흐름을 원천 방어하여 100개 이상의 실시간 멀티 커서를 원활히 소화했습니다.",
      role: "Frontend Architect",
      period: "2023.08 ~ 2024.01 (5개월)",
      tags: ["TypeScript", "HTML5 Canvas", "WebSockets", "React", "Framer Motion"],
      imageUrl: "https://picsum.photos/seed/onspace/600/400"
    },
    {
      id: "proj_3",
      title: "EcoEco - 일상 속 제로웨이스트 동네 장터",
      description: "동네 이웃 간에 친환경 다회용기 거래, 남은 식자재 무료 나눔, 쓰레기 제로 챌린지 달성을 독려하고 지도를 통해 친환경 업장을 쉽게 발굴할 수 있는 ESG 하이퍼로컬 앱입니다.",
      detailedDescription: "위치 정보 기반 동네 인증 모듈을 설계하였습니다. 챌린지 달성 시 획득하는 배지와 수치 데이터를 시각적인 서클 차트로 변형해 제공했으며, 커뮤니티 성격의 무한 스크롤 및 이미지 캐싱 전략을 최적화해 로드 딜레이를 제거하였습니다.",
      role: "Frontend Developer",
      period: "2022.06 ~ 2022.12 (6개월)",
      tags: ["React", "Next.js", "Tailwind CSS", "Kakao Map API", "LocalStorage"],
      imageUrl: "https://picsum.photos/seed/ecoeco/600/400"
    }
  ],
  experiences: [
    {
      id: "exp_1",
      period: "2024.03 ~ 현재",
      company: "그린테크 솔루션즈 (GreenTech Solutions)",
      role: "시니어 풀스택 개발자 (Senior Fullstack Developer)",
      description: "팀 리더로서 대시보드 리액트 모듈 개선 및 서버 성능 최적화 마이그레이션 과제를 리드하였습니다.",
      achievements: [
        "핵심 React SPA 번들 사이즈 35% 경량화 및 코드 스프리팅 최적화 적용",
        "서버 리팩토링 및 쿼리 캐싱 적용으로 페이지 첫 렌더링 지연(FCP) 1.2초 단축",
        "신입 사원 멘토링 프로그램 주도 및 온보딩 가이드북 코어 작성"
      ]
    },
    {
      id: "exp_2",
      period: "2022.01 ~ 2024.02",
      company: "픽셀 스튜디오 (Pixel Studio)",
      role: "프론트엔드 핵심 엔지니어 (Frontend Engineer)",
      description: "고성능 UI 컴포넌트 라이브러리 설계 및 피그마 디자인-to-코딩 매핑 자동화 환경을 수립했습니다.",
      achievements: [
        "사내 고성능 재사용 UI 컴포넌트 40여 종을 제작하며 프로젝트 세팅 생산성 2배 향상",
        "상태 관리 방식을 컴팩트하게 단순화하여 복잡했던 렌더링 에러 및 디버깅 공수 50% 절감",
        "모바일 웹 반응형 레이아웃 오차 제로화를 위한 빌드 테스트 스펙 검증"
      ]
    }
  ],
  educations: [
    {
      id: "edu_1",
      period: "2017.03 ~ 2022.02",
      school: "한국대학교 (Hankuk University)",
      major: "컴퓨터공학과 학사 학위 취득",
      description: "소프트웨어 공학, 데이터구조 수강 및 대학 캡스톤 프로젝트 우수상 수상"
    }
  ],
  faqs: [
    {
      id: "faq_1",
      question: "어떤 개발 철학을 바탕으로 개발에 임하시나요?",
      answer: "저는 '가독성 높은 코드가 최고의 퍼포먼스'를 만든다고 생각합니다. 나중에 유지보수할 다른 동료들과 나 자신을 지키는 가장 확실한 예방책이기 때문입니다. 아울러 화려한 첨단 스펙을 고집하기 전, '실제 사용자가 이 화면에서 느끼는 편익은 속도와 실용성에 맞춰져 있는가'를 최일선 평가지표로 삼습니다."
    },
    {
      id: "faq_2",
      question: "다른 직군(디자이너, 기획자, 비즈니스팀)과의 소통 및 작업 스타일이 궁금합니다.",
      answer: "저는 기술자의 한계선만 설정해 전달하는 소극적 스탠스 대신, 요구 사항을 함께 보면서 '현재 구현할 수 있는 가장 빠른 징검다리 스키마'와 '추후 확장성' 중 적절한 트레이드오프 지점을 발굴해 시각적으로 일찍 공유합니다. 이를 통해 쓸모없는 사이드 웨이팅 시간을 줄여 상호 간의 크리에이티브 시너지를 보존하고 속도를 늘립니다."
    },
    {
      id: "faq_3",
      question: "새로 부상하는 신흥 프레임워크나 패러다임은 어떻게 적응하시나요?",
      answer: "개념 아티클이나 유튜버 요약에만 매달리지 않고, 공식 가이드북에 있는 아주 작은 토이 레포를 클론하여 1~2일 내에 소형 미완성 서비스를 실제 띄워봅니다. 그렇게 직접 에러를 터트려보고 빌드가 꼬이는 해결 경로를 직접 밟을 때 가장 단골 수치들이 체화된다고 느낍니다."
    }
  ]
};
