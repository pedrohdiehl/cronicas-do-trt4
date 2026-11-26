---
materia: Segurança da Informação
cai_em: [Técnico TI, Analista TI]
peso: Conhecimentos Específicos (peso 2)
levantamento: 2026-11-24
---

# Segurança da Informação

> Bloco com **muita sobreposição**. O Técnico vai mais fundo em riscos, incidentes, CIS e pós-quântica; o Analista cobra TLS 1.3 e interpretação de pacotes.
> Legenda: 🟢 Ambos · 🔵 Só Técnico · 🟣 Só Analista

---

## [[cid]] 🟢 Princípios: Confidencialidade, Integridade, Disponibilidade (+ autenticidade e não repúdio)

- **Confidencialidade:** só quem pode, vê. **Integridade:** não foi alterado indevidamente. **Disponibilidade:** está acessível quando precisa.
- **Extras que aparecem nos normativos:** **autenticidade** (é quem diz ser) e **não repúdio** (o autor não pode negar a autoria) — ambos exigidos pelo [[moreq-jus]] e providos pela assinatura digital (ver [[criptografia]]).
- **Conexões:** [[res-cnj-396-2021]] (ENSEC-PJ cita CID + autenticidade) · [[pdtic-trt4]] (objetivo de mitigar riscos de CID)
- **Fontes:** [NIST – confidentiality](https://csrc.nist.gov/glossary/term/confidentiality) · [NIST – integrity](https://csrc.nist.gov/glossary/term/integrity) · [NIST – availability](https://csrc.nist.gov/glossary/term/availability) · [NIST – authenticity](https://csrc.nist.gov/glossary/term/authenticity) · [NIST – non-repudiation](https://csrc.nist.gov/glossary/term/non_repudiation) · [NIST – digital signature](https://csrc.nist.gov/glossary/term/digital_signature) · [Resolução CNJ 522/2023](https://atos.cnj.jus.br/atos/detalhar/5266) · [Resolução CNJ 396/2021](https://atos.cnj.jus.br/atos/detalhar/3975) · [PDTIC 2024-2026, revisão 2025 – TRT4](https://www.trt4.jus.br/portais/media/503364045/008%20-%20DOCUMENTO%20-%20Plano%20Diretor%20de%20TIC%202024-2026%20-%20Revis%C3%A3o%202025.pdf)

---

## [[iso-27001]] 🟢 ABNT NBR ISO/IEC 27001 e 27002

- **27001 — o que é:** norma de **requisitos** para um **SGSI (Sistema de Gestão da Segurança da Informação)**. É a que se **certifica**. Título atual: "Segurança da informação, segurança cibernética e proteção à privacidade".
- **27002 — o que é:** **guia de boas práticas** que detalha os controles (definição, propósito, como implementar).
- **Anexo A (2022):** de 114 controles em 14 seções → **93 controles em 4 temas**:

| Tema (cláusula da 27002) | Nº de controles |
| --- | --- |
| Organizacionais (5) | 37 |
| Pessoas (6) | 8 |
| Físicos (7) | 14 |
| Tecnológicos (8) | 34 |

  - Dos 93: **11 novos** (ex.: **inteligência de ameaças**), 24 resultam de fusões, 58 atualizados. Os controles ganharam **atributos**.
- ⚠️ **Versão:** a edição internacional é de 2022; o edital chama de "ABNT NBR ISO/IEC 27001:2024" (há publicação ABNT com esse ano). O conteúdo é o mesmo da 2022.
- **Exemplo prático:** a ENSEC-PJ manda cada tribunal ter um **SGSI baseado em riscos** — é exatamente a 27001.
- **Conexões:** [[iso-27005]] (riscos) · [[iso-27701]] (privacidade) · [[res-cnj-396-2021]] · [[cis-controls]]
- **Fontes:** [Gran – ISO 27001:2022](https://blog.grancursosonline.com.br/entendendo-a-norma-iso-iec-270012022/amp/) · [GlobalSuite – mudanças](https://www.globalsuitesolutions.com/pt/?p=117756) · [WeLiveSecurity – Anexo A](https://www.welivesecurity.com/br/2023/02/09/iso-270012022-quais-foram-as-principais-mudancas-na-nova-norma-de-seguranca/)

## [[iso-27701]] 🟢 ABNT NBR ISO/IEC 27701 — privacidade (PIMS)

- **O que é:** sistema de gestão da **informação de privacidade (PIMS)** — trata dados pessoais (PII), com controles para **controladores** e **operadores**.
- **Versões (atenção!):**
  - **2019:** era uma **extensão** da 27001/27002 (precisava de SGSI). → o edital do **Técnico** cita **27701:2019**.
  - **2025 (14/10/2025):** virou **norma independente (stand-alone)**, certificável sem a 27001. → o edital do **Analista** cita "27701:2026" (provável adoção ABNT da versão 2025).
- **Conexões:** [[lgpd]] (controlador/operador = mesmos papéis) · [[iso-27001]]
- **Fontes:** [DNV – nova 27701](https://www.dnv.com/news/2025/iso-iec-27701-standard-update-release/) · [BSI – key changes](https://www.bsigroup.com/en-GB/products-and-services/standards-services/iso-iec-27701-key-changes-and-guidance/)

## [[iso-27005]] 🔵 ABNT NBR ISO/IEC 27005:2023 — gestão de riscos de segurança da informação

- **O que é:** orientações para **gerir riscos** de SI, apoiando a 27001 (identificar, analisar, avaliar, tratar, comunicar e monitorar riscos).
- **Tratamento do risco (opções clássicas):** modificar/mitigar, reter/aceitar, evitar, compartilhar/transferir.
  - ⚠️ A redação dessas opções no texto da própria NBR (norma paga) não foi conferida.
- **Conexões:** [[res-cnj-396-2021]] (gestão baseada em riscos) · [[iso-27005]] · [[iso-12207]] (gestão de riscos é processo técnico de gestão)
- **Fontes:** [ISO – ISO/IEC 27005:2022](https://committee.iso.org/standard/80585.html) · [Target Normas – NBR ISO/IEC 27005 de 05/2023](https://www.target.com.br/produtos/normas-tecnicas/40712/nbriso-iec27005-seguranca-da-informacao-seguranca-cibernetica-e-protecao-a-privacidade-orientacoes-para-gestao-de-riscos-de-seguranca-da-informacao) · [DPO na Prática – nova 27005:2023](https://dponapratica.com.br/2023/05/a-nova-abnt-nbr-iso-iec-27005-2023/) · [SBC – processo da ISO 27005 em organizações públicas](https://sol.sbc.org.br/index.php/wcge/article/download/36330/36117) · [NIST – risk response](https://csrc.nist.gov/glossary/term/risk_response) · [Estratégia – NBR ISO/IEC 27005:2023](https://concursos.estrategia.com/portal/seguranca-informacao-iso-27005-2023/) · [Resolução CNJ 396/2021](https://atos.cnj.jus.br/atos/detalhar/3975) · [Edital nº 1/2026 (DOU 22/10/2026, cópia)](https://dhg1h5j42swfq.cloudfront.net/2026/10/22060540/diariooficial-126-152.pdf)

## [[cis-controls]] 🔵 CIS Controls v8

- **O que é:** **18 controles** prioritizados do Center for Internet Security (eram 20 na v7) com **153 salvaguardas**.
- **Implementation Groups (IGs):**
  - **IG1 = higiene cibernética essencial:** **56** salvaguardas — o mínimo para toda organização.
  - **IG2:** +74 salvaguardas (inclui IG1).
  - **IG3:** +23 → todas as 153.
- **Exemplos de controles:** 1 Inventário de ativos corporativos · 5 Gestão de contas · 18 Teste de intrusão.
- **v8.1:** lançada em junho/2024 (refinamentos).
- **Fontes:** [CIS – 18 is the new 20](https://www.cisecurity.org/insights/blog/18-is-the-new-20-cis-controls-v8-is-here) · [CIS – IG3](https://cisecurity.org/controls/implementation-groups/ig3)

---

## [[lgpd]] 🟢 LGPD — Lei nº 13.709/2018

- **Definições (art. 5º):**
  - **Dado pessoal:** informação relacionada a pessoa natural identificada ou identificável.
  - **Dado pessoal sensível:** origem racial ou étnica, convicção religiosa, opinião política, filiação sindical ou a organização religiosa/filosófica/política, saúde, vida sexual, dado genético ou biométrico.
  - **Agentes de tratamento:** **controlador** (decide) e **operador** (executa em nome do controlador).
  - **Encarregado (DPO):** canal de comunicação entre controlador, titulares e a ANPD.
- ⚠️ **Atualização:** a **ANPD** passou a se chamar **Agência Nacional de Proteção de Dados** (MP 1.317/2025, convertida na **Lei 15.352/2026**). A sigla continua ANPD.
- **10 princípios (art. 6º, além da boa-fé):** finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.
- **10 bases legais (art. 7º):** consentimento; obrigação legal/regulatória; políticas públicas; estudos por órgão de pesquisa; execução de contrato; exercício regular de direitos em processo; proteção da vida; tutela da saúde; legítimo interesse; proteção do crédito.
- **Dados sensíveis (art. 11):** consentimento específico e destacado, ou sem consentimento nas hipóteses indispensáveis (incluindo **prevenção à fraude e segurança em autenticação**). Não há "legítimo interesse" nem "proteção do crédito" aqui.
- **Direitos do titular (art. 18):** confirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento etc.
- **Poder público (art. 23):** trata dados para cumprir **finalidade pública** e competências legais; deve informar as hipóteses e indicar encarregado.
- **Segurança (art. 46):** medidas técnicas e administrativas **desde a concepção** (*privacy by design*).
- **Incidentes (art. 48):** comunicar à ANPD e ao titular "em **prazo razoável**, conforme definido pela autoridade" (a lei não fixa dias).
- **Sanções (art. 52):** advertência; multa simples de até **2% do faturamento**, limitada a **R$ 50 milhões por infração**; multa diária; publicização; bloqueio; eliminação; suspensões e proibição (essas últimas só após alguma das anteriores).
- **Exemplo prático:** um log de acesso do PJe com CPF de partes é dado pessoal; tratar isso tem base em **obrigação legal/exercício regular de direitos**, não em consentimento.
- **Conexões:** [[iso-27701]] · [[res-cnj-335-2020]] (PDPJ deve se adequar à LGPD) · [[res-cnj-574-2024]] · [[jwt]] (não pôr dado pessoal no payload) · [[codigo-conduta-trt4]] (privacidade)
- **Fontes:** [LGPD compilada – Planalto](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) · [Câmara – norma atualizada](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html)

---

## [[owasp]] 🟢 OWASP Top 10:2025 + desenvolvimento seguro

| # | Categoria 2025 | O que mudou |
| --- | --- | --- |
| A01 | **Broken Access Control** (controle de acesso quebrado) | Continua 1º; **absorveu SSRF**; inclui BOLA/BFLA de APIs |
| A02 | **Security Misconfiguration** | Subiu do 5º para o 2º |
| A03 | **Software Supply Chain Failures** | **Nova** (amplia "componentes vulneráveis e desatualizados") |
| A04 | Cryptographic Failures | Caiu do 2º |
| A05 | Injection | Caiu do 3º |
| A06 | Insecure Design | Caiu do 4º |
| A07 | Authentication Failures | — |
| A08 | Software or Data Integrity Failures | — |
| A09 | Security Logging & Alerting Failures | "Monitoring" virou "Alerting" |
| A10 | **Mishandling of Exceptional Conditions** | **Nova** (falhar aberto, erro mal tratado) |

- **Desenvolvimento seguro / programação defensiva:** validar toda entrada, usar consultas parametrizadas (contra injeção), tratar exceções sem vazar detalhes (liga com A10), menor privilégio.
- 🔵 **SDL** (*Security Development Lifecycle*, da Microsoft) e **CLASP** (OWASP): metodologias que embutem segurança em todo o ciclo de vida.
- **Conexões:** [[excecoes]] (tratamento de exceções da programação ↔ A10) · [[keycloak-sso]] (A07) · [[sql]] (A05) · [[ci-cd]] (A03 cadeia de suprimentos) · [[protecao-perimetro]]
- **Fontes:** [OWASP Top 10:2025 – introdução](https://owasp.org/Top10/2025/0x00_2025-Introduction/) · [SecurityWeek](https://www.securityweek.com/two-new-web-application-risk-categories-added-to-owasp-top-10/amp/) · [GitLab – mudanças](https://about.gitlab.com/blog/2025-owasp-top-10-whats-changed-and-why-it-matters/)

---

## [[protecao-perimetro]] 🟢 Sistemas de proteção: firewall, WAF, UTM, DMZ, Proxy, NAC, antivírus/antispam, IDS/IPS (🔵 + SIEM)

- **Firewall:** filtra tráfego por regras (endereço, porta, protocolo, estado da conexão).
- **WAF (*Web Application Firewall*):** firewall de **camada de aplicação HTTP** — bloqueia ataques web (injeção, XSS) → liga com [[owasp]].
- **UTM (*Unified Threat Management*):** appliance que junta várias funções (firewall, IPS, antivírus, filtro web, VPN).
- **DMZ:** sub-rede intermediária onde ficam serviços expostos à internet (web, e-mail), isolando a rede interna.
- **Proxy:** intermediário de requisições (o *forward proxy* fica na frente dos clientes — filtro de navegação). Contraste: [[proxy-reverso]].
- **NAC (*Network Access Control*):** só deixa o dispositivo entrar na rede se cumprir a política (ex.: com 802.1X).
- **IDS × IPS (NIST SP 800-94):** detecção de intrusão = monitorar eventos e procurar sinais de incidentes; **prevenção** = detectar **e tentar impedir**. Métodos: por **assinatura** (padrões conhecidos) e por **anomalia**. Tipos: de rede, wireless, análise de comportamento de rede e de host.
- 🔵 **SIEM:** correlaciona logs e eventos de várias fontes para detectar incidentes (citado pelo NIST como tecnologia complementar).
- **Fontes:** [NIST SP 800-94](https://csrc.nist.gov/publications/detail/sp/800-94/final) · [NIST – resumo SP 800-94](https://www.nist.gov/node/589321)

## [[vpn-ztna]] 🟢 VPN, VPN-SSL e ZTNA (Zero Trust)

- **VPN:** túnel criptografado sobre rede pública. **IPSec** (camada de rede) ou **SSL/TLS** (VPN-SSL, geralmente via navegador/cliente leve).
- **Zero Trust (NIST SP 800-207, 2020):** **nenhuma confiança implícita** é dada a ativos ou contas só pela **localização na rede** (LAN × internet) ou pela propriedade do dispositivo; autenticação e autorização de sujeito e dispositivo antes de cada sessão. Lema: "nunca confie, sempre verifique".
- **ZTNA:** acesso a aplicações aplicando Zero Trust (acesso por aplicação, não à rede inteira como na VPN tradicional).
- **Conexões:** [[protocolos]] · [[tls]] · [[controle-acesso]] · [[res-cnj-396-2021]] (segurança do teletrabalho)
- **Fontes:** [NIST SP 800-207](https://csrc.nist.gov/Pubs/sp/800/207/Final) · [NIST – never trust, always verify](https://www.nist.gov/blogs/taking-measure/zero-trust-cybersecurity-never-trust-always-verify)

## [[wifi-seguranca]] 🟢 Segurança em redes sem fio

- **Legados (inseguros):** WEP, WPA.
- **WPA2:** usava **PSK** (chave pré-compartilhada) no modo pessoal — vulnerável a ataque de dicionário offline e ao **KRACK** (2017).
- **WPA3 (Wi-Fi Alliance, 2018):** modo pessoal troca PSK por **SAE** (*Simultaneous Authentication of Equals*) → sigilo direto (*forward secrecy*), resistência a dicionário offline; **PMF (quadros de gerência protegidos) obrigatório**.
- **Modo Enterprise:** **IEEE 802.1X** + **EAP** + servidor **RADIUS** (ex.: integrado ao Active Directory; EAP-TLS com certificados é o mais forte).
- **Conexões:** [[ieee-80211]] (padrões Wi-Fi) · [[vlan-stp]] · [[active-directory]]
- **Fontes:** [TP-Link – What is WPA3](https://community.tp-link.com/en/business/kb/detail/354) · [arXiv – WPA3 SAE](https://arxiv.org/pdf/2603.23352)

## [[criptografia]] 🟢 Criptografia, hashes, certificados e assinaturas digitais

- **Simétrica:** **mesma chave** para cifrar e decifrar — rápida (ex.: **AES**). Problema: distribuir a chave.
- **Assimétrica:** **par de chaves** pública/privada (ex.: **RSA**, curvas elípticas). Cifrar com a pública do destinatário → só a privada dele decifra.
- **Hash criptográfico:** resumo de tamanho fixo, unidirecional (ex.: SHA-256) → **integridade**.
- **Assinatura digital:** hash do documento cifrado com a **chave privada** do autor → **autenticidade, integridade e não repúdio**.
- **Certificado digital:** vincula uma chave pública a uma identidade, assinado por uma **Autoridade Certificadora (AC)**.
- 🔵 **ICP/PKI e ICP-Brasil:** instituída pela **MP 2.200-2/2001** para garantir **autenticidade, integridade e validade jurídica** de documentos eletrônicos. Cadeia: **AC Raiz (o ITI)** → ACs → Autoridades de Registro (AR). Documento assinado com certificado ICP-Brasil se **presume verdadeiro** em relação ao signatário.
- 🔵 **Criptografia pós-quântica (NIST, 13/08/2024):** **FIPS 203 ML-KEM** (de CRYSTALS-Kyber, troca de chaves), **FIPS 204 ML-DSA** (de Dilithium, assinatura), **FIPS 205 SLH-DSA** (de SPHINCS+, assinatura baseada em hash). Motivo: computadores quânticos ameaçam RSA e curvas elípticas.
- **Exemplo prático:** o magistrado assina a sentença no PJe com certificado ICP-Brasil (token/nuvem) → não repúdio.
- **Conexões:** [[moreq-jus]] · [[jwt]] (assinatura HS256/RS256) · [[tls]]
- **Fontes:** [MP 2.200-2 (Câmara)](https://www2.camara.leg.br/legin/fed/medpro/2001/medidaprovisoria-2200-2-24-agosto-2001-391394-normaatualizada-pe.pdf) · [ITI – Carta de Serviços](https://www.gov.br/iti/pt-br/acesso-a-informacao/ITI_CartadeServicos_2025.pdf) · [NIST CSRC – FIPS PQC](https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved) · [IBM Research – PQC](https://research.ibm.com/blog/nist-pqc-standards)

## [[tls]] 🟢 TLS 1.2 (🟣 Analista: + TLS 1.3 e limitações do SSL)

- **O que é:** protocolo que cria um **canal seguro** entre dois pontos (confidencialidade, integridade, autenticação do servidor). Dois componentes: **handshake** (negocia algoritmos e chaves, autentica) e **record protocol** (protege os dados).
- 🟣 **TLS 1.3 × 1.2:** removeu troca de chaves **RSA estática e DH estático** → toda troca de chaves pública tem **sigilo direto (forward secrecy)**; removeu compressão e DSA; handshake mais rápido.
- ⚠️ **Novidade (jul/2026):** a **RFC 9846** passou a definir o TLS 1.3, **tornando obsoletas a RFC 8446** (TLS 1.3 antiga) **e a RFC 5246** (TLS 1.2).
- 🟣 **SSL:** antecessor do TLS; SSL 2.0/3.0 são inseguros e não devem ser usados (TLS 1.0 e 1.1 também foram depreciados).
- **Conexões:** [[criptografia]] · [[proxy-reverso]] (SSL offloading) · [[vpn-ztna]] (VPN-SSL) · [[tls]]
- **Fontes:** [RFC 9846](https://www.rfc-editor.org/info/rfc9846/) · [Draft RFC 8446bis – diferenças do 1.2](https://www.ietf.org/archive/id/draft-rescorla-tls-rfc8446-bis-00.html)

## [[controle-acesso]] 🟢 Controle de acesso: autenticação, autorização, auditoria (AAA), RBAC, MFA

- **AAA:** **Autenticação** (quem é você?), **Autorização** (o que pode fazer?), **Auditoria/Accounting** (o que fez?).
- **RBAC:** permissões atribuídas a **papéis**, e papéis a usuários (ex.: "Assessor", "Servidor de Secretaria").
- **MFA:** dois ou mais fatores de categorias diferentes — algo que você **sabe** (senha), **tem** (token, celular), **é** (biometria). O CNJ determinou MFA para acesso a sistemas judiciais sensíveis (Portaria CNJ nº 140, de 22/04/2024); o tema entrou na pauta do Comitê de Governança de TIC do TRT4 em 26/04/2024.
- **Conexões:** [[keycloak-sso]] · [[active-directory]] · [[owasp]] (A01 e A07) · [[portaria-162-2021]] (Manual de Gestão de Identidades)
- **Fontes:** [RFC 2989 – AAA](https://www.rfc-editor.org/rfc/rfc2989.txt) · [NIST – authentication](https://csrc.nist.gov/glossary/term/authentication) · [NIST – authorization](https://csrc.nist.gov/glossary/term/authorization) · [NIST – accountability](https://csrc.nist.gov/glossary/term/accountability) · [NIST – RBAC FAQ](https://csrc.nist.gov/projects/role-based-access-control/faqs) · [NIST – MFA](https://csrc.nist.gov/glossary/term/multi_factor_authentication) · [TRT7 – perfis no PJeCor](https://www.trt7.jus.br/files/pje/pje-cor/Manual_do_PJeCor_-_cadastramento_de_usurios.pdf) · [Portaria CNJ 140/2024](https://atos.cnj.jus.br/atos/detalhar/5536) · [TRT4 – ata de 26/04/2024](https://www.trt4.jus.br/portais/media/2804387/Ata%20Comit%C3%AA%20de%20Governan%C3%A7a%20de%20TIC%20-%2026_04_2024.pdf) · [Portaria CNJ 162/2021 (Qlegislação)](https://qlegislacao.com.br/legismais/federal/nac-port-cnj-162-2021)

## [[ataques-malware]] 🟢 Ataques, ameaças e códigos maliciosos

- **DoS / DDoS:** esgotar recursos para negar serviço; DDoS usa muitas origens (frequentemente uma **botnet**).
- 🔵 **Spoofing** (falsificação de origem: IP, ARP, e-mail), **flood** (inundação, ex.: SYN flood).
- **Malwares:** vírus (precisa de hospedeiro), worm (se propaga sozinho), **trojan** (disfarçado), spyware, **ransomware** (sequestra dados com criptografia), rootkit (esconde presença), backdoor, keylogger. **Phishing** é fraude que usa engenharia social para obter dados pessoais e financeiros (ex.: credenciais).
- **Sniffer / análise de pacotes:** captura e inspeciona tráfego (ex.: Wireshark) — usado na defesa e no ataque.
  - 🟣 Analista cobra **interpretação de pacotes**.
- 🔵 **Teste de intrusão (pentest) e análise de vulnerabilidades:** pentest **explora** falhas de forma autorizada (CIS Control 18); varredura de vulnerabilidades **identifica** (CIS Control 7).
- 🔵 **Hardening:** reduzir a superfície de ataque (desativar serviços, contas padrão, aplicar patches) → liga com [[wsus]] e [[linux]].
- **Fontes:** [CERT.br – Cartilha de Segurança](https://cartilha.cert.br/livro/cartilha-seguranca-internet.pdf) · [CERT.br – Códigos maliciosos](https://cartilha.cert.br/fasciculos/codigos-maliciosos/fasciculo-codigos-maliciosos.pdf) · [CISA – DoS e DDoS](https://www.cisa.gov/news-events/news/understanding-denial-service-attacks) · [RFC 2827 – IP spoofing](https://www.rfc-editor.org/rfc/rfc2827.txt) · [MITRE – ARP](https://attack.mitre.org/techniques/T1557/002/) · [NIST – flooding](https://csrc.nist.gov/glossary/term/flooding) · [RFC 4987 – SYN flood](https://www.rfc-editor.org/rfc/rfc4987.txt) · [MITRE – phishing de credenciais](https://attack.mitre.org/techniques/T1598/) · [Wireshark](https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html) · [NIST SP 800-115](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf) · [CIS Control 18](https://www.cisecurity.org/controls/penetration-testing) · [CIS Control 7](https://www.cisecurity.org/controls/continuous-vulnerability-management) · [Microsoft – hardening](https://learn.microsoft.com/en-us/azure/well-architected/security/harden-resources) · [NIST SP 800-123](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-123.pdf) · [Edital nº 1/2026 (DOU 22/10/2026, cópia)](https://dhg1h5j42swfq.cloudfront.net/2026/10/22060540/diariooficial-126-152.pdf)

## [[backup]] 🔵 Backup e recuperação de dados (+ gestão de incidentes)

- **Regra 3-2-1 (CISA):** **3 cópias**, em **2 tipos de mídia**, **1 fora do local**. Variação 3-2-1-1-0: + 1 imutável/offline + 0 erros verificados em teste de restauração.
- **Tipos:** completo; **incremental** (só o que mudou desde o último backup de qualquer tipo — restauração precisa do completo + todos os incrementais); diferencial (o que mudou desde o último completo).
- **Gestão de incidentes e continuidade:** preparar → detectar → conter → erradicar → recuperar → lições aprendidas. A ENSEC-PJ exige **backups automatizados e segregados** e **ETIR**.
- **Conexões:** [[res-cnj-396-2021]] · [[portaria-162-2021]] (protocolo de crises) · [[ataques-malware]] (ransomware ataca backups)
- **Fontes:** [CISA – back up data](https://www.cisa.gov/back-government-data) · [N-able – incremental](https://www.n-able.com/es/blog/data-backup-and-recovery-strategies-and-best-practices)

---

## Mapa de conexões — Segurança

```
CID (+autenticidade, não repúdio) ──> MoReq-Jus, ENSEC-PJ
ISO 27001 (SGSI, 93 controles/4 temas) ── 27002 (como fazer) ── 27005 (riscos) ── 27701 (privacidade ↔ LGPD)
CIS v8 (18 controles, IG1=56) ↔ ISO 27002 (ambos são catálogos de controles)
OWASP 2025 ↔ programação (exceções=A10, SQL=A05) ↔ WAF ↔ Supply chain (CI/CD)
Criptografia → assinatura digital → ICP-Brasil (ITI) → não repúdio no PJe
TLS 1.3 (RFC 9846) ↔ VPN-SSL ↔ SSL offloading ↔ HTTPS
Zero Trust/ZTNA ↔ MFA/RBAC ↔ Keycloak ↔ Active Directory
Wi-Fi: WPA3-SAE / 802.1X+EAP+RADIUS ↔ redes (802.11ax/be)
Incidentes: ETIR → PPINC/PGCRC/PIILC (Portaria 162) ↔ backup 3-2-1
```
