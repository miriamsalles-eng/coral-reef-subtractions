# Coral Reef Subtractions

PRD — Mara e as Subtrações no Recife de Corais

1. CONTEXTO DO PROJETO

Crie do zero uma atividade interativa educacional chamada:

Mara e as Subtrações no Recife de Corais

Este é um NOVO projeto, criado em uma nova conta Lovable.

Existe uma versão anterior do material, mas este projeto NÃO deve depender dela tecnicamente.

REGRA CRÍTICA DE INDEPENDÊNCIA

Todos os componentes, arquivos, estados, rotas, assets e referências devem pertencer exclusivamente a este novo projeto.

NÃO:

vincular assets a project_ids antigos;

buscar arquivos em outro projeto Lovable;

usar URLs temporárias pertencentes ao projeto anterior;

criar dependência de repositórios ou storage da conta anterior;

reutilizar arquivos .asset.json que apontem para outro projeto.

Os assets gráficos originais serão enviados novamente para este projeto.

Use os arquivos enviados como fonte visual oficial.

2. PÚBLICO E OBJETIVO PEDAGÓGICO

Público principal:

crianças do 1º ano do Ensino Fundamental, aproximadamente 6 a 8 anos.

Área:

Matemática

Habilidade de referência:

EF01MA08

Objetivo:

Favorecer a compreensão da subtração em situações de retirada, permitindo que a criança:

observe uma quantidade inicial;

perceba que alguns elementos saíram;

descubra quantos permaneceram;

relacione a situação concreta à representação matemática;

transfira essa ideia para diferentes situações.

A criança deve compreender progressivamente a estrutura:

Havia uma quantidade → uma parte saiu → outra quantidade ficou.

3. PRINCÍPIO CENTRAL DA EXPERIÊNCIA

A atividade deve parecer uma aventura ilustrada pelo recife de corais, e não uma sequência de fichas de exercícios.

Um problema identificado na versão anterior foi a sensação de:

“estar fazendo e vendo sempre a mesma coisa”.

Portanto, diversidade não deve signific apenas trocar a posição dos elementos.

A experiência deve variar:

composição das telas;

animais apresentados;

pequenas animações;

tipo de pergunta;

forma de interação;

nível de apoio oferecido pela Mara;

representação matemática solicitada.

Ao mesmo tempo, a identidade visual deve permanecer coerente durante toda a experiência.

4. ESTRUTURA GERAL

A experiência deve seguir esta sequência:

Capa

Apresentação de Mara

Tutorial

Fase 1 — Os peixes do recife

Transição narrativa

Fase 2 — Explorando outros moradores do recife

Síntese

Metacognição

Encerramento

Não apresentar tudo como uma sequência única de “Desafio 1, Desafio 2, Desafio 3...”.

As duas fases devem ser percebidas pela criança como momentos diferentes de uma mesma aventura.

5. CANVAS E COMPORTAMENTO RESPONSIVO

Utilize canvas lógico:

1200 × 675 px — proporção 16:9.

A atividade inteira deve caber dentro desse canvas.

NÃO permitir:

scroll vertical;

scroll horizontal;

elementos saindo da área útil;

mudança de layout que desorganize a tela quando incorporada em iframe.

Escalar proporcionalmente:

scale = min(viewportWidth / 1200, viewportHeight / 675)

Utilizar:

html, body { overflow: hidden; }

Redimensionar a viewport nunca pode reiniciar a atividade ou apagar o progresso.

6. ASSETS

Usar prioritariamente os PNGs fornecidos.

Os arquivos de personagem, animais, botões, fundos e elementos decorativos NÃO devem ser redesenhados pelo Lovable.

NÃO:

substituir PNG por emoji;

desenhar animal com CSS;

criar versões genéricas por SVG;

substituir Mara por personagem gerada;

redesenhar botões existentes.

Os PNGs devem ser preservados visualmente.

É permitido:

dimensionar;

espelhar quando pedagogicamente adequado;

deslocar;

animar posição;

alterar suavemente escala durante animações.

Não deformar os assets.

7. PERSONAGEM MARA

Mara é a personagem mediadora.

