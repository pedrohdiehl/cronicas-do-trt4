# Questões autorais

Questões escritas à mão, conferidas contra as fichas de `public/assets/aistudio/*.md`.
Quando uma ficha tem 3 ou mais questões aqui, o jogo deixa de usar as questões geradas automaticamente para ela.

As de `06-seguranca` vieram do projeto anterior (RPG de mesa, `Documents/Concurso TRT-4 TI/03-jogo/conteudo/modulos/06-seguranca`), sem mudanças.

## Onde e como

- Uma pasta por matéria, com os dois números do arquivo da matéria: `06-seguranca`, `07-devops`...
- Um arquivo por nível: `nivel-N.yaml` ou `nivel-N-assunto.yaml`, com N de 1 a 3.
  O nível vira a dificuldade no jogo. **Nível 3 vai para mini-boss e chefe**; os níveis 1 e 2, para monstros comuns.
- Depois de editar, rode, um por vez:

```powershell
npm run generate:content
```

```powershell
npm test
```

Se algo estiver errado, o gerador não grava nada e diz arquivo, questão e o que corrigir.

## Formato

```yaml
- id: seg-iso27001-001            # único e para sempre: o progresso salvo depende dele
  fichas: [iso-27001]             # id entre [[ ]] no título da ficha
  nivel: 1                        # o mesmo do nome do arquivo
  cargo: ambos                    # ambos, tec (🔵) ou ana (🟣)
  origem: autoral
  enunciado: A ABNT NBR ISO/IEC 27001 é uma norma de
  alternativas:                   # de 2 a 5; prefira 5, todas plausíveis e do mesmo assunto
    - requisitos para um SGSI.
    - boas práticas que detalham cada controle.
  correta: 0                      # conta a partir de 0
  explicacoes:                    # uma por alternativa, na mesma ordem
    - Correta. A 27001 traz os requisitos do SGSI.
    - Esse é o papel da 27002.
  evidencia: 'norma de **requisitos** para um **SGSI (Sistema de Gestão da Segurança da Informação)**'
```

Certo ou errado: troque `alternativas` e `correta: 0` por `tipo: certo-errado` e `correta: certo` (ou `errado`), com duas explicações, a de Certo e a de Errado.

`tipo: associacao` (com `pares`) e `tipo: ordenacao` (com `passos`) são validados, mas **ainda não aparecem no jogo**: a batalha só mostra uma alternativa por vez.

## Regras que o gerador confere

- `evidencia` é um trecho copiado **exatamente** de uma linha da ficha, com os `**` e tudo.
- O trecho não pode estar em item com ⚠️: incerteza não sustenta gabarito.
- O trecho e a ficha precisam valer para o `cargo` da questão.
- A ficha precisa ter linha de **Fontes**.
- Questão com selo "FCC" ainda não entra por aqui. Use o importador de prova real do jogo, com ano, órgão e cargo.

O que o gerador **não** confere: se o gabarito é único e se as alternativas erradas estão de fato erradas.
Por isso, todo lote novo passa por uma segunda revisão contra a ficha antes de entrar.

## YAML: cuidados

- Texto com `: ` ou ` #`, número (`'93'`) e texto que começa por símbolo vão entre aspas simples.
- Dentro das aspas simples, o apóstrofo é dobrado: `'copo d''água'`.
- Recuo com espaços, nunca Tab.
