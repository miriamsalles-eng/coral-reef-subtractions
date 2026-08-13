# Diversificar as operações (Fase 2, Síntese, Metacognição)

Somente mudanças numéricas e textos derivados delas. Tutorial, Fase 1, design, assets e animações ficam intactos.

## Fase 2 (src/data/phase2.ts)

**Situação 1 — cavalos-marinhos (7 − 3 = 4)**
- Cena: 7 cavalos-marinhos, saem 3 (mesmo `exit: "behind"`, mesma velocidade).
- Pergunta mantida ("Quantos cavalos-marinhos ficaram?"), alternativas 3 | 4 | 5, correta 4.
- Sucesso: "Havia 7 cavalos-marinhos, 3 saíram para trás dos corais e ficaram 4."
- Bloco `numbers`: a 7, b 3, result 4.

**Situação 2 — estrelas-do-mar (9 − 2 = 7)**
- Cena: 9 estrelas, saem 2 (mesmo `exit: "drift"`).
- Mecânica mantida ("Complete o que aconteceu."), operação exibida 9 − 2 = ___, alternativas 6 | 7 | 8, correta 7.
- Sucesso: "Havia 9 estrelas-do-mar, 2 saíram com a corrente e ficaram 7."

**Situação 3 — cena mista (14 − 5 = 9)**
- Início preservado: 10 peixes (5 amarelos + 5 turquesa) + 4 cavalos-marinhos = 14.
- Saem 5: 3 peixes (turquesa) + 2 cavalos-marinhos.
- Selos mantidos: "10 peixes + 4 cavalos-marinhos" antes, "No início: 14 animais" na pergunta.
- Alternativas: 14 − 5 = 9 (correta) | 14 + 5 = 19 | 9 − 5 = 4, com aria-labels atualizados.
- Sucesso: "Havia 14 animais, 5 saíram e ficaram 9."
- Dicas ajustadas aos novos números.

## Síntese (src/components/game/SynthesisScreen.tsx)

- Exemplo passa de 8 − 3 = 5 para 10 − 3 = 7: cena estática com 10 peixes, 3 marcados como saindo, 7 permanecendo; selo "10 peixes — 3 saíram — ficaram 7"; operação 10 − 3 = 7.
- Textos das duas falas preservados.

## Metacognição (src/components/game/MetacognitionScreen.tsx)

- Questão 1: cena com 9 animais, 3 saem, 6 ficam. "Qual conta mostra o que aconteceu?" — 9 − 3 = 6 (correta) | 9 + 3 = 12 | 6 − 3 = 3. Acerto: "Isso mesmo! Havia 9 animais, 3 saíram e ficaram 6." Erro: "Observe quantos havia, quantos saíram e quantos ficaram."
- Questão 2: operação 11 − 3 = 8 com cena de 11 animais, 3 saindo, 8 ficando. "O que o número 3 mostra nessa situação?" com as três alternativas atuais; correta "Quantos animais saíram". Acerto: "Isso mesmo! O 3 mostra quantos animais saíram."

## Detalhes técnicos

- Todas as quantidades continuam vindas das estruturas de dados (`scene.units`, `scene.leaving`, `answer.options`, `numbers`); nenhum `if (challenge.id === ...)` no JSX.
- Narração usa os textos das falas, então fica coerente automaticamente; nenhum MP3 fixo depende desses números.
- Verificação final: conferir por busca que 7−2, 9−4, 14−4 sumiram, que 8−3 só permanece na Fase 1, e checar visualmente cada tela no navegador (inicial − retirada === final em todas as seis situações).
