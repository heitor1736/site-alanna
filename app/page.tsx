'use client';

import { ArrowDown, ArrowUpRight, ArrowUp, Menu, X, MessageCircle, MapPin } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const whatsapp = 'https://wa.me/5561998160407?text=Ol%C3%A1%2C%20Vit%C3%B3ria!%20Conheci%20seu%20site%20e%20gostaria%20de%20conversar.';
const links = [['Sobre', '#sobre'], ['Formação', '#formacao'], ['Princípios', '#principios']] as const;
const principles = [
  { number: 'I', title: 'Escuta atenta', text: 'Compreender o contexto, acolher as perguntas e reconhecer a singularidade de cada história. A atenção às pessoas vem primeiro.' },
  { number: 'II', title: 'Estudo com rigor', text: 'Cultivar o pensamento crítico, a pesquisa cuidadosa e o aprendizado contínuo como fundamentos da formação jurídica.' },
  { number: 'III', title: 'Clareza no diálogo', text: 'Valorizar uma comunicação acessível, respeitosa e objetiva. Conhecimento faz mais sentido quando pode ser compreendido.' },
];
const questions = [
  { title: 'Em que momento da formação Vitória está?', text: 'Vitória é formanda em Direito pela Universidade de Brasília. Este site é uma apresentação pessoal e acadêmica dessa etapa de sua trajetória.' },
  { title: 'Este site oferece consultas jurídicas?', text: 'Neste momento, este é um portfólio de apresentação e formação. O contato disponível é para conversas, conexões e oportunidades profissionais; não corresponde à contratação de serviços advocatícios.' },
  { title: 'Como entrar em contato?', text: 'O contato é feito diretamente pelo WhatsApp, no número (61) 99816-0407. Ao iniciar a conversa, apresente-se e conte brevemente o motivo do contato. Não é necessário enviar documentos ou informações sensíveis.' },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); } };
    const closeOnDesktop = () => { if (window.innerWidth > 760) setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('resize', closeOnDesktop);
    return () => { window.removeEventListener('keydown', closeOnEscape); window.removeEventListener('resize', closeOnDesktop); };
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <header className="header">
        <a className="brand" href="#inicio" aria-label="Vitória Marinho — início"><span className="monogram" aria-hidden="true">V<span>M</span></span><span className="brand-name">VITÓRIA MARINHO<span>DIREITO & HUMANIDADE</span></span></a>
        <nav className="desktop-nav" aria-label="Navegação principal">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
        <a className="header-contact" href="#contato">Vamos conversar <ArrowUpRight size={15}/></a>
        <Button ref={menuButton} className="menu-toggle" variant="ghost" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} aria-controls={menuOpen ? 'mobile-nav' : undefined} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</Button>
        {menuOpen && <nav id="mobile-nav" className="mobile-nav" aria-label="Navegação móvel">{[...links, ['Contato', '#contato']].map(([label, href]) => <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowUpRight size={20}/></a>)}</nav>}
      </header>
      <main id="conteudo">
        <section className="hero" id="inicio" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span className="tiny-line"/> BRASÍLIA, DF <span className="small-dot">·</span> DIREITO — UnB</p>
            <h1 id="hero-title">O Direito começa<br/>com um olhar<br/><em>humano.</em></h1>
            <p className="hero-intro">Sou Vitória Marinho, formanda em Direito pela Universidade de Brasília. Uma trajetória em construção, com atenção às pessoas e respeito às suas histórias.</p>
            <a className="primary-link" href="#sobre">Conheça minha trajetória <ArrowUpRight size={19}/></a>
            <div className="hero-bottom"><span>ESCUTA. CRITÉRIO. PROPÓSITO.</span><a href="#sobre" aria-label="Rolar para conhecer Vitória"><ArrowDown size={17}/></a></div>
          </div>
          <figure className="hero-image"><img src="/brasilia.jpg" alt="Arcos de concreto do Palácio Itamaraty refletidos na água, em Brasília" fetchPriority="high" width="1400" height="930"/><div className="image-shade"/><div className="image-caption"><span>RAÍZES EM BRASÍLIA.<br/>OLHAR PARA O FUTURO.</span><span className="image-coordinate">15°47′ S<br/>47°52′ W</span></div><figcaption className="photo-location">01 / BRASÍLIA, DISTRITO FEDERAL</figcaption></figure>
        </section>
        <div className="education-strip"><span className="strip-mark">UnB<span>UNIVERSIDADE<br/>DE BRASÍLIA</span></span><p>Formação pública. Pensamento crítico. Compromisso humano.</p><span className="strip-end">DIREITO <span>↗</span></span></div>
        <section className="section about" id="sobre"><p className="eyebrow">01 — SOBRE VITÓRIA</p><div><h2>Antes de cada questão,<br/>existe <em>uma história.</em></h2><p>É com esse olhar que construo minha trajetória no Direito. Sou Vitória Marinho, formanda pela Universidade de Brasília, em uma etapa de aprofundamento, descobertas e construção do meu caminho profissional.</p><p>Este espaço apresenta minha formação e os princípios que orientam essa jornada: ouvir com atenção, estudar com rigor e comunicar com clareza.</p><a className="text-link" href={whatsapp} target="_blank" rel="noopener noreferrer">Entre em contato <ArrowUpRight size={17}/></a></div></section>
        <section className="formation-wrap" id="formacao" aria-labelledby="formation-title">
          <div className="section formation">
            <div className="formation-heading"><p className="eyebrow">02 — FORMAÇÃO</p><h2 id="formation-title">Uma base sólida.<br/>Um caminho <em>em construção.</em></h2><p>A universidade como espaço para aprender a perguntar, refletir e compreender a complexidade das relações humanas.</p></div>
            <div className="formation-record"><span className="formation-index">FORMAÇÃO ACADÊMICA / 01</span><div className="university-name">Universidade<br/>de Brasília<span>UnB</span></div><div className="degree-row"><span>Graduação em Direito</span><span className="status">Formanda</span></div><div className="formation-location"><MapPin size={13}/><span>Brasília, Distrito Federal</span><a href="https://www.unb.br/" target="_blank" rel="noopener noreferrer" aria-label="Conheça o site oficial da Universidade de Brasília">Conheça a UnB <ArrowUpRight size={14}/></a></div></div>
          </div>
        </section>
        <section className="section principles" id="principios" aria-labelledby="principles-title"><div className="section-heading"><div><p className="eyebrow">03 — PRINCÍPIOS</p><h2 id="principles-title">O que orienta<br/><em>o meu olhar.</em></h2></div><p>Mais do que uma escolha de profissão,<br/>uma maneira de estar no mundo.</p></div><div className="principles-grid">{principles.map(item => <article key={item.number}><span className="principle-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></section>
        <section className="statement" aria-label="Compromisso"><span className="eyebrow">DIREITO & HUMANIDADE</span><p>Conhecimento para compreender.<br/><em>Sensibilidade para se aproximar.</em></p><span className="statement-signature">Vitória Marinho</span></section>
        <section className="section questions" aria-labelledby="questions-title"><div><p className="eyebrow">UM DIÁLOGO ABERTO</p><h2 id="questions-title">Para nos<br/><em>conhecermos.</em></h2></div><Accordion className="faq-list">{questions.map((item, index) => <AccordionItem key={item.title} value={index}><AccordionTrigger className="faq-trigger">{item.title}</AccordionTrigger><AccordionContent className="faq-content">{item.text}</AccordionContent></AccordionItem>)}</Accordion></section>
        <section className="contact" id="contato" aria-labelledby="contact-title"><div className="contact-inner"><div><p className="eyebrow">04 — CONTATO</p><h2 id="contact-title">Toda conexão começa<br/>com <em>uma conversa.</em></h2><p className="contact-intro">Para novas conexões, trocas e oportunidades.<br/>Será um prazer conhecer a sua história.</p><a className="contact-button" href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/>Vamos conversar pelo WhatsApp<ArrowUpRight size={19}/></a><p className="contact-number">(61) 99816-0407 <span>·</span> Brasília, DF</p></div><div className="contact-monogram" aria-hidden="true">V<span>M</span></div></div></section>
      </main>
      <footer className="footer"><div className="footer-top"><a className="brand" href="#inicio" aria-label="Vitória Marinho — voltar ao início"><span className="brand-name">VITÓRIA MARINHO<span>DIREITO & HUMANIDADE</span></span></a><p>Formanda em Direito pela Universidade de Brasília.<br/>Portfólio pessoal e acadêmico.</p><a className="back-top" href="#inicio">Voltar ao início <ArrowUp size={15}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Vitória Marinho</span><span>Feito com intenção, em cada detalhe.</span><a href="https://bluelapisroad.wordpress.com/2013/10/25/day-14-4-of-5-palacio-itamaraty-brasilia-brazil/" target="_blank" rel="noopener noreferrer">Fotografia: Blue Lapis Road <ArrowUpRight size={11}/></a></div></footer>
    </>
  );
}
