'use client';

import {
  ArrowDown,
  ArrowUpRight,
  ArrowUp,
  Menu,
  X,
  MessageCircle,
  Plus,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { Button } from '@/components/ui/button';
import { PracticeJourney } from '@/components/practice-journey';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';

const whatsapp =
  'https://wa.me/5561996621700?text=Ol%C3%A1%2C%20Alanna!%20Vi%20o%20conceito%20do%20seu%20escrit%C3%B3rio%20e%20gostaria%20de%20conversar.';
const navigation = [
  ['Áreas de atuação', '#atuacao'],
  ['O escritório', '#escritorio'],
  ['Equipe', '#pessoas'],
  ['Perspectivas', '#perspectivas'],
] as const;
const practices = [
  {
    title: 'Patrimônio & sucessões',
    description: 'Preservar o que foi construído. Preparar o que está por vir.',
    text: 'Um olhar integrado para patrimônio, relações familiares e continuidade. Organizamos decisões complexas com discrição, escuta e uma compreensão cuidadosa dos objetivos de cada família.',
    topics: [
      'Planejamento patrimonial',
      'Organização sucessória',
      'Empresas familiares',
    ],
  },
  {
    title: 'Negócios & sociedades',
    description: 'Segurança para decidir. Estrutura para crescer.',
    text: 'Acompanhamos os momentos decisivos de empresas e empreendedores. Da estruturação de uma sociedade às suas transformações, conectamos leitura jurídica e visão de negócio.',
    topics: [
      'Estruturação societária',
      'Relações entre sócios',
      'Contratos estratégicos',
    ],
  },
  {
    title: 'Contencioso estratégico',
    description: 'Profundidade na análise. Precisão em cada movimento.',
    text: 'Questões sensíveis pedem uma estratégia particular. Reunimos pesquisa, organização e diálogo próximo para desenhar caminhos coerentes com a realidade de cada conflito.',
    topics: [
      'Disputas empresariais',
      'Conflitos patrimoniais',
      'Negociação e mediação',
    ],
  },
  {
    title: 'Consultoria preventiva',
    description: 'Antecipar cenários é também uma forma de cuidar.',
    text: 'Uma relação de assessoria construída no dia a dia. Mapeamos pontos de atenção, revisamos processos e aproximamos o jurídico das decisões que movem a vida e os negócios.',
    topics: ['Análise de contratos', 'Governança', 'Acompanhamento consultivo'],
  },
];
const partners = [
  {
    name: 'Helena Duarte',
    role: 'SÓCIA · PATRIMÔNIO & FAMÍLIA',
    initial: 'HD',
    title: 'Continuidade também é uma forma de cuidado.',
    bio: 'Helena conduz o núcleo de patrimônio e sucessões. Na narrativa deste escritório, sua trajetória se dedica a aproximar a precisão técnica das conversas delicadas que atravessam famílias e gerações.',
    detail:
      'Seu trabalho parte de uma pergunta: o que merece ser preservado? A resposta orienta uma atuação discreta, cuidadosa e comprometida com a continuidade dos vínculos.',
  },
  {
    name: 'Alanna Alves da Costa',
    role: 'SÓCIA FUNDADORA · ESTRATÉGIA',
    initial: 'AA',
    title: 'A melhor estratégia começa por compreender.',
    bio: 'Estudante de Direito na UDF Centro Universitário, Alanna constrói, neste universo fictício, uma trajetória em disputas empresariais e planejamento patrimonial antes de fundar seu próprio escritório, em 2014.',
    detail:
      'À frente da Alves, reúne uma equipe com diferentes perspectivas e uma convicção em comum: excelência jurídica exige proximidade. Sua atuação combina pensamento estratégico, escuta e atenção rigorosa aos detalhes.',
  },
  {
    name: 'Rafael Almeida',
    role: 'SÓCIO · NEGÓCIOS & DISPUTAS',
    initial: 'RA',
    title: 'Visão de negócio. Consistência nas decisões.',
    bio: 'Rafael lidera as frentes de negócios e contencioso estratégico. Neste perfil fictício, reúne experiência na estruturação de sociedades e na condução de conflitos empresariais complexos.',
    detail:
      'Seu olhar conecta o contexto da empresa a cada decisão jurídica, com comunicação direta, construção de cenários e atenção ao que realmente importa para a organização.',
  },
];
const articles = [
  {
    category: 'PATRIMÔNIO',
    title: 'O futuro de um legado começa nas conversas de hoje.',
    text: 'Um patrimônio conta uma história. Antes de pensar em sua continuidade, é preciso compreender os valores, os vínculos e as intenções que o acompanham.\n\nConversas sobre o futuro nem sempre são simples. Mas abrir espaço para elas permite reconhecer expectativas diferentes, fazer perguntas melhores e construir decisões mais conscientes.\n\nO ponto de partida não está em uma resposta pronta. Está na disposição de escutar o que cada geração deseja levar adiante.',
  },
  {
    category: 'NEGÓCIOS',
    title: 'Crescer com intenção, decidir com perspectiva.',
    text: 'Empreender é tomar decisões antes que todas as respostas estejam disponíveis. Uma visão de longo prazo ajuda a distinguir o que é urgente daquilo que é estrutural.\n\nParceiros alinhados, responsabilidades compreendidas e conversas transparentes formam uma base importante para o amadurecimento de qualquer negócio.\n\nA assessoria que imaginamos para a Alves participa desse diálogo: próxima da realidade da empresa, atenta às suas mudanças e comprometida com a clareza.',
  },
  {
    category: 'NOSSO OLHAR',
    title: 'A escuta como primeiro movimento da estratégia.',
    text: 'Uma boa conversa revela o que um resumo nem sempre consegue registrar. O contexto, os receios e as prioridades são parte inseparável de uma questão.\n\nPor isso, nosso conceito de atuação começa pela escuta. Antes de propor um caminho, buscamos compreender a história e as pessoas que a compõem.\n\nA técnica oferece ferramentas. A atenção permite escolher como e quando usá-las. É nessa combinação que situamos a identidade deste escritório.',
  },
];
const steps = [
  [
    '01',
    'Compreender',
    'Uma conversa cuidadosa para conhecer o contexto, as pessoas e o que está em jogo.',
  ],
  [
    '02',
    'Desenhar',
    'Análise profunda e construção de uma estratégia alinhada às suas prioridades.',
  ],
  [
    '03',
    'Conduzir',
    'Execução atenta, comunicação próxima e clareza em cada etapa do caminho.',
  ],
];

function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal
      className={className}
      style={{ '--delay': delay + 'ms' } as CSSProperties}
    >
      {children}
    </div>
  );
}

