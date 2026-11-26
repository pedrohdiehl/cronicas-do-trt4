import { getAllFichas } from './customDatabase';
import { getFichasForClass, getQuestionsForClass } from './gameLogic';
import type { Ficha, ItemId, Question, RegionId, SaveState } from '../types';

export type BuildingFunctionType = 'rest' | 'shop' | 'challenge' | 'guide' | 'secret';
export type InteriorTheme = 'court' | 'library' | 'tavern' | 'forge' | 'vault' | 'datacenter' | 'harbor';

export interface BuildingShopOffer {
  itemId: ItemId;
  cost: number;
  note: string;
}

export interface BuildingSecretSpec {
  title: string;
  description: string;
  targetCount: number;
  metric: 'studied_zona' | 'studied_region' | 'duels_total' | 'spaced_clear';
  rewardXp: number;
  rewardItems: { itemId: ItemId; qty: number }[];
}

export interface BuildingInteriorSpec {
  id: string;
  label: string;
  regiaoId: RegionId;
  zonaId: string;
  fnType: BuildingFunctionType;
  interiorTheme: InteriorTheme;
  hostName: string;
  hostRole: Ficha['npcRole'];
  hostTitle: string;
  greeting: string;
  studyTip: string;
  shopOffers?: BuildingShopOffer[];
  secretQuest?: BuildingSecretSpec;
  challengeRewardItem?: ItemId;
}

export function slugifyBuildingLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Study Points earned from real study progress (answering questions + studying fichas),
 * spent in building shops without ever reducing hero XP or Level.
 */
export function getAvailableStudyPoints(save: SaveState): number {
  const earned =
    save.stats.totalCorrect * 15 +
    save.studiedFichas.length * 10 +
    (save.duelWins?.length || 0) * 20 +
    save.defeatedBosses.length * 40 +
    30; // Welcome stipend so players can try a shop early!
  const spent = save.spentStudyPoints || 0;
  return Math.max(0, earned - spent);
}

const STANDARD_SHOP_OFFERS: BuildingShopOffer[] = [
  { itemId: 'pocao_dica', cost: 25, note: 'Elimina 2 alternativas erradas em batalha' },
  { itemId: 'escudo_recurso', cost: 25, note: 'Anula o dano de HP se errar a próxima questão' },
  { itemId: 'lupa_fonte', cost: 35, note: 'Revela o trecho literal da ficha antes de responder' },
  { itemId: 'pocao_vida', cost: 20, note: 'Recupera +40 de HP a qualquer momento' },
  { itemId: 'elixir_foco', cost: 20, note: 'Recupera +35 de Foco para usar Foco Analítico' },
];

