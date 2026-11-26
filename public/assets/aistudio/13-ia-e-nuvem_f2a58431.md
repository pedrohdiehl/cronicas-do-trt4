---
materia: Inteligência Artificial e Computação em Nuvem
cai_em: [Analista TI (IA), Técnico TI (Nuvem), Ambos (assistentes de IA no desenvolvimento — ver arquivo 04)]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Inteligência Artificial e Computação em Nuvem

> **Analista:** "Inteligência Artificial: conceitos de aprendizado de máquina; redes neurais; IA generativa e grandes modelos de linguagem (LLMs)".
> **Técnico:** "Nuvem Computacional: arquitetura em nuvem; nuvem pública e privada; IaaS, PaaS e SaaS; implantação e operação de aplicações em nuvem e contêineres; Kubernetes, Docker, **Serverless Framework**" + "noções de Serverless computing, Cloud Computing".
> **Ambos:** uso de assistentes de IA no desenvolvimento ([[ia-assistentes-dev]], arquivo 04).
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[machine-learning]] 🟣 Aprendizado de máquina (ML)

- **O que é (Google ML Crash Course):** treinar um software — o **modelo** — para **fazer previsões ou gerar conteúdo a partir de dados**.
- **Categorias:**
  - **Supervisionado:** aprende com dados **rotulados** (já com a resposta certa). Usos clássicos: **regressão** (prever número — ex.: tempo de tramitação) e **classificação** (prever categoria — ex.: assunto de uma petição).
  - **Não supervisionado:** dados **sem rótulo**; acha padrões, típico **clustering** (agrupar processos parecidos). O modelo não sabe o que cada grupo "significa" — quem interpreta é a pessoa.
  - **Por reforço:** um **agente** age num ambiente e aprende por **recompensas/penalidades** (ex.: robôs, AlphaGo).
  - **IA generativa:** **cria conteúdo novo** (texto, imagem, música) aprendendo padrões dos dados existentes.
