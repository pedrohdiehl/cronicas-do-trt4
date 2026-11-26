---
materia: Arquitetura de desenvolvimento da PDPJ-Br (stack técnica)
cai_em: [Técnico TI, Analista TI]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Arquitetura da PDPJ-Br — a stack que cai nas duas provas

> A lista é **igual** nos dois editais (vem da Portaria CNJ 257/2022). O Técnico acrescenta Jakarta EE, OpenAPI/JWT, proxy reverso, SSL offloading e balanceamento de carga.
> Pense nesta stack como **um sistema só**: aprendendo o caminho de uma requisição, você aprende 80% do bloco.

## A jornada de uma requisição (mapa mental do bloco)

```
Usuário (Angular) ──login──> Keycloak (SSO, OAuth2/OIDC) ──token JWT──┐
       │                                                              │
       └──HTTPS──> [Proxy reverso / Load balancer / SSL offloading] ──> API Gateway (Zuul/Gateway)
                                                                         │ consulta
                                                              Service Discovery (Eureka)
                                                                         │ roteia
                                       Microsserviço Spring Boot (REST/JSON, doc Swagger)
                                         ├─ MapStruct (DTO ↔ entidade)
                                         ├─ JPA/Hibernate (+Envers: auditoria) ──> PostgreSQL (prod) / H2 (testes)
                                         ├─ Flyway (versiona o schema)
                                         └─ RabbitMQ / Webhooks (eventos negociais assíncronos)
Tudo empacotado em Docker ──> orquestrado por Kubernetes ──> gerenciado no Rancher ──> entregue por CI/CD (Git)
```

---

## [[java]] 🟢 Linguagem Java

- **Por que está aqui:** é a linguagem preferencial da PDPJ-Br (Portaria 253/2020).
- **Conexões:** [[oo]] (classes, interfaces, herança) · [[spring-boot]] · [[testes-software]] (JUnit 6 exige Java 17)

## [[microsservicos]] 🟢 Arquitetura distribuída de microsserviços

