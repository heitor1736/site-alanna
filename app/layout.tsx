import type { Metadata } from 'next';
import './globals.css';
import './refinements.css';

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'Alanna Alves | Advocacia e Consultoria — Conceito',
  description:
    'Um escritório boutique imaginado em Brasília. Estratégia, patrimônio, negócios e pessoas em uma experiência editorial. Projeto conceitual fictício.',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
  openGraph: {
    title: 'Alanna Alves | Advocacia e Consultoria',
    description:
      'O que importa para você, nos move. Conceito fictício de escritório boutique em Brasília.',
    locale: 'pt_BR',
    type: 'website',
    images: [
      {
        url: '/equipe-editorial.webp',
        width: 1536,
        height: 1024,
        alt: 'Equipe ilustrativa de um escritório fictício',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Alanna Alves | Advocacia e Consultoria',
    description:
      'Estratégia, proximidade e um novo olhar. Escritório fictício.',
    images: ['/equipe-editorial.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