export const BUILDING_INTERIORS: Record<string, BuildingInteriorSpec> = {
  // === REINO DA TOGA ===
  'palacio-do-trt4': {
    id: 'palacio-do-trt4',
    label: 'Palácio do TRT4',
    regiaoId: 'reino-da-toga',
    zonaId: '01-nocoes-de-legislacao',
    fnType: 'challenge',
    interiorTheme: 'court',
    hostName: 'Magistrada Beatriz',
    hostRole: 'juiz',
    hostTitle: 'Presidente da Sessão Plenária',
    greeting:
      'Bem-vindo ao Salão Nobre do Palácio do TRT4! Aqui realizamos sessões simuladas com 3 questões diretas de Noções de Legislação para testar seu domínio antes do Chefe.',
    studyTip: 'Foque nos prazos do Código de Conduta, órgãos julgadores do Regimento Interno e dimensões da Res. CNJ 400/2021.',
    challengeRewardItem: 'lupa_fonte',
  },
  'cartorio-conduta': {
    id: 'cartorio-conduta',
    label: 'Cartório & Conduta',
    regiaoId: 'reino-da-toga',
    zonaId: '01-nocoes-de-legislacao',
    fnType: 'guide',
    interiorTheme: 'court',
    hostName: 'Escrivão Antônio',
    hostRole: 'juiz',
    hostTitle: 'Chefe do Cartório de Ética',
    greeting:
      'Este é o Cartório de Ética e Conduta do TRT4. Organizei todas as fichas de Legislação aqui para você consultar em formato apostila ou rastrear o próximo instrutor no mapa.',
    studyTip: 'Sempre confira o que a banca FCC cobra sobre presentes/brindes (1% do teto e entrega em 10 dias) e vedações do art. 6º.',
  },
  'biblioteca-juridica': {
    id: 'biblioteca-juridica',
    label: 'Biblioteca Jurídica',
    regiaoId: 'reino-da-toga',
    zonaId: '01-nocoes-de-legislacao',
    fnType: 'guide',
    interiorTheme: 'library',
    hostName: 'Conselheira Clara',
    hostRole: 'bibliotecaria',
    hostTitle: 'Curadora do Acervo Normativo',
    greeting:
      'Silêncio e foco! Na Biblioteca Jurídica você pode revisar rapidamente qualquer apostila de Legislação e verificar quais pontos ainda precisam de revisão espaçada.',
    studyTip: 'Compare lado a lado a Res. CNJ 351/2020 e a Res. CSJT 360/2023 — ambas tratam de prevenção e enfrentamento ao assédio.',
  },
  'casa-da-ouvidoria': {
    id: 'casa-da-ouvidoria',
    label: 'Casa da Ouvidoria',
    regiaoId: 'reino-da-toga',
    zonaId: '01-nocoes-de-legislacao',
    fnType: 'rest',
    interiorTheme: 'tavern',
    hostName: 'Ouvidora Helena',
    hostRole: 'sabio',
    hostTitle: 'Acolhimento & Escuta Ativa',
    greeting:
      'Sente-se um instante e recupere o fôlego! A Casa da Ouvidoria acolhe estudantes cansados após batalhas intensas, restaurando 100% do seu HP e Foco.',
    studyTip: 'Lembre-se: a Ouvidoria no TRT4 é eleita em outubro dos anos pares, com mandato de 2 anos e uma recondução.',
  },
  'estacao-pls-sustentavel': {
    id: 'estacao-pls-sustentavel',
    label: 'Estação PLS Sustentável',
    regiaoId: 'reino-da-toga',
    zonaId: '01-nocoes-de-legislacao',
    fnType: 'shop',
    interiorTheme: 'forge',
    hostName: 'Procuradora Sofia',
    hostRole: 'bibliotecaria',
    hostTitle: 'Gestora de Logística Sustentável',
    greeting:
      'Bem-vindo à Estação PLS! Troque seus Pontos de Estudo (ganhos ao estudar fichas e acertar questões) por suprimentos estratégicos para encarar chefes e mini-bosses.',
    studyTip: 'A Lupa da Fonte é excelente para questões longas de legislação porque revela o trecho literal do seu resumo antes de responder.',
    shopOffers: STANDARD_SHOP_OFFERS,
  },
  'casa-dos-tratados': {
    id: 'casa-dos-tratados',
    label: 'Casa dos Tratados',
    regiaoId: 'reino-da-toga',
    zonaId: '02-nocoes-de-direitos-humanos',
    fnType: 'secret',
    interiorTheme: 'library',
    hostName: 'Curadora Elisa',
    hostRole: 'bibliotecaria',
    hostTitle: 'Guardiã das Convenções Internacionais',
    greeting:
      'Você descobriu o arquivo secreto da Casa dos Tratados! Cumpra a meta de estudos em Direitos Humanos para desbloquear o Baú de Relíquias Internacionais.',
    studyTip: 'Atenção à hierarquia constitucional dos tratados de DH aprovados pelo rito do art. 5º, § 3º da CF/88 (equivalência de Emenda Constitucional) versus supralegalidade.',
    secretQuest: {
      title: 'Selo dos Tratados Fundamentais',
      description: 'Estude pelo menos 3 fichas de Noções de Direitos Humanos.',
      targetCount: 3,
      metric: 'studied_zona',
      rewardXp: 120,
      rewardItems: [
        { itemId: 'lupa_fonte', qty: 1 },
        { itemId: 'pocao_dica', qty: 2 },
      ],
    },
  },
  'memorial-da-onu': {
    id: 'memorial-da-onu',
    label: 'Memorial da ONU',
    regiaoId: 'reino-da-toga',
    zonaId: '02-nocoes-de-direitos-humanos',
    fnType: 'challenge',
    interiorTheme: 'court',
    hostName: 'Sábia Virgínia',
    hostRole: 'juiz',
    hostTitle: 'Embaixadora dos Direitos Humanos',
    greeting:
      'No Memorial da ONU, colocamos à prova seu conhecimento sobre DUDH, Pactos de 1966, Pacto de San José e convenções da OIT em um desafio rápido de 3 questões!',
    studyTip: 'Revise as datas de adoção e a diferença entre os sistemas global (ONU) e interamericano (OEA).',
    challengeRewardItem: 'escudo_recurso',
  },
  'abrigo-cidadao': {
    id: 'abrigo-cidadao',
    label: 'Abrigo Cidadão',
    regiaoId: 'reino-da-toga',
    zonaId: '02-nocoes-de-direitos-humanos',
    fnType: 'rest',
    interiorTheme: 'tavern',
    hostName: 'Mediadora Laura',
    hostRole: 'sabio',
    hostTitle: 'Anfitriã do Abrigo',
    greeting:
      'Descanse tranquilamente no Abrigo Cidadão! Vamos restaurar toda a sua energia e Foco antes de você seguir para a Cidadela do Conselho ou enfrentar o Arqui-Magistrado.',
    studyTip: 'Usar Foco Analítico (20 de Foco) em batalha elimina 1 alternativa errada sem gastar nenhuma poção!',
  },

  // === CIDADELA DO CONSELHO ===
  'salao-do-conselho-cnj': {
    id: 'salao-do-conselho-cnj',
    label: 'Salão do Conselho CNJ',
    regiaoId: 'cidadela-do-conselho',
    zonaId: '03-normativos-pdpj-e-governanca-trt4',
    fnType: 'challenge',
    interiorTheme: 'court',
    hostName: 'Chanceler Renato',
    hostRole: 'juiz',
    hostTitle: 'Relator dos Normativos PDPJ-Br',
    greeting:
      'Bem-vindo ao Salão do Conselho! Enfrente um desafio relâmpago de 3 questões sobre a Resolução CNJ 335/2020, Portarias da PDPJ-Br e governança digital do TRT4.',
    studyTip: 'A Portaria CNJ 284/2021 tornou facultativo o comitê gestor local nos TRTs e TREs por seguirem CSJT e TSE.',
    challengeRewardItem: 'lupa_fonte',
  },
  'guilda-pmbok': {
    id: 'guilda-pmbok',
    label: 'Guilda PMBOK',
    regiaoId: 'cidadela-do-conselho',
    zonaId: '12-governanca-e-gestao-de-ti',
    fnType: 'guide',
    interiorTheme: 'library',
    hostName: 'Diretora Camila',
    hostRole: 'juiz',
    hostTitle: 'Mestre de Projetos & Portfólio',
    greeting:
      'Na Guilda PMBOK mapeamos todas as fichas de Governança e Gestão de TI. Consulte a apostila direto daqui ou marque o próximo instrutor no seu radar!',
    studyTip: 'Compare os princípios e domínios de desempenho do PMBOK com as práticas ágeis cobradas em Engenharia de Software.',
  },
  'torre-cobit': {
    id: 'torre-cobit',
    label: 'Torre COBIT',
    regiaoId: 'cidadela-do-conselho',
    zonaId: '12-governanca-e-gestao-de-ti',
    fnType: 'secret',
    interiorTheme: 'vault',
    hostName: 'Auditora Renata',
    hostRole: 'juiz',
    hostTitle: 'Auditora-Chefe de Governança TI',
    greeting:
      'Poucos sobem até a Torre COBIT! Complete a meta de Governança & Gestão de TI para abrir o cofre de auditoria com itens raros.',
    studyTip: 'Distinção clássica da banca FCC: Governança (EDM — Avaliar, Dirigir e Monitorar) vs Gestão (APO, BAI, DSS, MEA).',
    secretQuest: {
      title: 'Auditoria de Conformidade da Cidadela',
      description: 'Estude pelo menos 4 fichas da Cidadela do Conselho.',
      targetCount: 4,
      metric: 'studied_region',
      rewardXp: 130,
      rewardItems: [
        { itemId: 'escudo_recurso', qty: 2 },
        { itemId: 'elixir_foco', qty: 2 },
      ],
    },
  },
  'central-itil-v4': {
    id: 'central-itil-v4',
    label: 'Central ITIL v4',
    regiaoId: 'cidadela-do-conselho',
    zonaId: '12-governanca-e-gestao-de-ti',
    fnType: 'shop',
    interiorTheme: 'forge',
    hostName: 'Gestor Henrique',
    hostRole: 'juiz',
    hostTitle: 'Service Desk & Catálogo de Itens',
    greeting:
      'Chamado atendido dentro do SLA! Aqui na Central ITIL v4 você pode requisitar poções, escudos e lupas usando seus Pontos de Estudo.',
    studyTip: 'Lembre-se das 4 dimensões do gerenciamento de serviços e da cadeia de valor de serviço (SVS) na ITIL 4.',
    shopOffers: STANDARD_SHOP_OFFERS,
  },
  'escritorio-pdtic-trt4': {
    id: 'escritorio-pdtic-trt4',
    label: 'Escritório PDTIC TRT4',
    regiaoId: 'cidadela-do-conselho',
    zonaId: '03-normativos-pdpj-e-governanca-trt4',
    fnType: 'guide',
    interiorTheme: 'court',
    hostName: 'Coordenadora Patrícia',
    hostRole: 'bibliotecaria',
    hostTitle: 'Planejamento Estratégico de TIC',
    greeting:
      'Bem-vindo ao Escritório do PDTIC do TRT4! Aqui reunimos o painel completo de normativos da PDPJ-Br, ENTIC-JUD e governança do Tribunal para leitura direta em apostila.',
    studyTip: 'Relacione o PDTIC do TRT4 com a Política de Sustentabilidade (Res. 400) e com a ENTIC-JUD (Res. CNJ 370/2021).',
  },

  // === FLORESTA DO CÓDIGO ===
  'oficina-eng-software': {
    id: 'oficina-eng-software',
    label: 'Oficina Eng. Software',
    regiaoId: 'floresta-do-codigo',
    zonaId: '04-engenharia-de-software',
    fnType: 'guide',
    interiorTheme: 'forge',
    hostName: 'Arquiteta Barbara',
    hostRole: 'engenheiro',
    hostTitle: 'Arquiteta de Qualidade & Requisitos',
    greeting:
      'Na Oficina de Engenharia de Software você acompanha seu avanço em Scrum, XP, UML, testes e padrões de projeto, com acesso direto às apostilas.',
    studyTip: 'Sempre associe cada artefato ágil (Product Backlog, Sprint Backlog, Incremento) ao papel responsável no Scrum.',
  },
  'estudio-stack-pdpj': {
    id: 'estudio-stack-pdpj',
    label: 'Estúdio Stack PDPJ',
    regiaoId: 'floresta-do-codigo',
    zonaId: '05-arquitetura-pdpj-stack',
    fnType: 'guide',
    interiorTheme: 'datacenter',
    hostName: 'Engenheira Margaret',
    hostRole: 'engenheiro',
    hostTitle: 'Líder de Microsserviços PDPJ-Br',
    greeting:
      'Bem-vindo ao Estúdio da Stack PDPJ! Aqui está o mapa completo de Docker, Kubernetes, Rancher, RabbitMQ, Keycloak e Spring Cloud usados na plataforma do CNJ.',
    studyTip: 'Veja como cada peça se conecta: Keycloak (SSO/OAuth2), RabbitMQ (mensageria assíncrona), Docker + Kubernetes/Rancher (contêineres).',
  },
  'forja-devops-ci-cd': {
    id: 'forja-devops-ci-cd',
    label: 'Forja DevOps CI/CD',
    regiaoId: 'floresta-do-codigo',
    zonaId: '07-devops',
    fnType: 'shop',
    interiorTheme: 'forge',
    hostName: 'Ferreira Turing',
    hostRole: 'ferreiro',
    hostTitle: 'Forjadora de Pipelines & Suprimentos',
    greeting:
      'Pipeline verde e forja acesa! Troque seus Pontos de Estudo aqui por ferramentas táticas antes de enfrentar os Mini-Bosses da Floresta do Código.',
    studyTip: 'Em `.gitlab-ci.yml`, jobs do mesmo stage rodam em paralelo; o próximo stage só inicia se o anterior passar.',
    shopOffers: STANDARD_SHOP_OFFERS,
  },
  'taverna-java-web': {
    id: 'taverna-java-web',
    label: 'Taverna Java & Web',
    regiaoId: 'floresta-do-codigo',
    zonaId: '08-programacao-e-desenvolvimento-web',
    fnType: 'rest',
    interiorTheme: 'tavern',
    hostName: 'Artífice Gosling',
    hostRole: 'engenheiro',
    hostTitle: 'Mestre do Café & JVM',
    greeting:
      'Um café fresco na Taverna Java & Web! Descanse para recuperar 100% do HP e do Foco antes de encarar questões de POO, Spring, Angular, REST e testes JUnit.',
    studyTip: 'Diferencie bem sobrecarga (overloading, mesmo nome com assinaturas diferentes) de sobrescrita (overriding, herança/polimorfismo).',
  },
  'catedral-sql-dados': {
    id: 'catedral-sql-dados',
    label: 'Catedral SQL & Dados',
    regiaoId: 'floresta-do-codigo',
    zonaId: '09-banco-de-dados',
    fnType: 'challenge',
    interiorTheme: 'vault',
    hostName: 'Mestra Codd',
    hostRole: 'sabio',
    hostTitle: 'Guardiã das Formas Normais',
    greeting:
      'Bem-vindo à Catedral SQL & Dados! Teste sua precisão em modelagem relacional, normalização, ACID, índices e SQL em um desafio relâmpago de 3 questões.',
    studyTip: 'Revise ACID (Atomicidade, Consistência, Isolamento, Durabilidade) e a diferença entre 1FN, 2FN e 3FN.',
    challengeRewardItem: 'pocao_dica',
  },

  // === FORTALEZA DA MURALHA ===
  'cofre-da-lgpd': {
    id: 'cofre-da-lgpd',
    label: 'Cofre da LGPD',
    regiaoId: 'fortaleza-da-muralha',
    zonaId: '06-seguranca-da-informacao',
    fnType: 'challenge',
    interiorTheme: 'vault',
    hostName: 'Capitã Shamir',
    hostRole: 'capitao',
    hostTitle: 'Encarregada (DPO) da Fortaleza',
    greeting:
      'O Cofre da LGPD guarda os segredos mais cobrados pela FCC! Vença o desafio relâmpago de 3 questões de Segurança da Informação e LGPD para ganhar recompensa garantida.',
    studyTip: 'Domine os agentes de tratamento (Controlador, Operador, Encarregado/DPO) e as bases legais da Lei nº 13.709/2018.',
    challengeRewardItem: 'escudo_recurso',
  },
  'torre-criptografia': {
    id: 'torre-criptografia',
    label: 'Torre Criptografia',
    regiaoId: 'fortaleza-da-muralha',
    zonaId: '06-seguranca-da-informacao',
    fnType: 'secret',
    interiorTheme: 'vault',
    hostName: 'Criptógrafa Diffie',
    hostRole: 'sabio',
    hostTitle: 'Guardiã das Chaves Assimétricas',
    greeting:
      'Você decifrou o acesso à Torre Criptografia! Estude fichas de Segurança da Informação para destrancar o baú cifrado com itens raros.',
    studyTip: 'Assinatura digital garante autenticidade, integridade e não repúdio (usa chave privada do remetente para assinar e pública para verificar).',
    secretQuest: {
      title: 'Chave Mestra da Muralha',
      description: 'Estude pelo menos 4 fichas de Segurança da Informação & LGPD.',
      targetCount: 4,
      metric: 'studied_zona',
      rewardXp: 140,
      rewardItems: [
        { itemId: 'lupa_fonte', qty: 2 },
        { itemId: 'escudo_recurso', qty: 1 },
      ],
    },
  },
  'soc-firewall': {
    id: 'soc-firewall',
    label: 'SOC & Firewall',
    regiaoId: 'fortaleza-da-muralha',
    zonaId: '06-seguranca-da-informacao',
    fnType: 'rest',
    interiorTheme: 'datacenter',
    hostName: 'Defensora Whitfield',
    hostRole: 'sabio',
    hostTitle: 'Analista de Resposta a Incidentes',
    greeting:
      'Perímetro protegido! Recarregue 100% do seu HP e Foco no Centro de Operações (SOC) antes de desafiar o Espectro do Zero-Day.',
    studyTip: 'Fique atento às diferenças entre IDS (detecta), IPS (bloqueia), WAF (camada de aplicação HTTP) e ZTNA (Zero Trust).',
  },

  // === MONTANHAS DA INFRA ===
  'bastion-linux-so': {
    id: 'bastion-linux-so',
    label: 'Bastion Linux & SO',
    regiaoId: 'montanhas-da-infra',
    zonaId: '10-sistemas-operacionais',
    fnType: 'secret',
    interiorTheme: 'datacenter',
    hostName: 'Sábia Stallings',
    hostRole: 'sabio',
    hostTitle: 'Arquiteta do Kernel',
    greeting:
      'Bem-vindo ao Bastion Linux & SO! Conclua a missão secreta de Sistemas Operacionais para conquistar o kit de sobrevivência das Montanhas da Infra.',
    studyTip: 'Revise as 4 condições necessárias para Deadlock (Coffman): exclusão mútua, posse e espera, não preempção e espera circular.',
    secretQuest: {
      title: 'Permissão Root nos Picos',
      description: 'Estude pelo menos 3 fichas de Sistemas Operacionais.',
      targetCount: 3,
      metric: 'studied_zona',
      rewardXp: 135,
      rewardItems: [
        { itemId: 'pocao_vida', qty: 2 },
        { itemId: 'elixir_foco', qty: 2 },
      ],
    },
  },
  'antena-de-redes-tcp-ip': {
    id: 'antena-de-redes-tcp-ip',
    label: 'Antena de Redes TCP/IP',
    regiaoId: 'montanhas-da-infra',
    zonaId: '11-redes-e-servicos',
    fnType: 'secret',
    interiorTheme: 'datacenter',
    hostName: 'Vigia Radia',
    hostRole: 'sabio',
    hostTitle: 'Engenheira de Roteamento & STP',
    greeting:
      'Sinal 100% na Antena TCP/IP! Complete a missão de Redes e Serviços para receber suprimentos raros para o topo da montanha.',
    studyTip: 'Memorize camadas OSI vs TCP/IP, portas clássicas (HTTPS 443, SSH 22, DNS 53) e diferença entre TCP (orientado à conexão) e UDP.',
    secretQuest: {
      title: 'Handshake de Três Vias',
      description: 'Estude pelo menos 3 fichas de Redes e Serviços.',
      targetCount: 3,
      metric: 'studied_zona',
      rewardXp: 135,
      rewardItems: [
        { itemId: 'pocao_dica', qty: 2 },
        { itemId: 'lupa_fonte', qty: 1 },
      ],
    },
  },
  'templo-ia-nuvem': {
    id: 'templo-ia-nuvem',
    label: 'Templo IA & Nuvem',
    regiaoId: 'montanhas-da-infra',
    zonaId: '13-ia-e-nuvem',
    fnType: 'challenge',
    interiorTheme: 'datacenter',
    hostName: 'Arquiteta Vaswani',
    hostRole: 'engenheiro',
    hostTitle: 'Sacerdotisa dos Transformers & Cloud',
    greeting:
      'Você chegou ao Templo de IA e Nuvem! Enfrente 3 questões rápidas sobre NIST SP 800-145 (IaaS/PaaS/SaaS), Serverless, LLMs, RAG e Resolução CNJ 615/2025.',
    studyTip: 'Lembre dos 3 modelos de serviço NIST (IaaS, PaaS, SaaS) e que RAG busca documentos confiáveis para reduzir alucinações em LLMs.',
    challengeRewardItem: 'lupa_fonte',
  },

  // === PORTO BABEL ===
  'lighthouse-docs': {
    id: 'lighthouse-docs',
    label: 'Lighthouse & Docs',
    regiaoId: 'porto-babel',
    zonaId: '14-ingles-tecnico',
    fnType: 'guide',
    interiorTheme: 'harbor',
    hostName: 'Tradutora Beatriz',
    hostRole: 'sabio',
    hostTitle: 'Faroleira da Documentação Técnica',
    greeting:
      'Welcome to Lighthouse & Docs! Aqui você consulta todas as fichas de Inglês Técnico em formato apostila, revisa falsos cognatos e rastreia os instrutores do cais.',
    studyTip: 'Em provas da FCC de Inglês Técnico, leia primeiro o comando da questão e identifique termos-âncora e conectivos lógicos (however, whereas, although).',
  },
  'babel-harbor-inn': {
    id: 'babel-harbor-inn',
    label: 'Babel Harbor Inn',
    regiaoId: 'porto-babel',
    zonaId: '14-ingles-tecnico',
    fnType: 'rest',
    interiorTheme: 'harbor',
    hostName: 'Capitã Evelyn',
    hostRole: 'capitao',
    hostTitle: 'Estalajadeira do Porto Babel',
    greeting:
      'Ahoy! Bem-vindo à pousada Babel Harbor Inn. Relaxe ouvindo o mar e recupere 100% do seu HP e Foco gratuitamente!',
    studyTip: 'Cuidado com false cognates clássicos em TI: "actually" = na verdade, "eventually" = finalmente, "resume" = retomar/currículo.',
  },
  'customs-vocabulary': {
    id: 'customs-vocabulary',
    label: 'Customs & Vocabulary',
    regiaoId: 'porto-babel',
    zonaId: '14-ingles-tecnico',
    fnType: 'shop',
    interiorTheme: 'harbor',
    hostName: 'Timoneiro Arthur',
    hostRole: 'capitao',
    hostTitle: 'Mercador da Alfândega de Porto Babel',
    greeting:
      'Bem-vindo à Alfândega de Porto Babel! Troque seus Pontos de Estudo por Poções de Dica, Escudos e Lupas antes de zarpar contra o Capitão False Cognate.',
    studyTip: 'Leve pelo menos uma Lupa da Fonte e um Escudo do Recurso antes de desafiar chefes de região!',
    shopOffers: STANDARD_SHOP_OFFERS,
  },
  'rfc-shipyard': {
    id: 'rfc-shipyard',
    label: 'RFC Shipyard',
    regiaoId: 'porto-babel',
    zonaId: '14-ingles-tecnico',
    fnType: 'challenge',
    interiorTheme: 'harbor',
    hostName: 'Tradutora Beatriz',
    hostRole: 'sabio',
    hostTitle: 'Engenheira de Especificações RFC',
    greeting:
      'No Estaleiro RFC Shipyard testamos sua leitura técnica em inglês com um desafio relâmpago de 3 questões reais baseadas no seu material!',
    studyTip: 'Observe verbos normativos de RFCs: MUST (obrigatório), SHOULD (recomendado), MAY (opcional).',
    challengeRewardItem: 'pocao_dica',
  },
};

