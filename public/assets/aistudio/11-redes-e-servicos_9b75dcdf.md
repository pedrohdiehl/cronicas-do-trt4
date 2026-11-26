---
materia: Redes de computadores, serviços de rede e gerenciamento
cai_em: [Técnico TI (Infraestrutura de TI), Analista TI (Redes + Serviços + Gerenciamento)]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Redes de computadores, serviços e gerenciamento

> **Ambos:** OSI/TCP-IP, IPv4/IPv6, endereçamento, equipamentos de interconexão, cabeamento estruturado, fibras mono/multimodo, VLAN (IEEE 802.1Q), Wi-Fi 802.11, AAA, IPSec.
> **Técnico:** modelo OSI, **CIDR**, **NAT**, Wi-Fi 6/6E, topologias, codificação de sinal, noções de gerenciamento/diagnóstico.
> **Analista:** comutação de circuitos/pacotes/células, PAN…WWAN, protocolos (TCP, UDP, IPSec, ARP, SSH, SMTP, HTTP, FTP, LDAP, DNS, DHCP, POP, IMAP), **NBR 14565:2019**, 802.1X, 802.3, **STP/RSTP**, **802.11ac/ax/be**, serviços (e-mail, DNS, DHCP, proxy), **JBoss EAP/WildFly, Apache, IIS**, **SNMP**, QoS, métricas, **Zabbix, ELK, Grafana, Prometheus, Fluentd**.
> ⚠️ O OCR do edital mostra "IEEE 802.10" — quase certamente é **IEEE 802.1Q (VLAN)**, como o próprio edital do Técnico indica "VLAN (IEEE 802.1Q)".
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[osi-tcpip]] 🟢 Modelo OSI × arquitetura TCP/IP

| OSI (7) | TCP/IP (4) | Exemplos | Unidade |
| --- | --- | --- | --- |
| 7 Aplicação · 6 Apresentação · 5 Sessão | **Aplicação** | HTTP, DNS, SMTP, SSH, LDAP, SNMP | dados/mensagem |
| 4 Transporte | **Transporte** | **TCP**, **UDP** | segmento (TCP) / datagrama (UDP) |
| 3 Rede | **Internet** | **IP**, ICMP, **IPSec** | pacote |
| 2 Enlace · 1 Física | **Acesso à rede** | Ethernet (802.3), Wi-Fi (802.11), ARP* | quadro / bits |

- *O **ARP** (descobre o MAC a partir do IP) fica "entre" camadas 2 e 3 — a classificação varia por autor.
- **TCP:** orientado a conexão (**3-way handshake**: SYN → SYN-ACK → ACK), confiável, ordenado, controle de fluxo/congestionamento. **UDP:** sem conexão, sem garantia, leve (DNS, DHCP, SNMP, streaming).
- **Comutação:** **circuitos** (caminho dedicado — telefonia), **pacotes** (cada pacote segue seu caminho — IP), **células** (pacotes de **tamanho fixo**, ex.: ATM com células de 53 bytes).
- **Abrangência:** PAN/WPAN (pessoal, Bluetooth) → LAN/WLAN (local) → MAN/WMAN (metropolitana) → WAN/WWAN (longa distância).
- ⚠️ Conteúdo clássico (Tanenbaum/Kurose).

## [[ip-enderecamento]] 🟢 IPv4, IPv6, CIDR e NAT

