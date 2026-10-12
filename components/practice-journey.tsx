'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  LayoutGrid,
  MoveHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type Practice = {
  title: string;
  description: string;
  text: string;
  topics: string[];
};

export function PracticeJourney({ practices }: { practices: Practice[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [allVisible, setAllVisible] = useState(false);
  const [active, setActive] = useState(0);
  const [mode, setMode] = useState<'grid' | 'pinned' | 'swipe'>('grid');
  const geometry = useRef({ travel: 0, step: 0, top: 82 });

  useEffect(() => {
    const section = sectionRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!section || !viewport || !track) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let currentMode = 'grid';
    const update = () => {
      frame = 0;
      if (currentMode === 'grid') return;
      const { travel, step, top } = geometry.current;
      const distance =
        currentMode === 'pinned'
          ? Math.max(
              0,
              Math.min(travel, top - section.getBoundingClientRect().top),
            )
          : viewport.scrollLeft;
      if (currentMode === 'pinned')
        track.style.transform = `translate3d(${-distance}px,0,0)`;
      const next = Math.min(
        practices.length - 1,
        Math.max(0, Math.round(distance / Math.max(step, 1))),
      );
      setActive((previous) => (previous === next ? previous : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const measure = () => {
      currentMode =
        allVisible || reduced.matches
          ? 'grid'
          : innerWidth > 900 && innerHeight >= 740
            ? 'pinned'
            : 'swipe';
      section.dataset.mode = currentMode;
      setMode(currentMode as 'grid' | 'pinned' | 'swipe');
      track.style.transform = '';
      section.style.height = '';
      const first = track.children[0] as HTMLElement | undefined;
      const second = track.children[1] as HTMLElement | undefined;
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      geometry.current = {
        travel,
        step: first && second ? second.offsetLeft - first.offsetLeft : 1,
        top: 82,
      };
      if (currentMode === 'pinned') {
        viewport.scrollLeft = 0;
        section.style.height = `${innerHeight - 82 + travel}px`;
      }
      schedule();
    };
    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(viewport);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', measure);
    viewport.addEventListener('scroll', schedule, { passive: true });
    reduced.addEventListener('change', measure);
    return () => {
      resize.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', measure);
      viewport.removeEventListener('scroll', schedule);
      reduced.removeEventListener('change', measure);
      track.style.transform = '';
      section.style.height = '';
      delete section.dataset.mode;
    };
  }, [allVisible, practices.length]);

  const navigate = (index: number, keyboardFocus = false) => {
    if (mode === 'grid') return;
    const section = sectionRef.current;
    if (!section) return;
    const { travel, step, top } = geometry.current;
    const distance = Math.min(travel, Math.max(0, index * step));
    if (mode === 'pinned')
      window.scrollTo({
        top: scrollY + section.getBoundingClientRect().top - top + distance,
        behavior: keyboardFocus ? 'instant' : 'smooth',
      });
    else
      viewportRef.current?.scrollTo({
        left: distance,
        behavior: keyboardFocus ? 'instant' : 'smooth',
      });
  };

  return (
    <section
      ref={sectionRef}
      className="journey"
      id="atuacao"
      aria-labelledby="journey-title"
    >
      <div className="journey-stage">
        <div className="journey-heading">
          <div>
            <p className="eyebrow">01 / ÁREAS DE ATUAÇÃO</p>
            <h2 id="journey-title">
              Como podemos <em>ajudar.</em>
            </h2>
          </div>
          <Button
            variant="ghost"
            className="view-toggle"
            aria-pressed={allVisible}
            onClick={() => {
              const top = sectionRef.current
                ? scrollY + sectionRef.current.getBoundingClientRect().top - 90
                : scrollY;
              setAllVisible(!allVisible);
              window.scrollTo({ top: Math.max(0, top), behavior: 'instant' });
            }}
          >
            <LayoutGrid size={16} />
            {allVisible ? 'Explorar lateralmente' : 'Ver todas de uma vez'}
          </Button>
        </div>
        <div
          className="journey-viewport"
          ref={viewportRef}
          aria-label="Áreas de atuação"
          tabIndex={mode === 'swipe' ? 0 : undefined}
        >
          <div className="journey-track" ref={trackRef}>
            {practices.map((practice, index) => (
              <article
                className="journey-card"
                id={`area-${index}`}
                key={practice.title}
                onFocusCapture={() => {
                  if (active !== index) navigate(index, true);
                }}
              >
                <div className="journey-card-top">
                  <span>0{index + 1}</span>
                  <span>ALVES · ADVOCACIA</span>
                </div>
                <h3>{practice.title}</h3>
                <p className="journey-description">{practice.description}</p>
                <p className="journey-copy">{practice.text}</p>
                <ul>
                  {practice.topics.map((topic) => (
                    <li key={topic}>{topic}</li>
                  ))}
                </ul>
                <a className="journey-cta" href="#contato">
                  Conversar sobre esta área <ArrowUpRight size={18} />
                </a>
              </article>
            ))}
          </div>
        </div>
        <div className="journey-bottom">
          <div className="journey-tabs" aria-label="Escolher área">
            {practices.map((practice, index) => (
              <Button
                key={practice.title}
                variant="ghost"
                className="journey-tab"
                aria-label={practice.title}
                aria-current={
                  mode !== 'grid' && active === index ? 'step' : undefined
                }
                onClick={() => navigate(index)}
                disabled={mode === 'grid'}
              >
                <span>0{index + 1}</span>
                <span className="journey-tab-name">
                  {['Patrimônio', 'Negócios', 'Disputas', 'Consultoria'][index]}
                </span>
              </Button>
            ))}
          </div>
          <div className="journey-controls">
            <span className="journey-hint">
              <MoveHorizontal size={15} />
              {mode === 'pinned'
                ? 'Role para explorar'
                : mode === 'swipe'
                  ? 'Deslize para explorar'
                  : 'Todas as áreas'}
            </span>
            <Button
              variant="outline"
              aria-label="Área anterior"
              disabled={mode === 'grid' || active === 0}
              onClick={() => navigate(active - 1)}
            >
              <ArrowLeft size={18} />
            </Button>
            <Button
              variant="outline"
              aria-label="Próxima área"
              disabled={mode === 'grid' || active === practices.length - 1}
              onClick={() => navigate(active + 1)}
            >
              <ArrowRight size={18} />
            </Button>
          </div>
        </div>
        <a className="journey-skip" href="#escritorio">
          Continuar para o escritório <ArrowDownIcon />
        </a>
      </div>
    </section>
  );
}

function ArrowDownIcon() {
  return <ArrowRight size={14} style={{ transform: 'rotate(90deg)' }} />;
}
