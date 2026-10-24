import { motion, useReducedMotion, type Variants } from 'motion/react';
import { useSyncExternalStore } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

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
      </motion.div>
    </div>
  </section>;
}