- **IPv4:** 32 bits (ex.: `192.168.10.25`). **Privados (RFC 1918):** `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.
- **CIDR (🔵):** notação `/n` = quantos bits são rede. `/24` → 256 endereços (254 hosts úteis); `/26` → 64 (62 úteis). Fórmula: **hosts úteis = 2^(32−n) − 2**.
- **NAT (🔵):** traduz endereços privados em público(s) na saída para a internet (PAT/NAT overload = vários IPs internos num IP público via portas).
- **IPv6:** **128 bits**, hexadecimal em 8 grupos (`2001:db8::1` — `::` comprime zeros, só uma vez). Sem broadcast (usa **multicast**/anycast); autoconfiguração (**SLAAC**); cabeçalho simplificado com cabeçalhos de extensão; NDP substitui o ARP.
- **Exemplo:** rede do fórum `10.4.20.0/23` → 512 endereços, 510 hosts.
- ⚠️ Faixas privadas e tamanhos são padronizados em RFCs (1918, 8200); conferir se a banca pedir número de RFC.

## [[protocolos]] 🟢 Protocolos e portas (as que mais caem)

| Protocolo | Porta (padrão) | Função |
| --- | --- | --- |
| FTP | 20 (dados) / 21 (controle) | transferência de arquivos |
| **SSH** | 22 | acesso remoto **cifrado** (substitui Telnet 23) |
| **SMTP** | 25 (587 submissão) | **envio** de e-mail |
| **DNS** | 53 (UDP e TCP) | nomes → IPs |
| **DHCP** | 67 servidor / 68 cliente (UDP) | configuração automática de IP — **DORA**: Discover, Offer, Request, Ack |
| **HTTP / HTTPS** | 80 / 443 | web (HTTPS = HTTP sobre TLS) |
| **POP3** | 110 (995 com TLS) | **baixa** e-mail (normalmente remove do servidor) |
| **IMAP** | 143 (993 com TLS) | acessa e-mail **mantendo no servidor** (sincroniza pastas) |
| **SNMP** | 161 (agente) / 162 (traps) — UDP | gerência de rede |
| **LDAP** | 389 (636 LDAPS) | consulta a diretório (AD) |

- **DNS – registros:** **A** (IPv4), **AAAA** (IPv6), **CNAME** (apelido), **MX** (servidor de e-mail), **NS** (servidor autoritativo), **PTR** (reverso IP → nome), **SOA** (autoridade da zona), **TXT** (texto, ex.: SPF). No Brasil, o registro de domínios `.br` é feito pelo **Registro.br (NIC.br)**.
- **IPSec (RFC 4301):** segurança na **camada de rede**. **AH** = autenticação/integridade (sem cifrar); **ESP** = cifra + integridade. **Modo transporte** (protege só a carga) × **modo túnel** (encapsula o pacote inteiro — VPN site-a-site). Chaves via **IKE**.
- **Conexões:** [[tls]] (HTTPS, LDAPS, IMAPS) · [[vpn-ztna]] (IPSec) · [[active-directory]] (LDAP, DNS, Kerberos) · [[keycloak-sso]] (federação LDAP)
- ⚠️ Portas = registro IANA (conhecimento consolidado); fonte específica não anexada nesta rodada.

## [[equipamentos-rede]] 🟢 Equipamentos de interconexão

| Equipamento | Camada | O que faz |
| --- | --- | --- |
| **Repetidor / hub** | 1 | regenera sinal / repete para **todas** as portas (um domínio de colisão) |
| **Bridge / switch** | 2 | encaminha por **endereço MAC**; cada porta = domínio de colisão separado |
| **Roteador** | 3 | encaminha por **IP** entre redes; separa domínios de **broadcast** |
| **Gateway** | 3 a 7 | "porta de saída"/tradução entre redes ou protocolos diferentes |
| Switch camada 3 | 2+3 | comuta e roteia (inter-VLAN) |

## [[vlan-stp]] 🟢 VLAN (802.1Q), 802.1X, 802.3 e Spanning Tree (🟣 STP/RSTP)

- **VLAN – IEEE 802.1Q:** divide um switch físico em redes **lógicas** separadas (broadcast isolado); a **tag 802.1Q** no quadro identifica a VLAN em links **trunk**. Comunicação entre VLANs exige **roteamento**.
- **IEEE 802.1X:** controle de acesso **por porta** (cabeada ou Wi-Fi): suplicante → autenticador (switch/AP) → servidor de autenticação (**RADIUS**), com **EAP**. Base do **NAC**.
- **IEEE 802.3:** família **Ethernet** (Fast Ethernet 100 Mb/s, Gigabit, 10 GbE…).
- 🟣 **STP (IEEE 802.1D):** evita **loops** em redes comutadas elegendo uma **root bridge** e bloqueando caminhos redundantes. Estados: **disabled, blocking, listening, learning, forwarding**; reconvergência ~**30–50 s**.
- 🟣 **RSTP (IEEE 802.1w):** evolução **rápida** (convergência em ~1 s). Só **3 estados**: **discarding** (junta disabled + blocking + listening), **learning**, **forwarding**. Papéis: root, designated, **alternate** e **backup**. Hoje incorporado ao 802.1D-2004.
- **Fontes:** [Cisco – Understand RSTP (802.1w)](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html) · [Global Knowledge – RSTP](https://www.globalknowledge.com/en-us/resources/articles/rapid-spanning-tree)

## [[cabeamento]] 🟢 Cabeamento estruturado (🟣 ABNT NBR 14565:2019) e fibras

- **NBR 14565:2019 (5ª edição, 30/09/2019):** requisitos de cabeamento estruturado **metálico e óptico** para **um edifício ou conjunto de edifícios comerciais em um campus**. Baseada na **ISO/IEC 11801**. (Data centers → NBR 16665; residencial → NBR 16264.)
- **3 subsistemas:** **backbone de campus**, **backbone de edifício** e **cabeamento horizontal**. Elementos: distribuidor de campus (CD), distribuidor de edifício (BD), distribuidor de piso (FD), ponto de consolidação (CP), **tomada de telecomunicações (TO)**; o **equipamento terminal (TE) não faz parte** do escopo.
- **Categorias de par trançado (banda):** Cat 5e = 100 MHz · **Cat 6 = 250 MHz** · **Cat 6A = 500 MHz** (10GBASE-T).
- ⚠️ Há notícia de uma **NBR 14565 de 11/2025** (nova edição); o edital cobra a **2019**.
- **Fibra óptica:** **monomodo** (núcleo fino ~9 µm, um modo de luz, **longas distâncias**, laser) × **multimodo** (núcleo ~50/62,5 µm, vários modos, **distâncias curtas**, LED/VCSEL, mais barata).
- **Fontes:** [Normas.com.br – NBR 14565 (escopo)](https://www.normas.com.br/visualizar/abnt-nbr-nm/20583/abnt-nbr14565-cabeamento-estruturado) · [O Setor Elétrico – normas e categorias](https://www.osetoreletrico.com.br/normas-para-cabeamento-estruturado/) · [IFRN – 3 subsistemas](https://docentes.ifrn.edu.br/rodrigotertulino/disciplinas/2016.2/arquitetura-de-redes-de-computadores/normas-para-cabeamento-estruturado/normas-para-cabeamento-estruturado) · [Gran – questões NBR 14565](https://questoes.grancursosonline.com.br/questoes-de-concursos/legislacao-dos-orgaos-nbr-14565-abnt-395909)

## [[ieee-80211]] 🟢 Wi-Fi: família IEEE 802.11 (🟣 ênfase ac/ax/be; 🔵 ênfase ax/6E)

| Geração | Padrão | Bandas | Destaques |
| --- | --- | --- | --- |
| Wi-Fi 4 | 802.11n | 2,4 e 5 GHz | MIMO |
| **Wi-Fi 5** | **802.11ac** | **5 GHz** | 256-QAM, MU-MIMO (downlink), canais até 160 MHz |
| **Wi-Fi 6** | **802.11ax** | 2,4 e 5 GHz | **OFDMA**, **1024-QAM**, MU-MIMO up/down, TWT (economia de energia) |
| **Wi-Fi 6E** | **802.11ax** | **6 GHz** | mesma tecnologia do 6, mas abre a faixa de **6 GHz** (até 1200 MHz de espectro extra) |
| **Wi-Fi 7** | **802.11be** | 2,4, 5 e 6 GHz | canais de **320 MHz**, **4096-QAM (4K-QAM)**, **MLO (Multi-Link Operation)**, *puncturing* |

- **Pegadinha:** Wi-Fi 6 **e** 6E são o **mesmo padrão 802.11ax** — o "E" é a banda de 6 GHz.
- **Segurança:** WPA3 (ver [[wifi-seguranca]]).
- **Fontes:** [HPE Aruba – Wi-Fi 7 features](https://arubanetworking.hpe.com/techdocs/aos/wifi-design-deploy/generations/wifi7/feature-benefit/) · [Intel – What is Wi-Fi 7](https://intel.com/content/www/us/en/products/docs/wireless/wi-fi-7.html) · [HPE – Wi-Fi 7](https://www.hpe.com/ie/en/what-is/wi-fi-7.html)

---

## [[servicos-rede]] 🟣 Serviços de rede e servidores (e-mail, DNS, DHCP, proxy; JBoss/WildFly; Apache; IIS)

- **E-mail:** SMTP **envia/transfere** entre servidores; POP3/IMAP **recebem**. **DNS** resolve nomes (recursivo × autoritativo, cache/TTL). **DHCP** entrega IP, máscara, gateway, DNS (concessão/*lease*). **Web proxy** intermedeia a navegação (cache, filtro, log).
- **JBoss EAP × WildFly:** **WildFly** (antes "JBoss AS", renomeado em **2014**) é o projeto **comunitário/upstream**; o **JBoss EAP** é a versão **comercial com suporte da Red Hat**, construída **sobre o WildFly** (servidor de aplicação **Jakarta EE + MicroProfile**). Em 2025 a participação da Red Hat no WildFly foi **transferida para a IBM**, mas o EAP continua sendo vendido pela Red Hat, no modelo *upstream-first*.
- **Apache HTTP Server:** servidor web open source (Apache Software Foundation), configurado por `httpd.conf`, **módulos** (`mod_ssl`, `mod_proxy` — pode atuar como **proxy reverso**), **virtual hosts**.
- **IIS (Internet Information Services):** servidor web da Microsoft para Windows Server (sites, *application pools*, ASP.NET).
- **Logs e administração:** logs de acesso/erro (Apache `access_log`/`error_log`), gerenciamento de usuários, análise de desempenho.
- **Conexões:** [[jakarta-ee]] · [[proxy-reverso]] · [[servidor-web-aplicacao]] · [[monitoramento]]
- **Fontes:** [WildFly – Red Hat's middleware strategy (2025)](https://www.wildfly.org/news/2025/03/05/WildFly-and-Red-Hat-s-middleware-strategy/) · [Red Hat Developers – JBoss EAP](https://developers.redhat.com/products/eap/overview) · [Red Hat – EAP × WildFly versions](https://access.redhat.com/node/7107499)
- ⚠️ Descrições de Apache/IIS e serviços são gerais; anexar documentação oficial (httpd.apache.org, learn.microsoft.com/iis) na revisão.

## [[snmp-gerencia]] 🟣 Gerenciamento de redes: SNMP, QoS e métricas (🔵 noções)

- **SNMP:** protocolo de **camada de aplicação** sobre **UDP**. **Gerente** (estação de monitoramento) consulta **agentes** (nos equipamentos) na **porta 161**; agentes mandam **traps** (notificações assíncronas) ao gerente na **porta 162**. **INFORM** = trap **com confirmação**.
  - **MIB (Management Information Base):** a "base de perguntas" — objetos identificados por **OID** (ex.: MIB-II, RFC 1213).
  - Operações: **Get, GetNext, GetBulk, Set, Trap, Inform**.
  - **Versões:** v1 e v2c usam **community string** (texto claro, fraco); **SNMPv3 (RFC 3411–3418)** traz **USM** (autenticação + **privacidade/cifra**) e **VACM** (controle de acesso por visão).
- **QoS:** tratar tráfegos de forma diferente (prioridade para voz/vídeo) — marcação (DSCP), filas, policiamento/shaping. **SLA** = nível de serviço acordado.
- **Métricas de desempenho:** **largura de banda**, **vazão (throughput)**, **latência (atraso)**, **jitter** (variação do atraso), **perda de pacotes**, disponibilidade.
- **Fontes:** [RFC 3414 – USM para SNMPv3](https://www.rfc-editor.org/rfc/rfc3414) · [NSRC – SNMP (gerente/agente, portas)](https://www.nsrc.org/workshops/2015/wacren-nmm/raw-attachment/wiki/Agenda/snmp.pdf) · [IBM – SNMPv3 USM](https://www.ibm.com/docs/SSLTBW_2.1.0/com.ibm.zos.v2r1.halz002/snmp_security_user_based.htm)

## [[monitoramento]] 🟣 Zabbix, Prometheus, Grafana, ELK e Fluentd (🔵 Técnico: ELK)

| Ferramenta | Papel | Ideia-chave |
| --- | --- | --- |
| **Zabbix** | monitoramento de infraestrutura "tudo em um" | servidor central + **agentes** (modo **passivo** = servidor consulta; **ativo** = agente envia); também SNMP, IPMI, JMX; **triggers** e alertas |
| **Prometheus** | métricas em **séries temporais** | modelo **pull** via HTTP (raspa o endpoint `/metrics`); linguagem **PromQL**; dados com **rótulos (labels)**; projeto **CNCF graduado** (2018); alertas via Alertmanager |
| **Grafana** | **visualização** | dashboards sobre várias fontes (Prometheus, Elasticsearch, PostgreSQL…) |
| **Elasticsearch** | busca/indexação | armazena e indexa logs/documentos (JSON) |
| **Logstash** | pipeline | coleta, transforma e envia dados ao Elasticsearch |
| **Kibana** | visualização | interface de busca e dashboards do Elasticsearch |
| **Fluentd** | coletor de logs | "camada unificada de logs" (projeto CNCF), alternativa ao Logstash (stack **EFK**) |

- **ELK = Elasticsearch + Logstash + Kibana** (🔵 Técnico cobra como "ferramentas de busca, indexação e análise de dados").
- **Exemplo prático:** Prometheus coleta métricas dos microsserviços Spring Boot (Actuator), Grafana mostra o painel; Fluentd/Logstash levam os logs ao Elasticsearch e o Kibana permite buscar o erro de um processo específico.
- **Conexões:** [[spring-boot]] · [[kubernetes]] · [[protecao-perimetro]] (SIEM usa logs) · [[res-cnj-396-2021]] (monitoramento contínuo)
- **Fontes:** [Prometheus – Overview](https://prometheus.io/docs/) · [PSU – Monitoring and Observability](https://web.cecs.pdx.edu/~dmcgrath/courses/Su26/secdevops/monitoring-and-observability.html) · [SigNoz – Zabbix × Prometheus](https://signoz.io/comparisons/zabbix-vs-prometheus/)
- ⚠️ Fluentd como "unified logging layer/CNCF" é descrição do próprio projeto (fluentd.org) — link oficial a anexar.

---

## Mapa de conexões — Redes

```
OSI 7 camadas ↔ TCP/IP 4 camadas
  Física/Enlace: cabeamento NBR 14565 (3 subsistemas, Cat6A 500 MHz) · fibra mono × multi · Ethernet 802.3 · Wi-Fi 802.11ac/ax/6E/be
                 switch (MAC) · VLAN 802.1Q · STP 802.1D → RSTP 802.1w (discarding/learning/forwarding) · 802.1X+RADIUS (NAC)
  Rede: IPv4 (CIDR, privados, NAT) · IPv6 (128 bits) · roteador · IPSec (AH/ESP, túnel) ↔ VPN
  Transporte: TCP (handshake) × UDP
  Aplicação: DNS · DHCP (DORA) · SMTP/POP/IMAP · HTTP/HTTPS(TLS) · SSH · FTP · LDAP(AD) · SNMP(161/162)
Serviços: Apache/IIS (web) · JBoss EAP/WildFly (aplicação Jakarta EE) · proxy
Gerência: SNMP (gerente/agente/MIB, v3=USM) · QoS · métricas (latência, jitter, perda)
Observabilidade: Zabbix · Prometheus(pull)+Grafana · ELK/EFK(Fluentd) ── SIEM ── ENSEC-PJ
```
