import { useEffect, useLayoutEffect, useState } from 'react';
import { Link, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, CalendarDays, Cpu, ExternalLink, Github, GraduationCap, Layers3, Mail, MapPin, Menu, Monitor, Phone, UserRound, X } from 'lucide-react';
import { projects, type Project } from './data/projects';
import { profile } from './data/profile';
import HeroIntro from './HeroIntro';

const userGitHub = 'https://github.com/hyehye12';
const projectCount = String(projects.length).padStart(2, '0');

function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  const jump = (id: string) => {
    setOpen(false);
    if (location.pathname !== '/') navigate('/#' + id);
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };
  return <header className="site-header">
    <div className="page-width header-inside">
      <Link to="/" className="brand" aria-label="곽혜민 포트폴리오 홈"><span className="brand-mark">h.</span><span>HYE MIN KWAK <span className="brand-dot">/</span> DEV</span></Link>
      <nav className="desktop-nav" aria-label="주 메뉴">
        <button onClick={() => jump('about')}>About</button>
        <button onClick={() => jump('projects')}>Projects</button>
        <button onClick={() => jump('skills')}>Skills</button>
        <button onClick={() => jump('journey')}>Education</button>
      </nav>
      <a className="header-contact" href={userGitHub} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a>
      <button className="mobile-menu" aria-label={open ? '메뉴 닫기' : '메뉴 열기'} onClick={() => setOpen(x => !x)}>{open ? <X size={21} /> : <Menu size={21} />}</button>
    </div>
    {open && <nav className="mobile-nav" aria-label="모바일 메뉴">{[['about','About'],['projects','Projects'],['skills','Skills'],['journey','Education']].map(([id,t]) => <button key={id} onClick={() => jump(id)}>{t}</button>)}</nav>}
  </header>;
}

function ImagePanel({ project, detail = false }: { project: Project; detail?: boolean }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [project.image]);
  if (project.videos?.length) return <div className={`project-video-list ${detail ? 'detail-video-list' : ''}`}>
    {(detail ? project.videos : project.videos.slice(0, 1)).map(video => <figure key={video.src}>
      <video controls playsInline preload="metadata" aria-label={video.label} src={`${video.src}#t=0.1`} />
      <figcaption>{video.label}</figcaption>
    </figure>)}
  </div>;
  return <div className={`project-visual visual-${project.fallback} ${detail ? 'detail-visual' : ''}`}>
    {project.image && !failed ? <img src={project.image} alt={`${project.title} 프로젝트 화면 및 하드웨어`} loading="lazy" onError={() => setFailed(true)} /> : <div className="visual-fallback" aria-hidden="true">
      {project.fallback === 'fan' && <><span className="circuit-lines"/><Cpu size={72} strokeWidth={1.1} /></>}
      {project.fallback === 'vehicle' && <><span className="circuit-lines"/><Monitor size={76} strokeWidth={1.1} /></>}
      {project.fallback === 'pcb' && <><span className="circuit-lines"/><Layers3 size={76} strokeWidth={1.1} /></>}
      {project.fallback === 'fpga' && <div className="fpga-illustration"><div className="fpga-number">12<span>:</span>34<span>:</span>56</div><div className="fpga-line"><i/><i/><i/><i/><i/><i/><i/><i/></div><span>FPGA · VERILOG · FSM</span></div>}
    </div>}
    <span className="image-index">{project.index} / {projectCount}</span>
  </div>;
}

function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card group">
    {project.videos?.length ? <ImagePanel project={project} /> : <Link to={`/projects/${project.slug}`} aria-label={`${project.title} 상세 보기`}><ImagePanel project={project} /></Link>}
    <Link to={`/projects/${project.slug}`} className="project-card-link">
    <div className="project-card-meta"><span>{project.category}</span><ArrowUpRight size={17}/></div>
    <h3>{project.title}</h3><p>{project.summary}</p><p className="project-role">담당 · {project.role}</p>
    <div className="tag-list">{project.tags.slice(0,4).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
    </Link>
  </article>;
}

function AboutMe() {
  const fields = [
    { label: '이름', value: profile.name, Icon: UserRound },
    { label: '생년월일', value: profile.birthDate, Icon: CalendarDays },
    { label: '위치', value: profile.location, Icon: MapPin },
    { label: '연락처', value: profile.phone, Icon: Phone },
    { label: '이메일', value: profile.email, Icon: Mail },
    { label: '학력', value: profile.education, Icon: GraduationCap },
  ];
  return <section className="about-section page-width" id="about" aria-labelledby="about-heading">
    <div className="about-heading"><span className="section-label">PROFILE</span><h2 id="about-heading">ABOUT ME</h2></div>
    {profile.introduction.trim() && <p className="about-introduction">{profile.introduction}</p>}
    <dl className="profile-grid">
      {fields.map(({ label, value, Icon }) => <div className="profile-item" key={label}>
        <Icon className="profile-icon" size={28} strokeWidth={1.6} aria-hidden="true" />
        <div><dt>{label}</dt><dd>{value.trim() || <span className="profile-empty" aria-label="미입력">—</span>}</dd></div>
      </div>)}
    </dl>
  </section>;
}

