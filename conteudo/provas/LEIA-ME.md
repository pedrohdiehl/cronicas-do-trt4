# Questões reais de prova (FCC)

`questoes.json` é uma cópia do banco montado em
`Documents\Concurso TRT-4 TI\03-banco-de-questoes\questoes.json`:
1.207 questões de provas de TI da Justiça do Trabalho (TRTs, 2011 a 2025), com enunciado e alternativas sem
alteração e gabarito oficial conferido contra os PDFs da FCC.

## Atualizar

Quando o banco mudar lá, copie o arquivo para esta pasta e rode, um por vez:

```powershell
Copy-Item "$HOME\Documents\Concurso TRT-4 TI\03-banco-de-questoes\questoes.json" "conteudo\provas\questoes.json"
```

```powershell
npm run generate:content
```

```powershell
npm test
```

O resumo do gerador mostra quantas entraram e por que as outras ficaram de fora.
Ele grava `src/data/examQuestions.ts`; não edite esse arquivo à mão.

## O que entra no jogo

Entram as questões com enunciado, sem figura, com gabarito de A a E, de escopo `edital` ou `paralelo`,
cuja ficha principal (`ids[0]`) existe no jogo. Ficam de fora, por enquanto, Português e Raciocínio Lógico,
porque o jogo não tem região para elas.

- **`edital`**: entram no duelo com o NPC da ficha, no mini-boss e no chefe.
  Mini-boss e chefe usam metade de questões reais e metade autorais ou estilo FCC.
- **`paralelo`**: regra de outro TRT (Regimento, Código de Ética). Só treino (monstros e duelos),
  com aviso na tela; nunca em mini-boss ou chefe.
- O cargo da questão no jogo é o da ficha no edital do TRT-4 2026. O cargo da prova de origem aparece na tela.
- As questões reais **não contam** para o Dominada ★. A contagem delas fica no Grimório, dentro de cada ficha.
- O "Por quê?" mostra o gabarito oficial e de qual prova a questão veio, mais a ficha ligada **para revisar**.
  A ligação com a ficha foi automática na maior parte das provas: não é a justificativa do gabarito.
- Do texto, só `<u>`, `<mark>`, `<sup>` e quebras de linha viram formatação. O resto aparece como texto,
  inclusive código como `<stdio.h>` ou `<script>`.
