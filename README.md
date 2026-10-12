# Site Alanna — Alves Advocacia e Consultoria

Site conceitual fictício criado a pedido do solicitante. Alanna Alves da Costa é apresentada como sócia fundadora de um escritório boutique em Brasília, com uma trajetória imaginada desde 2014. Equipe, biografias, escritório e atuação são ficcionais; os avisos estão no site. A informação real fornecida originalmente é que Alanna é estudante de Direito na UDF Centro Universitário.

## Executar localmente

Node.js >= 22.13.0. Use `npm install` e `npm run dev`. A versão de desenvolvimento fica em http://localhost:3000. `npm run build` valida e gera a versão de produção; `npx tsc --noEmit` verifica os tipos.

Os metadados usam localhost e a indexação permanece desativada até que seja definido o domínio definitivo.

## Publicar no Render

O projeto está pronto para um **Web Service Node** no Render. O arquivo `render.yaml` já define os comandos necessários:

- Build: `npm ci && npm run build`
- Start: `npm start`
- Node: `22.13.0`

No painel do Render, crie um Blueprint a partir deste repositório ou crie um Web Service manualmente usando esses mesmos valores. Depois de conectar a branch `main`, cada novo push poderá disparar um deploy automático.

## Experiência

- Abertura mais compacta, com descrição objetiva e botões para áreas de atuação e contato.
- Cabeçalho que muda durante a rolagem e indicador do progresso da página.
- Entradas escalonadas de seções e revelação da fotografia da equipe.
- Atalhos para áreas de atuação, equipe e contato imediatamente após a abertura.
- Áreas de atuação em painéis laterais: rolagem vertical move os painéis horizontalmente em telas maiores que 900 × 740 px; em telas menores, deslize lateral nativo com encaixe.
- Setas, seleção direta de área, link para pular a seção e opção de visualizar todas as áreas em grade. Com movimento reduzido, a grade é usada automaticamente.
- Conteúdo principal antecipado, textos maiores e espaçamento mais compacto.
- Perfis dos sócios e reflexões editoriais em diálogos com suporte a teclado.
- Layouts para celular e desktop; menu móvel com fechamento por Escape.
- Respeita prefers-reduced-motion inclusive quando a preferência muda durante a sessão.
- Rolagem nativa, sem bibliotecas de animação ou captura da roda do mouse.

## Conteúdo e imagens

`app/page.tsx`: narrativa, dados dos perfis, reflexões e controle das animações.
`app/globals.css`: identidade, animações e adaptação de telas.
`app/refinements.css`: navegação mais clara, legibilidade e painéis laterais.
`components/practice-journey.tsx`: seção horizontal, controles, teclado e alternativa sem movimento.
`app/layout.tsx`: metadados.
`public/equipe-editorial.webp`: retratos fictícios gerados com ImageGen, otimizados para WebP. Não é uma fotografia real de Alanna.

Brief da imagem: três personagens brasileiros fictícios em escritório modernista, trajes em marfim, vinho e azul-marinho, madeira e pedra natural, luz suave, fotografia editorial sóbria, sem texto ou marcas.

Fotografia do Itamaraty: Blue Lapis Road, “Day 14 (4 of 5) – Palacio Itamaraty, Brasilia, Brazil” (2013). Crédito e link no rodapé. Confirmar direitos ou substituir por imagem licenciada antes de divulgação pública.

WhatsApp informado: +55 61 99662-1700. Links abrem uma mensagem sobre a apresentação do conceito e não enviam nada automaticamente. Não existem formulários, rastreadores ou armazenamento de dados. As fontes são carregadas do Google Fonts.

Os textos de perspectivas são reflexões ilustrativas de posicionamento, não aconselhamento jurídico. Não são inventados números de inscrição na OAB, depoimentos de clientes ou resultados processuais.
