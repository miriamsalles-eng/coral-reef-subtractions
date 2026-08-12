# Quatro correções pontuais

Sem refatoração: capa, apresentação, tutorial, Fase 1, Fase 2, assets, velocidades e navegação permanecem exatamente como estão.

## 1. Botão "Ver novamente" — uma única repetição

Hoje a repetição é disparada por duas fontes: o estado muda para `animating` (a cena já começa a animar) e, 500 ms depois, o `replayKey` muda (a cena reinicia). Isso pode causar o "salto" descrito.

Correção mínima, dentro da estrutura atual de `ChallengeScreen`:
- ao clicar, cancelar timers, parar a narração, restaurar a cena (animais de volta às posições iniciais) e ocultar pergunta/alternativas — passando por um estado de pausa que não anima;
- após ~500 ms, entrar em `animating` e incrementar o `replayKey` na mesma atualização, de modo que a animação comece uma única vez;
- ao terminar, pergunta e alternativas voltam; tentativas e progresso são preservados.

Duração por animal (1450 ms) e intervalo entre saídas (300 ms) ficam inalterados.

## 2. Total de 14 animais sempre visível (última situação da Fase 2)

Adicionar um marcador curto e discreto próximo à cena, com o texto "No início: 14 animais", visível desde a observação até a resposta — inclusive quando a pergunta "Qual conta mostra o que aconteceu?" aparece.

Implementado como um campo opcional no dado do desafio (usado só nessa situação), renderizado como uma pequena etiqueta acima da cena. Números, animais, animação, alternativas e resposta correta permanecem idênticos.

## 3. Síntese visual

Mesma tela (fundo, Mara, balão, botão SEGUIR). Só o conteúdo central muda:

- Faixa com três miniaturas usando assets já existentes: peixes, cavalos-marinhos e estrelas-do-mar.
- Falas da Mara (em duas etapas, com o botão de áudio já existente):
  "Os animais eram diferentes, mas em todas essas situações alguns saíram." e
  "Quando sabemos quantos havia e quantos saíram, podemos descobrir quantos ficaram."
- Exemplo concreto em uma linha: 8 peixinhos, sendo 3 marcados como os que saíram (esmaecidos com seta de saída) e 5 que ficam, com a operação 8 − 3 = 5 logo abaixo.

Sem parágrafos longos e sem vocabulário formal.

## 4. Metacognição — duas situações concretas

Substitui as duas perguntas atuais. Exatamente duas questões, cada uma com representação visual acima das alternativas.

Questão 1
- Cena estática: 8 peixes, 3 deles marcados como "saíram", 5 permanecendo.
- Pergunta: "Qual conta mostra o que aconteceu?"
- Alternativas: 8 − 3 = 5 | 8 + 3 = 11 | 5 − 3 = 2 (correta: 8 − 3 = 5)
- Acerto: "Isso mesmo! Havia 8 peixes, 3 saíram e ficaram 5."
- Erro: "Observe quantos peixes havia, quantos saíram e quantos ficaram." (nova tentativa liberada)

Questão 2
- Representação: a operação 14 − 4 = 10 com uma cena reduzida (animais iniciais, 4 marcados como os que saíram, 10 permanecendo).
- Pergunta: "O que o número 4 mostra nessa situação?"
- Alternativas: Quantos animais havia | Quantos animais saíram | Quantos animais ficaram (correta: saíram)
- Acerto: "Isso mesmo! O 4 mostra quantos animais saíram."
- Erro: "Observe a conta e veja qual quantidade foi retirada."

Layout em ambas: pergunta no topo, representação visual no centro, alternativas abaixo, Mara e balão sem cobrir a cena, SEGUIR só após o acerto e sem avanço automático.

## Detalhes técnicos

- `src/components/game/ChallengeScreen.tsx`: função única `replayRemoval()` com estado de pausa; novo marcador opcional de quantidade inicial.
- `src/data/types.ts` + `src/data/phase2.ts`: campo opcional `sceneNote` preenchido apenas em `s8` ("No início: 14 animais").
- Novo `src/components/game/StaticScene.tsx`: representação estática reutilizável (grupo de animais com alguns marcados como "saíram"), usando `ANIMALS` de `src/data/assets.ts`.
- Novo `src/components/game/SynthesisScreen.tsx` para o estágio `synthesis`, com fundo `ten`, Mara e navegação atuais.
- `src/components/game/MetacognitionScreen.tsx`: novas duas questões usando `StaticScene`, `Operation` e `AnswerOptions` existentes.
- `src/routes/index.tsx`: apenas troca do conteúdo do estágio `synthesis` para o novo componente.

Nenhuma nova dependência, nenhum asset novo, canvas 1200 × 675 preservado.
