---
materia: Gestão e Governança de TI (PMBOK 8ª edição, ITIL Version 5, COBIT 2019)
cai_em: [Analista TI]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Gestão e Governança de TI

> Bloco **só do Analista** no edital ("Gestão e Governança de TI: PMBOK 8ª Edição; ITIL Version 5; COBIT 2019"). O Técnico vê governança via **Modelo de Governança de TIC do TRT4** e **PDTIC** (arquivo 03).
> Ideia que amarra tudo: **COBIT = governança** (o que a alta administração direciona e monitora) · **ITIL = gestão de serviços** (como entregar e operar) · **PMBOK = gestão de projetos** (como entregar mudanças com início e fim).
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[pmbok]] 🟣 PMBOK® Guide — 8ª edição (PMI)

- **O que é:** o guia de gerenciamento de projetos do **PMI** + *The Standard for Project Management*. **8ª edição publicada em novembro/2025** (408 páginas), construída com mais de 48 mil pontos de dados de profissionais.
- **O que mudou em relação à 7ª:** mantém a base de **princípios + domínios de desempenho**, mas **simplifica**:
  - **6 princípios** (eram 12 na 7ª): visão **holística**, foco em **valor**, **qualidade** incorporada, **liderança com responsabilidade (accountability)**, **sustentabilidade** integrada, **equipes empoderadas**.
  - **7 domínios de desempenho:** **governança, escopo, cronograma, finanças, partes interessadas (stakeholders), recursos e risco**.
  - **Volta da orientação por processos**, agora de forma **não prescritiva**, chamada de **"focus areas"** (áreas de foco).
  - Mais conteúdo sobre **IA**, **PMO** e **aquisições (procurement)**; continua cobrindo abordagens **preditivas, ágeis e híbridas** e **tailoring** (adaptar ao contexto).
