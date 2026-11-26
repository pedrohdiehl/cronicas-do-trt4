---
materia: Programação, linguagens, desenvolvimento web e arquiteturas
cai_em: [Técnico TI, Analista TI]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Programação, linguagens, web e arquiteturas de software

> **Ambos:** fundamentos de programação (sintaxe, tipos, variáveis, operadores, controle de fluxo, classes/interfaces, exceções, bibliotecas, acesso a banco), XML/XML Schema, HTML5, CSS3, frameworks JS, JSF, arquiteturas multicamadas/cliente-servidor/objetos distribuídos.
> **Técnico:** Java, Python, JavaScript, TypeScript, Angular, Angular Material, PWA, Eclipse, VS Code, manutenção de sistemas, padrões de projeto, serverless.
> **Analista:** "conhecimento profundo" de Visual Basic, Delphi, PHP, Python, C, Java, C#; .NET e ASP.NET Core; JSP; Bootstrap 5; React Native; servidor web × servidor de aplicação; internet/intranet/extranet/portal; SOA.
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[fundamentos-programacao]] 🟢 Fundamentos: compilação, tipos, variáveis, operadores, fluxo

- **Compilação × interpretação:** compilado → traduzido antes de rodar (C → código de máquina); **Java** → compila para **bytecode** (`.class`) que roda na **JVM**; **C#** → compila para IL que roda no **CLR (.NET)**; **Python/PHP/JS** → em geral interpretados (com compilação interna/JIT).
- **Tipagem:** **estática** (tipo checado na compilação: Java, C#, C, TypeScript) × **dinâmica** (tipo definido em execução: Python, JavaScript, PHP).
- **Tipos primitivos do Java — 8:** `byte`(8 bits) `short`(16) `int`(32) `long`(64) `float`(32) `double`(64) `char`(16, Unicode) `boolean`.
  - Valores padrão **de atributos (fields)**: 0, `0L`, `0.0f`, `0.0d`, `'\u0000'`, `false`; objetos (inclusive `String`) → `null`.
  - ⚠️ **Variável local não recebe valor padrão** — usar sem inicializar dá erro de compilação.
  - `float`/`double` **não** servem para valores exatos como **dinheiro** (usar `BigDecimal`).
  - **Tipos de referência** (🔵 citado no edital do Técnico): classes, interfaces, arrays, `String` — a variável guarda uma **referência** ao objeto.
- **Literais:** `100L` (long), `123.4f` (float), `1.234e2` (double), `'C'` (char), `"texto"` (String), `0x1F` (hexadecimal).
- **Operadores e precedência (resumo):** unários (`++ -- !`) > multiplicativos (`* / %`) > aditivos (`+ -`) > relacionais (`< > <= >=`) > igualdade (`== !=`) > lógicos (`&&` antes de `||`) > ternário (`?:`) > atribuição (`= += ...`).
- **Controle de fluxo:** seleção (`if/else`, `switch`) e repetição (`for`, `while`, `do-while` — este executa **pelo menos uma vez**), `break`/`continue`.
- **Fontes:** [Oracle – Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) · [dev.java – Primitive types](https://dev.java/learn/language-basics/primitive-types)

## [[oo]] 🟢 Orientação a objetos

- **Classe** (molde) → **objeto** (instância). **Interface** = contrato de métodos que a classe implementa.
- **Encapsulamento:** esconder o estado (atributos `private`) e expor métodos (`get/set`). Modificadores Java: `private` < *default* (pacote) < `protected` < `public`.
- **Herança:** subclasse herda da superclasse (`extends`); Java tem **herança simples de classe** e **múltipla de interfaces**.
- **Sobrecarga (overload) × sobrescrita (override):**
  - **Sobrecarga** → mesmo nome, **parâmetros diferentes**, na mesma classe (resolvida em **compilação**).
  - **Sobrescrita** → subclasse **redefine** método herdado com **mesma assinatura** (`@Override`; resolvida em **execução** = polimorfismo).
- **Pacotes (packages):** organizam classes e definem namespaces (`br.jus.trt4.processo`).
- **Conexões:** [[uml]] (diagrama de classes) · [[padroes-projeto]] · [[java]]
- ⚠️ Conceitos clássicos de OO; fonte oficial de apoio: tutorial Oracle "Object-Oriented Programming Concepts".

## [[excecoes]] 🟢 Administração de exceções

- **O que é:** exceção = evento que **interrompe o fluxo normal** do programa. Criar e entregar o objeto de exceção ao runtime = **lançar** (*throw*).
- **Java – 3 categorias (tutorial oficial Oracle):**
  - **Checked exceptions** → o compilador obriga a **tratar (`try/catch`) ou declarar (`throws`)** — "*Catch or Specify Requirement*" (ex.: `IOException`).
  - **Error** → problemas externos graves (ex.: `OutOfMemoryError`).
  - **RuntimeException** → bugs de lógica (ex.: `NullPointerException`, `ArrayIndexOutOfBoundsException`).
  - **Error + RuntimeException = unchecked** (não obrigam tratar/declarar).
- **Blocos:** `try` → `catch` (um ou vários) → `finally` (sempre executa); *try-with-resources* fecha recursos automaticamente.
- **Exemplo prático:** ler o arquivo de uma petição → `IOException` (checked) tem que ser tratada; acessar `processo.getParte()` com processo nulo → `NullPointerException` (unchecked).
- **Conexões:** [[owasp]] (A10 2025 = tratamento indevido de condições excepcionais) · [[testes-software]] (testar exceções com JUnit `assertThrows`)
- **Fontes:** [Oracle – Catch or Specify](https://docs.oracle.com/javase/tutorial/essential/exceptions/catchOrDeclare.html) · [Oracle – Unchecked exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html)

## [[acesso-banco]] 🟢 Acesso a banco de dados nas linguagens

- **Java:** **JDBC** (API de baixo nível: `Connection`, `PreparedStatement`, `ResultSet`) ou **JPA/Hibernate** (ORM) → [[jpa-hibernate]].
- **C#/.NET:** ADO.NET ou Entity Framework Core. **PHP:** PDO. **Python:** DB-API (ex.: psycopg para PostgreSQL).
- **Regra de ouro de segurança:** usar **consultas parametrizadas** (`PreparedStatement`) → evita **SQL injection** ([[owasp]] A05).
- **Conexões:** [[sql]] · [[postgresql]]
- ⚠️ Resumo conceitual; detalhar com documentação oficial de cada API se necessário.

---

## [[linguagens]] 🟢 Linguagens do edital (visão rápida)

| Linguagem | Cargo | Ideia-chave |
| --- | --- | --- |
| **Java** | 🟢 | OO, compilada para bytecode/JVM, tipagem estática — base da PDPJ-Br |
| **Python** | 🟢 | interpretada, tipagem dinâmica, indentação define blocos; forte em dados/IA |
| **JavaScript** | 🔵 (🟣 em web) | linguagem da web; tipagem dinâmica; roda no navegador e no Node.js |
| **TypeScript** | 🟢 | **superconjunto tipado** de JS: todo JS é TS válido; **compila (transpila) para JavaScript**; o comportamento em execução é o mesmo do JS |
| **C** | 🟣 | procedural, compilada, ponteiros, gerência manual de memória |
| **C#** | 🟣 | OO da Microsoft, roda no .NET |
| **PHP** | 🟣 | linguagem de script do lado do servidor web |
| **Visual Basic** | 🟣 | linguagem da Microsoft (hoje VB.NET no .NET) |
| **Delphi** | 🟣 | ambiente/linguagem baseado em Object Pascal (sistemas legados desktop) |

- **Fontes TypeScript:** [TypeScript – A Typed Superset of JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch) · [MDN – TypeScript](https://developer.mozilla.org/en-US/docs/Glossary/TypeScript)
- ⚠️ As linhas de C, C#, PHP, VB e Delphi são descrições gerais — vale aprofundar com a documentação oficial no próximo nível.

## [[dotnet]] 🟣 .NET e ASP.NET Core

- **.NET:** plataforma da Microsoft (runtime + SDK + bibliotecas); **ASP.NET Core** é o framework web dela (MVC, Razor Pages, Web APIs).
- **Ciclo de versões:** uma versão major **todo novembro**; **pares = LTS** (3 anos), **ímpares = STS** (24 meses desde o .NET 9).
  - **.NET 10 (LTS):** lançado em **11/11/2025**, suporte até **nov/2028**.
  - **.NET 11 (STS):** lançado em **10/11/2026**.
  - .NET 8 e .NET 9 saíram de suporte em **10/11/2026**.
  - O **.NET Framework 4.8** (legado, só Windows) segue suportado enquanto estiver em Windows suportado.
- **Fontes:** [.NET Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core) · [.NET Blog – STS 24 meses](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/)

---

## [[web-frontend]] 🟢 HTML5, CSS3, Bootstrap 5, PWA

- **HTML5:** estrutura e **semântica** (`<header> <nav> <main> <article> <section> <footer>`), formulários com novos tipos (`email`, `date`), `<video>`/`<audio>`, APIs (localStorage, Canvas…).
- **CSS3:** apresentação; seletores, **Flexbox** e **Grid**, **media queries** (responsividade), transições/animações.
- **Bootstrap 5:** framework CSS; grid **flexbox** de **12 colunas** e **6 breakpoints**:

| xs | sm | md | lg | xl | xxl |
| --- | --- | --- | --- | --- | --- |
| < 576px (`.col-`) | ≥ 576 | ≥ 768 | ≥ 992 | ≥ 1200 | ≥ 1400 |

  - Breakpoints são **min-width** (mobile-first): `.col-sm-4` vale para **sm e todos acima**. (O Bootstrap 4 tinha só 5 tiers, sem xxl.)
- 🔵 **PWA (Progressive Web App):** app feito com tecnologias web que **se comporta como app nativo**. Precisa de um **web app manifest** (JSON com nome, ícones… para o navegador **instalar**); o **service worker** é opcional para instalar, mas é o que dá **funcionamento offline** (cache). Termo criado em 2015.
- **Fontes:** [Bootstrap 5.3 – Grid](https://getbootstrap.com/docs/5.3/layout/grid/) · [Bootstrap 5.0 – Grid (breakpoints)](https://getbootstrap.com/docs/5.0/layout/grid/) · [MDN – What is a PWA](https://developer.mozilla.org/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app) · [MDN – Web app manifest](https://developer.mozilla.org/en-US/docs/web/Manifest)

## [[js-frameworks]] 🟢 Frameworks/bibliotecas JavaScript

- **React:** "a **biblioteca** para interfaces web e nativas"; UI feita de **componentes**; usa **JSX** (extensão de sintaxe do JS). Não define roteamento/busca de dados (recomenda frameworks como Next.js). 🟣 **React Native** → mesmos conceitos gerando **UI nativa** Android/iOS (não é web view).
- **Angular** (🔵 + 🟣): **framework completo** do Google, baseado em **TypeScript**, major a cada **6 meses**. Linha do tempo: standalone components (v14) → padrão (v17) → Signals → **zoneless** → **Angular 21 (20/11/2025)** → **Angular 22 (2026)**. 🔵 **Angular Material** = biblioteca de componentes de UI (Material Design).
- **Vue.js:** framework progressivo; componentes com template (HTML), script e estilo separados.
- **jQuery:** biblioteca clássica para manipular DOM/eventos/AJAX (legado).
- **Node.js:** **não é framework nem linguagem** → é um **runtime JavaScript assíncrono e orientado a eventos**, construído sobre o motor **V8**, para rodar JS **fora do navegador** (servidores, ferramentas de build).
- ⚠️ A data exata do Angular 22 varia entre fontes não oficiais (maio–junho/2026); conferir em angular.dev.
- **Fontes:** [react.dev](https://react.dev/) · [Node.js – About](https://nodejs.org/about) · [InfoQ – Angular 21](https://www.infoq.com/news/2025/11/angular-21-released) · [InfoQ – Angular v22](https://infoq.com/news/2026/08/angular-v22-released) · [MDN – Frameworks](https://developer.mozilla.org/docs/Learn_web_development/Core/Frameworks_libraries)

## [[jsf-jsp]] 🟢 JSF (Jakarta Faces) e 🟣 JSP (Jakarta Pages)

- **JSP (Jakarta Server Pages):** construída sobre a **Servlet API**; páginas **baseadas em tags/templates** que geram HTML no servidor (modelo centrado no documento).
- **JSF (Jakarta Faces):** framework **MVC baseado em componentes** para UI web (componentes de UI, estado, eventos, validação, navegação, i18n). Desde o JSF 2.0, a view padrão é **Facelets (XHTML)**. JSF 3.0 trocou `javax.faces` → `jakarta.faces`; **Faces 4.1 = Jakarta EE 11**.
- **Contexto PJe:** o relatório do CJF sobre o PJe (2013) lista, no plano de capacitação das equipes, cursos de "Persistência com JPA e Hibernate" e "Laboratório Web com JSF e CDI" — ou seja, a stack histórica do PJe passa por JSF. ([Relatório PJe 2013 – CJF](https://cjf.jus.br/observatorio/arq/pje/Relatório%20PJe%202013.pdf))
- **Conexões:** [[jakarta-ee]] · [[servicos-rede]] (servidores que já trazem JSF embutido)
- **Fontes:** [Jakarta EE Tutorial – Faces](https://jakarta.ee/learn/docs/jakartaee-tutorial/9.1/web/faces-intro/faces-intro.html) · [Eclipse – Jakarta Faces](https://projects.eclipse.org/projects/ee4j.faces/governance) · [Jakarta Faces 3.0](https://jakarta.ee/specifications/faces/3.0/jakarta-faces-3.0)

## [[xml]] 🟢 XML e XML Schema (XSD)

- **XML bem formado (*well-formed*):** respeita a sintaxe — **um único elemento raiz**, toda tag aberta é fechada, **case sensitive**, aninhamento correto, **valores de atributo entre aspas**.
- **XML válido (*valid*):** é bem formado **e** obedece a uma gramática (**DTD** ou **XML Schema**). Todo válido é bem formado; o contrário não.
- **XML Schema (XSD):** descreve os blocos legais do documento (elementos, atributos, ordem, **tipos de dados**); é escrito **em XML**, suporta **namespaces** e tipos (mais rico que DTD). Namespace: `http://www.w3.org/2001/XMLSchema`.
- **Exemplo:** `<xs:element name="numeroProcesso" type="xs:string"/>`.
- **Conexões:** [[maven]] (pom.xml) · [[jsf-jsp]] (Facelets = XHTML) · [[arquiteturas]] (SOAP/WSDL são XML) · [[json]] (alternativa mais leve)
- **Fontes:** [W3C – XML 1.0 (well-formed)](https://www.w3.org/2003/Talks/techplen-xmlspecglossaries/gloss.html) · [W3Schools – XML Schema](https://www.w3schools.com/xmL/xml_schema.asp) · [W3Schools – Validator](https://w3schools.com/xml/xml_validator.asp)

## [[ides]] 🔵 Eclipse IDE e Visual Studio Code

- **Eclipse:** IDE open source (Eclipse Foundation), tradicional para **Java/Jakarta EE**, com plugins (Maven, Git).
- **VS Code:** editor de código da Microsoft, leve, baseado em **extensões** (Java, Python, TS, Angular, Git integrado).
- ⚠️ Descrição geral; sem fonte oficial consultada nesta rodada.

---

## [[servidor-web-aplicacao]] 🟣 Servidor web × servidor de aplicação; internet/intranet/extranet/portal

- **Servidor web:** serve conteúdo HTTP (estático e encaminha dinâmico) — ex.: **Apache HTTP Server, IIS, NGINX**.
- **Servidor de aplicação:** executa a **lógica de negócio** e fornece serviços corporativos (transações, segurança, pool de conexões) — ex.: **JBoss EAP/WildFly** (Jakarta EE).
- **Internet** (rede pública) · **Intranet** (rede **interna** da organização com tecnologias web) · **Extranet** (parte da intranet aberta a **parceiros externos autorizados**) · **Portal** (ponto único de acesso a vários serviços/informações, ex.: portal unificado da Res. CNJ 574/2024).
- **Conexões:** [[servicos-rede]] · [[servicos-rede]] · [[res-cnj-574-2024]]
- ⚠️ Definições conceituais clássicas; fonte específica a anexar.

## [[arquiteturas]] 🟢 Arquiteturas: cliente-servidor, multicamadas, objetos distribuídos (🟣 + SOA)

- **Cliente-servidor:** o cliente pede, o servidor atende (ex.: navegador ↔ servidor web).
- **Multicamadas (n-tier):** separa **apresentação**, **negócio** e **dados** (3 camadas) — cada uma pode escalar/trocar sem afetar a outra.
- **Objetos distribuídos:** objetos em máquinas diferentes se comunicam como se fossem locais (ex.: **CORBA**, **Java RMI**, DCOM).
- 🟣 **SOA:** sistema organizado em **serviços** reutilizáveis com contratos bem definidos (historicamente SOAP/WSDL + ESB). **Microsserviços** são uma evolução com serviços menores e independentes.
- 🔵 **Serverless:** você publica **funções/código** e o provedor de nuvem gerencia servidores e escala (cobra por execução).
- **Conexões:** [[microsservicos]] · [[nuvem]] · [[api-rest]]
- ⚠️ Conceitos clássicos de engenharia de software; anexar fonte de referência na revisão.

## [[manutencao-sistemas]] 🔵 Manutenção de sistemas

- **O que cai:** questões **práticas** — ler um trecho de código e dizer o resultado, achar o bug, escolher a correção, depurar (breakpoints, inspeção de variáveis, logs/stack trace), gerar relatórios.
- **Conexões:** [[excecoes]] (ler stack trace) · [[testes-software]] · [[git]] (histórico/blame)

---

## Mapa de conexões — Programação

```
Fundamentos (tipos, operadores, fluxo) → OO (classe, interface, herança, overload × override)
        │                                         │
        ▼                                         ▼
Exceções (checked × unchecked) ↔ OWASP A10     UML (classes) ↔ Padrões GoF
        │
Acesso a banco: JDBC/JPA (Java) · ADO.NET/EF (C#) · PDO (PHP)  ↔ SQL ↔ SQL injection
        │
Web: HTML5 + CSS3 + Bootstrap (12 col/6 breakpoints) + JS/TS
        ├── React (lib, JSX) / React Native · Angular (framework TS) · Vue · jQuery
        ├── Node.js = runtime (V8)
        ├── JSP / JSF (Facelets XHTML) ↔ Jakarta EE ↔ WildFly
        └── PWA = manifest + service worker
XML (bem formado × válido) + XSD ↔ pom.xml ↔ SOAP/SOA
Arquiteturas: cliente-servidor → multicamadas → objetos distribuídos → SOA → microsserviços → serverless
```