- **O que é (Lewis & Fowler, 2014):** desenvolver uma aplicação como um **conjunto de pequenos serviços**, cada um rodando em **seu próprio processo**, comunicando-se por mecanismos leves (geralmente API HTTP), organizados em torno de **capacidades de negócio** e **implantáveis de forma independente** por automação.
- **Contraste:** o **monólito** é uma única unidade executável — qualquer mudança exige recompilar e reimplantar tudo.
- **Características:** alta coesão dentro do serviço, baixo acoplamento entre serviços (exatamente o que a Res. 335 pede), dados descentralizados, possibilidade de linguagens diferentes.
- **Exemplo prático na PDPJ:** serviços separados para "cabeçalho processual", "repositório de documentos", "cadastro de usuários".
- **Conexões:** [[arquiteturas]] (antecessor) · [[api-gateway]] · [[service-discovery]] · [[docker]] · [[res-cnj-335-2020]]
- **Fontes:** [Martin Fowler – Microservices](https://www.martinfowler.com/articles/microservices.html) · [IEEE TechNav](https://technav.ieee.org/topic/microservice-architectures/)

## [[api-rest]] 🟢 API RESTful + [[json]] JSON

- **REST:** estilo arquitetural definido por **Roy Fielding**. Restrições: cliente-servidor, **sem estado (stateless)** — cada requisição leva toda a informação necessária —, cacheável, **interface uniforme**, sistema em camadas e (opcional) código sob demanda.
- **Na prática (HTTP):** recursos identificados por URI e manipulados por verbos (GET lê, POST cria, PUT substitui, PATCH altera parte, DELETE remove), com códigos de status (200, 201, 400, 401, 403, 404, 500).
- **JSON:** formato texto leve de troca de dados (objetos `{}` e arrays `[]`), padrão das APIs REST da PDPJ.
- **Exemplo:** `GET /processos/0010172-32.2025.5.04.0001` → 200 + JSON com o cabeçalho do processo.
- **Conexões:** [[swagger-openapi]] (documenta a API) · [[jwt]] (vai no header `Authorization: Bearer`) · [[xml]] (alternativa mais antiga) · [[res-cnj-574-2024]] (dados via API)
- **Fonte:** [Restrições REST (resumo)](https://www.slideshare.net/shaunabram/an-intro-to-rest-and-microservices)

## [[spring-boot]] 🟢 Framework Spring, Spring Boot e Spring Cloud

- **Spring Framework:** base com **injeção de dependências / inversão de controle**.
- **Spring Boot:** facilita criar aplicações Spring **autônomas e prontas para produção** que "simplesmente rodam". Características oficiais: servidor embutido (**Tomcat, Jetty ou Undertow** — sem precisar de WAR), dependências "**starter**", **autoconfiguração**, recursos de produção (métricas, *health checks*, configuração externa) e **nenhuma geração de código nem XML obrigatório**.
- **Spring Cloud:** padrões para sistemas distribuídos (descoberta de serviços, gateway, configuração centralizada).
- **Exemplo:** `@SpringBootApplication` + `spring-boot-starter-web` = API REST rodando com Tomcat embutido.
- **Conexões:** [[padroes-projeto]] (Singleton, Proxy) · [[eureka]] · [[maven]] (build)
- **Fonte:** [spring.io – Spring Boot](https://spring.io/projects/spring-boot)

## [[service-discovery]] + [[eureka]] 🟢 Service Discovery com Spring Eureka

- **Problema:** em microsserviços, instâncias sobem e caem e mudam de IP. Como um serviço acha o outro?
- **Solução:** um **registro de serviços**. Cada instância **se registra** e envia **heartbeats**; se o heartbeat falhar, a instância é removida. Os clientes **consultam** o registro para localizar serviços.
- **Eureka:** servidor e cliente de descoberta da Netflix. Com `spring-cloud-starter-netflix-eureka-client` a aplicação vira instância (se registra) e cliente (consulta).
- **Status:** quando a Spring moveu os módulos Netflix para manutenção (Greenwich, 2019), o **Eureka ficou de fora** — é o único componente Netflix que permaneceu no Spring Cloud a partir do Ilford (2020).
- **Fontes:** [Spring Cloud Netflix – docs](https://docs.spring.io/spring-cloud-netflix/docs/2.2.7.RELEASE/reference/html) · [Spring – Greenwich](https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available/)

## [[api-gateway]] + [[zuul]] 🟢 API Gateway com Zuul

- **API Gateway:** **porta de entrada única** para os clientes; roteia para o microsserviço certo e centraliza preocupações transversais (autenticação, limites, logs). É o padrão Facade aplicado à arquitetura.
- **Zuul:** gateway/roteador da Netflix. ⚠️ Entrou em **modo de manutenção** no Spring Cloud Greenwich (2019) e foi **removido** no Ilford (2020); o sucessor é o **Spring Cloud Gateway**. A PDPJ ainda o lista porque nasceu nessa stack — saiba as duas coisas.
- **Fontes:** [Spring – Greenwich (maintenance)](https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available/) · [Piotr Minkowski – sucessor](https://piotrminkowski.com/?p=7069)

## [[mapstruct]] 🟢 MapStruct

- **O que é:** gerador de código que cria, **em tempo de compilação**, os mapeamentos entre objetos (ex.: entidade ↔ DTO). Sem reflexão em tempo de execução → mais rápido e com checagem de tipos.
- **Exemplo:** interface `ProcessoMapper` com `ProcessoDTO toDto(Processo p)`; o MapStruct gera a implementação.
- **Fonte:** [Exemplo de projeto](https://www.mintlify.com/Raven-Training/jc-java-training/development/project-structure)

## [[swagger-openapi]] 🟢 Swagger / OpenAPI (🔵 Técnico cita "OpenAPI/Swagger")

- **OpenAPI:** especificação padrão para **descrever APIs HTTP** (endpoints, parâmetros, esquemas, segurança).
- **Swagger:** conjunto de ferramentas (ex.: **Swagger UI**, para testar a API no navegador) que trabalha com essa especificação.
- **Conexões:** [[api-rest]] · [[jwt]] (configura o esquema de segurança Bearer no Swagger UI)

## [[jpa-hibernate]] 🟢 Persistência: JPA 2.0, Hibernate 5+, Hibernate Envers, Flyway

- **JPA (hoje Jakarta Persistence):** especificação Java para **mapeamento objeto-relacional (ORM)** — classes viram tabelas (`@Entity`, `@Id`).
- **Hibernate:** a implementação de JPA mais usada.
- **Hibernate Envers:** **auditoria/versionamento de entidades**. Anota-se `@Audited`; cada transação que altera entidades auditadas gera uma **revisão**, e o histórico fica em tabelas de auditoria (sufixo padrão `_AUD`). Dá para consultar "como estava o registro na revisão X".
- **Flyway:** **versiona o schema do banco** com scripts de migração (ex.: `V1__cria_tabela.sql`, `V2__...`), aplicados em ordem e registrados.
- **Evolução (noções do edital):** **Jakarta Persistence 3.2** é a versão do **Jakarta EE 11**; exige **Java 17**; traz, entre outros, *records* como embutíveis e suporte a `java.time.Instant`/`Year`. O **Hibernate ORM 7** implementa Jakarta Persistence 3.2 e passou para licença Apache 2.0.
- **Exemplo prático:** Envers responde "quem alterou o status deste processo e quando" — requisito típico de **MoReq-Jus** e de trilha de auditoria.
- **Conexões:** [[sql]] e [[modelagem-er]] (Analista) · [[moreq-jus]] (rastreabilidade) · [[postgresql]] · [[ci-cd]] (Flyway roda no deploy)
- **Fontes:** [Hibernate Envers](https://hibernate.org/orm/envers/) · [Jakarta Persistence 3.2](https://jakarta.ee/specifications/persistence/3.2/) · [Hibernate 7.0 – what's new](https://docs.hibernate.org/orm/7.0/whats-new/) · [Eclipse – JP 3.2 novidades](https://projects.eclipse.org/node/27290)

## [[jakarta-ee]] 🔵 Jakarta EE 8 (legado) e Jakarta EE 11

- **O que é:** a plataforma Java corporativa (antigo Java EE), hoje na Eclipse Foundation. O EE 8 ainda usa o pacote `javax.*`; do EE 9 em diante, `jakarta.*`. O **EE 11** inclui a Jakarta Persistence 3.2.
- **Conexões:** [[servicos-rede]] (servidores de aplicação Jakarta EE) · [[jpa-hibernate]]

## [[postgresql]] + [[h2]] 🟢 Banco de dados: PostgreSQL e H2

- **PostgreSQL:** SGBD relacional de código aberto usado na PDPJ. **PostgreSQL 18** (25/09/2025): novo subsistema de **I/O assíncrono (AIO)** com ganhos de até 3× em leituras, colunas geradas **virtuais**, função `uuidv7()`, *skip scan* em índices B-tree, suporte a **OAuth 2.0** na autenticação.
- **H2:** banco Java leve, que roda **embutido/em memória** — muito usado em **testes automatizados**.
- **Conexões:** [[sql]] (Analista aprofunda: versões 15–18, migração da 14, Oracle 19c) · [[testes-software]]
- **Fontes:** [PostgreSQL 18 – anúncio oficial (PT)](https://www.postgresql.org/about/press/presskit18/pt) · [Release notes 18](https://www.postgresql.org/docs/release/18/)

## [[keycloak-sso]] 🟢 Autenticação: SSO, Keycloak, OAuth2 (RFC 6749) e boas práticas (RFC 9700)

- **SSO (Single Sign-On):** o usuário se autentica **uma vez** e acessa vários sistemas.
- **Keycloak:** solução **open source de gestão de identidade e acesso (IAM)**; projeto incubado na **CNCF** (2023), licença Apache 2.0. Suporta **OpenID Connect, OAuth 2.0 e SAML 2.0**, federação com **LDAP/Active Directory**, *identity brokering*, login social, MFA. Conceito central: **realm** (conjunto isolado de usuários, credenciais, papéis e grupos).
- **Na prática do Judiciário:** o **Jus.br** exige que todos os usuários autenticados usem o **SSO do CNJ baseado em Keycloak**.
- **OAuth 2.0 (RFC 6749, 2012) — 4 papéis:** dono do recurso (usuário), **cliente** (app), **servidor de autorização** (ex.: Keycloak), **servidor de recursos** (a API).
  - Tipos de concessão originais: **authorization code**, **implicit**, **resource owner password credentials**, **client credentials**.
  - Atenção: **OAuth = autorização**; **OpenID Connect** = camada de **autenticação/identidade** sobre o OAuth.
- **RFC 9700 (BCP 240, jan/2025) — boas práticas de segurança:** atualiza as RFCs 6749, 6750 e 6819.
  - **Evitar o Implicit Grant** (depreciado) → usar **Authorization Code + PKCE** para todos os clientes, inclusive SPAs.
  - **Não usar** Resource Owner Password Credentials.
  - **Restringir privilégios** do token (escopo/audiência) e prevenir reutilização (*replay*) de tokens.
- **Conexões:** [[jwt]] · [[controle-acesso]] · [[active-directory]] (federação) · [[owasp]] (falhas de autenticação)
- **Fontes:** [Keycloak.org](https://www.keycloak.org/) · [CNCF – Keycloak](https://www.cncf.io/projects/keycloak) · [RFC 6749](https://datatracker.ietf.org/doc/rfc6749) · [RFC 9700](https://datatracker.ietf.org/doc/rfc9700/) · [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html) · [Portaria CNJ – Jus.br/Keycloak](https://atos.cnj.jus.br/atos/detalhar/5714)

## [[jwt]] 🔵 JSON Web Token (RFC 7519)

- **O que é:** padrão aberto para transmitir *claims* entre partes como um objeto JSON **compacto e assinado digitalmente**.
- **3 partes em Base64URL separadas por ponto:** `header.payload.signature`.
  - Header: tipo e algoritmo (ex.: `HS256`, `RS256`).
  - Payload: **claims** (`iss`, `sub`, `aud`, `exp`, `iat`...). ⚠️ É **codificado, não criptografado** — não ponha senha nem dado sensível.
  - Signature: garante que não houve adulteração.
- **Conexões:** [[keycloak-sso]] (emite o token) · [[criptografia]] · [[lgpd]]
- **Fonte:** [Reflectoring – JWT (RFC 7519)](https://reflectoring.io/spring-security-jwt/)

## [[mensageria]] 🟢 Mensageria e webhooks: Message Broker, RabbitMQ, evento negocial, webhook, APIs reversas

- **Message broker:** intermediário que recebe mensagens de **produtores** e as entrega a **consumidores** → comunicação **assíncrona** e desacoplada.
- **RabbitMQ (AMQP 0-9-1):** produtor → **exchange** → (binding) → **fila** → consumidor. **4 tipos de exchange:**
  - **Direct:** entrega à fila cuja *binding key* é **igual** à *routing key*.
  - **Fanout:** entrega a **todas** as filas ligadas (ignora a routing key) → *broadcast*.
  - **Topic:** casa padrões na routing key (`*`, `#`) → publish/subscribe seletivo.
  - **Headers:** roteia pelos **cabeçalhos** da mensagem.
- **Evento negocial:** fato de negócio relevante publicado para quem interessar (ex.: "petição protocolada").
- **Webhook / API reversa:** em vez de o cliente ficar consultando (*polling*), o **servidor chama uma URL do cliente** quando o evento acontece.
- **Exemplo:** ao protocolar uma petição, o serviço publica o evento no RabbitMQ; o serviço de intimações consome e um webhook avisa o sistema do escritório.
- **Conexões:** [[microsservicos]] · [[api-rest]]
- **Fontes:** [RabbitMQ – AMQP concepts](https://rabbitmq.com/tutorials/amqp-concepts) · [CloudAMQP – exchanges](https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html)

## [[docker]] + [[kubernetes]] + [[rancher]] 🟢 Contêineres, clusters e orquestração

- **Docker:** empacota a aplicação e suas dependências em uma **imagem**; a imagem roda como **contêiner** isolado. O Spring Boot gera imagens por Dockerfile ou *Cloud Native Buildpacks*.
- **Kubernetes:** ambiente de gestão **centrado em contêineres** que orquestra computação, rede e armazenamento.
  - **Pod:** um ou mais contêineres que compartilham rede e volumes (unidade básica).
  - **Workloads:** **Deployment** (apps sem estado), **StatefulSet** (com estado/identidade), **DaemonSet** (um pod por nó — ex.: coleta de logs), **Job**.
  - **Service:** expõe pods via seletor/labels — **ClusterIP** (só dentro do cluster, padrão), **NodePort**, **LoadBalancer**.
- **Rancher (SUSE):** plataforma para **gerenciar vários clusters Kubernetes** (acesso, uso, infraestrutura) em data center, nuvem ou borda.
- **Conexões:** [[ci-cd]] · [[nuvem]] (Técnico) · [[microsservicos]]
- **Fontes:** [SUSE Rancher – workloads e pods](https://documentation.suse.com/cloudnative/rancher-manager/latest/en/cluster-admin/kubernetes-resources/workloads-and-pods/workloads-and-pods.html) · [SUSE – introdução](https://documentation.suse.com/trd/suse/html/kubernetes_ri_rancher-k3s-sles/id-introduction.html) · [Spring Boot – container images](https://docs.spring.io/spring-boot/reference/packaging/container-images/index.html)

## [[ci-cd]] 🟢 Deploy, Continuous Integration e Continuous Delivery

- **CI:** integrar o código no repositório com frequência, com **build e testes automáticos** a cada mudança.
- **CD (Continuous Delivery):** o software está sempre em estado **implantável**; a ida à produção pode ter aprovação manual. (*Continuous Deployment* = vai automático.)
- **Pipeline típico:** commit → build (Maven) → testes (JUnit) → análise → imagem Docker → deploy no Kubernetes.
- **Conexões:** detalhado em [[devops]] (Git, GitLab CI/CD, Jenkins, Gitflow).

## [[proxy-reverso]] 🔵 Proxy reverso, SSL offloading e balanceamento de carga

- **Proxy reverso:** fica **na frente dos servidores** e recebe as requisições dos clientes em nome deles (o cliente não vê o servidor real). Diferente do proxy "comum" (*forward*), que fica na frente dos **clientes**.
- **SSL/TLS offloading:** o proxy/balanceador **encerra o TLS** (descriptografa), aliviando os servidores de aplicação.
- **Balanceamento de carga:** distribui requisições entre várias instâncias (ex.: round-robin), aumentando disponibilidade.
- **Conexões:** [[tls]] · [[servicos-rede]] (Analista) · [[kubernetes]] (Service LoadBalancer) · [[protecao-perimetro]]
- Algoritmos e SSL offloading detalhados em [[balanceamento-carga]] (arquivo 07).
- **Fontes:** [NGINX Docs – HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) · [Oracle Linux – About NGINX](https://docs.oracle.com/en/operating-systems/oracle-linux/10/balancing/balancing-AboutNGINX.html)

---

## Mapa de conexões — Stack PDPJ

```
Res. 335 (microsserviços, testes, nuvem, auth uniformizada, open source)
  └─ Portaria 253 (Java + Spring Boot + Eureka + Git + CI/CD)
       └─ Portaria 257/2022 = a lista do edital
Segurança: Keycloak/OAuth2/RFC 9700 ↔ JWT ↔ TLS ↔ OWASP ↔ ISO 27001
Dados: JPA/Hibernate ↔ Envers (auditoria ↔ MoReq-Jus) ↔ Flyway ↔ PostgreSQL ↔ SQL/ER (Analista)
Infra: Docker → Kubernetes → Rancher ↔ Nuvem (Técnico) ↔ CI/CD/DevOps
Integração: REST/JSON ↔ RabbitMQ/Webhooks ↔ Res. CNJ 574 (dados via API)
```