- **Datas úteis:** a 7ª edição deixou de ser vendida/baixada pelo PMI em **08/07/2026**; o exame PMP passou ao padrão da 8ª em **09/07/2026**.
- ⚠️ As áreas de foco parecem corresponder aos antigos grupos de processos (iniciação, planejamento, execução, monitoramento e controle, encerramento) — **confirmar no texto do guia** antes de usar em prova. A lista dos 7 domínios veio da página do PMI ("governance, scope, schedule, finance, stakeholders, resources, and risk").
- **Exemplo prático:** o projeto "migrar o banco do sistema X do PostgreSQL 14 para o 18" — escopo, cronograma, custo (finanças), riscos (indisponibilidade), partes interessadas (varas, Secretaria), governança (Comitê de TIC aprova).
- **Conexões:** [[ageis]] (Scrum/Kanban como abordagens adaptativas) · [[pdtic-trt4]] (projetos do plano) · [[governanca-tic-trt4]] (portfólio) · [[iso-27005]] (risco)
- **Fontes:** [PMI – PMBOK Guide 8ª edição](https://www.pmi.org/standards/pmbok?afsrc=1) · [PMI – visão geral (6 princípios, 7 domínios)](https://www.pmi.org/PMBOK-guide) · [PMI – about (7ª até 08/07/2026)](https://www.pmi.org/pmbok-guide-standards/foundational/pmbok/about)

## [[itil]] 🟣 ITIL® (Version 5)

- **O que é:** o framework de **gerenciamento de serviços (e agora de produtos) digitais**, mantido pela **PeopleCert**. A **ITIL (Version 5)** foi lançada com o **ITIL Foundation em fevereiro/2026**, com módulos avançados em fases. ITIL 4 e Version 5 convivem; certificações antigas continuam válidas.
- **O que continua (herança do ITIL 4):** os **princípios orientadores**, as **quatro dimensões** e as **práticas** ("o antigo").
- **O que é novo:**
  - **ITIL Product and Service Lifecycle** — modelo que **une gestão de produto digital e de serviço**;
  - foco em **experiência** (cliente/usuário/colaborador) com orientação prática;
  - **IA** integrada (inclusive **governança de IA**);
  - **ITIL Value System** atualizado como modelo central;
  - **34 práticas** (Version 5).
- **Trilha de certificação:** Foundation → designações (**ITIL Product, ITIL Service, ITIL Experience** …) → **ITIL Master**.
- **Lembrete do ITIL 4 (base que a banca costuma cobrar):** **7 princípios orientadores** — foco no valor; comece de onde você está; progrida iterativamente com feedback; colabore e promova visibilidade; pense e trabalhe de forma holística; mantenha simples e prático; otimize e automatize. **4 dimensões** — organizações e pessoas; informação e tecnologia; parceiros e fornecedores; fluxos de valor e processos. ⚠️ (lista do ITIL 4 por conhecimento consolidado; conferir se a Version 5 mudou a redação)
- **Práticas clássicas que caem:** gerenciamento de **incidente** (restaurar o serviço rápido) × **problema** (achar a **causa raiz**) · **requisição de serviço** · **mudança** (habilitação de mudanças) · **central de serviço (service desk)** · **nível de serviço (SLA)**.
- **Exemplo prático:** o PJe cai numa vara → **incidente** (restabelecer); o time descobre que a causa é um *pool* de conexões mal configurado → **problema**; a correção entra por **gerenciamento de mudança**.
- **Conexões:** [[governanca-tic-trt4]] · [[snmp-gerencia]] (SLA/QoS) · [[backup]] (continuidade) · [[devops]] (Value System integra Lean/Agile/DevOps)
- **Fontes:** [ITSM.tools – ITIL Version 5 explained](https://itsm.tools/itil-version-5-explained-key-changes-lifecycle-ai-governance/) · [ITSM.tools – o que é velho e o que é novo](https://itsm.tools/?p=36383) · [Global Knowledge – ITIL Version 5 FAQ (34 práticas)](https://www.globalknowledge.com/en-ca/certifications/certification-training/itil/itil-version-5-certification-faq) · [New Horizons – lançamento fev/2026](https://www.newhorizons.com/resources/blog/what-is-itil-version-5)
- ⚠️ Fontes são de parceiros de treinamento/comunidade; a publicação oficial (PeopleCert) é paga — refinar quando tiver acesso.

## [[cobit]] 🟣 COBIT® 2019 (ISACA)

- **O que é:** framework de **governança e gestão de informação e tecnologia (I&T) corporativa** da **ISACA**, lançado em **2018** (sucessor do COBIT 5, de 2012).
- **Governança × gestão:** **governança** = **Avaliar, Dirigir e Monitorar (EDM)** — papel do conselho/alta direção; **gestão** = planejar, construir, executar e monitorar.
- **40 objetivos** (cada um ligado a **um processo**), em **5 domínios**:

| Domínio | Tipo | Nº |
| --- | --- | --- |
| **EDM** – Evaluate, Direct and Monitor | governança | 5 |
| **APO** – Align, Plan and Organize | gestão | 14 |
| **BAI** – Build, Acquire and Implement | gestão | 11 |
| **DSS** – Deliver, Service and Support | gestão | 6 |
| **MEA** – Monitor, Evaluate and Assess | gestão | 4 |

  → **5 de governança + 35 de gestão = 40** (eram 37 processos no COBIT 5).
- **Componentes do sistema de governança** (substituem os "habilitadores" do COBIT 5) — **7**: processos; estruturas organizacionais; princípios, políticas e frameworks; informação; cultura, ética e comportamento; pessoas, habilidades e competências; serviços, infraestrutura e aplicações.
- **Novidades do 2019:** **fatores de desenho (design factors)** que adaptam o sistema de governança à organização; **áreas de foco** (ex.: DevOps, risco, segurança); **cascata de metas** atualizada; gestão de desempenho por **níveis de capacidade** (alinhada ao CMMI).
- **Exemplo prático:** o **Comitê de Governança de TIC do TRT4** (que prioriza e monitora) faz o papel de **EDM**; a **SGTI** (Secretaria-Geral de Tecnologia e Inovação, antiga SETIC) executa APO/BAI/DSS; auditoria interna e indicadores do PDTIC ≈ **MEA**.
- **Conexões:** [[governanca-tic-trt4]] · [[pdtic-trt4]] · [[cmmi]] (níveis de capacidade) · [[iso-27001]] (segurança é área de foco) · [[res-cnj-396-2021]] · [[itil]] (DSS ≈ operação de serviços)
- **Fontes:** [ISACA – COBIT 2019 × COBIT 5 (37→40, design factors)](https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-2019-and-cobit-5-comparison) · [ISACA – "A new COBIT is in town" (componentes, EDM)](https://www.isaca.org/resources/news-and-trends/industry-news/2018/a-new-cobit-is-in-town-and-i-really-like-how-it-looks) · [ISACA – Governance & Management Objectives (40)](https://www.isaca.org/bookstore/cobit-19/cb19fgm) · [ManageEngine – 5 de governança + 35 de gestão; 7 componentes](https://www.manageengine.com/products/service-desk/itsm/cobit-vs-itil.html)
- ⚠️ A contagem por domínio (14/11/6/4) e os nomes exatos dos 7 componentes vêm de conhecimento consolidado do COBIT 2019, coerentes com o total 40 e "5 + 35" confirmados nas fontes; conferir no *Framework: Introduction & Methodology* (download gratuito no site da ISACA).

---

## Mapa de conexões — Governança e Gestão

```
                 GOVERNANÇA (COBIT 2019: EDM)  ←→  Comitê de Governança de TIC do TRT4
                          │ dirige / monitora
        ┌─────────────────┼─────────────────────────┐
        ▼                 ▼                         ▼
  APO (planejar)     BAI (construir)          DSS (entregar/suportar)        MEA (monitorar)
  PDTIC 2024-2026    PROJETOS → PMBOK 8        SERVIÇOS → ITIL Version 5      indicadores, auditoria
                     (6 princípios,            (incidente × problema,
                      7 domínios, tailoring)    mudança, SLA, Product & Service Lifecycle)
                          │                         │
                     Ágil/Scrum/Kanban         DevOps / CI-CD / monitoramento
Riscos: COBIT (área de foco) ↔ PMBOK (domínio Risco) ↔ ISO 27005 ↔ ENSEC-PJ
Capacidade: COBIT (níveis) ↔ CMMI v3.0 ↔ MPS-SW
```
