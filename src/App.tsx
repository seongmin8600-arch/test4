import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Briefcase,
  GraduationCap,
  Sliders,
  Trash2,
  Plus,
  RotateCcw,
  X,
  Check,
  ChevronDown,
  ExternalLink,
  FolderKanban,
  Sparkles,
  MapPin,
  Calendar,
  Award,
  Edit3,
  CheckCircle2,
  BookOpen,
  HelpCircle,
  Copy,
  PlusCircle,
  Undo
} from "lucide-react";
import { Profile, Project, SkillCategory, Experience, Education, FAQ } from "./types";
import { defaultProfile } from "./defaultData";

export default function App() {
  // Load initial profile data from localStorage if existing, otherwise defaultProfile
  const [profile, setProfile] = useState<Profile>(() => {
    const saved = localStorage.getItem("user_portfolio_profile");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved profile, using default", e);
      }
    }
    return defaultProfile;
  });

  // State managers
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "about" | "skills" | "projects" | "experience" | "faq">("all");
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [builderTab, setBuilderTab] = useState<"basic" | "skills" | "projects" | "experience" | "faq">("basic");
  
  // Custom interactive fun badges (editable too!)
  const [funBadges, setFunBadges] = useState(() => {
    const saved = localStorage.getItem("user_portfolio_fun_badges");
    return saved ? JSON.parse(saved) : [
      { id: "1", label: "📍 활동지", value: "서울, 대한민국" },
      { id: "2", label: "☕ 선호 음료", value: "아이스 아메리카노" },
      { id: "3", label: "🧩 MBTI", value: "ENFJ (정의로운 지도자)" },
      { id: "4", label: "🛠️ 주 도구", value: "Cursor & VS Code" }
    ];
  });

  // Contact Form State
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Save changes to localStorage whenever profile changes
  useEffect(() => {
    localStorage.setItem("user_portfolio_profile", JSON.stringify(profile));
  }, [profile]);

  // Save badges to localStorage
  useEffect(() => {
    localStorage.setItem("user_portfolio_fun_badges", JSON.stringify(funBadges));
  }, [funBadges]);

  // Handle profile reset
  const handleResetToDefault = () => {
    if (window.confirm("프로필 데이터를 초기 개발자 샘플 상태로 되돌리시겠습니까?")) {
      setProfile(defaultProfile);
      setFunBadges([
        { id: "1", label: "📍 활동지", value: "서울, 대한민국" },
        { id: "2", label: "☕ 선호 음료", value: "아이스 아메리카노" },
        { id: "3", label: "🧩 MBTI", value: "ENFJ (정의로운 지도자)" },
        { id: "4", label: "🛠️ 주 도구", value: "Cursor & VS Code" }
      ]);
      setFeedbackMsg("데이터가 초기 상태로 리셋되었습니다!");
      setTimeout(() => setFeedbackMsg(""), 3000);
    }
  };

  // Profile data update helpers
  const updateBasicInfo = (key: keyof Profile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleBadgeChange = (id: string, value: string) => {
    setFunBadges(prev => prev.map(b => b.id === id ? { ...b, value } : b));
  };

  // Skills managers
  const handleSkillLevelChange = (catId: string, skillName: string, level: number) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.map(s => s.name === skillName ? { ...s, level } : s)
        };
      })
    }));
  };

  const handleAddSkill = (catId: string) => {
    const name = prompt("새로운 기술 스택 명칭을 입력하세요:");
    if (!name) return;
    
    const colors = [
      "text-blue-500 bg-blue-50",
      "text-emerald-500 bg-emerald-50",
      "text-indigo-500 bg-indigo-50",
      "text-violet-500 bg-violet-50",
      "text-rose-500 bg-rose-50",
      "text-amber-500 bg-amber-50"
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.id !== catId) return cat;
        if (cat.items.some(s => s.name.toLowerCase() === name.toLowerCase())) {
          alert("이미 존재하는 기술명입니다.");
          return cat;
        }
        return {
          ...cat,
          items: [...cat.items, { name, level: 4, color: randomColor }]
        };
      })
    }));
  };

  const handleDeleteSkill = (catId: string, skillName: string) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.map(cat => {
        if (cat.id !== catId) return cat;
        return {
          ...cat,
          items: cat.items.filter(s => s.name !== skillName)
        };
      })
    }));
  };

  // Projects managers
  const handleUpdateProject = (projId: string, field: keyof Project, value: any) => {
    setProfile(prev => ({
      ...prev,
      projects: prev.projects.map(p => p.id === projId ? { ...p, [field]: value } : p)
    }));
  };

  const handleAddProject = () => {
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      title: "새 수주 프로젝트",
      description: "프로젝트에 대한 핵심 설명 단락을 적어주세요. 라이브 결과물을 직관적으로 어필하는 문장이 좋습니다.",
      detailedDescription: "여기에 메인 팝업에서 보일 심층 아키텍처 및 상세한 트러블슈팅 극복 과정을 세부적으로 적을 수 있습니다.",
      role: "핵심 역할 및 담당 포지션",
      period: "2026.01 ~ 2026.04",
      tags: ["React", "TypeScript", "Tailwind CSS"],
      imageUrl: "https://picsum.photos/seed/newproject/600/400"
    };
    setProfile(prev => ({
      ...prev,
      projects: [...prev.projects, newProj]
    }));
  };

  const handleDeleteProject = (projId: string) => {
    if (window.confirm("진짜로 이 프로젝트 카드를 삭제하시겠습니까?")) {
      setProfile(prev => ({
        ...prev,
        projects: prev.projects.filter(p => p.id !== projId)
      }));
    }
  };

  // Experience and Education managers
  const handleUpdateExperience = (id: string, field: keyof Experience, value: any) => {
    setProfile(prev => ({
      ...prev,
      experiences: prev.experiences.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    }));
  };

  const handleAddExperience = () => {
    const newExp: Experience = {
      id: `exp_${Date.now()}`,
      period: "2025.01 ~ 2025.12",
      company: "새로운 개발 조직명",
      role: "프론트엔드 연구원",
      description: "어떤 성격의 솔루션을 만들었는지 간략히 기록하세요.",
      achievements: [
        "핵심 기능 렌더링 성능 최적화 달성",
        "디자인 가이드라인 정립"
      ]
    };
    setProfile(prev => ({
      ...prev,
      experiences: [...prev.experiences, newExp]
    }));
  };

  const handleDeleteExperience = (id: string) => {
    setProfile(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== id)
    }));
  };

  const handleUpdateEducation = (id: string, field: keyof Education, value: any) => {
    setProfile(prev => ({
      ...prev,
      educations: prev.educations.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    }));
  };

  const handleAddEducation = () => {
    const newEdu: Education = {
      id: `edu_${Date.now()}`,
      period: "2018.03 ~ 2024.02",
      school: "모하 대학교",
      major: "소프트웨어공학 학사",
      description: "학위 연구 및 대외 동아리 활동 참여 기록"
    };
    setProfile(prev => ({
      ...prev,
      educations: [...prev.educations, newEdu]
    }));
  };

  const handleDeleteEducation = (id: string) => {
    setProfile(prev => ({
      ...prev,
      educations: prev.educations.filter(edu => edu.id !== id)
    }));
  };

  // FAQ managers
  const handleUpdateFAQ = (id: string, field: keyof FAQ, value: string) => {
    setProfile(prev => ({
      ...prev,
      faqs: prev.faqs.map(f => f.id === id ? { ...f, [field]: value } : f)
    }));
  };

  const handleAddFAQ = () => {
    const newFAQ: FAQ = {
      id: `faq_${Date.now()}`,
      question: "나의 업무 성향과 가장 조화로운 동료 스타일은 무엇인가요?",
      answer: "빠르고 유연하게 소통하면서, 코드 리뷰 의견을 감정적 비난이 아닌 지적 호기심과 성장의 비료로 삼을 줄 아는 성숙한 개발팀과 시너지가 가장 잘 납니다."
    };
    setProfile(prev => ({
      ...prev,
      faqs: [...prev.faqs, newFAQ]
    }));
  };

  const handleDeleteFAQ = (id: string) => {
    setProfile(prev => ({
      ...prev,
      faqs: prev.faqs.filter(f => f.id !== id)
    }));
  };

  // Contact form simulated send
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) {
      setErrorMsg("모든 항목을 입력해 주셔야 이메일 발송이 접수됩니다.");
      setTimeout(() => setErrorMsg(""), 3000);
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setContactName("");
      setContactEmail("");
      setContactMessage("");
      setFeedbackMsg(`${contactName}님의 메시지가 성공적으로 송신되었습니다! (데모 가상 메일 발송 완료)`);
      setTimeout(() => setFeedbackMsg(""), 4500);
    }, 1200);
  };

  // Get unique tags for filtration
  const allProjectTags = ["All", ...Array.from(new Set(profile.projects.flatMap(p => p.tags)))];

  const filteredProjects = projectFilter === "All"
    ? profile.projects
    : profile.projects.filter(p => p.tags.includes(projectFilter));

  // FAQ Expand state
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#Fcfbfa] text-slate-800 flex flex-col selection:bg-indigo-100 selection:text-indigo-900 transition-all duration-300 relative overflow-x-hidden" id="app_root">
      
      {/* Absolute Decorative Blobs */}
      <div className="absolute top-[-200px] left-[-100px] w-[500px] h-[500px] rounded-full bg-indigo-200/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[600px] right-[-100px] w-[450px] h-[450px] rounded-full bg-violet-200/20 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-[200px] left-[10%] w-[400px] h-[400px] rounded-full bg-rose-100/30 blur-3xl pointer-events-none -z-10" />

      {/* FLOATING SUCCESS TOAST */}
      <AnimatePresence>
        {feedbackMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-slate-900/10 flex items-center space-x-2.5 max-w-sm w-full md:max-w-md"
            id="toast_success"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <p className="text-sm font-medium text-slate-100 leading-tight">{feedbackMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOAT ERROR TOAST */}
      <AnimatePresence>
        {errorMsg && (
          <motion.div 
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-red-600 text-white px-5 py-3.5 rounded-2xl shadow-xl flex items-center space-x-2.5"
            id="toast_error"
          >
            <p className="text-sm font-medium">{errorMsg}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GLASS HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 border-b border-slate-100 w-full" id="site_header">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
            <span className="font-display font-extrabold text-lg tracking-tight text-slate-900">
              {profile.name}
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline-block">
              {profile.englishName}
            </span>
          </div>

          {/* Quick Nav Area */}
          <nav className="hidden md:flex items-center space-x-1 text-sm font-medium text-slate-600">
            {[
              { id: "all", label: "전체보기" },
              { id: "about", label: "소개" },
              { id: "skills", label: "기술스택" },
              { id: "projects", label: "대표작" },
              { id: "experience", label: "경력사항" },
              { id: "faq", label: "가치&질답" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  // Scroll to appropriate view if specific tab
                  if (tab.id !== "all") {
                    const el = document.getElementById(`section_${tab.id}`);
                    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                  } else {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                }}
                className={`px-3 py-1.5 rounded-full transition-all relative ${
                  activeTab === tab.id ? "text-indigo-600 font-semibold" : "hover:text-slate-950 hover:bg-slate-50"
                }`}
                id={`nav_tab_${tab.id}`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="header-bubble"
                    className="absolute inset-0 bg-indigo-50 rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Builder Action */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsBuilderOpen(!isBuilderOpen)}
              className={`flex items-center space-x-1 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-2xl border transition-all cursor-pointer ${
                isBuilderOpen 
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white border-indigo-600 shadow-md shadow-indigo-600/10" 
                  : "bg-white hover:bg-slate-50 text-slate-800 border-slate-200"
              }`}
              id="btn_toggle_builder"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>실시간 프로필 빌더</span>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 py-8" id="main_content_area">
        
        {/* HERO SECTION / ABOUT */}
        <section id="section_about" className="mb-14 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Profile Info Card */}
            <div className="lg:col-span-5 bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow" id="card_hero_profile">
              <div className="flex flex-col items-center text-center">
                
                {/* Profile Portrait Container */}
                <div className="relative mb-5" id="profile_avatar_wrapper">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 to-pink-500 rounded-full blur opacity-15 animate-spin-slow" />
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg relative z-10 bg-slate-50"
                    referrerPolicy="no-referrer"
                    id="img_profile_avatar"
                  />
                  <div className="absolute bottom-1 right-1 bg-emerald-500 w-4 h-4 rounded-full border-2 border-white z-20 shadow-sm" title="연락 가능 상태" />
                </div>

                <div className="space-y-1">
                  <h1 className="font-display font-extrabold text-3xl text-slate-900 tracking-tight" id="lbl_profile_name">
                    {profile.name}
                  </h1>
                  <p className="text-sm font-mono text-slate-400 font-semibold tracking-wider uppercase" id="lbl_profile_eng_name">
                    {profile.englishName}
                  </p>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 font-display mt-2" id="lbl_profile_role">
                    {profile.role}
                  </div>
                </div>

                <p className="text-slate-500 text-sm italic font-medium px-4 mt-4 select-none leading-relaxed" id="lbl_profile_tagline">
                  &ldquo;{profile.tagline}&rdquo;
                </p>

                {/* Fun Facts Mini Grid (Saves directly!) */}
                <div className="grid grid-cols-2 gap-2.5 w-full border-t border-b border-slate-50 py-5 my-5" id="profile_fun_badges_grid">
                  {funBadges.map((badge: any) => (
                    <div key={badge.id} className="bg-slate-50 py-2.5 px-3 rounded-2xl flex flex-col justify-center items-center text-center">
                      <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider mb-0.5">{badge.label}</span>
                      <span className="text-xs font-bold text-slate-700 leading-tight">{badge.value}</span>
                    </div>
                  ))}
                </div>

                {/* Social Button Anchors */}
                <div className="flex gap-2 w-full" id="social_networks_row">
                  <a 
                    href={`mailto:${profile.email}`} 
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-all cursor-pointer"
                    id="link_email"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>메일 전송</span>
                  </a>
                  {profile.githubUrl && (
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
                      title="GitHub"
                      id="link_github"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {profile.linkedinUrl && (
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
                      title="LinkedIn"
                      id="link_linkedin"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {profile.blogUrl && (
                    <a
                      href={profile.blogUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 flex items-center justify-center rounded-2xl border border-slate-200 hover:bg-slate-50 text-slate-700 transition-all"
                      title="Blog"
                      id="link_blog"
                    >
                      <Globe className="w-4 h-4" />
                    </a>
                  )}
                </div>

              </div>
            </div>

            {/* Profile Deep Intro Card */}
            <div className="lg:col-span-7 space-y-6" id="card_profile_intro_detailed">
              <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm h-full flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="flex items-center space-x-2 text-indigo-600">
                    <Sparkles className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider">CREATIVE ENCOUNTER</span>
                  </div>
                  
                  <h2 className="font-display font-extrabold text-2xl sm:text-3.5xl text-slate-950 leading-tight">
                    안녕하세요! 끊임없이 가치를 조율하는 웹 공학 디자이너입니다.
                  </h2>

                  <div className="p-4 bg-indigo-50/40 rounded-2xl border border-indigo-50 text-slate-700 text-sm leading-relaxed font-medium">
                    {profile.aboutMeShort}
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
                    {profile.aboutMeDetailed}
                  </p>
                </div>

                {/* Callouts/Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-violet-50 flex items-center justify-center text-violet-600 shrink-0">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">경력 총합</h4>
                      <p className="text-sm font-extrabold text-slate-800">5+ Years Professional</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 shrink-0">
                      <Award className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wide">성향 요약</h4>
                      <p className="text-sm font-extrabold text-slate-800">품질 지향주의, 유기적 협업</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="section_skills" className="mb-14 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">TECHNICAL CAPABILITY</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950">기술 스택 & 보유 전문성</h2>
            </div>
            <p className="text-xs text-slate-400 mt-2 md:mt-0 max-w-sm">
              * 실시간 프로필 빌더를 통해 언제든 다른 언어나 프레임워크 스킬을 추가, 삭제, 조정 반영할 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" id="skills_container_row">
            {profile.skills.map((category) => (
              <div 
                key={category.id} 
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full"
                id={`skill_card_wrapper_${category.id}`}
              >
                <h3 className="font-display font-extrabold text-lg text-slate-900 border-b border-slate-50 pb-3 mb-4 flex items-center justify-between">
                  <span>{category.categoryName}</span>
                  <span className="text-[10px] bg-slate-100 font-normal px-2 py-0.5 rounded text-slate-500 font-mono uppercase">
                    {category.items.length} items
                  </span>
                </h3>

                {category.items.length === 0 ? (
                  <div className="flex-grow flex items-center justify-center py-8 text-center bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
                    <p className="text-xs text-slate-400 font-medium">등록된 기술 스택이 없습니다.</p>
                  </div>
                ) : (
                  <div className="space-y-4 flex-grow">
                    {category.items.map((skill) => (
                      <div key={skill.name} className="space-y-1.5" id={`skill_meter_${skill.name}`}>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                          <span className="tracking-tight">{skill.name}</span>
                          <span className="text-indigo-600 font-mono">
                            {skill.level === 5 ? "전문가 (Lv.5)" : skill.level === 4 ? "우수 (Lv.4)" : skill.level === 3 ? "보통 (Lv.3)" : `기초 (Lv.${skill.level})`}
                          </span>
                        </div>
                        
                        {/* Progress bar with dots */}
                        <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div 
                            className="h-full bg-indigo-600 rounded-full" 
                            style={{ width: `${(skill.level / 5) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="section_projects" className="mb-14 scroll-mt-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">PROJECT PORTFOLIO</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950">수행 프로젝트 대시보드</h2>
            </div>
            
            {/* Tag Filters */}
            <div className="flex flex-wrap gap-1.5 mt-4 md:mt-0 bg-white p-1 rounded-2xl border border-slate-100 max-w-full overflow-x-auto" id="project_tag_filters">
              {allProjectTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setProjectFilter(tag)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold tracking-tight transition-all uppercase cursor-pointer ${
                    projectFilter === tag 
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "hover:bg-slate-50 text-slate-500"
                  }`}
                  id={`filter_badge_${tag}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Card Grid */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white py-16 text-center rounded-3xl border border-dashed border-slate-200" id="empty_projects_callout">
              <FolderKanban className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-slate-800 font-bold mb-1">매칭되는 프로젝트가 없습니다.</h3>
              <p className="text-xs text-slate-400">우측 실시간 에디터에서 다른 스택 태그를 입력해 주시거나 추가해 보세요!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="projects_masonry_grid">
              {filteredProjects.map((project) => (
                <article 
                  key={project.id} 
                  className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col group h-full"
                  id={`project_card_${project.id}`}
                >
                  
                  {/* Image banner */}
                  <div className="relative aspect-video overflow-hidden bg-slate-50 shrink-0">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                      id={`img_project_${project.id}`}
                    />
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-700 shadow-sm">
                      {project.period}
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1" id={`project_tags_${project.id}`}>
                        {project.tags.map(t => (
                          <span key={t} className="text-[10px] uppercase font-bold tracking-tight text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                            {t}
                          </span>
                        ))}
                      </div>

                      <h3 className="font-display font-extrabold text-base text-slate-950 group-hover:text-indigo-600 transition-colors line-clamp-1">
                        {project.title}
                      </h3>

                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2" id={`desc_project_${project.id}`}>
                        {project.description}
                      </p>
                    </div>

                    <div className="border-t border-slate-50 pt-4 mt-4 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-medium truncate max-w-[140px]" title={project.role}>
                        역할: {project.role}
                      </span>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="flex items-center space-x-1 py-1.5 px-3 rounded-xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
                        id={`btn_view_details_${project.id}`}
                      >
                        <span>자세히 보기</span>
                        <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                      </button>
                    </div>
                  </div>

                </article>
              ))}
            </div>
          )}
        </section>

        {/* TIMELINE SECTION (EXPERIENCES & EDUCATION) */}
        <section id="section_experience" className="mb-14 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left side timeline info */}
            <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-3">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">CAREER MILESTONE</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950">경력 및 성장 학력</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                사용자의 현업 실전 성과와 학업 전지 이력 사항을 일지별로 정연하게 시각화합니다. 
              </p>
              <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                <Check className="w-3.5 h-3.5" />
                <span>검증된 프로젝트 성과 기반</span>
              </div>
            </div>

            {/* Right side list flow */}
            <div className="lg:col-span-8 space-y-8" id="milestones_timeline_container">
              
              {/* Professional Work Experience */}
              <div className="space-y-6">
                <h3 className="font-display font-extrabold text-lg text-slate-900 flex items-center space-x-2">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>실전 직무 경험 (Experience)</span>
                </h3>

                {profile.experiences.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed text-xs text-slate-400">
                    직무 경험이 비어 있습니다. 우측 빌더에서 추가해 보세요!
                  </div>
                ) : (
                  <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-6">
                    {profile.experiences.map((exp, index) => (
                      <div key={exp.id} className="relative group" id={`timeline_experience_${exp.id}`}>
                        
                        {/* Interactive Dot Node */}
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-white border-2 border-indigo-500 rounded-full group-hover:scale-125 group-hover:bg-indigo-500 transition-all z-10 shadow-sm" />
                        
                        <div className="bg-white border border-slate-100 hover:border-indigo-100 p-5 rounded-2xl shadow-sm hover:shadow-md transition-all">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-2.5">
                            <div>
                              <h4 className="font-display font-extrabold text-base text-slate-955">{exp.company}</h4>
                              <p className="text-xs text-indigo-600 font-semibold">{exp.role}</p>
                            </div>
                            <span className="inline-block bg-slate-100 text-slate-600 font-medium text-xs px-2.5 py-1 rounded-xl shrink-0 font-display">
                              {exp.period}
                            </span>
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed mb-4">{exp.description}</p>
                          
                          {/* Inner list of achievements */}
                          {exp.achievements && exp.achievements.length > 0 && (
                            <div className="space-y-1.5 border-t border-slate-50 pt-3">
                              <h5 className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-2">Key Achievements</h5>
                              {exp.achievements.map((ach, i) => (
                                <div key={i} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                                  <Check className="w-3.5 h-3.5 text-indigo-500 mt-0.5 shrink-0" />
                                  <span>{ach}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Education History */}
              <div className="space-y-6 pt-4">
                <h3 className="font-display font-extrabold text-lg text-slate-900 flex items-center space-x-2">
                  <GraduationCap className="w-4 h-4 text-indigo-600" />
                  <span>학력 및 수련 이력 (Education)</span>
                </h3>

                {profile.educations.length === 0 ? (
                  <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed text-xs text-slate-400">
                    학력 정보가 비어 있습니다. 우측 빌더에서 추가해 보세요!
                  </div>
                ) : (
                  <div className="relative border-l border-slate-100 pl-6 ml-3 space-y-4">
                    {profile.educations.map((edu) => (
                      <div key={edu.id} className="relative group" id={`timeline_education_${edu.id}`}>
                        <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-white border-2 border-violet-500 rounded-full group-hover:scale-125 group-hover:bg-violet-500 transition-all z-10 shadow-sm" />
                        
                        <div className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                            <div>
                              <h4 className="font-display font-extrabold text-base text-slate-900">{edu.school}</h4>
                              <p className="text-xs text-violet-600 font-medium">{edu.major}</p>
                            </div>
                            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-xl font-display shrink-0">
                              {edu.period}
                            </span>
                          </div>
                          {edu.description && (
                            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">{edu.description}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>

          </div>
        </section>

        {/* FAQ & INTERACTIVE VALUES */}
        <section id="section_faq" className="mb-14 scroll-mt-20">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">DEVELOPER PHILOSOPHY</span>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-950">개인 철학 & 자주 묻는 질문</h2>
              <p className="text-xs text-slate-400">질문 카드를 클릭하여 제가 일하는 가치 방식에 대해 자세히 확인해 보세요.</p>
            </div>

            {profile.faqs.length === 0 ? (
              <div className="text-center py-8 bg-slate-50/50 rounded-2xl border border-dashed text-xs text-slate-400">
                등록된 질문 카드가 없습니다.
              </div>
            ) : (
              <div className="space-y-3" id="faq_accordions_wrapper">
                {profile.faqs.map((faq) => {
                  const isOpen = expandedFAQ === faq.id;
                  return (
                    <div 
                      key={faq.id} 
                      className={`bg-white border rounded-2xl overflow-hidden transition-all duration-200 ${
                        isOpen ? "border-indigo-100 shadow-md shadow-indigo-100/5" : "border-slate-100 shadow-sm"
                      }`}
                      id={`faq_item_${faq.id}`}
                    >
                      <button
                        onClick={() => toggleFAQ(faq.id)}
                        className="w-full text-left p-5 flex items-start justify-between gap-3 text-slate-800 hover:text-indigo-600 transition-colors font-semibold text-sm sm:text-base cursor-pointer"
                        id={`faq_trigger_${faq.id}`}
                      >
                        <span className="flex gap-2 items-center">
                          <HelpCircle className="w-4.5 h-4.5 text-indigo-500 shrink-0 mt-0.5" />
                          <span>{faq.question}</span>
                        </span>
                        <ChevronDown className={`w-5 h-5 shrink-0 mt-0.5 text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180 text-indigo-500" : ""}`} />
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-50 bg-[#Fcfbfa]">
                              <p className="whitespace-pre-wrap">{faq.answer}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* IMMERSIVE CONTACT FORM */}
        <section id="section_contact" className="mb-14 scroll-mt-20">
          <div className="max-w-xl mx-auto bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center space-x-2 text-indigo-600 mb-2">
              <Mail className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">CONNECT WITH ME</span>
            </div>
            <h3 className="font-display font-extrabold text-2xl text-slate-950 mb-1">
              협업 제안 & 질문 전송
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              포트폴리오 내용에 대해 궁금한 점이나 입사/아웃소싱 프로젝트 협업 제안을 메일 양식으로 전송하세요.
            </p>

            <form onSubmit={handleContactSubmit} className="space-y-4" id="form_contact">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">보내는 사람 이름</label>
                <input
                  type="text"
                  required
                  placeholder="예: 홍길동 팀장"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-semibold"
                  id="inp_contact_name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">회신용 이메일 주소</label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-semibold"
                  id="inp_contact_email"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">프로젝트 세부 내용 / 제안 서신</label>
                <textarea
                  required
                  rows={4}
                  placeholder="회사 소개, 프로젝트의 간략한 기한 및 범위, 연봉 테이블 조건 등을 편하게 제안해 주세요."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:border-indigo-500 focus:bg-white transition-all text-slate-800 font-medium"
                  id="inp_contact_message"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold text-xs rounded-2xl transition-colors tracking-wide uppercase flex items-center justify-center space-x-1 shadow-md shadow-indigo-600/10 cursor-pointer"
                id="btn_contact_submit"
              >
                {isSending ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white mr-2" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>메시지 전송 중...</span>
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4" />
                    <span>서신 전송 완료하기</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-10 mt-12 text-center" id="site_footer">
        <div className="max-w-6xl mx-auto px-4 text-slate-400 space-y-3">
          <p className="text-xs">
            이 포트폴리오 웹사이트는 <strong>Google AI Studio Build</strong>를 통해 완벽히 가동되는 리얼타임 인터랙티브 포트폴리오입니다.
          </p>
          <div className="flex justify-center items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold">
            <span>© 2026 {profile.name}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span>Built with React & Tailwind</span>
          </div>
        </div>
      </footer>

      {/* PORTFOLIO DETAIL POPUP MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
            id="project_details_modal_dimmer"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="bg-white rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
              id="project_details_modal_body"
            >
              
              {/* Header Banner */}
              <div className="relative aspect-[21/9] bg-slate-50 shrink-0">
                <img 
                  src={selectedProject.imageUrl} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  id="modal_project_img"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 bg-slate-900/80 hover:bg-slate-900 text-white w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  id="modal_close_btn"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Inner details container */}
              <div className="p-6 sm:p-8 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap gap-1">
                    {selectedProject.tags.map(t => (
                      <span key={t} className="text-[10px] uppercase font-bold tracking-tight text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-display font-black text-xl sm:text-2xl text-slate-900 leading-tight">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>작업 기간: {selectedProject.period}</span>
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl space-y-1 text-xs">
                  <p className="text-slate-500 font-bold">담당 직무 역할</p>
                  <p className="text-slate-800 font-extrabold">{selectedProject.role}</p>
                </div>

                <div className="space-y-3 text-slate-650 text-xs sm:text-sm leading-relaxed">
                  <h4 className="font-bold text-slate-800 border-b border-slate-50 pb-1 flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span>프로젝트 기획 요약</span>
                  </h4>
                  <p>{selectedProject.description}</p>
                  
                  {selectedProject.detailedDescription && (
                    <>
                      <h4 className="font-bold text-slate-800 border-b border-slate-50 pb-1 mt-4 flex items-center gap-1.5">
                        <Sliders className="w-4 h-4 text-violet-500" />
                        <span>전략적 설계 및 기술 극복 사례</span>
                      </h4>
                      <p className="whitespace-pre-wrap">{selectedProject.detailedDescription}</p>
                    </>
                  )}
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                    id="modal_close_footer_btn"
                  >
                    확인 및 팝업 닫기
                  </button>
                </div>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REAL-TIME PROFILE BUILDER DRAWER */}
      <AnimatePresence>
        {isBuilderOpen && (
          <>
            {/* Dimmer backdrop for drawer on phone */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setIsBuilderOpen(false)}
              id="builder_drawer_dimmer"
            />

            {/* Main Drawer Shell */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 220 }}
              className="fixed top-0 right-0 w-full sm:w-[460px] h-full bg-white border-l border-slate-200 shadow-2xl z-50 flex flex-col overflow-hidden"
              id="builder_drawer_body"
            >
              
              {/* Drawer Title Header */}
              <div className="p-4 sm:p-5 bg-slate-50 border-b border-slate-100 flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-5 h-5 text-indigo-600" />
                  <div>
                    <h3 className="font-display font-extrabold text-sm sm:text-base text-slate-950">실시간 에디터 & 빌더</h3>
                    <p className="text-[10px] text-slate-400 font-medium">내용을 고치면 즉각 왼쪽 화면이 바뀝니다!</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={handleResetToDefault}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    title="초기 샘플로 전체 복원"
                    id="btn_reset_builder"
                  >
                    <Undo className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsBuilderOpen(false)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                    id="btn_close_drawer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Builder Tab Navigation Menu */}
              <div className="bg-slate-100/50 border-b border-slate-200/60 p-2 flex shrink-0 overflow-x-auto gap-1" id="builder_tab_row">
                {[
                  { id: "basic", label: "기본 정보" },
                  { id: "skills", label: "기술 조정" },
                  { id: "projects", label: "대표작 수정" },
                  { id: "experience", label: "경력정리" },
                  { id: "faq", label: "가치질답" }
                ].map(bTab => (
                  <button
                    key={bTab.id}
                    onClick={() => setBuilderTab(bTab.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                      builderTab === bTab.id 
                        ? "bg-white text-indigo-600 shadow-sm"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                    id={`btn_b_tab_${bTab.id}`}
                  >
                    {bTab.label}
                  </button>
                ))}
              </div>

              {/* Form Content Area */}
              <div className="flex-grow overflow-y-auto p-4 sm:p-5 space-y-6" id="builder_form_scroll">
                
                {/* 1. BASIC INFO FORM */}
                {builderTab === "basic" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider pb-1 border-b border-slate-55">인물 핵심 데이터 원장</h4>
                    
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1.5">이름 (Korean)</label>
                        <input
                          type="text"
                          value={profile.name}
                          onChange={(e) => updateBasicInfo("name", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500 font-bold"
                          id="inp_b_name"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1.5">영문 이름 (English)</label>
                        <input
                          type="text"
                          value={profile.englishName}
                          onChange={(e) => updateBasicInfo("englishName", e.target.value)}
                          className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500"
                          id="inp_b_englishName"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">대표 타이틀 (Job title / Position)</label>
                      <input
                        type="text"
                        value={profile.role}
                        onChange={(e) => updateBasicInfo("role", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500 font-semibold text-indigo-600"
                        id="inp_b_role"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">슬로건 태그라인 (Short Catchphrase)</label>
                      <input
                        type="text"
                        value={profile.tagline}
                        onChange={(e) => updateBasicInfo("tagline", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500 italic"
                        id="inp_b_tagline"
                      />
                    </div>

                    <div className="bg-slate-50 rounded-2xl p-3.5 space-y-3">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">포트폴리오 미니 뱃지 (Fun Badges)</p>
                      {funBadges.map((badge: any) => (
                        <div key={badge.id} className="flex gap-2 items-center">
                          <span className="text-xs text-slate-500 font-semibold w-20 shrink-0">{badge.label}</span>
                          <input
                            type="text"
                            value={badge.value}
                            onChange={(e) => handleBadgeChange(badge.id, e.target.value)}
                            className="flex-grow px-2 px-2.5 py-1 text-xs bg-white border border-slate-150 rounded-lg focus:outline-indigo-500"
                            id={`inp_b_fun_badge_${badge.id}`}
                          />
                        </div>
                      ))}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">이메일 주소 (이메일 전송에 적용됨)</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => updateBasicInfo("email", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500"
                        id="inp_b_email"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">GitHub 링크</label>
                        <input
                          type="text"
                          value={profile.githubUrl}
                          onChange={(e) => updateBasicInfo("githubUrl", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-slate-50 border border-slate-100 rounded-xl"
                          id="inp_b_github"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">LinkedIn 링크</label>
                        <input
                          type="text"
                          value={profile.linkedinUrl}
                          onChange={(e) => updateBasicInfo("linkedinUrl", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-slate-50 border border-slate-100 rounded-xl"
                          id="inp_b_linkedin"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Blog/Velog 링크</label>
                        <input
                          type="text"
                          value={profile.blogUrl}
                          onChange={(e) => updateBasicInfo("blogUrl", e.target.value)}
                          className="w-full px-2.5 py-1.5 text-[11px] bg-slate-50 border border-slate-100 rounded-xl"
                          id="inp_b_blog"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">자기소개 핵심 요약 (Callout text)</label>
                      <textarea
                        rows={3}
                        value={profile.aboutMeShort}
                        onChange={(e) => updateBasicInfo("aboutMeShort", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500"
                        id="inp_b_aboutMeShort"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1.5">자기소개 상세 서술 (Detailed Paragraph)</label>
                      <textarea
                        rows={5}
                        value={profile.aboutMeDetailed}
                        onChange={(e) => updateBasicInfo("aboutMeDetailed", e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-100 rounded-xl focus:bg-white focus:outline-indigo-500"
                        id="inp_b_aboutMeDetailed"
                      />
                    </div>

                  </div>
                )}

                {/* 2. SKILLS TAB */}
                {builderTab === "skills" && (
                  <div className="space-y-6">
                    <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider pb-1 border-b border-slate-55">보유 핵심 기술 관리</h4>
                    
                    {profile.skills.map(cat => (
                      <div key={cat.id} className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 space-y-4">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                          <span className="text-xs font-extrabold text-slate-800">{cat.categoryName}</span>
                          <button
                            onClick={() => handleAddSkill(cat.id)}
                            className="flex items-center gap-1 py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-[10px] text-indigo-600 font-extrabold rounded-lg cursor-pointer"
                            id={`btn_add_sk_${cat.id}`}
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>스택 추가</span>
                          </button>
                        </div>

                        {cat.items.length === 0 ? (
                          <p className="text-[11px] text-slate-400 text-center py-2">등록 기술이 없습니다.</p>
                        ) : (
                          <div className="space-y-3">
                            {cat.items.map((skill) => (
                              <div key={skill.name} className="flex items-center justify-between bg-white px-3 py-2 rounded-xl border border-slate-100 gap-3" id={`editor_sk_${skill.name}`}>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-slate-800 truncate">{skill.name}</p>
                                  {/* Level dot previews */}
                                  <div className="flex gap-0.5 mt-0.5">
                                    {Array.from({ length: 5 }).map((_, idx) => (
                                      <div 
                                        key={idx} 
                                        className={`w-1.5 h-1.5 rounded-full ${idx < skill.level ? "bg-indigo-500" : "bg-slate-200"}`} 
                                      />
                                    ))}
                                  </div>
                                </div>

                                <div className="flex items-center space-x-2 shrink-0">
                                  {/* Step-down / Step-up rating logic */}
                                  <select
                                    value={skill.level}
                                    onChange={(e) => handleSkillLevelChange(cat.id, skill.name, Number(e.target.value))}
                                    className="px-1.5 py-1 text-[11px] bg-slate-50 border border-slate-100 rounded"
                                    id={`select_b_skill_level_${skill.name}`}
                                  >
                                    <option value="1">Lv.1</option>
                                    <option value="2">Lv.2</option>
                                    <option value="3">Lv.3</option>
                                    <option value="4">Lv.4</option>
                                    <option value="5">Lv.5</option>
                                  </select>
                                  
                                  <button
                                    onClick={() => handleDeleteSkill(cat.id, skill.name)}
                                    className="p-1 text-slate-300 hover:text-red-500 hover:bg-slate-50 rounded"
                                    id={`btn_delete_skill_${skill.name}`}
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* 3. PROJECTS TAB */}
                {builderTab === "projects" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-indigo-50 pb-2">
                      <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">주요 산출물 원장</h4>
                      <button
                        onClick={handleAddProject}
                        className="flex items-center gap-1 py-1 px-3 bg-indigo-50 hover:bg-indigo-100 text-xs text-indigo-600 font-extrabold rounded-lg cursor-pointer"
                        id="btn_b_add_project"
                      >
                        <PlusCircle className="w-3.5 h-3.5" />
                        <span>프로젝트 카드 추가</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {profile.projects.map((proj, idx) => (
                        <div key={proj.id} className="bg-slate-50/50 border border-slate-200/50 p-4 rounded-2xl relative space-y-3" id={`editor_project_inner_${proj.id}`}>
                          
                          {/* Top row with index and delete */}
                          <div className="flex justify-between items-center bg-indigo-50/10 -m-4 mb-1 p-3.5 border-b border-slate-150">
                            <span className="text-xs font-bold text-slate-600 font-display">프로젝트 카드 #{idx + 1}</span>
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="text-slate-400 hover:text-red-500 p-1"
                              id={`b_btn_del_proj_${proj.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">제목 (Title)</label>
                            <input
                              type="text"
                              value={proj.title}
                              onChange={(e) => handleUpdateProject(proj.id, "title", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg"
                              id={`inp_b_proj_title_${proj.id}`}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">개발 기한</label>
                              <input
                                type="text"
                                value={proj.period}
                                onChange={(e) => handleUpdateProject(proj.id, "period", e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg"
                                id={`inp_b_proj_period_${proj.id}`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">나의 역할</label>
                              <input
                                type="text"
                                value={proj.role}
                                onChange={(e) => handleUpdateProject(proj.id, "role", e.target.value)}
                                className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg"
                                id={`inp_b_proj_role_${proj.id}`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">기술 스택 해시태그 (콤마로 구분)</label>
                            <input
                              type="text"
                              value={proj.tags.join(", ")}
                              onChange={(e) => {
                                const newTags = e.target.value.split(",").map(t => t.trim()).filter(Boolean);
                                handleUpdateProject(proj.id, "tags", newTags);
                              }}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg"
                              placeholder="React, Node.js"
                              id={`inp_b_proj_tags_${proj.id}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">이미지 리소스 주소 (CDN or Picsum placeholder)</label>
                            <input
                              type="text"
                              value={proj.imageUrl}
                              onChange={(e) => handleUpdateProject(proj.id, "imageUrl", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-[11px] bg-white border border-slate-150 rounded-lg font-mono"
                              id={`inp_b_proj_img_${proj.id}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">카드 노출용 요약 설명</label>
                            <textarea
                              rows={2.5}
                              value={proj.description}
                              onChange={(e) => handleUpdateProject(proj.id, "description", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg"
                              id={`inp_b_proj_desc_${proj.id}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">자세히 보기 팝업용 설계 및 스토리 상세</label>
                            <textarea
                              rows={4}
                              value={proj.detailedDescription || ""}
                              onChange={(e) => handleUpdateProject(proj.id, "detailedDescription", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg"
                              id={`inp_b_proj_det_desc_${proj.id}`}
                            />
                          </div>

                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. EXPERIENCES TAB */}
                {builderTab === "experience" && (
                  <div className="space-y-6">
                    
                    {/* Career list edit panel */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-indigo-50 pb-2">
                        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">직무 경력 일지</span>
                        <button
                          onClick={handleAddExperience}
                          className="flex items-center gap-1 py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-[10px] text-indigo-600 font-extrabold rounded-lg cursor-pointer"
                          id="btn_b_add_exp"
                        >
                          <Plus className="w-3" />
                          <span>경력 추가</span>
                        </button>
                      </div>

                      {profile.experiences.map((exp, idx) => (
                        <div key={exp.id} className="bg-slate-50/50 border border-slate-150 p-4 rounded-xl space-y-3" id={`editor_exp_${exp.id}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-slate-400">MILestone #{idx + 1}</span>
                            <button
                              onClick={() => handleDeleteExperience(exp.id)}
                              className="text-slate-300 hover:text-red-500"
                              id={`btn_b_del_exp_${exp.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">소속 기관 / 회사명</label>
                            <input
                              type="text"
                              value={exp.company}
                              onChange={(e) => handleUpdateExperience(exp.id, "company", e.target.value)}
                              className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                              id={`inp_b_exp_comp_${exp.id}`}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">담당 직책</label>
                              <input
                                type="text"
                                value={exp.role}
                                onChange={(e) => handleUpdateExperience(exp.id, "role", e.target.value)}
                                className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                                id={`inp_b_exp_role_${exp.id}`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">재직 기간</label>
                              <input
                                type="text"
                                value={exp.period}
                                onChange={(e) => handleUpdateExperience(exp.id, "period", e.target.value)}
                                className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                                id={`inp_b_exp_period_${exp.id}`}
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">업무 및 직무 내용 설명 요약</label>
                            <textarea
                              rows={2.5}
                              value={exp.description}
                              onChange={(e) => handleUpdateExperience(exp.id, "description", e.target.value)}
                              className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                              id={`inp_b_exp_desc_${exp.id}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">업적 리스트 (콤마로 나누기)</label>
                            <textarea
                              rows={2}
                              value={exp.achievements.join(",\n")}
                              onChange={(e) => {
                                const list = e.target.value.split("\n").map(v => v.trim()).filter(Boolean);
                                handleUpdateExperience(exp.id, "achievements", list);
                              }}
                              className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded leading-normal"
                              placeholder="React 번들 사이즈 35% 최적화, 신입 사원 멘토링 주도"
                              id={`inp_b_exp_ach_${exp.id}`}
                            />
                          </div>

                        </div>
                      ))}
                    </div>

                    {/* Education list edit panel */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center border-b border-indigo-50 pb-2">
                        <span className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">학력 및 교육 일지</span>
                        <button
                          onClick={handleAddEducation}
                          className="flex items-center gap-1 py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-[10px] text-indigo-600 font-extrabold rounded-lg cursor-pointer"
                          id="btn_b_add_edu"
                        >
                          <Plus className="w-3" />
                          <span>학력 추가</span>
                        </button>
                      </div>

                      {profile.educations.map((edu) => (
                        <div key={edu.id} className="bg-slate-50/50 border border-slate-150 p-4 rounded-xl space-y-3" id={`editor_edu_${edu.id}`}>
                          <div className="flex justify-between items-center font-mono text-[9px] text-zinc-400">
                            <span>EDU RECORD</span>
                            <button
                              onClick={() => handleDeleteEducation(edu.id)}
                              className="text-slate-300 hover:text-red-500"
                              id={`btn_b_del_edu_${edu.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">학교 / 수련처</label>
                              <input
                                type="text"
                                value={edu.school}
                                onChange={(e) => handleUpdateEducation(edu.id, "school", e.target.value)}
                                className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                                id={`inp_b_edu_school_${edu.id}`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">전공 / 학위명</label>
                              <input
                                type="text"
                                value={edu.major}
                                onChange={(e) => handleUpdateEducation(edu.id, "major", e.target.value)}
                                className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                                id={`inp_b_edu_major_${edu.id}`}
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">기간</label>
                              <input
                                type="text"
                                value={edu.period}
                                onChange={(e) => handleUpdateEducation(edu.id, "period", e.target.value)}
                                className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                                id={`inp_b_edu_period_${edu.id}`}
                              />
                            </div>
                            <div>
                              <label className="block text-[10px] font-bold text-slate-400 mb-1">상세 설명</label>
                              <input
                                type="text"
                                value={edu.description || ""}
                                onChange={(e) => handleUpdateEducation(edu.id, "description", e.target.value)}
                                className="w-full px-2 py-1 text-xs bg-white border border-slate-150 rounded"
                                id={`inp_b_edu_desc_${edu.id}`}
                              />
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>

                  </div>
                )}

                {/* 5. FAQ TAB */}
                {builderTab === "faq" && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-indigo-50 pb-2">
                      <h4 className="text-xs font-extrabold text-indigo-600 uppercase tracking-wider">자주 묻는 질문(FAQ) 설정</h4>
                      <button
                        onClick={handleAddFAQ}
                        className="flex items-center gap-1 py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-[10px] text-indigo-600 font-extrabold rounded-lg cursor-pointer"
                        id="btn_b_add_faq"
                      >
                        <Plus className="w-3" />
                        <span>질답 카드 추가</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {profile.faqs.map((faq, idx) => (
                        <div key={faq.id} className="bg-slate-50/50 border border-slate-150 p-4 rounded-xl space-y-2.5" id={`editor_faq_${faq.id}`}>
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-slate-400 font-display">아코디언 항목 {idx + 1}</span>
                            <button
                              onClick={() => handleDeleteFAQ(faq.id)}
                              className="text-slate-300 hover:text-red-500"
                              id={`btn_b_del_faq_${faq.id}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">질문 문구 (Question)</label>
                            <input
                              type="text"
                              value={faq.question}
                              onChange={(e) => handleUpdateFAQ(faq.id, "question", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg font-semibold text-slate-800"
                              id={`inp_b_faq_q_${faq.id}`}
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-bold text-slate-400 mb-1">답변 상세내용 (Answer)</label>
                            <textarea
                              rows={3.5}
                              value={faq.answer}
                              onChange={(e) => handleUpdateFAQ(faq.id, "answer", e.target.value)}
                              className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-150 rounded-lg leading-relaxed text-slate-600"
                              id={`inp_b_faq_a_${faq.id}`}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* Drawer Footer controls */}
              <div className="p-4 bg-slate-50 border-t border-slate-150 shrink-0 gap-3 flex">
                <button
                  onClick={() => setIsBuilderOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md shadow-slate-900/10 cursor-pointer"
                  id="btn_b_confirm"
                >
                  에디터 닫기
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </div>
  );
}
