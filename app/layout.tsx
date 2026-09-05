import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vitoria-marinho.heitor-trindad920188.chatgpt.site'),
  title: 'Vitória Marinho | Direito & Humanidade',
  description: 'Conheça Vitória Marinho, formanda em Direito pela Universidade de Brasília. Formação, trajetória e um olhar humano para o Direito.',
  robots: { index: false, follow: false },
  icons: { icon: '/icon.svg' },
  openGraph: { title: 'Vitória Marinho | Direito & Humanidade', description: 'O Direito começa com um olhar humano. Conheça a trajetória de Vitória Marinho, formanda em Direito pela UnB.', locale: 'pt_BR', type: 'website', images: [{ url: 'https://vitoria-marinho.heitor-trindad920188.chatgpt.site/og.png', width: 1536, height: 1024, alt: 'Vitória Marinho — Direito & Humanidade' }] },
  twitter: { card: 'summary_large_image', title: 'Vitória Marinho | Direito & Humanidade', description: 'Formação na UnB. Raízes em Brasília. Um olhar humano para o Direito.', images: ['https://vitoria-marinho.heitor-trindad920188.chatgpt.site/og.png'] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body>{children}</body></html>;
}
