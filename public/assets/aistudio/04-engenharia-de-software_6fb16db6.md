---
materia: Engenharia de Software (processos, qualidade, modelagem, ágeis, requisitos, testes)
cai_em: [Técnico TI, Analista TI]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Engenharia de Software

> Este é o bloco com **mais sobreposição** entre as duas provas. Estude uma vez, use duas.
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[processo-software]] 🟢 Processo de desenvolvimento de software e ciclo de vida

- **O que é:** conjunto organizado de atividades para produzir software (requisitos → projeto → implementação → testes → implantação → manutenção).
- **Modelos tradicionais** (o Técnico cobra "metodologias tradicionais"): cascata (fases sequenciais), incremental, espiral (iterativo e orientado a riscos). Contraste com ágeis → [[ageis]].
- **Exemplo prático:** um sistema de folha feito em cascata só é entregue no fim; em Scrum, entregas a cada Sprint.
- **Conexões:** [[iso-12207]] (padroniza os processos) · [[cmmi]] e [[mps-br]] (medem a maturidade dos processos) · [[pmbok]] (gestão do projeto)

---

## [[cmmi]] 🟢 CMMI v3.0 — domínio Development

- **O que é:** *Capability Maturity Model Integration*, modelo de melhoria de processos administrado pelo **CMMI Institute (ISACA)**. A **v3.0 saiu em 6 de abril de 2023**; desde 01/01/2024 só se aceitam avaliações na v3.0.
- **Níveis de maturidade (5):** 1 Inicial · 2 Gerenciado · 3 Definido · 4 Quantitativamente Gerenciado · 5 Em Otimização.
- **Novidades da v3.0:**
  - Domínios: **Data, Development, People, Safety, Security, Services, Suppliers e Virtual** (o antigo "Supplier Management" virou "Suppliers").
  - Nova *Capability Area* **Managing Data** e novas *Practice Areas*: **Data Management (DM), Data Quality (DQ) e Workforce Empowerment (WE)**.
  - Informações de contexto para **DevSecOps**, Data e People.
  - A área *Supplier Source Selection* foi aposentada (parte foi para *Supplier Agreement Management*).
