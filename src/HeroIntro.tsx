import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useEffect, useState, useSyncExternalStore } from 'react';
import { ArrowUpRight, ChevronDown, FileText, Github } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;
const mobileQuery = '(max-width: 700px)';
function subscribeToViewport(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}
const getMobileSnapshot = () => window.matchMedia(mobileQuery).matches;

export default function HeroIntro({ github }: { github: string }) {
  const reduceMotion = useReducedMotion();
  const isMobile = useSyncExternalStore(subscribeToViewport, getMobileSnapshot, () => false);
  const textDelay = isMobile ? 2.2 : 1.5;
  // The scroll cue only matters before the visitor has started scrolling.
  const [atTop, setAtTop] = useState(true);
  const [cueShown, setCueShown] = useState(false);
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const scrollToAbout = () => document.getElementById('about')?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
  const connection = <span className="accent-text hero-underline">잇는<motion.span className="hero-underline-stroke" aria-hidden="true" initial={reduceMotion ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : textDelay, ease }} /></span>;
  const titleLines = isMobile
    ? ['하드웨어와', <>소프트웨어를 {connection}</>, '개발자, 곽혜민입니다.']
    : [<>하드웨어와 소프트웨어를 {connection}</>, '개발자, 곽혜민입니다.'];
  const lines: Variants = {
    hidden: { y: '110%', opacity: 0 },
    visible: (index: number) => ({
      y: '0%', opacity: 1,
      transition: { duration: reduceMotion ? 0 : 0.65, delay: reduceMotion ? 0 : 0.15 + index * 0.7, ease },
    }),
  };
  const fadeIn = (delay: number) => ({
    initial: reduceMotion ? false as const : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: reduceMotion ? 0 : 0.3, delay: reduceMotion ? 0 : delay },
  });

  return <section className="hero page-width">
    <div className="hero-left">
      <motion.div className="eyebrow" {...fadeIn(0)}>EMBEDDED SOFTWARE · PORTFOLIO</motion.div>
      <motion.h1 initial={reduceMotion ? false : 'hidden'} animate="visible">
        {titleLines.map((line, index) => <span className="hero-title-line" key={index}><motion.span className="hero-line-content" custom={index} variants={lines}>{line}</motion.span></span>)}
      </motion.h1>
      <motion.div className="hero-summary" {...fadeIn(textDelay)}>
        <p>C/C++, STM32, Linux 기반 프로젝트를 통해 장치의 입력부터 동작, 사용자 화면까지 연결하는 경험을 쌓고 있습니다.</p>
      </motion.div>
      <motion.ul className="hero-tech" aria-label="주요 기술" {...fadeIn(textDelay + 0.1)}>{['C/C++', 'STM32', 'Linux', 'FPGA'].map(tech => <li key={tech}>{tech}</li>)}</motion.ul>
      <motion.div className="hero-cta" {...fadeIn(textDelay + 0.2)} onFocusCapture={event => {
        // Keyboard navigation must never land on an invisible action.
        event.currentTarget.style.opacity = '1';
      }}>
        <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' })}>프로젝트 살펴보기 <ArrowUpRight size={17}/></button>
        <a className="btn-plain" href={github} target="_blank" rel="noreferrer"><Github size={19}/> GitHub <ArrowUpRight size={15}/></a>
        <a className="btn-plain" href="/project-description.pdf" target="_blank" rel="noreferrer"><FileText size={19}/> 프로젝트 기술서 <ArrowUpRight size={15}/></a>
      </motion.div>
    </div>
    <motion.button type="button" className="hero-scroll-cue" aria-label="아래로 스크롤해서 소개 보기" onClick={scrollToAbout}
      tabIndex={atTop ? 0 : -1} style={{ pointerEvents: atTop ? 'auto' : 'none' }}
      initial={reduceMotion ? false : { opacity: 0 }} animate={{ opacity: atTop ? 1 : 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.3, delay: atTop && !cueShown && !reduceMotion ? textDelay + 0.5 : 0 }}
      onAnimationComplete={() => setCueShown(true)}>
      <span>SCROLL</span>
      <motion.span className="hero-scroll-arrow" aria-hidden="true"
        animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}><ChevronDown size={20} strokeWidth={1.6} /></motion.span>
    </motion.button>
  </section>;
}