const featuredSlugs = ['avr-auto-car', 'smart-fan', 'fpga-clock', 'jetson-rps-game'];
const featuredProjects = featuredSlugs.flatMap(slug => projects.filter(project => project.slug === slug));
const otherProjects = projects.filter(project => !featuredSlugs.includes(project.slug));

function Home() {
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    // Explicit section links still work, without a delayed smooth scroll during the intro.
    document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant' });
  }, [location.hash, location.key]);
  return <main>
    <HeroIntro github={userGitHub} />

    <AboutMe />

    <section className="section projects-section" id="projects"><div className="page-width">
      <div className="section-heading"><div><div className="section-label">01 / SELECTED WORK</div><h2>Selected <span>Projects.</span></h2><p>프로젝트별 구현 내용과 담당 업무를 정리했습니다.</p></div><span className="section-counter">{String(featuredProjects.length).padStart(2, '0')} FEATURED / {projectCount} TOTAL</span></div>
      <div className="project-grid">{featuredProjects.map(project => <ProjectCard key={project.slug} project={project}/>)}</div>
      {otherProjects.length > 0 && <>
        <div className="projects-toggle-row">
          <button className="projects-toggle" type="button" aria-expanded={showMore} aria-controls="other-projects" onClick={() => setShowMore(value => !value)}>
            {showMore ? 'Show less' : `Show more (${otherProjects.length})`}<span aria-hidden="true">{showMore ? '−' : '+'}</span>
          </button>
        </div>
        <div id="other-projects" hidden={!showMore}>
          {showMore && <><h3 className="other-projects-heading">Other Projects</h3><div className="project-grid">{otherProjects.map(project => <ProjectCard key={project.slug} project={project}/>)}</div></>}
        </div>
      </>}
    </div></section>

    <section className="section skills-section" id="skills"><div className="page-width skills-layout">
      <div className="skills-intro"><div className="section-label">02 / TECH STACK</div><h2>Tools &amp;<br/><span>Technologies.</span></h2><p>프로젝트 및 교육을 통해 사용 경험을 쌓은 기술입니다. </p></div>
      <div className="skills-grid">
        <SkillBox n="01" title="Programming" items={['C', 'C++', 'Python', 'Verilog HDL', 'TypeScript']} />
        <SkillBox n="02" title="Embedded & Hardware" items={['STM32 (Cortex-M4)', 'ATmega128A', 'Jetson Orin Nano', 'FPGA']} />
        <SkillBox n="03" title="OS & Interfaces" items={['Linux', 'GPIO', 'UART', 'I²C', 'PWM']} />
        <SkillBox n="04" title="Frameworks & Tools" items={['Qt / PyQt5', 'Flask', 'OpenCV', 'TensorRT', 'Git / GitHub', 'Vivado']} />
      </div>
    </div></section>

    <section className="section journey-section" id="journey"><div className="page-width">
      <div className="section-heading"><div><div className="section-label">03 / BACKGROUND</div><h2>Learning <span>Journey.</span></h2><p>교육에서 프로젝트, 실제 개발 경험으로 이어온 과정입니다.</p></div></div>
      <div className="journey-grid">
        <div className="journey-panel"><div className="panel-top"><span>EDUCATION</span><span>01</span></div><div className="timeline"><div className="timeline-row"><div className="timeline-marker"/><div><div className="timeline-eyebrow">IN PROGRESS</div><h3>시스템반도체 SW 개발자 양성과정 2기</h3><p>서울상공회의소 · 임베디드 SW, STM32, FPGA 및 Linux 학습</p></div></div><div className="timeline-row"><div className="timeline-marker"/><div><div className="timeline-eyebrow">COMPLETED</div><h3>프론트엔드 웹서비스 개발자 양성과정</h3><p>웹 개발 및 팀 프로젝트 수행</p></div></div></div></div>
        <div className="journey-panel"><div className="panel-top"><span>EXPERIENCE & AWARDS</span><span>02</span></div><div className="timeline"><div className="timeline-row"><div className="timeline-marker"/><div><div className="timeline-eyebrow">AWARD</div><h3>팀 프로젝트 우수상</h3><p>웹서비스 개발 교육과정 내 팀 프로젝트 수상</p></div></div><div className="timeline-row"><div className="timeline-marker"/><div><div className="timeline-eyebrow">INTERNSHIP · 2 MONTHS</div><h3>웹서비스 개발 인턴십</h3><p>웹 개발 실무 및 팀 협업 경험</p></div></div></div></div>
      </div>
    </div></section>

    <section className="contact-section" id="contact"><div className="page-width contact-inner"><div className="section-label">04 / GET IN TOUCH</div><h2>함께 만들어갈<span>기회를 찾고 있습니다.</span></h2><p>프로젝트 구현 과정과 소스코드는 GitHub에서 확인할 수 있습니다.</p><a className="contact-btn" href={userGitHub} target="_blank" rel="noreferrer"><Github size={20}/> GitHub 방문하기 <ArrowUpRight size={18}/></a></div></section>
  </main>;
}