Ela não deve permanecer sempre na mesma posição e pose.

Usar suas poses de acordo com a função:

apresentação;

apontando;

pensando;

explicando;

dando feedback;

comemorando.

Sua participação deve ter função pedagógica ou narrativa.

Evitar que Mara apareça simplesmente para preencher espaço.

Nunca posicioná-la apontando para uma região sem conteúdo importante.

8. HIERARQUIA VISUAL

Um problema da versão anterior era o tratamento visual semelhante entre:

orientações;

balões de diálogo;

alternativas;

botões.

Isso dificultava reconhecer rapidamente a função de cada elemento.

Criar hierarquia clara.

Enunciado

Deve ser percebido imediatamente como aquilo que a criança precisa fazer.

Cena

Deve ocupar posição central e ter destaque.

Alternativas

Devem aparecer próximas à cena à qual se referem.

Fala de Mara

Deve funcionar como mediação ou dica.

Navegação

Deve ser claramente diferente das alternativas matemáticas.

A ordem visual preferencial é:

1. Enunciado
2. Cena
3. Interação matemática
4. Mediação de Mara
5. Navegação

9. REGRA PARA CARD E FALA DE MARA

O card superior responde:

“O que eu preciso fazer?”

Mara responde:

“Como posso pensar para fazer isso?”

Nunca repetir a mesma informação nos dois elementos.

Exemplo correto:

CARD:

Quantos peixes há no recife?

MARA:

Conte com calma e escolha o número.

Exemplo incorreto:

CARD:

Quantos peixes há no recife?

MARA:

Quantos peixes há no recife?

Se Mara não tiver algo relevante a acrescentar, não mostrar balão.

10. TUTORIAL

Criar situação:

3 peixes → 1 peixe sai → ficam 2.

Etapa A — observar

Mostrar três peixes claramente.

Orientação simples:

“Veja os peixes no recife.”

Etapa B — retirada

Um peixe sai da cena.

A animação deve ser suficientemente lenta para a criança perceber claramente o que aconteceu.

Etapa C — responder

Depois que a animação terminar:

“Quantos peixes ficaram?”

Alternativas:

2 | 3 | 4

As alternativas devem aparecer abaixo da cena dos peixes, nunca acima dela.

Evitar balão da Mara nessa tela caso ele apenas repita a pergunta.

Disponibilizar:

VER NOVAMENTE

no canto inferior direito ou em região próxima da navegação, sem cobrir alternativas.

11. VELOCIDADE DAS ANIMAÇÕES DE RETIRADA

Esta é uma regra importante.

A saída dos animais representa matematicamente a retirada.

Portanto, NÃO deve acontecer rápido demais.

Um único animal

Duração aproximada:

1,3 a 1,6 segundo.

Usar deslocamento contínuo e suave.

O animal deve efetivamente atravessar parte da cena e sair dela.

Não usar apenas fade-out.

Vários animais

Quando saírem vários:

não desaparecer simultaneamente;

iniciar seus movimentos sequencialmente;

usar intervalo aproximado de 250 a 350 ms entre os movimentos.

A criança deve conseguir acompanhar visualmente:

um saiu → outro saiu → outro saiu.

Não exagerar a ponto de tornar a experiência cansativa.

Regra de interação

Enquanto a retirada estiver acontecendo:

alternativas ficam ocultas ou desativadas;

a criança observa a cena.

Somente após todos os animais terminarem o movimento deve surgir a pergunta:

“Quantos ficaram?”

12. BOTÃO “VER NOVAMENTE”

Depois de uma retirada, permitir que a criança reveja a ação.

Ao clicar:

restaurar a quantidade inicial;

aguardar aproximadamente 500 ms;

repetir a animação;

restaurar a pergunta ao final.

Rever a animação NÃO deve:

contabilizar erro;

revelar resposta;

alterar progresso;

criar timers duplicados.

13. TUTORIAL — FEEDBACK

Ao acertar:

“Isso mesmo! Havia 3 peixes, 1 saiu e ficaram 2.”

Não avançar automaticamente.

Mostrar:

MOSTRAR COM NÚMEROS

Depois do clique:

