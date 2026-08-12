# Mara e as Subtrações no Recife de Corais

Atividade interativa de subtração (retirada) para o 1º ano, EF01MA08, construída do zero neste projeto, usando exclusivamente os 35 PNGs enviados (Mara, animais, fundos, botões, cenário).

## Assets recebidos

Todos serão registrados como assets deste projeto (nenhuma referência a projeto anterior):
- Mara: neutral, presenting, presenting1, pointing, thinking, feedback, celebrating
- Animais: fish-yellow, fish-turquoise, seahorse, starfish, fish-group-10 (grupo de 10)
- Fundos: cover-title, bg-activity, bg-transition-ten, bg-transition-cave, bg-reflection, bg-final
- Cenário: coral, seaweed, rocks, cave, shell
- Botões: btn-start, btn-next, btn-back, btn-audio, btn-hint, btn-restart

Os PNGs não serão redesenhados, substituídos por emoji/SVG nem deformados — apenas escala proporcional, espelhamento, deslocamento e animação.

## Fluxo da experiência

1. Capa (cover-title + btn-start)
2. Apresentação de Mara
3. Tutorial: 3 peixes → 1 sai → ficam 2 (observar → retirada → perguntar → feedback → MOSTRAR COM NÚMEROS → SEGUIR)
4. Fase 1 — Os peixes do recife (5 desafios)
   - D1 5−1=4 · D2 6−2=4 · D3 8−3=5
   - Tela de introdução do "grupo de 10 peixes" (bg-transition-ten)
   - D4 12−2=10 (1 grupo de 10 + 2 soltos) · D5 16−4=12 (1 grupo de 10 + 6 soltos)
5. Transição narrativa (bg-transition-cave, Mara se deslocando, silhuetas de cavalos-marinhos e estrelas)
6. Fase 2 — Explorando o recife (3 situações, cada uma com interação diferente)
   - S6 cavalos-marinhos 7−2=5 → escolher quantos ficaram
   - S7 estrelas-do-mar 9−4=___ → completar a operação
   - S8 cena mista (10 peixes + 4 cavalos) → escolher qual conta representa a cena (14−4=10)
7. Síntese (bg-reflection): peixes, cavalos, estrelas + 8−3=5
8. Metacognição: Q1 qual conta mostra o que aconteceu; Q2 o que o 4 representa em 14−4=10
9. Encerramento (bg-final, mara-celebrating, btn-restart)

## Regras pedagógicas aplicadas

- Nunca "cardume = 10"; sempre "grupo de 10 peixes" / "peixes separados".
- Card superior = o que fazer; fala de Mara = como pensar. Sem balão quando não houver acréscimo.
- Retirada lenta: 1,3–1,6 s por animal, deslocamento real para fora da cena (sem fade puro), intervalo de ~300 ms entre saídas sequenciais.
- Alternativas ocultas/desativadas durante a animação; pergunta só aparece ao final.
- VER NOVAMENTE restaura a cena, espera ~500 ms e repete — sem contar erro nem revelar resposta.
- Erro: não avança, dica curta, nova tentativa. Acerto: destaque + feedback; avanço sempre pela criança.
- Nada exige memória: quantidades permanecem visíveis ou revisíveis.
- Concordância em português centralizada (singular/plural, "Havia 5 peixes").

## Layout e responsividade

- Canvas lógico fixo 1200×675 (16:9), escalado por `min(vw/1200, vh/675)`, `overflow: hidden`, sem scroll, seguro em iframe.
- Redimensionar nunca reinicia a atividade (estado fora do ciclo de resize).
- Zonas: Y 0–125 enunciado · Y 130–440 cena · Y 445–665 alternativas/Mara/controles, com variação de composição entre telas e zero sobreposição.
- Navegação (SEGUIR / VER NOVAMENTE / MOSTRAR COM NÚMEROS) no canto inferior direito, visualmente distinta das alternativas matemáticas.
- Movimento ambiental sutil: bolhas, algas, brilho — sempre menos destacado que a animação de retirada.

## Tipografia e acessibilidade

- Fredoka para títulos/números, Lexend para textos (via `<link>` no root).
- Enunciado 30–34 px, diálogo 25–28 px, números 44–52 px, operação 42–52 px.
- Mouse, toque e teclado; `aria-label`, `focus-visible`, alvos grandes, contraste adequado; nenhuma informação apenas por cor/áudio/movimento.

## Áudio

Cada fala de Mara terá texto visível + botão de áudio (btn-audio) com `aria-label`, mapeado em `src/data/audio.ts`. Nesta entrega a estrutura fica pronta para MP3 (sem autoplay; troca de tela interrompe o áudio anterior); se você quiser narração gerada, digo depois como incluir.

## Detalhes técnicos

- Rota única em `src/routes/index.tsx` com `head()` próprio (título/descrição/OG em PT-BR).
- Componentes: `GameCanvas`, `GameScreen`, `Mara`, `SpeechBubble`, `AnimalScene`, `AnswerOptions`, `Operation`, `ProgressIndicator`, `TransitionScene`, `MetacognitionScreen`, `NavButton`.
- Dados separados do visual: `src/data/phase1.ts`, `phase2.ts`, `flow.ts`, `assets.ts`, `audio.ts`, mais `src/lib/pt.ts` (plurais) e `src/lib/useInteractionTimers.ts` com `clearInteractionTimers()` chamado em avanço, volta, reinício, repetição, troca de fase e desmontagem.
- Tokens semânticos de cor no `src/styles.css` (paleta recife), sem classes de cor hardcoded.
- Assets registrados via ponteiros `*.asset.json` criados a partir do upload deste projeto.
- Sem backend: todo o estado é local em memória.

## Validação antes de concluir

Percorrer as telas no navegador em 1200×675 e em viewport reduzida, conferindo: ausência de scroll, zero sobreposições, animações sequenciais e lentas, alternativas abaixo da cena, VER NOVAMENTE, feedback sem avanço automático e preservação do estado ao redimensionar.