- **Termos que caem:** *features* (atributos de entrada), *label* (rótulo), treino × validação × teste, **overfitting** (decorou o treino, vai mal em dado novo) × underfitting, métricas (acurácia, precisão, *recall*).
- **Fontes:** [Google – What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml?authuser=1) · [Google – ML Glossary](https://developers.google.com/machine-learning/glossary/)

## [[redes-neurais]] 🟣 Redes neurais

- **O que é:** modelo formado por **camadas de neurônios artificiais** (entrada → ocultas → saída); cada neurônio soma entradas **ponderadas por pesos** + viés e aplica uma **função de ativação** (ex.: ReLU, sigmoide) — é ela que permite aprender relações **não lineares**.
- **Treino:** ajustar os pesos para reduzir a **função de perda**, com **backpropagation** (retropropagação do erro) + gradiente descendente.
- **Deep learning:** redes com **muitas camadas ocultas**. Tipos: **CNN** (imagens), **RNN/LSTM** (sequências — processam um token por vez, sem paralelismo), **Transformer** (atenção — base dos LLMs).
- **Fontes:** [Google – ML Glossary: Fundamentals (backpropagation, ativação)](https://developers.google.com/machine-learning/glossary/fundamentals?authuser=3) · [Google MLCC – Neural networks](https://developers.google.com/machine-learning/crash-course?authuser=8)

## [[ia-llm]] 🟣 IA generativa e LLMs (grandes modelos de linguagem)

- **LLM:** modelo que **prevê o próximo token** (ou sequência de tokens) — um **token** pode ser uma palavra, um pedaço de palavra ou um caractere. Ganham dos modelos antigos pelo **enorme número de parâmetros** e pela capacidade de usar **contexto amplo**.
- **Transformer:** arquitetura do artigo **"Attention Is All You Need" (2017, 8 pesquisadores do Google)**. Peça central: **autoatenção (self-attention)** — o modelo pesa a importância de cada token em relação aos outros (ex.: a que palavra o "ele" se refere). Usa **atenção multi-cabeça** e pode ter **codificador** e **decodificador** (BERT = encoder; GPT = decoder).
- **Riscos:** **alucinação** (resposta fluente mas falsa), **viés**, alto custo computacional.
- **RAG (Retrieval-Augmented Generation):** buscar documentos confiáveis e entregá-los ao modelo junto com a pergunta → **reduz alucinação** e melhora a exatidão factual.
- **Outros termos:** *prompt*, janela de contexto, *fine-tuning*, *embeddings* (vetores que representam significado), agentes (LLM que usa ferramentas).
- **Exemplo prático:** assistente que resume petições trabalhistas — com RAG sobre a jurisprudência do TRT4 e **revisão humana obrigatória**.
- **Conexão normativa (extra, fora do edital):** a **Resolução CNJ nº 615/2025** (11/03/2025) regula desenvolvimento, governança, auditoria e uso de IA (inclusive **generativa**) no Judiciário, com **classificação de riscos**, vedação de usos de risco excessivo e **supervisão humana**; **revogou a Res. CNJ 332/2020**. ⚠️ Uma fonte de escritório de advocacia cita alteração pela Res. CNJ 674/2026 — conferir no portal de atos do CNJ.
- **Conexões:** [[ia-assistentes-dev]] · [[lgpd]] (dados pessoais em prompts) · [[owasp]] (riscos de cadeia de suprimentos/segurança de aplicações) · [[itil]] (Version 5 traz governança de IA) · [[pmbok]] (8ª ed. cobre IA)
- **Fontes:** [Google MLCC – What's a large language model?](https://developers.google.com/machine-learning/crash-course/llm/transformers) · [Cambridge – Architecture of language understanding (RAG, alucinação)](https://www.cambridge.org/core/journals/cambridge-forum-on-ai-law-and-governance/article/architecture-of-language-understanding-the-mechanics-behind-llms/E3DDEFB9C04883733380E04331D6F782) · [Wikipedia – Attention Is All You Need](https://en.Wikipedia.com/wiki/Attention_Is_All_You_Need) · [CNJ – Resolução 615/2025 (PDF)](https://atos.cnj.jus.br/files/original1555302025031467d4517244566.pdf) · [Revista TRF3 – Res. 615 revoga a 332](https://revista.trf3.jus.br/index.php/rtrf3/article/download/742/700)

---

## [[nuvem]] 🔵 Computação em nuvem (NIST SP 800-145)

- **Definição oficial (NIST, 2011):** modelo que permite **acesso conveniente, sob demanda e pela rede** a um **conjunto compartilhado de recursos configuráveis** (redes, servidores, armazenamento, aplicações, serviços) que podem ser **provisionados e liberados rapidamente** com mínimo esforço de gestão. Composto de **5 características essenciais, 3 modelos de serviço e 4 modelos de implantação**.
- **5 características essenciais:** **autoatendimento sob demanda** · **amplo acesso pela rede** · **pool de recursos** (multi-inquilino) · **elasticidade rápida** · **serviço medido** (paga pelo uso).
- **3 modelos de serviço (quem gerencia o quê):**

| Modelo | O cliente controla | Exemplo |
| --- | --- | --- |
| **IaaS** | SO, aplicações, dados (provedor cuida do hardware/virtualização) | máquinas virtuais, discos |
| **PaaS** | aplicações e dados (provedor cuida também do SO e runtime) | plataforma para publicar app Java/Node |
| **SaaS** | quase nada — só usa o software (no máximo configurações) | webmail, Microsoft 365 |

- **4 modelos de implantação:** **privada** (uso exclusivo de uma organização) · **comunitária** (grupo com interesses comuns — ex.: órgãos do Judiciário) · **pública** (aberta ao público em geral) · **híbrida** (combinação, com portabilidade).
- **Exemplo prático:** a PDPJ-Br roda em **nuvem** com contêineres orquestrados por Kubernetes/Rancher; um tribunal pode manter dados sensíveis em nuvem **privada** e serviços de pico em **pública** → **híbrida**.
- **Conexões:** [[docker]] · [[kubernetes]] · [[rancher]] · [[microsservicos]] · [[res-cnj-335-2020]] (PDPJ "em nuvem") · [[lgpd]] (onde ficam os dados) · [[vpn-ztna]] (Zero Trust)
- **Fontes:** [NIST SP 800-145 (PDF)](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf) · [NIST – resumo da definição](https://www.nist.gov/node/402511) · [NIST – publicação](https://www.nist.gov/publications/nist-definition-cloud-computing?pub_id=909616)

## [[serverless]] 🔵 Serverless computing e Serverless Framework

- **Serverless:** o desenvolvedor publica **funções/código** e o provedor cuida de servidores, escala e disponibilidade; cobra-se **por execução**. Funções são acionadas por **eventos** (requisição HTTP, mensagem em fila, agendamento, arquivo no storage). Exemplo de plataforma: **AWS Lambda** (FaaS – *Function as a Service*).
- **Serverless Framework:** ferramenta de **linha de comando** que **implanta aplicações na AWS a partir de um único arquivo `serverless.yml`**: o código das **funções Lambda**, os **eventos** que as disparam e os **recursos** de infraestrutura necessários.
  - Conceitos: **service** (unidade de organização/projeto), **functions**, **events**, **resources** (CloudFormation), **plugins**.
  - Deploy com **`serverless deploy`** — tudo vira um **stack CloudFormation**.
- **Exemplo:**
  ```yaml
  service: consulta-processo
  provider:
    name: aws
  functions:
    consultar:
      handler: handler.consultar
      events:
        - httpApi: { path: /processos/{numero}, method: get }
  ```
- **Conexões:** [[nuvem]] (serverless ≈ evolução do PaaS/FaaS) · [[arquiteturas]] · [[ci-cd]] (deploy automatizado) · [[mensageria]] (eventos)
- **Fontes:** [Serverless Framework – documentação](https://serverless.com/framework/docs) · [Serverless Framework – Concepts](https://www.serverless.com/framework/docs/providers/aws/guide/intro) · [Serverless Framework – Events](https://serverless.com/framework/docs/providers/aws/guide/events/)

## [[conteineres-nuvem]] 🔵 Implantação de aplicações em nuvem e contêineres (lembrete)

- Docker empacota a aplicação + dependências numa **imagem**; Kubernetes **orquestra** (pods, deployments, services, escala); Rancher **gerencia vários clusters**. Detalhes no arquivo 05 ([[docker]], [[kubernetes]], [[rancher]]).

---

## Mapa de conexões — IA e Nuvem

```
ML: supervisionado (regressão/classificação) · não supervisionado (clustering) · reforço (agente) · generativa
   └─ Redes neurais (pesos, ativação, backpropagation) → deep learning → Transformer (2017, self-attention)
          └─ LLM (prevê tokens) → riscos: alucinação, viés → RAG (reduz alucinação)
                 └─ Assistentes de IA no desenvolvimento (arquivo 04) · Res. CNJ 615/2025 (risco + supervisão humana) · LGPD
Nuvem (NIST 800-145): 5 características · IaaS/PaaS/SaaS · privada/comunitária/pública/híbrida
   └─ contêineres (Docker → Kubernetes → Rancher) → PDPJ-Br
   └─ serverless/FaaS (AWS Lambda) ← Serverless Framework (serverless.yml: functions + events + resources)
```