3 − 1 = 2

Mara pode explicar:

“O sinal de menos mostra que uma quantidade foi retirada.”

Utilizar linguagem adequada ao 1º ano.

Depois:

SEGUIR

no canto inferior direito.

14. FASE 1 — OS PEIXES DO RECIFE

A primeira fase tem 5 desafios.

Objetivo:

construir progressivamente a compreensão da retirada.

Desafio 1

5 − 1 = 4

Primeiro:

“Quantos peixes há no recife?”

Depois da resposta correta:

“Veja o que acontece.”

Um peixe sai lentamente.

Depois:

“Quantos peixes ficaram?”

Desafio 2

6 − 2 = 4

Dois peixes saem, um após o outro.

A criança acompanha visualmente as duas retiradas.

Desafio 3

8 − 3 = 5

Três peixes saem sequencialmente.

Não fazer os três desaparecerem juntos.

15. INTRODUÇÃO DOS GRUPOS DE 10

Não utilizar o conceito:

“cardume = 10”.

Isso é pedagogicamente proibido neste projeto.

Um cardume não representa matematicamente uma quantidade fixa.

Quando houver muitos peixes, utilizar simplesmente uma estratégia visual:

GRUPO DE 10 PEIXES

Mara pode dizer:

“Agora há mais peixes! Alguns estão juntos em grupos de 10 para facilitar a contagem.”

Mostrar claramente um agrupamento contendo dez peixes.

Dizer:

“Este grupo tem 10 peixes.”

Depois disso usar expressões:

grupo de 10;

grupo de 10 peixes;

peixes separados.

Nunca:

“um cardume vale 10”;

“um cardume representa 10”;

“conte os cardumes como dezenas”.

16. DESAFIO 4

Situação:

12 − 2 = 10

Representar inicialmente:

1 grupo visual de 10;

2 peixes separados.

Perguntar:

“Quantos peixes há ao todo?”

Mara:

“Comece pelo grupo de 10 e conte também os peixes separados.”

Depois da resposta correta:

“Veja o que acontece.”

Os dois peixes separados saem lentamente.

Pergunta:

“Quantos ficaram?”

Resultado:

10

17. DESAFIO 5

Situação:

16 − 4 = 12

Representar:

1 grupo de 10;

6 peixes separados.

Mara:

“Use o grupo de 10 para ajudar na contagem.”

Depois:

quatro peixes saem.

Resultado:

12

Este é o último desafio da primeira fase.

18. TRANSIÇÃO NARRATIVA

Não passar diretamente de:

Desafio 5 → Desafio 6

Criar uma pequena cena de transição.

Mara pode aparecer deslocando-se visualmente para outra região do recife.

Utilizar o cenário para sugerir exploração:

corais;

algas;

pedras;

caverna;

outros elementos disponíveis.

Texto sugerido:

“Já descobrimos o que acontece quando alguns peixes saem. Vamos explorar outra parte do recife?”

Em seguida:

“Será que conseguimos usar a mesma ideia com outros moradores daqui?”

Mostrar rapidamente silhuetas ou aparições de:

estrelas-do-mar;

cavalos-marinhos;

outros animais disponíveis nos assets.

Botão:

SEGUIR

19. FASE 2 — EXPLORANDO O RECIFE

A segunda fase deve ser visual e cognitivamente diferente da primeira.

Não basta substituir peixes por outros animais.

Nesta fase devem variar:

personagem observado;

situação narrativa;

tipo de pergunta;

forma de resposta.

A ideia é verificar se a criança consegue transferir o que aprendeu.

Serão três situações.

20. SITUAÇÃO 6 — CAVALOS-MARINHOS

Mostrar:

7 cavalos-marinhos.

Dois nadam para trás dos corais.

A animação deve permitir acompanhar claramente os dois movimentos.

Perguntar:

“Quantos cavalos-marinhos ficaram?”

Alternativas:

4 | 5 | 6

Resposta correta:

5

Mara pode orientar:

“Veja quantos havia e acompanhe os que saíram.”

Após o acerto, mostrar:

7 − 2 = 5

Aqui ainda existe forte apoio visual.

