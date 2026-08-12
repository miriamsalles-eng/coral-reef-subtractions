# Abertura em 2 telas

Separar a capa atual (que mistura arte, título, subtítulo, balão e botão) em duas telas independentes. Nada mais do projeto muda.

## Tela 1 — Capa limpa
- Fundo: `cover-title` preenchendo o canvas 1200x675, sem overlay, sem escurecimento.
- Único elemento: botão PNG INICIAR no canto inferior direito (~36 px da direita, ~30 px da base).
- Sem título HTML, subtítulo, balão, Mara ou botão de áudio.
- Clique em INICIAR → Tela 2.

## Tela 2 — Apresentação da Mara
- Fundo: `bg-reflection` ocupando todo o canvas.
- Mara `neutral` no lado esquerdo, tamanho generoso, sem deformar e sem encostar nas bordas.
- Balão de fala à direita da Mara, largura contida (~520 px), texto exato:
  "Oi! Eu sou Mara. Vamos explorar o recife e descobrir o que acontece quando alguns animais saem?"
  Tipografia ~26 px, alto contraste.
- Botão de áudio integrado ao balão (componente atual `SpeechBubble`), reproduzindo a fala e interrompendo áudio anterior.
- Botão PNG SEGUIR no canto inferior direito, sem sobrepor balão nem Mara.
- Clique em SEGUIR → tutorial (próxima etapa já existente).

## Detalhes técnicos
- Novo componente `src/components/game/CoverScreen.tsx`: `GameScreen background="cover"` + `ImageNavButton kind="start"`.
- Novo componente `src/components/game/IntroScreen.tsx`: `GameScreen background="reflection"` + `Mara pose="neutral"` + `SpeechBubble` (com `useNarration`, id de narração `intro.apresentacao`) + `ImageNavButton kind="next"`.
- `src/routes/index.tsx`: o estágio `cover` passa a renderizar `CoverScreen`; novo estágio `intro` entre `cover` e `tutorial` no `advance()`; o estágio `closure` continua voltando para `cover`. Metadados de head e o restante do fluxo permanecem iguais.
- `StoryScreen` continua existindo e sendo usado pelas telas de transição, síntese e encerramento — sem alterações.
- Verificação final: as duas telas renderizadas no canvas escalado, sem scroll e sem elementos cortados.
