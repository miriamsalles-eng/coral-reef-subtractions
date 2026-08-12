# Rabicho dos balões + respiro visual na Fase 2

Duas correções apenas. Nada de novos desafios, assets, textos matemáticos, animações ou fluxo.

## 1. Rabicho do balão (global, no componente)

Hoje o rabicho é um quadrado girado 45° pendurado fora do canto do balão, o que dá aparência de losango solto.

Correção dentro de `SpeechBubble`:
- trocar o quadrado girado por uma pequena gota triangular de cantos suavizados, encostada na borda inferior do balão (sem folga que a faça “flutuar”);
- manter a mesma cor de fundo e a mesma borda do balão, inclusive a cor de tom (neutro / acerto / nova tentativa), para parecer continuação do balão;
- ponta curta, inclinada em direção à Mara: canto inferior esquerdo quando `tailSide="left"`, canto inferior direito quando `tailSide="right"`;
- API atual (`tailSide`) permanece igual — nenhuma tela precisa mudar chamada.

Isso vale automaticamente para capa/apresentação, tutorial, Fase 1, transição, síntese, metacognição e tela final. Nessas telas nada mais muda; se a síntese ficar apertada, só um pequeno ajuste de folga vertical do conjunto inferior.

## 2. Fase 2 — telas mais leves

Somente `src/data/phase2.ts` (textos de enunciado/fala e selo) e o posicionamento da Fase 2 em `ChallengeScreen`.

Estrelas-do-mar, antes da animação
- enunciado curto: “Havia 9 estrelas-do-mar.”
- fala mantida (“Uma corrente suave vai levar algumas estrelas para longe.”), com balão mais estreito e um pouco mais alto;
- Mara levemente menor no canto inferior esquerdo, sem disputar espaço com o botão VER O QUE ACONTECE (que fica inalterado).

“Complete o que aconteceu”
- operação e alternativas ganham prioridade: balão sobe, fica mais compacto e mais estreito, longe da borda inferior;
- Mara um pouco menor, como apoio;
- SEGUIR inalterado.

14 animais, antes da animação
- enunciado curto: “Observe: há 14 animais ao todo.”
- selo secundário discreto com a composição: “10 peixes + 4 cavalos-marinhos”;
- fala curta da Mara: “Observe o total. Agora veja quem vai sair.”
- assim o 14 aparece com peso principal só no enunciado.

“Qual conta mostra o que aconteceu?”
- selo “No início: 14 animais” preservado (o selo passa a alternar: composição antes da animação, total durante a pergunta);
- feedback curto: “Havia 14 animais. Saíram 4 e ficaram 10.”
- mais respiro entre cena e base; balão mais compacto, operações continuam centrais.

## Detalhes técnicos

- `src/components/game/SpeechBubble.tsx`: rabicho redesenhado (gota triangular com cantos suavizados via CSS, herdando cor de tom), encostado na base; mesma prop `tailSide`.
- `src/data/types.ts`: `sceneNote` passa a aceitar também um texto para a fase de observação (campo opcional adicional, sem alterar as demais).
- `src/data/phase2.ts`: enunciados, falas e selos encurtados conforme acima. Valores 7−2, 9−4, 14−4, alternativas e respostas corretas inalterados.
- `src/components/game/ChallengeScreen.tsx`: ajustes de coordenadas/tamanho apenas nas composições usadas pela Fase 2 (balão mais estreito e mais alto, Mara ~10% menor), mantendo canvas 1200 × 675 e sem alterar Fase 1.

Nenhuma dependência nova, nenhum asset novo.