21. SITUAÇÃO 7 — ESTRELAS-DO-MAR

Mostrar inicialmente:

9 estrelas-do-mar.

Uma corrente suave leva quatro estrelas para outra região da cena.

A animação pode ser diferente da animação dos peixes:

pequeno movimento ondulado;

deslocamento gradual para fora da região observada.

Perguntar:

“Complete o que aconteceu.”

Mostrar:

9 − 4 = ___

Alternativas:

4 | 5 | 6

Resposta:

5

Assim, a criança não repete exatamente a interação anterior.

22. SITUAÇÃO 8 — CENA COM DIFERENTES ANIMAIS

Criar uma cena com:

10 peixes;

4 cavalos-marinhos.

Total:

14 animais.

Dois cavalos-marinhos e dois peixes saem da região observada.

Total retirado:

4

Restam:

10

Depois da animação, perguntar:

“Qual conta mostra o que aconteceu?”

Apresentar três operações grandes:

14 − 4 = 10

14 + 4 = 18

10 − 4 = 6

Resposta correta:

14 − 4 = 10

Esta atividade é importante porque verifica se a criança compreende a situação e consegue associá-la à operação, em vez de apenas calcular o resultado.

23. VARIEDADE DE INTERAÇÕES

Portanto, a segunda fase deve seguir esta progressão:

Situação 6

Descobrir quantos ficaram.

Situação 7

Completar uma operação.

Situação 8

Escolher qual operação representa a cena.

Não transformar todas as telas em:

“assista → escolha um número → próxima”.

24. CONTADOR E IDENTIFICAÇÃO DE FASES

Evitar um box constante e dominante como:

“Desafio 3 de 8”

sobrepondo-se ao enunciado.

Preferir identificação discreta.

Exemplo:

Fase 1

Os peixes do recife • 2 de 5

Fase 2

Explorando o recife • 1 de 3

Pode ser apresentado discretamente na margem superior.

Nunca sobre o enunciado.

Nunca em posição que interfira na leitura.

25. NÃO EXIGIR MEMÓRIA DESNECESSÁRIA

Nunca perguntar:

“Quantos ficaram?”

se a criança precisar lembrar de uma quantidade inicial apresentada muito tempo antes.

Toda informação necessária para resolver a situação deve:

permanecer visível;

ou ter sido observada imediatamente antes;

ou poder ser revista pelo botão VER NOVAMENTE.

A atividade avalia compreensão de subtração, não memória de trabalho.

26. NÃO EXIGIR CONTAGEM EXCESSIVA

Não apresentar dezenas de animais espalhados pela tela esperando que uma criança de 1º ano conte um por um com o dedo.

Para quantidades maiores:

usar organização visual;

agrupamentos;

espaçamento regular;

grupos de 10 quando necessário.

A organização visual deve ajudar a pensar matematicamente.

27. FEEDBACK

Erro

Não avançar.

Não revelar imediatamente a resposta correta.

Dar orientação breve.

Exemplos:

“Observe novamente os animais que saíram.”

“Conte os que ficaram na cena.”

“Use o grupo de 10 para ajudar.”

Disponibilizar nova tentativa.

Acerto

Destacar a escolha.

Dar feedback curto e explicativo.

Não avançar automaticamente.

A criança controla o ritmo da atividade.

28. NAVEGAÇÃO

Botões de progressão devem ficar preferencialmente no:

canto inferior direito.

Isso vale principalmente para:

SEGUIR;

CONTINUAR;

VER NOVAMENTE;

MOSTRAR COM NÚMEROS.

Nunca colocar SEGUIR no canto superior direito apenas porque existe espaço disponível.

Nunca colocar botão sobre:

alternativa;

número;

operação;

animal;

texto;

balão.

29. ZONAS DE SEGURANÇA DO LAYOUT

Organizar aproximadamente:

Y 0–125

Título, pergunta ou enunciado.

Y 130–440

Cena principal.

Y 445–665

Alternativas, Mara, mediação e controles.

A distribuição pode variar conforme a tela para evitar monotonia.

Entretanto, nenhum componente deve se sobrepor a outro.

Validar geometricamente:

enunciado;

indicador;

animais;

Mara;

balão;

alternativas;

operação;

botões.

Interseções indevidas esperadas:

ZERO.

30. VARIEDADE DE COMPOSIÇÃO

Não usar exatamente a mesma disposição em todas as telas.

É permitido variar:

Mara à esquerda ou direita;

animais mais centralizados;

agrupamentos em diferentes regiões;

elementos narrativos surgindo do fundo;

pequenas mudanças de enquadramento;

entradas e saídas suaves.

Mas NÃO alterar a posição dos elementos de maneira aleatória.

A composição deve sempre favorecer a leitura pedagógica.

31. MOVIMENTAÇÃO DO CENÁRIO

Elementos decorativos podem receber movimento sutil:

algas balançando;

bolhas subindo;

pequenos peixes ao fundo;

brilho suave;

cavalos-marinhos com leve oscilação.

Esses movimentos devem ser:

discretos;

lentos;

contínuos;

não distrativos.

A animação matemática de retirada deve ter mais destaque do que as animações ambientais.

32. REPRESENTAÇÃO SIMBÓLICA

Não apresentar automaticamente a conta antes de a criança observar e compreender a situação.

Prioridade:

situação concreta → resposta → representação matemática

Na Fase 1, após determinados acertos, permitir:

MOSTRAR COM NÚMEROS

Então apresentar:

5 − 1 = 4

6 − 2 = 4

etc.

Na Fase 2, a própria representação matemática pode fazer parte do desafio, conforme especificado.

33. SÍNTESE FINAL

Depois da segunda fase, Mara deve ajudar a criança a perceber o que as diferentes situações tinham em comum.

Mostrar três pequenas cenas ou ícones:

PEIXES

CAVALOS-MARINHOS

ESTRELAS-DO-MAR

Texto:

“Os animais eram diferentes, mas em todas essas situações uma parte saiu.”

Depois:

“Quando sabemos quantos havia e quantos saíram, podemos descobrir quantos ficaram.”

Mostrar exemplo visual:

8 − 3 = 5

Com apoio da cena correspondente.

A síntese deve partir das experiências vividas pela criança.

34. METACOGNIÇÃO

Evitar perguntas abstratas como:

“O que significa retirar?”

sem representação visual.

Utilizar duas situações concretas.

Questão 1

Mostrar:

8 peixes.

3 saem.

5 permanecem.

Perguntar:

“Qual conta mostra o que aconteceu?”

Alternativas:

8 − 3 = 5

8 + 3 = 11

5 − 3 = 2

Questão 2

Mostrar visualmente:

14 − 4 = 10

com pequena cena associada.

Perguntar:

“O que o número 4 mostra nessa situação?”

Alternativas:

quantos havia;

quantos saíram;

quantos ficaram.

Resposta:

quantos saíram.

35. ENCERRAMENTO

Utilizar Mara comemorando.

Mensagem curta, adequada à idade.

Sugestão:

“Muito bem! Você observou o recife, acompanhou os animais e descobriu quantos ficaram em cada situação!”

Complemento:

“Agora você já sabe usar a subtração para representar situações de retirada.”

Botão:

RECOMEÇAR

36. ÁUDIO

Toda fala relevante de Mara deve possuir:

texto visível;

botão de áudio;

aria-label.

Nunca depender exclusivamente do áudio.

Se houver uma voz infantil feminina em português brasileiro adequada e inteligível, utilizá-la.

Caso não exista voz infantil satisfatória:

não distorcer voz adulta para parecer criança;

preparar estrutura de arquivos de áudio para posterior substituição por MP3.

Nunca iniciar áudio automaticamente antes da primeira interação.

Trocar de tela deve interromper o áudio anterior.

37. TIPOGRAFIA

Priorizar fontes amigáveis e altamente legíveis.

Sugestão:

Lexend para textos.

Fredoka para títulos e números.

Tamanhos aproximados:

enunciado: 30–34 px;

diálogo: 25–28 px;

alternativas numéricas: 44–52 px;

operação matemática: 42–52 px.

Nunca diminuir demasiadamente a fonte apenas para o conteúdo caber.