function usePageMotion() {
  useEffect(() => {
    const root = document.documentElement;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let observer: IntersectionObserver | undefined;
    let resizeObserver: ResizeObserver | undefined;
    const heroImage = document.querySelector<HTMLElement>('.hero-photo');
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const height = Math.max(1, root.scrollHeight - window.innerHeight);
      root.style.setProperty(
        '--page-progress',
        String(Math.min(1, y / height)),
      );
      root.dataset.scrolled = String(y > 60);
      if (!preference.matches) {
        if (heroImage && y < window.innerHeight * 1.5)
          heroImage.style.setProperty(
            '--parallax',
            Math.min(y * 0.2, 160) + 'px',
          );
      }
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const configure = () => {
      observer?.disconnect();
      root.classList.toggle('motion-ready', !preference.matches);
      if (preference.matches) {
        heroImage?.style.setProperty('--parallax', '0px');
      } else {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer?.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.08, rootMargin: '0px 0px -35px 0px' },
        );
        document
          .querySelectorAll('[data-reveal]')
          .forEach((element) => observer?.observe(element));
      }
      schedule();
    };
    configure();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    preference.addEventListener('change', configure);
    resizeObserver = new ResizeObserver(schedule);
    resizeObserver.observe(document.body);
    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      preference.removeEventListener('change', configure);
      root.classList.remove('motion-ready');
      delete root.dataset.scrolled;
    };
  }, []);
}

