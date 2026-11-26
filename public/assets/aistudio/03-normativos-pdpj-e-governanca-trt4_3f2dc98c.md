---
materia: Normativos da PDPJ-Br + Governança de TIC do TRT4
cai_em: [Técnico TI, Analista TI]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Normativos da PDPJ-Br e Governança de TIC do TRT4

> **Por que isso cai:** a Resolução CNJ 443/2022 obriga os editais de TI do Judiciário a cobrar os normativos e a arquitetura da PDPJ-Br. A ementa mínima está na Portaria CNJ 257/2022 (que substituiu a 25/2022) — e é praticamente a lista do seu edital.
> Todos os normativos abaixo estão no edital dos **dois cargos** (Técnico e Analista).

---

## Ponto de partida (não está no edital, mas explica tudo): [[res-cnj-335-2020]] Resolução CNJ nº 335/2020 — cria a PDPJ-Br

- **O que é:** institui a política pública de governança e gestão do processo judicial eletrônico e cria a **Plataforma Digital do Poder Judiciário Brasileiro (PDPJ-Br)**. Mantém o **PJe** como sistema prioritário do CNJ.
- **Ideia central:** em vez de cada tribunal ter um sistema monolítico, a PDPJ-Br é um conjunto de **aplicações e microsserviços mantidos de forma colaborativa** por vários tribunais.
- **Princípios técnicos (art. 2º/4º) — destaques:** desenvolvimento comunitário; **ampla cobertura de testes, baixo acoplamento, alta coesão, modularização**; **microsserviços**; **computação em nuvem**; **autenticação uniformizada**; interoperabilidade; portabilidade; mobilidade; adequação à **LGPD**; uso preferencial de **código aberto**.
- **Art. 5º:** proíbe contratar novo sistema, módulo ou funcionalidade **privados** (mesmo gratuitos) que cause dependência tecnológica.
- **Conexões:** é a "mãe" de [[portaria-252-2020]], [[portaria-253-2020]], [[portaria-131-2021]] e da stack em [[microsservicos]].
- **Fonte:** [Resolução 335/2020 compilada](https://atos.cnj.jus.br/files/compilado1615492024083066d1f035e94dc.pdf) · [Cartilha PDPJ (CNJ)](https://www.cnj.jus.br/wp-content/uploads/2021/10/cartilha-pdpj-30-09-2021.pdf)

---

## [[res-cnj-443-2022]] Resolução CNJ nº 443/2022 — PDPJ-Br nos editais

- **O que é:** obriga que os **editais de concursos de TI**, as contratações de terceirizados de TI e de **fábricas de software** do Judiciário exijam conhecimentos sobre a PDPJ-Br (art. 1º). Não se aplica a concursos já em curso na data de publicação (art. 4º).
- **Ementa mínima (Portaria CNJ 257/2022):**
  - **Normativos:** Res. 91/2009 (MoReq-Jus antigo) → hoje Res. 522/2023; Res. 335/2020; Portarias 252/2020 e 253/2020; Portaria 131/2021; Res. 396/2021; Portaria 162/2021.
  - **Arquitetura:** Java; microsserviços; API RESTful; JSON; Spring, Spring Cloud, Spring Boot, Spring Eureka, Zuul; MapStruct; Swagger; Service Discovery; API Gateway; JPA 2.0; Hibernate; Hibernate Envers; Flyway; PostgreSQL; H2; SSO; Keycloak; OAuth2 (RFC 6749); RabbitMQ; webhooks; Git; Kubernetes; Rancher; CI/CD.
- **Exemplo prático:** é por causa desta resolução que o seu edital tem um bloco inteiro de Spring/Keycloak/RabbitMQ.
- **Auditoria:** o próprio TRT4 foi auditado pelo CNJ em 2022 sobre isso e foi "cientificado" de que deve exigir esses conhecimentos nos concursos de TIC.
- **Fontes:** [Resolução 443/2022](https://atos.cnj.jus.br/atos/detalhar/4317) · [Portaria 257/2022 (DJe)](https://sintse.tse.jus.br/documentos/2022/Ago/2/diario-da-justica-eletronico-cnj-edicao-anterior/portaria-no-257-de-31-de-julho-de-2022-dispoe-sobre-a-ementa-basica-para-a-aplicacao-e-disseminacao-) · [Relatório de auditoria TRT4](https://www.trt4.jus.br/portais/media/1475270/2.%20Relat%C3%B3rio%20n%C2%BA%2002.2022.pdf)

---

## [[portaria-252-2020]] + [[portaria-284-2021]] Modelo de Governança e Gestão da PDPJ-Br

- **Portaria CNJ 252/2020 — o que é:** define quem manda e quem decide na PDPJ-Br.
- **Rede de Governança da PDPJ-Br (art. 4º):**
  1. Comissão Permanente de Tecnologia da Informação e Infraestrutura do CNJ (coordena a rede);
  2. **Comitê Gestor Nacional da PDPJ** (supervisão geral; homologa projetos de microsserviços);
  3. **Comitês Gestores dos Tribunais**;
  4. **Gerência Executiva da PDPJ**;
  5. Grupos de Trabalho.
- **Condição para integrar soluções (art. 2º):** integrar-se à arquitetura definida, consumindo e disponibilizando serviços. Componentes licenciados/proprietários só fora dos serviços essenciais e se puderem ser trocados por código aberto.
- **Portaria CNJ 284/2021 — o que mudou:** tornou **facultativo** criar comitê gestor local nos **TREs e TRTs**, porque eles seguem o modelo de gestão do TSE e do **CSJT**. Quem não criar mantém a interlocução com o CNJ pela Presidência ou pelos juízes auxiliares.
- **Exemplo prático:** o TRT4 não precisa ter um comitê gestor próprio da PDPJ — a coordenação da Justiça do Trabalho passa pelo CSJT.
- **Fontes:** [Portaria 252/2020](https://atos.cnj.jus.br/files/original194723202011205fb81d4b841ee.pdf) · [Portaria 284/2021](https://atos.cnj.jus.br/atos/detalhar/4227)

---

## [[portaria-253-2020]] Portaria CNJ nº 253/2020 — critérios técnicos de desenvolvimento

- **O que é:** regras técnicas para desenvolver módulos e serviços na PDPJ-Br. É a "Definition of Done" do Judiciário.
- **Pontos-chave encontrados nas fontes:**
  - Linguagem **Java** preferencial, com **Spring Boot**.
  - **Service Discovery** implementado com **Netflix Eureka** via **Spring Cloud Netflix**.
  - Microsserviços **versionados com Git**, com repositórios na plataforma do CNJ (gestão de demandas e versionamento).
  - **CI/CD** com pipelines de **testes automatizados**.
  - O CNJ designa um **líder técnico** para orientar cada projeto.
  - Prevê a modularização dos **sistemas monolíticos legados**.
- **Conexões:** [[spring-boot]] · [[service-discovery]] · [[git]] · [[ci-cd]] · [[testes-software]]
- **Fontes:** [Portaria 253/2020](https://atos.cnj.jus.br/atos/detalhar/3582) · [Gran – resumo](https://blog.grancursosonline.com.br/legislacao-de-governanca-e-gestao-de-tic-para-o-poder-judiciario/amp/)
- ⚠️ O site do CNJ falhou ao carregar o texto integral; os pontos acima vêm de trechos do ato e de resumo. Conferir o texto completo (ex.: percentual mínimo de cobertura de testes, se houver).

---

## [[portaria-131-2021]] Portaria CNJ nº 131/2021 — Grupo Revisor de Código-Fonte

- **O que é:** institui o **Grupo Revisor de Código-Fonte** das soluções da PDPJ-Br e do **PJe**.
- **Função:** analisar as mudanças de código feitas pela comunidade (CNJ e tribunais) e **executar testes de qualidade** do código e garantias operacionais.
- **Composição:** membros indicados pelo DTI/CNJ e representantes dos tribunais; **membros natos** = servidores da Divisão do PJe (DPJe). Atividade **honorífica** (sem remuneração extra).
- **O que ele NÃO faz:** escolher quais projetos serão desenvolvidos.
- **Exemplo prático:** é um *code review* institucional — um *merge request* de um tribunal só entra na versão nacional depois de revisado.
- **Conexões:** [[git]] (merge request, branch) · [[testes-software]] · [[devops]]
- **Fonte:** [Portaria 131/2021 (PDF)](https://atos.cnj.jus.br/files/original13380320210507609542bb50db1.PDF)

---

## [[res-cnj-522-2023]] Resolução CNJ nº 522/2023 + [[moreq-jus]] MoReq-Jus 2ª edição

- **O que é:** institui o **Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário (MoReq-Jus)** e torna obrigatório usá-lo no desenvolvimento e manutenção de sistemas judiciais e administrativos. Atualizou o modelo da antiga Res. 91/2009.
- **Art. 2º:** os sistemas, **ainda que segmentados em aplicações, módulos e microsserviços**, devem aderir ao MoReq-Jus para assegurar **confidencialidade, integridade, disponibilidade, autenticidade, não repúdio, conformidade e preservação** dos processos e documentos.
- **O que o MoReq-Jus cobre:** critérios para captura, produção, classificação, tramitação, guarda, avaliação, seleção, armazenamento, indexação, preservação e arquivamento de documentos. Cada requisito é **obrigatório** ou **desejável**.
- **Programa MoReq-Aval:** avalia o grau de aderência dos sistemas e atualiza o modelo continuamente.
- **Exemplo prático:** um novo módulo do PJe precisa registrar metadados de cada documento e permitir sua preservação de longo prazo — isso é requisito MoReq-Jus.
- **Conexões:** [[cid]] (os mesmos pilares CID + autenticidade e não repúdio) · [[criptografia]] (não repúdio) · [[engenharia-requisitos]] · [[microsservicos]]
- **Fontes:** [Resolução 522/2023](https://atos.cnj.jus.br/atos/detalhar/5266) · [CNJ – MoReq-Jus](https://www.cnj.jus.br/programas-e-acoes/gestao-documental-e-memoria-proname/gestao-documental/moreq-jus-e-sistemas-informatizados/) · [MoReq-Jus 2ª ed. (PDF)](https://portal.tjce.jus.br/uploads/2023/07/moreq-jus-2a-edicao.pdf)

---

## [[res-cnj-574-2024]] Resolução CNJ nº 574/2024 — dados judiciais públicos, serviços privados e portal unificado

- **O que é (ementa):** dispõe sobre o acesso a **dados judiciais públicos consolidados pelo CNJ**, prevê o **depósito de serviços privados na PDPJ-Br** e institui o **portal unificado para usuários internos**.
- **Pontos-chave:**
  - O CNJ pode oferecer acesso aos dados por **APIs** ou outras interfaces centralizadas, podendo cobrar de quem efetivamente consome o serviço.
  - Alterou o art. 11 da Res. 335/2020: cabe ao CNJ coordenar um **portal com interface nacional única** para usuários **externos e internos** (o portal **Jus.br**).
  - Regulamentada pela Portaria CNJ 316/2024: os dados ficam num **datalake** e o acesso é por **API**, mediante requerimento justificado.
- **Exemplo prático:** uma *lawtech* que quer consumir dados processuais públicos pede acesso à API do datalake do CNJ, em vez de fazer *scraping* de cada tribunal.
- **Conexões:** [[api-rest]] · [[lgpd]] (dados públicos ≠ dados pessoais livres) · [[keycloak-sso]] (o Jus.br exige SSO do CNJ baseado em Keycloak)
- **Fontes:** [Resolução 574/2024](https://atos.cnj.jus.br/atos/detalhar/5708) · [Portaria 316/2024](https://atos.cnj.jus.br/atos/detalhar/5792)

---

## [[res-cnj-396-2021]] Resolução CNJ nº 396/2021 — ENSEC-PJ (Estratégia Nacional de Segurança Cibernética do Poder Judiciário)

- **O que é:** estratégia nacional de segurança cibernética para todo o Judiciário, **exceto o STF**.
- **Abrange:** segurança da informação (no que for essencial à cibernética), segurança física e proteção de dados pessoais, proteção de ativos, **disponibilidade, integridade, confidencialidade e autenticidade**, continuidade de negócios, capacitação.
- **Visão (art. 4º):** alcançar a **excelência em segurança cibernética** no Judiciário.
- **Objetivos (art. 6º):**
  1. Tornar o Judiciário mais seguro e inclusivo no ambiente digital;
  2. Aumentar a resiliência às ameaças cibernéticas;
  3. Estabelecer governança de segurança cibernética e coordenação integrada;
  4. Manter os serviços ou restabelecê-los no menor tempo possível.
- **Estruturas:**
  - **CGSI-PJ** (Comitê Gestor de Segurança da Informação do Poder Judiciário): assessora o CNJ; **12 membros** (CNJ 2, STF 2, STJ, TSE, TST, CSJT, CJF, STM, TJs 2); reuniões **semestrais**.
  - **CPTRIC-PJ**: centro de prevenção, tratamento e resposta a incidentes do CNJ — **todo incidente detectado deve ser comunicado a ele**.
  - **Rede Nacional de Cooperação** do Judiciário.
  - Em cada tribunal: **ETIR** (Equipe de Tratamento e Resposta a Incidentes), **comitê de segurança da informação**, **gestor de segurança da informação** com estrutura **separada da TI** e ligada à alta administração, **orçamento próprio**.
- **Medidas de infraestrutura crítica (art. 11):** ETIR, processo de resposta a incidentes, **backups automatizados e segregados**, inteligência de ameaças, requisitos de segurança para teletrabalho e novos projetos, **testes de conformidade no mínimo a cada 6 meses**.
- **Política de Segurança da Informação do tribunal (art. 28):** gestão de ativos e de acesso, controles para informação restrita, capacitação e certificação, requisitos de segurança em contratos, **criptografia e assinatura eletrônica**.
- **Conexões:** [[iso-27001]] (SGSI baseado em riscos) · [[backup]] · [[backup]] · [[controle-acesso]] · [[portaria-162-2021]]
- **Fonte:** [Resolução 396/2021](https://atos.cnj.jus.br/atos/detalhar/3975)

---

## [[portaria-162-2021]] Portaria CNJ nº 162/2021 — Protocolos e Manuais da ENSEC-PJ

| Anexo | Documento | Para que serve |
| --- | --- | --- |
| I | Protocolo de **Prevenção** de Incidentes Cibernéticos (PPINC-PJ) | Funções Identificar → Proteger → Detectar → Responder → Recuperar |
| II | Protocolo de **Gerenciamento de Crises** Cibernéticas (PGCRC-PJ) | Ações quando o incidente vira crise (grande escala, não contido rapidamente); comunicação com imprensa |
| III | Protocolo de **Investigação** para Ilícitos Cibernéticos (PIILC-PJ) | Coleta e preservação de evidências; comunicação ao MP e à polícia |
| IV | Manual de Proteção de Infraestruturas Críticas de TIC | — |
| V | Manual de Prevenção e Mitigação de Ameaças Cibernéticas e Confiança Digital | — |
| VI | Manual de Gestão de Identidades | Identidade, acesso e privilégios |
| VII | Política de Educação e Cultura em Segurança Cibernética | Conscientização e capacitação |
| VIII | Glossário | Termos técnicos de segurança cibernética |

- **Detalhe que cai:** os três protocolos são **complementares**: prevenção → crise → investigação.
- **Conexão com a teoria:** as 5 funções do PPINC-PJ (Identificar, Proteger, Detectar, Responder, Recuperar) são as mesmas do *NIST Cybersecurity Framework*.
- **Fontes:** [Portaria 162/2021 (Qlegislação)](https://qlegislacao.com.br/legismais/federal/nac-port-cnj-162-2021) · [PDF no TRT14](https://www.trt14.jus.br/portal/sites/default/files/gestao-tic/2026-06/Portaria%20CNJ%20N%C2%BA%20162%2C%20de%2010%20de%20Junho%20de%202021.pdf) · [Exemplo TRE-DF (funções)](https://www.tre-df.jus.br/transparencia-e-prestacao-de-contas/gestao-e-governaca/arquivos/arquivos-governanca-de-tic/protocolo-de-prevencao-de-incidentes-ciberneticos)
- ⚠️ A sigla do protocolo de crises aparece como PGCRC-PJ (anexo) e PGCC-PJ (resolução). As duas formas circulam em provas.

---

## [[governanca-tic-trt4]] Modelo de Governança de TIC do TRT4

- **Comitê de Governança de TIC** (Comissão Permanente do Regimento Interno; art. 227-A):
  - **7 membros com voto:** 3 desembargadores eleitos pelo Pleno (um preside), 2 juízes de 1º grau, Diretora-Geral e Secretário-Geral Judiciário.
  - **3 sem voto:** representante da Corregedoria, da Secretaria-Geral da Presidência e o(a) dirigente da área de TI.
  - **Quórum:** 3 magistrados e 1 servidor.
  - **Atribuições (destaques):** propor estratégias, indicadores e metas de TIC; **participar da elaboração do PDTIC e acompanhar sua execução**; orientar investimentos; avaliar aquisições; **opinar sobre a Política de Segurança da Informação**.
- **Subcomitê de TIC** (Portaria GP.TRT4 5.042/2022): nível de gestão (dirigente de TI, coordenadores); trata de temas operacionais e prepara propostas ao Comitê de Governança.
- **Comitê de Segurança da Informação e Proteção de Dados:** separado, como exige a ENSEC-PJ.
- **Área de TI:** hoje chamada **Secretaria-Geral de Tecnologia e Inovação (SGTI)**; antes, SETIC. Coordenadorias citadas no portfólio: CDS (Desenvolvimento de Sistemas), CSTIC (Serviços de TIC), CGGTIC (Gestão e Governança), CSIPD (Segurança da Informação e Proteção de Dados), SEINFRA, CIS, DIA.
- **Exemplo prático:** a decisão de trocar a telefonia convencional por VoIP ou de renovar 1.207 computadores passou pelo Comitê de Governança na revisão do PDTIC.
- **Fontes:** [Comitê de Governança de TIC](https://www.trt4.jus.br/portais/governanca/comissao-informatica) · [Portarias de governança de TIC](https://www.trt4.jus.br/portais/governanca/portarias)

## [[pdtic-trt4]] PDTIC 2024-2026 do TRT4

- **O que é:** plano de **dois anos** que desdobra as estratégias nacionais e regionais em ações e projetos da área de TI, garantindo alocação de recursos e acompanhamento (orçamento, níveis de serviço). **Não é estático** — é revisado durante a vigência.
- **Vigência:** de **maio/2024 a abril/2026** (ata do Comitê de Governança, 26/04/2024, que o aprovou por unanimidade). ⚠️ O site já publica o **PDTIC 2026-2028** (abril/2026), mas o edital cobra o **2024-2026**.
- **Alinhamento:** ENTIC-JUD (Res. CNJ 370/2021), Planejamento Estratégico do TRT4, Plano de Transformação Digital da JT, **PDTIC-JT** (Ato 66/CSJT/2023), Res. CSJT 292/2021 (governança de TIC do CSJT) e Res. CSJT 185/2017 (PJe).
- **Princípios/objetivos (20, destaques):** priorizar a estratégia do TRT; **interoperabilidade e dados abertos**; sistemas reutilizáveis por outros órgãos; automatizar tarefas repetitivas; equidade capital × interior; ferramentas seguras para **teletrabalho**; **mitigar riscos de segurança (CID)**; inclusão social e **sustentabilidade ambiental**; capacitação contínua.
- **Estrutura:** documento principal + **portfólio de ações estratégicas e projetos** (com status: em execução, concluído, cancelado, suspenso, não iniciado), acompanhado pelo Escritório de Projetos de TI.
- **Conexões:** [[cobit]] · [[pmbok]] (portfólio e projetos) · [[cobit]] (alinhamento estratégico) · [[res-cnj-400-2021]] (sustentabilidade) · [[res-cnj-396-2021]] (riscos de segurança)
- **Fontes:** [Plano Diretor de TIC – TRT4](https://www.trt4.jus.br/portais/governanca/plano-diretor) · [Ata de aprovação 26/04/2024](https://www.trt4.jus.br/portais/media/2804387/Ata%20Comit%C3%AA%20de%20Governan%C3%A7a%20de%20TIC%20-%2026_04_2024.pdf) · [Página PDTIC](https://www.trt4.jus.br/portais/trt4/pdtic)

---

## Mapa rápido de conexões — Normativos

```
Res. 335/2020 (cria PDPJ-Br: microsserviços, testes, nuvem, open source, LGPD)
   ├─ Portaria 252/2020 (governança) ── Portaria 284/2021 (TRTs: comitê local facultativo, segue CSJT)
   ├─ Portaria 253/2020 (critérios técnicos: Java, Spring Boot, Eureka, Git, CI/CD)
   ├─ Portaria 131/2021 (Grupo Revisor de Código = code review)
   ├─ Res. 574/2024 (dados públicos via API/datalake, portal Jus.br)
   └─ Res. 443/2022 (obriga cobrar tudo isso no concurso)
Res. 522/2023 (MoReq-Jus: CID + autenticidade + não repúdio + preservação)
Res. 396/2021 (ENSEC-PJ) ── Portaria 162/2021 (protocolos: prevenção → crise → investigação)
TRT4: Comitê de Governança de TIC ── aprova/acompanha ── PDTIC 2024-2026
```