Se não couber:

reorganizar o layout.

38. ACESSIBILIDADE

Todos os elementos interativos devem funcionar por:

mouse;

toque;

teclado.

Usar:

aria-label;

estados de focus-visible;

áreas clicáveis grandes;

contraste adequado.

Nenhuma informação essencial deve existir apenas em:

cor;

áudio;

movimento.

39. GERENCIAMENTO DE ESTADO E TIMERS

Centralizar todos os timers das animações.

Criar função equivalente a:

clearInteractionTimers()

Executá-la:

ao avançar;

ao voltar;

ao reiniciar;

ao repetir animação;

ao trocar de fase;

ao desmontar componente.

Nenhum timer pertencente a uma tela anterior pode alterar a tela seguinte.

40. ARQUITETURA SUGERIDA

Separar conteúdo pedagógico da camada visual.

Estrutura sugerida:

src/components/game/GameCanvas

src/components/game/GameScreen

src/components/game/Mara

src/components/game/SpeechBubble

src/components/game/AnimalScene

src/components/game/AnswerOptions

src/components/game/Operation

src/components/game/ProgressIndicator

src/components/game/TransitionScene

src/components/game/MetacognitionScreen

Dados:

src/data/phase1.ts

src/data/phase2.ts

src/data/flow.ts

src/data/assets.ts

src/data/audio.ts

Não espalhar textos e respostas diretamente por inúmeros componentes JSX.

41. CONCORDÂNCIA EM PORTUGUÊS

Centralizar funções para singular e plural.

Exemplos:

1 peixe / 2 peixes

1 cavalo-marinho / 2 cavalos-marinhos

1 estrela-do-mar / 3 estrelas-do-mar

saiu 1 / saíram 2

ficou 1 / ficaram 5

Usar:

“Havia 5 peixes.”

Nunca:

“Haviam 5 peixes.”

42. CHECKLIST DE ACEITE

Antes de considerar a implementação concluída, testar obrigatoriamente:

Canvas 1200 × 675.

Ausência total de scroll.

Tutorial funcionando.

Cinco situações na Fase 1.

Três situações na Fase 2.

Nenhum antigo desafio 35 − 23.

Nenhuma associação “cardume = 10”.

Uso correto de “grupo de 10 peixes”.

Alternativas abaixo ou diretamente associadas à cena observada.

Nenhum balão repetindo literalmente o enunciado.

Saída dos animais visivelmente mais lenta.

Animais não desaparecem simplesmente por fade.

Saída sequencial quando houver vários animais.

Pergunta aparece somente depois da retirada.

Botão VER NOVAMENTE funciona corretamente.

Segunda fase utiliza animais diferentes.

Segunda fase não repete sempre o mesmo tipo de interação.

Cavalos-marinhos presentes.

Estrelas-do-mar presentes.

Cena com mais de uma espécie presente.

Nenhuma alternativa bloqueada por outro componente.

Nenhum botão sobreposto a números.

Nenhum texto sobreposto.

Nenhum animal sobreposto indevidamente à Mara.

Navegação preferencialmente no canto inferior direito.

Feedback não provoca avanço automático.

Criança controla quando avançar.

Quantidades necessárias para responder permanecem acessíveis visualmente.

Não exigir contagem exaustiva de dezenas de animais isolados.

Metacognição acompanhada de imagens.

Assets pertencem ao novo projeto.

Nenhuma dependência do projeto Lovable anterior.

Todos os timers são cancelados corretamente.

Projeto funciona dentro de iframe.

Redimensionamento preserva estado.

43. REGRA FINAL

Não simplifique uma mecânica pedagógica apenas para fazer o conteúdo caber.

Se houver conflito entre elementos:

reorganize o layout.

Não altere o objetivo pedagógico.

Não acrescente novas mecânicas, conceitos matemáticos ou desafios sem necessidade.

Não redesenhe os assets enviados.

Antes de considerar cada tela pronta, valide:

clareza pedagógica + ordem de leitura + ausência de sobreposição + tamanho adequado + funcionamento da interação.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/67537e90-2823-45ee-8589-1344e8a97e42).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
