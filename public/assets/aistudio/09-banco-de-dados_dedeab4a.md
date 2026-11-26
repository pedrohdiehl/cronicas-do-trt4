---
materia: Banco de Dados
cai_em: [Analista TI (bloco próprio), Técnico TI (via PDPJ/acesso a banco)]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Banco de Dados

> **Analista (bloco "Banco de Dados"):** Modelo ER; normalização; SQL — DML, DDL, DCL; gerência de transações; SQL e PL/SQL; **PostgreSQL 15, 16, 17 e 18** + migração/compatibilidade com o **14** legado; **Oracle 19c**; H2.
> **Técnico:** PostgreSQL e H2 aparecem dentro da arquitetura PDPJ ([[postgresql]], [[h2]] no arquivo 05) e "acesso a banco de dados" nos fundamentos de programação.
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[modelagem-er]] 🟣 Modelo Entidade-Relacionamento (ER)

- **O que é:** modelo **conceitual** (Peter Chen, 1976) para desenhar os dados antes de criar tabelas.
- **Elementos:**
  - **Entidade** (coisa do mundo real: *Processo*, *Parte*, *Advogado*) — **fraca** quando depende de outra para existir (ex.: *Movimentação* de um *Processo*).
  - **Atributo** (simples, composto, multivalorado, derivado, **chave**).
  - **Relacionamento** com **cardinalidade**: 1:1, **1:N**, **N:N**.
- **Do ER para o relacional:** entidade → tabela; 1:N → **chave estrangeira** no lado N; **N:N → tabela associativa** com as duas FKs.
- **Exemplo prático:** *Processo* N:N *Parte* → tabela `processo_parte(id_processo, id_parte, polo)`.
- **Conexões:** [[normalizacao]] · [[uml]] (diagrama de classes é "primo" do ER) · [[jpa-hibernate]] (`@OneToMany`, `@ManyToMany`)
- ⚠️ Conteúdo clássico de livro-texto (Chen; Elmasri & Navathe); sem fonte online oficial nesta rodada.

## [[normalizacao]] 🟣 Normalização

- **O que é:** organizar tabelas para **eliminar redundância e anomalias** (de inserção, atualização, exclusão), usando **dependências funcionais**.
- **Formas normais (resumo de prova):**
  - **1FN:** só valores **atômicos** (sem atributos multivalorados/grupos repetidos).
  - **2FN:** 1FN + **nenhum atributo não-chave depende de só parte de uma chave composta** (sem dependência parcial).
  - **3FN:** 2FN + **nenhum atributo não-chave depende de outro não-chave** (sem dependência transitiva).
  - **BCNF:** todo determinante é **chave candidata** (3FN "mais forte").
  - 4FN (dependências multivaloradas) e 5FN (de junção) aparecem menos.
- **Exemplo:** tabela `processo(numero, cpf_parte, nome_parte)` → `nome_parte` depende de `cpf_parte` (não-chave) → viola 3FN → separar `parte(cpf, nome)`.
- **Conexões:** [[modelagem-er]] · [[sql]]
- ⚠️ Definições clássicas (Codd); conferir redação em livro de referência se a banca pedir literalidade.

## [[sql]] 🟣 SQL: DDL, DML, DCL (+ TCL)