- **Desde a v2.0:** não há mais as representações "contínua" e "por estágios" separadas — é um modelo único.
- **Exemplo prático:** uma fábrica de software contratada pelo tribunal pode ter que comprovar CMMI nível 3 (processos padronizados na organização).
- **Conexões:** [[mps-br]] (versão brasileira, mapeável ao CMMI) · [[cobit]] (também usa níveis de capacidade) · [[devops]]
- **Fontes:** [CMMI Institute – Content Changes v3.0](https://cmmiinstitute.com/getattachment/47a7c84e-472c-4f7f-a473-ddc21c6ae045/attachment.aspx) · [ISACA – press release](https://www.isaca.org/about-us/newsroom/press-releases/2023/isaca-updates-cmmi-model-with-three-new-domains-that-help-organizations-improve-quality) · [The Core Solution – v3.0](https://www.thecoresolution.com/cmmi-v3-update-explained)

---

## [[iso-12207]] 🟢 ABNT NBR ISO/IEC/IEEE 12207:2021 — processos do ciclo de vida do software

- **O que é:** norma que define um vocabulário e um conjunto de **processos** para o ciclo de vida do software. A ABNT 2021 é a adoção brasileira da edição internacional de **2017**.
- **4 grupos de processos:**
  1. **Acordo** (aquisição e fornecimento);
  2. **Habilitação de projetos organizacionais** (gestão de modelo de ciclo de vida, infraestrutura, portfólio, RH, qualidade);
  3. **Gestão técnica** (planejamento, avaliação e controle, decisão, **riscos**, **configuração**, informação, medição, garantia da qualidade);
  4. **Técnicos** (requisitos, arquitetura, projeto, implementação, integração, verificação, transição, validação, operação, manutenção, descarte).
- **Ponto que cai:** a norma **não prescreve** modelo de ciclo de vida, metodologia ou técnica — ela diz *o que* os processos devem alcançar, não *como*.
- ⚠️ Saiu a **ISO/IEC/IEEE 12207:2026** (abril/2026), mas o edital cobra a versão ABNT 2021.
- **Conexões:** [[mps-br]] (o MPS nasceu baseado na 12207) · [[git]] (gestão de configuração) · [[iso-27005]]
- **Fontes:** [Wikipedia – ISO/IEC 12207](https://en.wikipedia.org/wiki/ISO/IEC_12207) · [arc42 quality – resumo](https://quality.arc42.org/standards/iso12207) · [IEEE – 12207-2026](https://standards.ieee.org/standard/12207-2026.html)

---

## [[mps-br]] 🟢 MR-MPS-SW versão 2024 (MPS.BR)

- **O que é:** Modelo de Referência MPS para Software, iniciativa brasileira coordenada pela **SOFTEX**. Versão vigente: **Guia Geral MPS de Software:2024**.
- **7 níveis de maturidade (do G ao A):**

| Nível | Nome |
| --- | --- |
| G | Parcialmente Gerenciado |
| F | Gerenciado |
| E | Parcialmente Definido |
| D | Largamente Definido |
| C | Definido |
| B | Gerenciado Quantitativamente |
| A | Em Otimização |

- **Estrutura atual:** nos níveis **G e F** os **processos** são implementados; nos níveis E a A ocorre a **evolução da capacidade** desses processos.
- **Comparação com o CMMI:** o MPS tem 7 degraus (mais graduais, pensados para pequenas e médias empresas), o CMMI tem 5.
- **Exemplo de cobrança (questão real de concurso):** "assinale a afirmativa que descreve o nível D" → gestão mais rigorosa da execução dos processos e dos produtos de trabalho.
- **Conexões:** [[cmmi]] · [[iso-12207]]
- **Fontes:** [Gran – questão MPS-SW:2024](https://questoes.grancursosonline.com.br/questoes-de-concursos/tecnologia-da-informacao-mps-br-qualidade-de-software-428905) · [SBC – WAMPS (estrutura 2024)](https://sol.sbc.org.br/index.php/wamps/article/download/33373/33168)
- ⚠️ A lista exata de processos por nível mudou entre as versões do guia. Antes de decorar, confira no Guia Geral MPS de Software:2024 (site da SOFTEX).

---

## [[uml]] 🟢 UML 2.5.1

- **O que é:** *Unified Modeling Language*, mantida pela **OMG**. Notação para modelar sistemas orientados a objetos.
- **14 diagramas em 2 grupos:**
  - **Estruturais (estáticos):** classes, objetos, componentes, implantação, pacotes, estrutura composta, perfil.
  - **Comportamentais (dinâmicos):** casos de uso, atividades, máquina de estados, e os de **interação**: sequência, comunicação, visão geral de interação, tempo.
- **Exemplo prático:** o diagrama de **sequência** mostra a ordem das chamadas entre o front-end Angular, o API Gateway e um microsserviço.
- **Conexões:** [[oo]] (diagrama de classes = herança, interfaces, associações) · [[bpmn]] (atividades da UML × processos de negócio do BPMN) · [[engenharia-requisitos]] (casos de uso)
- **Fontes:** [Gran – UML 2.5](https://blog.grancursosonline.com.br/uml/amp/) · [Lucid – UML e OMG](https://lucid.co/pt/diagrama/uml/tutorial)

---

## [[bpmn]] 🟢 BPMN (Business Process Model and Notation)

- **O que é:** notação da **OMG** para modelar **processos de negócio**. A versão 2.0 (2011) mudou o nome para "Modelo e Notação de Processos de Negócio".
- **4 categorias de elementos:**
  1. **Objetos de fluxo:** eventos (início, intermediário, fim), atividades (tarefas, subprocessos), **gateways** (exclusivo, inclusivo, paralelo, baseado em eventos, complexo).
  2. **Objetos de conexão:** **fluxo de sequência** (ordem dentro de um participante), **fluxo de mensagem** (entre participantes/pools), associação.
  3. **Raias (swimlanes):** **pool** (participante) e **lane** (subdivisão dentro do pool).
  4. **Artefatos:** objeto de dados, grupo, anotação.
- **Pegadinha clássica:** fluxo de sequência **não cruza** pools; entre pools usa-se **fluxo de mensagem**.
- **Exemplo prático:** o TRT4 tem um processo formal de "Modelagem e Gestão de Processos de TIC" (Portaria GP.TRT4 76/2025) — é BPMN no dia a dia.
- **Conexões:** [[uml]] · [[itil]] (processos de serviço) · [[governanca-tic-trt4]]
- **Fontes:** [Lucidchart – o que é BPMN](https://www.lucidchart.com/pages/pt/o-que-e-bpmn) · [USP – BPMN 2.0](https://edisciplinas.usp.br/mod/resource/view.php?id=2680876)

---

## [[ageis]] 🟢 Métodos ágeis: Scrum, Kanban, XP

### Scrum (Guia 2020)
- **Estrutura "3-5-3":**
  - **3 responsabilidades (*accountabilities*):** Product Owner, Scrum Master, Developers. Um único Scrum Team, **sem sub-times ou hierarquias**.
  - **5 eventos:** Sprint (contêiner), Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.
  - **3 artefatos e seus compromissos:** Product Backlog → **Meta do Produto**; Sprint Backlog → **Meta da Sprint**; Incremento → **Definição de Pronto (DoD)**.
- **Mudanças de 2020 que caem:** "papéis" viraram "responsabilidades"; acabou o "Time de Desenvolvimento" (agora "Developers"); entrou a **Meta do Produto**; saíram as 3 perguntas da Daily.
- **Product Owner** é **uma pessoa**, não um comitê.
- ⚠️ Em 2025 saiu o *Scrum Guide Expansion Pack* (Sutherland, Jocham, Coleman) — é **complemento**, não substitui o Guia 2020.

### Kanban
- **O que é:** método de gestão de fluxo originado no sistema de produção da Toyota.
- **Práticas centrais:** **visualizar** o fluxo (quadro), **limitar o WIP** (trabalho em andamento), gerenciar o fluxo, políticas explícitas, ciclos de feedback, melhoria contínua. Métricas: *lead time*, *cycle time*, diagrama de fluxo cumulativo.
- **Diferença para o Scrum:** fluxo **contínuo**, sem Sprints de tamanho fixo.

### XP (Extreme Programming)
- **Foco:** qualidade técnica do código.
- **Práticas famosas:** programação em par, **TDD** (teste antes do código), **integração contínua**, refatoração, *releases* pequenas, propriedade coletiva do código.
- **Conexões:** [[testes-software]] (TDD) · [[ci-cd]] (integração contínua) · [[devops]]
- **Fontes:** [Scrum Guide 2020](https://www.scrumguides.org/scrum-guide.html) · [Revisões 2020](https://scrumguides.org/revisions.html) · [Expansion Pack 2025](https://sensiolabs.com/blog/2025/scrum-guide-expansion-pack-2025-key-insights-you-need-to-know) · [Atlassian – Kanban](https://www.atlassian.com/br/agile/kanban)

---

## [[engenharia-requisitos]] 🟢 Engenharia de requisitos

- **O que é:** processo de descobrir, documentar e manter o que o sistema deve fazer.
- **Etapas:** elicitação → análise → especificação → validação → gestão de requisitos.
- **Tipos:**
  - **Funcionais:** o que o sistema faz ("emitir certidão negativa").
  - **Não funcionais:** qualidades e restrições ("responder em até 2 s", "seguir a LGPD", "aderir ao MoReq-Jus").
- **Técnicas de elicitação:** entrevistas, questionários, workshops, observação, leitura de documentos, protótipos.
- **Conexões:** [[moreq-jus]] (é um catálogo de requisitos obrigatórios/desejáveis!) · [[uml]] (casos de uso) · [[lgpd]] (requisito não funcional) · [[ageis]] (histórias de usuário no Product Backlog)
- **Fontes:** [USP – Engenharia de Requisitos](https://edisciplinas.usp.br/mod/resource/view.php?id=5259573) · [UFPE – SWEBOK](https://www.cin.ufpe.br/~processos/TAES3/Livro/00-LIVRO/11-SWEBOK-v8_CORRIGIDO_Versao_Final_OK.pdf)

---

## [[low-code]] 🟢 Low-code e no-code

- **Low-code:** abordagem **visual** de desenvolvimento, com mínimo de codificação manual (arrastar e soltar, componentes prontos, modelos). Ainda permite código/scripts.
- **No-code:** para a Gartner, é um **subconjunto** do low-code em que tudo (exceto fórmulas e expressões) é feito por modelagem visual ou configuração.
- **Base técnica:** design orientado a modelos, geração automática de código, programação visual.
- **Cidadão desenvolvedor (*citizen developer*):** usuário de negócio, sem formação em programação, que cria apps nessas plataformas — com **governança da TI**.
- **Exemplo prático:** um formulário de pedido de férias montado no Power Apps por um servidor do RH.
- **Riscos a lembrar:** *shadow IT*, dependência do fornecedor (atenção à proibição de dependência tecnológica do art. 5º da [[res-cnj-335-2020]]).
- **Fontes:** [IBM – low-code](https://www.ibm.com/topics/low-code) · [TechTarget – low-code (Gartner)](https://www.techtarget.com/news/5-FAQs-on-the-low-code-approach/864474/) · [Appian – Gartner](https://appian.com/blog/acp/low-code/low-code-vs-no-code)

---

## [[ia-assistentes-dev]] 🟢 Uso de assistentes de IA no desenvolvimento

- **O que é:** ferramentas baseadas em LLMs que sugerem código, testes, documentação e revisões dentro da IDE ou do terminal.
- **Usos típicos:** autocompletar, gerar testes unitários, explicar código legado, refatorar.
- **Cuidados (ligam com outras matérias):** revisar tudo (alucinações) → [[portaria-131-2021]] (revisão de código); não colar dados sigilosos ou pessoais → [[lgpd]]; checar vulnerabilidades → [[owasp]].
- **Conexões:** [[ia-llm]] (fundamentos de IA, só Analista) · [[testes-software]]
- ⚠️ Tema novo, sem norma única; refinar com material do CNJ sobre IA (ex.: resolução do CNJ sobre uso de IA no Judiciário) na próxima rodada.

---

## [[padroes-projeto]] 🔵 Padrões de projeto (GoF)

- **O que é:** 23 soluções reutilizáveis para problemas recorrentes de projeto OO, do livro *Design Patterns* (1994) da "Gangue dos Quatro" (Gamma, Helm, Johnson, Vlissides).
- **3 categorias:**
  - **Criacionais** (como criar objetos): Abstract Factory, Builder, **Factory Method**, Prototype, **Singleton**.
  - **Estruturais** (como compor classes/objetos): **Adapter**, Bridge, Composite, **Decorator**, **Facade**, Flyweight, **Proxy**.
  - **Comportamentais** (como objetos interagem): Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, **Observer**, State, **Strategy**, Template Method, Visitor.
- **Definições curtas que caem:**
  - **Singleton:** garante uma única instância com ponto global de acesso.
  - **Factory Method:** interface para criar objeto, deixando a subclasse decidir qual classe instanciar.
  - **Adapter:** converte a interface de uma classe na interface que o cliente espera.
  - **Strategy:** família de algoritmos intercambiáveis.
  - **Observer:** quando um objeto muda, os dependentes são notificados.
- **Princípios do livro:** "programe para uma interface, não para uma implementação"; "prefira composição a herança".
- **Conexões:** [[oo]] · [[spring-boot]] (o Spring usa Singleton para *beans*, Proxy para transações, Template Method no JdbcTemplate) · [[api-gateway]] (é um Facade/Proxy em nível de arquitetura)
- **Fontes:** [MIT – catálogo GoF](https://people.csail.mit.edu/addy/pattern/patcat.htm) · [LMU – tabela dos 23](https://cs.lmu.edu/~ray/notes/designpatterns/)

---

## [[testes-software]] 🟢/🔵 Testes de software (o Técnico aprofunda)

- 🟢 **Ambos:** testes automatizados (no Analista, junto com Selenium em DevOps).
- 🔵 **Técnico detalha:**
  - **Níveis:** unitário (uma classe/método), integração (componentes juntos), funcional (comportamento do ponto de vista do usuário).
  - **Cobertura de código:** % do código executado pelos testes (linhas, ramos).
  - **JUnit 6:** lançado em **30/09/2025**. Exige **Java 17** (e Kotlin 2.2); unificou a versão de **Platform, Jupiter e Vintage**; usa anotações **JSpecify** para nulidade; Vintage (JUnit 3/4) está **depreciado**.
  - **JUnit Jupiter:** o modelo de programação/extensão para escrever testes (`@Test`, `@BeforeEach`, `@ParameterizedTest`...).
  - **Migração do JUnit 5:** em geral compatível, mas é preciso Java 17+ e remover APIs depreciadas.
  - **Mockito:** biblioteca para criar **mocks** (objetos falsos) e isolar a unidade testada de dependências (banco, outros serviços).
- **Exemplo prático:** testar o `CalculadoraDePrazoService` com JUnit, usando Mockito para simular o repositório de feriados.
- **Conexões:** [[res-cnj-335-2020]] (exige "ampla cobertura de testes") · [[ci-cd]] (testes rodam no pipeline) · [[ageis]] (TDD no XP) · [[selenium]] (teste de interface, Analista)
- **Fontes:** [JUnit 6.0.0 – release notes](https://docs.junit.org/6.0.0/release-notes/) · [InfoQ – JUnit 6](https://www.infoq.com/news/2025/10/junit6-java17-kotlin)

---

## Mapa de conexões — Engenharia de Software

```
ISO 12207 (o QUE os processos fazem) ──base──> MPS-SW (7 níveis G→A) ~~ CMMI v3.0 (5 níveis)
Processo ─┬─ tradicional (cascata/espiral)
          └─ ágil: Scrum (3-5-3) · Kanban (WIP/fluxo) · XP (TDD, par, CI) ──> CI/CD ──> DevOps
Requisitos ──> UML (casos de uso, classes) ──> Padrões GoF ──> Spring (usa Singleton/Proxy)
BPMN (processo de negócio) ↔ UML atividades
Testes: JUnit 6 + Mockito ──> exigência da Res. 335 (cobertura) ──> pipeline CI
Low-code / IA no dev ──> riscos: dependência (Res. 335 art. 5º), LGPD, OWASP
```