export function getBuildingInteriorSpec(label?: string): BuildingInteriorSpec | null {
  if (!label) return null;
  const slug = slugifyBuildingLabel(label);
  return BUILDING_INTERIORS[slug] || null;
}

export function evaluateBuildingSecret(
  spec: BuildingInteriorSpec,
  save: SaveState
): { current: number; target: number; ready: boolean; claimed: boolean } {
  const quest = spec.secretQuest;
  if (!quest) return { current: 0, target: 1, ready: false, claimed: false };

  const claimed = Boolean(save.claimedBuildingSecrets?.includes(spec.id));
  const allowedFichas = getFichasForClass(save.playerClass);
  const studiedSet = new Set(save.studiedFichas);

  let current = 0;
  let target = quest.targetCount;

  if (quest.metric === 'studied_zona') {
    const zonaFichas = allowedFichas.filter((f) => f.zonaId === spec.zonaId);
    target = Math.min(quest.targetCount, Math.max(1, zonaFichas.length));
    current = zonaFichas.filter((f) => studiedSet.has(f.id)).length;
  } else if (quest.metric === 'studied_region') {
    const regFichas = allowedFichas.filter((f) => f.regiaoId === spec.regiaoId);
    target = Math.min(quest.targetCount, Math.max(1, regFichas.length));
    current = regFichas.filter((f) => studiedSet.has(f.id)).length;
  } else if (quest.metric === 'duels_total') {
    current = save.duelWins?.length || 0;
  } else if (quest.metric === 'spaced_clear') {
    current = Object.keys(save.spacedRep).length === 0 ? 1 : 0;
  }

  return {
    current: Math.min(current, target),
    target,
    ready: current >= target && !claimed,
    claimed,
  };
}

/**
 * Builds a focused 3-question lightning challenge deck for a building's discipline.
 */
export function buildBuildingChallengeDeck(
  spec: BuildingInteriorSpec,
  save: SaveState
): Question[] {
  const pool = getQuestionsForClass(save.playerClass, save.customExamQuestions);
  const zonaPool = pool.filter((q) => q.zonaId === spec.zonaId);
  const regPool = pool.filter((q) => q.regiaoId === spec.regiaoId);
  const source = zonaPool.length >= 3 ? zonaPool : regPool.length >= 3 ? regPool : pool;

  const shuffled = [...source].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(3, shuffled.length));
}

export function getBuildingFichasForGuide(spec: BuildingInteriorSpec, save: SaveState): Ficha[] {
  const allowed = getFichasForClass(save.playerClass);
  const zonaList = allowed.filter((f) => f.zonaId === spec.zonaId);
  if (zonaList.length > 0) return zonaList;
  const regList = allowed.filter((f) => f.regiaoId === spec.regiaoId);
  return regList.length > 0 ? regList : getAllFichas().slice(0, 6);
}