| Sublinguagem | Para quê | Comandos |
| --- | --- | --- |
| **DDL** – definição | estrutura | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |
| **DML** – manipulação | dados | `SELECT`, `INSERT`, `UPDATE`, `DELETE`, **`MERGE`** |
| **DCL** – controle | permissões | `GRANT`, `REVOKE` |
| **TCL** – transação | controle de transação | `BEGIN`/`START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |

- ⚠️ Classificação de `SELECT`: alguns autores o colocam em uma "DQL" separada; `TRUNCATE` é DDL na maioria das classificações. Atenção ao enunciado.
- **Pontos clássicos de prova:** `JOIN`s (INNER, LEFT, RIGHT, FULL), `GROUP BY` + `HAVING` (filtra **grupos**; `WHERE` filtra **linhas**), subconsultas, `DISTINCT`, `UNION` × `UNION ALL`, constraints (`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`), views, índices.
- **`MERGE`:** comando do padrão SQL que faz `INSERT`, `UPDATE` e `DELETE` condicionais em **um só comando** — chegou ao PostgreSQL na **versão 15**.
- **Conexões:** [[acesso-banco]] · [[owasp]] (SQL injection) · [[jpa-hibernate]] (JPQL gera SQL)
- **Fonte (MERGE):** [PostgreSQL 15 – anúncio](https://www.postgresql.org/about/news/postgresql-15-2526/)

## [[plsql]] 🟣 PL/SQL (Oracle) e PL/pgSQL (PostgreSQL)

- **PL/SQL:** extensão **procedural** do SQL da Oracle — blocos `DECLARE … BEGIN … EXCEPTION … END;`, variáveis, `IF`, laços, **cursores**, **procedures**, **functions**, **triggers**, **packages**.
- **PL/pgSQL:** equivalente no PostgreSQL (functions/procedures/triggers).
- **Exemplo:** trigger que grava auditoria quando alguém altera a situação de um processo.
- **Conexões:** [[oracle-19c]] · [[postgresql]] · [[moreq-jus]] (trilha de auditoria) · [[jpa-hibernate]] (Envers faz auditoria na aplicação)
- ⚠️ Visão geral; aprofundar na documentação Oracle PL/SQL Language Reference.

## [[transacoes]] 🟣 Gerência de transações (ACID e isolamento)

- **ACID:** **Atomicidade** (tudo ou nada) · **Consistência** (de um estado válido a outro) · **Isolamento** (transações concorrentes não se atrapalham) · **Durabilidade** (após o `COMMIT`, sobrevive a falhas — log/WAL).
- **Fenômenos de concorrência (documentação PostgreSQL):**
  - **Dirty read:** ler dado gravado por transação **ainda não confirmada**.
  - **Nonrepeatable read:** reler a mesma linha e ela **mudou** (outra transação confirmou).
  - **Phantom read:** reexecutar a consulta e o **conjunto de linhas** mudou.
  - **Serialization anomaly:** o resultado não bate com nenhuma ordem serial possível.
- **4 níveis do padrão SQL:**

| Nível | Dirty | Nonrepeatable | Phantom |
| --- | --- | --- | --- |
| Read Uncommitted | possível | possível | possível |
| **Read Committed** | não | possível | possível |
| Repeatable Read | não | não | possível (no padrão) |
| Serializable | não | não | não |

- **Particularidades do PostgreSQL (pegadinhas!):**
  - **Read Committed é o padrão.**
  - Aceita pedir os 4 níveis, mas **implementa só 3**: Read Uncommitted **se comporta como Read Committed**.
  - O **Repeatable Read do PostgreSQL não permite phantom read** (mais forte que o padrão exige).
  - Usa **MVCC** (controle de concorrência multiversão); em Repeatable Read/Serializable a aplicação deve estar pronta para **repetir** a transação se der erro de serialização.
- **Conexões:** [[spring-boot]] (`@Transactional`) · [[jpa-hibernate]] · [[mensageria]] (consistência eventual entre microsserviços)
- **Fontes:** [PostgreSQL – Transaction Isolation](https://www.postgresql.org/docs/16/transaction-iso.html) · [PostgreSQL 15 – Transaction Isolation](https://www.postgresql.org/docs/15/transaction-iso.html)

---

## [[postgresql-versoes]] 🟣 PostgreSQL 15, 16, 17, 18 e migração do 14

- **Política de versões:** cada major é suportada por **5 anos**; versão menor (ex.: 17.12) **nunca muda o formato de armazenamento** → atualizar minor é simples.

| Versão | Lançamento | Fim do suporte | Destaques |
| --- | --- | --- | --- |
| **14** | 30/09/2021 | **12/11/2026** (⚠️ **já encerrado** na data deste levantamento) | — legado do edital |
| **15** | 13/10/2022 | 11/11/2027 | **`MERGE`**; filtros de linha/coluna na replicação lógica; compressão **zstd** no `pg_basebackup`; log em **JSON**; tira o `CREATE` do schema `public` de todos (exceto dono) |
| **16** | 14/09/2023 | 09/11/2028 | **replicação lógica a partir de standby**; aplicação paralela de transações grandes; view **`pg_stat_io`**; construtores SQL/JSON |
| **17** | 26/09/2024 | 08/11/2029 | **backup incremental no `pg_basebackup`**; `JSON_TABLE`; `pg_createsubscriber`; `pg_upgrade` preserva **slots de replicação lógica**; novo gerenciamento de memória do VACUUM |
| **18** | 25/09/2025 | 14/11/2030 | **I/O assíncrono (AIO)**; `pg_upgrade` **mantém estatísticas do otimizador**; **`uuidv7()`**; colunas geradas **virtuais** (padrão); **autenticação OAuth**; *skip scan* em B-tree; `OLD`/`NEW` no `RETURNING` |

- **Como migrar de major (ex.: 14 → 17/18) — 3 caminhos oficiais:**
  1. **dump/restore** (`pg_dumpall`/`pg_dump` + restore) — tradicional, mais lento; usar o `pg_dump` **da versão nova**;
  2. **`pg_upgrade`** — mais rápido: reaproveita os arquivos de dados e recria as tabelas de sistema (funciona a partir da 9.2);
  3. **replicação lógica** — funciona **entre majors diferentes**, permite migração com pouca indisponibilidade.
  - Dá para pular versões (14 → 18 direto), mas **leia as release notes de todas as intermediárias** (incompatibilidades).
- **Exemplo prático:** o banco de um sistema legado do tribunal em PG 14 saiu de suporte em nov/2026 → plano: testar a aplicação no 17/18, migrar com `pg_upgrade` (ou replicação lógica para reduzir a janela), rodar ANALYZE se a origem for < 18.
- **Fontes:** [PostgreSQL – Versioning policy](https://www.postgresql.org/support/versioning) · [Release 15](https://www.postgresql.org/docs/18/release-15.html) · [Release 16](https://www.postgresql.org/docs/16/release-16.html) · [Release 17](https://www.postgresql.org/docs/17/release-17.html) · [Release 18](https://www.postgresql.org/docs/release/18/) · [Upgrading a cluster](https://www.postgresql.org/docs/16/upgrading.html) · [pg_upgrade](https://www.postgresql.org/docs/17/pgupgrade.html) · [Aviso EOL do 14](https://www.postgresql.org/message-id/attachment/196145/20260514updaterelease.md)

## [[oracle-19c]] 🟣 Oracle Database 19c

- **O que é:** a **Long Term Release** da família 12c/18c/19c (lançada no início de 2019).
- **Long Term × Innovation Release:** Long Term = suporte mais longo, com **Extended Support**; Innovation (ex.: 21c) = pelo menos 2 anos de Premier, **sem** Extended.
- **Suporte do 19c (após prorrogações):** **Premier até 31/12/2029** e **Extended até 31/12/2032**.
- **Sucessora:** 23ai (renomeada **26ai**), também Long Term.
- **Fontes:** [Oracle MOS 742060.1 – Release Schedule](https://support.oracle.com/knowledge/Oracle%20Database%20Products/742060_1.html) · [The Register – 19c até 2032](https://www.theregister.com/2025/02/18/oracle_extends_19c_support/) · [Oracle Blog – Long Term Release](https://blogs.oracle.com/database/?p=2903)

## [[h2]] 🟢 H2 Database (lembrete)

- Banco **Java, leve, embutível e em memória** — usado em **testes** e desenvolvimento local na stack PDPJ. Detalhes no arquivo 05.

---

## Mapa de conexões — Banco de Dados

```
Modelo ER (entidade, atributo, cardinalidade) ──► tabelas (N:N = tabela associativa)
        │                                          │
        ▼                                          ▼
Normalização 1FN→2FN→3FN→BCNF               JPA/Hibernate (@ManyToMany) + Flyway (migrations DDL)
        │
SQL: DDL (CREATE/ALTER/DROP) · DML (SELECT/INSERT/UPDATE/DELETE/MERGE) · DCL (GRANT/REVOKE) · TCL (COMMIT/ROLLBACK)
        │                                                  │
PL/SQL (Oracle 19c) / PL/pgSQL (PostgreSQL)          Transações ACID + isolamento (PG: Read Committed padrão, MVCC)
        │
PostgreSQL 14 (EOL 12/11/2026) → 15 (MERGE) → 16 (repl. lógica no standby) → 17 (backup incremental) → 18 (AIO, uuidv7, OAuth)
        └── migração: dump/restore · pg_upgrade · replicação lógica
Segurança: consultas parametrizadas (SQL injection) · GRANT mínimo (menor privilégio) · LGPD (dados pessoais)
```
