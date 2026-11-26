---
materia: Sistemas Operacionais
cai_em: [Analista TI (bloco próprio), Técnico TI (hardening/infra)]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Sistemas Operacionais

> **Analista:** processos e threads (alocação de CPU, comunicação e sincronização, **deadlock**, **starvation**); gerência de memória (alocação, segmentação, memória virtual, paginação); E/S e armazenamento secundário/terciário; **Linux (Red Hat e Oracle Linux)**; comandos; **Windows 11, Windows 10 (legado/suporte estendido), Windows Server 2019/2022/2025**; **Active Directory, PowerShell, WSUS**.
> **Técnico:** não tem bloco de SO, mas cobra **hardening de sistemas operacionais** (arquivo 06) e AAA.
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[processos-threads]] 🟣 Processos, threads e escalonamento de CPU

- **Processo:** programa **em execução**, com seu próprio espaço de memória. **Thread:** fluxo de execução **dentro** de um processo; threads do mesmo processo **compartilham memória** (mais leves, mas exigem sincronização).
- **Estados clássicos:** novo → **pronto** → **executando** → (**bloqueado/esperando** E/S) → pronto … → terminado.
- **Escalonamento (alocação de CPU):** FCFS/FIFO (por ordem de chegada) · **SJF** (menor job primeiro — ótimo em tempo médio de espera, mas pode causar starvation dos longos) · **Round Robin** (fatia de tempo/*quantum*, preemptivo) · **Prioridade** (pode causar starvation; resolve com **envelhecimento/aging**).
- **Preemptivo × não preemptivo:** no preemptivo o SO pode **tirar** a CPU do processo.
- **Comunicação e sincronização (IPC):** memória compartilhada, troca de mensagens, pipes, sockets; **região crítica** protegida por **mutex**, **semáforos** (Dijkstra) e **monitores**; condição de corrida (*race condition*) quando o resultado depende da ordem de execução.
- **Conexões:** [[java]] (threads, `synchronized`) · [[mensageria]] (troca de mensagens entre serviços) · [[transacoes]] (concorrência no banco)
- ⚠️ Conteúdo clássico (Tanenbaum; Silberschatz); sem fonte online única nesta rodada.

## [[deadlock]] 🟣 Deadlock (impasse) e starvation (inanição)

- **Deadlock:** conjunto de processos em que **cada um espera um recurso preso por outro** do conjunto → ninguém anda.
- **As 4 condições de Coffman (1971)** — **todas** precisam ocorrer ao mesmo tempo:
  1. **Exclusão mútua** — recurso não compartilhável;
  2. **Posse e espera** (*hold and wait*) — segura um recurso enquanto espera outro;
  3. **Não preempção** — recurso só é liberado por quem o detém;
  4. **Espera circular** — cadeia fechada P0 → P1 → … → P0.
- **Como lidar:** **prevenir** (quebrar uma das 4 condições, ex.: ordenar a requisição de recursos para eliminar a espera circular) · **evitar** (ex.: algoritmo do **banqueiro**, estado seguro) · **detectar e recuperar** (grafo de alocação, matar/rolar processos) · **ignorar** ("algoritmo do avestruz" — o que a maioria dos SOs de uso geral faz).
- **Starvation (inanição):** um processo **nunca consegue** o recurso/CPU porque outros sempre passam na frente (ex.: prioridade baixa). Diferente do deadlock: o sistema **continua andando**, só aquele processo não. Solução típica: **aging**.
- **Exemplo prático:** duas transações no banco: T1 trava a linha A e pede B; T2 trava B e pede A → deadlock (o PostgreSQL detecta e aborta uma delas).
- **Fontes:** [Yale – Deadlock (Coffman)](https://cs.yale.edu/homes/aspnes/pinewiki/Deadlock.html) · [UIC – Deadlocks (Silberschatz)](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/7_Deadlocks) · [Tanenbaum – InformIT](https://www.informit.com/articles/article.aspx?p=25193)

## [[memoria]] 🟣 Gerência de memória

- **Alocação contígua:** partições fixas/variáveis → **fragmentação externa** (buracos entre blocos) e **interna** (sobra dentro do bloco). Estratégias: *first-fit*, *best-fit*, *worst-fit*.
- **Paginação:** memória lógica dividida em **páginas** de tamanho fixo e a física em **quadros (frames)** do mesmo tamanho; **tabela de páginas** traduz endereços (com **TLB** como cache). Elimina fragmentação externa (pode ter interna na última página).
- **Segmentação:** divide por **segmentos lógicos de tamanho variável** (código, dados, pilha) — visão do programador; pode ter fragmentação externa.
- **Memória virtual:** o processo pode ser **maior que a RAM**; só as páginas necessárias ficam na memória (**paginação sob demanda**). **Page fault** = página não está na RAM → SO busca no disco (swap). **Thrashing** = o sistema passa mais tempo trocando páginas do que executando.
- **Substituição de páginas:** FIFO (sofre a **anomalia de Belady**), **ótimo** (teórico), **LRU** (menos recentemente usada), relógio/segunda chance.
- ⚠️ Conteúdo clássico de livro-texto.

## [[entrada-saida]] 🟣 Entrada/saída e armazenamento

- **Técnicas de E/S:** programada (*polling*), por **interrupção**, **DMA** (o controlador transfere direto para a memória sem ocupar a CPU).
- **Armazenamento secundário** (HD, SSD) × **terciário** (fitas, mídia removível/arquivamento — barato, lento, ótimo para backup).
- **Desempenho/confiabilidade:** escalonamento de disco (FCFS, SSTF, SCAN/elevador, C-SCAN); **RAID** (0 = striping sem redundância; 1 = espelhamento; 5 = paridade distribuída, tolera 1 disco; 6 = dupla paridade, tolera 2; 10 = espelhamento + striping).
- **Conexões:** [[backup]] (fitas, regra 3-2-1) · [[postgresql-versoes]] (AIO do PG 18)
- ⚠️ Conteúdo clássico; níveis RAID conferir na referência SNIA se a banca pedir detalhe.

---

## [[linux]] 🟣 Linux: Red Hat Enterprise Linux e Oracle Linux

- **RHEL 10:** disponível em **maio/2025** (10.0 GA 13/05/2025; anunciado no Red Hat Summit), com **image mode** e o assistente de IA **RHEL Lightspeed** na linha de comando.
- **Oracle Linux 10:** **100% compatível em binários com o RHEL 10**; kernel padrão **UEK 8 (Unbreakable Enterprise Kernel)**, mas também traz o **RHCK (Red Hat Compatible Kernel)**.
- **Administração (família RHEL):** pacotes com **`dnf`** (sucessor do `yum`) e **RPM**; serviços com **`systemctl`** (systemd); firewall com **`firewalld`/`firewall-cmd`**; **SELinux** (controle de acesso obrigatório); logs com **`journalctl`**.
- **Comandos que caem:** `ls`, `cd`, `pwd`, `cp`, `mv`, `rm`, `mkdir`, `cat`, `less`, `grep`, `find`, `chmod` (permissões rwx/octal, ex.: `chmod 750`), `chown`, `ps`, `top`, `kill`, `df`, `du`, `free`, `tar`, `ssh`, `scp`, `ip addr`, `ss`/`netstat`, `sudo`, `useradd`, `passwd`, `crontab`.
- **Permissões:** `r=4 w=2 x=1` para **dono, grupo, outros** → `755` = rwx r-x r-x.
- **Conexões:** [[ataques-malware]] · [[docker]] (contêineres rodam sobre kernel Linux) · [[protocolos]] · [[servicos-rede]] (servidores de aplicação em Linux)
- **Fontes:** [Red Hat – RHEL 10 (pt-br)](https://www.redhat.com/pt-br/about/press-releases/red-hat-introduces-rhel-10) · [The Register – RHEL 10.0 GA](https://www.theregister.com/2025/05/14/red_hat_enterprise_linux_10/) · [Oracle – Oracle Linux 10 GA](https://blogs.oracle.com/developers/oracle-linux-10-now-generally-available) · [Oracle Linux 10 – Release Notes](https://docs.oracle.com/cd/G40711_01/relnotes10.0/OL10-RELNOTES-10-0.pdf)
- ⚠️ A lista de comandos é conhecimento geral de administração; conferir sintaxe com `man`.

## [[windows]] 🟣 Windows 11, Windows 10 e Windows Server 2019/2022/2025

| Produto | Situação (levantamento 24/11/2026) |
| --- | --- |
| **Windows 10** | **fim do suporte em 14/10/2025**; continua funcionando, mas sem atualizações/suporte. **ESU** (Extended Security Updates): consumidor, inicialmente até out/2026 e **prorrogado até 12/10/2027**; empresas pagam por dispositivo. |
| **Windows 11** | versão atual do cliente |
| **Windows Server 2019** | ⚠️ suporte estendido até jan/2029 (conferir na página de lifecycle) |
| **Windows Server 2022** | mainstream **encerrado em 13/10/2026**; extended até **14/10/2031** |
| **Windows Server 2025** | GA em **nov/2024**; mainstream até **nov/2029**; extended até **14/11/2034** |

- **Ciclo de vida fixo (Fixed Lifecycle):** **mainstream** (correções + novidades) → **extended** (só segurança). "Fim de vida" = fim do extended.
- **Fontes:** [Microsoft – Windows 10 support has ended](https://support.microsoft.com/kb/5056949) · [BleepingComputer – ESU até out/2027](https://bleepingcomputer.com/news/microsoft/microsoft-quietly-extends-free-windows-10-esu-support-to-october-2027) · [Microsoft Learn – Windows Server 2022 Standard (MSL)](https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2022-standard-msl) · [BleepingComputer – WS 2022 fim do mainstream / WS 2025 até 2034](https://www.bleepingcomputer.com/news/microsoft/microsoft-windows-server-2022-reached-end-of-mainstream-support/amp/) · [Microsoft Learn – Windows Server 2025 lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2025)

## [[active-directory]] 🟣 Active Directory (AD DS)

- **O que é:** serviço de diretório do Windows Server que oferece **autenticação**, aplicação de **políticas** e **gerência centralizada** de usuários e computadores. O servidor que roda AD DS é o **controlador de domínio (DC)**.
- **Estrutura lógica:** **floresta** (conjunto de árvores; o primeiro domínio é o **domínio raiz**) → **árvore** (domínios com **namespace contíguo**) → **domínio** → **OU (unidade organizacional)** = contêiner para **delegar administração** e **vincular GPOs**.
- **Estrutura física:** **sites** (refletem a rede física, controlam replicação) e **DCs**.
- **GPO (Group Policy Object):** configurações aplicadas centralmente (ex.: política de senha, bloqueio de USB). Ordem de aplicação clássica **LSDOU**: Local → Site → Domínio → OU.
- **FSMO (operations master):** 5 funções de mestre único — **Schema Master** e **Domain Naming Master** (por floresta); **RID Master**, **PDC Emulator** e **Infrastructure Master** (por domínio).
- **Protocolos por baixo:** **LDAP** (consulta ao diretório), **Kerberos** (autenticação), **DNS** (localizar DCs).
- **Conexões:** [[controle-acesso]] · [[keycloak-sso]] (Keycloak pode federar usuários do AD via LDAP) · [[protocolos]] · [[wifi-seguranca]] (802.1X/RADIUS integrado ao AD)
- **Fontes:** [Microsoft – AD DS Overview](https://learn.microsoft.com/de-de/previous-versions/orphan-topics/ws.11/cc731053(v=ws.11)) · [Microsoft Learn – Define AD DS (OU)](https://learn.microsoft.com/training/modules/introduction-to-ad-ds/2-define-ad-ds) · [Microsoft – Information about AD DS](https://technet.microsoft.com/en-us/library/cc540101.aspx)
- ⚠️ A lista nominal das 5 funções FSMO e a ordem LSDOU são conhecimento consolidado; nesta rodada só a existência das funções FSMO foi confirmada em fonte Microsoft.

## [[powershell]] 🟣 PowerShell

- **O que é:** shell + linguagem de script da Microsoft (hoje multiplataforma) que trabalha com **objetos** (não só texto). Comandos = **cmdlets** no padrão **Verbo-Substantivo**: `Get-Process`, `Get-Service`, `Stop-Service`, `Get-ADUser`, `New-ADUser`, `Install-WindowsFeature`.
- **Pipeline de objetos:** `Get-Service | Where-Object Status -eq 'Running' | Sort-Object Name`.
- **Ajuda:** `Get-Help`, `Get-Command`, `Get-Member`. Execução de scripts controlada pela **ExecutionPolicy**.
- **Conexões:** [[active-directory]] (módulo ActiveDirectory) · [[windows]]
- ⚠️ Resumo geral; anexar link da documentação oficial (learn.microsoft.com/powershell) na revisão.

## [[wsus]] 🟣 WSUS (Windows Server Update Services)

- **O que é:** função do Windows Server que **baixa as atualizações da Microsoft e as distribui na rede interna**, deixando o administrador **aprovar/adiar** e escolher quais máquinas recebem.
- ⚠️ **Status:** a Microsoft anunciou a **depreciação do WSUS em 20/09/2024** — **sem novos recursos**, mas as funções e o conteúdo **continuam disponíveis** e o papel **segue no Windows Server 2025**. Recomendação de substitutos em nuvem: **Windows Autopatch / Intune** (clientes) e **Azure Update Manager** (servidores).
- **Conexões:** [[ataques-malware]] (gestão de patches) · [[cis-controls]] (gestão contínua de vulnerabilidades)
- **Fontes:** [Microsoft Tech Community – WSUS deprecation](https://techcommunity.microsoft.com/blog/windows-itpro-blog/windows-server-update-services-wsus-deprecation/4250436) · [heise – WSUS continua no Server 2025](https://heise.de/-9944634)

---

## Mapa de conexões — Sistemas Operacionais

```
Processo ⊃ threads ── escalonamento (FCFS, SJF, RR, prioridade+aging)
     │                         │
     └─ sincronização (mutex, semáforo, monitor) ─► DEADLOCK (4 condições de Coffman)  ≠  STARVATION (resolve com aging)
                                                       └─ mesmo conceito no banco (locks de transação)
Memória: contígua → paginação (frames, TLB) / segmentação → memória virtual (page fault, thrashing, LRU)
E/S: polling · interrupção · DMA → discos (SCAN), RAID → backup (terciário: fita)
Linux (RHEL 10 ↔ Oracle Linux 10, UEK/RHCK): dnf, systemctl, SELinux, chmod 755 ── hardening, Docker
Windows: 10 (EOL 14/10/2025 + ESU) · 11 · Server 2019/2022/2025
     └─ AD DS (floresta > árvore > domínio > OU + GPO; FSMO; LDAP/Kerberos/DNS) ── Keycloak/802.1X
     └─ PowerShell (Verbo-Substantivo) · WSUS (depreciado em 2024, ainda no Server 2025)
```
