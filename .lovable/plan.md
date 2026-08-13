# Correção cirúrgica — P0 (textos que antecipam a resposta) e P1 (clareza visual de quem saiu)

Escopo: Fase 2 (apenas dados de texto), tela de metacognição e o componente de cena estática.
Nada de redesign, refatoração, mudança de números, operações, animações, assets ou outras telas.

## P0 — Remover textos que entregam a resposta

1. Fase 2 — cena dos 14 animais
   - Remover o selo secundário "10 peixes + 4 cavalos-marinhos".
   - Manter apenas a indicação discreta "No início: 14 animais".
   - Enunciado e fala da Mara permanecem curtos e orientativos (já estão).

2. Fase 2 — "Qual conta mostra o que aconteceu?"
   - Nenhum resumo numérico completo antes do acerto: permanece só a indicação do total inicial, a cena, as três contas e a fala breve da Mara ("Compare a cena com as contas.").
   - Verificar que nenhuma outra situação da Fase 2 exibe "inicial + saíram + ficaram" antes do acerto.

3. Metacognição — ambas as situações
   - Remover as legendas "Havia 9 animais — 3 saíram — ficaram 6" e "Havia 11 animais — 3 saíram — ficaram 8" da fase de pergunta.
   - Essa frase completa passa a aparecer somente depois do acerto (como feedback abaixo da cena), aproveitando o texto de sucesso já existente.
   - Falas da Mara antes da resposta continuam apenas orientativas.

4. Síntese: mantida como está (é tela de explicação, não pergunta).

## P1 — Padrão visual único para "animais que saíram"

No componente de cena estática (usado na Fase 2 pós-animação, síntese e metacognição), reforçar
o mesmo código visual para quem saiu, em todas as telas:

- opacidade reduzida (aparência claramente secundária);
- contorno tracejado na cor de destaque de saída (já existente, com traço mais visível);
- pequeno deslocamento para fora do agrupamento (translação vertical) para separá-los do grupo principal;
- um espaço extra entre o grupo que ficou e o grupo que saiu, para leitura em dois blocos.

Quem ficou permanece 100% nítido, sem contorno, agrupado como conjunto principal.

## Detalhes técnicos

- `src/data/phase2.ts`: remover o campo `sceneNoteObserve` da situação dos 14 animais.
- `src/components/game/MetacognitionScreen.tsx`: mover `sceneNote` para exibição condicional (somente quando `done`).
- `src/components/game/StaticScene.tsx`: ajustar o estilo dos itens `leaving` (opacidade, traço, deslocamento) e inserir separação visual entre bloco que ficou e bloco que saiu. Sem mudar contagens, espécies, tamanhos de imagem ou posições gerais.
- Verificação no navegador: Fase 2 (3 situações) e metacognição (2 situações), antes e depois do acerto.