export default function Home() {
  usePageMotion();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState<number | null>(null);
  const [article, setArticle] = useState<number | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    const resize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };
    window.addEventListener('keydown', escape);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('keydown', escape);
      window.removeEventListener('resize', resize);
    };
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <header className={'header' + (menuOpen ? ' menu-is-open' : '')}>
        <a
          className="brand"
          href="#inicio"
          aria-label="Alanna Alves — início"
        >
          <span className="monogram" aria-hidden="true">
            A<span>A</span>
          </span>
          <span className="brand-name">
            ALANNA ALVES<span>ADVOCACIA E CONSULTORIA</span>
          </span>
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map(([label, href]) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <a className="header-contact" href="#contato">
          Entre em contato <ArrowUpRight size={16} />
        </a>
        <Button
          ref={menuButton}
          variant="ghost"
          className="menu-toggle"
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuOpen}
          aria-controls={menuOpen ? 'mobile-nav' : undefined}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </Button>
        {menuOpen && (
          <nav
            id="mobile-nav"
            className="mobile-nav"
            aria-label="Navegação móvel"
          >
            {[...navigation, ['Contato', '#contato']].map(
              ([label, href], i) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                  <small>0{i + 1}</small>
                  {label}
                  <ArrowUpRight size={22} />
                </a>
              ),
            )}
            <p>BRASÍLIA · VISÃO SEM FRONTEIRAS</p>
          </nav>
        )}
      </header>
      <main id="conteudo">
        <section className="hero" id="inicio">
          <div className="hero-photo">
            <img
              src="/brasilia.jpg"
              alt="Arquitetura modernista do Palácio Itamaraty em Brasília"
              width="1400"
              height="930"
              fetchPriority="high"
            />
          </div>
          <div className="hero-overlay" />
          <div className="hero-content">
            <p className="eyebrow hero-enter">
              ADVOCACIA E CONSULTORIA · BRASÍLIA
            </p>
            <h1>
              <span className="line-mask">
                <span>O que importa</span>
              </span>
              <span className="line-mask">
                <span>para você,</span>
              </span>
              <span className="line-mask">
                <span>
                  <em>nos move.</em>
                </span>
              </span>
            </h1>
            <div className="hero-description hero-enter">
              <span className="vertical-rule" />
              <p>
                Patrimônio, negócios e resolução de conflitos.
                <br />
                Estratégia jurídica com atenção à sua história.
              </p>
            </div>
            <div className="hero-actions hero-enter">
              <a className="hero-primary" href="#atuacao">
                Conhecer áreas de atuação <ArrowDown size={18} />
              </a>
              <a className="hero-secondary" href="#contato">
                Falar com o escritório <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="hero-footer">
            <a href="#atuacao" className="scroll-cue">
              <span className="scroll-circle">
                <ArrowDown size={17} />
              </span>
              CONHEÇA NOSSAS ÁREAS
            </a>
            <span className="hero-location">
              BRASÍLIA, DF <span>15°47′ S — 47°52′ W</span>
            </span>
            <span className="hero-edition">
              EST. 2014 <i>—</i> UM NOVO OLHAR
            </span>
          </div>
        </section>
        <div className="concept-note">
          <span className="note-dot" /> ESTUDO DE MARCA{' '}
          <span className="note-separator">/</span> Escritório, equipe e
          trajetória apresentados como conceito fictício.
        </div>
        <nav className="quick-access" aria-label="Acesso rápido">
          <a href="#atuacao">
            <span>01</span>
            <strong>Áreas de atuação</strong>
            <span>Encontre o apoio que procura</span>
            <ArrowUpRight size={20} />
          </a>
          <a href="#pessoas">
            <span>02</span>
            <strong>Conheça a equipe</strong>
            <span>Perfis e especialidades dos sócios</span>
            <ArrowUpRight size={20} />
          </a>
          <a href="#contato">
            <span>03</span>
            <strong>Fale com a Alves</strong>
            <span>Contato direto pelo WhatsApp</span>
            <ArrowUpRight size={20} />
          </a>
        </nav>
        <PracticeJourney practices={practices} />
        <section className="section introduction" id="escritorio">
          <Reveal className="section-side">
            <p className="eyebrow">02 / O ESCRITÓRIO</p>
            <span className="side-line" />
            <p className="side-caption">
              TÉCNICA QUE SUSTENTA.
              <br />
              PROXIMIDADE QUE TRANSFORMA.
            </p>
          </Reveal>
          <div>
            <Reveal>
              <h2>
                Grandes decisões merecem
                <br />
                mais do que respostas.
                <br />
                <em>Merecem perspectiva.</em>
              </h2>
            </Reveal>
            <div className="intro-columns">
              <Reveal delay={80}>
                <p>
                  A Alves nasceu em Brasília de uma convicção de Alanna: o
                  Direito deve acompanhar a vida, compreender os negócios e
                  cuidar do que as pessoas constroem.
                </p>
              </Reveal>
              <Reveal delay={160}>
                <p>
                  Desde 2014, nossa história combina a atenção de um escritório
                  boutique com a profundidade exigida por questões complexas.
                  Poucas camadas. Diálogo direto. Envolvimento real.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <a className="text-link" href="#pessoas">
                Conheça quem está ao seu lado <ArrowUpRight size={17} />
              </a>
            </Reveal>
          </div>
        </section>
        <section className="section people" id="pessoas">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">03 / NOSSA EQUIPE</p>
              <h2>
                Conheça os profissionais
                <br />
                <em>por trás da estratégia.</em>
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p>
                Uma equipe próxima por escolha.
                <br />
                Complementar por natureza.
              </p>
            </Reveal>
          </div>
          <Reveal className="team-photo image-reveal">
            <img
              src="/equipe-editorial.webp"
              alt="Representação artística de três integrantes de um escritório fictício, em um ambiente contemporâneo"
              width="1536"
              height="1024"
              loading="lazy"
            />
            <span>ALVES / PESSOAS QUE CONSTROEM CAMINHOS</span>
          </Reveal>
          <div className="partner-grid">
            {partners.map((person, index) => (
              <Reveal delay={index * 100} key={person.name}>
                <Button
                  variant="ghost"
                  className="partner-button"
                  onClick={() => setProfile(index)}
                >
                  <span>
                    <span className="partner-role">{person.role}</span>
                    <span className="partner-name">{person.name}</span>
                  </span>
                  <span className="round-plus">
                    <Plus size={18} />
                  </span>
                </Button>
              </Reveal>
            ))}
          </div>
          <p className="image-note">
            Equipe e biografias fictícias. Retratos ilustrativos gerados para
            este conceito; não representam Alanna ou profissionais reais.
          </p>
        </section>
        <section className="method">
          <div className="section method-inner">
            <Reveal className="method-heading">
              <p className="eyebrow">04 / NOSSA MANEIRA</p>
              <h2>
                Presença em cada etapa.
                <br />
                <em>Clareza em cada decisão.</em>
              </h2>
            </Reveal>
            <div className="steps">
              {steps.map(([number, title, text], index) => (
                <Reveal delay={index * 130} key={number}>
                  <article>
                    <span className="step-number">
                      {number}
                      <span />
                    </span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal className="method-bottom">
              <span>DO PRIMEIRO DIÁLOGO AOS PRÓXIMOS PASSOS.</span>
              <a href="#contato">
                Sempre por perto <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </section>
        <section className="section perspectives" id="perspectivas">
          <div className="section-heading">
            <Reveal>
              <p className="eyebrow">05 / ARTIGOS E PERSPECTIVAS</p>
              <h2>
                Ideias e reflexões
                <br />
                <em>para suas decisões.</em>
              </h2>
            </Reveal>
            <Reveal>
              <p>
                Ideias para ampliar o olhar.
                <br />
                Reflexões para abrir conversas.
              </p>
            </Reveal>
          </div>
          <div className="article-grid">
            {articles.map((item, index) => (
              <Reveal delay={index * 100} key={item.title}>
                <Button
                  variant="ghost"
                  className="article-button"
                  onClick={() => setArticle(index)}
                >
                  <span className="article-top">
                    <span>{item.category}</span>
                    <span>0{index + 1}</span>
                  </span>
                  <span className="article-title">{item.title}</span>
                  <span className="article-bottom">
                    LER REFLEXÃO <ArrowUpRight size={20} />
                  </span>
                </Button>
              </Reveal>
            ))}
          </div>
        </section>
        <section className="contact" id="contato">
          <div className="contact-top">
            <Reveal>
              <p className="eyebrow">O PRÓXIMO PASSO COMEÇA AQUI.</p>
              <h2>
                Vamos falar sobre
                <br />
                <em>o que importa?</em>
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <a
                className="contact-orbit"
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Iniciar uma conversa com Alanna pelo WhatsApp"
              >
                <ArrowUpRight strokeWidth={1} size={70} />
              </a>
            </Reveal>
          </div>
          <div className="contact-details">
            <Reveal>
              <span className="detail-label">UMA CONVERSA, DIRETAMENTE.</span>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={17} /> (61) 99662-1700{' '}
                <ArrowUpRight size={15} />
              </a>
            </Reveal>
            <Reveal delay={100}>
              <span className="detail-label">NOSSO LUGAR NO MUNDO.</span>
              <p>
                Brasília, Distrito Federal
                <br />
                <span>Presença local. Perspectiva nacional.</span>
              </p>
            </Reveal>
            <Reveal delay={200}>
              <span className="detail-label">CADA HISTÓRIA TEM SEU TEMPO.</span>
              <p>
                Escuta atenta, desde o início.
                <br />
                <span>Este contato é para a apresentação do conceito.</span>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="footer-main">
          <a className="footer-wordmark" href="#inicio">
            Alves<span>ADVOCACIA E CONSULTORIA</span>
          </a>
          <div className="footer-nav">
            {navigation.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
          </div>
          <a className="back-top" href="#inicio">
            Voltar ao topo <ArrowUp size={18} />
          </a>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} · Alanna Alves da Costa
            <br />
            <span>
              Conceito de escritório fictício. Não constitui oferta de serviços
              jurídicos.
            </span>
          </p>
          <a
            href="https://bluelapisroad.wordpress.com/2013/10/25/day-14-4-of-5-palacio-itamaraty-brasilia-brazil/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fotografia de Brasília: Blue Lapis Road <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
      <Dialog
        open={profile !== null}
        onOpenChange={(open) => {
          if (!open) setProfile(null);
        }}
      >
        <DialogContent className="editorial-dialog" showCloseButton={false}>
          <DialogClose className="dialog-close" aria-label="Fechar perfil">
            <X size={22} />
          </DialogClose>
          {profile !== null && (
            <>
              <p className="eyebrow">PESSOAS / PERFIL FICTÍCIO</p>
              <span className="dialog-monogram" aria-hidden="true">
                {partners[profile].initial}
              </span>
              <DialogTitle className="dialog-title">
                {partners[profile].name}
              </DialogTitle>
              <DialogDescription className="dialog-role">
                {partners[profile].role}
              </DialogDescription>
              <h3>{partners[profile].title}</h3>
              <p>{partners[profile].bio}</p>
              <p>{partners[profile].detail}</p>
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link"
              >
                Conversar sobre o conceito <ArrowUpRight size={16} />
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
      <Dialog
        open={article !== null}
        onOpenChange={(open) => {
          if (!open) setArticle(null);
        }}
      >
        <DialogContent
          className="editorial-dialog article-dialog"
          showCloseButton={false}
        >
          <DialogClose className="dialog-close" aria-label="Fechar reflexão">
            <X size={22} />
          </DialogClose>
          {article !== null && (
            <>
              <p className="eyebrow">
                PERSPECTIVAS / {articles[article].category}
              </p>
              <DialogTitle className="dialog-title">
                {articles[article].title}
              </DialogTitle>
              <DialogDescription className="dialog-role">
                Caderno editorial Alves · Texto ilustrativo
              </DialogDescription>
              {articles[article].text.split('\n\n').map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <p className="article-disclaimer">
                Reflexão criada para este escritório fictício. Não é orientação
                jurídica.
              </p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