function SkillBox({n,title,items}:{n:string;title:string;items:string[]}) {return <div className="skill-box"><div className="skill-title"><span>{n}</span><h3>{title}</h3></div><div className="tag-list">{items.map(item=><span className="tag" key={item}>{item}</span>)}</div></div>}

function ProjectDetail() {
  const {slug} = useParams();
  const project = projects.find(p => p.slug === slug);
  useEffect(() => {window.scrollTo(0,0)}, [slug]);
  if (!project) return <main className="notfound page-width"><h1>프로젝트를 찾을 수 없습니다.</h1><Link to="/">홈으로 돌아가기 <ArrowRight size={16}/></Link></main>;
  const i = projects.indexOf(project);
  const next = projects[(i+1)%projects.length];
  return <main className="project-detail page-width">
    <Link to="/#projects" className="back-link"><ArrowLeft size={17}/> 모든 프로젝트</Link>
    <div className="detail-heading"><div className="section-label">PROJECT {project.index} <span className="eyebrow-divider">/</span> {project.category}</div><h1>{project.title}</h1><p>{project.subtitle}</p><div className="detail-chips">{project.tags.map(tag=><span className="tag" key={tag}>{tag}</span>)}</div></div>
    <ImagePanel project={project} detail />
    <div className="detail-layout"><aside className="detail-aside"><div className="aside-block"><span>PROJECT TYPE</span><b>{project.category}</b></div><div className="aside-block"><span>MY ROLE</span><b>{project.role}</b></div><div className="aside-block"><span>TECHNOLOGIES</span><div className="tag-list">{project.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div></div>{project.github && <a className="detail-github" href={project.github} target="_blank" rel="noreferrer"><Github size={18}/> 프로젝트 저장소 <ArrowUpRight size={17}/></a>}</aside>
      <div className="detail-body">
        <section className="detail-group"><div className="section-label">OVERVIEW</div><h2>프로젝트 소개</h2><p>{project.description}</p></section>
        <section className="detail-group"><div className="section-label">MY CONTRIBUTION</div><h2>담당 업무</h2><ul className="feature-list">{project.features.map((feature,index)=><li key={feature}><span>{String(index+1).padStart(2,'0')}</span>{feature}</li>)}</ul></section>
        {project.repositoryNote && <section className="detail-group"><div className="section-label">REPOSITORY</div><h2>저장소 안내</h2><p>{project.repositoryNote}</p></section>}
        {project.resources && <section className="detail-group"><div className="section-label">RESOURCES</div><h2>프로젝트 자료</h2><div className="project-resources">{project.resources.map(resource => <a className="detail-github" key={resource.url} href={resource.url} target="_blank" rel="noreferrer">{resource.label}<ArrowUpRight size={17}/></a>)}</div></section>}
      </div>
    </div>
    <div className="next-project"><span>NEXT PROJECT</span><Link to={`/projects/${next.slug}`}>{next.title}<ArrowUpRight size={25}/></Link></div>
  </main>;
}

function Footer(){return <footer className="site-footer"><div className="page-width footer-inside"><span>© 2026 HYE MIN KWAK</span><span>BUILT WITH CURIOSITY & CODE.</span><a href={userGitHub} target="_blank" rel="noreferrer">GITHUB <ExternalLink size={12}/></a></div></footer>}

export default function App() {
  const location=useLocation();
  useEffect(()=>{document.title= location.pathname.startsWith('/projects/') ? `${projects.find(p=>location.pathname.endsWith(p.slug))?.title??'Project'} | 곽혜민` : '곽혜민 | Embedded Software Developer'},[location.pathname]);
  return <><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/projects/:slug" element={<ProjectDetail/>}/><Route path="*" element={<main className="notfound page-width"><h1>페이지를 찾을 수 없습니다.</h1><Link to="/">홈으로 돌아가기 <ArrowRight size={16}/></Link></main>}/></Routes><Footer/></>;
}
