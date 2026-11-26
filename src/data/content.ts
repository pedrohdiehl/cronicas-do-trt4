// AUTO-GENERATED from /public/assets/aistudio/*.md — DO NOT INVENT CONTENT
// Source of truth: 14 Markdown files provided by the user.
import type { Ficha, PonteQuest, RegionInfo, ZonaInfo } from '../types';

export const REGIONS: RegionInfo[] = [
  {
    "id": "reino-da-toga",
    "nome": "Reino da Toga",
    "subtitulo": "Legislação e Direitos Humanos",
    "bioma": "Cidade medieval, tribunal de pedra e praça central",
    "nivelSugerido": 1,
    "accentColor": "#d9a441",
    "groundPrimary": "#7d8a68",
    "groundSecondary": "#8b9974",
    "bossName": "Arqui-Magistrado do Pleno",
    "bossTitle": "Guardião da Toga e dos Tratados",
    "bossSprite": "knight",
    "bounds": {
      "x": 4,
      "y": 4,
      "w": 50,
      "h": 74
    },
    "keyName": "Chave da Toga Dourada",
    "cosmeticReward": {
      "id": "manto-toga",
      "name": "Manto da Toga Real",
      "description": "Capa dourada dos guardiões do Tribunal de Pedra.",
      "color": "#e6b84c"
    }
  },
  {
    "id": "cidadela-do-conselho",
    "nome": "Cidadela do Conselho",
    "subtitulo": "Normativos PDPJ-Br, Governança TRT4 e Gestão de TI",
    "bioma": "Castelo administrativo, salões de mármore e estandartes",
    "nivelSugerido": 3,
    "accentColor": "#4c93d9",
    "groundPrimary": "#6d778a",
    "groundSecondary": "#7a8599",
    "bossName": "Chanceler do Comitê Supremo",
    "bossTitle": "Senhor dos Normativos e da Governança",
    "bossSprite": "golem",
    "bounds": {
      "x": 56,
      "y": 4,
      "w": 50,
      "h": 74
    },
    "keyName": "Chave do Selo do Conselho",
    "cosmeticReward": {
      "id": "capa-conselho",
      "name": "Manto Azul do Conselho",
      "description": "Manto cerimonial com brasão do Comitê de TIC.",
      "color": "#4c93d9"
    }
  },
  {
    "id": "porto-babel",
    "nome": "Porto Babel",
    "subtitulo": "Inglês Técnico de TI",
    "bioma": "Porto marítimo, cais de madeira, navios e placas em inglês",
    "nivelSugerido": 4,
    "accentColor": "#2fb5a8",
    "groundPrimary": "#c7b07b",
    "groundSecondary": "#d4be8a",
    "bossName": "Capitão False Cognate",
    "bossTitle": "Lorde dos Mares Técnicos",
    "bossSprite": "kraken",
    "bounds": {
      "x": 108,
      "y": 4,
      "w": 48,
      "h": 74
    },
    "keyName": "Chave do Farol de Babel",
    "cosmeticReward": {
      "id": "capa-navegador",
      "name": "Manto do Navegador Poliglota",
      "description": "Capa turquesa forjada no cais de Porto Babel.",
      "color": "#2fb5a8"
    }
  },
  {
    "id": "floresta-do-codigo",
    "nome": "Floresta do Código",
    "subtitulo": "Eng. de Software, Stack PDPJ, DevOps, Programação e BD",
    "bioma": "Árvores com runas brilhantes e rios de dados cristalinos",
    "nivelSugerido": 5,
    "accentColor": "#44b86b",
    "groundPrimary": "#3c6e47",
    "groundSecondary": "#457c52",
    "bossName": "Hidra do Monólito Legado",
    "bossTitle": "Soberana dos Bugs e Deadlocks",
    "bossSprite": "hydra",
    "bounds": {
      "x": 4,
      "y": 82,
      "w": 76,
      "h": 74
    },
    "keyName": "Chave Rúnica do Código",
    "cosmeticReward": {
      "id": "capa-runica",
      "name": "Manto Esmeralda das Runas",
      "description": "Capa tecida com fibra de código limpo.",
      "color": "#44b86b"
    }
  },
  {
    "id": "fortaleza-da-muralha",
    "nome": "Fortaleza da Muralha",
    "subtitulo": "Segurança da Informação, LGPD e Criptografia",
    "bioma": "Muralhas negras, torres de vigia e portões com cadeados",
    "nivelSugerido": 7,
    "accentColor": "#d9534f",
    "groundPrimary": "#4d4759",
    "groundSecondary": "#595266",
    "bossName": "Espectro do Zero-Day",
    "bossTitle": "Fantasma do Ransomware e da Invasão",
    "bossSprite": "ghost",
    "bounds": {
      "x": 82,
      "y": 82,
      "w": 32,
      "h": 74
    },
    "keyName": "Chave Criptográfica Mestra",
    "cosmeticReward": {
      "id": "capa-muralha",
      "name": "Manto Escarlate da Muralha",
      "description": "Capa reforçada com selo Zero Trust e TLS 1.3.",
      "color": "#d9534f"
    }
  },
  {
    "id": "montanhas-da-infra",
    "nome": "Montanhas da Infra",
    "subtitulo": "Sistemas Operacionais, Redes, IA e Nuvem",
    "bioma": "Picos gelados, torres de cabos e nuvens flutuantes",
    "nivelSugerido": 9,
    "accentColor": "#9b6ee6",
    "groundPrimary": "#6a6f82",
    "groundSecondary": "#7a8096",
    "bossName": "Dragão do Deadlock em Nuvem",
    "bossTitle": "Titã dos Picos e Pacotes",
    "bossSprite": "dragon",
    "bounds": {
      "x": 116,
      "y": 82,
      "w": 40,
      "h": 74
    },
    "keyName": "Chave dos Picos da Nuvem",
    "cosmeticReward": {
      "id": "capa-nuvem",
      "name": "Manto Violeta das Nuvens",
      "description": "Capa etérea dos arquitetos de infraestrutura e IA.",
      "color": "#9b6ee6"
    }
  }
];

export const ZONAS: ZonaInfo[] = [
  {
    "id": "01-nocoes-de-legislacao",
    "arquivo": "01-nocoes-de-legislacao_01949531.md",
    "nome": "Noções de Legislação",
    "materia": "Noções de Legislação",
    "regiaoId": "reino-da-toga",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Gerais (peso 1)",
    "nivelSugerido": 1,
    "miniBossName": "Golem do Regimento",
    "miniBossTitle": "Guardião da Legislação TRT4",
    "miniBossSprite": "golem",
    "bounds": {
      "x": 6,
      "y": 6,
      "w": 46,
      "h": 28
    },
    "signTile": {
      "x": 29,
      "y": 7
    }
  },
  {
    "id": "02-nocoes-de-direitos-humanos",
    "arquivo": "02-nocoes-de-direitos-humanos_cbf88235.md",
    "nome": "Noções de Direitos Humanos",
    "materia": "Noções de Direitos Humanos",
    "regiaoId": "reino-da-toga",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Gerais (peso 1)",
    "nivelSugerido": 2,
    "miniBossName": "Cavaleiro dos Tratados",
    "miniBossTitle": "Sentinela das Convenções",
    "miniBossSprite": "knight",
    "bounds": {
      "x": 6,
      "y": 36,
      "w": 46,
      "h": 40
    },
    "signTile": {
      "x": 29,
      "y": 37
    }
  },
  {
    "id": "03-normativos-pdpj-e-governanca-trt4",
    "arquivo": "03-normativos-pdpj-e-governanca-trt4_3f2dc98c.md",
    "nome": "Normativos PDPJ-Br e Governança TRT4",
    "materia": "Normativos da PDPJ-Br + Governança de TIC do TRT4",
    "regiaoId": "cidadela-do-conselho",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 3,
    "miniBossName": "Guardião das Portarias",
    "miniBossTitle": "Auditor da PDPJ-Br",
    "miniBossSprite": "knight",
    "bounds": {
      "x": 58,
      "y": 6,
      "w": 46,
      "h": 42
    },
    "signTile": {
      "x": 81,
      "y": 7
    }
  },
  {
    "id": "12-governanca-e-gestao-de-ti",
    "arquivo": "12-governanca-e-gestao-de-ti_a53db976.md",
    "nome": "Gestão e Governança de TI",
    "materia": "Gestão e Governança de TI (PMBOK 8ª edição, ITIL Version 5, COBIT 2019)",
    "regiaoId": "cidadela-do-conselho",
    "caiEm": [
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 4,
    "miniBossName": "Arconte do COBIT",
    "miniBossTitle": "Mestre de PMBOK, ITIL e COBIT",
    "miniBossSprite": "golem",
    "bounds": {
      "x": 58,
      "y": 50,
      "w": 46,
      "h": 26
    },
    "signTile": {
      "x": 81,
      "y": 51
    }
  },
  {
    "id": "14-ingles-tecnico",
    "arquivo": "14-ingles-tecnico_a781eac5.md",
    "nome": "Inglês Técnico",
    "materia": "Inglês técnico",
    "regiaoId": "porto-babel",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 4,
    "miniBossName": "Corsário do Vocabulário",
    "miniBossTitle": "Pirata dos Falsos Cognatos",
    "miniBossSprite": "kraken",
    "bounds": {
      "x": 110,
      "y": 10,
      "w": 44,
      "h": 64
    },
    "signTile": {
      "x": 132,
      "y": 11
    }
  },
  {
    "id": "04-engenharia-de-software",
    "arquivo": "04-engenharia-de-software_6fb16db6.md",
    "nome": "Engenharia de Software",
    "materia": "Engenharia de Software (processos, qualidade, modelagem, ágeis, requisitos, testes)",
    "regiaoId": "floresta-do-codigo",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 5,
    "miniBossName": "Bug-Goblin do Sprint",
    "miniBossTitle": "Sabotador de Requisitos e UML",
    "miniBossSprite": "goblin",
    "bounds": {
      "x": 6,
      "y": 84,
      "w": 36,
      "h": 24
    },
    "signTile": {
      "x": 24,
      "y": 85
    }
  },
  {
    "id": "05-arquitetura-pdpj-stack",
    "arquivo": "05-arquitetura-pdpj-stack_1a54bfe1.md",
    "nome": "Arquitetura PDPJ-Br (Stack)",
    "materia": "Arquitetura de desenvolvimento da PDPJ-Br (stack técnica)",
    "regiaoId": "floresta-do-codigo",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 6,
    "miniBossName": "Slime do Microsserviço",
    "miniBossTitle": "Devourer de REST e Filas",
    "miniBossSprite": "slime",
    "bounds": {
      "x": 44,
      "y": 84,
      "w": 34,
      "h": 24
    },
    "signTile": {
      "x": 61,
      "y": 85
    }
  },
  {
    "id": "07-devops",
    "arquivo": "07-devops_2950cc12.md",
    "nome": "DevOps e DevSecOps",
    "materia": "DevOps e DevSecOps",
    "regiaoId": "floresta-do-codigo",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 6,
    "miniBossName": "Goblin do Merge Quebrado",
    "miniBossTitle": "Terror das Pipelines CI/CD",
    "miniBossSprite": "goblin",
    "bounds": {
      "x": 6,
      "y": 110,
      "w": 36,
      "h": 22
    },
    "signTile": {
      "x": 24,
      "y": 111
    }
  },
  {
    "id": "08-programacao-e-desenvolvimento-web",
    "arquivo": "08-programacao-e-desenvolvimento-web_4e6d3be6.md",
    "nome": "Programação e Web",
    "materia": "Programação, linguagens, desenvolvimento web e arquiteturas",
    "regiaoId": "floresta-do-codigo",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 6,
    "miniBossName": "Espectro da Exceção Não Tratada",
    "miniBossTitle": "Assombração do NullPointer",
    "miniBossSprite": "ghost",
    "bounds": {
      "x": 44,
      "y": 110,
      "w": 34,
      "h": 22
    },
    "signTile": {
      "x": 61,
      "y": 111
    }
  },
  {
    "id": "09-banco-de-dados",
    "arquivo": "09-banco-de-dados_dedeab4a.md",
    "nome": "Banco de Dados",
    "materia": "Banco de Dados",
    "regiaoId": "floresta-do-codigo",
    "caiEm": [
      "Analista TI (bloco próprio)",
      "Técnico TI (via PDPJ/acesso a banco)"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 7,
    "miniBossName": "Slime de SQL Injection",
    "miniBossTitle": "Anomalia das Formas Normais",
    "miniBossSprite": "slime",
    "bounds": {
      "x": 6,
      "y": 134,
      "w": 72,
      "h": 20
    },
    "signTile": {
      "x": 42,
      "y": 135
    }
  },
  {
    "id": "06-seguranca-da-informacao",
    "arquivo": "06-seguranca-da-informacao_c90c6c2a.md",
    "nome": "Segurança da Informação",
    "materia": "Segurança da Informação",
    "regiaoId": "fortaleza-da-muralha",
    "caiEm": [
      "Técnico TI",
      "Analista TI"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 7,
    "miniBossName": "Fantasma do Ransomware",
    "miniBossTitle": "Invasor da Muralha e da LGPD",
    "miniBossSprite": "ghost",
    "bounds": {
      "x": 84,
      "y": 86,
      "w": 28,
      "h": 66
    },
    "signTile": {
      "x": 98,
      "y": 87
    }
  },
  {
    "id": "10-sistemas-operacionais",
    "arquivo": "10-sistemas-operacionais_c4b9ec88.md",
    "nome": "Sistemas Operacionais",
    "materia": "Sistemas Operacionais",
    "regiaoId": "montanhas-da-infra",
    "caiEm": [
      "Analista TI (bloco próprio)",
      "Técnico TI (hardening/infra)"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 8,
    "miniBossName": "Dragão do Deadlock",
    "miniBossTitle": "Fera das 4 Condições de Coffman",
    "miniBossSprite": "dragon",
    "bounds": {
      "x": 118,
      "y": 84,
      "w": 36,
      "h": 24
    },
    "signTile": {
      "x": 136,
      "y": 85
    }
  },
  {
    "id": "11-redes-e-servicos",
    "arquivo": "11-redes-e-servicos_9b75dcdf.md",
    "nome": "Redes e Serviços",
    "materia": "Redes de computadores, serviços de rede e gerenciamento",
    "regiaoId": "montanhas-da-infra",
    "caiEm": [
      "Técnico TI (Infraestrutura de TI)",
      "Analista TI (Redes + Serviços + Gerenciamento)"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 9,
    "miniBossName": "Hidra dos Pacotes Perdidos",
    "miniBossTitle": "Tempestade das 7 Camadas OSI",
    "miniBossSprite": "hydra",
    "bounds": {
      "x": 118,
      "y": 110,
      "w": 36,
      "h": 24
    },
    "signTile": {
      "x": 136,
      "y": 111
    }
  },
  {
    "id": "13-ia-e-nuvem",
    "arquivo": "13-ia-e-nuvem_f2a58431.md",
    "nome": "IA e Computação em Nuvem",
    "materia": "Inteligência Artificial e Computação em Nuvem",
    "regiaoId": "montanhas-da-infra",
    "caiEm": [
      "Analista TI (IA)",
      "Técnico TI (Nuvem)",
      "Ambos (assistentes de IA no desenvolvimento — ver arquivo 04)"
    ],
    "peso": "Conhecimentos Específicos (peso 2)",
    "nivelSugerido": 10,
    "miniBossName": "Golem da Alucinação em Nuvem",
    "miniBossTitle": "Colosso dos Transformers e FaaS",
    "miniBossSprite": "golem",
    "bounds": {
      "x": 118,
      "y": 136,
      "w": 36,
      "h": 18
    },
    "signTile": {
      "x": 136,
      "y": 137
    }
  }
];

export const FICHAS: Ficha[] = [
  {
    "id": "res-cnj-400-2021",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 400/2021 — Política de Sustentabilidade do Poder Judiciário",
    "zonaId": "01-nocoes-de-legislacao",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Legislação",
    "cargo": "ambos",
    "npcName": "Magistrada Beatriz",
    "npcRole": "juiz",
    "npcSeed": 634126260,
    "oQueE": "O que é: norma do CNJ que define a política de sustentabilidade de todos os órgãos do Judiciário (conselhos e tribunais). Texto compilado com alterações das Res. 550/2024 e 594/2024; a Res. 641/2025 também alterou a norma para adequá-la à Lei 14.133/2021 e incentivar inovação.",
    "exemploPratico": "Exemplo prático: o tribunal mede consumo de papel, energia e água por servidor (indicadores do PLS), define meta de redução e publica o resultado anual. Uma política de impressão (imprimir só o necessário) é ação do PLS.",
    "fatosChave": [
      "O que é: norma do CNJ que define a política de sustentabilidade de todos os órgãos do Judiciário (conselhos e tribunais). Texto compilado com alterações das Res. 550/2024 e 594/2024; a Res. 641/2025 também alterou a norma para adequá-la à Lei 14.133/2021 e incentivar inovação.",
      "Ideia central (art. 2º): os órgãos devem adotar modelos de gestão que promovam sustentabilidade em 4 dimensões:",
      "Ambiental: reduzir consumo, reutilizar, reciclar, analisar ciclo de vida.",
      "Econômica: gastar com eficiência, avaliando necessidade real e custo-benefício.",
      "Social: bem-estar no trabalho, saúde preventiva, acessibilidade e inclusão.",
      "Cultural: respeito à diversidade de ideias, gêneros e diferenças regionais.",
      "Peça principal: PLS (Plano de Logística Sustentável) (arts. 4º a 10)",
      "Instrumento alinhado à Estratégia Nacional do Judiciário e ao planejamento de cada órgão.",
      "Tem objetivos, indicadores, metas, prazos, plano de ações e unidades responsáveis.",
      "É instituído por ato do Presidente do tribunal, publicado na internet e revisado no máximo a cada 2 anos.",
      "Relatório de desempenho anual enviado ao CNJ pelo sistema PLS-Jud até 28 de fevereiro do ano seguinte.",
      "Unidade de Sustentabilidade (arts. 14–17): unidade permanente; mínimo de 3 servidores se o tribunal tiver mais de 5.000 pessoas, senão 2.",
      "Comissão Gestora do PLS (arts. 18–19): presidida por magistrado, com no mínimo 5 gestores (gestão estratégica, sustentabilidade, contratações).",
      "Contratações sustentáveis (arts. 20–22): verificar necessidade real, histórico de consumo, ciclo de vida, critérios de sustentabilidade, descarte adequado; cada tribunal deve ter um guia de contratações sustentáveis.",
      "Balanço da Sustentabilidade do Poder Judiciário (arts. 22-A a 22-C): publicado pelo DPJ/CNJ com dados do PLS-Jud; inclui o IDS – Índice de Desempenho de Sustentabilidade (atenção: \"Desempenho\", não \"Desenvolvimento\").",
      "Definições que podem cair (art. 3º): coleta seletiva solidária (recicláveis para cooperativas de catadores); material de consumo (vida útil de até 2 anos); ponto de equilíbrio (quantidade ideal de recursos sem perder eficiência); logística sustentável.",
      "Ramificações: Agenda 2030 / ODS da ONU; Lei 14.133/2021 (licitações); Res. CNJ 401/2021 (acessibilidade); Programa Justiça Carbono Zero (inventário de emissões de gases de efeito estufa).",
      "pdtic-trt4 — o PDTIC e as contratações de TI também seguem critérios de sustentabilidade (ex.: eficiência energética de equipamentos, descarte de lixo eletrônico).",
      "cobit — PLS é instrumento de governança das contratações.",
      "res-cnj-351-2020 — a dimensão \"social\" (bem-estar no trabalho) conversa com a política de prevenção ao assédio."
    ],
    "conexoes": [
      "pdtic-trt4",
      "cobit",
      "res-cnj-351-2020"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 400/2021 – atos.cnj.jus.br",
        "url": "https://atos.cnj.jus.br/atos/detalhar/3986"
      },
      {
        "label": "Res. 641/2025 (altera a 400)",
        "url": "https://atos.cnj.jus.br/files/original1428552025092468d40027dea4a.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** norma do CNJ que define a política de sustentabilidade de todos os órgãos do Judiciário (conselhos e tribunais). Texto compilado com alterações das Res. 550/2024 e 594/2024; a Res. 641/2025 também alterou a norma para adequá-la à Lei 14.133/2021 e incentivar inovação.\n- **Ideia central (art. 2º):** os órgãos devem adotar modelos de gestão que promovam sustentabilidade em 4 dimensões:\n  - **Ambiental:** reduzir consumo, reutilizar, reciclar, analisar ciclo de vida.\n  - **Econômica:** gastar com eficiência, avaliando necessidade real e custo-benefício.\n  - **Social:** bem-estar no trabalho, saúde preventiva, acessibilidade e inclusão.\n  - **Cultural:** respeito à diversidade de ideias, gêneros e diferenças regionais.\n- **Peça principal: PLS (Plano de Logística Sustentável)** (arts. 4º a 10)\n  - Instrumento alinhado à Estratégia Nacional do Judiciário e ao planejamento de cada órgão.\n  - Tem objetivos, indicadores, metas, prazos, plano de ações e unidades responsáveis.\n  - É instituído por ato do Presidente do tribunal, publicado na internet e revisado no máximo a cada 2 anos.\n  - Relatório de desempenho anual enviado ao CNJ pelo sistema **PLS-Jud** até 28 de fevereiro do ano seguinte.\n- **Estruturas:**\n  - **Unidade de Sustentabilidade** (arts. 14–17): unidade permanente; mínimo de 3 servidores se o tribunal tiver mais de 5.000 pessoas, senão 2.\n  - **Comissão Gestora do PLS** (arts. 18–19): presidida por magistrado, com no mínimo 5 gestores (gestão estratégica, sustentabilidade, contratações).\n- **Contratações sustentáveis** (arts. 20–22): verificar necessidade real, histórico de consumo, ciclo de vida, critérios de sustentabilidade, descarte adequado; cada tribunal deve ter um guia de contratações sustentáveis.\n- **Balanço da Sustentabilidade do Poder Judiciário** (arts. 22-A a 22-C): publicado pelo DPJ/CNJ com dados do PLS-Jud; inclui o **IDS – Índice de Desempenho de Sustentabilidade** (atenção: \"Desempenho\", não \"Desenvolvimento\").\n- **Exemplo prático:** o tribunal mede consumo de papel, energia e água por servidor (indicadores do PLS), define meta de redução e publica o resultado anual. Uma política de impressão (imprimir só o necessário) é ação do PLS.\n- **Definições que podem cair (art. 3º):** coleta seletiva solidária (recicláveis para cooperativas de catadores); material de consumo (vida útil de até 2 anos); ponto de equilíbrio (quantidade ideal de recursos sem perder eficiência); logística sustentável.\n- **Ramificações:** Agenda 2030 / ODS da ONU; Lei 14.133/2021 (licitações); Res. CNJ 401/2021 (acessibilidade); Programa Justiça Carbono Zero (inventário de emissões de gases de efeito estufa).\n- **Conexões na prova:**\n  - [[pdtic-trt4]] — o PDTIC e as contratações de TI também seguem critérios de sustentabilidade (ex.: eficiência energética de equipamentos, descarte de lixo eletrônico).\n  - [[cobit]] — PLS é instrumento de governança das contratações.\n  - [[res-cnj-351-2020]] — a dimensão \"social\" (bem-estar no trabalho) conversa com a política de prevenção ao assédio.\n- **Fontes:** [Resolução 400/2021 – atos.cnj.jus.br](https://atos.cnj.jus.br/atos/detalhar/3986) · [Res. 641/2025 (altera a 400)](https://atos.cnj.jus.br/files/original1428552025092468d40027dea4a.pdf)\n\n---"
  },
  {
    "id": "codigo-conduta-trt4",
    "aliasIds": [],
    "titulo": "Código de Conduta e Valores Éticos do TRT4 (Portaria GP.TRT4 nº 4.573/2023)",
    "zonaId": "01-nocoes-de-legislacao",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Legislação",
    "cargo": "ambos",
    "npcName": "Escrivão Antônio",
    "npcRole": "juiz",
    "npcSeed": 877080624,
    "oQueE": "O que é: documento do TRT4 que reúne princípios, deveres e proibições de conduta para quem trabalha ou se relaciona com o Tribunal. O edital cobra o texto compilado com as alterações da Portaria GP.TRT4 nº 2.808/2025.",
    "exemploPratico": "Exemplo prático: um servidor de TI recebe de um fornecedor de software um notebook \"de presente\" → vedado (art. 6º, XXIII). Se não puder recusar sem prejuízo, entrega em até 10 dias para doação.",
    "fatosChave": [
      "O que é: documento do TRT4 que reúne princípios, deveres e proibições de conduta para quem trabalha ou se relaciona com o Tribunal. O edital cobra o texto compilado com as alterações da Portaria GP.TRT4 nº 2.808/2025.",
      "Objetivos (art. 1º): estabelecer princípios e normas de conduta; preservar a imagem e a reputação institucional; promover inclusão de pessoas com deficiência; reduzir a subjetividade na interpretação das normas éticas.",
      "A quem se aplica (art. 2º): servidores efetivos, agentes sem vínculo efetivo, estagiários e empregados de terceirizadas com dedicação exclusiva. Violações são comunicadas ao Comitê de Ética e Integridade.",
      "Princípios e valores (art. 3º, 11 itens): legalidade, impessoalidade, moralidade e interesse público; ética (honestidade, integridade e imparcialidade); transparência, eficiência, comprometimento, dignidade e respeito, equidade, responsabilidade socioambiental, trabalho em equipe, privacidade e cortesia.",
      "Deveres (art. 5º) — destaques: seguir a política de segurança da informação, proteger o patrimônio público, declarar impedimento ou suspeição, comunicar ilegalidades à chefia imediata e violações ao Comitê de Ética.",
      "Vedações (art. 6º) — destaques: discriminação e assédio; usar bens do TRT4 para interesse privado; divulgar informação sigilosa; espalhar fake news; usar informação privilegiada; supervisionar parente próximo; aceitar presentes ligados às funções.",
      "Presentes e brindes (art. 6º, §§ 1º e 2º):",
      "Não é presente: item sem valor comercial; brinde institucional de até 1% do teto remuneratório constitucional.",
      "Presente que não pode ser recusado sem custo vai à Secretaria de Administração em 10 dias para doação a entidade filantrópica.",
      "Contratações (arts. 7º a 10): proíbe contratar parentes até o 3º grau de autoridades e de quem atua em licitações; vale também para procedimentos iniciados até 6 meses depois de deixar a função.",
      "Procedimento (arts. 16 a 25): defesa escrita em 5 dias úteis; apuração concluída em 60 dias, prorrogáveis uma vez por igual período; indícios de crime ou improbidade são enviados à PF, MPF e TCU; denúncia de má-fé é punida.",
      "Revisão: o código deve ser revisto no mínimo a cada 2 anos (art. 29).",
      "cid / iso-27001 — o dever de seguir a política de segurança da informação está no próprio Código.",
      "lgpd — vedação de divulgar informação sigilosa e o valor \"privacidade\".",
      "res-cnj-351-2020 e res-csjt-360-2023 — vedação a assédio e discriminação.",
      "cobit — integridade e conflito de interesses nas contratações de TI."
    ],
    "conexoes": [
      "cid",
      "iso-27001",
      "lgpd",
      "res-cnj-351-2020",
      "res-csjt-360-2023",
      "cobit"
    ],
    "avisosOraculo": [
      "O PDF lido é a versão original de 2023. Conferir no texto compilado se a Portaria 2.808/2025 alterou algum desses números."
    ],
    "fontes": [
      {
        "label": "Portaria GP.TRT4 nº 4.573/2023 (PDF oficial do TRT4)",
        "url": "https://www.trt4.jus.br/portais/media/2152346/4573%20-%20Institui%20o%20C%C3%B3digo%20de%20Conduta%20e%20Valores%20%C3%89ticos%20do%20TRT4.pdf"
      },
      {
        "label": "Página Ética e Integridade TRT4",
        "url": "https://www.trt4.jus.br/portais/trt4/etica-e-integridade"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** documento do TRT4 que reúne princípios, deveres e proibições de conduta para quem trabalha ou se relaciona com o Tribunal. O edital cobra o texto compilado com as alterações da Portaria GP.TRT4 nº 2.808/2025.\n- **Objetivos (art. 1º):** estabelecer princípios e normas de conduta; preservar a imagem e a reputação institucional; promover inclusão de pessoas com deficiência; reduzir a subjetividade na interpretação das normas éticas.\n- **A quem se aplica (art. 2º):** servidores efetivos, agentes sem vínculo efetivo, estagiários e empregados de terceirizadas com dedicação exclusiva. Violações são comunicadas ao **Comitê de Ética e Integridade**.\n- **Princípios e valores (art. 3º, 11 itens):** legalidade, impessoalidade, moralidade e interesse público; ética (honestidade, integridade e imparcialidade); transparência, eficiência, comprometimento, dignidade e respeito, equidade, responsabilidade socioambiental, trabalho em equipe, privacidade e cortesia.\n- **Deveres (art. 5º) — destaques:** seguir a **política de segurança da informação**, proteger o patrimônio público, declarar impedimento ou suspeição, comunicar ilegalidades à chefia imediata e violações ao Comitê de Ética.\n- **Vedações (art. 6º) — destaques:** discriminação e assédio; usar bens do TRT4 para interesse privado; divulgar informação sigilosa; espalhar *fake news*; usar informação privilegiada; supervisionar parente próximo; aceitar presentes ligados às funções.\n- **Presentes e brindes (art. 6º, §§ 1º e 2º):**\n  - Não é presente: item sem valor comercial; brinde institucional de até **1% do teto remuneratório constitucional**.\n  - Presente que não pode ser recusado sem custo vai à Secretaria de Administração em **10 dias** para doação a entidade filantrópica.\n- **Contratações (arts. 7º a 10):** proíbe contratar parentes até o 3º grau de autoridades e de quem atua em licitações; vale também para procedimentos iniciados até 6 meses depois de deixar a função.\n- **Procedimento (arts. 16 a 25):** defesa escrita em **5 dias úteis**; apuração concluída em **60 dias**, prorrogáveis uma vez por igual período; indícios de crime ou improbidade são enviados à PF, MPF e TCU; denúncia de má-fé é punida.\n- **Revisão:** o código deve ser revisto no mínimo a cada 2 anos (art. 29).\n- **Exemplo prático:** um servidor de TI recebe de um fornecedor de software um notebook \"de presente\" → vedado (art. 6º, XXIII). Se não puder recusar sem prejuízo, entrega em até 10 dias para doação.\n- **Conexões na prova:**\n  - [[cid]] / [[iso-27001]] — o dever de seguir a política de segurança da informação está no próprio Código.\n  - [[lgpd]] — vedação de divulgar informação sigilosa e o valor \"privacidade\".\n  - [[res-cnj-351-2020]] e [[res-csjt-360-2023]] — vedação a assédio e discriminação.\n  - [[cobit]] — integridade e conflito de interesses nas contratações de TI.\n- **Fonte:** [Portaria GP.TRT4 nº 4.573/2023 (PDF oficial do TRT4)](https://www.trt4.jus.br/portais/media/2152346/4573%20-%20Institui%20o%20C%C3%B3digo%20de%20Conduta%20e%20Valores%20%C3%89ticos%20do%20TRT4.pdf) · [Página Ética e Integridade TRT4](https://www.trt4.jus.br/portais/trt4/etica-e-integridade)\n- ⚠️ O PDF lido é a versão original de 2023. Conferir no texto compilado se a Portaria 2.808/2025 alterou algum desses números.\n\n---"
  },
  {
    "id": "regimento-trt4",
    "aliasIds": [],
    "titulo": "Regimento Interno do TRT4 (atualizado até a RA nº 31/2026)",
    "zonaId": "01-nocoes-de-legislacao",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Legislação",
    "cargo": "ambos",
    "npcName": "Juiz Valério",
    "npcRole": "juiz",
    "npcSeed": 1394089422,
    "oQueE": "O que é: a \"lei interna\" do Tribunal: organização, órgãos, competências, eleições, processos.",
    "exemploPratico": "Exemplo prático: um mandado de segurança contra ato de juiz de 1º grau vai para a 1ª SDI; um recurso ordinário contra sentença vai para uma das 11 Turmas.",
    "fatosChave": [
      "O que é: a \"lei interna\" do Tribunal: organização, órgãos, competências, eleições, processos.",
      "Estrutura básica:",
      "Sede em Porto Alegre, jurisdição sobre todo o Rio Grande do Sul (art. 2º).",
      "48 desembargadores do trabalho, nomeados pelo Presidente da República (art. 4º).",
      "Órgãos do Tribunal (art. 5º): Tribunal Pleno; Órgão Especial; Seções Especializadas; Turmas; Presidência; Corregedoria; Ouvidoria e Ouvidoria da Mulher e das Ações Afirmativas.",
      "Cargos de direção (art. 6º): Presidente; Vice-Presidente Institucional e de Atuação em Demandas Coletivas; Vice-Presidente Jurisdicional; Corregedor Regional.",
      "Órgãos julgadores (página oficial do TRT4):",
      "Órgão Especial: 16 membros; metade das vagas por antiguidade e metade por eleição do Pleno (modelo do art. 93, XI, da CF).",
      "Eleições: voto secreto no Pleno na 1ª sexta-feira útil de outubro dos anos ímpares; posse na 1ª sexta-feira útil de dezembro; mandato de 2 anos, sem reeleição (art. 16). Ouvidoria: eleita em outubro dos anos pares, mandato de 2 anos, uma recondução.",
      "Antiguidade (art. 9º), nesta ordem: posse → nomeação/promoção → tempo de magistratura → tempo de serviço público federal → idade.",
      "governanca-tic-trt4 — quem aprova o PDTIC e as políticas de TI é a alta administração definida no Regimento.",
      "res-cnj-335-2020 / res-cnj-335-2020 — os sistemas que você vai sustentar processam exatamente os feitos desses órgãos."
    ],
    "conexoes": [
      "governanca-tic-trt4",
      "res-cnj-335-2020"
    ],
    "avisosOraculo": [
      "O regimento é longo e muda com frequência. Esta ficha cobre a estrutura; a quantidade de membros por órgão é da página do TRT4 de 03/11/2026. Para candidatos a cargo de direção, a página consultada fala em \"quinto mais antigo\" — confirmar a redação exata no PDF oficial."
    ],
    "fontes": [
      {
        "label": "Órgãos julgadores – TRT4",
        "url": "https://www.trt4.jus.br/portais/trt4/orgaos-julgadores"
      },
      {
        "label": "Regimento compilado (Qlegislação)",
        "url": "https://qlegislacao.com.br/legismais/federal/nacregimentointernotrt4"
      }
    ],
    "tablePairs": [
      {
        "term": "Tribunal Pleno",
        "definition": "Composição: 48 · Quórum: metade + 1 · Faz o quê (resumo): Eleições da administração, uniformização de jurisprudência, inconstitucionalidade",
        "rawRow": "Tribunal Pleno — 48 — metade + 1 — Eleições da administração, uniformização de jurisprudência, inconstitucionalidade"
      },
      {
        "term": "Órgão Especial",
        "definition": "Composição: 16 · Quórum: 10 · Faz o quê (resumo): Matéria administrativa, mandados de segurança, conflitos de competência",
        "rawRow": "Órgão Especial — 16 — 10 — Matéria administrativa, mandados de segurança, conflitos de competência"
      },
      {
        "term": "SDC (Dissídios Coletivos)",
        "definition": "Composição: 10 · Quórum: 5 · Faz o quê (resumo): Dissídios coletivos e greves",
        "rawRow": "SDC (Dissídios Coletivos) — 10 — 5 — Dissídios coletivos e greves"
      },
      {
        "term": "1ª SDI",
        "definition": "Composição: 17 · Quórum: 9 · Faz o quê (resumo): HC, habeas data, MS contra juízes de 1º grau",
        "rawRow": "1ª SDI — 17 — 9 — HC, habeas data, MS contra juízes de 1º grau"
      },
      {
        "term": "2ª SDI",
        "definition": "Composição: 11 · Quórum: 6 · Faz o quê (resumo): Ações rescisórias",
        "rawRow": "2ª SDI — 11 — 6 — Ações rescisórias"
      },
      {
        "term": "SEEx (Execução)",
        "definition": "Composição: 8 · Quórum: 5 · Faz o quê (resumo): Agravos de petição na execução",
        "rawRow": "SEEx (Execução) — 8 — 5 — Agravos de petição na execução"
      },
      {
        "term": "SEJAI (Agravos Internos)",
        "definition": "Composição: 15 · Quórum: 8 · Faz o quê (resumo): Agravos internos contra decisão que nega recurso de revista com base em precedentes do TST",
        "rawRow": "SEJAI (Agravos Internos) — 15 — 8 — Agravos internos contra decisão que nega recurso de revista com base em precedentes do TST"
      },
      {
        "term": "Turmas",
        "definition": "Composição: 11 turmas × 4 · Quórum: 3 · Faz o quê (resumo): Recursos ordinários (fase de conhecimento)",
        "rawRow": "Turmas — 11 turmas × 4 — 3 — Recursos ordinários (fase de conhecimento)"
      }
    ],
    "textoCompleto": "- **O que é:** a \"lei interna\" do Tribunal: organização, órgãos, competências, eleições, processos.\n- **Estrutura básica:**\n  - Sede em **Porto Alegre**, jurisdição sobre **todo o Rio Grande do Sul** (art. 2º).\n  - **48 desembargadores** do trabalho, nomeados pelo Presidente da República (art. 4º).\n  - **Órgãos do Tribunal (art. 5º):** Tribunal Pleno; Órgão Especial; Seções Especializadas; Turmas; Presidência; Corregedoria; Ouvidoria e Ouvidoria da Mulher e das Ações Afirmativas.\n  - **Cargos de direção (art. 6º):** Presidente; Vice-Presidente Institucional e de Atuação em Demandas Coletivas; Vice-Presidente Jurisdicional; Corregedor Regional.\n- **Órgãos julgadores (página oficial do TRT4):**\n\n| Órgão | Composição | Quórum | Faz o quê (resumo) |\n| --- | --- | --- | --- |\n| Tribunal Pleno | 48 | metade + 1 | Eleições da administração, uniformização de jurisprudência, inconstitucionalidade |\n| Órgão Especial | 16 | 10 | Matéria administrativa, mandados de segurança, conflitos de competência |\n| SDC (Dissídios Coletivos) | 10 | 5 | Dissídios coletivos e greves |\n| 1ª SDI | 17 | 9 | HC, habeas data, MS contra juízes de 1º grau |\n| 2ª SDI | 11 | 6 | Ações rescisórias |\n| SEEx (Execução) | 8 | 5 | Agravos de petição na execução |\n| SEJAI (Agravos Internos) | 15 | 8 | Agravos internos contra decisão que nega recurso de revista com base em precedentes do TST |\n| Turmas | 11 turmas × 4 | 3 | Recursos ordinários (fase de conhecimento) |\n\n- **Órgão Especial:** 16 membros; metade das vagas por antiguidade e metade por eleição do Pleno (modelo do art. 93, XI, da CF).\n- **Eleições:** voto secreto no Pleno na 1ª sexta-feira útil de outubro dos **anos ímpares**; posse na 1ª sexta-feira útil de dezembro; mandato de **2 anos**, sem reeleição (art. 16). Ouvidoria: eleita em outubro dos anos pares, mandato de 2 anos, uma recondução.\n- **Antiguidade (art. 9º), nesta ordem:** posse → nomeação/promoção → tempo de magistratura → tempo de serviço público federal → idade.\n- **Exemplo prático:** um mandado de segurança contra ato de juiz de 1º grau vai para a 1ª SDI; um recurso ordinário contra sentença vai para uma das 11 Turmas.\n- **Conexões na prova:**\n  - [[governanca-tic-trt4]] — quem aprova o PDTIC e as políticas de TI é a alta administração definida no Regimento.\n  - [[res-cnj-335-2020]] / [[res-cnj-335-2020]] — os sistemas que você vai sustentar processam exatamente os feitos desses órgãos.\n- **Fontes:** [Órgãos julgadores – TRT4](https://www.trt4.jus.br/portais/trt4/orgaos-julgadores) · [Regimento compilado (Qlegislação)](https://qlegislacao.com.br/legismais/federal/nacregimentointernotrt4)\n- ⚠️ O regimento é longo e muda com frequência. Esta ficha cobre a estrutura; a quantidade de membros por órgão é da página do TRT4 de 03/11/2026. Para candidatos a cargo de direção, a página consultada fala em \"quinto mais antigo\" — confirmar a redação exata no PDF oficial.\n\n---"
  },
  {
    "id": "res-csjt-360-2023",
    "aliasIds": [],
    "titulo": "Resolução CSJT nº 360/2023 — Prevenção e Enfrentamento da Violência, do Assédio e de Todas as Formas de Discriminação (Justiça do Trabalho de 1º e 2º graus)",
    "zonaId": "01-nocoes-de-legislacao",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Legislação",
    "cargo": "ambos",
    "npcName": "Conselheira Clara",
    "npcRole": "bibliotecaria",
    "npcSeed": 686103352,
    "oQueE": "O que é: política da Justiça do Trabalho (varas e TRTs) para coibir violência, assédio e discriminação no ambiente de trabalho. Substituiu a Res. CSJT 237/2019. Para o TST e o CSJT vale o Ato Conjunto TST.CSJT.GP nº 52/2023.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: política da Justiça do Trabalho (varas e TRTs) para coibir violência, assédio e discriminação no ambiente de trabalho. Substituiu a Res. CSJT 237/2019. Para o TST e o CSJT vale o Ato Conjunto TST.CSJT.GP nº 52/2023.",
      "Definições-chave (art. 2º):",
      "Violência e assédio: comportamentos e práticas inaceitáveis (ou ameaças deles), de ocorrência única ou repetida, que, independentemente da intencionalidade, causem ou possam causar dano físico, psicológico, sexual, patrimonial ou moral.",
      "Assédio moral organizacional: processo contínuo de condutas abusivas amparado por estratégias organizacionais ou métodos gerenciais para obter engajamento intensivo ou excluir quem a instituição não quer manter.",
      "Assédio sexual: conduta de conotação sexual contra a vontade de alguém (verbal, não verbal ou física) que perturbe, constranja ou crie ambiente hostil.",
      "Discriminação: distinção, exclusão, restrição ou preferência por raça, etnia, cor, sexo, gênero, religião, deficiência, opinião política, origem, idade, orientação sexual, identidade de gênero etc.; inclui a recusa de adaptação razoável.",
      "Princípios (art. 3º): dignidade, não discriminação e diversidade, saúde e segurança, gestão participativa, valor social do trabalho, prevenção em primeiro lugar, confidencialidade, privacidade, ética profissional, respeito mútuo.",
      "Comitês em cada grau de jurisdição, criados em até 45 dias, com composição diversa (servidores eleitos ou indicados pelo sindicato, terceirizados, representante da Comissão de Acessibilidade, diversidade de gênero).",
      "Denúncia (arts. 12–14): qualquer pessoa que sofra ou presencie pode noticiar; denúncia anônima não é admitida; sigilo obrigatório.",
      "Semana de Combate ao Assédio e à Discriminação: primeira semana de maio de cada ano.",
      "No TRT4: a RA 11/2025 transformou os antigos Subcomitês de Combate ao Assédio em Comitês de Prevenção e Enfrentamento da Violência, do Assédio e da Discriminação do 1º e 2º graus.",
      "Diferença para a Res. CNJ 351/2020: a do CSJT é específica da Justiça do Trabalho e acrescenta \"violência\" e a definição de violência e assédio com base no gênero (inspiração na Convenção 190 da OIT)."
    ],
    "conexoes": [
      "res-cnj-351-2020",
      "codigo-conduta-trt4",
      "dh-grupos-vulneraveis",
      "res-csjt-368-2023"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução CSJT 360/2023 (PDF)",
        "url": "https://trt7.jus.br/files/institucional/comissoes_permanentes/CSJT_RESOLUCAO_2023_360.pdf"
      },
      {
        "label": "Notícia TST",
        "url": "https://www.tst.jus.br/-/justi%C3%A7a-do-trabalho-cria-pol%C3%ADtica-de-enfrentamento-a-viol%C3%AAncia-ass%C3%A9dio-e-discrimina%C3%A7%C3%A3o"
      },
      {
        "label": "RA TRT4 11/2025",
        "url": "https://www.trt4.jus.br/portais/media/503529122/RA%2011-2025.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** política da Justiça do Trabalho (varas e TRTs) para coibir violência, assédio e discriminação no ambiente de trabalho. Substituiu a Res. CSJT 237/2019. Para o TST e o CSJT vale o Ato Conjunto TST.CSJT.GP nº 52/2023.\n- **Definições-chave (art. 2º):**\n  - **Violência e assédio:** comportamentos e práticas inaceitáveis (ou ameaças deles), **de ocorrência única ou repetida**, que, **independentemente da intencionalidade**, causem ou possam causar dano físico, psicológico, sexual, patrimonial ou moral.\n  - **Assédio moral organizacional:** processo contínuo de condutas abusivas amparado por estratégias organizacionais ou métodos gerenciais para obter engajamento intensivo ou excluir quem a instituição não quer manter.\n  - **Assédio sexual:** conduta de conotação sexual contra a vontade de alguém (verbal, não verbal ou física) que perturbe, constranja ou crie ambiente hostil.\n  - **Discriminação:** distinção, exclusão, restrição ou preferência por raça, etnia, cor, sexo, gênero, religião, deficiência, opinião política, origem, idade, orientação sexual, identidade de gênero etc.; **inclui a recusa de adaptação razoável**.\n- **Princípios (art. 3º):** dignidade, não discriminação e diversidade, saúde e segurança, gestão participativa, valor social do trabalho, prevenção em primeiro lugar, confidencialidade, privacidade, ética profissional, respeito mútuo.\n- **Estrutura:**\n  - **Comitês** em cada grau de jurisdição, criados em até 45 dias, com composição diversa (servidores eleitos ou indicados pelo sindicato, terceirizados, representante da Comissão de Acessibilidade, diversidade de gênero).\n  - **Denúncia (arts. 12–14):** qualquer pessoa que sofra ou presencie pode noticiar; **denúncia anônima não é admitida**; sigilo obrigatório.\n  - **Semana de Combate ao Assédio e à Discriminação:** primeira semana de **maio** de cada ano.\n- **No TRT4:** a RA 11/2025 transformou os antigos Subcomitês de Combate ao Assédio em Comitês de Prevenção e Enfrentamento da Violência, do Assédio e da Discriminação do 1º e 2º graus.\n- **Diferença para a Res. CNJ 351/2020:** a do CSJT é específica da Justiça do Trabalho e **acrescenta \"violência\"** e a definição de **violência e assédio com base no gênero** (inspiração na Convenção 190 da OIT).\n- **Conexões na prova:** [[res-cnj-351-2020]] (norma-mãe nacional) · [[codigo-conduta-trt4]] · [[dh-grupos-vulneraveis]] · [[res-csjt-368-2023]]\n- **Fontes:** [Resolução CSJT 360/2023 (PDF)](https://trt7.jus.br/files/institucional/comissoes_permanentes/CSJT_RESOLUCAO_2023_360.pdf) · [Notícia TST](https://www.tst.jus.br/-/justi%C3%A7a-do-trabalho-cria-pol%C3%ADtica-de-enfrentamento-a-viol%C3%AAncia-ass%C3%A9dio-e-discrimina%C3%A7%C3%A3o) · [RA TRT4 11/2025](https://www.trt4.jus.br/portais/media/503529122/RA%2011-2025.pdf)\n\n---"
  },
  {
    "id": "res-cnj-351-2020",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 351/2020 — Prevenção e Enfrentamento do Assédio Moral, do Assédio Sexual e da Discriminação (todo o Poder Judiciário)",
    "zonaId": "01-nocoes-de-legislacao",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Legislação",
    "cargo": "ambos",
    "npcName": "Ouvidora Helena",
    "npcRole": "bibliotecaria",
    "npcSeed": 1817962318,
    "oQueE": "O que é: política nacional do CNJ, alterada pela Res. 518/2023 e pela Res. 671/2026. Objetivo: trabalho digno, saudável, seguro e sustentável no Judiciário (art. 1º).",
    "exemploPratico": "Exemplo prático: gestor que, para forçar um servidor a pedir remoção, passa a deixá-lo sem tarefas e o exclui das reuniões → assédio moral (isolamento, exclusão). Se isso for política da unidade para \"enxugar\" equipe → assédio moral organizacional.",
    "fatosChave": [
      "O que é: política nacional do CNJ, alterada pela Res. 518/2023 e pela Res. 671/2026. Objetivo: trabalho digno, saudável, seguro e sustentável no Judiciário (art. 1º).",
      "Definições (art. 2º, I a XII):",
      "Assédio moral: violação da dignidade ou integridade psíquica ou física de outra pessoa por conduta abusiva, independentemente de intencionalidade, degradando as relações e o ambiente de trabalho (ex.: tarefas desnecessárias ou exorbitantes, humilhação, isolamento, difamação).",
      "Assédio moral organizacional: condutas abusivas amparadas por estratégias ou métodos gerenciais.",
      "Assédio sexual e Discriminação: mesmas definições usadas depois pelo CSJT (a 360 copiou da 351).",
      "Outros conceitos definidos: saúde no trabalho, gestor, cooperação (horizontal, vertical e transversal), gestão participativa, organização do trabalho, risco, transversalidade.",
      "A Res. 671/2026 incluiu o inciso XIII – notícia de assédio ou discriminação (qualquer comunicação, formal ou informal, que leve o fato ao conhecimento da instituição).",
      "Pontos de estrutura:",
      "Acolhimento separado do processo disciplinar (arts. 7º a 11); canal permanente e sigiloso.",
      "Anonimato vedado, sigilo garantido (art. 14).",
      "Comissões de Prevenção em cada tribunal (art. 15), reunião no mínimo semestral; não podem integrar comissão disciplinar ao mesmo tempo.",
      "Assédio sexual é infração disciplinar grave (art. 17, § 2º).",
      "Semana de Combate: 1ª semana de maio (art. 18-A); encontro nacional das Comissões, preferencialmente na última semana de junho (art. 18-B)."
    ],
    "conexoes": [
      "res-csjt-360-2023",
      "codigo-conduta-trt4",
      "res-cnj-492-2023",
      "dh-grupos-vulneraveis"
    ],
    "avisosOraculo": [
      "A página compilada consultada mostrava o art. 2º só até o inciso XII; o inciso XIII vem da Res. 671/2026 (fev/2026), anterior ao edital, então deve ser considerado."
    ],
    "fontes": [
      {
        "label": "Resolução 351/2020 compilada – atos.cnj.jus.br",
        "url": "https://atos.cnj.jus.br/atos/detalhar/3557"
      },
      {
        "label": "Res. 671/2026",
        "url": "https://atos.cnj.jus.br/files/original17395720260210698b6d6dc4014.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** política nacional do CNJ, alterada pela Res. 518/2023 e pela Res. 671/2026. Objetivo: **trabalho digno, saudável, seguro e sustentável** no Judiciário (art. 1º).\n- **Definições (art. 2º, I a XII):**\n  - **Assédio moral:** violação da dignidade ou integridade psíquica ou física de outra pessoa por conduta abusiva, **independentemente de intencionalidade**, degradando as relações e o ambiente de trabalho (ex.: tarefas desnecessárias ou exorbitantes, humilhação, isolamento, difamação).\n  - **Assédio moral organizacional:** condutas abusivas amparadas por estratégias ou métodos gerenciais.\n  - **Assédio sexual** e **Discriminação:** mesmas definições usadas depois pelo CSJT (a 360 copiou da 351).\n  - Outros conceitos definidos: saúde no trabalho, gestor, cooperação (horizontal, vertical e transversal), gestão participativa, organização do trabalho, risco, transversalidade.\n  - A Res. 671/2026 incluiu o inciso **XIII – notícia de assédio ou discriminação** (qualquer comunicação, formal ou informal, que leve o fato ao conhecimento da instituição).\n- **Pontos de estrutura:**\n  - Acolhimento separado do processo disciplinar (arts. 7º a 11); canal permanente e sigiloso.\n  - **Anonimato vedado**, sigilo garantido (art. 14).\n  - **Comissões de Prevenção** em cada tribunal (art. 15), reunião no mínimo semestral; não podem integrar comissão disciplinar ao mesmo tempo.\n  - **Assédio sexual é infração disciplinar grave** (art. 17, § 2º).\n  - **Semana de Combate:** 1ª semana de maio (art. 18-A); encontro nacional das Comissões, preferencialmente na última semana de junho (art. 18-B).\n- **Exemplo prático:** gestor que, para forçar um servidor a pedir remoção, passa a deixá-lo sem tarefas e o exclui das reuniões → assédio moral (isolamento, exclusão). Se isso for política da unidade para \"enxugar\" equipe → assédio moral organizacional.\n- **Conexões na prova:** [[res-csjt-360-2023]] · [[codigo-conduta-trt4]] · [[res-cnj-492-2023]] (perspectiva de gênero) · [[dh-grupos-vulneraveis]]\n- **Fontes:** [Resolução 351/2020 compilada – atos.cnj.jus.br](https://atos.cnj.jus.br/atos/detalhar/3557) · [Res. 671/2026](https://atos.cnj.jus.br/files/original17395720260210698b6d6dc4014.pdf)\n- ⚠️ A página compilada consultada mostrava o art. 2º só até o inciso XII; o inciso XIII vem da Res. 671/2026 (fev/2026), anterior ao edital, então deve ser considerado.\n\n---"
  },
  {
    "id": "dh-evolucao-fundamentos",
    "aliasIds": [],
    "titulo": "Evolução histórica e fundamentos",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Desembargador Lúcio",
    "npcRole": "bibliotecaria",
    "npcSeed": 1376309413,
    "oQueE": "O que é: a trajetória dos direitos humanos das declarações do séc. XVIII (ex.: Declaração dos Direitos do Homem e do Cidadão, França, 1789) até o sistema internacional criado depois da 2ª Guerra (Carta da ONU, 1945; DUDH, 1948).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: a trajetória dos direitos humanos das declarações do séc. XVIII (ex.: Declaração dos Direitos do Homem e do Cidadão, França, 1789) até o sistema internacional criado depois da 2ª Guerra (Carta da ONU, 1945; DUDH, 1948).",
      "Fundamento central: a dignidade inerente a todos os membros da família humana (preâmbulo da DUDH)."
    ],
    "conexoes": [
      "dudh",
      "carta-onu",
      "dh-geracoes"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** a trajetória dos direitos humanos das declarações do séc. XVIII (ex.: Declaração dos Direitos do Homem e do Cidadão, França, 1789) até o sistema internacional criado depois da 2ª Guerra (Carta da ONU, 1945; DUDH, 1948).\n- **Fundamento central:** a **dignidade inerente** a todos os membros da família humana (preâmbulo da DUDH).\n- **Conexões:** [[dudh]] · [[carta-onu]] · [[dh-geracoes]]"
  },
  {
    "id": "dh-geracoes",
    "aliasIds": [],
    "titulo": "Gerações (dimensões) de direitos",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Procuradora Sofia",
    "npcRole": "bibliotecaria",
    "npcSeed": 1996735987,
    "oQueE": "O que é: classificação didática do jurista tcheco Karel Vasak, apresentada em 1979 no Instituto Internacional de Direitos Humanos de Estrasburgo, usando o lema da Revolução Francesa.",
    "exemploPratico": "Exemplo prático: o PIDCP concentra direitos de 1ª geração; o PIDESC, de 2ª; a Convenção sobre Diversidade Biológica, de 3ª.",
    "fatosChave": [
      "O que é: classificação didática do jurista tcheco Karel Vasak, apresentada em 1979 no Instituto Internacional de Direitos Humanos de Estrasburgo, usando o lema da Revolução Francesa.",
      "Cuidado: muitos autores preferem \"dimensões\", porque uma geração não substitui a outra. A doutrina brasileira fala também em 4ª e 5ª gerações, mas não há consenso."
    ],
    "conexoes": [
      "pidcp",
      "pidesc",
      "cdb"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Politize – três gerações",
        "url": "https://www.politize.com.br/tres-geracoes-dos-direitos-humanos/"
      },
      {
        "label": "Jus – Karel Vasak",
        "url": "https://jus.com.br/artigos/31948/quantas-dimensoes-ou-geracoes-dos-direitos-humanos-existem"
      }
    ],
    "tablePairs": [
      {
        "term": "1ª",
        "definition": "Valor: Liberdade · Exemplos: Civis e políticos (voto, expressão, propriedade) · Postura do Estado: Abstenção (não interferir)",
        "rawRow": "1ª — Liberdade — Civis e políticos (voto, expressão, propriedade) — Abstenção (não interferir)"
      },
      {
        "term": "2ª",
        "definition": "Valor: Igualdade · Exemplos: Econômicos, sociais e culturais (saúde, educação, trabalho) · Postura do Estado: Prestação (agir)",
        "rawRow": "2ª — Igualdade — Econômicos, sociais e culturais (saúde, educação, trabalho) — Prestação (agir)"
      },
      {
        "term": "3ª",
        "definition": "Valor: Fraternidade/solidariedade · Exemplos: Meio ambiente, paz, desenvolvimento · Postura do Estado: Tutela compartilhada com a sociedade",
        "rawRow": "3ª — Fraternidade/solidariedade — Meio ambiente, paz, desenvolvimento — Tutela compartilhada com a sociedade"
      }
    ],
    "textoCompleto": "- **O que é:** classificação didática do jurista tcheco **Karel Vasak**, apresentada em **1979** no Instituto Internacional de Direitos Humanos de Estrasburgo, usando o lema da Revolução Francesa.\n\n| Geração | Valor | Exemplos | Postura do Estado |\n| --- | --- | --- | --- |\n| 1ª | Liberdade | Civis e políticos (voto, expressão, propriedade) | Abstenção (não interferir) |\n| 2ª | Igualdade | Econômicos, sociais e culturais (saúde, educação, trabalho) | Prestação (agir) |\n| 3ª | Fraternidade/solidariedade | Meio ambiente, paz, desenvolvimento | Tutela compartilhada com a sociedade |\n\n- **Cuidado:** muitos autores preferem \"dimensões\", porque uma geração não substitui a outra. A doutrina brasileira fala também em 4ª e 5ª gerações, mas não há consenso.\n- **Exemplo prático:** o **PIDCP** concentra direitos de 1ª geração; o **PIDESC**, de 2ª; a **Convenção sobre Diversidade Biológica**, de 3ª.\n- **Conexões:** [[pidcp]] · [[pidesc]] · [[cdb]]\n- **Fonte:** [Politize – três gerações](https://www.politize.com.br/tres-geracoes-dos-direitos-humanos/) · [Jus – Karel Vasak](https://jus.com.br/artigos/31948/quantas-dimensoes-ou-geracoes-dos-direitos-humanos-existem)"
  },
  {
    "id": "dh-caracteristicas",
    "aliasIds": [],
    "titulo": "Fontes, classificação, princípios e características",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Oficial Rodrigo",
    "npcRole": "sabio",
    "npcSeed": 1619071745,
    "oQueE": "Características clássicas cobradas: universalidade, indivisibilidade, interdependência, inter-relação, inalienabilidade, imprescritibilidade, historicidade, vedação do retrocesso.",
    "exemploPratico": "",
    "fatosChave": [
      "Características clássicas cobradas: universalidade, indivisibilidade, interdependência, inter-relação, inalienabilidade, imprescritibilidade, historicidade, vedação do retrocesso.",
      "Conexão: declaração ≠ tratado → dudh (declaração) vs. pidcp (tratado)."
    ],
    "conexoes": [
      "dudh",
      "pidcp"
    ],
    "avisosOraculo": [
      "Esta ficha é de conhecimento doutrinário geral; ainda falta fonte oficial específica — refinar na próxima rodada."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Características clássicas cobradas:** universalidade, indivisibilidade, interdependência, inter-relação, inalienabilidade, imprescritibilidade, historicidade, vedação do retrocesso.\n- **Fontes:** tratados (convenções, pactos), costume internacional, princípios gerais e, como \"soft law\", declarações (ex.: DUDH).\n- **Conexão:** declaração ≠ tratado → [[dudh]] (declaração) vs. [[pidcp]] (tratado).\n- ⚠️ Esta ficha é de conhecimento doutrinário geral; ainda falta fonte oficial específica — refinar na próxima rodada."
  },
  {
    "id": "dh-tratados-cf88",
    "aliasIds": [],
    "titulo": "Tratados de DH em face da CF/88 e status hierárquico",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Relatora Lívia",
    "npcRole": "bibliotecaria",
    "npcSeed": 827640982,
    "oQueE": "Regra atual (STF, RE 466.343, 03/12/2008):",
    "exemploPratico": "Exemplos com status de emenda: Convenção sobre os Direitos das Pessoas com Deficiência (primeiro, 2008/2009), Tratado de Marraqueche e Convenção Interamericana contra o Racismo (Decreto 10.932/2022).",
    "fatosChave": [
      "Regra atual (STF, RE 466.343, 03/12/2008):",
      "Tratado de DH aprovado pelo rito do art. 5º, § 3º (2 turnos, 3/5 em cada Casa) → equivalente a emenda constitucional.",
      "Tratado de DH aprovado pelo rito comum → supralegal (abaixo da CF, acima das leis).",
      "Tratado comum (não DH) → status de lei ordinária.",
      "Consequência famosa: é ilícita a prisão civil do depositário infiel (Súmula Vinculante 25), por causa do art. 7º, § 7º, do Pacto de São José."
    ],
    "conexoes": [
      "controle-convencionalidade",
      "cdpd",
      "cadh"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "UERJ – RE 466.343",
        "url": "https://www.e-publicacoes.uerj.br/rdcuerj/article/download/11934/11456/50516"
      },
      {
        "label": "PUC-SP – PcD",
        "url": "https://enciclopediajuridica.pucsp.br/verbetes/a-protecao-internacional-dos-direitos-das-pessoas-com-deficiencia-e-a-ordem-internacional/"
      },
      {
        "label": "MPF – racismo",
        "url": "https://www.mpf.mp.br/atuacao/defesa-dos-direitos-do-cidadao/comissoes-e-grupos/comissoes-e-rts/enfrentamento-ao-racismo-e-promocao-da-igualdade-racial/normativas-internacionais-e-nacionais"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Regra atual (STF, RE 466.343, 03/12/2008):**\n  - Tratado de DH aprovado pelo rito do **art. 5º, § 3º** (2 turnos, 3/5 em cada Casa) → **equivalente a emenda constitucional**.\n  - Tratado de DH aprovado pelo rito comum → **supralegal** (abaixo da CF, acima das leis).\n  - Tratado comum (não DH) → status de lei ordinária.\n- **Exemplos com status de emenda:** Convenção sobre os Direitos das Pessoas com Deficiência (primeiro, 2008/2009), Tratado de Marraqueche e Convenção Interamericana contra o Racismo (Decreto 10.932/2022).\n- **Consequência famosa:** é ilícita a prisão civil do depositário infiel (Súmula Vinculante 25), por causa do art. 7º, § 7º, do Pacto de São José.\n- **Conexões:** [[controle-convencionalidade]] · [[cdpd]] · [[cadh]]\n- **Fontes:** [UERJ – RE 466.343](https://www.e-publicacoes.uerj.br/rdcuerj/article/download/11934/11456/50516) · [PUC-SP – PcD](https://enciclopediajuridica.pucsp.br/verbetes/a-protecao-internacional-dos-direitos-das-pessoas-com-deficiencia-e-a-ordem-internacional/) · [MPF – racismo](https://www.mpf.mp.br/atuacao/defesa-dos-direitos-do-cidadao/comissoes-e-grupos/comissoes-e-rts/enfrentamento-ao-racismo-e-promocao-da-igualdade-racial/normativas-internacionais-e-nacionais)"
  },
  {
    "id": "controle-convencionalidade",
    "aliasIds": [],
    "titulo": "Controle de convencionalidade",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Jurista Mateus",
    "npcRole": "juiz",
    "npcSeed": 431018544,
    "oQueE": "O que é: verificar se uma lei interna é compatível com os tratados de DH ratificados (assim como o controle de constitucionalidade compara a lei com a CF). Doutrina desenvolvida pela Corte Interamericana.",
    "exemploPratico": "Exemplo prático: a lei civil que permitia prender o depositário infiel teve a eficácia paralisada por contrariar o Pacto de São José.",
    "fatosChave": [
      "O que é: verificar se uma lei interna é compatível com os tratados de DH ratificados (assim como o controle de constitucionalidade compara a lei com a CF). Doutrina desenvolvida pela Corte Interamericana."
    ],
    "conexoes": [
      "dh-tratados-cf88",
      "sidh"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** verificar se uma lei interna é compatível com os tratados de DH ratificados (assim como o controle de constitucionalidade compara a lei com a CF). Doutrina desenvolvida pela Corte Interamericana.\n- **Exemplo prático:** a lei civil que permitia prender o depositário infiel teve a eficácia paralisada por contrariar o Pacto de São José.\n- **Conexões:** [[dh-tratados-cf88]] · [[sidh]]"
  },
  {
    "id": "dh-interpretacao-colisao",
    "aliasIds": [],
    "titulo": "Interpretação dos tratados e colisão de direitos",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Tabeliã Aurora",
    "npcRole": "juiz",
    "npcSeed": 138914538,
    "oQueE": "Princípio pro persona (pro homine): havendo duas normas, aplica-se a mais favorável à pessoa.",
    "exemploPratico": "",
    "fatosChave": [
      "Princípio pro persona (pro homine): havendo duas normas, aplica-se a mais favorável à pessoa.",
      "Colisão entre direitos: resolvida por ponderação/proporcionalidade no caso concreto (ex.: liberdade de expressão × privacidade).",
      "Conexão TI: liberdade de informação × proteção de dados → lgpd."
    ],
    "conexoes": [
      "lgpd"
    ],
    "avisosOraculo": [
      "Conceito doutrinário; refinar com fonte oficial."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Princípio *pro persona* (pro homine):** havendo duas normas, aplica-se a mais favorável à pessoa.\n- **Colisão entre direitos:** resolvida por **ponderação/proporcionalidade** no caso concreto (ex.: liberdade de expressão × privacidade).\n- **Conexão TI:** liberdade de informação × proteção de dados → [[lgpd]].\n- ⚠️ Conceito doutrinário; refinar com fonte oficial.\n\n---"
  },
  {
    "id": "sidh",
    "aliasIds": [],
    "titulo": "Sistema Interamericano de Proteção",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Tribuno Caio",
    "npcRole": "bibliotecaria",
    "npcSeed": 347756965,
    "oQueE": "O que é: sistema regional da OEA com dois órgãos: Comissão Interamericana (CIDH) e Corte Interamericana (Corte IDH).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: sistema regional da OEA com dois órgãos: Comissão Interamericana (CIDH) e Corte Interamericana (Corte IDH).",
      "Fluxo do caso: vítima → Comissão (petição: esgotar recursos internos, prazo de 6 meses, sem litispendência internacional) → se necessário, a Comissão ou um Estado leva à Corte. A vítima não peticiona direto à Corte.",
      "Brasil: reconheceu a jurisdição contenciosa obrigatória da Corte em 10/12/1998, só para fatos posteriores (Decreto 4.463/2002)."
    ],
    "conexoes": [
      "controle-convencionalidade"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Corte IDH – Estatuto",
        "url": "https://corteidh.or.cr/estatuto.cfm?lang=pt"
      },
      {
        "label": "Regulamento da CIDH",
        "url": "https://www.oas.org/pt/cidh/mandato/basicos/regulamentocidh2013.pdf"
      },
      {
        "label": "PUC-SP – Corte IDH",
        "url": "https://enciclopediajuridica.pucsp.br/verbetes/corte-interamericana-de-direitos-humanos/"
      }
    ],
    "tablePairs": [
      {
        "term": "Criação",
        "definition": "Comissão (CIDH): 1959 (órgão da OEA) · Corte (Corte IDH): Criada pela Convenção Americana; 1ª eleição de juízes em 1979",
        "rawRow": "Criação — 1959 (órgão da OEA) — Criada pela Convenção Americana; 1ª eleição de juízes em 1979"
      },
      {
        "term": "Sede",
        "definition": "Comissão (CIDH): Washington, D.C. · Corte (Corte IDH): San José, Costa Rica",
        "rawRow": "Sede — Washington, D.C. — San José, Costa Rica"
      },
      {
        "term": "Membros",
        "definition": "Comissão (CIDH): 7, a título pessoal · Corte (Corte IDH): 7 juízes, a título pessoal",
        "rawRow": "Membros — 7, a título pessoal — 7 juízes, a título pessoal"
      },
      {
        "term": "Papel",
        "definition": "Comissão (CIDH): Recebe petições individuais, visitas in loco, relatórios, recomendações · Corte (Corte IDH): Órgão jurisdicional: funções contenciosa e consultiva",
        "rawRow": "Papel — Recebe petições individuais, visitas in loco, relatórios, recomendações — Órgão jurisdicional: funções contenciosa e consultiva"
      }
    ],
    "textoCompleto": "- **O que é:** sistema regional da OEA com **dois órgãos**: Comissão Interamericana (CIDH) e Corte Interamericana (Corte IDH).\n\n| | Comissão (CIDH) | Corte (Corte IDH) |\n| --- | --- | --- |\n| Criação | 1959 (órgão da OEA) | Criada pela Convenção Americana; 1ª eleição de juízes em 1979 |\n| Sede | Washington, D.C. | San José, Costa Rica |\n| Membros | 7, a título pessoal | 7 juízes, a título pessoal |\n| Papel | Recebe petições individuais, visitas *in loco*, relatórios, recomendações | Órgão jurisdicional: funções contenciosa e consultiva |\n\n- **Fluxo do caso:** vítima → **Comissão** (petição: esgotar recursos internos, prazo de 6 meses, sem litispendência internacional) → se necessário, a Comissão ou um Estado leva à **Corte**. A vítima não peticiona direto à Corte.\n- **Brasil:** reconheceu a jurisdição contenciosa obrigatória da Corte em **10/12/1998**, só para fatos posteriores (Decreto 4.463/2002).\n- **Fontes:** [Corte IDH – Estatuto](https://corteidh.or.cr/estatuto.cfm?lang=pt) · [Regulamento da CIDH](https://www.oas.org/pt/cidh/mandato/basicos/regulamentocidh2013.pdf) · [PUC-SP – Corte IDH](https://enciclopediajuridica.pucsp.br/verbetes/corte-interamericana-de-direitos-humanos/)"
  },
  {
    "id": "dh-grupos-vulneraveis",
    "aliasIds": [],
    "titulo": "Direitos humanos em espécie e grupos vulneráveis",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Mediadora Laura",
    "npcRole": "juiz",
    "npcSeed": 1646684829,
    "oQueE": "Lista do edital: mulher, população negra, criança e adolescente, idoso, pessoa com deficiência, pessoas em situação de rua, povos indígenas, LGBT, quilombolas, sem-teto, sem-terra, imigrantes e refugiados.",
    "exemploPratico": "",
    "fatosChave": [
      "Lista do edital: mulher, população negra, criança e adolescente, idoso, pessoa com deficiência, pessoas em situação de rua, povos indígenas, LGBT, quilombolas, sem-teto, sem-terra, imigrantes e refugiados.",
      "Como estudar: ligue cada grupo ao seu tratado: mulher → cedaw; negros → cerd; criança → cdc; PcD → cdpd; indígenas → dnudpi (+ Convenção 169 da OIT, Decreto 5.051/2004)."
    ],
    "conexoes": [
      "cedaw",
      "cerd",
      "cdc",
      "cdpd",
      "dnudpi",
      "res-cnj-351-2020",
      "res-csjt-360-2023"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Lista do edital:** mulher, população negra, criança e adolescente, idoso, pessoa com deficiência, pessoas em situação de rua, povos indígenas, LGBT, quilombolas, sem-teto, sem-terra, imigrantes e refugiados.\n- **Como estudar:** ligue cada grupo ao seu tratado: mulher → [[cedaw]]; negros → [[cerd]]; criança → [[cdc]]; PcD → [[cdpd]]; indígenas → [[dnudpi]] (+ Convenção 169 da OIT, Decreto 5.051/2004).\n- **Conexões com Legislação:** a definição de discriminação da [[res-cnj-351-2020]] e da [[res-csjt-360-2023]] lista esses mesmos critérios (raça, gênero, deficiência, orientação sexual etc.)."
  },
  {
    "id": "res-cnj-492-2023",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 492/2023 — Perspectiva de Gênero",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Pregoeiro Miguel",
    "npcRole": "juiz",
    "npcSeed": 1504255047,
    "oQueE": "O que é: torna obrigatórias as diretrizes do Protocolo para Julgamento com Perspectiva de Gênero (criado pelo GT da Portaria CNJ 27/2021) em todo o Judiciário.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: torna obrigatórias as diretrizes do Protocolo para Julgamento com Perspectiva de Gênero (criado pelo GT da Portaria CNJ 27/2021) em todo o Judiciário.",
      "Capacitação obrigatória de magistrados em direitos humanos, gênero, raça e etnia, em perspectiva interseccional.",
      "Cria o Comitê de Acompanhamento e Capacitação sobre Julgamento com Perspectiva de Gênero.",
      "Cria o Comitê de Incentivo à Participação Institucional Feminina no Poder Judiciário (ligado à Política da Res. CNJ 255/2018)."
    ],
    "conexoes": [
      "res-cnj-351-2020"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 492/2023 – atos.cnj.jus.br",
        "url": "https://atos.cnj.jus.br/atos/detalhar/4986"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** torna **obrigatórias** as diretrizes do **Protocolo para Julgamento com Perspectiva de Gênero** (criado pelo GT da Portaria CNJ 27/2021) em todo o Judiciário.\n- **Pontos-chave:**\n  - Capacitação obrigatória de magistrados em direitos humanos, gênero, raça e etnia, em perspectiva interseccional.\n  - Cria o **Comitê de Acompanhamento e Capacitação sobre Julgamento com Perspectiva de Gênero**.\n  - Cria o **Comitê de Incentivo à Participação Institucional Feminina no Poder Judiciário** (ligado à Política da Res. CNJ 255/2018).\n- **Fonte:** [Resolução 492/2023 – atos.cnj.jus.br](https://atos.cnj.jus.br/atos/detalhar/4986)"
  },
  {
    "id": "res-csjt-368-2023",
    "aliasIds": [],
    "titulo": "Resolução CSJT nº 368/2023 — Programa de Equidade de Raça, Gênero e Diversidade",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Curadora Elisa",
    "npcRole": "bibliotecaria",
    "npcSeed": 1111792960,
    "oQueE": "O que é: programa da Justiça do Trabalho para promover equidade de raça, gênero, etnia, orientação sexual, identidade de gênero, idade e pessoas com deficiência (art. 1º).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: programa da Justiça do Trabalho para promover equidade de raça, gênero, etnia, orientação sexual, identidade de gênero, idade e pessoas com deficiência (art. 1º).",
      "Princípios (art. 3º, destaques): dignidade da pessoa humana; igualdade, não discriminação e diversidade; ...; laicidade do Estado.",
      "Estrutura: Comitê Gestor Nacional no CSJT (presidido pelo Presidente do CSJT, art. 6º) e Comitê Gestor Regional em cada TRT, criado em até 90 dias (art. 8º)."
    ],
    "conexoes": [
      "res-csjt-360-2023"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução CSJT 368/2023 (PDF)",
        "url": "https://juslaboris.tst.jus.br/bitstream/handle/20.500.12178/223823/2023_res0368_csjt.pdf?sequence=4"
      },
      {
        "label": "CSJT – gestores",
        "url": "https://www.csjt.jus.br/web/equidade/gestores"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** programa da Justiça do Trabalho para promover equidade de raça, gênero, etnia, orientação sexual, identidade de gênero, idade e pessoas com deficiência (art. 1º).\n- **Princípios (art. 3º, destaques):** dignidade da pessoa humana; igualdade, não discriminação e diversidade; ...; **laicidade do Estado**.\n- **Estrutura:** **Comitê Gestor Nacional** no CSJT (presidido pelo Presidente do CSJT, art. 6º) e **Comitê Gestor Regional** em cada TRT, criado em até **90 dias** (art. 8º).\n- **Fonte:** [Resolução CSJT 368/2023 (PDF)](https://juslaboris.tst.jus.br/bitstream/handle/20.500.12178/223823/2023_res0368_csjt.pdf?sequence=4) · [CSJT – gestores](https://www.csjt.jus.br/web/equidade/gestores)\n\n---"
  },
  {
    "id": "carta-onu",
    "aliasIds": [],
    "titulo": "Carta da ONU + Estatuto da Corte Internacional de Justiça",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Sábia Virgínia",
    "npcRole": "juiz",
    "npcSeed": 1068839295,
    "oQueE": "Carta da ONU + Estatuto da Corte Internacional de Justiça: Cria a ONU; a CIJ é seu órgão judicial. Adoção: 1945. No Brasil: Decreto 19.841/1945.",
    "exemploPratico": "Instrumento internacional adotado em 1945 (Decreto 19.841/1945).",
    "fatosChave": [
      "Carta da ONU + Estatuto da Corte Internacional de Justiça — Cria a ONU; a CIJ é seu órgão judicial",
      "Carta da ONU + Estatuto da Corte Internacional de Justiça — Adoção: 1945",
      "Carta da ONU + Estatuto da Corte Internacional de Justiça — Promulgação/Status no Brasil: Decreto 19.841/1945"
    ],
    "conexoes": [
      "dh-evolucao-fundamentos"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      }
    ],
    "tablePairs": [
      {
        "term": "Carta da ONU + Estatuto da Corte Internacional de Justiça",
        "definition": "Cria a ONU; a CIJ é seu órgão judicial",
        "rawRow": "Carta da ONU + Estatuto da Corte Internacional de Justiça (1945 · Decreto 19.841/1945) — Cria a ONU; a CIJ é seu órgão judicial"
      },
      {
        "term": "Carta da ONU + Estatuto da Corte Internacional de Justiça (Brasil)",
        "definition": "Decreto 19.841/1945",
        "rawRow": "Carta da ONU + Estatuto da Corte Internacional de Justiça — Brasil: Decreto 19.841/1945"
      },
      {
        "term": "Carta da ONU + Estatuto da Corte Internacional de Justiça (Adoção)",
        "definition": "1945",
        "rawRow": "Carta da ONU + Estatuto da Corte Internacional de Justiça — Adoção: 1945"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[carta-onu]] | Carta da ONU + Estatuto da Corte Internacional de Justiça | 1945 | Decreto 19.841/1945 | Cria a ONU; a CIJ é seu órgão judicial |"
  },
  {
    "id": "dudh",
    "aliasIds": [],
    "titulo": "Declaração Universal dos Direitos Humanos",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Magistrada Beatriz II",
    "npcRole": "juiz",
    "npcSeed": 1136721666,
    "oQueE": "Declaração Universal dos Direitos Humanos: Base do sistema; \"todos nascem livres e iguais em dignidade e direitos\". Adoção: 10/12/1948, Res. 217 A (III). No Brasil: — (declaração, não precisa ratificar).",
    "exemploPratico": "Instrumento internacional adotado em 10/12/1948, Res. 217 A (III) (— (declaração, não precisa ratificar)).",
    "fatosChave": [
      "Declaração Universal dos Direitos Humanos — Base do sistema; \"todos nascem livres e iguais em dignidade e direitos\"",
      "Declaração Universal dos Direitos Humanos — Adoção: 10/12/1948, Res. 217 A (III)",
      "Declaração Universal dos Direitos Humanos — Promulgação/Status no Brasil: — (declaração, não precisa ratificar)"
    ],
    "conexoes": [
      "dh-evolucao-fundamentos",
      "dh-caracteristicas"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "DUDH – UNICEF",
        "url": "https://www.unicef.org/brazil/declaracao-universal-dos-direitos-humanos"
      }
    ],
    "tablePairs": [
      {
        "term": "Declaração Universal dos Direitos Humanos",
        "definition": "Base do sistema; \"todos nascem livres e iguais em dignidade e direitos\"",
        "rawRow": "Declaração Universal dos Direitos Humanos (10/12/1948, Res. 217 A (III) · — (declaração, não precisa ratificar)) — Base do sistema; \"todos nascem livres e iguais em dignidade e direitos\""
      },
      {
        "term": "Declaração Universal dos Direitos Humanos (Brasil)",
        "definition": "— (declaração, não precisa ratificar)",
        "rawRow": "Declaração Universal dos Direitos Humanos — Brasil: — (declaração, não precisa ratificar)"
      },
      {
        "term": "Declaração Universal dos Direitos Humanos (Adoção)",
        "definition": "10/12/1948, Res. 217 A (III)",
        "rawRow": "Declaração Universal dos Direitos Humanos — Adoção: 10/12/1948, Res. 217 A (III)"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[dudh]] | Declaração Universal dos Direitos Humanos | 10/12/1948, Res. 217 A (III) | — (declaração, não precisa ratificar) | Base do sistema; \"todos nascem livres e iguais em dignidade e direitos\" |"
  },
  {
    "id": "pidcp",
    "aliasIds": [],
    "titulo": "Pacto Internacional dos Direitos Civis e Políticos",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Escrivão Antônio II",
    "npcRole": "sabio",
    "npcSeed": 1797616103,
    "oQueE": "Pacto Internacional dos Direitos Civis e Políticos: Direitos de 1ª geração. Adoção: 16/12/1966. No Brasil: Decreto 592/1992.",
    "exemploPratico": "PIDCP e PIDESC: Carta de Adesão do Brasil depositada em 24/01/1992; vigência para o Brasil em 24/04/1992.",
    "fatosChave": [
      "Pacto Internacional dos Direitos Civis e Políticos — Direitos de 1ª geração",
      "Pacto Internacional dos Direitos Civis e Políticos — Adoção: 16/12/1966",
      "Pacto Internacional dos Direitos Civis e Políticos — Promulgação/Status no Brasil: Decreto 592/1992",
      "PIDCP e PIDESC: Carta de Adesão do Brasil depositada em 24/01/1992; vigência para o Brasil em 24/04/1992."
    ],
    "conexoes": [
      "dh-geracoes",
      "dh-caracteristicas",
      "cadh",
      "san-salvador"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 592/1992",
        "url": "https://planalto.gov.br/ccivil_03/decreto/1990-1994/D0592.htm"
      }
    ],
    "tablePairs": [
      {
        "term": "Pacto Internacional dos Direitos Civis e Políticos",
        "definition": "Direitos de 1ª geração",
        "rawRow": "Pacto Internacional dos Direitos Civis e Políticos (16/12/1966 · Decreto 592/1992) — Direitos de 1ª geração"
      },
      {
        "term": "Pacto Internacional dos Direitos Civis e Políticos (Brasil)",
        "definition": "Decreto 592/1992",
        "rawRow": "Pacto Internacional dos Direitos Civis e Políticos — Brasil: Decreto 592/1992"
      },
      {
        "term": "Pacto Internacional dos Direitos Civis e Políticos (Adoção)",
        "definition": "16/12/1966",
        "rawRow": "Pacto Internacional dos Direitos Civis e Políticos — Adoção: 16/12/1966"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[pidcp]] | Pacto Internacional dos Direitos Civis e Políticos | 16/12/1966 | Decreto 592/1992 | Direitos de 1ª geração |\n- PIDCP e PIDESC: Carta de Adesão do Brasil depositada em 24/01/1992; vigência para o Brasil em 24/04/1992."
  },
  {
    "id": "pidesc",
    "aliasIds": [],
    "titulo": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Juiz Valério II",
    "npcRole": "juiz",
    "npcSeed": 734544435,
    "oQueE": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais: Direitos de 2ª geração; realização progressiva. Adoção: 16/12/1966. No Brasil: Decreto 591/1992.",
    "exemploPratico": "PIDCP e PIDESC: Carta de Adesão do Brasil depositada em 24/01/1992; vigência para o Brasil em 24/04/1992.",
    "fatosChave": [
      "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais — Direitos de 2ª geração; realização progressiva",
      "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais — Adoção: 16/12/1966",
      "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais — Promulgação/Status no Brasil: Decreto 591/1992",
      "PIDCP e PIDESC: Carta de Adesão do Brasil depositada em 24/01/1992; vigência para o Brasil em 24/04/1992."
    ],
    "conexoes": [
      "dh-geracoes",
      "cadh",
      "san-salvador"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 591/1992",
        "url": "https://planalto.gov.br/ccivil_03/decreto/1990-1994/D0591.htm"
      }
    ],
    "tablePairs": [
      {
        "term": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais",
        "definition": "Direitos de 2ª geração; realização progressiva",
        "rawRow": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais (16/12/1966 · Decreto 591/1992) — Direitos de 2ª geração; realização progressiva"
      },
      {
        "term": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais (Brasil)",
        "definition": "Decreto 591/1992",
        "rawRow": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais — Brasil: Decreto 591/1992"
      },
      {
        "term": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais (Adoção)",
        "definition": "16/12/1966",
        "rawRow": "Pacto Internacional dos Direitos Econômicos, Sociais e Culturais — Adoção: 16/12/1966"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[pidesc]] | Pacto Internacional dos Direitos Econômicos, Sociais e Culturais | 16/12/1966 | Decreto 591/1992 | Direitos de 2ª geração; realização progressiva |\n- PIDCP e PIDESC: Carta de Adesão do Brasil depositada em 24/01/1992; vigência para o Brasil em 24/04/1992."
  },
  {
    "id": "cerd",
    "aliasIds": [],
    "titulo": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Conselheira Clara II",
    "npcRole": "bibliotecaria",
    "npcSeed": 1018219219,
    "oQueE": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial: Define discriminação racial; permite ações afirmativas temporárias. Adoção: 1965 (assinatura em 07/03/1966). No Brasil: Decreto 65.810/1969.",
    "exemploPratico": "Instrumento internacional adotado em 1965 (assinatura em 07/03/1966) (Decreto 65.810/1969).",
    "fatosChave": [
      "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial — Define discriminação racial; permite ações afirmativas temporárias",
      "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial — Adoção: 1965 (assinatura em 07/03/1966)",
      "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial — Promulgação/Status no Brasil: Decreto 65.810/1969"
    ],
    "conexoes": [
      "dh-grupos-vulneraveis"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 65.810/1969",
        "url": "https://www.planalto.gov.br/ccivil_03/decreto/1950-1969/d65810.html"
      }
    ],
    "tablePairs": [
      {
        "term": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial",
        "definition": "Define discriminação racial; permite ações afirmativas temporárias",
        "rawRow": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial (1965 (assinatura em 07/03/1966) · Decreto 65.810/1969) — Define discriminação racial; permite ações afirmativas temporárias"
      },
      {
        "term": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial (Brasil)",
        "definition": "Decreto 65.810/1969",
        "rawRow": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial — Brasil: Decreto 65.810/1969"
      },
      {
        "term": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial (Adoção)",
        "definition": "1965 (assinatura em 07/03/1966)",
        "rawRow": "Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial — Adoção: 1965 (assinatura em 07/03/1966)"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[cerd]] | Convenção sobre a Eliminação de Todas as Formas de Discriminação Racial | 1965 (assinatura em 07/03/1966) | Decreto 65.810/1969 | Define discriminação racial; permite ações afirmativas temporárias |"
  },
  {
    "id": "cedaw",
    "aliasIds": [],
    "titulo": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Ouvidora Helena II",
    "npcRole": "sabio",
    "npcSeed": 1847380355,
    "oQueE": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher: Igualdade de gênero. Adoção: 18/12/1979. No Brasil: Decreto 4.377/2002.",
    "exemploPratico": "CEDAW: o decreto de 2002 revogou o Decreto 89.460/1984 (a versão antiga tinha reservas).",
    "fatosChave": [
      "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher — Igualdade de gênero",
      "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher — Adoção: 18/12/1979",
      "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher — Promulgação/Status no Brasil: Decreto 4.377/2002",
      "CEDAW: o decreto de 2002 revogou o Decreto 89.460/1984 (a versão antiga tinha reservas)."
    ],
    "conexoes": [
      "dh-grupos-vulneraveis"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 4.377/2002",
        "url": "https://www.planalto.gov.br/ccivil_03/decreto/2002/d4377.htm"
      }
    ],
    "tablePairs": [
      {
        "term": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher",
        "definition": "Igualdade de gênero",
        "rawRow": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (18/12/1979 · Decreto 4.377/2002) — Igualdade de gênero"
      },
      {
        "term": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (Brasil)",
        "definition": "Decreto 4.377/2002",
        "rawRow": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher — Brasil: Decreto 4.377/2002"
      },
      {
        "term": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher (Adoção)",
        "definition": "18/12/1979",
        "rawRow": "Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher — Adoção: 18/12/1979"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[cedaw]] | Convenção sobre a Eliminação de Todas as Formas de Discriminação contra a Mulher | 18/12/1979 | Decreto 4.377/2002 | Igualdade de gênero |\n- CEDAW: o decreto de 2002 revogou o Decreto 89.460/1984 (a versão antiga tinha reservas)."
  },
  {
    "id": "cdc",
    "aliasIds": [],
    "titulo": "Convenção sobre os Direitos da Criança",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Desembargador Lúcio II",
    "npcRole": "bibliotecaria",
    "npcSeed": 478383181,
    "oQueE": "Convenção sobre os Direitos da Criança: Proteção integral. Adoção: 20/11/1989. No Brasil: Decreto 99.710/1990.",
    "exemploPratico": "Instrumento internacional adotado em 20/11/1989 (Decreto 99.710/1990).",
    "fatosChave": [
      "Convenção sobre os Direitos da Criança — Proteção integral",
      "Convenção sobre os Direitos da Criança — Adoção: 20/11/1989",
      "Convenção sobre os Direitos da Criança — Promulgação/Status no Brasil: Decreto 99.710/1990"
    ],
    "conexoes": [
      "dh-grupos-vulneraveis"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      }
    ],
    "tablePairs": [
      {
        "term": "Convenção sobre os Direitos da Criança",
        "definition": "Proteção integral",
        "rawRow": "Convenção sobre os Direitos da Criança (20/11/1989 · Decreto 99.710/1990) — Proteção integral"
      },
      {
        "term": "Convenção sobre os Direitos da Criança (Brasil)",
        "definition": "Decreto 99.710/1990",
        "rawRow": "Convenção sobre os Direitos da Criança — Brasil: Decreto 99.710/1990"
      },
      {
        "term": "Convenção sobre os Direitos da Criança (Adoção)",
        "definition": "20/11/1989",
        "rawRow": "Convenção sobre os Direitos da Criança — Adoção: 20/11/1989"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[cdc]] | Convenção sobre os Direitos da Criança | 20/11/1989 | Decreto 99.710/1990 | Proteção integral |"
  },
  {
    "id": "cdpd",
    "aliasIds": [],
    "titulo": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Procuradora Sofia II",
    "npcRole": "bibliotecaria",
    "npcSeed": 233593258,
    "oQueE": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo: 1º tratado com status de emenda constitucional. Adoção: 2006 (assinada em 30/03/2007). No Brasil: Decreto 6.949/2009 (DL 186/2008).",
    "exemploPratico": "CDPD: aprovada pelo rito do art. 5º, § 3º → status de emenda constitucional.",
    "fatosChave": [
      "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo — 1º tratado com status de emenda constitucional",
      "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo — Adoção: 2006 (assinada em 30/03/2007)",
      "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo — Promulgação/Status no Brasil: Decreto 6.949/2009 (DL 186/2008)",
      "CDPD: aprovada pelo rito do art. 5º, § 3º → status de emenda constitucional."
    ],
    "conexoes": [
      "dh-tratados-cf88",
      "dh-grupos-vulneraveis"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 6.949/2009",
        "url": "https://planalto.gov.br/ccivil_03/_ato2007-2010/2009/decreto/d6949.htm"
      }
    ],
    "tablePairs": [
      {
        "term": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo",
        "definition": "1º tratado com status de emenda constitucional",
        "rawRow": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo (2006 (assinada em 30/03/2007) · Decreto 6.949/2009 (DL 186/2008)) — 1º tratado com status de emenda constitucional"
      },
      {
        "term": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo (Brasil)",
        "definition": "Decreto 6.949/2009 (DL 186/2008)",
        "rawRow": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo — Brasil: Decreto 6.949/2009 (DL 186/2008)"
      },
      {
        "term": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo (Adoção)",
        "definition": "2006 (assinada em 30/03/2007)",
        "rawRow": "Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo — Adoção: 2006 (assinada em 30/03/2007)"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[cdpd]] | Convenção sobre os Direitos das Pessoas com Deficiência + Protocolo | 2006 (assinada em 30/03/2007) | Decreto 6.949/2009 (DL 186/2008) | **1º tratado com status de emenda constitucional** |\n- CDPD: aprovada pelo rito do art. 5º, § 3º → status de emenda constitucional."
  },
  {
    "id": "patrimonio-mundial",
    "aliasIds": [],
    "titulo": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO)",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Oficial Rodrigo II",
    "npcRole": "juiz",
    "npcSeed": 566851140,
    "oQueE": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO): Bens de valor excepcional para a humanidade. Adoção: Paris, 1972. No Brasil: Decreto 80.978/1977.",
    "exemploPratico": "Instrumento internacional adotado em Paris, 1972 (Decreto 80.978/1977).",
    "fatosChave": [
      "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) — Bens de valor excepcional para a humanidade",
      "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) — Adoção: Paris, 1972",
      "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) — Promulgação/Status no Brasil: Decreto 80.978/1977"
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Atenção ao edital: ele escreve \"Convenção relativa à proteção do patrimônio mundial, cultural e natural — Declaração de Estocolmo\". A Convenção do Patrimônio é de Paris, 1972 (UNESCO); a \"Declaração de Estocolmo\" (1972) é outro documento, sobre meio ambiente humano. Saiba os dois."
    ],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 80.978/1977",
        "url": "https://www2.camara.leg.br/legin/fed/decret/1970-1979/decreto-80978-12-dezembro-1977-430277-norma-pe.html"
      }
    ],
    "tablePairs": [
      {
        "term": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO)",
        "definition": "Bens de valor excepcional para a humanidade",
        "rawRow": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) (Paris, 1972 · Decreto 80.978/1977) — Bens de valor excepcional para a humanidade"
      },
      {
        "term": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) (Brasil)",
        "definition": "Decreto 80.978/1977",
        "rawRow": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) — Brasil: Decreto 80.978/1977"
      },
      {
        "term": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) (Adoção)",
        "definition": "Paris, 1972",
        "rawRow": "Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) — Adoção: Paris, 1972"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[patrimonio-mundial]] | Convenção Relativa à Proteção do Patrimônio Mundial, Cultural e Natural (UNESCO) | Paris, 1972 | Decreto 80.978/1977 | Bens de valor excepcional para a humanidade |\n- ⚠️ Atenção ao edital: ele escreve \"Convenção relativa à proteção do patrimônio mundial, cultural e natural — Declaração de Estocolmo\". A Convenção do Patrimônio é de Paris, 1972 (UNESCO); a \"Declaração de Estocolmo\" (1972) é outro documento, sobre meio ambiente humano. Saiba os dois."
  },
  {
    "id": "cdb",
    "aliasIds": [],
    "titulo": "Convenção sobre Diversidade Biológica",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Relatora Lívia II",
    "npcRole": "juiz",
    "npcSeed": 495160800,
    "oQueE": "Convenção sobre Diversidade Biológica: Conservação e uso sustentável da biodiversidade. Adoção: Rio de Janeiro, 05/06/1992. No Brasil: Decreto 2.519/1998.",
    "exemploPratico": "Instrumento internacional adotado em Rio de Janeiro, 05/06/1992 (Decreto 2.519/1998).",
    "fatosChave": [
      "Convenção sobre Diversidade Biológica — Conservação e uso sustentável da biodiversidade",
      "Convenção sobre Diversidade Biológica — Adoção: Rio de Janeiro, 05/06/1992",
      "Convenção sobre Diversidade Biológica — Promulgação/Status no Brasil: Decreto 2.519/1998"
    ],
    "conexoes": [
      "dh-geracoes"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 2.519/1998",
        "url": "https://www2.camara.leg.br/legin/fed/decret/1998/decreto-2519-16-marco-1998-437336-norma-pe.html"
      }
    ],
    "tablePairs": [
      {
        "term": "Convenção sobre Diversidade Biológica",
        "definition": "Conservação e uso sustentável da biodiversidade",
        "rawRow": "Convenção sobre Diversidade Biológica (Rio de Janeiro, 05/06/1992 · Decreto 2.519/1998) — Conservação e uso sustentável da biodiversidade"
      },
      {
        "term": "Convenção sobre Diversidade Biológica (Brasil)",
        "definition": "Decreto 2.519/1998",
        "rawRow": "Convenção sobre Diversidade Biológica — Brasil: Decreto 2.519/1998"
      },
      {
        "term": "Convenção sobre Diversidade Biológica (Adoção)",
        "definition": "Rio de Janeiro, 05/06/1992",
        "rawRow": "Convenção sobre Diversidade Biológica — Adoção: Rio de Janeiro, 05/06/1992"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[cdb]] | Convenção sobre Diversidade Biológica | Rio de Janeiro, 05/06/1992 | Decreto 2.519/1998 | Conservação e uso sustentável da biodiversidade |"
  },
  {
    "id": "dnudpi",
    "aliasIds": [],
    "titulo": "Declaração da ONU sobre os Direitos dos Povos Indígenas",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Jurista Mateus II",
    "npcRole": "bibliotecaria",
    "npcSeed": 1634696449,
    "oQueE": "Declaração da ONU sobre os Direitos dos Povos Indígenas: Autodeterminação; consentimento livre, prévio e informado. Adoção: 13/09/2007 (Res. 61/295). No Brasil: — (declaração).",
    "exemploPratico": "Instrumento internacional adotado em 13/09/2007 (Res. 61/295) (— (declaração)).",
    "fatosChave": [
      "Declaração da ONU sobre os Direitos dos Povos Indígenas — Autodeterminação; consentimento livre, prévio e informado",
      "Declaração da ONU sobre os Direitos dos Povos Indígenas — Adoção: 13/09/2007 (Res. 61/295)",
      "Declaração da ONU sobre os Direitos dos Povos Indígenas — Promulgação/Status no Brasil: — (declaração)"
    ],
    "conexoes": [
      "dh-grupos-vulneraveis"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "DNUDPI – FUNAI",
        "url": "https://www.gov.br/funai/pt-br/arquivos/conteudo/ascom/2016/doc/declaracao.pdf"
      }
    ],
    "tablePairs": [
      {
        "term": "Declaração da ONU sobre os Direitos dos Povos Indígenas",
        "definition": "Autodeterminação; consentimento livre, prévio e informado",
        "rawRow": "Declaração da ONU sobre os Direitos dos Povos Indígenas (13/09/2007 (Res. 61/295) · — (declaração)) — Autodeterminação; consentimento livre, prévio e informado"
      },
      {
        "term": "Declaração da ONU sobre os Direitos dos Povos Indígenas (Brasil)",
        "definition": "— (declaração)",
        "rawRow": "Declaração da ONU sobre os Direitos dos Povos Indígenas — Brasil: — (declaração)"
      },
      {
        "term": "Declaração da ONU sobre os Direitos dos Povos Indígenas (Adoção)",
        "definition": "13/09/2007 (Res. 61/295)",
        "rawRow": "Declaração da ONU sobre os Direitos dos Povos Indígenas — Adoção: 13/09/2007 (Res. 61/295)"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[dnudpi]] | Declaração da ONU sobre os Direitos dos Povos Indígenas | 13/09/2007 (Res. 61/295) | — (declaração) | Autodeterminação; consentimento livre, prévio e informado |"
  },
  {
    "id": "tpi",
    "aliasIds": [],
    "titulo": "Estatuto de Roma do Tribunal Penal Internacional",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Tabeliã Aurora II",
    "npcRole": "juiz",
    "npcSeed": 1742598720,
    "oQueE": "Estatuto de Roma do Tribunal Penal Internacional: Julga pessoas por genocídio, crimes contra a humanidade, de guerra e agressão. Adoção: 17/07/1998. No Brasil: Decreto 4.388/2002.",
    "exemploPratico": "Estatuto de Roma: vigência internacional em 01/07/2002 e para o Brasil em 01/09/2002; o TPI é complementar às jurisdições nacionais (só atua se o Estado não quiser ou não puder julgar).",
    "fatosChave": [
      "Estatuto de Roma do Tribunal Penal Internacional — Julga pessoas por genocídio, crimes contra a humanidade, de guerra e agressão",
      "Estatuto de Roma do Tribunal Penal Internacional — Adoção: 17/07/1998",
      "Estatuto de Roma do Tribunal Penal Internacional — Promulgação/Status no Brasil: Decreto 4.388/2002",
      "Estatuto de Roma: vigência internacional em 01/07/2002 e para o Brasil em 01/09/2002; o TPI é complementar às jurisdições nacionais (só atua se o Estado não quiser ou não puder julgar)."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CNJ – atos multilaterais (tabela de decretos)",
        "url": "https://www.cnj.jus.br/atos-multilaterais/"
      },
      {
        "label": "Decreto 4.388/2002",
        "url": "https://planalto.gov.br/ccivil_03/decreto/2002/d4388.htm"
      }
    ],
    "tablePairs": [
      {
        "term": "Estatuto de Roma do Tribunal Penal Internacional",
        "definition": "Julga pessoas por genocídio, crimes contra a humanidade, de guerra e agressão",
        "rawRow": "Estatuto de Roma do Tribunal Penal Internacional (17/07/1998 · Decreto 4.388/2002) — Julga pessoas por genocídio, crimes contra a humanidade, de guerra e agressão"
      },
      {
        "term": "Estatuto de Roma do Tribunal Penal Internacional (Brasil)",
        "definition": "Decreto 4.388/2002",
        "rawRow": "Estatuto de Roma do Tribunal Penal Internacional — Brasil: Decreto 4.388/2002"
      },
      {
        "term": "Estatuto de Roma do Tribunal Penal Internacional (Adoção)",
        "definition": "17/07/1998",
        "rawRow": "Estatuto de Roma do Tribunal Penal Internacional — Adoção: 17/07/1998"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Adoção | Brasil | Ideia central |\n| [[tpi]] | Estatuto de Roma do Tribunal Penal Internacional | 17/07/1998 | Decreto 4.388/2002 | Julga pessoas por genocídio, crimes contra a humanidade, de guerra e agressão |\n- Estatuto de Roma: vigência internacional em 01/07/2002 e para o Brasil em 01/09/2002; o TPI é complementar às jurisdições nacionais (só atua se o Estado não quiser ou não puder julgar)."
  },
  {
    "id": "dadh",
    "aliasIds": [],
    "titulo": "Declaração Americana dos Direitos e Deveres do Homem",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Tribuno Caio II",
    "npcRole": "sabio",
    "npcSeed": 6672518,
    "oQueE": "Declaração Americana dos Direitos e Deveres do Homem: Primeiro documento regional; anterior à DUDH. Data: 1948. No Brasil: — (declaração).",
    "exemploPratico": "Instrumento internacional adotado em 1948 (— (declaração)).",
    "fatosChave": [
      "Declaração Americana dos Direitos e Deveres do Homem — Primeiro documento regional; anterior à DUDH",
      "Declaração Americana dos Direitos e Deveres do Homem — Data: 1948",
      "Declaração Americana dos Direitos e Deveres do Homem — Promulgação/Status no Brasil: — (declaração)"
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [
      {
        "term": "Declaração Americana dos Direitos e Deveres do Homem",
        "definition": "Primeiro documento regional; anterior à DUDH",
        "rawRow": "Declaração Americana dos Direitos e Deveres do Homem (1948 · — (declaração)) — Primeiro documento regional; anterior à DUDH"
      },
      {
        "term": "Declaração Americana dos Direitos e Deveres do Homem (Brasil)",
        "definition": "— (declaração)",
        "rawRow": "Declaração Americana dos Direitos e Deveres do Homem — Brasil: — (declaração)"
      },
      {
        "term": "Declaração Americana dos Direitos e Deveres do Homem (Data)",
        "definition": "1948",
        "rawRow": "Declaração Americana dos Direitos e Deveres do Homem — Data: 1948"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Data | Brasil | Ideia central |\n| [[dadh]] | Declaração Americana dos Direitos e Deveres do Homem | 1948 | — (declaração) | Primeiro documento regional; anterior à DUDH |"
  },
  {
    "id": "cadh",
    "aliasIds": [],
    "titulo": "Convenção Americana (Pacto de São José da Costa Rica)",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Mediadora Laura II",
    "npcRole": "sabio",
    "npcSeed": 1207627091,
    "oQueE": "Convenção Americana (Pacto de São José da Costa Rica): Direitos civis e políticos; cria a Corte IDH. Data: 22/11/1969, vigência em 18/07/1978. No Brasil: Decreto 678/1992 (adesão em 25/09/1992).",
    "exemploPratico": "Instrumento internacional adotado em 22/11/1969, vigência em 18/07/1978 (Decreto 678/1992 (adesão em 25/09/1992)).",
    "fatosChave": [
      "Convenção Americana (Pacto de São José da Costa Rica) — Direitos civis e políticos; cria a Corte IDH",
      "Convenção Americana (Pacto de São José da Costa Rica) — Data: 22/11/1969, vigência em 18/07/1978",
      "Convenção Americana (Pacto de São José da Costa Rica) — Promulgação/Status no Brasil: Decreto 678/1992 (adesão em 25/09/1992)"
    ],
    "conexoes": [
      "pidcp",
      "pidesc",
      "san-salvador"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [
      {
        "term": "Convenção Americana (Pacto de São José da Costa Rica)",
        "definition": "Direitos civis e políticos; cria a Corte IDH",
        "rawRow": "Convenção Americana (Pacto de São José da Costa Rica) (22/11/1969, vigência em 18/07/1978 · Decreto 678/1992 (adesão em 25/09/1992)) — Direitos civis e políticos; cria a Corte IDH"
      },
      {
        "term": "Convenção Americana (Pacto de São José da Costa Rica) (Brasil)",
        "definition": "Decreto 678/1992 (adesão em 25/09/1992)",
        "rawRow": "Convenção Americana (Pacto de São José da Costa Rica) — Brasil: Decreto 678/1992 (adesão em 25/09/1992)"
      },
      {
        "term": "Convenção Americana (Pacto de São José da Costa Rica) (Data)",
        "definition": "22/11/1969, vigência em 18/07/1978",
        "rawRow": "Convenção Americana (Pacto de São José da Costa Rica) — Data: 22/11/1969, vigência em 18/07/1978"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Data | Brasil | Ideia central |\n| [[cadh]] | Convenção Americana (Pacto de São José da Costa Rica) | 22/11/1969, vigência em 18/07/1978 | Decreto 678/1992 (adesão em 25/09/1992) | Direitos civis e políticos; cria a Corte IDH |"
  },
  {
    "id": "san-salvador",
    "aliasIds": [],
    "titulo": "Protocolo de San Salvador (DESC)",
    "zonaId": "02-nocoes-de-direitos-humanos",
    "regiaoId": "reino-da-toga",
    "materia": "Noções de Direitos Humanos",
    "cargo": "ambos",
    "npcName": "Pregoeiro Miguel II",
    "npcRole": "sabio",
    "npcSeed": 884487902,
    "oQueE": "Protocolo de San Salvador (DESC): Direitos econômicos, sociais e culturais no sistema regional. Data: 17/11/1988. No Brasil: Decreto 3.321/1999.",
    "exemploPratico": "Instrumento internacional adotado em 17/11/1988 (Decreto 3.321/1999).",
    "fatosChave": [
      "Protocolo de San Salvador (DESC) — Direitos econômicos, sociais e culturais no sistema regional",
      "Protocolo de San Salvador (DESC) — Data: 17/11/1988",
      "Protocolo de San Salvador (DESC) — Promulgação/Status no Brasil: Decreto 3.321/1999"
    ],
    "conexoes": [
      "pidcp",
      "cadh",
      "pidesc"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [
      {
        "term": "Protocolo de San Salvador (DESC)",
        "definition": "Direitos econômicos, sociais e culturais no sistema regional",
        "rawRow": "Protocolo de San Salvador (DESC) (17/11/1988 · Decreto 3.321/1999) — Direitos econômicos, sociais e culturais no sistema regional"
      },
      {
        "term": "Protocolo de San Salvador (DESC) (Brasil)",
        "definition": "Decreto 3.321/1999",
        "rawRow": "Protocolo de San Salvador (DESC) — Brasil: Decreto 3.321/1999"
      },
      {
        "term": "Protocolo de San Salvador (DESC) (Data)",
        "definition": "17/11/1988",
        "rawRow": "Protocolo de San Salvador (DESC) — Data: 17/11/1988"
      }
    ],
    "textoCompleto": "| ID | Instrumento | Data | Brasil | Ideia central |\n| [[san-salvador]] | Protocolo de San Salvador (DESC) | 17/11/1988 | Decreto 3.321/1999 | Direitos econômicos, sociais e culturais no sistema regional |"
  },
  {
    "id": "res-cnj-335-2020",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 335/2020 — cria a PDPJ-Br",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Chanceler Renato",
    "npcRole": "bibliotecaria",
    "npcSeed": 403272032,
    "oQueE": "O que é: institui a política pública de governança e gestão do processo judicial eletrônico e cria a Plataforma Digital do Poder Judiciário Brasileiro (PDPJ-Br). Mantém o PJe como sistema prioritário do CNJ.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: institui a política pública de governança e gestão do processo judicial eletrônico e cria a Plataforma Digital do Poder Judiciário Brasileiro (PDPJ-Br). Mantém o PJe como sistema prioritário do CNJ.",
      "Ideia central: em vez de cada tribunal ter um sistema monolítico, a PDPJ-Br é um conjunto de aplicações e microsserviços mantidos de forma colaborativa por vários tribunais.",
      "Princípios técnicos (art. 2º/4º) — destaques: desenvolvimento comunitário; ampla cobertura de testes, baixo acoplamento, alta coesão, modularização; microsserviços; computação em nuvem; autenticação uniformizada; interoperabilidade; portabilidade; mobilidade; adequação à LGPD; uso preferencial de código aberto.",
      "Art. 5º: proíbe contratar novo sistema, módulo ou funcionalidade privados (mesmo gratuitos) que cause dependência tecnológica."
    ],
    "conexoes": [
      "portaria-252-2020",
      "portaria-253-2020",
      "portaria-131-2021",
      "microsservicos"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 335/2020 compilada",
        "url": "https://atos.cnj.jus.br/files/compilado1615492024083066d1f035e94dc.pdf"
      },
      {
        "label": "Cartilha PDPJ (CNJ)",
        "url": "https://www.cnj.jus.br/wp-content/uploads/2021/10/cartilha-pdpj-30-09-2021.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** institui a política pública de governança e gestão do processo judicial eletrônico e cria a **Plataforma Digital do Poder Judiciário Brasileiro (PDPJ-Br)**. Mantém o **PJe** como sistema prioritário do CNJ.\n- **Ideia central:** em vez de cada tribunal ter um sistema monolítico, a PDPJ-Br é um conjunto de **aplicações e microsserviços mantidos de forma colaborativa** por vários tribunais.\n- **Princípios técnicos (art. 2º/4º) — destaques:** desenvolvimento comunitário; **ampla cobertura de testes, baixo acoplamento, alta coesão, modularização**; **microsserviços**; **computação em nuvem**; **autenticação uniformizada**; interoperabilidade; portabilidade; mobilidade; adequação à **LGPD**; uso preferencial de **código aberto**.\n- **Art. 5º:** proíbe contratar novo sistema, módulo ou funcionalidade **privados** (mesmo gratuitos) que cause dependência tecnológica.\n- **Conexões:** é a \"mãe\" de [[portaria-252-2020]], [[portaria-253-2020]], [[portaria-131-2021]] e da stack em [[microsservicos]].\n- **Fonte:** [Resolução 335/2020 compilada](https://atos.cnj.jus.br/files/compilado1615492024083066d1f035e94dc.pdf) · [Cartilha PDPJ (CNJ)](https://www.cnj.jus.br/wp-content/uploads/2021/10/cartilha-pdpj-30-09-2021.pdf)\n\n---"
  },
  {
    "id": "res-cnj-443-2022",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 443/2022 — PDPJ-Br nos editais",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Diretora Camila",
    "npcRole": "juiz",
    "npcSeed": 916473330,
    "oQueE": "O que é: obriga que os editais de concursos de TI, as contratações de terceirizados de TI e de fábricas de software do Judiciário exijam conhecimentos sobre a PDPJ-Br (art. 1º). Não se aplica a concursos já em curso na data de publicação (art. 4º).",
    "exemploPratico": "Exemplo prático: é por causa desta resolução que o seu edital tem um bloco inteiro de Spring/Keycloak/RabbitMQ.",
    "fatosChave": [
      "O que é: obriga que os editais de concursos de TI, as contratações de terceirizados de TI e de fábricas de software do Judiciário exijam conhecimentos sobre a PDPJ-Br (art. 1º). Não se aplica a concursos já em curso na data de publicação (art. 4º).",
      "Ementa mínima (Portaria CNJ 257/2022):",
      "Normativos: Res. 91/2009 (MoReq-Jus antigo) → hoje Res. 522/2023; Res. 335/2020; Portarias 252/2020 e 253/2020; Portaria 131/2021; Res. 396/2021; Portaria 162/2021.",
      "Arquitetura: Java; microsserviços; API RESTful; JSON; Spring, Spring Cloud, Spring Boot, Spring Eureka, Zuul; MapStruct; Swagger; Service Discovery; API Gateway; JPA 2.0; Hibernate; Hibernate Envers; Flyway; PostgreSQL; H2; SSO; Keycloak; OAuth2 (RFC 6749); RabbitMQ; webhooks; Git; Kubernetes; Rancher; CI/CD.",
      "Auditoria: o próprio TRT4 foi auditado pelo CNJ em 2022 sobre isso e foi \"cientificado\" de que deve exigir esses conhecimentos nos concursos de TIC."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 443/2022",
        "url": "https://atos.cnj.jus.br/atos/detalhar/4317"
      },
      {
        "label": "Portaria 257/2022 (DJe)",
        "url": "https://sintse.tse.jus.br/documentos/2022/Ago/2/diario-da-justica-eletronico-cnj-edicao-anterior/portaria-no-257-de-31-de-julho-de-2022-dispoe-sobre-a-ementa-basica-para-a-aplicacao-e-disseminacao-"
      },
      {
        "label": "Relatório de auditoria TRT4",
        "url": "https://www.trt4.jus.br/portais/media/1475270/2.%20Relat%C3%B3rio%20n%C2%BA%2002.2022.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** obriga que os **editais de concursos de TI**, as contratações de terceirizados de TI e de **fábricas de software** do Judiciário exijam conhecimentos sobre a PDPJ-Br (art. 1º). Não se aplica a concursos já em curso na data de publicação (art. 4º).\n- **Ementa mínima (Portaria CNJ 257/2022):**\n  - **Normativos:** Res. 91/2009 (MoReq-Jus antigo) → hoje Res. 522/2023; Res. 335/2020; Portarias 252/2020 e 253/2020; Portaria 131/2021; Res. 396/2021; Portaria 162/2021.\n  - **Arquitetura:** Java; microsserviços; API RESTful; JSON; Spring, Spring Cloud, Spring Boot, Spring Eureka, Zuul; MapStruct; Swagger; Service Discovery; API Gateway; JPA 2.0; Hibernate; Hibernate Envers; Flyway; PostgreSQL; H2; SSO; Keycloak; OAuth2 (RFC 6749); RabbitMQ; webhooks; Git; Kubernetes; Rancher; CI/CD.\n- **Exemplo prático:** é por causa desta resolução que o seu edital tem um bloco inteiro de Spring/Keycloak/RabbitMQ.\n- **Auditoria:** o próprio TRT4 foi auditado pelo CNJ em 2022 sobre isso e foi \"cientificado\" de que deve exigir esses conhecimentos nos concursos de TIC.\n- **Fontes:** [Resolução 443/2022](https://atos.cnj.jus.br/atos/detalhar/4317) · [Portaria 257/2022 (DJe)](https://sintse.tse.jus.br/documentos/2022/Ago/2/diario-da-justica-eletronico-cnj-edicao-anterior/portaria-no-257-de-31-de-julho-de-2022-dispoe-sobre-a-ementa-basica-para-a-aplicacao-e-disseminacao-) · [Relatório de auditoria TRT4](https://www.trt4.jus.br/portais/media/1475270/2.%20Relat%C3%B3rio%20n%C2%BA%2002.2022.pdf)\n\n---"
  },
  {
    "id": "portaria-252-2020",
    "aliasIds": [
      "portaria-284-2021"
    ],
    "titulo": "Modelo de Governança e Gestão da PDPJ-Br",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Auditora Renata",
    "npcRole": "guarda",
    "npcSeed": 1998641422,
    "oQueE": "Portaria CNJ 252/2020 — o que é: define quem manda e quem decide na PDPJ-Br.",
    "exemploPratico": "Exemplo prático: o TRT4 não precisa ter um comitê gestor próprio da PDPJ — a coordenação da Justiça do Trabalho passa pelo CSJT.",
    "fatosChave": [
      "Portaria CNJ 252/2020 — o que é: define quem manda e quem decide na PDPJ-Br.",
      "Rede de Governança da PDPJ-Br (art. 4º):",
      "Condição para integrar soluções (art. 2º): integrar-se à arquitetura definida, consumindo e disponibilizando serviços. Componentes licenciados/proprietários só fora dos serviços essenciais e se puderem ser trocados por código aberto.",
      "Portaria CNJ 284/2021 — o que mudou: tornou facultativo criar comitê gestor local nos TREs e TRTs, porque eles seguem o modelo de gestão do TSE e do CSJT. Quem não criar mantém a interlocução com o CNJ pela Presidência ou pelos juízes auxiliares."
    ],
    "conexoes": [
      "res-cnj-335-2020"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Portaria 252/2020",
        "url": "https://atos.cnj.jus.br/files/original194723202011205fb81d4b841ee.pdf"
      },
      {
        "label": "Portaria 284/2021",
        "url": "https://atos.cnj.jus.br/atos/detalhar/4227"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Portaria CNJ 252/2020 — o que é:** define quem manda e quem decide na PDPJ-Br.\n- **Rede de Governança da PDPJ-Br (art. 4º):**\n  1. Comissão Permanente de Tecnologia da Informação e Infraestrutura do CNJ (coordena a rede);\n  2. **Comitê Gestor Nacional da PDPJ** (supervisão geral; homologa projetos de microsserviços);\n  3. **Comitês Gestores dos Tribunais**;\n  4. **Gerência Executiva da PDPJ**;\n  5. Grupos de Trabalho.\n- **Condição para integrar soluções (art. 2º):** integrar-se à arquitetura definida, consumindo e disponibilizando serviços. Componentes licenciados/proprietários só fora dos serviços essenciais e se puderem ser trocados por código aberto.\n- **Portaria CNJ 284/2021 — o que mudou:** tornou **facultativo** criar comitê gestor local nos **TREs e TRTs**, porque eles seguem o modelo de gestão do TSE e do **CSJT**. Quem não criar mantém a interlocução com o CNJ pela Presidência ou pelos juízes auxiliares.\n- **Exemplo prático:** o TRT4 não precisa ter um comitê gestor próprio da PDPJ — a coordenação da Justiça do Trabalho passa pelo CSJT.\n- **Fontes:** [Portaria 252/2020](https://atos.cnj.jus.br/files/original194723202011205fb81d4b841ee.pdf) · [Portaria 284/2021](https://atos.cnj.jus.br/atos/detalhar/4227)\n\n---"
  },
  {
    "id": "portaria-253-2020",
    "aliasIds": [],
    "titulo": "Portaria CNJ nº 253/2020 — critérios técnicos de desenvolvimento",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Gestor Henrique",
    "npcRole": "guarda",
    "npcSeed": 1483594015,
    "oQueE": "O que é: regras técnicas para desenvolver módulos e serviços na PDPJ-Br. É a \"Definition of Done\" do Judiciário.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: regras técnicas para desenvolver módulos e serviços na PDPJ-Br. É a \"Definition of Done\" do Judiciário.",
      "Pontos-chave encontrados nas fontes:",
      "Linguagem Java preferencial, com Spring Boot.",
      "Service Discovery implementado com Netflix Eureka via Spring Cloud Netflix.",
      "Microsserviços versionados com Git, com repositórios na plataforma do CNJ (gestão de demandas e versionamento).",
      "CI/CD com pipelines de testes automatizados.",
      "O CNJ designa um líder técnico para orientar cada projeto.",
      "Prevê a modularização dos sistemas monolíticos legados."
    ],
    "conexoes": [
      "spring-boot",
      "service-discovery",
      "git",
      "ci-cd",
      "testes-software"
    ],
    "avisosOraculo": [
      "O site do CNJ falhou ao carregar o texto integral; os pontos acima vêm de trechos do ato e de resumo. Conferir o texto completo (ex.: percentual mínimo de cobertura de testes, se houver)."
    ],
    "fontes": [
      {
        "label": "Portaria 253/2020",
        "url": "https://atos.cnj.jus.br/atos/detalhar/3582"
      },
      {
        "label": "Gran – resumo",
        "url": "https://blog.grancursosonline.com.br/legislacao-de-governanca-e-gestao-de-tic-para-o-poder-judiciario/amp/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** regras técnicas para desenvolver módulos e serviços na PDPJ-Br. É a \"Definition of Done\" do Judiciário.\n- **Pontos-chave encontrados nas fontes:**\n  - Linguagem **Java** preferencial, com **Spring Boot**.\n  - **Service Discovery** implementado com **Netflix Eureka** via **Spring Cloud Netflix**.\n  - Microsserviços **versionados com Git**, com repositórios na plataforma do CNJ (gestão de demandas e versionamento).\n  - **CI/CD** com pipelines de **testes automatizados**.\n  - O CNJ designa um **líder técnico** para orientar cada projeto.\n  - Prevê a modularização dos **sistemas monolíticos legados**.\n- **Conexões:** [[spring-boot]] · [[service-discovery]] · [[git]] · [[ci-cd]] · [[testes-software]]\n- **Fontes:** [Portaria 253/2020](https://atos.cnj.jus.br/atos/detalhar/3582) · [Gran – resumo](https://blog.grancursosonline.com.br/legislacao-de-governanca-e-gestao-de-tic-para-o-poder-judiciario/amp/)\n- ⚠️ O site do CNJ falhou ao carregar o texto integral; os pontos acima vêm de trechos do ato e de resumo. Conferir o texto completo (ex.: percentual mínimo de cobertura de testes, se houver).\n\n---"
  },
  {
    "id": "portaria-131-2021",
    "aliasIds": [],
    "titulo": "Portaria CNJ nº 131/2021 — Grupo Revisor de Código-Fonte",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Coordenadora Patrícia",
    "npcRole": "bibliotecaria",
    "npcSeed": 774587393,
    "oQueE": "O que é: institui o Grupo Revisor de Código-Fonte das soluções da PDPJ-Br e do PJe.",
    "exemploPratico": "Exemplo prático: é um code review institucional — um merge request de um tribunal só entra na versão nacional depois de revisado.",
    "fatosChave": [
      "O que é: institui o Grupo Revisor de Código-Fonte das soluções da PDPJ-Br e do PJe.",
      "Função: analisar as mudanças de código feitas pela comunidade (CNJ e tribunais) e executar testes de qualidade do código e garantias operacionais.",
      "Composição: membros indicados pelo DTI/CNJ e representantes dos tribunais; membros natos = servidores da Divisão do PJe (DPJe). Atividade honorífica (sem remuneração extra).",
      "O que ele NÃO faz: escolher quais projetos serão desenvolvidos."
    ],
    "conexoes": [
      "git",
      "testes-software",
      "devops"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Portaria 131/2021 (PDF)",
        "url": "https://atos.cnj.jus.br/files/original13380320210507609542bb50db1.PDF"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** institui o **Grupo Revisor de Código-Fonte** das soluções da PDPJ-Br e do **PJe**.\n- **Função:** analisar as mudanças de código feitas pela comunidade (CNJ e tribunais) e **executar testes de qualidade** do código e garantias operacionais.\n- **Composição:** membros indicados pelo DTI/CNJ e representantes dos tribunais; **membros natos** = servidores da Divisão do PJe (DPJe). Atividade **honorífica** (sem remuneração extra).\n- **O que ele NÃO faz:** escolher quais projetos serão desenvolvidos.\n- **Exemplo prático:** é um *code review* institucional — um *merge request* de um tribunal só entra na versão nacional depois de revisado.\n- **Conexões:** [[git]] (merge request, branch) · [[testes-software]] · [[devops]]\n- **Fonte:** [Portaria 131/2021 (PDF)](https://atos.cnj.jus.br/files/original13380320210507609542bb50db1.PDF)\n\n---"
  },
  {
    "id": "res-cnj-522-2023",
    "aliasIds": [
      "moreq-jus"
    ],
    "titulo": "Resolução CNJ nº 522/2023 + MoReq-Jus 2ª edição",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Secretário Otávio",
    "npcRole": "guarda",
    "npcSeed": 1742684161,
    "oQueE": "O que é: institui o Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário (MoReq-Jus) e torna obrigatório usá-lo no desenvolvimento e manutenção de sistemas judiciais e administrativos. Atualizou o modelo da antiga Res. 91/2009.",
    "exemploPratico": "Exemplo prático: um novo módulo do PJe precisa registrar metadados de cada documento e permitir sua preservação de longo prazo — isso é requisito MoReq-Jus.",
    "fatosChave": [
      "O que é: institui o Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário (MoReq-Jus) e torna obrigatório usá-lo no desenvolvimento e manutenção de sistemas judiciais e administrativos. Atualizou o modelo da antiga Res. 91/2009.",
      "Art. 2º: os sistemas, ainda que segmentados em aplicações, módulos e microsserviços, devem aderir ao MoReq-Jus para assegurar confidencialidade, integridade, disponibilidade, autenticidade, não repúdio, conformidade e preservação dos processos e documentos.",
      "O que o MoReq-Jus cobre: critérios para captura, produção, classificação, tramitação, guarda, avaliação, seleção, armazenamento, indexação, preservação e arquivamento de documentos. Cada requisito é obrigatório ou desejável.",
      "Programa MoReq-Aval: avalia o grau de aderência dos sistemas e atualiza o modelo continuamente."
    ],
    "conexoes": [
      "cid",
      "criptografia",
      "engenharia-requisitos",
      "microsservicos"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 522/2023",
        "url": "https://atos.cnj.jus.br/atos/detalhar/5266"
      },
      {
        "label": "CNJ – MoReq-Jus",
        "url": "https://www.cnj.jus.br/programas-e-acoes/gestao-documental-e-memoria-proname/gestao-documental/moreq-jus-e-sistemas-informatizados/"
      },
      {
        "label": "MoReq-Jus 2ª ed. (PDF)",
        "url": "https://portal.tjce.jus.br/uploads/2023/07/moreq-jus-2a-edicao.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** institui o **Modelo de Requisitos para Sistemas Informatizados de Gestão de Processos e Documentos do Poder Judiciário (MoReq-Jus)** e torna obrigatório usá-lo no desenvolvimento e manutenção de sistemas judiciais e administrativos. Atualizou o modelo da antiga Res. 91/2009.\n- **Art. 2º:** os sistemas, **ainda que segmentados em aplicações, módulos e microsserviços**, devem aderir ao MoReq-Jus para assegurar **confidencialidade, integridade, disponibilidade, autenticidade, não repúdio, conformidade e preservação** dos processos e documentos.\n- **O que o MoReq-Jus cobre:** critérios para captura, produção, classificação, tramitação, guarda, avaliação, seleção, armazenamento, indexação, preservação e arquivamento de documentos. Cada requisito é **obrigatório** ou **desejável**.\n- **Programa MoReq-Aval:** avalia o grau de aderência dos sistemas e atualiza o modelo continuamente.\n- **Exemplo prático:** um novo módulo do PJe precisa registrar metadados de cada documento e permitir sua preservação de longo prazo — isso é requisito MoReq-Jus.\n- **Conexões:** [[cid]] (os mesmos pilares CID + autenticidade e não repúdio) · [[criptografia]] (não repúdio) · [[engenharia-requisitos]] · [[microsservicos]]\n- **Fontes:** [Resolução 522/2023](https://atos.cnj.jus.br/atos/detalhar/5266) · [CNJ – MoReq-Jus](https://www.cnj.jus.br/programas-e-acoes/gestao-documental-e-memoria-proname/gestao-documental/moreq-jus-e-sistemas-informatizados/) · [MoReq-Jus 2ª ed. (PDF)](https://portal.tjce.jus.br/uploads/2023/07/moreq-jus-2a-edicao.pdf)\n\n---"
  },
  {
    "id": "res-cnj-574-2024",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 574/2024 — dados judiciais públicos, serviços privados e portal unificado",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Inspetora Diana",
    "npcRole": "juiz",
    "npcSeed": 2032981179,
    "oQueE": "O que é (ementa): dispõe sobre o acesso a dados judiciais públicos consolidados pelo CNJ, prevê o depósito de serviços privados na PDPJ-Br e institui o portal unificado para usuários internos.",
    "exemploPratico": "Exemplo prático: uma lawtech que quer consumir dados processuais públicos pede acesso à API do datalake do CNJ, em vez de fazer scraping de cada tribunal.",
    "fatosChave": [
      "O que é (ementa): dispõe sobre o acesso a dados judiciais públicos consolidados pelo CNJ, prevê o depósito de serviços privados na PDPJ-Br e institui o portal unificado para usuários internos.",
      "O CNJ pode oferecer acesso aos dados por APIs ou outras interfaces centralizadas, podendo cobrar de quem efetivamente consome o serviço.",
      "Alterou o art. 11 da Res. 335/2020: cabe ao CNJ coordenar um portal com interface nacional única para usuários externos e internos (o portal Jus.br).",
      "Regulamentada pela Portaria CNJ 316/2024: os dados ficam num datalake e o acesso é por API, mediante requerimento justificado."
    ],
    "conexoes": [
      "api-rest",
      "lgpd",
      "keycloak-sso"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 574/2024",
        "url": "https://atos.cnj.jus.br/atos/detalhar/5708"
      },
      {
        "label": "Portaria 316/2024",
        "url": "https://atos.cnj.jus.br/atos/detalhar/5792"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é (ementa):** dispõe sobre o acesso a **dados judiciais públicos consolidados pelo CNJ**, prevê o **depósito de serviços privados na PDPJ-Br** e institui o **portal unificado para usuários internos**.\n- **Pontos-chave:**\n  - O CNJ pode oferecer acesso aos dados por **APIs** ou outras interfaces centralizadas, podendo cobrar de quem efetivamente consome o serviço.\n  - Alterou o art. 11 da Res. 335/2020: cabe ao CNJ coordenar um **portal com interface nacional única** para usuários **externos e internos** (o portal **Jus.br**).\n  - Regulamentada pela Portaria CNJ 316/2024: os dados ficam num **datalake** e o acesso é por **API**, mediante requerimento justificado.\n- **Exemplo prático:** uma *lawtech* que quer consumir dados processuais públicos pede acesso à API do datalake do CNJ, em vez de fazer *scraping* de cada tribunal.\n- **Conexões:** [[api-rest]] · [[lgpd]] (dados públicos ≠ dados pessoais livres) · [[keycloak-sso]] (o Jus.br exige SSO do CNJ baseado em Keycloak)\n- **Fontes:** [Resolução 574/2024](https://atos.cnj.jus.br/atos/detalhar/5708) · [Portaria 316/2024](https://atos.cnj.jus.br/atos/detalhar/5792)\n\n---"
  },
  {
    "id": "res-cnj-396-2021",
    "aliasIds": [],
    "titulo": "Resolução CNJ nº 396/2021 — ENSEC-PJ (Estratégia Nacional de Segurança Cibernética do Poder Judiciário)",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Conselheiro Marcos",
    "npcRole": "bibliotecaria",
    "npcSeed": 1565500682,
    "oQueE": "O que é: estratégia nacional de segurança cibernética para todo o Judiciário, exceto o STF.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: estratégia nacional de segurança cibernética para todo o Judiciário, exceto o STF.",
      "Abrange: segurança da informação (no que for essencial à cibernética), segurança física e proteção de dados pessoais, proteção de ativos, disponibilidade, integridade, confidencialidade e autenticidade, continuidade de negócios, capacitação.",
      "Visão (art. 4º): alcançar a excelência em segurança cibernética no Judiciário.",
      "Objetivos (art. 6º):",
      "CGSI-PJ (Comitê Gestor de Segurança da Informação do Poder Judiciário): assessora o CNJ; 12 membros (CNJ 2, STF 2, STJ, TSE, TST, CSJT, CJF, STM, TJs 2); reuniões semestrais.",
      "CPTRIC-PJ: centro de prevenção, tratamento e resposta a incidentes do CNJ — todo incidente detectado deve ser comunicado a ele.",
      "Rede Nacional de Cooperação do Judiciário.",
      "Em cada tribunal: ETIR (Equipe de Tratamento e Resposta a Incidentes), comitê de segurança da informação, gestor de segurança da informação com estrutura separada da TI e ligada à alta administração, orçamento próprio.",
      "Medidas de infraestrutura crítica (art. 11): ETIR, processo de resposta a incidentes, backups automatizados e segregados, inteligência de ameaças, requisitos de segurança para teletrabalho e novos projetos, testes de conformidade no mínimo a cada 6 meses.",
      "Política de Segurança da Informação do tribunal (art. 28): gestão de ativos e de acesso, controles para informação restrita, capacitação e certificação, requisitos de segurança em contratos, criptografia e assinatura eletrônica."
    ],
    "conexoes": [
      "iso-27001",
      "backup",
      "controle-acesso",
      "portaria-162-2021"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Resolução 396/2021",
        "url": "https://atos.cnj.jus.br/atos/detalhar/3975"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** estratégia nacional de segurança cibernética para todo o Judiciário, **exceto o STF**.\n- **Abrange:** segurança da informação (no que for essencial à cibernética), segurança física e proteção de dados pessoais, proteção de ativos, **disponibilidade, integridade, confidencialidade e autenticidade**, continuidade de negócios, capacitação.\n- **Visão (art. 4º):** alcançar a **excelência em segurança cibernética** no Judiciário.\n- **Objetivos (art. 6º):**\n  1. Tornar o Judiciário mais seguro e inclusivo no ambiente digital;\n  2. Aumentar a resiliência às ameaças cibernéticas;\n  3. Estabelecer governança de segurança cibernética e coordenação integrada;\n  4. Manter os serviços ou restabelecê-los no menor tempo possível.\n- **Estruturas:**\n  - **CGSI-PJ** (Comitê Gestor de Segurança da Informação do Poder Judiciário): assessora o CNJ; **12 membros** (CNJ 2, STF 2, STJ, TSE, TST, CSJT, CJF, STM, TJs 2); reuniões **semestrais**.\n  - **CPTRIC-PJ**: centro de prevenção, tratamento e resposta a incidentes do CNJ — **todo incidente detectado deve ser comunicado a ele**.\n  - **Rede Nacional de Cooperação** do Judiciário.\n  - Em cada tribunal: **ETIR** (Equipe de Tratamento e Resposta a Incidentes), **comitê de segurança da informação**, **gestor de segurança da informação** com estrutura **separada da TI** e ligada à alta administração, **orçamento próprio**.\n- **Medidas de infraestrutura crítica (art. 11):** ETIR, processo de resposta a incidentes, **backups automatizados e segregados**, inteligência de ameaças, requisitos de segurança para teletrabalho e novos projetos, **testes de conformidade no mínimo a cada 6 meses**.\n- **Política de Segurança da Informação do tribunal (art. 28):** gestão de ativos e de acesso, controles para informação restrita, capacitação e certificação, requisitos de segurança em contratos, **criptografia e assinatura eletrônica**.\n- **Conexões:** [[iso-27001]] (SGSI baseado em riscos) · [[backup]] · [[backup]] · [[controle-acesso]] · [[portaria-162-2021]]\n- **Fonte:** [Resolução 396/2021](https://atos.cnj.jus.br/atos/detalhar/3975)\n\n---"
  },
  {
    "id": "portaria-162-2021",
    "aliasIds": [],
    "titulo": "Portaria CNJ nº 162/2021 — Protocolos e Manuais da ENSEC-PJ",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Chanceler Renato II",
    "npcRole": "bibliotecaria",
    "npcSeed": 1329736727,
    "oQueE": "Detalhe que cai: os três protocolos são complementares: prevenção → crise → investigação.",
    "exemploPratico": "",
    "fatosChave": [
      "Detalhe que cai: os três protocolos são complementares: prevenção → crise → investigação.",
      "Conexão com a teoria: as 5 funções do PPINC-PJ (Identificar, Proteger, Detectar, Responder, Recuperar) são as mesmas do NIST Cybersecurity Framework."
    ],
    "conexoes": [
      "res-cnj-396-2021",
      "controle-acesso",
      "backup"
    ],
    "avisosOraculo": [
      "A sigla do protocolo de crises aparece como PGCRC-PJ (anexo) e PGCC-PJ (resolução). As duas formas circulam em provas."
    ],
    "fontes": [
      {
        "label": "Portaria 162/2021 (Qlegislação)",
        "url": "https://qlegislacao.com.br/legismais/federal/nac-port-cnj-162-2021"
      },
      {
        "label": "PDF no TRT14",
        "url": "https://www.trt14.jus.br/portal/sites/default/files/gestao-tic/2026-06/Portaria%20CNJ%20N%C2%BA%20162%2C%20de%2010%20de%20Junho%20de%202021.pdf"
      },
      {
        "label": "Exemplo TRE-DF (funções)",
        "url": "https://www.tre-df.jus.br/transparencia-e-prestacao-de-contas/gestao-e-governaca/arquivos/arquivos-governanca-de-tic/protocolo-de-prevencao-de-incidentes-ciberneticos"
      }
    ],
    "tablePairs": [
      {
        "term": "II",
        "definition": "Documento: Protocolo de Gerenciamento de Crises Cibernéticas (PGCRC-PJ) · Para que serve: Ações quando o incidente vira crise (grande escala, não contido rapidamente); comunicação com imprensa",
        "rawRow": "II — Protocolo de Gerenciamento de Crises Cibernéticas (PGCRC-PJ) — Ações quando o incidente vira crise (grande escala, não contido rapidamente); comunicação com imprensa"
      },
      {
        "term": "III",
        "definition": "Documento: Protocolo de Investigação para Ilícitos Cibernéticos (PIILC-PJ) · Para que serve: Coleta e preservação de evidências; comunicação ao MP e à polícia",
        "rawRow": "III — Protocolo de Investigação para Ilícitos Cibernéticos (PIILC-PJ) — Coleta e preservação de evidências; comunicação ao MP e à polícia"
      },
      {
        "term": "IV",
        "definition": "Documento: Manual de Proteção de Infraestruturas Críticas de TIC",
        "rawRow": "IV — Manual de Proteção de Infraestruturas Críticas de TIC"
      },
      {
        "term": "VI",
        "definition": "Documento: Manual de Gestão de Identidades · Para que serve: Identidade, acesso e privilégios",
        "rawRow": "VI — Manual de Gestão de Identidades — Identidade, acesso e privilégios"
      },
      {
        "term": "VII",
        "definition": "Documento: Política de Educação e Cultura em Segurança Cibernética · Para que serve: Conscientização e capacitação",
        "rawRow": "VII — Política de Educação e Cultura em Segurança Cibernética — Conscientização e capacitação"
      },
      {
        "term": "VIII",
        "definition": "Documento: Glossário · Para que serve: Termos técnicos de segurança cibernética",
        "rawRow": "VIII — Glossário — Termos técnicos de segurança cibernética"
      }
    ],
    "textoCompleto": "| Anexo | Documento | Para que serve |\n| --- | --- | --- |\n| I | Protocolo de **Prevenção** de Incidentes Cibernéticos (PPINC-PJ) | Funções Identificar → Proteger → Detectar → Responder → Recuperar |\n| II | Protocolo de **Gerenciamento de Crises** Cibernéticas (PGCRC-PJ) | Ações quando o incidente vira crise (grande escala, não contido rapidamente); comunicação com imprensa |\n| III | Protocolo de **Investigação** para Ilícitos Cibernéticos (PIILC-PJ) | Coleta e preservação de evidências; comunicação ao MP e à polícia |\n| IV | Manual de Proteção de Infraestruturas Críticas de TIC | — |\n| V | Manual de Prevenção e Mitigação de Ameaças Cibernéticas e Confiança Digital | — |\n| VI | Manual de Gestão de Identidades | Identidade, acesso e privilégios |\n| VII | Política de Educação e Cultura em Segurança Cibernética | Conscientização e capacitação |\n| VIII | Glossário | Termos técnicos de segurança cibernética |\n\n- **Detalhe que cai:** os três protocolos são **complementares**: prevenção → crise → investigação.\n- **Conexão com a teoria:** as 5 funções do PPINC-PJ (Identificar, Proteger, Detectar, Responder, Recuperar) são as mesmas do *NIST Cybersecurity Framework*.\n- **Fontes:** [Portaria 162/2021 (Qlegislação)](https://qlegislacao.com.br/legismais/federal/nac-port-cnj-162-2021) · [PDF no TRT14](https://www.trt14.jus.br/portal/sites/default/files/gestao-tic/2026-06/Portaria%20CNJ%20N%C2%BA%20162%2C%20de%2010%20de%20Junho%20de%202021.pdf) · [Exemplo TRE-DF (funções)](https://www.tre-df.jus.br/transparencia-e-prestacao-de-contas/gestao-e-governaca/arquivos/arquivos-governanca-de-tic/protocolo-de-prevencao-de-incidentes-ciberneticos)\n- ⚠️ A sigla do protocolo de crises aparece como PGCRC-PJ (anexo) e PGCC-PJ (resolução). As duas formas circulam em provas.\n\n---"
  },
  {
    "id": "governanca-tic-trt4",
    "aliasIds": [],
    "titulo": "Modelo de Governança de TIC do TRT4",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Diretora Camila II",
    "npcRole": "guarda",
    "npcSeed": 2095315915,
    "oQueE": "Comitê de Governança de TIC (Comissão Permanente do Regimento Interno; art. 227-A):",
    "exemploPratico": "Exemplo prático: a decisão de trocar a telefonia convencional por VoIP ou de renovar 1.207 computadores passou pelo Comitê de Governança na revisão do PDTIC.",
    "fatosChave": [
      "Comitê de Governança de TIC (Comissão Permanente do Regimento Interno; art. 227-A):",
      "7 membros com voto: 3 desembargadores eleitos pelo Pleno (um preside), 2 juízes de 1º grau, Diretora-Geral e Secretário-Geral Judiciário.",
      "3 sem voto: representante da Corregedoria, da Secretaria-Geral da Presidência e o(a) dirigente da área de TI.",
      "Quórum: 3 magistrados e 1 servidor.",
      "Atribuições (destaques): propor estratégias, indicadores e metas de TIC; participar da elaboração do PDTIC e acompanhar sua execução; orientar investimentos; avaliar aquisições; opinar sobre a Política de Segurança da Informação.",
      "Subcomitê de TIC (Portaria GP.TRT4 5.042/2022): nível de gestão (dirigente de TI, coordenadores); trata de temas operacionais e prepara propostas ao Comitê de Governança.",
      "Comitê de Segurança da Informação e Proteção de Dados: separado, como exige a ENSEC-PJ.",
      "Área de TI: hoje chamada Secretaria-Geral de Tecnologia e Inovação (SGTI); antes, SETIC. Coordenadorias citadas no portfólio: CDS (Desenvolvimento de Sistemas), CSTIC (Serviços de TIC), CGGTIC (Gestão e Governança), CSIPD (Segurança da Informação e Proteção de Dados), SEINFRA, CIS, DIA."
    ],
    "conexoes": [
      "regimento-trt4",
      "pmbok",
      "itil",
      "cobit"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Comitê de Governança de TIC",
        "url": "https://www.trt4.jus.br/portais/governanca/comissao-informatica"
      },
      {
        "label": "Portarias de governança de TIC",
        "url": "https://www.trt4.jus.br/portais/governanca/portarias"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Comitê de Governança de TIC** (Comissão Permanente do Regimento Interno; art. 227-A):\n  - **7 membros com voto:** 3 desembargadores eleitos pelo Pleno (um preside), 2 juízes de 1º grau, Diretora-Geral e Secretário-Geral Judiciário.\n  - **3 sem voto:** representante da Corregedoria, da Secretaria-Geral da Presidência e o(a) dirigente da área de TI.\n  - **Quórum:** 3 magistrados e 1 servidor.\n  - **Atribuições (destaques):** propor estratégias, indicadores e metas de TIC; **participar da elaboração do PDTIC e acompanhar sua execução**; orientar investimentos; avaliar aquisições; **opinar sobre a Política de Segurança da Informação**.\n- **Subcomitê de TIC** (Portaria GP.TRT4 5.042/2022): nível de gestão (dirigente de TI, coordenadores); trata de temas operacionais e prepara propostas ao Comitê de Governança.\n- **Comitê de Segurança da Informação e Proteção de Dados:** separado, como exige a ENSEC-PJ.\n- **Área de TI:** hoje chamada **Secretaria-Geral de Tecnologia e Inovação (SGTI)**; antes, SETIC. Coordenadorias citadas no portfólio: CDS (Desenvolvimento de Sistemas), CSTIC (Serviços de TIC), CGGTIC (Gestão e Governança), CSIPD (Segurança da Informação e Proteção de Dados), SEINFRA, CIS, DIA.\n- **Exemplo prático:** a decisão de trocar a telefonia convencional por VoIP ou de renovar 1.207 computadores passou pelo Comitê de Governança na revisão do PDTIC.\n- **Fontes:** [Comitê de Governança de TIC](https://www.trt4.jus.br/portais/governanca/comissao-informatica) · [Portarias de governança de TIC](https://www.trt4.jus.br/portais/governanca/portarias)"
  },
  {
    "id": "pdtic-trt4",
    "aliasIds": [],
    "titulo": "PDTIC 2024-2026 do TRT4",
    "zonaId": "03-normativos-pdpj-e-governanca-trt4",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Normativos PDPJ-Br e Governança TRT4",
    "cargo": "ambos",
    "npcName": "Auditora Renata II",
    "npcRole": "juiz",
    "npcSeed": 1089570048,
    "oQueE": "O que é: plano de dois anos que desdobra as estratégias nacionais e regionais em ações e projetos da área de TI, garantindo alocação de recursos e acompanhamento (orçamento, níveis de serviço). Não é estático — é revisado durante a vigência.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: plano de dois anos que desdobra as estratégias nacionais e regionais em ações e projetos da área de TI, garantindo alocação de recursos e acompanhamento (orçamento, níveis de serviço). Não é estático — é revisado durante a vigência.",
      "Alinhamento: ENTIC-JUD (Res. CNJ 370/2021), Planejamento Estratégico do TRT4, Plano de Transformação Digital da JT, PDTIC-JT (Ato 66/CSJT/2023), Res. CSJT 292/2021 (governança de TIC do CSJT) e Res. CSJT 185/2017 (PJe).",
      "Princípios/objetivos (20, destaques): priorizar a estratégia do TRT; interoperabilidade e dados abertos; sistemas reutilizáveis por outros órgãos; automatizar tarefas repetitivas; equidade capital × interior; ferramentas seguras para teletrabalho; mitigar riscos de segurança (CID); inclusão social e sustentabilidade ambiental; capacitação contínua.",
      "Estrutura: documento principal + portfólio de ações estratégicas e projetos (com status: em execução, concluído, cancelado, suspenso, não iniciado), acompanhado pelo Escritório de Projetos de TI."
    ],
    "conexoes": [
      "cobit",
      "pmbok",
      "res-cnj-400-2021",
      "res-cnj-396-2021"
    ],
    "avisosOraculo": [
      "Vigência: de maio/2024 a abril/2026 (ata do Comitê de Governança, 26/04/2024, que o aprovou por unanimidade). O site já publica o PDTIC 2026-2028 (abril/2026), mas o edital cobra o 2024-2026."
    ],
    "fontes": [
      {
        "label": "Plano Diretor de TIC – TRT4",
        "url": "https://www.trt4.jus.br/portais/governanca/plano-diretor"
      },
      {
        "label": "Ata de aprovação 26/04/2024",
        "url": "https://www.trt4.jus.br/portais/media/2804387/Ata%20Comit%C3%AA%20de%20Governan%C3%A7a%20de%20TIC%20-%2026_04_2024.pdf"
      },
      {
        "label": "Página PDTIC",
        "url": "https://www.trt4.jus.br/portais/trt4/pdtic"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** plano de **dois anos** que desdobra as estratégias nacionais e regionais em ações e projetos da área de TI, garantindo alocação de recursos e acompanhamento (orçamento, níveis de serviço). **Não é estático** — é revisado durante a vigência.\n- **Vigência:** de **maio/2024 a abril/2026** (ata do Comitê de Governança, 26/04/2024, que o aprovou por unanimidade). ⚠️ O site já publica o **PDTIC 2026-2028** (abril/2026), mas o edital cobra o **2024-2026**.\n- **Alinhamento:** ENTIC-JUD (Res. CNJ 370/2021), Planejamento Estratégico do TRT4, Plano de Transformação Digital da JT, **PDTIC-JT** (Ato 66/CSJT/2023), Res. CSJT 292/2021 (governança de TIC do CSJT) e Res. CSJT 185/2017 (PJe).\n- **Princípios/objetivos (20, destaques):** priorizar a estratégia do TRT; **interoperabilidade e dados abertos**; sistemas reutilizáveis por outros órgãos; automatizar tarefas repetitivas; equidade capital × interior; ferramentas seguras para **teletrabalho**; **mitigar riscos de segurança (CID)**; inclusão social e **sustentabilidade ambiental**; capacitação contínua.\n- **Estrutura:** documento principal + **portfólio de ações estratégicas e projetos** (com status: em execução, concluído, cancelado, suspenso, não iniciado), acompanhado pelo Escritório de Projetos de TI.\n- **Conexões:** [[cobit]] · [[pmbok]] (portfólio e projetos) · [[cobit]] (alinhamento estratégico) · [[res-cnj-400-2021]] (sustentabilidade) · [[res-cnj-396-2021]] (riscos de segurança)\n- **Fontes:** [Plano Diretor de TIC – TRT4](https://www.trt4.jus.br/portais/governanca/plano-diretor) · [Ata de aprovação 26/04/2024](https://www.trt4.jus.br/portais/media/2804387/Ata%20Comit%C3%AA%20de%20Governan%C3%A7a%20de%20TIC%20-%2026_04_2024.pdf) · [Página PDTIC](https://www.trt4.jus.br/portais/trt4/pdtic)\n\n---"
  },
  {
    "id": "pmbok",
    "aliasIds": [],
    "titulo": "PMBOK® Guide — 8ª edição (PMI)",
    "zonaId": "12-governanca-e-gestao-de-ti",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Gestão e Governança de TI",
    "cargo": "analista",
    "npcName": "Gestor Henrique II",
    "npcRole": "juiz",
    "npcSeed": 1482303306,
    "oQueE": "O que é: o guia de gerenciamento de projetos do PMI + The Standard for Project Management. 8ª edição publicada em novembro/2025 (408 páginas), construída com mais de 48 mil pontos de dados de profissionais.",
    "exemploPratico": "Exemplo prático: o projeto \"migrar o banco do sistema X do PostgreSQL 14 para o 18\" — escopo, cronograma, custo (finanças), riscos (indisponibilidade), partes interessadas (varas, Secretaria), governança (Comitê de TIC aprova).",
    "fatosChave": [
      "O que é: o guia de gerenciamento de projetos do PMI + The Standard for Project Management. 8ª edição publicada em novembro/2025 (408 páginas), construída com mais de 48 mil pontos de dados de profissionais.",
      "O que mudou em relação à 7ª: mantém a base de princípios + domínios de desempenho, mas simplifica:",
      "6 princípios (eram 12 na 7ª): visão holística, foco em valor, qualidade incorporada, liderança com responsabilidade (accountability), sustentabilidade integrada, equipes empoderadas.",
      "7 domínios de desempenho: governança, escopo, cronograma, finanças, partes interessadas (stakeholders), recursos e risco.",
      "Volta da orientação por processos, agora de forma não prescritiva, chamada de \"focus areas\" (áreas de foco).",
      "Mais conteúdo sobre IA, PMO e aquisições (procurement); continua cobrindo abordagens preditivas, ágeis e híbridas e tailoring (adaptar ao contexto).",
      "Datas úteis: a 7ª edição deixou de ser vendida/baixada pelo PMI em 08/07/2026; o exame PMP passou ao padrão da 8ª em 09/07/2026."
    ],
    "conexoes": [
      "ageis",
      "pdtic-trt4",
      "governanca-tic-trt4",
      "iso-27005"
    ],
    "avisosOraculo": [
      "As áreas de foco parecem corresponder aos antigos grupos de processos (iniciação, planejamento, execução, monitoramento e controle, encerramento) — confirmar no texto do guia antes de usar em prova. A lista dos 7 domínios veio da página do PMI (\"governance, scope, schedule, finance, stakeholders, resources, and risk\")."
    ],
    "fontes": [
      {
        "label": "PMI – PMBOK Guide 8ª edição",
        "url": "https://www.pmi.org/standards/pmbok?afsrc=1"
      },
      {
        "label": "PMI – visão geral (6 princípios, 7 domínios)",
        "url": "https://www.pmi.org/PMBOK-guide"
      },
      {
        "label": "PMI – about (7ª até 08/07/2026)",
        "url": "https://www.pmi.org/pmbok-guide-standards/foundational/pmbok/about"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** o guia de gerenciamento de projetos do **PMI** + *The Standard for Project Management*. **8ª edição publicada em novembro/2025** (408 páginas), construída com mais de 48 mil pontos de dados de profissionais.\n- **O que mudou em relação à 7ª:** mantém a base de **princípios + domínios de desempenho**, mas **simplifica**:\n  - **6 princípios** (eram 12 na 7ª): visão **holística**, foco em **valor**, **qualidade** incorporada, **liderança com responsabilidade (accountability)**, **sustentabilidade** integrada, **equipes empoderadas**.\n  - **7 domínios de desempenho:** **governança, escopo, cronograma, finanças, partes interessadas (stakeholders), recursos e risco**.\n  - **Volta da orientação por processos**, agora de forma **não prescritiva**, chamada de **\"focus areas\"** (áreas de foco).\n  - Mais conteúdo sobre **IA**, **PMO** e **aquisições (procurement)**; continua cobrindo abordagens **preditivas, ágeis e híbridas** e **tailoring** (adaptar ao contexto).\n- **Datas úteis:** a 7ª edição deixou de ser vendida/baixada pelo PMI em **08/07/2026**; o exame PMP passou ao padrão da 8ª em **09/07/2026**.\n- ⚠️ As áreas de foco parecem corresponder aos antigos grupos de processos (iniciação, planejamento, execução, monitoramento e controle, encerramento) — **confirmar no texto do guia** antes de usar em prova. A lista dos 7 domínios veio da página do PMI (\"governance, scope, schedule, finance, stakeholders, resources, and risk\").\n- **Exemplo prático:** o projeto \"migrar o banco do sistema X do PostgreSQL 14 para o 18\" — escopo, cronograma, custo (finanças), riscos (indisponibilidade), partes interessadas (varas, Secretaria), governança (Comitê de TIC aprova).\n- **Conexões:** [[ageis]] (Scrum/Kanban como abordagens adaptativas) · [[pdtic-trt4]] (projetos do plano) · [[governanca-tic-trt4]] (portfólio) · [[iso-27005]] (risco)\n- **Fontes:** [PMI – PMBOK Guide 8ª edição](https://www.pmi.org/standards/pmbok?afsrc=1) · [PMI – visão geral (6 princípios, 7 domínios)](https://www.pmi.org/PMBOK-guide) · [PMI – about (7ª até 08/07/2026)](https://www.pmi.org/pmbok-guide-standards/foundational/pmbok/about)"
  },
  {
    "id": "itil",
    "aliasIds": [],
    "titulo": "ITIL® (Version 5)",
    "zonaId": "12-governanca-e-gestao-de-ti",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Gestão e Governança de TI",
    "cargo": "analista",
    "npcName": "Coordenadora Patrícia II",
    "npcRole": "guarda",
    "npcSeed": 1069456843,
    "oQueE": "O que é: o framework de gerenciamento de serviços (e agora de produtos) digitais, mantido pela PeopleCert. A ITIL (Version 5) foi lançada com o ITIL Foundation em fevereiro/2026, com módulos avançados em fases. ITIL 4 e Version 5 convivem; certificações antigas continuam válidas.",
    "exemploPratico": "Exemplo prático: o PJe cai numa vara → incidente (restabelecer); o time descobre que a causa é um pool de conexões mal configurado → problema; a correção entra por gerenciamento de mudança.",
    "fatosChave": [
      "O que é: o framework de gerenciamento de serviços (e agora de produtos) digitais, mantido pela PeopleCert. A ITIL (Version 5) foi lançada com o ITIL Foundation em fevereiro/2026, com módulos avançados em fases. ITIL 4 e Version 5 convivem; certificações antigas continuam válidas.",
      "O que continua (herança do ITIL 4): os princípios orientadores, as quatro dimensões e as práticas (\"o antigo\").",
      "O que é novo:",
      "ITIL Product and Service Lifecycle — modelo que une gestão de produto digital e de serviço;",
      "foco em experiência (cliente/usuário/colaborador) com orientação prática;",
      "IA integrada (inclusive governança de IA);",
      "ITIL Value System atualizado como modelo central;",
      "34 práticas (Version 5).",
      "Trilha de certificação: Foundation → designações (ITIL Product, ITIL Service, ITIL Experience …) → ITIL Master.",
      "Práticas clássicas que caem: gerenciamento de incidente (restaurar o serviço rápido) × problema (achar a causa raiz) · requisição de serviço · mudança (habilitação de mudanças) · central de serviço (service desk) · nível de serviço (SLA)."
    ],
    "conexoes": [
      "governanca-tic-trt4",
      "snmp-gerencia",
      "backup",
      "devops"
    ],
    "avisosOraculo": [
      "Lembrete do ITIL 4 (base que a banca costuma cobrar): 7 princípios orientadores — foco no valor; comece de onde você está; progrida iterativamente com feedback; colabore e promova visibilidade; pense e trabalhe de forma holística; mantenha simples e prático; otimize e automatize. 4 dimensões — organizações e pessoas; informação e tecnologia; parceiros e fornecedores; fluxos de valor e processos. (lista do ITIL 4 por conhecimento consolidado; conferir se a Version 5 mudou a redação)",
      "Fontes são de parceiros de treinamento/comunidade; a publicação oficial (PeopleCert) é paga — refinar quando tiver acesso."
    ],
    "fontes": [
      {
        "label": "ITSM.tools – ITIL Version 5 explained",
        "url": "https://itsm.tools/itil-version-5-explained-key-changes-lifecycle-ai-governance/"
      },
      {
        "label": "ITSM.tools – o que é velho e o que é novo",
        "url": "https://itsm.tools/?p=36383"
      },
      {
        "label": "Global Knowledge – ITIL Version 5 FAQ (34 práticas)",
        "url": "https://www.globalknowledge.com/en-ca/certifications/certification-training/itil/itil-version-5-certification-faq"
      },
      {
        "label": "New Horizons – lançamento fev/2026",
        "url": "https://www.newhorizons.com/resources/blog/what-is-itil-version-5"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** o framework de **gerenciamento de serviços (e agora de produtos) digitais**, mantido pela **PeopleCert**. A **ITIL (Version 5)** foi lançada com o **ITIL Foundation em fevereiro/2026**, com módulos avançados em fases. ITIL 4 e Version 5 convivem; certificações antigas continuam válidas.\n- **O que continua (herança do ITIL 4):** os **princípios orientadores**, as **quatro dimensões** e as **práticas** (\"o antigo\").\n- **O que é novo:**\n  - **ITIL Product and Service Lifecycle** — modelo que **une gestão de produto digital e de serviço**;\n  - foco em **experiência** (cliente/usuário/colaborador) com orientação prática;\n  - **IA** integrada (inclusive **governança de IA**);\n  - **ITIL Value System** atualizado como modelo central;\n  - **34 práticas** (Version 5).\n- **Trilha de certificação:** Foundation → designações (**ITIL Product, ITIL Service, ITIL Experience** …) → **ITIL Master**.\n- **Lembrete do ITIL 4 (base que a banca costuma cobrar):** **7 princípios orientadores** — foco no valor; comece de onde você está; progrida iterativamente com feedback; colabore e promova visibilidade; pense e trabalhe de forma holística; mantenha simples e prático; otimize e automatize. **4 dimensões** — organizações e pessoas; informação e tecnologia; parceiros e fornecedores; fluxos de valor e processos. ⚠️ (lista do ITIL 4 por conhecimento consolidado; conferir se a Version 5 mudou a redação)\n- **Práticas clássicas que caem:** gerenciamento de **incidente** (restaurar o serviço rápido) × **problema** (achar a **causa raiz**) · **requisição de serviço** · **mudança** (habilitação de mudanças) · **central de serviço (service desk)** · **nível de serviço (SLA)**.\n- **Exemplo prático:** o PJe cai numa vara → **incidente** (restabelecer); o time descobre que a causa é um *pool* de conexões mal configurado → **problema**; a correção entra por **gerenciamento de mudança**.\n- **Conexões:** [[governanca-tic-trt4]] · [[snmp-gerencia]] (SLA/QoS) · [[backup]] (continuidade) · [[devops]] (Value System integra Lean/Agile/DevOps)\n- **Fontes:** [ITSM.tools – ITIL Version 5 explained](https://itsm.tools/itil-version-5-explained-key-changes-lifecycle-ai-governance/) · [ITSM.tools – o que é velho e o que é novo](https://itsm.tools/?p=36383) · [Global Knowledge – ITIL Version 5 FAQ (34 práticas)](https://www.globalknowledge.com/en-ca/certifications/certification-training/itil/itil-version-5-certification-faq) · [New Horizons – lançamento fev/2026](https://www.newhorizons.com/resources/blog/what-is-itil-version-5)\n- ⚠️ Fontes são de parceiros de treinamento/comunidade; a publicação oficial (PeopleCert) é paga — refinar quando tiver acesso."
  },
  {
    "id": "cobit",
    "aliasIds": [],
    "titulo": "COBIT® 2019 (ISACA)",
    "zonaId": "12-governanca-e-gestao-de-ti",
    "regiaoId": "cidadela-do-conselho",
    "materia": "Gestão e Governança de TI",
    "cargo": "analista",
    "npcName": "Secretário Otávio II",
    "npcRole": "juiz",
    "npcSeed": 1512053406,
    "oQueE": "O que é: framework de governança e gestão de informação e tecnologia (I&T) corporativa da ISACA, lançado em 2018 (sucessor do COBIT 5, de 2012).",
    "exemploPratico": "Exemplo prático: o Comitê de Governança de TIC do TRT4 (que prioriza e monitora) faz o papel de EDM; a SGTI (Secretaria-Geral de Tecnologia e Inovação, antiga SETIC) executa APO/BAI/DSS; auditoria interna e indicadores do PDTIC ≈ MEA.",
    "fatosChave": [
      "O que é: framework de governança e gestão de informação e tecnologia (I&T) corporativa da ISACA, lançado em 2018 (sucessor do COBIT 5, de 2012).",
      "Governança × gestão: governança = Avaliar, Dirigir e Monitorar (EDM) — papel do conselho/alta direção; gestão = planejar, construir, executar e monitorar.",
      "40 objetivos (cada um ligado a um processo), em 5 domínios:",
      "Componentes do sistema de governança (substituem os \"habilitadores\" do COBIT 5) — 7: processos; estruturas organizacionais; princípios, políticas e frameworks; informação; cultura, ética e comportamento; pessoas, habilidades e competências; serviços, infraestrutura e aplicações.",
      "Novidades do 2019: fatores de desenho (design factors) que adaptam o sistema de governança à organização; áreas de foco (ex.: DevOps, risco, segurança); cascata de metas atualizada; gestão de desempenho por níveis de capacidade (alinhada ao CMMI)."
    ],
    "conexoes": [
      "governanca-tic-trt4",
      "pdtic-trt4",
      "cmmi",
      "iso-27001",
      "res-cnj-396-2021",
      "itil"
    ],
    "avisosOraculo": [
      "A contagem por domínio (14/11/6/4) e os nomes exatos dos 7 componentes vêm de conhecimento consolidado do COBIT 2019, coerentes com o total 40 e \"5 + 35\" confirmados nas fontes; conferir no Framework: Introduction & Methodology (download gratuito no site da ISACA)."
    ],
    "fontes": [
      {
        "label": "ISACA – COBIT 2019 × COBIT 5 (37→40, design factors)",
        "url": "https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-2019-and-cobit-5-comparison"
      },
      {
        "label": "ISACA – \"A new COBIT is in town\" (componentes, EDM)",
        "url": "https://www.isaca.org/resources/news-and-trends/industry-news/2018/a-new-cobit-is-in-town-and-i-really-like-how-it-looks"
      },
      {
        "label": "ISACA – Governance & Management Objectives (40)",
        "url": "https://www.isaca.org/bookstore/cobit-19/cb19fgm"
      },
      {
        "label": "ManageEngine – 5 de governança + 35 de gestão; 7 componentes",
        "url": "https://www.manageengine.com/products/service-desk/itsm/cobit-vs-itil.html"
      }
    ],
    "tablePairs": [
      {
        "term": "EDM – Evaluate, Direct and Monitor",
        "definition": "Tipo: governança · Nº: 5",
        "rawRow": "EDM – Evaluate, Direct and Monitor — governança — 5"
      },
      {
        "term": "APO – Align, Plan and Organize",
        "definition": "Tipo: gestão · Nº: 14",
        "rawRow": "APO – Align, Plan and Organize — gestão — 14"
      },
      {
        "term": "BAI – Build, Acquire and Implement",
        "definition": "Tipo: gestão · Nº: 11",
        "rawRow": "BAI – Build, Acquire and Implement — gestão — 11"
      },
      {
        "term": "DSS – Deliver, Service and Support",
        "definition": "Tipo: gestão · Nº: 6",
        "rawRow": "DSS – Deliver, Service and Support — gestão — 6"
      },
      {
        "term": "MEA – Monitor, Evaluate and Assess",
        "definition": "Tipo: gestão · Nº: 4",
        "rawRow": "MEA – Monitor, Evaluate and Assess — gestão — 4"
      }
    ],
    "textoCompleto": "- **O que é:** framework de **governança e gestão de informação e tecnologia (I&T) corporativa** da **ISACA**, lançado em **2018** (sucessor do COBIT 5, de 2012).\n- **Governança × gestão:** **governança** = **Avaliar, Dirigir e Monitorar (EDM)** — papel do conselho/alta direção; **gestão** = planejar, construir, executar e monitorar.\n- **40 objetivos** (cada um ligado a **um processo**), em **5 domínios**:\n\n| Domínio | Tipo | Nº |\n| --- | --- | --- |\n| **EDM** – Evaluate, Direct and Monitor | governança | 5 |\n| **APO** – Align, Plan and Organize | gestão | 14 |\n| **BAI** – Build, Acquire and Implement | gestão | 11 |\n| **DSS** – Deliver, Service and Support | gestão | 6 |\n| **MEA** – Monitor, Evaluate and Assess | gestão | 4 |\n\n  → **5 de governança + 35 de gestão = 40** (eram 37 processos no COBIT 5).\n- **Componentes do sistema de governança** (substituem os \"habilitadores\" do COBIT 5) — **7**: processos; estruturas organizacionais; princípios, políticas e frameworks; informação; cultura, ética e comportamento; pessoas, habilidades e competências; serviços, infraestrutura e aplicações.\n- **Novidades do 2019:** **fatores de desenho (design factors)** que adaptam o sistema de governança à organização; **áreas de foco** (ex.: DevOps, risco, segurança); **cascata de metas** atualizada; gestão de desempenho por **níveis de capacidade** (alinhada ao CMMI).\n- **Exemplo prático:** o **Comitê de Governança de TIC do TRT4** (que prioriza e monitora) faz o papel de **EDM**; a **SGTI** (Secretaria-Geral de Tecnologia e Inovação, antiga SETIC) executa APO/BAI/DSS; auditoria interna e indicadores do PDTIC ≈ **MEA**.\n- **Conexões:** [[governanca-tic-trt4]] · [[pdtic-trt4]] · [[cmmi]] (níveis de capacidade) · [[iso-27001]] (segurança é área de foco) · [[res-cnj-396-2021]] · [[itil]] (DSS ≈ operação de serviços)\n- **Fontes:** [ISACA – COBIT 2019 × COBIT 5 (37→40, design factors)](https://www.isaca.org/resources/news-and-trends/industry-news/2020/cobit-2019-and-cobit-5-comparison) · [ISACA – \"A new COBIT is in town\" (componentes, EDM)](https://www.isaca.org/resources/news-and-trends/industry-news/2018/a-new-cobit-is-in-town-and-i-really-like-how-it-looks) · [ISACA – Governance & Management Objectives (40)](https://www.isaca.org/bookstore/cobit-19/cb19fgm) · [ManageEngine – 5 de governança + 35 de gestão; 7 componentes](https://www.manageengine.com/products/service-desk/itsm/cobit-vs-itil.html)\n- ⚠️ A contagem por domínio (14/11/6/4) e os nomes exatos dos 7 componentes vêm de conhecimento consolidado do COBIT 2019, coerentes com o total 40 e \"5 + 35\" confirmados nas fontes; conferir no *Framework: Introduction & Methodology* (download gratuito no site da ISACA).\n\n---"
  },
  {
    "id": "ingles-fcc",
    "aliasIds": [],
    "titulo": "Como a FCC costuma cobrar",
    "zonaId": "14-ingles-tecnico",
    "regiaoId": "porto-babel",
    "materia": "Inglês Técnico",
    "cargo": "ambos",
    "npcName": "Capitã Evelyn",
    "npcRole": "capitao",
    "npcSeed": 219925116,
    "oQueE": "Formato: um ou dois textos; cerca de 60% de questões curtas e 40% com alternativas longas ou que exigem ler o texto inteiro.",
    "exemploPratico": "",
    "fatosChave": [
      "Formato: um ou dois textos; cerca de 60% de questões curtas e 40% com alternativas longas ou que exigem ler o texto inteiro.",
      "Tipos de questão recorrentes:",
      "lacuna (fill in the blank) — preencher com verbo, advérbio, adjetivo, expressão de inglês técnico ou tempo verbal certo;",
      "sentido de palavra/expressão no texto (\"no texto, X pode ser traduzido como…\");",
      "ideia principal / objetivo do texto (deixe para o final, pede o texto todo);",
      "referência (a que se refere o it/they/which).",
      "Histórico: já houve prova de inglês comentada para Técnico Judiciário (TI) do TRT 20ª Região (FCC) — bom material de treino."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Estratégia – a \"cara\" da prova de inglês FCC",
        "url": "https://www.estrategiaconcursos.com.br/blog/?p=440641"
      },
      {
        "label": "Estratégia – Inglês TRT20 Técnico TI comentado",
        "url": "https://www.estrategiaconcursos.com.br/blog/prova-de-ingles-comentada-trt-20a-regiao-tecnico-judiciario-ti/amp/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Formato:** **um ou dois textos**; cerca de **60% de questões curtas** e **40% com alternativas longas** ou que exigem ler o texto inteiro.\n- **Tipos de questão recorrentes:**\n  - **lacuna** (*fill in the blank*) — preencher com verbo, advérbio, adjetivo, **expressão de inglês técnico** ou tempo verbal certo;\n  - **sentido de palavra/expressão** no texto (\"no texto, *X* pode ser traduzido como…\");\n  - **ideia principal / objetivo do texto** (deixe para o final, pede o texto todo);\n  - **referência** (a que se refere o *it/they/which*).\n- **Histórico:** já houve prova de inglês comentada para **Técnico Judiciário (TI) do TRT 20ª Região** (FCC) — bom material de treino.\n- **Fontes:** [Estratégia – a \"cara\" da prova de inglês FCC](https://www.estrategiaconcursos.com.br/blog/?p=440641) · [Estratégia – Inglês TRT20 Técnico TI comentado](https://www.estrategiaconcursos.com.br/blog/prova-de-ingles-comentada-trt-20a-regiao-tecnico-judiciario-ti/amp/)"
  },
  {
    "id": "ingles-vocabulario",
    "aliasIds": [],
    "titulo": "Vocabulário de TI que reaparece (e conecta com o resto do edital)",
    "zonaId": "14-ingles-tecnico",
    "regiaoId": "porto-babel",
    "materia": "Inglês Técnico",
    "cargo": "ambos",
    "npcName": "Timoneiro Arthur",
    "npcRole": "sabio",
    "npcSeed": 235417421,
    "oQueE": "deploy / deployment: Sentido em TI: implantar / implantação · Onde aparece: ci-cd | release: Sentido em TI: versão liberada / lançamento · Onde aparece: gitflow",
    "exemploPratico": "",
    "fatosChave": [],
    "conexoes": [
      "ci-cd",
      "gitflow",
      "git",
      "github-gitlab",
      "wsus",
      "spring-boot",
      "api-rest",
      "lgpd",
      "owasp",
      "snmp-gerencia",
      "cid",
      "pmbok",
      "engenharia-requisitos",
      "ageis"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [
      {
        "term": "deploy / deployment",
        "definition": "Sentido em TI: implantar / implantação · Onde aparece: ci-cd",
        "rawRow": "deploy / deployment — implantar / implantação — ci-cd"
      },
      {
        "term": "release",
        "definition": "Sentido em TI: versão liberada / lançamento · Onde aparece: gitflow",
        "rawRow": "release — versão liberada / lançamento — gitflow"
      },
      {
        "term": "branch / merge / commit",
        "definition": "Sentido em TI: ramo / mesclar / gravar versão · Onde aparece: git",
        "rawRow": "branch / merge / commit — ramo / mesclar / gravar versão — git"
      },
      {
        "term": "issue",
        "definition": "Sentido em TI: problema, tarefa (não \"edição\") · Onde aparece: github-gitlab",
        "rawRow": "issue — problema, tarefa (não \"edição\") — github-gitlab"
      },
      {
        "term": "bug / fix / patch",
        "definition": "Sentido em TI: defeito / correção / pacote de correção · Onde aparece: wsus",
        "rawRow": "bug / fix / patch — defeito / correção / pacote de correção — wsus"
      },
      {
        "term": "framework / library",
        "definition": "Sentido em TI: arcabouço / biblioteca (não \"livraria\") · Onde aparece: spring-boot",
        "rawRow": "framework / library — arcabouço / biblioteca (não \"livraria\") — spring-boot"
      },
      {
        "term": "endpoint",
        "definition": "Sentido em TI: ponto de acesso de uma API · Onde aparece: api-rest",
        "rawRow": "endpoint — ponto de acesso de uma API — api-rest"
      },
      {
        "term": "breach",
        "definition": "Sentido em TI: violação (de dados/segurança) · Onde aparece: lgpd",
        "rawRow": "breach — violação (de dados/segurança) — lgpd"
      },
      {
        "term": "threat / vulnerability / exploit",
        "definition": "Sentido em TI: ameaça / vulnerabilidade / código que explora a falha · Onde aparece: owasp",
        "rawRow": "threat / vulnerability / exploit — ameaça / vulnerabilidade / código que explora a falha — owasp"
      },
      {
        "term": "throughput / latency",
        "definition": "Sentido em TI: vazão / latência · Onde aparece: snmp-gerencia",
        "rawRow": "throughput / latency — vazão / latência — snmp-gerencia"
      },
      {
        "term": "scalability / availability",
        "definition": "Sentido em TI: escalabilidade / disponibilidade · Onde aparece: cid",
        "rawRow": "scalability / availability — escalabilidade / disponibilidade — cid"
      },
      {
        "term": "stakeholder",
        "definition": "Sentido em TI: parte interessada · Onde aparece: pmbok",
        "rawRow": "stakeholder — parte interessada — pmbok"
      },
      {
        "term": "requirement",
        "definition": "Sentido em TI: requisito · Onde aparece: engenharia-requisitos",
        "rawRow": "requirement — requisito — engenharia-requisitos"
      },
      {
        "term": "backlog / sprint",
        "definition": "Sentido em TI: lista priorizada / ciclo do Scrum · Onde aparece: ageis",
        "rawRow": "backlog / sprint — lista priorizada / ciclo do Scrum — ageis"
      }
    ],
    "textoCompleto": "> Mini-glossário de estudo (tradução usual em TI). Cada termo aponta para o assunto da prova onde ele vive.\n\n| Termo | Sentido em TI | Onde aparece |\n| --- | --- | --- |\n| *deploy / deployment* | implantar / implantação | [[ci-cd]] |\n| *release* | versão liberada / lançamento | [[gitflow]] |\n| *branch / merge / commit* | ramo / mesclar / gravar versão | [[git]] |\n| *issue* | problema, tarefa (não \"edição\") | [[github-gitlab]] |\n| *bug / fix / patch* | defeito / correção / pacote de correção | [[wsus]] |\n| *framework / library* | arcabouço / **biblioteca** (não \"livraria\") | [[spring-boot]] |\n| *endpoint* | ponto de acesso de uma API | [[api-rest]] |\n| *breach* | violação (de dados/segurança) | [[lgpd]] |\n| *threat / vulnerability / exploit* | ameaça / vulnerabilidade / código que explora a falha | [[owasp]] |\n| *throughput / latency* | vazão / latência | [[snmp-gerencia]] |\n| *scalability / availability* | escalabilidade / disponibilidade | [[cid]] |\n| *stakeholder* | parte interessada | [[pmbok]] |\n| *requirement* | requisito | [[engenharia-requisitos]] |\n| *backlog / sprint* | lista priorizada / ciclo do Scrum | [[ageis]] |"
  },
  {
    "id": "ingles-armadilhas",
    "aliasIds": [],
    "titulo": "Falsos cognatos e conectivos (os que mais derrubam)",
    "zonaId": "14-ingles-tecnico",
    "regiaoId": "porto-babel",
    "materia": "Inglês Técnico",
    "cargo": "ambos",
    "npcName": "Tradutora Beatriz",
    "npcRole": "sabio",
    "npcSeed": 449759942,
    "oQueE": "Falsos cognatos: actually = na verdade · eventually = por fim/finalmente · pretend = fingir · library = biblioteca · data = dados · support = suportar/apoiar e também \"dar suporte\" · intend = pretender · assume = supor.",
    "exemploPratico": "",
    "fatosChave": [
      "Falsos cognatos: actually = na verdade · eventually = por fim/finalmente · pretend = fingir · library = biblioteca · data = dados · support = suportar/apoiar e também \"dar suporte\" · intend = pretender · assume = supor.",
      "Conectivos (mudam o sentido da frase!):",
      "contraste: however, although, though, whereas, nevertheless, despite/in spite of;",
      "causa/consequência: because, since, as, therefore, thus, hence, consequently;",
      "adição: moreover, furthermore, in addition, besides;",
      "condição: unless (= a menos que), provided that (= desde que).",
      "Modais: must (obrigação/forte certeza), should (recomendação), may/might (possibilidade), can/could (capacidade/possibilidade)."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Esta seção é material didático geral (conhecimento linguístico), não extraído de fonte oficial."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Falsos cognatos:** *actually* = na verdade · *eventually* = por fim/finalmente · *pretend* = fingir · *library* = biblioteca · *data* = dados · *support* = suportar/apoiar e também \"dar suporte\" · *intend* = pretender · *assume* = supor.\n- **Conectivos (mudam o sentido da frase!):**\n  - contraste: *however, although, though, whereas, nevertheless, despite/in spite of*;\n  - causa/consequência: *because, since, as, therefore, thus, hence, consequently*;\n  - adição: *moreover, furthermore, in addition, besides*;\n  - condição: *unless* (= a menos que), *provided that* (= desde que).\n- **Modais:** *must* (obrigação/forte certeza), *should* (recomendação), *may/might* (possibilidade), *can/could* (capacidade/possibilidade).\n- ⚠️ Esta seção é material didático geral (conhecimento linguístico), não extraído de fonte oficial."
  },
  {
    "id": "processo-software",
    "aliasIds": [],
    "titulo": "Processo de desenvolvimento de software e ciclo de vida",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Mago Ada",
    "npcRole": "ferreiro",
    "npcSeed": 1509962809,
    "oQueE": "O que é: conjunto organizado de atividades para produzir software (requisitos → projeto → implementação → testes → implantação → manutenção).",
    "exemploPratico": "Exemplo prático: um sistema de folha feito em cascata só é entregue no fim; em Scrum, entregas a cada Sprint.",
    "fatosChave": [
      "O que é: conjunto organizado de atividades para produzir software (requisitos → projeto → implementação → testes → implantação → manutenção).",
      "Modelos tradicionais (o Técnico cobra \"metodologias tradicionais\"): cascata (fases sequenciais), incremental, espiral (iterativo e orientado a riscos). Contraste com ágeis → ageis."
    ],
    "conexoes": [
      "ageis",
      "iso-12207",
      "cmmi",
      "mps-br",
      "pmbok"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** conjunto organizado de atividades para produzir software (requisitos → projeto → implementação → testes → implantação → manutenção).\n- **Modelos tradicionais** (o Técnico cobra \"metodologias tradicionais\"): cascata (fases sequenciais), incremental, espiral (iterativo e orientado a riscos). Contraste com ágeis → [[ageis]].\n- **Exemplo prático:** um sistema de folha feito em cascata só é entregue no fim; em Scrum, entregas a cada Sprint.\n- **Conexões:** [[iso-12207]] (padroniza os processos) · [[cmmi]] e [[mps-br]] (medem a maturidade dos processos) · [[pmbok]] (gestão do projeto)\n\n---"
  },
  {
    "id": "cmmi",
    "aliasIds": [],
    "titulo": "CMMI v3.0 — domínio Development",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Ferreira Turing",
    "npcRole": "ferreiro",
    "npcSeed": 1505102581,
    "oQueE": "O que é: Capability Maturity Model Integration, modelo de melhoria de processos administrado pelo CMMI Institute (ISACA). A v3.0 saiu em 6 de abril de 2023; desde 01/01/2024 só se aceitam avaliações na v3.0.",
    "exemploPratico": "Exemplo prático: uma fábrica de software contratada pelo tribunal pode ter que comprovar CMMI nível 3 (processos padronizados na organização).",
    "fatosChave": [
      "O que é: Capability Maturity Model Integration, modelo de melhoria de processos administrado pelo CMMI Institute (ISACA). A v3.0 saiu em 6 de abril de 2023; desde 01/01/2024 só se aceitam avaliações na v3.0.",
      "Níveis de maturidade (5): 1 Inicial · 2 Gerenciado · 3 Definido · 4 Quantitativamente Gerenciado · 5 Em Otimização.",
      "Novidades da v3.0:",
      "Domínios: Data, Development, People, Safety, Security, Services, Suppliers e Virtual (o antigo \"Supplier Management\" virou \"Suppliers\").",
      "Nova Capability Area Managing Data e novas Practice Areas: Data Management (DM), Data Quality (DQ) e Workforce Empowerment (WE).",
      "Informações de contexto para DevSecOps, Data e People.",
      "A área Supplier Source Selection foi aposentada (parte foi para Supplier Agreement Management).",
      "Desde a v2.0: não há mais as representações \"contínua\" e \"por estágios\" separadas — é um modelo único."
    ],
    "conexoes": [
      "mps-br",
      "cobit",
      "devops"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CMMI Institute – Content Changes v3.0",
        "url": "https://cmmiinstitute.com/getattachment/47a7c84e-472c-4f7f-a473-ddc21c6ae045/attachment.aspx"
      },
      {
        "label": "ISACA – press release",
        "url": "https://www.isaca.org/about-us/newsroom/press-releases/2023/isaca-updates-cmmi-model-with-three-new-domains-that-help-organizations-improve-quality"
      },
      {
        "label": "The Core Solution – v3.0",
        "url": "https://www.thecoresolution.com/cmmi-v3-update-explained"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** *Capability Maturity Model Integration*, modelo de melhoria de processos administrado pelo **CMMI Institute (ISACA)**. A **v3.0 saiu em 6 de abril de 2023**; desde 01/01/2024 só se aceitam avaliações na v3.0.\n- **Níveis de maturidade (5):** 1 Inicial · 2 Gerenciado · 3 Definido · 4 Quantitativamente Gerenciado · 5 Em Otimização.\n- **Novidades da v3.0:**\n  - Domínios: **Data, Development, People, Safety, Security, Services, Suppliers e Virtual** (o antigo \"Supplier Management\" virou \"Suppliers\").\n  - Nova *Capability Area* **Managing Data** e novas *Practice Areas*: **Data Management (DM), Data Quality (DQ) e Workforce Empowerment (WE)**.\n  - Informações de contexto para **DevSecOps**, Data e People.\n  - A área *Supplier Source Selection* foi aposentada (parte foi para *Supplier Agreement Management*).\n- **Desde a v2.0:** não há mais as representações \"contínua\" e \"por estágios\" separadas — é um modelo único.\n- **Exemplo prático:** uma fábrica de software contratada pelo tribunal pode ter que comprovar CMMI nível 3 (processos padronizados na organização).\n- **Conexões:** [[mps-br]] (versão brasileira, mapeável ao CMMI) · [[cobit]] (também usa níveis de capacidade) · [[devops]]\n- **Fontes:** [CMMI Institute – Content Changes v3.0](https://cmmiinstitute.com/getattachment/47a7c84e-472c-4f7f-a473-ddc21c6ae045/attachment.aspx) · [ISACA – press release](https://www.isaca.org/about-us/newsroom/press-releases/2023/isaca-updates-cmmi-model-with-three-new-domains-that-help-organizations-improve-quality) · [The Core Solution – v3.0](https://www.thecoresolution.com/cmmi-v3-update-explained)\n\n---"
  },
  {
    "id": "iso-12207",
    "aliasIds": [],
    "titulo": "ABNT NBR ISO/IEC/IEEE 12207:2021 — processos do ciclo de vida do software",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Druida Grace",
    "npcRole": "ferreiro",
    "npcSeed": 87474961,
    "oQueE": "O que é: norma que define um vocabulário e um conjunto de processos para o ciclo de vida do software. A ABNT 2021 é a adoção brasileira da edição internacional de 2017.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: norma que define um vocabulário e um conjunto de processos para o ciclo de vida do software. A ABNT 2021 é a adoção brasileira da edição internacional de 2017.",
      "4 grupos de processos:",
      "Ponto que cai: a norma não prescreve modelo de ciclo de vida, metodologia ou técnica — ela diz o que os processos devem alcançar, não como."
    ],
    "conexoes": [
      "mps-br",
      "git",
      "iso-27005"
    ],
    "avisosOraculo": [
      "Saiu a ISO/IEC/IEEE 12207:2026 (abril/2026), mas o edital cobra a versão ABNT 2021."
    ],
    "fontes": [
      {
        "label": "Wikipedia – ISO/IEC 12207",
        "url": "https://en.wikipedia.org/wiki/ISO/IEC_12207"
      },
      {
        "label": "arc42 quality – resumo",
        "url": "https://quality.arc42.org/standards/iso12207"
      },
      {
        "label": "IEEE – 12207-2026",
        "url": "https://standards.ieee.org/standard/12207-2026.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** norma que define um vocabulário e um conjunto de **processos** para o ciclo de vida do software. A ABNT 2021 é a adoção brasileira da edição internacional de **2017**.\n- **4 grupos de processos:**\n  1. **Acordo** (aquisição e fornecimento);\n  2. **Habilitação de projetos organizacionais** (gestão de modelo de ciclo de vida, infraestrutura, portfólio, RH, qualidade);\n  3. **Gestão técnica** (planejamento, avaliação e controle, decisão, **riscos**, **configuração**, informação, medição, garantia da qualidade);\n  4. **Técnicos** (requisitos, arquitetura, projeto, implementação, integração, verificação, transição, validação, operação, manutenção, descarte).\n- **Ponto que cai:** a norma **não prescreve** modelo de ciclo de vida, metodologia ou técnica — ela diz *o que* os processos devem alcançar, não *como*.\n- ⚠️ Saiu a **ISO/IEC/IEEE 12207:2026** (abril/2026), mas o edital cobra a versão ABNT 2021.\n- **Conexões:** [[mps-br]] (o MPS nasceu baseado na 12207) · [[git]] (gestão de configuração) · [[iso-27005]]\n- **Fontes:** [Wikipedia – ISO/IEC 12207](https://en.wikipedia.org/wiki/ISO/IEC_12207) · [arc42 quality – resumo](https://quality.arc42.org/standards/iso12207) · [IEEE – 12207-2026](https://standards.ieee.org/standard/12207-2026.html)\n\n---"
  },
  {
    "id": "mps-br",
    "aliasIds": [],
    "titulo": "MR-MPS-SW versão 2024 (MPS.BR)",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Arquiteta Barbara",
    "npcRole": "ferreiro",
    "npcSeed": 810738352,
    "oQueE": "O que é: Modelo de Referência MPS para Software, iniciativa brasileira coordenada pela SOFTEX. Versão vigente: Guia Geral MPS de Software:2024.",
    "exemploPratico": "Exemplo de cobrança (questão real de concurso): \"assinale a afirmativa que descreve o nível D\" → gestão mais rigorosa da execução dos processos e dos produtos de trabalho.",
    "fatosChave": [
      "O que é: Modelo de Referência MPS para Software, iniciativa brasileira coordenada pela SOFTEX. Versão vigente: Guia Geral MPS de Software:2024.",
      "7 níveis de maturidade (do G ao A):",
      "Estrutura atual: nos níveis G e F os processos são implementados; nos níveis E a A ocorre a evolução da capacidade desses processos.",
      "Comparação com o CMMI: o MPS tem 7 degraus (mais graduais, pensados para pequenas e médias empresas), o CMMI tem 5."
    ],
    "conexoes": [
      "cmmi",
      "iso-12207"
    ],
    "avisosOraculo": [
      "A lista exata de processos por nível mudou entre as versões do guia. Antes de decorar, confira no Guia Geral MPS de Software:2024 (site da SOFTEX)."
    ],
    "fontes": [
      {
        "label": "Gran – questão MPS-SW:2024",
        "url": "https://questoes.grancursosonline.com.br/questoes-de-concursos/tecnologia-da-informacao-mps-br-qualidade-de-software-428905"
      },
      {
        "label": "SBC – WAMPS (estrutura 2024)",
        "url": "https://sol.sbc.org.br/index.php/wamps/article/download/33373/33168"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** Modelo de Referência MPS para Software, iniciativa brasileira coordenada pela **SOFTEX**. Versão vigente: **Guia Geral MPS de Software:2024**.\n- **7 níveis de maturidade (do G ao A):**\n\n| Nível | Nome |\n| --- | --- |\n| G | Parcialmente Gerenciado |\n| F | Gerenciado |\n| E | Parcialmente Definido |\n| D | Largamente Definido |\n| C | Definido |\n| B | Gerenciado Quantitativamente |\n| A | Em Otimização |\n\n- **Estrutura atual:** nos níveis **G e F** os **processos** são implementados; nos níveis E a A ocorre a **evolução da capacidade** desses processos.\n- **Comparação com o CMMI:** o MPS tem 7 degraus (mais graduais, pensados para pequenas e médias empresas), o CMMI tem 5.\n- **Exemplo de cobrança (questão real de concurso):** \"assinale a afirmativa que descreve o nível D\" → gestão mais rigorosa da execução dos processos e dos produtos de trabalho.\n- **Conexões:** [[cmmi]] · [[iso-12207]]\n- **Fontes:** [Gran – questão MPS-SW:2024](https://questoes.grancursosonline.com.br/questoes-de-concursos/tecnologia-da-informacao-mps-br-qualidade-de-software-428905) · [SBC – WAMPS (estrutura 2024)](https://sol.sbc.org.br/index.php/wamps/article/download/33373/33168)\n- ⚠️ A lista exata de processos por nível mudou entre as versões do guia. Antes de decorar, confira no Guia Geral MPS de Software:2024 (site da SOFTEX).\n\n---"
  },
  {
    "id": "uml",
    "aliasIds": [],
    "titulo": "UML 2.5.1",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Escriba Dijkstra",
    "npcRole": "ferreiro",
    "npcSeed": 886191409,
    "oQueE": "O que é: Unified Modeling Language, mantida pela OMG. Notação para modelar sistemas orientados a objetos.",
    "exemploPratico": "Exemplo prático: o diagrama de sequência mostra a ordem das chamadas entre o front-end Angular, o API Gateway e um microsserviço.",
    "fatosChave": [
      "O que é: Unified Modeling Language, mantida pela OMG. Notação para modelar sistemas orientados a objetos.",
      "14 diagramas em 2 grupos:",
      "Estruturais (estáticos): classes, objetos, componentes, implantação, pacotes, estrutura composta, perfil.",
      "Comportamentais (dinâmicos): casos de uso, atividades, máquina de estados, e os de interação: sequência, comunicação, visão geral de interação, tempo."
    ],
    "conexoes": [
      "oo",
      "bpmn",
      "engenharia-requisitos"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Gran – UML 2.5",
        "url": "https://blog.grancursosonline.com.br/uml/amp/"
      },
      {
        "label": "Lucid – UML e OMG",
        "url": "https://lucid.co/pt/diagrama/uml/tutorial"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** *Unified Modeling Language*, mantida pela **OMG**. Notação para modelar sistemas orientados a objetos.\n- **14 diagramas em 2 grupos:**\n  - **Estruturais (estáticos):** classes, objetos, componentes, implantação, pacotes, estrutura composta, perfil.\n  - **Comportamentais (dinâmicos):** casos de uso, atividades, máquina de estados, e os de **interação**: sequência, comunicação, visão geral de interação, tempo.\n- **Exemplo prático:** o diagrama de **sequência** mostra a ordem das chamadas entre o front-end Angular, o API Gateway e um microsserviço.\n- **Conexões:** [[oo]] (diagrama de classes = herança, interfaces, associações) · [[bpmn]] (atividades da UML × processos de negócio do BPMN) · [[engenharia-requisitos]] (casos de uso)\n- **Fontes:** [Gran – UML 2.5](https://blog.grancursosonline.com.br/uml/amp/) · [Lucid – UML e OMG](https://lucid.co/pt/diagrama/uml/tutorial)\n\n---"
  },
  {
    "id": "bpmn",
    "aliasIds": [],
    "titulo": "BPMN (Business Process Model and Notation)",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Guardiã Liskov",
    "npcRole": "mago",
    "npcSeed": 1931217528,
    "oQueE": "O que é: notação da OMG para modelar processos de negócio. A versão 2.0 (2011) mudou o nome para \"Modelo e Notação de Processos de Negócio\".",
    "exemploPratico": "Exemplo prático: o TRT4 tem um processo formal de \"Modelagem e Gestão de Processos de TIC\" (Portaria GP.TRT4 76/2025) — é BPMN no dia a dia.",
    "fatosChave": [
      "O que é: notação da OMG para modelar processos de negócio. A versão 2.0 (2011) mudou o nome para \"Modelo e Notação de Processos de Negócio\".",
      "4 categorias de elementos:",
      "Pegadinha clássica: fluxo de sequência não cruza pools; entre pools usa-se fluxo de mensagem."
    ],
    "conexoes": [
      "uml",
      "itil",
      "governanca-tic-trt4"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Lucidchart – o que é BPMN",
        "url": "https://www.lucidchart.com/pages/pt/o-que-e-bpmn"
      },
      {
        "label": "USP – BPMN 2.0",
        "url": "https://edisciplinas.usp.br/mod/resource/view.php?id=2680876"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** notação da **OMG** para modelar **processos de negócio**. A versão 2.0 (2011) mudou o nome para \"Modelo e Notação de Processos de Negócio\".\n- **4 categorias de elementos:**\n  1. **Objetos de fluxo:** eventos (início, intermediário, fim), atividades (tarefas, subprocessos), **gateways** (exclusivo, inclusivo, paralelo, baseado em eventos, complexo).\n  2. **Objetos de conexão:** **fluxo de sequência** (ordem dentro de um participante), **fluxo de mensagem** (entre participantes/pools), associação.\n  3. **Raias (swimlanes):** **pool** (participante) e **lane** (subdivisão dentro do pool).\n  4. **Artefatos:** objeto de dados, grupo, anotação.\n- **Pegadinha clássica:** fluxo de sequência **não cruza** pools; entre pools usa-se **fluxo de mensagem**.\n- **Exemplo prático:** o TRT4 tem um processo formal de \"Modelagem e Gestão de Processos de TIC\" (Portaria GP.TRT4 76/2025) — é BPMN no dia a dia.\n- **Conexões:** [[uml]] · [[itil]] (processos de serviço) · [[governanca-tic-trt4]]\n- **Fontes:** [Lucidchart – o que é BPMN](https://www.lucidchart.com/pages/pt/o-que-e-bpmn) · [USP – BPMN 2.0](https://edisciplinas.usp.br/mod/resource/view.php?id=2680876)\n\n---"
  },
  {
    "id": "ageis",
    "aliasIds": [],
    "titulo": "Métodos ágeis: Scrum, Kanban, XP",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Alquimista Linus",
    "npcRole": "mago",
    "npcSeed": 1659919956,
    "oQueE": "O que é: método de gestão de fluxo originado no sistema de produção da Toyota.",
    "exemploPratico": "",
    "fatosChave": [
      "Subtópico: Scrum (Guia 2020)",
      "Estrutura \"3-5-3\":",
      "3 responsabilidades (accountabilities): Product Owner, Scrum Master, Developers. Um único Scrum Team, sem sub-times ou hierarquias.",
      "5 eventos: Sprint (contêiner), Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.",
      "3 artefatos e seus compromissos: Product Backlog → Meta do Produto; Sprint Backlog → Meta da Sprint; Incremento → Definição de Pronto (DoD).",
      "Mudanças de 2020 que caem: \"papéis\" viraram \"responsabilidades\"; acabou o \"Time de Desenvolvimento\" (agora \"Developers\"); entrou a Meta do Produto; saíram as 3 perguntas da Daily.",
      "Product Owner é uma pessoa, não um comitê.",
      "Subtópico: Kanban",
      "O que é: método de gestão de fluxo originado no sistema de produção da Toyota.",
      "Práticas centrais: visualizar o fluxo (quadro), limitar o WIP (trabalho em andamento), gerenciar o fluxo, políticas explícitas, ciclos de feedback, melhoria contínua. Métricas: lead time, cycle time, diagrama de fluxo cumulativo.",
      "Diferença para o Scrum: fluxo contínuo, sem Sprints de tamanho fixo.",
      "Subtópico: XP (Extreme Programming)",
      "Foco: qualidade técnica do código.",
      "Práticas famosas: programação em par, TDD (teste antes do código), integração contínua, refatoração, releases pequenas, propriedade coletiva do código."
    ],
    "conexoes": [
      "testes-software",
      "ci-cd",
      "devops"
    ],
    "avisosOraculo": [
      "Em 2025 saiu o Scrum Guide Expansion Pack (Sutherland, Jocham, Coleman) — é complemento, não substitui o Guia 2020."
    ],
    "fontes": [
      {
        "label": "Scrum Guide 2020",
        "url": "https://www.scrumguides.org/scrum-guide.html"
      },
      {
        "label": "Revisões 2020",
        "url": "https://scrumguides.org/revisions.html"
      },
      {
        "label": "Expansion Pack 2025",
        "url": "https://sensiolabs.com/blog/2025/scrum-guide-expansion-pack-2025-key-insights-you-need-to-know"
      },
      {
        "label": "Atlassian – Kanban",
        "url": "https://www.atlassian.com/br/agile/kanban"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "### Scrum (Guia 2020)\n- **Estrutura \"3-5-3\":**\n  - **3 responsabilidades (*accountabilities*):** Product Owner, Scrum Master, Developers. Um único Scrum Team, **sem sub-times ou hierarquias**.\n  - **5 eventos:** Sprint (contêiner), Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective.\n  - **3 artefatos e seus compromissos:** Product Backlog → **Meta do Produto**; Sprint Backlog → **Meta da Sprint**; Incremento → **Definição de Pronto (DoD)**.\n- **Mudanças de 2020 que caem:** \"papéis\" viraram \"responsabilidades\"; acabou o \"Time de Desenvolvimento\" (agora \"Developers\"); entrou a **Meta do Produto**; saíram as 3 perguntas da Daily.\n- **Product Owner** é **uma pessoa**, não um comitê.\n- ⚠️ Em 2025 saiu o *Scrum Guide Expansion Pack* (Sutherland, Jocham, Coleman) — é **complemento**, não substitui o Guia 2020.\n\n### Kanban\n- **O que é:** método de gestão de fluxo originado no sistema de produção da Toyota.\n- **Práticas centrais:** **visualizar** o fluxo (quadro), **limitar o WIP** (trabalho em andamento), gerenciar o fluxo, políticas explícitas, ciclos de feedback, melhoria contínua. Métricas: *lead time*, *cycle time*, diagrama de fluxo cumulativo.\n- **Diferença para o Scrum:** fluxo **contínuo**, sem Sprints de tamanho fixo.\n\n### XP (Extreme Programming)\n- **Foco:** qualidade técnica do código.\n- **Práticas famosas:** programação em par, **TDD** (teste antes do código), **integração contínua**, refatoração, *releases* pequenas, propriedade coletiva do código.\n- **Conexões:** [[testes-software]] (TDD) · [[ci-cd]] (integração contínua) · [[devops]]\n- **Fontes:** [Scrum Guide 2020](https://www.scrumguides.org/scrum-guide.html) · [Revisões 2020](https://scrumguides.org/revisions.html) · [Expansion Pack 2025](https://sensiolabs.com/blog/2025/scrum-guide-expansion-pack-2025-key-insights-you-need-to-know) · [Atlassian – Kanban](https://www.atlassian.com/br/agile/kanban)\n\n---"
  },
  {
    "id": "engenharia-requisitos",
    "aliasIds": [],
    "titulo": "Engenharia de requisitos",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Engenheira Margaret",
    "npcRole": "ferreiro",
    "npcSeed": 2026542952,
    "oQueE": "O que é: processo de descobrir, documentar e manter o que o sistema deve fazer.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: processo de descobrir, documentar e manter o que o sistema deve fazer.",
      "Etapas: elicitação → análise → especificação → validação → gestão de requisitos.",
      "Funcionais: o que o sistema faz (\"emitir certidão negativa\").",
      "Não funcionais: qualidades e restrições (\"responder em até 2 s\", \"seguir a LGPD\", \"aderir ao MoReq-Jus\").",
      "Técnicas de elicitação: entrevistas, questionários, workshops, observação, leitura de documentos, protótipos."
    ],
    "conexoes": [
      "res-cnj-522-2023",
      "uml",
      "lgpd",
      "ageis"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "USP – Engenharia de Requisitos",
        "url": "https://edisciplinas.usp.br/mod/resource/view.php?id=5259573"
      },
      {
        "label": "UFPE – SWEBOK",
        "url": "https://www.cin.ufpe.br/~processos/TAES3/Livro/00-LIVRO/11-SWEBOK-v8_CORRIGIDO_Versao_Final_OK.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** processo de descobrir, documentar e manter o que o sistema deve fazer.\n- **Etapas:** elicitação → análise → especificação → validação → gestão de requisitos.\n- **Tipos:**\n  - **Funcionais:** o que o sistema faz (\"emitir certidão negativa\").\n  - **Não funcionais:** qualidades e restrições (\"responder em até 2 s\", \"seguir a LGPD\", \"aderir ao MoReq-Jus\").\n- **Técnicas de elicitação:** entrevistas, questionários, workshops, observação, leitura de documentos, protótipos.\n- **Conexões:** [[moreq-jus]] (é um catálogo de requisitos obrigatórios/desejáveis!) · [[uml]] (casos de uso) · [[lgpd]] (requisito não funcional) · [[ageis]] (histórias de usuário no Product Backlog)\n- **Fontes:** [USP – Engenharia de Requisitos](https://edisciplinas.usp.br/mod/resource/view.php?id=5259573) · [UFPE – SWEBOK](https://www.cin.ufpe.br/~processos/TAES3/Livro/00-LIVRO/11-SWEBOK-v8_CORRIGIDO_Versao_Final_OK.pdf)\n\n---"
  },
  {
    "id": "low-code",
    "aliasIds": [],
    "titulo": "Low-code e no-code",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Runista Fowler",
    "npcRole": "mago",
    "npcSeed": 1913562513,
    "oQueE": "Low-code: abordagem visual de desenvolvimento, com mínimo de codificação manual (arrastar e soltar, componentes prontos, modelos). Ainda permite código/scripts.",
    "exemploPratico": "Exemplo prático: um formulário de pedido de férias montado no Power Apps por um servidor do RH.",
    "fatosChave": [
      "Low-code: abordagem visual de desenvolvimento, com mínimo de codificação manual (arrastar e soltar, componentes prontos, modelos). Ainda permite código/scripts.",
      "No-code: para a Gartner, é um subconjunto do low-code em que tudo (exceto fórmulas e expressões) é feito por modelagem visual ou configuração.",
      "Base técnica: design orientado a modelos, geração automática de código, programação visual.",
      "Cidadão desenvolvedor (citizen developer): usuário de negócio, sem formação em programação, que cria apps nessas plataformas — com governança da TI.",
      "Riscos a lembrar: shadow IT, dependência do fornecedor (atenção à proibição de dependência tecnológica do art. 5º da res-cnj-335-2020)."
    ],
    "conexoes": [
      "res-cnj-335-2020"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "IBM – low-code",
        "url": "https://www.ibm.com/topics/low-code"
      },
      {
        "label": "TechTarget – low-code (Gartner)",
        "url": "https://www.techtarget.com/news/5-FAQs-on-the-low-code-approach/864474/"
      },
      {
        "label": "Appian – Gartner",
        "url": "https://appian.com/blog/acp/low-code/low-code-vs-no-code"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Low-code:** abordagem **visual** de desenvolvimento, com mínimo de codificação manual (arrastar e soltar, componentes prontos, modelos). Ainda permite código/scripts.\n- **No-code:** para a Gartner, é um **subconjunto** do low-code em que tudo (exceto fórmulas e expressões) é feito por modelagem visual ou configuração.\n- **Base técnica:** design orientado a modelos, geração automática de código, programação visual.\n- **Cidadão desenvolvedor (*citizen developer*):** usuário de negócio, sem formação em programação, que cria apps nessas plataformas — com **governança da TI**.\n- **Exemplo prático:** um formulário de pedido de férias montado no Power Apps por um servidor do RH.\n- **Riscos a lembrar:** *shadow IT*, dependência do fornecedor (atenção à proibição de dependência tecnológica do art. 5º da [[res-cnj-335-2020]]).\n- **Fontes:** [IBM – low-code](https://www.ibm.com/topics/low-code) · [TechTarget – low-code (Gartner)](https://www.techtarget.com/news/5-FAQs-on-the-low-code-approach/864474/) · [Appian – Gartner](https://appian.com/blog/acp/low-code/low-code-vs-no-code)\n\n---"
  },
  {
    "id": "ia-assistentes-dev",
    "aliasIds": [],
    "titulo": "Uso de assistentes de IA no desenvolvimento",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Mestra Codd",
    "npcRole": "mago",
    "npcSeed": 1457645448,
    "oQueE": "O que é: ferramentas baseadas em LLMs que sugerem código, testes, documentação e revisões dentro da IDE ou do terminal.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: ferramentas baseadas em LLMs que sugerem código, testes, documentação e revisões dentro da IDE ou do terminal.",
      "Usos típicos: autocompletar, gerar testes unitários, explicar código legado, refatorar.",
      "Cuidados (ligam com outras matérias): revisar tudo (alucinações) → portaria-131-2021 (revisão de código); não colar dados sigilosos ou pessoais → lgpd; checar vulnerabilidades → owasp."
    ],
    "conexoes": [
      "portaria-131-2021",
      "lgpd",
      "owasp",
      "ia-llm",
      "testes-software"
    ],
    "avisosOraculo": [
      "Tema novo, sem norma única; refinar com material do CNJ sobre IA (ex.: resolução do CNJ sobre uso de IA no Judiciário) na próxima rodada."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** ferramentas baseadas em LLMs que sugerem código, testes, documentação e revisões dentro da IDE ou do terminal.\n- **Usos típicos:** autocompletar, gerar testes unitários, explicar código legado, refatorar.\n- **Cuidados (ligam com outras matérias):** revisar tudo (alucinações) → [[portaria-131-2021]] (revisão de código); não colar dados sigilosos ou pessoais → [[lgpd]]; checar vulnerabilidades → [[owasp]].\n- **Conexões:** [[ia-llm]] (fundamentos de IA, só Analista) · [[testes-software]]\n- ⚠️ Tema novo, sem norma única; refinar com material do CNJ sobre IA (ex.: resolução do CNJ sobre uso de IA no Judiciário) na próxima rodada.\n\n---"
  },
  {
    "id": "padroes-projeto",
    "aliasIds": [],
    "titulo": "Padrões de projeto (GoF)",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "tecnico",
    "npcName": "Artífice Gosling",
    "npcRole": "mago",
    "npcSeed": 1773175083,
    "oQueE": "O que é: 23 soluções reutilizáveis para problemas recorrentes de projeto OO, do livro Design Patterns (1994) da \"Gangue dos Quatro\" (Gamma, Helm, Johnson, Vlissides).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: 23 soluções reutilizáveis para problemas recorrentes de projeto OO, do livro Design Patterns (1994) da \"Gangue dos Quatro\" (Gamma, Helm, Johnson, Vlissides).",
      "Criacionais (como criar objetos): Abstract Factory, Builder, Factory Method, Prototype, Singleton.",
      "Estruturais (como compor classes/objetos): Adapter, Bridge, Composite, Decorator, Facade, Flyweight, Proxy.",
      "Comportamentais (como objetos interagem): Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, Observer, State, Strategy, Template Method, Visitor.",
      "Definições curtas que caem:",
      "Singleton: garante uma única instância com ponto global de acesso.",
      "Factory Method: interface para criar objeto, deixando a subclasse decidir qual classe instanciar.",
      "Adapter: converte a interface de uma classe na interface que o cliente espera.",
      "Strategy: família de algoritmos intercambiáveis.",
      "Observer: quando um objeto muda, os dependentes são notificados.",
      "Princípios do livro: \"programe para uma interface, não para uma implementação\"; \"prefira composição a herança\"."
    ],
    "conexoes": [
      "oo",
      "spring-boot",
      "api-gateway"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "MIT – catálogo GoF",
        "url": "https://people.csail.mit.edu/addy/pattern/patcat.htm"
      },
      {
        "label": "LMU – tabela dos 23",
        "url": "https://cs.lmu.edu/~ray/notes/designpatterns/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** 23 soluções reutilizáveis para problemas recorrentes de projeto OO, do livro *Design Patterns* (1994) da \"Gangue dos Quatro\" (Gamma, Helm, Johnson, Vlissides).\n- **3 categorias:**\n  - **Criacionais** (como criar objetos): Abstract Factory, Builder, **Factory Method**, Prototype, **Singleton**.\n  - **Estruturais** (como compor classes/objetos): **Adapter**, Bridge, Composite, **Decorator**, **Facade**, Flyweight, **Proxy**.\n  - **Comportamentais** (como objetos interagem): Chain of Responsibility, Command, Interpreter, Iterator, Mediator, Memento, **Observer**, State, **Strategy**, Template Method, Visitor.\n- **Definições curtas que caem:**\n  - **Singleton:** garante uma única instância com ponto global de acesso.\n  - **Factory Method:** interface para criar objeto, deixando a subclasse decidir qual classe instanciar.\n  - **Adapter:** converte a interface de uma classe na interface que o cliente espera.\n  - **Strategy:** família de algoritmos intercambiáveis.\n  - **Observer:** quando um objeto muda, os dependentes são notificados.\n- **Princípios do livro:** \"programe para uma interface, não para uma implementação\"; \"prefira composição a herança\".\n- **Conexões:** [[oo]] · [[spring-boot]] (o Spring usa Singleton para *beans*, Proxy para transações, Template Method no JdbcTemplate) · [[api-gateway]] (é um Facade/Proxy em nível de arquitetura)\n- **Fontes:** [MIT – catálogo GoF](https://people.csail.mit.edu/addy/pattern/patcat.htm) · [LMU – tabela dos 23](https://cs.lmu.edu/~ray/notes/designpatterns/)\n\n---"
  },
  {
    "id": "testes-software",
    "aliasIds": [],
    "titulo": "Testes de software (o Técnico aprofunda)",
    "zonaId": "04-engenharia-de-software",
    "regiaoId": "floresta-do-codigo",
    "materia": "Engenharia de Software",
    "cargo": "ambos",
    "npcName": "Oráculo Knuth",
    "npcRole": "ferreiro",
    "npcSeed": 294912793,
    "oQueE": "🟢 Ambos: testes automatizados (no Analista, junto com Selenium em DevOps).",
    "exemploPratico": "Exemplo prático: testar o CalculadoraDePrazoService com JUnit, usando Mockito para simular o repositório de feriados.",
    "fatosChave": [
      "🟢 Ambos: testes automatizados (no Analista, junto com Selenium em DevOps).",
      "🔵 Técnico detalha:",
      "Níveis: unitário (uma classe/método), integração (componentes juntos), funcional (comportamento do ponto de vista do usuário).",
      "Cobertura de código: % do código executado pelos testes (linhas, ramos).",
      "JUnit 6: lançado em 30/09/2025. Exige Java 17 (e Kotlin 2.2); unificou a versão de Platform, Jupiter e Vintage; usa anotações JSpecify para nulidade; Vintage (JUnit 3/4) está depreciado.",
      "JUnit Jupiter: o modelo de programação/extensão para escrever testes (@Test, @BeforeEach, @ParameterizedTest...).",
      "Migração do JUnit 5: em geral compatível, mas é preciso Java 17+ e remover APIs depreciadas.",
      "Mockito: biblioteca para criar mocks (objetos falsos) e isolar a unidade testada de dependências (banco, outros serviços)."
    ],
    "conexoes": [
      "res-cnj-335-2020",
      "ci-cd",
      "ageis",
      "selenium"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "JUnit 6.0.0 – release notes",
        "url": "https://docs.junit.org/6.0.0/release-notes/"
      },
      {
        "label": "InfoQ – JUnit 6",
        "url": "https://www.infoq.com/news/2025/10/junit6-java17-kotlin"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- 🟢 **Ambos:** testes automatizados (no Analista, junto com Selenium em DevOps).\n- 🔵 **Técnico detalha:**\n  - **Níveis:** unitário (uma classe/método), integração (componentes juntos), funcional (comportamento do ponto de vista do usuário).\n  - **Cobertura de código:** % do código executado pelos testes (linhas, ramos).\n  - **JUnit 6:** lançado em **30/09/2025**. Exige **Java 17** (e Kotlin 2.2); unificou a versão de **Platform, Jupiter e Vintage**; usa anotações **JSpecify** para nulidade; Vintage (JUnit 3/4) está **depreciado**.\n  - **JUnit Jupiter:** o modelo de programação/extensão para escrever testes (`@Test`, `@BeforeEach`, `@ParameterizedTest`...).\n  - **Migração do JUnit 5:** em geral compatível, mas é preciso Java 17+ e remover APIs depreciadas.\n  - **Mockito:** biblioteca para criar **mocks** (objetos falsos) e isolar a unidade testada de dependências (banco, outros serviços).\n- **Exemplo prático:** testar o `CalculadoraDePrazoService` com JUnit, usando Mockito para simular o repositório de feriados.\n- **Conexões:** [[res-cnj-335-2020]] (exige \"ampla cobertura de testes\") · [[ci-cd]] (testes rodam no pipeline) · [[ageis]] (TDD no XP) · [[selenium]] (teste de interface, Analista)\n- **Fontes:** [JUnit 6.0.0 – release notes](https://docs.junit.org/6.0.0/release-notes/) · [InfoQ – JUnit 6](https://www.infoq.com/news/2025/10/junit6-java17-kotlin)\n\n---"
  },
  {
    "id": "java",
    "aliasIds": [],
    "titulo": "Linguagem Java",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Tecelã Hamilton",
    "npcRole": "mago",
    "npcSeed": 136295781,
    "oQueE": "Por que está aqui: é a linguagem preferencial da PDPJ-Br (Portaria 253/2020).",
    "exemploPratico": "",
    "fatosChave": [
      "Por que está aqui: é a linguagem preferencial da PDPJ-Br (Portaria 253/2020)."
    ],
    "conexoes": [
      "oo",
      "spring-boot",
      "testes-software"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Por que está aqui:** é a linguagem preferencial da PDPJ-Br (Portaria 253/2020).\n- **Conexões:** [[oo]] (classes, interfaces, herança) · [[spring-boot]] · [[testes-software]] (JUnit 6 exige Java 17)"
  },
  {
    "id": "microsservicos",
    "aliasIds": [],
    "titulo": "Arquitetura distribuída de microsserviços",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Sábio Gamma",
    "npcRole": "engenheiro",
    "npcSeed": 896781086,
    "oQueE": "O que é (Lewis & Fowler, 2014): desenvolver uma aplicação como um conjunto de pequenos serviços, cada um rodando em seu próprio processo, comunicando-se por mecanismos leves (geralmente API HTTP), organizados em torno de capacidades de negócio e implantáveis de forma independente por automação.",
    "exemploPratico": "Exemplo prático na PDPJ: serviços separados para \"cabeçalho processual\", \"repositório de documentos\", \"cadastro de usuários\".",
    "fatosChave": [
      "O que é (Lewis & Fowler, 2014): desenvolver uma aplicação como um conjunto de pequenos serviços, cada um rodando em seu próprio processo, comunicando-se por mecanismos leves (geralmente API HTTP), organizados em torno de capacidades de negócio e implantáveis de forma independente por automação.",
      "Contraste: o monólito é uma única unidade executável — qualquer mudança exige recompilar e reimplantar tudo.",
      "Características: alta coesão dentro do serviço, baixo acoplamento entre serviços (exatamente o que a Res. 335 pede), dados descentralizados, possibilidade de linguagens diferentes."
    ],
    "conexoes": [
      "arquiteturas",
      "api-gateway",
      "service-discovery",
      "docker",
      "res-cnj-335-2020"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Martin Fowler – Microservices",
        "url": "https://www.martinfowler.com/articles/microservices.html"
      },
      {
        "label": "IEEE TechNav",
        "url": "https://technav.ieee.org/topic/microservice-architectures/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é (Lewis & Fowler, 2014):** desenvolver uma aplicação como um **conjunto de pequenos serviços**, cada um rodando em **seu próprio processo**, comunicando-se por mecanismos leves (geralmente API HTTP), organizados em torno de **capacidades de negócio** e **implantáveis de forma independente** por automação.\n- **Contraste:** o **monólito** é uma única unidade executável — qualquer mudança exige recompilar e reimplantar tudo.\n- **Características:** alta coesão dentro do serviço, baixo acoplamento entre serviços (exatamente o que a Res. 335 pede), dados descentralizados, possibilidade de linguagens diferentes.\n- **Exemplo prático na PDPJ:** serviços separados para \"cabeçalho processual\", \"repositório de documentos\", \"cadastro de usuários\".\n- **Conexões:** [[arquiteturas]] (antecessor) · [[api-gateway]] · [[service-discovery]] · [[docker]] · [[res-cnj-335-2020]]\n- **Fontes:** [Martin Fowler – Microservices](https://www.martinfowler.com/articles/microservices.html) · [IEEE TechNav](https://technav.ieee.org/topic/microservice-architectures/)"
  },
  {
    "id": "api-rest",
    "aliasIds": [
      "json"
    ],
    "titulo": "API RESTful + JSON",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Maga Hopper",
    "npcRole": "engenheiro",
    "npcSeed": 1998216356,
    "oQueE": "REST: estilo arquitetural definido por Roy Fielding. Restrições: cliente-servidor, sem estado (stateless) — cada requisição leva toda a informação necessária —, cacheável, interface uniforme, sistema em camadas e (opcional) código sob demanda.",
    "exemploPratico": "Na prática (HTTP): recursos identificados por URI e manipulados por verbos (GET lê, POST cria, PUT substitui, PATCH altera parte, DELETE remove), com códigos de status (200, 201, 400, 401, 403, 404, 500).",
    "fatosChave": [
      "REST: estilo arquitetural definido por Roy Fielding. Restrições: cliente-servidor, sem estado (stateless) — cada requisição leva toda a informação necessária —, cacheável, interface uniforme, sistema em camadas e (opcional) código sob demanda.",
      "JSON: formato texto leve de troca de dados (objetos {} e arrays []), padrão das APIs REST da PDPJ.",
      "Exemplo: GET /processos/0010172-32.2025.5.04.0001 → 200 + JSON com o cabeçalho do processo."
    ],
    "conexoes": [
      "swagger-openapi",
      "jwt",
      "xml",
      "res-cnj-574-2024"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Restrições REST (resumo)",
        "url": "https://www.slideshare.net/shaunabram/an-intro-to-rest-and-microservices"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **REST:** estilo arquitetural definido por **Roy Fielding**. Restrições: cliente-servidor, **sem estado (stateless)** — cada requisição leva toda a informação necessária —, cacheável, **interface uniforme**, sistema em camadas e (opcional) código sob demanda.\n- **Na prática (HTTP):** recursos identificados por URI e manipulados por verbos (GET lê, POST cria, PUT substitui, PATCH altera parte, DELETE remove), com códigos de status (200, 201, 400, 401, 403, 404, 500).\n- **JSON:** formato texto leve de troca de dados (objetos `{}` e arrays `[]`), padrão das APIs REST da PDPJ.\n- **Exemplo:** `GET /processos/0010172-32.2025.5.04.0001` → 200 + JSON com o cabeçalho do processo.\n- **Conexões:** [[swagger-openapi]] (documenta a API) · [[jwt]] (vai no header `Authorization: Bearer`) · [[xml]] (alternativa mais antiga) · [[res-cnj-574-2024]] (dados via API)\n- **Fonte:** [Restrições REST (resumo)](https://www.slideshare.net/shaunabram/an-intro-to-rest-and-microservices)"
  },
  {
    "id": "spring-boot",
    "aliasIds": [],
    "titulo": "Framework Spring, Spring Boot e Spring Cloud",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Construtor Brooks",
    "npcRole": "engenheiro",
    "npcSeed": 959737217,
    "oQueE": "Spring Framework: base com injeção de dependências / inversão de controle.",
    "exemploPratico": "Exemplo: @SpringBootApplication + spring-boot-starter-web = API REST rodando com Tomcat embutido.",
    "fatosChave": [
      "Spring Framework: base com injeção de dependências / inversão de controle.",
      "Spring Boot: facilita criar aplicações Spring autônomas e prontas para produção que \"simplesmente rodam\". Características oficiais: servidor embutido (Tomcat, Jetty ou Undertow — sem precisar de WAR), dependências \"starter\", autoconfiguração, recursos de produção (métricas, health checks, configuração externa) e nenhuma geração de código nem XML obrigatório.",
      "Spring Cloud: padrões para sistemas distribuídos (descoberta de serviços, gateway, configuração centralizada)."
    ],
    "conexoes": [
      "padroes-projeto",
      "service-discovery",
      "maven"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "spring.io – Spring Boot",
        "url": "https://spring.io/projects/spring-boot"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Spring Framework:** base com **injeção de dependências / inversão de controle**.\n- **Spring Boot:** facilita criar aplicações Spring **autônomas e prontas para produção** que \"simplesmente rodam\". Características oficiais: servidor embutido (**Tomcat, Jetty ou Undertow** — sem precisar de WAR), dependências \"**starter**\", **autoconfiguração**, recursos de produção (métricas, *health checks*, configuração externa) e **nenhuma geração de código nem XML obrigatório**.\n- **Spring Cloud:** padrões para sistemas distribuídos (descoberta de serviços, gateway, configuração centralizada).\n- **Exemplo:** `@SpringBootApplication` + `spring-boot-starter-web` = API REST rodando com Tomcat embutido.\n- **Conexões:** [[padroes-projeto]] (Singleton, Proxy) · [[eureka]] · [[maven]] (build)\n- **Fonte:** [spring.io – Spring Boot](https://spring.io/projects/spring-boot)"
  },
  {
    "id": "service-discovery",
    "aliasIds": [
      "eureka"
    ],
    "titulo": "Service Discovery com Spring Eureka",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Mago Ada II",
    "npcRole": "engenheiro",
    "npcSeed": 1885257101,
    "oQueE": "Problema: em microsserviços, instâncias sobem e caem e mudam de IP. Como um serviço acha o outro?",
    "exemploPratico": "",
    "fatosChave": [
      "Problema: em microsserviços, instâncias sobem e caem e mudam de IP. Como um serviço acha o outro?",
      "Solução: um registro de serviços. Cada instância se registra e envia heartbeats; se o heartbeat falhar, a instância é removida. Os clientes consultam o registro para localizar serviços.",
      "Eureka: servidor e cliente de descoberta da Netflix. Com spring-cloud-starter-netflix-eureka-client a aplicação vira instância (se registra) e cliente (consulta).",
      "Status: quando a Spring moveu os módulos Netflix para manutenção (Greenwich, 2019), o Eureka ficou de fora — é o único componente Netflix que permaneceu no Spring Cloud a partir do Ilford (2020)."
    ],
    "conexoes": [
      "portaria-253-2020",
      "microsservicos",
      "spring-boot"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Spring Cloud Netflix – docs",
        "url": "https://docs.spring.io/spring-cloud-netflix/docs/2.2.7.RELEASE/reference/html"
      },
      {
        "label": "Spring – Greenwich",
        "url": "https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Problema:** em microsserviços, instâncias sobem e caem e mudam de IP. Como um serviço acha o outro?\n- **Solução:** um **registro de serviços**. Cada instância **se registra** e envia **heartbeats**; se o heartbeat falhar, a instância é removida. Os clientes **consultam** o registro para localizar serviços.\n- **Eureka:** servidor e cliente de descoberta da Netflix. Com `spring-cloud-starter-netflix-eureka-client` a aplicação vira instância (se registra) e cliente (consulta).\n- **Status:** quando a Spring moveu os módulos Netflix para manutenção (Greenwich, 2019), o **Eureka ficou de fora** — é o único componente Netflix que permaneceu no Spring Cloud a partir do Ilford (2020).\n- **Fontes:** [Spring Cloud Netflix – docs](https://docs.spring.io/spring-cloud-netflix/docs/2.2.7.RELEASE/reference/html) · [Spring – Greenwich](https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available/)"
  },
  {
    "id": "api-gateway",
    "aliasIds": [
      "zuul"
    ],
    "titulo": "API Gateway com Zuul",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Ferreira Turing II",
    "npcRole": "engenheiro",
    "npcSeed": 784914800,
    "oQueE": "API Gateway: porta de entrada única para os clientes; roteia para o microsserviço certo e centraliza preocupações transversais (autenticação, limites, logs). É o padrão Facade aplicado à arquitetura.",
    "exemploPratico": "",
    "fatosChave": [
      "API Gateway: porta de entrada única para os clientes; roteia para o microsserviço certo e centraliza preocupações transversais (autenticação, limites, logs). É o padrão Facade aplicado à arquitetura."
    ],
    "conexoes": [
      "padroes-projeto",
      "microsservicos"
    ],
    "avisosOraculo": [
      "Zuul: gateway/roteador da Netflix. Entrou em modo de manutenção no Spring Cloud Greenwich (2019) e foi removido no Ilford (2020); o sucessor é o Spring Cloud Gateway. A PDPJ ainda o lista porque nasceu nessa stack — saiba as duas coisas."
    ],
    "fontes": [
      {
        "label": "Spring – Greenwich (maintenance)",
        "url": "https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available/"
      },
      {
        "label": "Piotr Minkowski – sucessor",
        "url": "https://piotrminkowski.com/?p=7069"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **API Gateway:** **porta de entrada única** para os clientes; roteia para o microsserviço certo e centraliza preocupações transversais (autenticação, limites, logs). É o padrão Facade aplicado à arquitetura.\n- **Zuul:** gateway/roteador da Netflix. ⚠️ Entrou em **modo de manutenção** no Spring Cloud Greenwich (2019) e foi **removido** no Ilford (2020); o sucessor é o **Spring Cloud Gateway**. A PDPJ ainda o lista porque nasceu nessa stack — saiba as duas coisas.\n- **Fontes:** [Spring – Greenwich (maintenance)](https://spring.io/blog/2019/01/23/spring-cloud-greenwich-release-is-now-available/) · [Piotr Minkowski – sucessor](https://piotrminkowski.com/?p=7069)"
  },
  {
    "id": "mapstruct",
    "aliasIds": [],
    "titulo": "MapStruct",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Druida Grace II",
    "npcRole": "engenheiro",
    "npcSeed": 136644884,
    "oQueE": "O que é: gerador de código que cria, em tempo de compilação, os mapeamentos entre objetos (ex.: entidade ↔ DTO). Sem reflexão em tempo de execução → mais rápido e com checagem de tipos.",
    "exemploPratico": "Exemplo: interface ProcessoMapper com ProcessoDTO toDto(Processo p); o MapStruct gera a implementação.",
    "fatosChave": [
      "O que é: gerador de código que cria, em tempo de compilação, os mapeamentos entre objetos (ex.: entidade ↔ DTO). Sem reflexão em tempo de execução → mais rápido e com checagem de tipos."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Exemplo de projeto",
        "url": "https://www.mintlify.com/Raven-Training/jc-java-training/development/project-structure"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** gerador de código que cria, **em tempo de compilação**, os mapeamentos entre objetos (ex.: entidade ↔ DTO). Sem reflexão em tempo de execução → mais rápido e com checagem de tipos.\n- **Exemplo:** interface `ProcessoMapper` com `ProcessoDTO toDto(Processo p)`; o MapStruct gera a implementação.\n- **Fonte:** [Exemplo de projeto](https://www.mintlify.com/Raven-Training/jc-java-training/development/project-structure)"
  },
  {
    "id": "swagger-openapi",
    "aliasIds": [],
    "titulo": "Swagger / OpenAPI ( Técnico cita \"OpenAPI/Swagger\")",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Arquiteta Barbara II",
    "npcRole": "mago",
    "npcSeed": 2057742666,
    "oQueE": "OpenAPI: especificação padrão para descrever APIs HTTP (endpoints, parâmetros, esquemas, segurança).",
    "exemploPratico": "",
    "fatosChave": [
      "OpenAPI: especificação padrão para descrever APIs HTTP (endpoints, parâmetros, esquemas, segurança).",
      "Swagger: conjunto de ferramentas (ex.: Swagger UI, para testar a API no navegador) que trabalha com essa especificação."
    ],
    "conexoes": [
      "api-rest",
      "jwt"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **OpenAPI:** especificação padrão para **descrever APIs HTTP** (endpoints, parâmetros, esquemas, segurança).\n- **Swagger:** conjunto de ferramentas (ex.: **Swagger UI**, para testar a API no navegador) que trabalha com essa especificação.\n- **Conexões:** [[api-rest]] · [[jwt]] (configura o esquema de segurança Bearer no Swagger UI)"
  },
  {
    "id": "jpa-hibernate",
    "aliasIds": [],
    "titulo": "Persistência: JPA 2.0, Hibernate 5 + , Hibernate Envers, Flyway",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Escriba Dijkstra II",
    "npcRole": "engenheiro",
    "npcSeed": 860133983,
    "oQueE": "JPA (hoje Jakarta Persistence): especificação Java para mapeamento objeto-relacional (ORM) — classes viram tabelas (@Entity, @Id).",
    "exemploPratico": "Exemplo prático: Envers responde \"quem alterou o status deste processo e quando\" — requisito típico de MoReq-Jus e de trilha de auditoria.",
    "fatosChave": [
      "JPA (hoje Jakarta Persistence): especificação Java para mapeamento objeto-relacional (ORM) — classes viram tabelas (@Entity, @Id).",
      "Hibernate: a implementação de JPA mais usada.",
      "Hibernate Envers: auditoria/versionamento de entidades. Anota-se @Audited; cada transação que altera entidades auditadas gera uma revisão, e o histórico fica em tabelas de auditoria (sufixo padrão _AUD). Dá para consultar \"como estava o registro na revisão X\".",
      "Flyway: versiona o schema do banco com scripts de migração (ex.: V1__cria_tabela.sql, V2__...), aplicados em ordem e registrados.",
      "Evolução (noções do edital): Jakarta Persistence 3.2 é a versão do Jakarta EE 11; exige Java 17; traz, entre outros, records como embutíveis e suporte a java.time.Instant/Year. O Hibernate ORM 7 implementa Jakarta Persistence 3.2 e passou para licença Apache 2.0."
    ],
    "conexoes": [
      "sql",
      "modelagem-er",
      "res-cnj-522-2023",
      "postgresql",
      "ci-cd"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Hibernate Envers",
        "url": "https://hibernate.org/orm/envers/"
      },
      {
        "label": "Jakarta Persistence 3.2",
        "url": "https://jakarta.ee/specifications/persistence/3.2/"
      },
      {
        "label": "Hibernate 7.0 – what's new",
        "url": "https://docs.hibernate.org/orm/7.0/whats-new/"
      },
      {
        "label": "Eclipse – JP 3.2 novidades",
        "url": "https://projects.eclipse.org/node/27290"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **JPA (hoje Jakarta Persistence):** especificação Java para **mapeamento objeto-relacional (ORM)** — classes viram tabelas (`@Entity`, `@Id`).\n- **Hibernate:** a implementação de JPA mais usada.\n- **Hibernate Envers:** **auditoria/versionamento de entidades**. Anota-se `@Audited`; cada transação que altera entidades auditadas gera uma **revisão**, e o histórico fica em tabelas de auditoria (sufixo padrão `_AUD`). Dá para consultar \"como estava o registro na revisão X\".\n- **Flyway:** **versiona o schema do banco** com scripts de migração (ex.: `V1__cria_tabela.sql`, `V2__...`), aplicados em ordem e registrados.\n- **Evolução (noções do edital):** **Jakarta Persistence 3.2** é a versão do **Jakarta EE 11**; exige **Java 17**; traz, entre outros, *records* como embutíveis e suporte a `java.time.Instant`/`Year`. O **Hibernate ORM 7** implementa Jakarta Persistence 3.2 e passou para licença Apache 2.0.\n- **Exemplo prático:** Envers responde \"quem alterou o status deste processo e quando\" — requisito típico de **MoReq-Jus** e de trilha de auditoria.\n- **Conexões:** [[sql]] e [[modelagem-er]] (Analista) · [[moreq-jus]] (rastreabilidade) · [[postgresql]] · [[ci-cd]] (Flyway roda no deploy)\n- **Fontes:** [Hibernate Envers](https://hibernate.org/orm/envers/) · [Jakarta Persistence 3.2](https://jakarta.ee/specifications/persistence/3.2/) · [Hibernate 7.0 – what's new](https://docs.hibernate.org/orm/7.0/whats-new/) · [Eclipse – JP 3.2 novidades](https://projects.eclipse.org/node/27290)"
  },
  {
    "id": "jakarta-ee",
    "aliasIds": [],
    "titulo": "Jakarta EE 8 (legado) e Jakarta EE 11",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "tecnico",
    "npcName": "Guardiã Liskov II",
    "npcRole": "ferreiro",
    "npcSeed": 192602266,
    "oQueE": "O que é: a plataforma Java corporativa (antigo Java EE), hoje na Eclipse Foundation. O EE 8 ainda usa o pacote javax.; do EE 9 em diante, jakarta.. O EE 11 inclui a Jakarta Persistence 3.2.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: a plataforma Java corporativa (antigo Java EE), hoje na Eclipse Foundation. O EE 8 ainda usa o pacote javax.; do EE 9 em diante, jakarta.. O EE 11 inclui a Jakarta Persistence 3.2."
    ],
    "conexoes": [
      "servicos-rede",
      "jpa-hibernate"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** a plataforma Java corporativa (antigo Java EE), hoje na Eclipse Foundation. O EE 8 ainda usa o pacote `javax.*`; do EE 9 em diante, `jakarta.*`. O **EE 11** inclui a Jakarta Persistence 3.2.\n- **Conexões:** [[servicos-rede]] (servidores de aplicação Jakarta EE) · [[jpa-hibernate]]"
  },
  {
    "id": "postgresql",
    "aliasIds": [
      "h2"
    ],
    "titulo": "Banco de dados: PostgreSQL e H2",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Alquimista Linus II",
    "npcRole": "engenheiro",
    "npcSeed": 787029587,
    "oQueE": "PostgreSQL: SGBD relacional de código aberto usado na PDPJ. PostgreSQL 18 (25/09/2025): novo subsistema de I/O assíncrono (AIO) com ganhos de até 3× em leituras, colunas geradas virtuais, função uuidv7(), skip scan em índices B-tree, suporte a OAuth 2.0 na autenticação.",
    "exemploPratico": "",
    "fatosChave": [
      "PostgreSQL: SGBD relacional de código aberto usado na PDPJ. PostgreSQL 18 (25/09/2025): novo subsistema de I/O assíncrono (AIO) com ganhos de até 3× em leituras, colunas geradas virtuais, função uuidv7(), skip scan em índices B-tree, suporte a OAuth 2.0 na autenticação.",
      "H2: banco Java leve, que roda embutido/em memória — muito usado em testes automatizados."
    ],
    "conexoes": [
      "sql",
      "testes-software"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "PostgreSQL 18 – anúncio oficial (PT)",
        "url": "https://www.postgresql.org/about/press/presskit18/pt"
      },
      {
        "label": "Release notes 18",
        "url": "https://www.postgresql.org/docs/release/18/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **PostgreSQL:** SGBD relacional de código aberto usado na PDPJ. **PostgreSQL 18** (25/09/2025): novo subsistema de **I/O assíncrono (AIO)** com ganhos de até 3× em leituras, colunas geradas **virtuais**, função `uuidv7()`, *skip scan* em índices B-tree, suporte a **OAuth 2.0** na autenticação.\n- **H2:** banco Java leve, que roda **embutido/em memória** — muito usado em **testes automatizados**.\n- **Conexões:** [[sql]] (Analista aprofunda: versões 15–18, migração da 14, Oracle 19c) · [[testes-software]]\n- **Fontes:** [PostgreSQL 18 – anúncio oficial (PT)](https://www.postgresql.org/about/press/presskit18/pt) · [Release notes 18](https://www.postgresql.org/docs/release/18/)"
  },
  {
    "id": "keycloak-sso",
    "aliasIds": [],
    "titulo": "Autenticação: SSO, Keycloak, OAuth2 (RFC 6749) e boas práticas (RFC 9700)",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Engenheira Margaret II",
    "npcRole": "mago",
    "npcSeed": 1290024354,
    "oQueE": "SSO (Single Sign-On): o usuário se autentica uma vez e acessa vários sistemas.",
    "exemploPratico": "Na prática do Judiciário: o Jus.br exige que todos os usuários autenticados usem o SSO do CNJ baseado em Keycloak.",
    "fatosChave": [
      "SSO (Single Sign-On): o usuário se autentica uma vez e acessa vários sistemas.",
      "Keycloak: solução open source de gestão de identidade e acesso (IAM); projeto incubado na CNCF (2023), licença Apache 2.0. Suporta OpenID Connect, OAuth 2.0 e SAML 2.0, federação com LDAP/Active Directory, identity brokering, login social, MFA. Conceito central: realm (conjunto isolado de usuários, credenciais, papéis e grupos).",
      "OAuth 2.0 (RFC 6749, 2012) — 4 papéis: dono do recurso (usuário), cliente (app), servidor de autorização (ex.: Keycloak), servidor de recursos (a API).",
      "Tipos de concessão originais: authorization code, implicit, resource owner password credentials, client credentials.",
      "Atenção: OAuth = autorização; OpenID Connect = camada de autenticação/identidade sobre o OAuth.",
      "RFC 9700 (BCP 240, jan/2025) — boas práticas de segurança: atualiza as RFCs 6749, 6750 e 6819.",
      "Evitar o Implicit Grant (depreciado) → usar Authorization Code + PKCE para todos os clientes, inclusive SPAs.",
      "Não usar Resource Owner Password Credentials.",
      "Restringir privilégios do token (escopo/audiência) e prevenir reutilização (replay) de tokens."
    ],
    "conexoes": [
      "jwt",
      "controle-acesso",
      "active-directory",
      "owasp"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Keycloak.org",
        "url": "https://www.keycloak.org/"
      },
      {
        "label": "CNCF – Keycloak",
        "url": "https://www.cncf.io/projects/keycloak"
      },
      {
        "label": "RFC 6749",
        "url": "https://datatracker.ietf.org/doc/rfc6749"
      },
      {
        "label": "RFC 9700",
        "url": "https://datatracker.ietf.org/doc/rfc9700/"
      },
      {
        "label": "OWASP OAuth2 Cheat Sheet",
        "url": "https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html"
      },
      {
        "label": "Portaria CNJ – Jus.br/Keycloak",
        "url": "https://atos.cnj.jus.br/atos/detalhar/5714"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **SSO (Single Sign-On):** o usuário se autentica **uma vez** e acessa vários sistemas.\n- **Keycloak:** solução **open source de gestão de identidade e acesso (IAM)**; projeto incubado na **CNCF** (2023), licença Apache 2.0. Suporta **OpenID Connect, OAuth 2.0 e SAML 2.0**, federação com **LDAP/Active Directory**, *identity brokering*, login social, MFA. Conceito central: **realm** (conjunto isolado de usuários, credenciais, papéis e grupos).\n- **Na prática do Judiciário:** o **Jus.br** exige que todos os usuários autenticados usem o **SSO do CNJ baseado em Keycloak**.\n- **OAuth 2.0 (RFC 6749, 2012) — 4 papéis:** dono do recurso (usuário), **cliente** (app), **servidor de autorização** (ex.: Keycloak), **servidor de recursos** (a API).\n  - Tipos de concessão originais: **authorization code**, **implicit**, **resource owner password credentials**, **client credentials**.\n  - Atenção: **OAuth = autorização**; **OpenID Connect** = camada de **autenticação/identidade** sobre o OAuth.\n- **RFC 9700 (BCP 240, jan/2025) — boas práticas de segurança:** atualiza as RFCs 6749, 6750 e 6819.\n  - **Evitar o Implicit Grant** (depreciado) → usar **Authorization Code + PKCE** para todos os clientes, inclusive SPAs.\n  - **Não usar** Resource Owner Password Credentials.\n  - **Restringir privilégios** do token (escopo/audiência) e prevenir reutilização (*replay*) de tokens.\n- **Conexões:** [[jwt]] · [[controle-acesso]] · [[active-directory]] (federação) · [[owasp]] (falhas de autenticação)\n- **Fontes:** [Keycloak.org](https://www.keycloak.org/) · [CNCF – Keycloak](https://www.cncf.io/projects/keycloak) · [RFC 6749](https://datatracker.ietf.org/doc/rfc6749) · [RFC 9700](https://datatracker.ietf.org/doc/rfc9700/) · [OWASP OAuth2 Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/OAuth2_Cheat_Sheet.html) · [Portaria CNJ – Jus.br/Keycloak](https://atos.cnj.jus.br/atos/detalhar/5714)"
  },
  {
    "id": "jwt",
    "aliasIds": [],
    "titulo": "JSON Web Token (RFC 7519)",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "tecnico",
    "npcName": "Runista Fowler II",
    "npcRole": "mago",
    "npcSeed": 608131842,
    "oQueE": "O que é: padrão aberto para transmitir claims entre partes como um objeto JSON compacto e assinado digitalmente.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: padrão aberto para transmitir claims entre partes como um objeto JSON compacto e assinado digitalmente.",
      "3 partes em Base64URL separadas por ponto: header.payload.signature.",
      "Header: tipo e algoritmo (ex.: HS256, RS256).",
      "Signature: garante que não houve adulteração."
    ],
    "conexoes": [
      "keycloak-sso",
      "criptografia",
      "lgpd"
    ],
    "avisosOraculo": [
      "Payload: claims (iss, sub, aud, exp, iat...). É codificado, não criptografado — não ponha senha nem dado sensível."
    ],
    "fontes": [
      {
        "label": "Reflectoring – JWT (RFC 7519)",
        "url": "https://reflectoring.io/spring-security-jwt/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** padrão aberto para transmitir *claims* entre partes como um objeto JSON **compacto e assinado digitalmente**.\n- **3 partes em Base64URL separadas por ponto:** `header.payload.signature`.\n  - Header: tipo e algoritmo (ex.: `HS256`, `RS256`).\n  - Payload: **claims** (`iss`, `sub`, `aud`, `exp`, `iat`...). ⚠️ É **codificado, não criptografado** — não ponha senha nem dado sensível.\n  - Signature: garante que não houve adulteração.\n- **Conexões:** [[keycloak-sso]] (emite o token) · [[criptografia]] · [[lgpd]]\n- **Fonte:** [Reflectoring – JWT (RFC 7519)](https://reflectoring.io/spring-security-jwt/)"
  },
  {
    "id": "mensageria",
    "aliasIds": [],
    "titulo": "Mensageria e webhooks: Message Broker, RabbitMQ, evento negocial, webhook, APIs reversas",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Mestra Codd II",
    "npcRole": "engenheiro",
    "npcSeed": 977555075,
    "oQueE": "Message broker: intermediário que recebe mensagens de produtores e as entrega a consumidores → comunicação assíncrona e desacoplada.",
    "exemploPratico": "Exemplo: ao protocolar uma petição, o serviço publica o evento no RabbitMQ; o serviço de intimações consome e um webhook avisa o sistema do escritório.",
    "fatosChave": [
      "Message broker: intermediário que recebe mensagens de produtores e as entrega a consumidores → comunicação assíncrona e desacoplada.",
      "RabbitMQ (AMQP 0-9-1): produtor → exchange → (binding) → fila → consumidor. 4 tipos de exchange:",
      "Direct: entrega à fila cuja binding key é igual à routing key.",
      "Fanout: entrega a todas as filas ligadas (ignora a routing key) → broadcast.",
      "Topic: casa padrões na routing key (*, #) → publish/subscribe seletivo.",
      "Headers: roteia pelos cabeçalhos da mensagem.",
      "Evento negocial: fato de negócio relevante publicado para quem interessar (ex.: \"petição protocolada\").",
      "Webhook / API reversa: em vez de o cliente ficar consultando (polling), o servidor chama uma URL do cliente quando o evento acontece."
    ],
    "conexoes": [
      "microsservicos",
      "api-rest"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "RabbitMQ – AMQP concepts",
        "url": "https://rabbitmq.com/tutorials/amqp-concepts"
      },
      {
        "label": "CloudAMQP – exchanges",
        "url": "https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Message broker:** intermediário que recebe mensagens de **produtores** e as entrega a **consumidores** → comunicação **assíncrona** e desacoplada.\n- **RabbitMQ (AMQP 0-9-1):** produtor → **exchange** → (binding) → **fila** → consumidor. **4 tipos de exchange:**\n  - **Direct:** entrega à fila cuja *binding key* é **igual** à *routing key*.\n  - **Fanout:** entrega a **todas** as filas ligadas (ignora a routing key) → *broadcast*.\n  - **Topic:** casa padrões na routing key (`*`, `#`) → publish/subscribe seletivo.\n  - **Headers:** roteia pelos **cabeçalhos** da mensagem.\n- **Evento negocial:** fato de negócio relevante publicado para quem interessar (ex.: \"petição protocolada\").\n- **Webhook / API reversa:** em vez de o cliente ficar consultando (*polling*), o **servidor chama uma URL do cliente** quando o evento acontece.\n- **Exemplo:** ao protocolar uma petição, o serviço publica o evento no RabbitMQ; o serviço de intimações consome e um webhook avisa o sistema do escritório.\n- **Conexões:** [[microsservicos]] · [[api-rest]]\n- **Fontes:** [RabbitMQ – AMQP concepts](https://rabbitmq.com/tutorials/amqp-concepts) · [CloudAMQP – exchanges](https://www.cloudamqp.com/blog/part4-rabbitmq-for-beginners-exchanges-routing-keys-bindings.html)"
  },
  {
    "id": "docker",
    "aliasIds": [
      "kubernetes",
      "rancher"
    ],
    "titulo": "Contêineres, clusters e orquestração",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Artífice Gosling II",
    "npcRole": "engenheiro",
    "npcSeed": 199450061,
    "oQueE": "Docker: empacota a aplicação e suas dependências em uma imagem; a imagem roda como contêiner isolado. O Spring Boot gera imagens por Dockerfile ou Cloud Native Buildpacks.",
    "exemploPratico": "",
    "fatosChave": [
      "Docker: empacota a aplicação e suas dependências em uma imagem; a imagem roda como contêiner isolado. O Spring Boot gera imagens por Dockerfile ou Cloud Native Buildpacks.",
      "Kubernetes: ambiente de gestão centrado em contêineres que orquestra computação, rede e armazenamento.",
      "Pod: um ou mais contêineres que compartilham rede e volumes (unidade básica).",
      "Workloads: Deployment (apps sem estado), StatefulSet (com estado/identidade), DaemonSet (um pod por nó — ex.: coleta de logs), Job.",
      "Service: expõe pods via seletor/labels — ClusterIP (só dentro do cluster, padrão), NodePort, LoadBalancer.",
      "Rancher (SUSE): plataforma para gerenciar vários clusters Kubernetes (acesso, uso, infraestrutura) em data center, nuvem ou borda."
    ],
    "conexoes": [
      "ci-cd",
      "nuvem",
      "microsservicos"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "SUSE Rancher – workloads e pods",
        "url": "https://documentation.suse.com/cloudnative/rancher-manager/latest/en/cluster-admin/kubernetes-resources/workloads-and-pods/workloads-and-pods.html"
      },
      {
        "label": "SUSE – introdução",
        "url": "https://documentation.suse.com/trd/suse/html/kubernetes_ri_rancher-k3s-sles/id-introduction.html"
      },
      {
        "label": "Spring Boot – container images",
        "url": "https://docs.spring.io/spring-boot/reference/packaging/container-images/index.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Docker:** empacota a aplicação e suas dependências em uma **imagem**; a imagem roda como **contêiner** isolado. O Spring Boot gera imagens por Dockerfile ou *Cloud Native Buildpacks*.\n- **Kubernetes:** ambiente de gestão **centrado em contêineres** que orquestra computação, rede e armazenamento.\n  - **Pod:** um ou mais contêineres que compartilham rede e volumes (unidade básica).\n  - **Workloads:** **Deployment** (apps sem estado), **StatefulSet** (com estado/identidade), **DaemonSet** (um pod por nó — ex.: coleta de logs), **Job**.\n  - **Service:** expõe pods via seletor/labels — **ClusterIP** (só dentro do cluster, padrão), **NodePort**, **LoadBalancer**.\n- **Rancher (SUSE):** plataforma para **gerenciar vários clusters Kubernetes** (acesso, uso, infraestrutura) em data center, nuvem ou borda.\n- **Conexões:** [[ci-cd]] · [[nuvem]] (Técnico) · [[microsservicos]]\n- **Fontes:** [SUSE Rancher – workloads e pods](https://documentation.suse.com/cloudnative/rancher-manager/latest/en/cluster-admin/kubernetes-resources/workloads-and-pods/workloads-and-pods.html) · [SUSE – introdução](https://documentation.suse.com/trd/suse/html/kubernetes_ri_rancher-k3s-sles/id-introduction.html) · [Spring Boot – container images](https://docs.spring.io/spring-boot/reference/packaging/container-images/index.html)"
  },
  {
    "id": "ci-cd",
    "aliasIds": [],
    "titulo": "Deploy, Continuous Integration e Continuous Delivery",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "ambos",
    "npcName": "Oráculo Knuth II",
    "npcRole": "ferreiro",
    "npcSeed": 893338483,
    "oQueE": "CI: integrar o código no repositório com frequência, com build e testes automáticos a cada mudança.",
    "exemploPratico": "",
    "fatosChave": [
      "CI: integrar o código no repositório com frequência, com build e testes automáticos a cada mudança.",
      "CD (Continuous Delivery): o software está sempre em estado implantável; a ida à produção pode ter aprovação manual. (Continuous Deployment = vai automático.)",
      "Pipeline típico: commit → build (Maven) → testes (JUnit) → análise → imagem Docker → deploy no Kubernetes."
    ],
    "conexoes": [
      "devops"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **CI:** integrar o código no repositório com frequência, com **build e testes automáticos** a cada mudança.\n- **CD (Continuous Delivery):** o software está sempre em estado **implantável**; a ida à produção pode ter aprovação manual. (*Continuous Deployment* = vai automático.)\n- **Pipeline típico:** commit → build (Maven) → testes (JUnit) → análise → imagem Docker → deploy no Kubernetes.\n- **Conexões:** detalhado em [[devops]] (Git, GitLab CI/CD, Jenkins, Gitflow)."
  },
  {
    "id": "proxy-reverso",
    "aliasIds": [],
    "titulo": "Proxy reverso, SSL offloading e balanceamento de carga",
    "zonaId": "05-arquitetura-pdpj-stack",
    "regiaoId": "floresta-do-codigo",
    "materia": "Arquitetura PDPJ-Br (Stack)",
    "cargo": "tecnico",
    "npcName": "Tecelã Hamilton II",
    "npcRole": "engenheiro",
    "npcSeed": 1873161446,
    "oQueE": "Proxy reverso: fica na frente dos servidores e recebe as requisições dos clientes em nome deles (o cliente não vê o servidor real). Diferente do proxy \"comum\" (forward), que fica na frente dos clientes.",
    "exemploPratico": "",
    "fatosChave": [
      "Proxy reverso: fica na frente dos servidores e recebe as requisições dos clientes em nome deles (o cliente não vê o servidor real). Diferente do proxy \"comum\" (forward), que fica na frente dos clientes.",
      "SSL/TLS offloading: o proxy/balanceador encerra o TLS (descriptografa), aliviando os servidores de aplicação.",
      "Balanceamento de carga: distribui requisições entre várias instâncias (ex.: round-robin), aumentando disponibilidade.",
      "Algoritmos e SSL offloading detalhados em balanceamento-carga (arquivo 07)."
    ],
    "conexoes": [
      "tls",
      "servicos-rede",
      "docker",
      "protecao-perimetro",
      "balanceamento-carga"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NGINX Docs – HTTP Load Balancing",
        "url": "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/"
      },
      {
        "label": "Oracle Linux – About NGINX",
        "url": "https://docs.oracle.com/en/operating-systems/oracle-linux/10/balancing/balancing-AboutNGINX.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Proxy reverso:** fica **na frente dos servidores** e recebe as requisições dos clientes em nome deles (o cliente não vê o servidor real). Diferente do proxy \"comum\" (*forward*), que fica na frente dos **clientes**.\n- **SSL/TLS offloading:** o proxy/balanceador **encerra o TLS** (descriptografa), aliviando os servidores de aplicação.\n- **Balanceamento de carga:** distribui requisições entre várias instâncias (ex.: round-robin), aumentando disponibilidade.\n- **Conexões:** [[tls]] · [[servicos-rede]] (Analista) · [[kubernetes]] (Service LoadBalancer) · [[protecao-perimetro]]\n- Algoritmos e SSL offloading detalhados em [[balanceamento-carga]] (arquivo 07).\n- **Fontes:** [NGINX Docs – HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) · [Oracle Linux – About NGINX](https://docs.oracle.com/en/operating-systems/oracle-linux/10/balancing/balancing-AboutNGINX.html)\n\n---"
  },
  {
    "id": "devops",
    "aliasIds": [],
    "titulo": "DevOps e DevSecOps",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "ambos",
    "npcName": "Sábio Gamma II",
    "npcRole": "ferreiro",
    "npcSeed": 359755960,
    "oQueE": "DevOps: cultura + práticas que juntam desenvolvimento e operação para entregar software com mais frequência e confiabilidade, com muita automação (build, teste, deploy, monitoramento).",
    "exemploPratico": "Exemplo prático: no pipeline do GitLab, um job SAST barra o merge se encontrar SQL injection; um job SCA alerta que uma versão de biblioteca tem CVE.",
    "fatosChave": [
      "DevOps: cultura + práticas que juntam desenvolvimento e operação para entregar software com mais frequência e confiabilidade, com muita automação (build, teste, deploy, monitoramento).",
      "DevSecOps: DevOps com segurança embutida em todas as fases. O NIST (projeto NCCoE) organiza o ciclo em Plan, Develop, Build, Test, Release, Deploy, Operate.",
      "Shift left: trazer a segurança para o começo do ciclo (design e código), em vez de deixá-la para o fim.",
      "Ferramentas típicas no pipeline:",
      "SAST (análise estática: lê o código-fonte sem executar);",
      "SCA (Software Composition Analysis: vulnerabilidades e licenças das dependências de terceiros);",
      "DAST (análise dinâmica: ataca a aplicação rodando, como caixa-preta);",
      "varredura de segredos, de contêineres e de IaC."
    ],
    "conexoes": [
      "owasp",
      "portaria-253-2020",
      "portaria-131-2021"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NIST NCCoE – DevSecOps",
        "url": "https://pages.nist.gov/nccoe-devsecops/introduction.html"
      },
      {
        "label": "NIST NCCoE – fases",
        "url": "https://pages.nist.gov/nccoe-devsecops/genindex.html"
      },
      {
        "label": "GitLab – shift left",
        "url": "https://about.gitlab.com/topics/devsecops/shift-left-security"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **DevOps:** cultura + práticas que juntam **desenvolvimento** e **operação** para entregar software com mais frequência e confiabilidade, com muita **automação** (build, teste, deploy, monitoramento).\n- **DevSecOps:** DevOps com **segurança embutida em todas as fases**. O NIST (projeto NCCoE) organiza o ciclo em **Plan, Develop, Build, Test, Release, Deploy, Operate**.\n- **Shift left:** trazer a segurança para o **começo** do ciclo (design e código), em vez de deixá-la para o fim.\n- **Ferramentas típicas no pipeline:**\n  - **SAST** (análise **estática**: lê o código-fonte sem executar);\n  - **SCA** (*Software Composition Analysis*: vulnerabilidades e licenças das **dependências** de terceiros);\n  - **DAST** (análise **dinâmica**: ataca a aplicação **rodando**, como caixa-preta);\n  - varredura de segredos, de contêineres e de IaC.\n- **Exemplo prático:** no pipeline do GitLab, um job SAST barra o merge se encontrar SQL injection; um job SCA alerta que uma versão de biblioteca tem CVE.\n- **Conexões:** [[owasp]] (A03 – cadeia de suprimentos ↔ SCA) · [[owasp]] · [[portaria-253-2020]] (critérios técnicos de desenvolvimento na PDPJ) · [[portaria-131-2021]] (revisão de código-fonte)\n- **Fontes:** [NIST NCCoE – DevSecOps](https://pages.nist.gov/nccoe-devsecops/introduction.html) · [NIST NCCoE – fases](https://pages.nist.gov/nccoe-devsecops/genindex.html) · [GitLab – shift left](https://about.gitlab.com/topics/devsecops/shift-left-security)"
  },
  {
    "id": "gestao-configuracao",
    "aliasIds": [],
    "titulo": "Gestão de configuração e versionamento",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "tecnico",
    "npcName": "Maga Hopper II",
    "npcRole": "ferreiro",
    "npcSeed": 959410660,
    "oQueE": "O que é: controlar o que muda, quem mudou, quando e por quê nos itens do software (código, configs, scripts, documentação), garantindo que qualquer versão possa ser reproduzida.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: controlar o que muda, quem mudou, quando e por quê nos itens do software (código, configs, scripts, documentação), garantindo que qualquer versão possa ser reproduzida.",
      "Modelo de versionamento: cada mudança vira uma versão identificada (no Git: commit); versões de entrega ganham tags (ex.: v2.3.0)."
    ],
    "conexoes": [
      "iso-12207",
      "cmmi",
      "git"
    ],
    "avisosOraculo": [
      "Definição conceitual; fonte normativa específica (ex.: ISO 12207 – processo de gestão de configuração) a citar na próxima rodada."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** controlar **o que muda, quem mudou, quando e por quê** nos itens do software (código, configs, scripts, documentação), garantindo que qualquer versão possa ser **reproduzida**.\n- **Modelo de versionamento:** cada mudança vira uma versão identificada (no Git: **commit**); versões de entrega ganham **tags** (ex.: `v2.3.0`).\n- **Conexões:** [[iso-12207]] (gestão de configuração é processo do ciclo de vida) · [[cmmi]] · [[git]]\n- ⚠️ Definição conceitual; fonte normativa específica (ex.: ISO 12207 – processo de gestão de configuração) a citar na próxima rodada."
  },
  {
    "id": "git",
    "aliasIds": [],
    "titulo": "Git: commit, branch, merge, rebase",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "ambos",
    "npcName": "Construtor Brooks II",
    "npcRole": "ferreiro",
    "npcSeed": 1412086891,
    "oQueE": "O que é: sistema de controle de versão distribuído — cada desenvolvedor tem uma cópia completa do histórico.",
    "exemploPratico": "Exemplo prático: git checkout -b feature/assinatura → commits → git checkout develop → git merge feature/assinatura.",
    "fatosChave": [
      "O que é: sistema de controle de versão distribuído — cada desenvolvedor tem uma cópia completa do histórico.",
      "Comandos que caem:",
      "git clone (copia repositório) · git add (prepara para o commit / staging) · git commit (grava a versão) · git push / git pull (envia/recebe do remoto) · git fetch (só baixa).",
      "git branch → lista, cria, apaga e renomeia ramos.",
      "git merge <ramo> → junta outro ramo no ramo atual e avança o ramo atual.",
      "Merge × rebase (livro oficial Pro Git): são as duas formas de integrar mudanças de um ramo em outro.",
      "Merge: faz uma mesclagem de três vias e cria um commit de merge.",
      "Rebase: reaplica os commits de um ramo em cima do outro → histórico linear. O snapshot final é o mesmo; só o histórico muda."
    ],
    "conexoes": [
      "gitflow",
      "github-gitlab",
      "ci-cd"
    ],
    "avisosOraculo": [
      "Regra de ouro: não faça rebase de commits já publicados que outras pessoas usam."
    ],
    "fontes": [
      {
        "label": "Pro Git – Rebasing (pt-br)",
        "url": "https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Rebase-Rebasing"
      },
      {
        "label": "Pro Git – Branching and Merging",
        "url": "https://git-scm.com/book/en/v2/Appendix-C%3A-Git-Commands-Branching-and-Merging"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** sistema de controle de versão **distribuído** — cada desenvolvedor tem uma cópia completa do histórico.\n- **Comandos que caem:**\n  - `git clone` (copia repositório) · `git add` (prepara para o commit / *staging*) · `git commit` (grava a versão) · `git push` / `git pull` (envia/recebe do remoto) · `git fetch` (só baixa).\n  - `git branch` → lista, cria, apaga e renomeia ramos.\n  - `git merge <ramo>` → junta outro ramo **no ramo atual** e avança o ramo atual.\n- **Merge × rebase (livro oficial Pro Git):** são as **duas formas** de integrar mudanças de um ramo em outro.\n  - **Merge:** faz uma mesclagem de três vias e cria um **commit de merge**.\n  - **Rebase:** **reaplica** os commits de um ramo em cima do outro → histórico **linear**. O snapshot final é o mesmo; **só o histórico muda**.\n  - ⚠️ Regra de ouro: **não faça rebase de commits já publicados** que outras pessoas usam.\n- **Exemplo prático:** `git checkout -b feature/assinatura` → commits → `git checkout develop` → `git merge feature/assinatura`.\n- **Conexões:** [[gitflow]] · [[github-gitlab]] · [[ci-cd]] (cada push dispara o pipeline)\n- **Fontes:** [Pro Git – Rebasing (pt-br)](https://git-scm.com/book/pt-br/v2/Ramifica%C3%A7%C3%A3o-Branching-no-Git-Rebase-Rebasing) · [Pro Git – Branching and Merging](https://git-scm.com/book/en/v2/Appendix-C%3A-Git-Commands-Branching-and-Merging)"
  },
  {
    "id": "gitflow",
    "aliasIds": [],
    "titulo": "Gitflow",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "tecnico",
    "npcName": "Mago Ada III",
    "npcRole": "ferreiro",
    "npcSeed": 1149218791,
    "oQueE": "O que é: modelo de ramificação publicado por Vincent Driessen (nvie, 05/01/2010).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: modelo de ramificação publicado por Vincent Driessen (nvie, 05/01/2010).",
      "Ramos principais (vida infinita):",
      "master/main → código pronto para produção;",
      "develop → integra o que vai para a próxima release.",
      "Ramos de apoio (vida curta):",
      "Pegadinha de prova: hotfix sai de main (não de develop) e volta para os dois.",
      "Comparação: o trunk-based development usa ramos curtos direto no tronco; o Gitflow tem mais ramos de longa duração."
    ],
    "conexoes": [
      "ingles-vocabulario",
      "git"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "nvie – A successful Git branching model",
        "url": "https://nvie.com/posts/a-successful-git-branching-model"
      },
      {
        "label": "Atlassian – Gitflow workflow",
        "url": "https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow"
      }
    ],
    "tablePairs": [
      {
        "term": "feature/",
        "definition": "Nasce de: develop · Volta para: develop · Para quê: nova funcionalidade",
        "rawRow": "feature/ — develop — develop — nova funcionalidade"
      },
      {
        "term": "release/",
        "definition": "Nasce de: develop · Volta para: main e develop · Para quê: preparar uma versão (ajustes finais)",
        "rawRow": "release/ — develop — main e develop — preparar uma versão (ajustes finais)"
      },
      {
        "term": "hotfix/",
        "definition": "Nasce de: main · Volta para: main e develop · Para quê: correção urgente em produção",
        "rawRow": "hotfix/ — main — main e develop — correção urgente em produção"
      }
    ],
    "textoCompleto": "- **O que é:** modelo de ramificação publicado por **Vincent Driessen (nvie, 05/01/2010)**.\n- **Ramos principais (vida infinita):**\n  - **master/main** → código **pronto para produção**;\n  - **develop** → integra o que vai para a **próxima release**.\n- **Ramos de apoio (vida curta):**\n\n| Ramo | Nasce de | Volta para | Para quê |\n| --- | --- | --- | --- |\n| **feature/** | develop | develop | nova funcionalidade |\n| **release/** | develop | main **e** develop | preparar uma versão (ajustes finais) |\n| **hotfix/** | **main** | main **e** develop | correção urgente em produção |\n\n- **Pegadinha de prova:** hotfix sai de **main** (não de develop) e volta para os **dois**.\n- **Comparação:** o *trunk-based development* usa ramos curtos direto no tronco; o Gitflow tem mais ramos de longa duração.\n- **Fontes:** [nvie – A successful Git branching model](https://nvie.com/posts/a-successful-git-branching-model) · [Atlassian – Gitflow workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)"
  },
  {
    "id": "github-gitlab",
    "aliasIds": [],
    "titulo": "GitHub e GitLab (repositórios, Wiki, tarefas)",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "ambos",
    "npcName": "Ferreira Turing III",
    "npcRole": "engenheiro",
    "npcSeed": 207771218,
    "oQueE": "O que são: plataformas que hospedam repositórios Git e somam colaboração: pull requests (GitHub) / merge requests (GitLab), revisão de código, issues (gerenciamento de tarefas), CI/CD.",
    "exemploPratico": "",
    "fatosChave": [
      "O que são: plataformas que hospedam repositórios Git e somam colaboração: pull requests (GitHub) / merge requests (GitLab), revisão de código, issues (gerenciamento de tarefas), CI/CD.",
      "🔵 Wiki do GitLab: documentação do projeto em Markdown, RDoc, AsciiDoc ou Org; cada wiki é um repositório Git separado (dá para clonar e editar localmente; histórico de cada página).",
      "🔵 Gerenciamento de tarefas: issues, boards (quadros estilo Kanban), milestones → liga com ageis."
    ],
    "conexoes": [
      "ageis",
      "git",
      "gitlab-ci",
      "portaria-253-2020"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "GitLab Docs – Wiki",
        "url": "https://docs.gitlab.com/user/project/wiki"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que são:** plataformas que **hospedam repositórios Git** e somam colaboração: *pull requests* (GitHub) / *merge requests* (GitLab), revisão de código, issues (gerenciamento de tarefas), CI/CD.\n- 🔵 **Wiki do GitLab:** documentação do projeto em **Markdown, RDoc, AsciiDoc ou Org**; **cada wiki é um repositório Git separado** (dá para clonar e editar localmente; histórico de cada página).\n- 🔵 **Gerenciamento de tarefas:** issues, boards (quadros estilo Kanban), milestones → liga com [[ageis]].\n- **Conexões:** [[git]] · [[gitlab-ci]] · [[portaria-253-2020]] (repositório de código da PDPJ)\n- **Fonte:** [GitLab Docs – Wiki](https://docs.gitlab.com/user/project/wiki)\n\n---"
  },
  {
    "id": "gitlab-ci",
    "aliasIds": [],
    "titulo": "GitLab CI/CD",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "ambos",
    "npcName": "Druida Grace III",
    "npcRole": "ferreiro",
    "npcSeed": 514230655,
    "oQueE": "Arquivo: .gitlab-ci.yml na raiz do projeto (YAML).",
    "exemploPratico": "Exemplo:",
    "fatosChave": [
      "Arquivo: .gitlab-ci.yml na raiz do projeto (YAML).",
      "Estrutura: o pipeline é feito de stages (ordem de execução, ex.: build → test → deploy) e jobs (as tarefas de cada stage).",
      "Jobs do mesmo stage rodam em paralelo; o próximo stage só começa se o anterior passar.",
      "Runners: os agentes que executam os jobs (máquinas físicas, VMs ou contêineres)."
    ],
    "conexoes": [
      "github-gitlab"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "GitLab Docs – Get started with CI/CD",
        "url": "https://docs.gitlab.com/ee/ci/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Arquivo:** `.gitlab-ci.yml` na **raiz** do projeto (YAML).\n- **Estrutura:** o **pipeline** é feito de **stages** (ordem de execução, ex.: build → test → deploy) e **jobs** (as tarefas de cada stage).\n  - Jobs do **mesmo stage rodam em paralelo**; o próximo stage só começa se o anterior passar.\n- **Runners:** os **agentes** que executam os jobs (máquinas físicas, VMs ou contêineres).\n- **Exemplo:**\n  ```yaml\n  stages: [build, test]\n  build-job:\n    stage: build\n    script: mvn package\n  test-job:\n    stage: test\n    script: mvn test\n  ```\n- **Fontes:** [GitLab Docs – Get started with CI/CD](https://docs.gitlab.com/ee/ci/)"
  },
  {
    "id": "jenkins",
    "aliasIds": [],
    "titulo": "Jenkins",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "analista",
    "npcName": "Arquiteta Barbara III",
    "npcRole": "mago",
    "npcSeed": 385058943,
    "oQueE": "O que é: servidor de automação open source para CI/CD.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: servidor de automação open source para CI/CD.",
      "Jenkinsfile: o pipeline como código, guardado no repositório. Duas sintaxes: Declarativa (mais nova, estruturada) e Scripted (Groovy livre, mais antiga).",
      "Estrutura declarativa mínima: pipeline { agent ... stages { stage('Build') { steps { ... } } } }",
      "agent (obrigatório) → onde rodar (aloca executor e workspace); stages/stage/steps → o que rodar; sh (Linux) ou bat (Windows)."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Jenkins – Using a Jenkinsfile",
        "url": "https://jenkins.io/doc/book/pipeline/jenkinsfile/"
      },
      {
        "label": "Jenkins – Pipeline",
        "url": "https://www.jenkins.io/doc/book/pipeline/index.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** servidor de automação open source para CI/CD.\n- **Jenkinsfile:** o pipeline como código, guardado no repositório. Duas sintaxes: **Declarativa** (mais nova, estruturada) e **Scripted** (Groovy livre, mais antiga).\n- **Estrutura declarativa mínima:** `pipeline { agent ... stages { stage('Build') { steps { ... } } } }`\n  - **agent** (obrigatório) → onde rodar (aloca executor e workspace); **stages/stage/steps** → o que rodar; `sh` (Linux) ou `bat` (Windows).\n- **Fontes:** [Jenkins – Using a Jenkinsfile](https://jenkins.io/doc/book/pipeline/jenkinsfile/) · [Jenkins – Pipeline](https://www.jenkins.io/doc/book/pipeline/index.html)"
  },
  {
    "id": "circleci",
    "aliasIds": [],
    "titulo": "CircleCI",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "analista",
    "npcName": "Escriba Dijkstra III",
    "npcRole": "ferreiro",
    "npcSeed": 598042987,
    "oQueE": "O que é: serviço de CI/CD em nuvem, configurado como código em .circleci/config.yml.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: serviço de CI/CD em nuvem, configurado como código em .circleci/config.yml.",
      "Conceitos: jobs (com steps), workflows (orquestram jobs e sua ordem), executors (ambiente: Docker, máquina Linux, macOS, Windows), orbs (pacotes reutilizáveis de configuração — commands, jobs, executors)."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CircleCI – Concepts",
        "url": "https://circleci.com/docs/concepts"
      },
      {
        "label": "CircleCI – Orbs",
        "url": "https://circleci.com/docs/orb-intro/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** serviço de CI/CD em nuvem, configurado como código em **`.circleci/config.yml`**.\n- **Conceitos:** **jobs** (com *steps*), **workflows** (orquestram jobs e sua ordem), **executors** (ambiente: Docker, máquina Linux, macOS, Windows), **orbs** (pacotes **reutilizáveis** de configuração — commands, jobs, executors).\n- **Fontes:** [CircleCI – Concepts](https://circleci.com/docs/concepts) · [CircleCI – Orbs](https://circleci.com/docs/orb-intro/)"
  },
  {
    "id": "maven",
    "aliasIds": [],
    "titulo": "Apache Maven",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "analista",
    "npcName": "Guardiã Liskov III",
    "npcRole": "mago",
    "npcSeed": 1495100280,
    "oQueE": "O que é: ferramenta de build e gerenciamento de dependências para Java, configurada no pom.xml.",
    "exemploPratico": "Exemplo: mvn clean verify no pipeline; o test usa o plugin Surefire (roda os testes JUnit).",
    "fatosChave": [
      "O que é: ferramenta de build e gerenciamento de dependências para Java, configurada no pom.xml.",
      "3 ciclos de vida: clean, default e site.",
      "Fases principais do default (em ordem): validate → compile → test → package → verify → install → deploy.",
      "Rodar uma fase executa todas as anteriores (mvn package faz validate, compile, test, package).",
      "install → copia o artefato para o repositório local; deploy → para o repositório remoto."
    ],
    "conexoes": [
      "spring-boot",
      "testes-software",
      "xml"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Maven – Build Lifecycle",
        "url": "https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html"
      },
      {
        "label": "Maven – Running",
        "url": "https://maven.apache.org/run"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** ferramenta de **build e gerenciamento de dependências** para Java, configurada no **`pom.xml`**.\n- **3 ciclos de vida:** **clean**, **default** e **site**.\n- **Fases principais do default (em ordem):** **validate → compile → test → package → verify → install → deploy**.\n  - Rodar uma fase executa **todas as anteriores** (`mvn package` faz validate, compile, test, package).\n  - **install** → copia o artefato para o **repositório local**; **deploy** → para o **repositório remoto**.\n- **Exemplo:** `mvn clean verify` no pipeline; o `test` usa o plugin **Surefire** (roda os testes JUnit).\n- **Conexões:** [[spring-boot]] · [[testes-software]] (JUnit) · [[xml]] (pom.xml é XML)\n- **Fontes:** [Maven – Build Lifecycle](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html) · [Maven – Running](https://maven.apache.org/run)"
  },
  {
    "id": "selenium",
    "aliasIds": [],
    "titulo": "Selenium e testes automatizados",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "analista",
    "npcName": "Alquimista Linus III",
    "npcRole": "ferreiro",
    "npcSeed": 245001847,
    "oQueE": "O que é: projeto \"guarda-chuva\" de ferramentas para automatizar navegadores.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: projeto \"guarda-chuva\" de ferramentas para automatizar navegadores.",
      "Componentes: WebDriver (API que controla o navegador; o mesmo script roda em vários navegadores) · Grid (roda testes em paralelo em várias máquinas/navegadores) · IDE (gravar e reproduzir, extensão de navegador).",
      "Uso: testes funcionais / ponta a ponta da interface (ex.: \"logar no sistema e abrir um processo\").",
      "Pirâmide de testes: muitos unitários (JUnit/Mockito) → alguns de integração → poucos de UI (Selenium, mais lentos e frágeis)."
    ],
    "conexoes": [
      "testes-software",
      "ci-cd"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Selenium – Overview",
        "url": "https://www.selenium.dev/documentation/overview/"
      },
      {
        "label": "Selenium – Grid",
        "url": "https://selenium.dev/documentation/grid/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** projeto \"guarda-chuva\" de ferramentas para **automatizar navegadores**.\n- **Componentes:** **WebDriver** (API que controla o navegador; o mesmo script roda em vários navegadores) · **Grid** (roda testes em **paralelo** em várias máquinas/navegadores) · **IDE** (gravar e reproduzir, extensão de navegador).\n- **Uso:** testes **funcionais / ponta a ponta** da interface (ex.: \"logar no sistema e abrir um processo\").\n- **Pirâmide de testes:** muitos **unitários** (JUnit/Mockito) → alguns de **integração** → poucos de **UI** (Selenium, mais lentos e frágeis).\n- **Conexões:** [[testes-software]] · [[ci-cd]]\n- **Fontes:** [Selenium – Overview](https://www.selenium.dev/documentation/overview/) · [Selenium – Grid](https://selenium.dev/documentation/grid/)"
  },
  {
    "id": "continuous-delivery",
    "aliasIds": [],
    "titulo": "CI × Continuous Delivery × Continuous Deployment",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "ambos",
    "npcName": "Engenheira Margaret III",
    "npcRole": "ferreiro",
    "npcSeed": 1747383325,
    "oQueE": "CI: integrar, compilar e testar o código continuamente no ambiente de desenvolvimento.",
    "exemploPratico": "",
    "fatosChave": [
      "CI: integrar, compilar e testar o código continuamente no ambiente de desenvolvimento.",
      "Continuous Delivery (Fowler): o software pode ir para produção a qualquer momento, mas você pode escolher não ir (aprovação manual).",
      "Continuous Deployment: toda mudança que passa nos testes vai automaticamente para produção. Para fazer deployment contínuo, é preciso já fazer delivery contínuo.",
      "Deployment pipeline: estágios iniciais rápidos pegam a maioria dos problemas; estágios finais são mais lentos e minuciosos."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Martin Fowler – ContinuousDelivery",
        "url": "https://martinfowler.com/bliki/ContinuousDelivery.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **CI:** integrar, compilar e testar o código continuamente no ambiente de desenvolvimento.\n- **Continuous Delivery (Fowler):** o software **pode** ir para produção a qualquer momento, mas você **pode escolher não ir** (aprovação manual).\n- **Continuous Deployment:** toda mudança que passa nos testes vai **automaticamente** para produção. Para fazer *deployment* contínuo, é preciso já fazer *delivery* contínuo.\n- **Deployment pipeline:** estágios iniciais rápidos pegam a maioria dos problemas; estágios finais são mais lentos e minuciosos.\n- **Fontes:** [Martin Fowler – ContinuousDelivery](https://martinfowler.com/bliki/ContinuousDelivery.html)"
  },
  {
    "id": "balanceamento-carga",
    "aliasIds": [],
    "titulo": "Balanceamento de carga e SSL offloading",
    "zonaId": "07-devops",
    "regiaoId": "floresta-do-codigo",
    "materia": "DevOps e DevSecOps",
    "cargo": "tecnico",
    "npcName": "Runista Fowler III",
    "npcRole": "mago",
    "npcSeed": 1224658056,
    "oQueE": "Algoritmos (documentação NGINX): Round Robin (padrão, em sequência), Least Connections (servidor com menos conexões ativas), IP Hash (mesmo cliente → mesmo servidor = persistência de sessão), Generic Hash, Least Time (só NGINX Plus). Pesos (weight) podem ajustar a distribuição.",
    "exemploPratico": "",
    "fatosChave": [
      "Algoritmos (documentação NGINX): Round Robin (padrão, em sequência), Least Connections (servidor com menos conexões ativas), IP Hash (mesmo cliente → mesmo servidor = persistência de sessão), Generic Hash, Least Time (só NGINX Plus). Pesos (weight) podem ajustar a distribuição.",
      "SSL/TLS offloading (terminação): o balanceador/proxy remove a criptografia TLS, inspeciona a requisição e encaminha ao servidor, aliviando a aplicação."
    ],
    "conexoes": [
      "proxy-reverso",
      "tls",
      "docker"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NGINX Docs – HTTP Load Balancing",
        "url": "https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/"
      },
      {
        "label": "NGINX – load balancing",
        "url": "https://www.nginx.com/products/nginx/load-balancing/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Algoritmos (documentação NGINX):** **Round Robin** (padrão, em sequência), **Least Connections** (servidor com menos conexões ativas), **IP Hash** (mesmo cliente → mesmo servidor = persistência de sessão), **Generic Hash**, **Least Time** (só NGINX Plus). Pesos (*weight*) podem ajustar a distribuição.\n- **SSL/TLS offloading (terminação):** o balanceador/proxy **remove a criptografia TLS**, inspeciona a requisição e encaminha ao servidor, aliviando a aplicação.\n- **Conexões:** [[proxy-reverso]] · [[tls]] · [[kubernetes]]\n- **Fontes:** [NGINX Docs – HTTP Load Balancing](https://docs.nginx.com/nginx/admin-guide/load-balancer/http-load-balancer/) · [NGINX – load balancing](https://www.nginx.com/products/nginx/load-balancing/)\n\n---"
  },
  {
    "id": "fundamentos-programacao",
    "aliasIds": [],
    "titulo": "Fundamentos: compilação, tipos, variáveis, operadores, fluxo",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Mestra Codd III",
    "npcRole": "ferreiro",
    "npcSeed": 41475958,
    "oQueE": "Compilação × interpretação: compilado → traduzido antes de rodar (C → código de máquina); Java → compila para bytecode (.class) que roda na JVM; C# → compila para IL que roda no CLR (.NET); Python/PHP/JS → em geral interpretados (com compilação interna/JIT).",
    "exemploPratico": "",
    "fatosChave": [
      "Compilação × interpretação: compilado → traduzido antes de rodar (C → código de máquina); Java → compila para bytecode (.class) que roda na JVM; C# → compila para IL que roda no CLR (.NET); Python/PHP/JS → em geral interpretados (com compilação interna/JIT).",
      "Tipagem: estática (tipo checado na compilação: Java, C#, C, TypeScript) × dinâmica (tipo definido em execução: Python, JavaScript, PHP).",
      "Tipos primitivos do Java — 8: byte(8 bits) short(16) int(32) long(64) float(32) double(64) char(16, Unicode) boolean.",
      "Valores padrão de atributos (fields): 0, 0L, 0.0f, 0.0d, '\\u0000', false; objetos (inclusive String) → null.",
      "float/double não servem para valores exatos como dinheiro (usar BigDecimal).",
      "Tipos de referência (🔵 citado no edital do Técnico): classes, interfaces, arrays, String — a variável guarda uma referência ao objeto.",
      "Literais: 100L (long), 123.4f (float), 1.234e2 (double), 'C' (char), \"texto\" (String), 0x1F (hexadecimal).",
      "Operadores e precedência (resumo): unários (++ -- !) > multiplicativos (* / %) > aditivos (+ -) > relacionais (< > <= >=) > igualdade (== !=) > lógicos (&& antes de ||) > ternário (?:) > atribuição (= += ...).",
      "Controle de fluxo: seleção (if/else, switch) e repetição (for, while, do-while — este executa pelo menos uma vez), break/continue."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Variável local não recebe valor padrão — usar sem inicializar dá erro de compilação."
    ],
    "fontes": [
      {
        "label": "Oracle – Primitive Data Types",
        "url": "https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html"
      },
      {
        "label": "dev.java – Primitive types",
        "url": "https://dev.java/learn/language-basics/primitive-types"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Compilação × interpretação:** compilado → traduzido antes de rodar (C → código de máquina); **Java** → compila para **bytecode** (`.class`) que roda na **JVM**; **C#** → compila para IL que roda no **CLR (.NET)**; **Python/PHP/JS** → em geral interpretados (com compilação interna/JIT).\n- **Tipagem:** **estática** (tipo checado na compilação: Java, C#, C, TypeScript) × **dinâmica** (tipo definido em execução: Python, JavaScript, PHP).\n- **Tipos primitivos do Java — 8:** `byte`(8 bits) `short`(16) `int`(32) `long`(64) `float`(32) `double`(64) `char`(16, Unicode) `boolean`.\n  - Valores padrão **de atributos (fields)**: 0, `0L`, `0.0f`, `0.0d`, `'\\u0000'`, `false`; objetos (inclusive `String`) → `null`.\n  - ⚠️ **Variável local não recebe valor padrão** — usar sem inicializar dá erro de compilação.\n  - `float`/`double` **não** servem para valores exatos como **dinheiro** (usar `BigDecimal`).\n  - **Tipos de referência** (🔵 citado no edital do Técnico): classes, interfaces, arrays, `String` — a variável guarda uma **referência** ao objeto.\n- **Literais:** `100L` (long), `123.4f` (float), `1.234e2` (double), `'C'` (char), `\"texto\"` (String), `0x1F` (hexadecimal).\n- **Operadores e precedência (resumo):** unários (`++ -- !`) > multiplicativos (`* / %`) > aditivos (`+ -`) > relacionais (`< > <= >=`) > igualdade (`== !=`) > lógicos (`&&` antes de `||`) > ternário (`?:`) > atribuição (`= += ...`).\n- **Controle de fluxo:** seleção (`if/else`, `switch`) e repetição (`for`, `while`, `do-while` — este executa **pelo menos uma vez**), `break`/`continue`.\n- **Fontes:** [Oracle – Primitive Data Types](https://docs.oracle.com/javase/tutorial/java/nutsandbolts/datatypes.html) · [dev.java – Primitive types](https://dev.java/learn/language-basics/primitive-types)"
  },
  {
    "id": "oo",
    "aliasIds": [],
    "titulo": "Orientação a objetos",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Artífice Gosling III",
    "npcRole": "ferreiro",
    "npcSeed": 1647587683,
    "oQueE": "Classe (molde) → objeto (instância). Interface = contrato de métodos que a classe implementa.",
    "exemploPratico": "",
    "fatosChave": [
      "Classe (molde) → objeto (instância). Interface = contrato de métodos que a classe implementa.",
      "Encapsulamento: esconder o estado (atributos private) e expor métodos (get/set). Modificadores Java: private < default (pacote) < protected < public.",
      "Herança: subclasse herda da superclasse (extends); Java tem herança simples de classe e múltipla de interfaces.",
      "Sobrecarga (overload) × sobrescrita (override):",
      "Sobrecarga → mesmo nome, parâmetros diferentes, na mesma classe (resolvida em compilação).",
      "Sobrescrita → subclasse redefine método herdado com mesma assinatura (@Override; resolvida em execução = polimorfismo).",
      "Pacotes (packages): organizam classes e definem namespaces (br.jus.trt4.processo)."
    ],
    "conexoes": [
      "uml",
      "padroes-projeto",
      "java"
    ],
    "avisosOraculo": [
      "Conceitos clássicos de OO; fonte oficial de apoio: tutorial Oracle \"Object-Oriented Programming Concepts\"."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Classe** (molde) → **objeto** (instância). **Interface** = contrato de métodos que a classe implementa.\n- **Encapsulamento:** esconder o estado (atributos `private`) e expor métodos (`get/set`). Modificadores Java: `private` < *default* (pacote) < `protected` < `public`.\n- **Herança:** subclasse herda da superclasse (`extends`); Java tem **herança simples de classe** e **múltipla de interfaces**.\n- **Sobrecarga (overload) × sobrescrita (override):**\n  - **Sobrecarga** → mesmo nome, **parâmetros diferentes**, na mesma classe (resolvida em **compilação**).\n  - **Sobrescrita** → subclasse **redefine** método herdado com **mesma assinatura** (`@Override`; resolvida em **execução** = polimorfismo).\n- **Pacotes (packages):** organizam classes e definem namespaces (`br.jus.trt4.processo`).\n- **Conexões:** [[uml]] (diagrama de classes) · [[padroes-projeto]] · [[java]]\n- ⚠️ Conceitos clássicos de OO; fonte oficial de apoio: tutorial Oracle \"Object-Oriented Programming Concepts\"."
  },
  {
    "id": "excecoes",
    "aliasIds": [],
    "titulo": "Administração de exceções",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Oráculo Knuth III",
    "npcRole": "engenheiro",
    "npcSeed": 1866345950,
    "oQueE": "O que é: exceção = evento que interrompe o fluxo normal do programa. Criar e entregar o objeto de exceção ao runtime = lançar (throw).",
    "exemploPratico": "Exemplo prático: ler o arquivo de uma petição → IOException (checked) tem que ser tratada; acessar processo.getParte() com processo nulo → NullPointerException (unchecked).",
    "fatosChave": [
      "O que é: exceção = evento que interrompe o fluxo normal do programa. Criar e entregar o objeto de exceção ao runtime = lançar (throw).",
      "Java – 3 categorias (tutorial oficial Oracle):",
      "Checked exceptions → o compilador obriga a tratar (try/catch) ou declarar (throws) — \"Catch or Specify Requirement\" (ex.: IOException).",
      "Error → problemas externos graves (ex.: OutOfMemoryError).",
      "RuntimeException → bugs de lógica (ex.: NullPointerException, ArrayIndexOutOfBoundsException).",
      "Error + RuntimeException = unchecked (não obrigam tratar/declarar).",
      "Blocos: try → catch (um ou vários) → finally (sempre executa); try-with-resources fecha recursos automaticamente."
    ],
    "conexoes": [
      "owasp",
      "testes-software"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Oracle – Catch or Specify",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/catchOrDeclare.html"
      },
      {
        "label": "Oracle – Unchecked exceptions",
        "url": "https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** exceção = evento que **interrompe o fluxo normal** do programa. Criar e entregar o objeto de exceção ao runtime = **lançar** (*throw*).\n- **Java – 3 categorias (tutorial oficial Oracle):**\n  - **Checked exceptions** → o compilador obriga a **tratar (`try/catch`) ou declarar (`throws`)** — \"*Catch or Specify Requirement*\" (ex.: `IOException`).\n  - **Error** → problemas externos graves (ex.: `OutOfMemoryError`).\n  - **RuntimeException** → bugs de lógica (ex.: `NullPointerException`, `ArrayIndexOutOfBoundsException`).\n  - **Error + RuntimeException = unchecked** (não obrigam tratar/declarar).\n- **Blocos:** `try` → `catch` (um ou vários) → `finally` (sempre executa); *try-with-resources* fecha recursos automaticamente.\n- **Exemplo prático:** ler o arquivo de uma petição → `IOException` (checked) tem que ser tratada; acessar `processo.getParte()` com processo nulo → `NullPointerException` (unchecked).\n- **Conexões:** [[owasp]] (A10 2025 = tratamento indevido de condições excepcionais) · [[testes-software]] (testar exceções com JUnit `assertThrows`)\n- **Fontes:** [Oracle – Catch or Specify](https://docs.oracle.com/javase/tutorial/essential/exceptions/catchOrDeclare.html) · [Oracle – Unchecked exceptions](https://docs.oracle.com/javase/tutorial/essential/exceptions/runtime.html)"
  },
  {
    "id": "acesso-banco",
    "aliasIds": [],
    "titulo": "Acesso a banco de dados nas linguagens",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Tecelã Hamilton III",
    "npcRole": "mago",
    "npcSeed": 1905390279,
    "oQueE": "Java: JDBC (API de baixo nível: Connection, PreparedStatement, ResultSet) ou JPA/Hibernate (ORM) → jpa-hibernate.",
    "exemploPratico": "",
    "fatosChave": [
      "Java: JDBC (API de baixo nível: Connection, PreparedStatement, ResultSet) ou JPA/Hibernate (ORM) → jpa-hibernate.",
      "C#/.NET: ADO.NET ou Entity Framework Core. PHP: PDO. Python: DB-API (ex.: psycopg para PostgreSQL).",
      "Regra de ouro de segurança: usar consultas parametrizadas (PreparedStatement) → evita SQL injection (owasp A05)."
    ],
    "conexoes": [
      "jpa-hibernate",
      "owasp",
      "sql",
      "postgresql"
    ],
    "avisosOraculo": [
      "Resumo conceitual; detalhar com documentação oficial de cada API se necessário."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Java:** **JDBC** (API de baixo nível: `Connection`, `PreparedStatement`, `ResultSet`) ou **JPA/Hibernate** (ORM) → [[jpa-hibernate]].\n- **C#/.NET:** ADO.NET ou Entity Framework Core. **PHP:** PDO. **Python:** DB-API (ex.: psycopg para PostgreSQL).\n- **Regra de ouro de segurança:** usar **consultas parametrizadas** (`PreparedStatement`) → evita **SQL injection** ([[owasp]] A05).\n- **Conexões:** [[sql]] · [[postgresql]]\n- ⚠️ Resumo conceitual; detalhar com documentação oficial de cada API se necessário.\n\n---"
  },
  {
    "id": "linguagens",
    "aliasIds": [],
    "titulo": "Linguagens do edital (visão rápida)",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Sábio Gamma III",
    "npcRole": "mago",
    "npcSeed": 1124293668,
    "oQueE": "Fontes TypeScript: TypeScript – A Typed Superset of JavaScript · MDN – TypeScript",
    "exemploPratico": "",
    "fatosChave": [
      "Fontes TypeScript: TypeScript – A Typed Superset of JavaScript · MDN – TypeScript"
    ],
    "conexoes": [],
    "avisosOraculo": [
      "As linhas de C, C#, PHP, VB e Delphi são descrições gerais — vale aprofundar com a documentação oficial no próximo nível."
    ],
    "fontes": [
      {
        "label": "TypeScript – A Typed Superset of JavaScript",
        "url": "https://www.typescriptlang.org/docs/handbook/typescript-from-scratch"
      },
      {
        "label": "MDN – TypeScript",
        "url": "https://developer.mozilla.org/en-US/docs/Glossary/TypeScript"
      }
    ],
    "tablePairs": [
      {
        "term": "Java",
        "definition": "Cargo: 🟢 · Ideia-chave: OO, compilada para bytecode/JVM, tipagem estática — base da PDPJ-Br",
        "rawRow": "Java — 🟢 — OO, compilada para bytecode/JVM, tipagem estática — base da PDPJ-Br"
      },
      {
        "term": "Python",
        "definition": "Cargo: 🟢 · Ideia-chave: interpretada, tipagem dinâmica, indentação define blocos; forte em dados/IA",
        "rawRow": "Python — 🟢 — interpretada, tipagem dinâmica, indentação define blocos; forte em dados/IA"
      },
      {
        "term": "JavaScript",
        "definition": "Cargo: 🔵 (🟣 em web) · Ideia-chave: linguagem da web; tipagem dinâmica; roda no navegador e no Node.js",
        "rawRow": "JavaScript — 🔵 (🟣 em web) — linguagem da web; tipagem dinâmica; roda no navegador e no Node.js"
      },
      {
        "term": "TypeScript",
        "definition": "Cargo: 🟢 · Ideia-chave: superconjunto tipado de JS: todo JS é TS válido; compila (transpila) para JavaScript; o comportamento em execução é o mesmo do JS",
        "rawRow": "TypeScript — 🟢 — superconjunto tipado de JS: todo JS é TS válido; compila (transpila) para JavaScript; o comportamento em execução é o mesmo do JS"
      },
      {
        "term": "C#",
        "definition": "Cargo: 🟣 · Ideia-chave: OO da Microsoft, roda no .NET",
        "rawRow": "C# — 🟣 — OO da Microsoft, roda no .NET"
      },
      {
        "term": "PHP",
        "definition": "Cargo: 🟣 · Ideia-chave: linguagem de script do lado do servidor web",
        "rawRow": "PHP — 🟣 — linguagem de script do lado do servidor web"
      },
      {
        "term": "Visual Basic",
        "definition": "Cargo: 🟣 · Ideia-chave: linguagem da Microsoft (hoje VB.NET no .NET)",
        "rawRow": "Visual Basic — 🟣 — linguagem da Microsoft (hoje VB.NET no .NET)"
      },
      {
        "term": "Delphi",
        "definition": "Cargo: 🟣 · Ideia-chave: ambiente/linguagem baseado em Object Pascal (sistemas legados desktop)",
        "rawRow": "Delphi — 🟣 — ambiente/linguagem baseado em Object Pascal (sistemas legados desktop)"
      }
    ],
    "textoCompleto": "| Linguagem | Cargo | Ideia-chave |\n| --- | --- | --- |\n| **Java** | 🟢 | OO, compilada para bytecode/JVM, tipagem estática — base da PDPJ-Br |\n| **Python** | 🟢 | interpretada, tipagem dinâmica, indentação define blocos; forte em dados/IA |\n| **JavaScript** | 🔵 (🟣 em web) | linguagem da web; tipagem dinâmica; roda no navegador e no Node.js |\n| **TypeScript** | 🟢 | **superconjunto tipado** de JS: todo JS é TS válido; **compila (transpila) para JavaScript**; o comportamento em execução é o mesmo do JS |\n| **C** | 🟣 | procedural, compilada, ponteiros, gerência manual de memória |\n| **C#** | 🟣 | OO da Microsoft, roda no .NET |\n| **PHP** | 🟣 | linguagem de script do lado do servidor web |\n| **Visual Basic** | 🟣 | linguagem da Microsoft (hoje VB.NET no .NET) |\n| **Delphi** | 🟣 | ambiente/linguagem baseado em Object Pascal (sistemas legados desktop) |\n\n- **Fontes TypeScript:** [TypeScript – A Typed Superset of JavaScript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch) · [MDN – TypeScript](https://developer.mozilla.org/en-US/docs/Glossary/TypeScript)\n- ⚠️ As linhas de C, C#, PHP, VB e Delphi são descrições gerais — vale aprofundar com a documentação oficial no próximo nível."
  },
  {
    "id": "dotnet",
    "aliasIds": [],
    "titulo": ".NET e ASP.NET Core",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "analista",
    "npcName": "Maga Hopper III",
    "npcRole": "engenheiro",
    "npcSeed": 1529178581,
    "oQueE": ".NET: plataforma da Microsoft (runtime + SDK + bibliotecas); ASP.NET Core é o framework web dela (MVC, Razor Pages, Web APIs).",
    "exemploPratico": "",
    "fatosChave": [
      ".NET: plataforma da Microsoft (runtime + SDK + bibliotecas); ASP.NET Core é o framework web dela (MVC, Razor Pages, Web APIs).",
      "Ciclo de versões: uma versão major todo novembro; pares = LTS (3 anos), ímpares = STS (24 meses desde o .NET 9).",
      ".NET 10 (LTS): lançado em 11/11/2025, suporte até nov/2028.",
      ".NET 11 (STS): lançado em 10/11/2026.",
      ".NET 8 e .NET 9 saíram de suporte em 10/11/2026.",
      "O .NET Framework 4.8 (legado, só Windows) segue suportado enquanto estiver em Windows suportado."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": ".NET Support Policy",
        "url": "https://dotnet.microsoft.com/platform/support/policy/dotnet-core"
      },
      {
        "label": ".NET Blog – STS 24 meses",
        "url": "https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **.NET:** plataforma da Microsoft (runtime + SDK + bibliotecas); **ASP.NET Core** é o framework web dela (MVC, Razor Pages, Web APIs).\n- **Ciclo de versões:** uma versão major **todo novembro**; **pares = LTS** (3 anos), **ímpares = STS** (24 meses desde o .NET 9).\n  - **.NET 10 (LTS):** lançado em **11/11/2025**, suporte até **nov/2028**.\n  - **.NET 11 (STS):** lançado em **10/11/2026**.\n  - .NET 8 e .NET 9 saíram de suporte em **10/11/2026**.\n  - O **.NET Framework 4.8** (legado, só Windows) segue suportado enquanto estiver em Windows suportado.\n- **Fontes:** [.NET Support Policy](https://dotnet.microsoft.com/platform/support/policy/dotnet-core) · [.NET Blog – STS 24 meses](https://devblogs.microsoft.com/dotnet/dotnet-sts-releases-supported-for-24-months/)\n\n---"
  },
  {
    "id": "web-frontend",
    "aliasIds": [],
    "titulo": "HTML5, CSS3, Bootstrap 5, PWA",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Construtor Brooks III",
    "npcRole": "engenheiro",
    "npcSeed": 214976288,
    "oQueE": "HTML5: estrutura e semântica (<header> <nav> <main> <article> <section> <footer>), formulários com novos tipos (email, date), <video>/<audio>, APIs (localStorage, Canvas…).",
    "exemploPratico": "",
    "fatosChave": [
      "HTML5: estrutura e semântica (<header> <nav> <main> <article> <section> <footer>), formulários com novos tipos (email, date), <video>/<audio>, APIs (localStorage, Canvas…).",
      "CSS3: apresentação; seletores, Flexbox e Grid, media queries (responsividade), transições/animações.",
      "Bootstrap 5: framework CSS; grid flexbox de 12 colunas e 6 breakpoints:",
      "Breakpoints são min-width (mobile-first): .col-sm-4 vale para sm e todos acima. (O Bootstrap 4 tinha só 5 tiers, sem xxl.)",
      "🔵 PWA (Progressive Web App): app feito com tecnologias web que se comporta como app nativo. Precisa de um web app manifest (JSON com nome, ícones… para o navegador instalar); o service worker é opcional para instalar, mas é o que dá funcionamento offline (cache). Termo criado em 2015."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Bootstrap 5.3 – Grid",
        "url": "https://getbootstrap.com/docs/5.3/layout/grid/"
      },
      {
        "label": "Bootstrap 5.0 – Grid (breakpoints)",
        "url": "https://getbootstrap.com/docs/5.0/layout/grid/"
      },
      {
        "label": "MDN – What is a PWA",
        "url": "https://developer.mozilla.org/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app"
      },
      {
        "label": "MDN – Web app manifest",
        "url": "https://developer.mozilla.org/en-US/docs/web/Manifest"
      }
    ],
    "tablePairs": [
      {
        "term": "< 576px (.col-)",
        "definition": "sm: ≥ 576 · md: ≥ 768 · lg: ≥ 992 · xl: ≥ 1200 · xxl: ≥ 1400",
        "rawRow": "< 576px (.col-) — ≥ 576 — ≥ 768 — ≥ 992 — ≥ 1200 — ≥ 1400"
      }
    ],
    "textoCompleto": "- **HTML5:** estrutura e **semântica** (`<header> <nav> <main> <article> <section> <footer>`), formulários com novos tipos (`email`, `date`), `<video>`/`<audio>`, APIs (localStorage, Canvas…).\n- **CSS3:** apresentação; seletores, **Flexbox** e **Grid**, **media queries** (responsividade), transições/animações.\n- **Bootstrap 5:** framework CSS; grid **flexbox** de **12 colunas** e **6 breakpoints**:\n\n| xs | sm | md | lg | xl | xxl |\n| --- | --- | --- | --- | --- | --- |\n| < 576px (`.col-`) | ≥ 576 | ≥ 768 | ≥ 992 | ≥ 1200 | ≥ 1400 |\n\n  - Breakpoints são **min-width** (mobile-first): `.col-sm-4` vale para **sm e todos acima**. (O Bootstrap 4 tinha só 5 tiers, sem xxl.)\n- 🔵 **PWA (Progressive Web App):** app feito com tecnologias web que **se comporta como app nativo**. Precisa de um **web app manifest** (JSON com nome, ícones… para o navegador **instalar**); o **service worker** é opcional para instalar, mas é o que dá **funcionamento offline** (cache). Termo criado em 2015.\n- **Fontes:** [Bootstrap 5.3 – Grid](https://getbootstrap.com/docs/5.3/layout/grid/) · [Bootstrap 5.0 – Grid (breakpoints)](https://getbootstrap.com/docs/5.0/layout/grid/) · [MDN – What is a PWA](https://developer.mozilla.org/docs/Web/Progressive_web_apps/Guides/What_is_a_progressive_web_app) · [MDN – Web app manifest](https://developer.mozilla.org/en-US/docs/web/Manifest)"
  },
  {
    "id": "js-frameworks",
    "aliasIds": [],
    "titulo": "Frameworks/bibliotecas JavaScript",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Mago Ada IV",
    "npcRole": "ferreiro",
    "npcSeed": 1149059704,
    "oQueE": "React: \"a biblioteca para interfaces web e nativas\"; UI feita de componentes; usa JSX (extensão de sintaxe do JS). Não define roteamento/busca de dados (recomenda frameworks como Next.js). 🟣 React Native → mesmos conceitos gerando UI nativa Android/iOS (não é web view).",
    "exemploPratico": "",
    "fatosChave": [
      "React: \"a biblioteca para interfaces web e nativas\"; UI feita de componentes; usa JSX (extensão de sintaxe do JS). Não define roteamento/busca de dados (recomenda frameworks como Next.js). 🟣 React Native → mesmos conceitos gerando UI nativa Android/iOS (não é web view).",
      "Angular (🔵 + 🟣): framework completo do Google, baseado em TypeScript, major a cada 6 meses. Linha do tempo: standalone components (v14) → padrão (v17) → Signals → zoneless → Angular 21 (20/11/2025) → Angular 22 (2026). 🔵 Angular Material = biblioteca de componentes de UI (Material Design).",
      "Vue.js: framework progressivo; componentes com template (HTML), script e estilo separados.",
      "jQuery: biblioteca clássica para manipular DOM/eventos/AJAX (legado).",
      "Node.js: não é framework nem linguagem → é um runtime JavaScript assíncrono e orientado a eventos, construído sobre o motor V8, para rodar JS fora do navegador (servidores, ferramentas de build)."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "A data exata do Angular 22 varia entre fontes não oficiais (maio–junho/2026); conferir em angular.dev."
    ],
    "fontes": [
      {
        "label": "react.dev",
        "url": "https://react.dev/"
      },
      {
        "label": "Node.js – About",
        "url": "https://nodejs.org/about"
      },
      {
        "label": "InfoQ – Angular 21",
        "url": "https://www.infoq.com/news/2025/11/angular-21-released"
      },
      {
        "label": "InfoQ – Angular v22",
        "url": "https://infoq.com/news/2026/08/angular-v22-released"
      },
      {
        "label": "MDN – Frameworks",
        "url": "https://developer.mozilla.org/docs/Learn_web_development/Core/Frameworks_libraries"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **React:** \"a **biblioteca** para interfaces web e nativas\"; UI feita de **componentes**; usa **JSX** (extensão de sintaxe do JS). Não define roteamento/busca de dados (recomenda frameworks como Next.js). 🟣 **React Native** → mesmos conceitos gerando **UI nativa** Android/iOS (não é web view).\n- **Angular** (🔵 + 🟣): **framework completo** do Google, baseado em **TypeScript**, major a cada **6 meses**. Linha do tempo: standalone components (v14) → padrão (v17) → Signals → **zoneless** → **Angular 21 (20/11/2025)** → **Angular 22 (2026)**. 🔵 **Angular Material** = biblioteca de componentes de UI (Material Design).\n- **Vue.js:** framework progressivo; componentes com template (HTML), script e estilo separados.\n- **jQuery:** biblioteca clássica para manipular DOM/eventos/AJAX (legado).\n- **Node.js:** **não é framework nem linguagem** → é um **runtime JavaScript assíncrono e orientado a eventos**, construído sobre o motor **V8**, para rodar JS **fora do navegador** (servidores, ferramentas de build).\n- ⚠️ A data exata do Angular 22 varia entre fontes não oficiais (maio–junho/2026); conferir em angular.dev.\n- **Fontes:** [react.dev](https://react.dev/) · [Node.js – About](https://nodejs.org/about) · [InfoQ – Angular 21](https://www.infoq.com/news/2025/11/angular-21-released) · [InfoQ – Angular v22](https://infoq.com/news/2026/08/angular-v22-released) · [MDN – Frameworks](https://developer.mozilla.org/docs/Learn_web_development/Core/Frameworks_libraries)"
  },
  {
    "id": "jsf-jsp",
    "aliasIds": [],
    "titulo": "JSF (Jakarta Faces) e JSP (Jakarta Pages)",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Ferreira Turing IV",
    "npcRole": "ferreiro",
    "npcSeed": 6493936,
    "oQueE": "JSP (Jakarta Server Pages): construída sobre a Servlet API; páginas baseadas em tags/templates que geram HTML no servidor (modelo centrado no documento).",
    "exemploPratico": "",
    "fatosChave": [
      "JSP (Jakarta Server Pages): construída sobre a Servlet API; páginas baseadas em tags/templates que geram HTML no servidor (modelo centrado no documento).",
      "JSF (Jakarta Faces): framework MVC baseado em componentes para UI web (componentes de UI, estado, eventos, validação, navegação, i18n). Desde o JSF 2.0, a view padrão é Facelets (XHTML). JSF 3.0 trocou javax.faces → jakarta.faces; Faces 4.1 = Jakarta EE 11.",
      "Contexto PJe: o relatório do CJF sobre o PJe (2013) lista, no plano de capacitação das equipes, cursos de \"Persistência com JPA e Hibernate\" e \"Laboratório Web com JSF e CDI\" — ou seja, a stack histórica do PJe passa por JSF. (Relatório PJe 2013 – CJF)"
    ],
    "conexoes": [
      "jakarta-ee",
      "servicos-rede"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Relatório PJe 2013 – CJF",
        "url": "https://cjf.jus.br/observatorio/arq/pje/Relatório%20PJe%202013.pdf"
      },
      {
        "label": "Jakarta EE Tutorial – Faces",
        "url": "https://jakarta.ee/learn/docs/jakartaee-tutorial/9.1/web/faces-intro/faces-intro.html"
      },
      {
        "label": "Eclipse – Jakarta Faces",
        "url": "https://projects.eclipse.org/projects/ee4j.faces/governance"
      },
      {
        "label": "Jakarta Faces 3.0",
        "url": "https://jakarta.ee/specifications/faces/3.0/jakarta-faces-3.0"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **JSP (Jakarta Server Pages):** construída sobre a **Servlet API**; páginas **baseadas em tags/templates** que geram HTML no servidor (modelo centrado no documento).\n- **JSF (Jakarta Faces):** framework **MVC baseado em componentes** para UI web (componentes de UI, estado, eventos, validação, navegação, i18n). Desde o JSF 2.0, a view padrão é **Facelets (XHTML)**. JSF 3.0 trocou `javax.faces` → `jakarta.faces`; **Faces 4.1 = Jakarta EE 11**.\n- **Contexto PJe:** o relatório do CJF sobre o PJe (2013) lista, no plano de capacitação das equipes, cursos de \"Persistência com JPA e Hibernate\" e \"Laboratório Web com JSF e CDI\" — ou seja, a stack histórica do PJe passa por JSF. ([Relatório PJe 2013 – CJF](https://cjf.jus.br/observatorio/arq/pje/Relatório%20PJe%202013.pdf))\n- **Conexões:** [[jakarta-ee]] · [[servicos-rede]] (servidores que já trazem JSF embutido)\n- **Fontes:** [Jakarta EE Tutorial – Faces](https://jakarta.ee/learn/docs/jakartaee-tutorial/9.1/web/faces-intro/faces-intro.html) · [Eclipse – Jakarta Faces](https://projects.eclipse.org/projects/ee4j.faces/governance) · [Jakarta Faces 3.0](https://jakarta.ee/specifications/faces/3.0/jakarta-faces-3.0)"
  },
  {
    "id": "xml",
    "aliasIds": [],
    "titulo": "XML e XML Schema (XSD)",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Druida Grace IV",
    "npcRole": "mago",
    "npcSeed": 630165834,
    "oQueE": "XML bem formado (well-formed): respeita a sintaxe — um único elemento raiz, toda tag aberta é fechada, case sensitive, aninhamento correto, valores de atributo entre aspas.",
    "exemploPratico": "Exemplo: <xs:element name=\"numeroProcesso\" type=\"xs:string\"/>.",
    "fatosChave": [
      "XML bem formado (well-formed): respeita a sintaxe — um único elemento raiz, toda tag aberta é fechada, case sensitive, aninhamento correto, valores de atributo entre aspas.",
      "XML válido (valid): é bem formado e obedece a uma gramática (DTD ou XML Schema). Todo válido é bem formado; o contrário não.",
      "XML Schema (XSD): descreve os blocos legais do documento (elementos, atributos, ordem, tipos de dados); é escrito em XML, suporta namespaces e tipos (mais rico que DTD). Namespace: http://www.w3.org/2001/XMLSchema."
    ],
    "conexoes": [
      "maven",
      "jsf-jsp",
      "arquiteturas",
      "api-rest"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "W3C – XML 1.0 (well-formed)",
        "url": "https://www.w3.org/2003/Talks/techplen-xmlspecglossaries/gloss.html"
      },
      {
        "label": "W3Schools – XML Schema",
        "url": "https://www.w3schools.com/xmL/xml_schema.asp"
      },
      {
        "label": "W3Schools – Validator",
        "url": "https://w3schools.com/xml/xml_validator.asp"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **XML bem formado (*well-formed*):** respeita a sintaxe — **um único elemento raiz**, toda tag aberta é fechada, **case sensitive**, aninhamento correto, **valores de atributo entre aspas**.\n- **XML válido (*valid*):** é bem formado **e** obedece a uma gramática (**DTD** ou **XML Schema**). Todo válido é bem formado; o contrário não.\n- **XML Schema (XSD):** descreve os blocos legais do documento (elementos, atributos, ordem, **tipos de dados**); é escrito **em XML**, suporta **namespaces** e tipos (mais rico que DTD). Namespace: `http://www.w3.org/2001/XMLSchema`.\n- **Exemplo:** `<xs:element name=\"numeroProcesso\" type=\"xs:string\"/>`.\n- **Conexões:** [[maven]] (pom.xml) · [[jsf-jsp]] (Facelets = XHTML) · [[arquiteturas]] (SOAP/WSDL são XML) · [[json]] (alternativa mais leve)\n- **Fontes:** [W3C – XML 1.0 (well-formed)](https://www.w3.org/2003/Talks/techplen-xmlspecglossaries/gloss.html) · [W3Schools – XML Schema](https://www.w3schools.com/xmL/xml_schema.asp) · [W3Schools – Validator](https://w3schools.com/xml/xml_validator.asp)"
  },
  {
    "id": "ides",
    "aliasIds": [],
    "titulo": "Eclipse IDE e Visual Studio Code",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "tecnico",
    "npcName": "Arquiteta Barbara IV",
    "npcRole": "engenheiro",
    "npcSeed": 386874812,
    "oQueE": "Eclipse: IDE open source (Eclipse Foundation), tradicional para Java/Jakarta EE, com plugins (Maven, Git).",
    "exemploPratico": "",
    "fatosChave": [
      "Eclipse: IDE open source (Eclipse Foundation), tradicional para Java/Jakarta EE, com plugins (Maven, Git).",
      "VS Code: editor de código da Microsoft, leve, baseado em extensões (Java, Python, TS, Angular, Git integrado)."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Descrição geral; sem fonte oficial consultada nesta rodada."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Eclipse:** IDE open source (Eclipse Foundation), tradicional para **Java/Jakarta EE**, com plugins (Maven, Git).\n- **VS Code:** editor de código da Microsoft, leve, baseado em **extensões** (Java, Python, TS, Angular, Git integrado).\n- ⚠️ Descrição geral; sem fonte oficial consultada nesta rodada.\n\n---"
  },
  {
    "id": "servidor-web-aplicacao",
    "aliasIds": [],
    "titulo": "Servidor web × servidor de aplicação; internet/intranet/extranet/portal",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "analista",
    "npcName": "Escriba Dijkstra IV",
    "npcRole": "mago",
    "npcSeed": 459111492,
    "oQueE": "Servidor web: serve conteúdo HTTP (estático e encaminha dinâmico) — ex.: Apache HTTP Server, IIS, NGINX.",
    "exemploPratico": "",
    "fatosChave": [
      "Servidor web: serve conteúdo HTTP (estático e encaminha dinâmico) — ex.: Apache HTTP Server, IIS, NGINX.",
      "Servidor de aplicação: executa a lógica de negócio e fornece serviços corporativos (transações, segurança, pool de conexões) — ex.: JBoss EAP/WildFly (Jakarta EE).",
      "Internet (rede pública) · Intranet (rede interna da organização com tecnologias web) · Extranet (parte da intranet aberta a parceiros externos autorizados) · Portal (ponto único de acesso a vários serviços/informações, ex.: portal unificado da Res. CNJ 574/2024)."
    ],
    "conexoes": [
      "servicos-rede",
      "res-cnj-574-2024"
    ],
    "avisosOraculo": [
      "Definições conceituais clássicas; fonte específica a anexar."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Servidor web:** serve conteúdo HTTP (estático e encaminha dinâmico) — ex.: **Apache HTTP Server, IIS, NGINX**.\n- **Servidor de aplicação:** executa a **lógica de negócio** e fornece serviços corporativos (transações, segurança, pool de conexões) — ex.: **JBoss EAP/WildFly** (Jakarta EE).\n- **Internet** (rede pública) · **Intranet** (rede **interna** da organização com tecnologias web) · **Extranet** (parte da intranet aberta a **parceiros externos autorizados**) · **Portal** (ponto único de acesso a vários serviços/informações, ex.: portal unificado da Res. CNJ 574/2024).\n- **Conexões:** [[servicos-rede]] · [[servicos-rede]] · [[res-cnj-574-2024]]\n- ⚠️ Definições conceituais clássicas; fonte específica a anexar."
  },
  {
    "id": "arquiteturas",
    "aliasIds": [],
    "titulo": "Arquiteturas: cliente-servidor, multicamadas, objetos distribuídos ( + SOA)",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "ambos",
    "npcName": "Guardiã Liskov IV",
    "npcRole": "engenheiro",
    "npcSeed": 655808021,
    "oQueE": "Cliente-servidor: o cliente pede, o servidor atende (ex.: navegador ↔ servidor web).",
    "exemploPratico": "",
    "fatosChave": [
      "Cliente-servidor: o cliente pede, o servidor atende (ex.: navegador ↔ servidor web).",
      "Multicamadas (n-tier): separa apresentação, negócio e dados (3 camadas) — cada uma pode escalar/trocar sem afetar a outra.",
      "Objetos distribuídos: objetos em máquinas diferentes se comunicam como se fossem locais (ex.: CORBA, Java RMI, DCOM).",
      "🟣 SOA: sistema organizado em serviços reutilizáveis com contratos bem definidos (historicamente SOAP/WSDL + ESB). Microsserviços são uma evolução com serviços menores e independentes.",
      "🔵 Serverless: você publica funções/código e o provedor de nuvem gerencia servidores e escala (cobra por execução)."
    ],
    "conexoes": [
      "microsservicos",
      "nuvem",
      "api-rest"
    ],
    "avisosOraculo": [
      "Conceitos clássicos de engenharia de software; anexar fonte de referência na revisão."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Cliente-servidor:** o cliente pede, o servidor atende (ex.: navegador ↔ servidor web).\n- **Multicamadas (n-tier):** separa **apresentação**, **negócio** e **dados** (3 camadas) — cada uma pode escalar/trocar sem afetar a outra.\n- **Objetos distribuídos:** objetos em máquinas diferentes se comunicam como se fossem locais (ex.: **CORBA**, **Java RMI**, DCOM).\n- 🟣 **SOA:** sistema organizado em **serviços** reutilizáveis com contratos bem definidos (historicamente SOAP/WSDL + ESB). **Microsserviços** são uma evolução com serviços menores e independentes.\n- 🔵 **Serverless:** você publica **funções/código** e o provedor de nuvem gerencia servidores e escala (cobra por execução).\n- **Conexões:** [[microsservicos]] · [[nuvem]] · [[api-rest]]\n- ⚠️ Conceitos clássicos de engenharia de software; anexar fonte de referência na revisão."
  },
  {
    "id": "manutencao-sistemas",
    "aliasIds": [],
    "titulo": "Manutenção de sistemas",
    "zonaId": "08-programacao-e-desenvolvimento-web",
    "regiaoId": "floresta-do-codigo",
    "materia": "Programação e Web",
    "cargo": "tecnico",
    "npcName": "Alquimista Linus IV",
    "npcRole": "ferreiro",
    "npcSeed": 719175364,
    "oQueE": "O que cai: questões práticas — ler um trecho de código e dizer o resultado, achar o bug, escolher a correção, depurar (breakpoints, inspeção de variáveis, logs/stack trace), gerar relatórios.",
    "exemploPratico": "",
    "fatosChave": [
      "O que cai: questões práticas — ler um trecho de código e dizer o resultado, achar o bug, escolher a correção, depurar (breakpoints, inspeção de variáveis, logs/stack trace), gerar relatórios."
    ],
    "conexoes": [
      "excecoes",
      "testes-software",
      "git"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que cai:** questões **práticas** — ler um trecho de código e dizer o resultado, achar o bug, escolher a correção, depurar (breakpoints, inspeção de variáveis, logs/stack trace), gerar relatórios.\n- **Conexões:** [[excecoes]] (ler stack trace) · [[testes-software]] · [[git]] (histórico/blame)\n\n---"
  },
  {
    "id": "modelagem-er",
    "aliasIds": [],
    "titulo": "Modelo Entidade-Relacionamento (ER)",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Engenheira Margaret IV",
    "npcRole": "mago",
    "npcSeed": 1787959212,
    "oQueE": "O que é: modelo conceitual (Peter Chen, 1976) para desenhar os dados antes de criar tabelas.",
    "exemploPratico": "Exemplo prático: Processo N:N Parte → tabela processo_parte(id_processo, id_parte, polo).",
    "fatosChave": [
      "O que é: modelo conceitual (Peter Chen, 1976) para desenhar os dados antes de criar tabelas.",
      "Entidade (coisa do mundo real: Processo, Parte, Advogado) — fraca quando depende de outra para existir (ex.: Movimentação de um Processo).",
      "Atributo (simples, composto, multivalorado, derivado, chave).",
      "Relacionamento com cardinalidade: 1:1, 1:N, N:N.",
      "Do ER para o relacional: entidade → tabela; 1:N → chave estrangeira no lado N; N:N → tabela associativa com as duas FKs."
    ],
    "conexoes": [
      "normalizacao",
      "uml",
      "jpa-hibernate"
    ],
    "avisosOraculo": [
      "Conteúdo clássico de livro-texto (Chen; Elmasri & Navathe); sem fonte online oficial nesta rodada."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** modelo **conceitual** (Peter Chen, 1976) para desenhar os dados antes de criar tabelas.\n- **Elementos:**\n  - **Entidade** (coisa do mundo real: *Processo*, *Parte*, *Advogado*) — **fraca** quando depende de outra para existir (ex.: *Movimentação* de um *Processo*).\n  - **Atributo** (simples, composto, multivalorado, derivado, **chave**).\n  - **Relacionamento** com **cardinalidade**: 1:1, **1:N**, **N:N**.\n- **Do ER para o relacional:** entidade → tabela; 1:N → **chave estrangeira** no lado N; **N:N → tabela associativa** com as duas FKs.\n- **Exemplo prático:** *Processo* N:N *Parte* → tabela `processo_parte(id_processo, id_parte, polo)`.\n- **Conexões:** [[normalizacao]] · [[uml]] (diagrama de classes é \"primo\" do ER) · [[jpa-hibernate]] (`@OneToMany`, `@ManyToMany`)\n- ⚠️ Conteúdo clássico de livro-texto (Chen; Elmasri & Navathe); sem fonte online oficial nesta rodada."
  },
  {
    "id": "normalizacao",
    "aliasIds": [],
    "titulo": "Normalização",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Runista Fowler IV",
    "npcRole": "ferreiro",
    "npcSeed": 1701222373,
    "oQueE": "O que é: organizar tabelas para eliminar redundância e anomalias (de inserção, atualização, exclusão), usando dependências funcionais.",
    "exemploPratico": "Exemplo: tabela processo(numero, cpf_parte, nome_parte) → nome_parte depende de cpf_parte (não-chave) → viola 3FN → separar parte(cpf, nome).",
    "fatosChave": [
      "O que é: organizar tabelas para eliminar redundância e anomalias (de inserção, atualização, exclusão), usando dependências funcionais.",
      "Formas normais (resumo de prova):",
      "1FN: só valores atômicos (sem atributos multivalorados/grupos repetidos).",
      "2FN: 1FN + nenhum atributo não-chave depende de só parte de uma chave composta (sem dependência parcial).",
      "3FN: 2FN + nenhum atributo não-chave depende de outro não-chave (sem dependência transitiva).",
      "BCNF: todo determinante é chave candidata (3FN \"mais forte\").",
      "4FN (dependências multivaloradas) e 5FN (de junção) aparecem menos."
    ],
    "conexoes": [
      "modelagem-er",
      "sql"
    ],
    "avisosOraculo": [
      "Definições clássicas (Codd); conferir redação em livro de referência se a banca pedir literalidade."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** organizar tabelas para **eliminar redundância e anomalias** (de inserção, atualização, exclusão), usando **dependências funcionais**.\n- **Formas normais (resumo de prova):**\n  - **1FN:** só valores **atômicos** (sem atributos multivalorados/grupos repetidos).\n  - **2FN:** 1FN + **nenhum atributo não-chave depende de só parte de uma chave composta** (sem dependência parcial).\n  - **3FN:** 2FN + **nenhum atributo não-chave depende de outro não-chave** (sem dependência transitiva).\n  - **BCNF:** todo determinante é **chave candidata** (3FN \"mais forte\").\n  - 4FN (dependências multivaloradas) e 5FN (de junção) aparecem menos.\n- **Exemplo:** tabela `processo(numero, cpf_parte, nome_parte)` → `nome_parte` depende de `cpf_parte` (não-chave) → viola 3FN → separar `parte(cpf, nome)`.\n- **Conexões:** [[modelagem-er]] · [[sql]]\n- ⚠️ Definições clássicas (Codd); conferir redação em livro de referência se a banca pedir literalidade."
  },
  {
    "id": "sql",
    "aliasIds": [],
    "titulo": "SQL: DDL, DML, DCL ( + TCL)",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Mestra Codd IV",
    "npcRole": "engenheiro",
    "npcSeed": 1102770305,
    "oQueE": "Pontos clássicos de prova: JOINs (INNER, LEFT, RIGHT, FULL), GROUP BY + HAVING (filtra grupos; WHERE filtra linhas), subconsultas, DISTINCT, UNION × UNION ALL, constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL), views, índices.",
    "exemploPratico": "",
    "fatosChave": [
      "Pontos clássicos de prova: JOINs (INNER, LEFT, RIGHT, FULL), GROUP BY + HAVING (filtra grupos; WHERE filtra linhas), subconsultas, DISTINCT, UNION × UNION ALL, constraints (PRIMARY KEY, FOREIGN KEY, UNIQUE, CHECK, NOT NULL), views, índices.",
      "MERGE: comando do padrão SQL que faz INSERT, UPDATE e DELETE condicionais em um só comando — chegou ao PostgreSQL na versão 15.",
      "Fonte (MERGE): PostgreSQL 15 – anúncio"
    ],
    "conexoes": [
      "acesso-banco",
      "owasp",
      "jpa-hibernate"
    ],
    "avisosOraculo": [
      "Classificação de SELECT: alguns autores o colocam em uma \"DQL\" separada; TRUNCATE é DDL na maioria das classificações. Atenção ao enunciado."
    ],
    "fontes": [
      {
        "label": "PostgreSQL 15 – anúncio",
        "url": "https://www.postgresql.org/about/news/postgresql-15-2526/"
      }
    ],
    "tablePairs": [
      {
        "term": "DDL – definição",
        "definition": "Para quê: estrutura · Comandos: CREATE, ALTER, DROP, TRUNCATE",
        "rawRow": "DDL – definição — estrutura — CREATE, ALTER, DROP, TRUNCATE"
      },
      {
        "term": "DML – manipulação",
        "definition": "Para quê: dados · Comandos: SELECT, INSERT, UPDATE, DELETE, MERGE",
        "rawRow": "DML – manipulação — dados — SELECT, INSERT, UPDATE, DELETE, MERGE"
      },
      {
        "term": "DCL – controle",
        "definition": "Para quê: permissões · Comandos: GRANT, REVOKE",
        "rawRow": "DCL – controle — permissões — GRANT, REVOKE"
      },
      {
        "term": "TCL – transação",
        "definition": "Para quê: controle de transação · Comandos: BEGIN/START TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT",
        "rawRow": "TCL – transação — controle de transação — BEGIN/START TRANSACTION, COMMIT, ROLLBACK, SAVEPOINT"
      }
    ],
    "textoCompleto": "| Sublinguagem | Para quê | Comandos |\n| --- | --- | --- |\n| **DDL** – definição | estrutura | `CREATE`, `ALTER`, `DROP`, `TRUNCATE` |\n| **DML** – manipulação | dados | `SELECT`, `INSERT`, `UPDATE`, `DELETE`, **`MERGE`** |\n| **DCL** – controle | permissões | `GRANT`, `REVOKE` |\n| **TCL** – transação | controle de transação | `BEGIN`/`START TRANSACTION`, `COMMIT`, `ROLLBACK`, `SAVEPOINT` |\n\n- ⚠️ Classificação de `SELECT`: alguns autores o colocam em uma \"DQL\" separada; `TRUNCATE` é DDL na maioria das classificações. Atenção ao enunciado.\n- **Pontos clássicos de prova:** `JOIN`s (INNER, LEFT, RIGHT, FULL), `GROUP BY` + `HAVING` (filtra **grupos**; `WHERE` filtra **linhas**), subconsultas, `DISTINCT`, `UNION` × `UNION ALL`, constraints (`PRIMARY KEY`, `FOREIGN KEY`, `UNIQUE`, `CHECK`, `NOT NULL`), views, índices.\n- **`MERGE`:** comando do padrão SQL que faz `INSERT`, `UPDATE` e `DELETE` condicionais em **um só comando** — chegou ao PostgreSQL na **versão 15**.\n- **Conexões:** [[acesso-banco]] · [[owasp]] (SQL injection) · [[jpa-hibernate]] (JPQL gera SQL)\n- **Fonte (MERGE):** [PostgreSQL 15 – anúncio](https://www.postgresql.org/about/news/postgresql-15-2526/)"
  },
  {
    "id": "plsql",
    "aliasIds": [],
    "titulo": "PL/SQL (Oracle) e PL/pgSQL (PostgreSQL)",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Artífice Gosling IV",
    "npcRole": "ferreiro",
    "npcSeed": 617541277,
    "oQueE": "PL/SQL: extensão procedural do SQL da Oracle — blocos DECLARE … BEGIN … EXCEPTION … END;, variáveis, IF, laços, cursores, procedures, functions, triggers, packages.",
    "exemploPratico": "Exemplo: trigger que grava auditoria quando alguém altera a situação de um processo.",
    "fatosChave": [
      "PL/SQL: extensão procedural do SQL da Oracle — blocos DECLARE … BEGIN … EXCEPTION … END;, variáveis, IF, laços, cursores, procedures, functions, triggers, packages.",
      "PL/pgSQL: equivalente no PostgreSQL (functions/procedures/triggers)."
    ],
    "conexoes": [
      "oracle-19c",
      "postgresql",
      "res-cnj-522-2023",
      "jpa-hibernate"
    ],
    "avisosOraculo": [
      "Visão geral; aprofundar na documentação Oracle PL/SQL Language Reference."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **PL/SQL:** extensão **procedural** do SQL da Oracle — blocos `DECLARE … BEGIN … EXCEPTION … END;`, variáveis, `IF`, laços, **cursores**, **procedures**, **functions**, **triggers**, **packages**.\n- **PL/pgSQL:** equivalente no PostgreSQL (functions/procedures/triggers).\n- **Exemplo:** trigger que grava auditoria quando alguém altera a situação de um processo.\n- **Conexões:** [[oracle-19c]] · [[postgresql]] · [[moreq-jus]] (trilha de auditoria) · [[jpa-hibernate]] (Envers faz auditoria na aplicação)\n- ⚠️ Visão geral; aprofundar na documentação Oracle PL/SQL Language Reference."
  },
  {
    "id": "transacoes",
    "aliasIds": [],
    "titulo": "Gerência de transações (ACID e isolamento)",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Oráculo Knuth IV",
    "npcRole": "engenheiro",
    "npcSeed": 190871726,
    "oQueE": "ACID: Atomicidade (tudo ou nada) · Consistência (de um estado válido a outro) · Isolamento (transações concorrentes não se atrapalham) · Durabilidade (após o COMMIT, sobrevive a falhas — log/WAL).",
    "exemploPratico": "",
    "fatosChave": [
      "ACID: Atomicidade (tudo ou nada) · Consistência (de um estado válido a outro) · Isolamento (transações concorrentes não se atrapalham) · Durabilidade (após o COMMIT, sobrevive a falhas — log/WAL).",
      "Fenômenos de concorrência (documentação PostgreSQL):",
      "Dirty read: ler dado gravado por transação ainda não confirmada.",
      "Nonrepeatable read: reler a mesma linha e ela mudou (outra transação confirmou).",
      "Phantom read: reexecutar a consulta e o conjunto de linhas mudou.",
      "Serialization anomaly: o resultado não bate com nenhuma ordem serial possível.",
      "4 níveis do padrão SQL:",
      "Particularidades do PostgreSQL (pegadinhas!):",
      "Read Committed é o padrão.",
      "Aceita pedir os 4 níveis, mas implementa só 3: Read Uncommitted se comporta como Read Committed.",
      "O Repeatable Read do PostgreSQL não permite phantom read (mais forte que o padrão exige).",
      "Usa MVCC (controle de concorrência multiversão); em Repeatable Read/Serializable a aplicação deve estar pronta para repetir a transação se der erro de serialização."
    ],
    "conexoes": [
      "spring-boot",
      "jpa-hibernate",
      "mensageria"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "PostgreSQL – Transaction Isolation",
        "url": "https://www.postgresql.org/docs/16/transaction-iso.html"
      },
      {
        "label": "PostgreSQL 15 – Transaction Isolation",
        "url": "https://www.postgresql.org/docs/15/transaction-iso.html"
      }
    ],
    "tablePairs": [
      {
        "term": "Read Uncommitted",
        "definition": "Dirty: possível · Nonrepeatable: possível · Phantom: possível",
        "rawRow": "Read Uncommitted — possível — possível — possível"
      },
      {
        "term": "Read Committed",
        "definition": "Dirty: não · Nonrepeatable: possível · Phantom: possível",
        "rawRow": "Read Committed — não — possível — possível"
      },
      {
        "term": "Repeatable Read",
        "definition": "Dirty: não · Nonrepeatable: não · Phantom: possível (no padrão)",
        "rawRow": "Repeatable Read — não — não — possível (no padrão)"
      },
      {
        "term": "Serializable",
        "definition": "Dirty: não · Nonrepeatable: não · Phantom: não",
        "rawRow": "Serializable — não — não — não"
      }
    ],
    "textoCompleto": "- **ACID:** **Atomicidade** (tudo ou nada) · **Consistência** (de um estado válido a outro) · **Isolamento** (transações concorrentes não se atrapalham) · **Durabilidade** (após o `COMMIT`, sobrevive a falhas — log/WAL).\n- **Fenômenos de concorrência (documentação PostgreSQL):**\n  - **Dirty read:** ler dado gravado por transação **ainda não confirmada**.\n  - **Nonrepeatable read:** reler a mesma linha e ela **mudou** (outra transação confirmou).\n  - **Phantom read:** reexecutar a consulta e o **conjunto de linhas** mudou.\n  - **Serialization anomaly:** o resultado não bate com nenhuma ordem serial possível.\n- **4 níveis do padrão SQL:**\n\n| Nível | Dirty | Nonrepeatable | Phantom |\n| --- | --- | --- | --- |\n| Read Uncommitted | possível | possível | possível |\n| **Read Committed** | não | possível | possível |\n| Repeatable Read | não | não | possível (no padrão) |\n| Serializable | não | não | não |\n\n- **Particularidades do PostgreSQL (pegadinhas!):**\n  - **Read Committed é o padrão.**\n  - Aceita pedir os 4 níveis, mas **implementa só 3**: Read Uncommitted **se comporta como Read Committed**.\n  - O **Repeatable Read do PostgreSQL não permite phantom read** (mais forte que o padrão exige).\n  - Usa **MVCC** (controle de concorrência multiversão); em Repeatable Read/Serializable a aplicação deve estar pronta para **repetir** a transação se der erro de serialização.\n- **Conexões:** [[spring-boot]] (`@Transactional`) · [[jpa-hibernate]] · [[mensageria]] (consistência eventual entre microsserviços)\n- **Fontes:** [PostgreSQL – Transaction Isolation](https://www.postgresql.org/docs/16/transaction-iso.html) · [PostgreSQL 15 – Transaction Isolation](https://www.postgresql.org/docs/15/transaction-iso.html)\n\n---"
  },
  {
    "id": "postgresql-versoes",
    "aliasIds": [],
    "titulo": "PostgreSQL 15, 16, 17, 18 e migração do 14",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Tecelã Hamilton IV",
    "npcRole": "mago",
    "npcSeed": 489381567,
    "oQueE": "Política de versões: cada major é suportada por 5 anos; versão menor (ex.: 17.12) nunca muda o formato de armazenamento → atualizar minor é simples.",
    "exemploPratico": "Exemplo prático: o banco de um sistema legado do tribunal em PG 14 saiu de suporte em nov/2026 → plano: testar a aplicação no 17/18, migrar com pg_upgrade (ou replicação lógica para reduzir a janela), rodar ANALYZE se a origem for < 18.",
    "fatosChave": [
      "Política de versões: cada major é suportada por 5 anos; versão menor (ex.: 17.12) nunca muda o formato de armazenamento → atualizar minor é simples.",
      "Como migrar de major (ex.: 14 → 17/18) — 3 caminhos oficiais:",
      "Dá para pular versões (14 → 18 direto), mas leia as release notes de todas as intermediárias (incompatibilidades)."
    ],
    "conexoes": [
      "entrada-saida"
    ],
    "avisosOraculo": [
      "| 14 | 30/09/2021 | 12/11/2026 (já encerrado na data deste levantamento) | — legado do edital |"
    ],
    "fontes": [
      {
        "label": "PostgreSQL – Versioning policy",
        "url": "https://www.postgresql.org/support/versioning"
      },
      {
        "label": "Release 15",
        "url": "https://www.postgresql.org/docs/18/release-15.html"
      },
      {
        "label": "Release 16",
        "url": "https://www.postgresql.org/docs/16/release-16.html"
      },
      {
        "label": "Release 17",
        "url": "https://www.postgresql.org/docs/17/release-17.html"
      },
      {
        "label": "Release 18",
        "url": "https://www.postgresql.org/docs/release/18/"
      },
      {
        "label": "Upgrading a cluster",
        "url": "https://www.postgresql.org/docs/16/upgrading.html"
      },
      {
        "label": "pg_upgrade",
        "url": "https://www.postgresql.org/docs/17/pgupgrade.html"
      },
      {
        "label": "Aviso EOL do 14",
        "url": "https://www.postgresql.org/message-id/attachment/196145/20260514updaterelease.md"
      }
    ],
    "tablePairs": [
      {
        "term": "15",
        "definition": "Lançamento: 13/10/2022 · Fim do suporte: 11/11/2027 · Destaques: MERGE; filtros de linha/coluna na replicação lógica; compressão zstd no pg_basebackup; log em JSON; tira o CREATE do schema public de todos (exceto dono)",
        "rawRow": "15 — 13/10/2022 — 11/11/2027 — MERGE; filtros de linha/coluna na replicação lógica; compressão zstd no pg_basebackup; log em JSON; tira o CREATE do schema public de todos (exceto dono)"
      },
      {
        "term": "16",
        "definition": "Lançamento: 14/09/2023 · Fim do suporte: 09/11/2028 · Destaques: replicação lógica a partir de standby; aplicação paralela de transações grandes; view pg_stat_io; construtores SQL/JSON",
        "rawRow": "16 — 14/09/2023 — 09/11/2028 — replicação lógica a partir de standby; aplicação paralela de transações grandes; view pg_stat_io; construtores SQL/JSON"
      },
      {
        "term": "17",
        "definition": "Lançamento: 26/09/2024 · Fim do suporte: 08/11/2029 · Destaques: backup incremental no pg_basebackup; JSON_TABLE; pg_createsubscriber; pg_upgrade preserva slots de replicação lógica; novo gerenciamento de memória do VACUUM",
        "rawRow": "17 — 26/09/2024 — 08/11/2029 — backup incremental no pg_basebackup; JSON_TABLE; pg_createsubscriber; pg_upgrade preserva slots de replicação lógica; novo gerenciamento de memória do VACUUM"
      },
      {
        "term": "18",
        "definition": "Lançamento: 25/09/2025 · Fim do suporte: 14/11/2030 · Destaques: I/O assíncrono (AIO); pg_upgrade mantém estatísticas do otimizador; uuidv7(); colunas geradas virtuais (padrão); autenticação OAuth; skip scan em B-tree; OLD/NEW no RETURNING",
        "rawRow": "18 — 25/09/2025 — 14/11/2030 — I/O assíncrono (AIO); pg_upgrade mantém estatísticas do otimizador; uuidv7(); colunas geradas virtuais (padrão); autenticação OAuth; skip scan em B-tree; OLD/NEW no RETURNING"
      }
    ],
    "textoCompleto": "- **Política de versões:** cada major é suportada por **5 anos**; versão menor (ex.: 17.12) **nunca muda o formato de armazenamento** → atualizar minor é simples.\n\n| Versão | Lançamento | Fim do suporte | Destaques |\n| --- | --- | --- | --- |\n| **14** | 30/09/2021 | **12/11/2026** (⚠️ **já encerrado** na data deste levantamento) | — legado do edital |\n| **15** | 13/10/2022 | 11/11/2027 | **`MERGE`**; filtros de linha/coluna na replicação lógica; compressão **zstd** no `pg_basebackup`; log em **JSON**; tira o `CREATE` do schema `public` de todos (exceto dono) |\n| **16** | 14/09/2023 | 09/11/2028 | **replicação lógica a partir de standby**; aplicação paralela de transações grandes; view **`pg_stat_io`**; construtores SQL/JSON |\n| **17** | 26/09/2024 | 08/11/2029 | **backup incremental no `pg_basebackup`**; `JSON_TABLE`; `pg_createsubscriber`; `pg_upgrade` preserva **slots de replicação lógica**; novo gerenciamento de memória do VACUUM |\n| **18** | 25/09/2025 | 14/11/2030 | **I/O assíncrono (AIO)**; `pg_upgrade` **mantém estatísticas do otimizador**; **`uuidv7()`**; colunas geradas **virtuais** (padrão); **autenticação OAuth**; *skip scan* em B-tree; `OLD`/`NEW` no `RETURNING` |\n\n- **Como migrar de major (ex.: 14 → 17/18) — 3 caminhos oficiais:**\n  1. **dump/restore** (`pg_dumpall`/`pg_dump` + restore) — tradicional, mais lento; usar o `pg_dump` **da versão nova**;\n  2. **`pg_upgrade`** — mais rápido: reaproveita os arquivos de dados e recria as tabelas de sistema (funciona a partir da 9.2);\n  3. **replicação lógica** — funciona **entre majors diferentes**, permite migração com pouca indisponibilidade.\n  - Dá para pular versões (14 → 18 direto), mas **leia as release notes de todas as intermediárias** (incompatibilidades).\n- **Exemplo prático:** o banco de um sistema legado do tribunal em PG 14 saiu de suporte em nov/2026 → plano: testar a aplicação no 17/18, migrar com `pg_upgrade` (ou replicação lógica para reduzir a janela), rodar ANALYZE se a origem for < 18.\n- **Fontes:** [PostgreSQL – Versioning policy](https://www.postgresql.org/support/versioning) · [Release 15](https://www.postgresql.org/docs/18/release-15.html) · [Release 16](https://www.postgresql.org/docs/16/release-16.html) · [Release 17](https://www.postgresql.org/docs/17/release-17.html) · [Release 18](https://www.postgresql.org/docs/release/18/) · [Upgrading a cluster](https://www.postgresql.org/docs/16/upgrading.html) · [pg_upgrade](https://www.postgresql.org/docs/17/pgupgrade.html) · [Aviso EOL do 14](https://www.postgresql.org/message-id/attachment/196145/20260514updaterelease.md)"
  },
  {
    "id": "oracle-19c",
    "aliasIds": [],
    "titulo": "Oracle Database 19c",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "analista",
    "npcName": "Sábio Gamma IV",
    "npcRole": "engenheiro",
    "npcSeed": 268395245,
    "oQueE": "O que é: a Long Term Release da família 12c/18c/19c (lançada no início de 2019).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: a Long Term Release da família 12c/18c/19c (lançada no início de 2019).",
      "Long Term × Innovation Release: Long Term = suporte mais longo, com Extended Support; Innovation (ex.: 21c) = pelo menos 2 anos de Premier, sem Extended.",
      "Suporte do 19c (após prorrogações): Premier até 31/12/2029 e Extended até 31/12/2032.",
      "Sucessora: 23ai (renomeada 26ai), também Long Term."
    ],
    "conexoes": [
      "plsql"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Oracle MOS 742060.1 – Release Schedule",
        "url": "https://support.oracle.com/knowledge/Oracle%20Database%20Products/742060_1.html"
      },
      {
        "label": "The Register – 19c até 2032",
        "url": "https://www.theregister.com/2025/02/18/oracle_extends_19c_support/"
      },
      {
        "label": "Oracle Blog – Long Term Release",
        "url": "https://blogs.oracle.com/database/?p=2903"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** a **Long Term Release** da família 12c/18c/19c (lançada no início de 2019).\n- **Long Term × Innovation Release:** Long Term = suporte mais longo, com **Extended Support**; Innovation (ex.: 21c) = pelo menos 2 anos de Premier, **sem** Extended.\n- **Suporte do 19c (após prorrogações):** **Premier até 31/12/2029** e **Extended até 31/12/2032**.\n- **Sucessora:** 23ai (renomeada **26ai**), também Long Term.\n- **Fontes:** [Oracle MOS 742060.1 – Release Schedule](https://support.oracle.com/knowledge/Oracle%20Database%20Products/742060_1.html) · [The Register – 19c até 2032](https://www.theregister.com/2025/02/18/oracle_extends_19c_support/) · [Oracle Blog – Long Term Release](https://blogs.oracle.com/database/?p=2903)"
  },
  {
    "id": "h2",
    "aliasIds": [],
    "titulo": "H2 Database (lembrete)",
    "zonaId": "09-banco-de-dados",
    "regiaoId": "floresta-do-codigo",
    "materia": "Banco de Dados",
    "cargo": "ambos",
    "npcName": "Maga Hopper IV",
    "npcRole": "mago",
    "npcSeed": 1891945473,
    "oQueE": "Banco Java, leve, embutível e em memória — usado em testes e desenvolvimento local na stack PDPJ. Detalhes no arquivo 05.",
    "exemploPratico": "",
    "fatosChave": [
      "Banco Java, leve, embutível e em memória — usado em testes e desenvolvimento local na stack PDPJ. Detalhes no arquivo 05."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- Banco **Java, leve, embutível e em memória** — usado em **testes** e desenvolvimento local na stack PDPJ. Detalhes no arquivo 05.\n\n---"
  },
  {
    "id": "cid",
    "aliasIds": [],
    "titulo": "Princípios: Confidencialidade, Integridade, Disponibilidade ( + autenticidade e não repúdio)",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Sentinela Alice",
    "npcRole": "guarda",
    "npcSeed": 427314849,
    "oQueE": "Confidencialidade: só quem pode, vê. Integridade: não foi alterado indevidamente. Disponibilidade: está acessível quando precisa.",
    "exemploPratico": "",
    "fatosChave": [
      "Confidencialidade: só quem pode, vê. Integridade: não foi alterado indevidamente. Disponibilidade: está acessível quando precisa.",
      "Extras que aparecem nos normativos: autenticidade (é quem diz ser) e não repúdio (o autor não pode negar a autoria) — ambos exigidos pelo moreq-jus e providos pela assinatura digital (ver criptografia)."
    ],
    "conexoes": [
      "res-cnj-522-2023",
      "criptografia",
      "res-cnj-396-2021",
      "pdtic-trt4"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NIST – confidentiality",
        "url": "https://csrc.nist.gov/glossary/term/confidentiality"
      },
      {
        "label": "NIST – integrity",
        "url": "https://csrc.nist.gov/glossary/term/integrity"
      },
      {
        "label": "NIST – availability",
        "url": "https://csrc.nist.gov/glossary/term/availability"
      },
      {
        "label": "NIST – authenticity",
        "url": "https://csrc.nist.gov/glossary/term/authenticity"
      },
      {
        "label": "NIST – non-repudiation",
        "url": "https://csrc.nist.gov/glossary/term/non_repudiation"
      },
      {
        "label": "NIST – digital signature",
        "url": "https://csrc.nist.gov/glossary/term/digital_signature"
      },
      {
        "label": "Resolução CNJ 522/2023",
        "url": "https://atos.cnj.jus.br/atos/detalhar/5266"
      },
      {
        "label": "Resolução CNJ 396/2021",
        "url": "https://atos.cnj.jus.br/atos/detalhar/3975"
      },
      {
        "label": "PDTIC 2024-2026, revisão 2025 – TRT4",
        "url": "https://www.trt4.jus.br/portais/media/503364045/008%20-%20DOCUMENTO%20-%20Plano%20Diretor%20de%20TIC%202024-2026%20-%20Revis%C3%A3o%202025.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Confidencialidade:** só quem pode, vê. **Integridade:** não foi alterado indevidamente. **Disponibilidade:** está acessível quando precisa.\n- **Extras que aparecem nos normativos:** **autenticidade** (é quem diz ser) e **não repúdio** (o autor não pode negar a autoria) — ambos exigidos pelo [[moreq-jus]] e providos pela assinatura digital (ver [[criptografia]]).\n- **Conexões:** [[res-cnj-396-2021]] (ENSEC-PJ cita CID + autenticidade) · [[pdtic-trt4]] (objetivo de mitigar riscos de CID)\n- **Fontes:** [NIST – confidentiality](https://csrc.nist.gov/glossary/term/confidentiality) · [NIST – integrity](https://csrc.nist.gov/glossary/term/integrity) · [NIST – availability](https://csrc.nist.gov/glossary/term/availability) · [NIST – authenticity](https://csrc.nist.gov/glossary/term/authenticity) · [NIST – non-repudiation](https://csrc.nist.gov/glossary/term/non_repudiation) · [NIST – digital signature](https://csrc.nist.gov/glossary/term/digital_signature) · [Resolução CNJ 522/2023](https://atos.cnj.jus.br/atos/detalhar/5266) · [Resolução CNJ 396/2021](https://atos.cnj.jus.br/atos/detalhar/3975) · [PDTIC 2024-2026, revisão 2025 – TRT4](https://www.trt4.jus.br/portais/media/503364045/008%20-%20DOCUMENTO%20-%20Plano%20Diretor%20de%20TIC%202024-2026%20-%20Revis%C3%A3o%202025.pdf)\n\n---"
  },
  {
    "id": "iso-27001",
    "aliasIds": [],
    "titulo": "ABNT NBR ISO/IEC 27001 e 27002",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Guarda Bob",
    "npcRole": "ferreiro",
    "npcSeed": 1769927593,
    "oQueE": "27001 — o que é: norma de requisitos para um SGSI (Sistema de Gestão da Segurança da Informação). É a que se certifica. Título atual: \"Segurança da informação, segurança cibernética e proteção à privacidade\".",
    "exemploPratico": "Exemplo prático: a ENSEC-PJ manda cada tribunal ter um SGSI baseado em riscos — é exatamente a 27001.",
    "fatosChave": [
      "27001 — o que é: norma de requisitos para um SGSI (Sistema de Gestão da Segurança da Informação). É a que se certifica. Título atual: \"Segurança da informação, segurança cibernética e proteção à privacidade\".",
      "27002 — o que é: guia de boas práticas que detalha os controles (definição, propósito, como implementar).",
      "Anexo A (2022): de 114 controles em 14 seções → 93 controles em 4 temas:",
      "Dos 93: 11 novos (ex.: inteligência de ameaças), 24 resultam de fusões, 58 atualizados. Os controles ganharam atributos."
    ],
    "conexoes": [
      "iso-27005",
      "iso-27701",
      "res-cnj-396-2021",
      "cis-controls"
    ],
    "avisosOraculo": [
      "Versão: a edição internacional é de 2022; o edital chama de \"ABNT NBR ISO/IEC 27001:2024\" (há publicação ABNT com esse ano). O conteúdo é o mesmo da 2022."
    ],
    "fontes": [
      {
        "label": "Gran – ISO 27001:2022",
        "url": "https://blog.grancursosonline.com.br/entendendo-a-norma-iso-iec-270012022/amp/"
      },
      {
        "label": "GlobalSuite – mudanças",
        "url": "https://www.globalsuitesolutions.com/pt/?p=117756"
      },
      {
        "label": "WeLiveSecurity – Anexo A",
        "url": "https://www.welivesecurity.com/br/2023/02/09/iso-270012022-quais-foram-as-principais-mudancas-na-nova-norma-de-seguranca/"
      }
    ],
    "tablePairs": [
      {
        "term": "Organizacionais (5)",
        "definition": "Nº de controles: 37",
        "rawRow": "Organizacionais (5) — 37"
      },
      {
        "term": "Pessoas (6)",
        "definition": "Nº de controles: 8",
        "rawRow": "Pessoas (6) — 8"
      },
      {
        "term": "Físicos (7)",
        "definition": "Nº de controles: 14",
        "rawRow": "Físicos (7) — 14"
      },
      {
        "term": "Tecnológicos (8)",
        "definition": "Nº de controles: 34",
        "rawRow": "Tecnológicos (8) — 34"
      }
    ],
    "textoCompleto": "- **27001 — o que é:** norma de **requisitos** para um **SGSI (Sistema de Gestão da Segurança da Informação)**. É a que se **certifica**. Título atual: \"Segurança da informação, segurança cibernética e proteção à privacidade\".\n- **27002 — o que é:** **guia de boas práticas** que detalha os controles (definição, propósito, como implementar).\n- **Anexo A (2022):** de 114 controles em 14 seções → **93 controles em 4 temas**:\n\n| Tema (cláusula da 27002) | Nº de controles |\n| --- | --- |\n| Organizacionais (5) | 37 |\n| Pessoas (6) | 8 |\n| Físicos (7) | 14 |\n| Tecnológicos (8) | 34 |\n\n  - Dos 93: **11 novos** (ex.: **inteligência de ameaças**), 24 resultam de fusões, 58 atualizados. Os controles ganharam **atributos**.\n- ⚠️ **Versão:** a edição internacional é de 2022; o edital chama de \"ABNT NBR ISO/IEC 27001:2024\" (há publicação ABNT com esse ano). O conteúdo é o mesmo da 2022.\n- **Exemplo prático:** a ENSEC-PJ manda cada tribunal ter um **SGSI baseado em riscos** — é exatamente a 27001.\n- **Conexões:** [[iso-27005]] (riscos) · [[iso-27701]] (privacidade) · [[res-cnj-396-2021]] · [[cis-controls]]\n- **Fontes:** [Gran – ISO 27001:2022](https://blog.grancursosonline.com.br/entendendo-a-norma-iso-iec-270012022/amp/) · [GlobalSuite – mudanças](https://www.globalsuitesolutions.com/pt/?p=117756) · [WeLiveSecurity – Anexo A](https://www.welivesecurity.com/br/2023/02/09/iso-270012022-quais-foram-as-principais-mudancas-na-nova-norma-de-seguranca/)"
  },
  {
    "id": "iso-27701",
    "aliasIds": [],
    "titulo": "ABNT NBR ISO/IEC 27701 — privacidade (PIMS)",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Criptógrafa Diffie",
    "npcRole": "ferreiro",
    "npcSeed": 998103772,
    "oQueE": "O que é: sistema de gestão da informação de privacidade (PIMS) — trata dados pessoais (PII), com controles para controladores e operadores.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: sistema de gestão da informação de privacidade (PIMS) — trata dados pessoais (PII), com controles para controladores e operadores.",
      "Versões (atenção!):",
      "2019: era uma extensão da 27001/27002 (precisava de SGSI). → o edital do Técnico cita 27701:2019.",
      "2025 (14/10/2025): virou norma independente (stand-alone), certificável sem a 27001. → o edital do Analista cita \"27701:2026\" (provável adoção ABNT da versão 2025)."
    ],
    "conexoes": [
      "lgpd",
      "iso-27001"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "DNV – nova 27701",
        "url": "https://www.dnv.com/news/2025/iso-iec-27701-standard-update-release/"
      },
      {
        "label": "BSI – key changes",
        "url": "https://www.bsigroup.com/en-GB/products-and-services/standards-services/iso-iec-27701-key-changes-and-guidance/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** sistema de gestão da **informação de privacidade (PIMS)** — trata dados pessoais (PII), com controles para **controladores** e **operadores**.\n- **Versões (atenção!):**\n  - **2019:** era uma **extensão** da 27001/27002 (precisava de SGSI). → o edital do **Técnico** cita **27701:2019**.\n  - **2025 (14/10/2025):** virou **norma independente (stand-alone)**, certificável sem a 27001. → o edital do **Analista** cita \"27701:2026\" (provável adoção ABNT da versão 2025).\n- **Conexões:** [[lgpd]] (controlador/operador = mesmos papéis) · [[iso-27001]]\n- **Fontes:** [DNV – nova 27701](https://www.dnv.com/news/2025/iso-iec-27701-standard-update-release/) · [BSI – key changes](https://www.bsigroup.com/en-GB/products-and-services/standards-services/iso-iec-27701-key-changes-and-guidance/)"
  },
  {
    "id": "iso-27005",
    "aliasIds": [],
    "titulo": "ABNT NBR ISO/IEC 27005:2023 — gestão de riscos de segurança da informação",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "tecnico",
    "npcName": "Vigia Rivest",
    "npcRole": "guarda",
    "npcSeed": 1837038069,
    "oQueE": "O que é: orientações para gerir riscos de SI, apoiando a 27001 (identificar, analisar, avaliar, tratar, comunicar e monitorar riscos).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: orientações para gerir riscos de SI, apoiando a 27001 (identificar, analisar, avaliar, tratar, comunicar e monitorar riscos).",
      "Tratamento do risco (opções clássicas): modificar/mitigar, reter/aceitar, evitar, compartilhar/transferir."
    ],
    "conexoes": [
      "res-cnj-396-2021",
      "iso-12207"
    ],
    "avisosOraculo": [
      "A redação dessas opções no texto da própria NBR (norma paga) não foi conferida."
    ],
    "fontes": [
      {
        "label": "ISO – ISO/IEC 27005:2022",
        "url": "https://committee.iso.org/standard/80585.html"
      },
      {
        "label": "Target Normas – NBR ISO/IEC 27005 de 05/2023",
        "url": "https://www.target.com.br/produtos/normas-tecnicas/40712/nbriso-iec27005-seguranca-da-informacao-seguranca-cibernetica-e-protecao-a-privacidade-orientacoes-para-gestao-de-riscos-de-seguranca-da-informacao"
      },
      {
        "label": "DPO na Prática – nova 27005:2023",
        "url": "https://dponapratica.com.br/2023/05/a-nova-abnt-nbr-iso-iec-27005-2023/"
      },
      {
        "label": "SBC – processo da ISO 27005 em organizações públicas",
        "url": "https://sol.sbc.org.br/index.php/wcge/article/download/36330/36117"
      },
      {
        "label": "NIST – risk response",
        "url": "https://csrc.nist.gov/glossary/term/risk_response"
      },
      {
        "label": "Estratégia – NBR ISO/IEC 27005:2023",
        "url": "https://concursos.estrategia.com/portal/seguranca-informacao-iso-27005-2023/"
      },
      {
        "label": "Resolução CNJ 396/2021",
        "url": "https://atos.cnj.jus.br/atos/detalhar/3975"
      },
      {
        "label": "Edital nº 1/2026 (DOU 22/10/2026, cópia)",
        "url": "https://dhg1h5j42swfq.cloudfront.net/2026/10/22060540/diariooficial-126-152.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** orientações para **gerir riscos** de SI, apoiando a 27001 (identificar, analisar, avaliar, tratar, comunicar e monitorar riscos).\n- **Tratamento do risco (opções clássicas):** modificar/mitigar, reter/aceitar, evitar, compartilhar/transferir.\n  - ⚠️ A redação dessas opções no texto da própria NBR (norma paga) não foi conferida.\n- **Conexões:** [[res-cnj-396-2021]] (gestão baseada em riscos) · [[iso-27005]] · [[iso-12207]] (gestão de riscos é processo técnico de gestão)\n- **Fontes:** [ISO – ISO/IEC 27005:2022](https://committee.iso.org/standard/80585.html) · [Target Normas – NBR ISO/IEC 27005 de 05/2023](https://www.target.com.br/produtos/normas-tecnicas/40712/nbriso-iec27005-seguranca-da-informacao-seguranca-cibernetica-e-protecao-a-privacidade-orientacoes-para-gestao-de-riscos-de-seguranca-da-informacao) · [DPO na Prática – nova 27005:2023](https://dponapratica.com.br/2023/05/a-nova-abnt-nbr-iso-iec-27005-2023/) · [SBC – processo da ISO 27005 em organizações públicas](https://sol.sbc.org.br/index.php/wcge/article/download/36330/36117) · [NIST – risk response](https://csrc.nist.gov/glossary/term/risk_response) · [Estratégia – NBR ISO/IEC 27005:2023](https://concursos.estrategia.com/portal/seguranca-informacao-iso-27005-2023/) · [Resolução CNJ 396/2021](https://atos.cnj.jus.br/atos/detalhar/3975) · [Edital nº 1/2026 (DOU 22/10/2026, cópia)](https://dhg1h5j42swfq.cloudfront.net/2026/10/22060540/diariooficial-126-152.pdf)"
  },
  {
    "id": "cis-controls",
    "aliasIds": [],
    "titulo": "CIS Controls v8",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "tecnico",
    "npcName": "Capitã Shamir",
    "npcRole": "mago",
    "npcSeed": 1278468347,
    "oQueE": "O que é: 18 controles prioritizados do Center for Internet Security (eram 20 na v7) com 153 salvaguardas.",
    "exemploPratico": "Exemplos de controles: 1 Inventário de ativos corporativos · 5 Gestão de contas · 18 Teste de intrusão.",
    "fatosChave": [
      "O que é: 18 controles prioritizados do Center for Internet Security (eram 20 na v7) com 153 salvaguardas.",
      "Implementation Groups (IGs):",
      "IG1 = higiene cibernética essencial: 56 salvaguardas — o mínimo para toda organização.",
      "IG2: +74 salvaguardas (inclui IG1).",
      "IG3: +23 → todas as 153.",
      "v8.1: lançada em junho/2024 (refinamentos)."
    ],
    "conexoes": [
      "iso-27001",
      "wsus"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CIS – 18 is the new 20",
        "url": "https://www.cisecurity.org/insights/blog/18-is-the-new-20-cis-controls-v8-is-here"
      },
      {
        "label": "CIS – IG3",
        "url": "https://cisecurity.org/controls/implementation-groups/ig3"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** **18 controles** prioritizados do Center for Internet Security (eram 20 na v7) com **153 salvaguardas**.\n- **Implementation Groups (IGs):**\n  - **IG1 = higiene cibernética essencial:** **56** salvaguardas — o mínimo para toda organização.\n  - **IG2:** +74 salvaguardas (inclui IG1).\n  - **IG3:** +23 → todas as 153.\n- **Exemplos de controles:** 1 Inventário de ativos corporativos · 5 Gestão de contas · 18 Teste de intrusão.\n- **v8.1:** lançada em junho/2024 (refinamentos).\n- **Fontes:** [CIS – 18 is the new 20](https://www.cisecurity.org/insights/blog/18-is-the-new-20-cis-controls-v8-is-here) · [CIS – IG3](https://cisecurity.org/controls/implementation-groups/ig3)\n\n---"
  },
  {
    "id": "lgpd",
    "aliasIds": [],
    "titulo": "LGPD — Lei nº 13.709/2018",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Protetor Merkle",
    "npcRole": "guarda",
    "npcSeed": 1497308520,
    "oQueE": "Definições (art. 5º):",
    "exemploPratico": "Exemplo prático: um log de acesso do PJe com CPF de partes é dado pessoal; tratar isso tem base em obrigação legal/exercício regular de direitos, não em consentimento.",
    "fatosChave": [
      "Definições (art. 5º):",
      "Dado pessoal: informação relacionada a pessoa natural identificada ou identificável.",
      "Dado pessoal sensível: origem racial ou étnica, convicção religiosa, opinião política, filiação sindical ou a organização religiosa/filosófica/política, saúde, vida sexual, dado genético ou biométrico.",
      "Agentes de tratamento: controlador (decide) e operador (executa em nome do controlador).",
      "Encarregado (DPO): canal de comunicação entre controlador, titulares e a ANPD.",
      "10 princípios (art. 6º, além da boa-fé): finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.",
      "10 bases legais (art. 7º): consentimento; obrigação legal/regulatória; políticas públicas; estudos por órgão de pesquisa; execução de contrato; exercício regular de direitos em processo; proteção da vida; tutela da saúde; legítimo interesse; proteção do crédito.",
      "Dados sensíveis (art. 11): consentimento específico e destacado, ou sem consentimento nas hipóteses indispensáveis (incluindo prevenção à fraude e segurança em autenticação). Não há \"legítimo interesse\" nem \"proteção do crédito\" aqui.",
      "Direitos do titular (art. 18): confirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento etc.",
      "Poder público (art. 23): trata dados para cumprir finalidade pública e competências legais; deve informar as hipóteses e indicar encarregado.",
      "Segurança (art. 46): medidas técnicas e administrativas desde a concepção (privacy by design).",
      "Incidentes (art. 48): comunicar à ANPD e ao titular \"em prazo razoável, conforme definido pela autoridade\" (a lei não fixa dias).",
      "Sanções (art. 52): advertência; multa simples de até 2% do faturamento, limitada a R$ 50 milhões por infração; multa diária; publicização; bloqueio; eliminação; suspensões e proibição (essas últimas só após alguma das anteriores)."
    ],
    "conexoes": [
      "iso-27701",
      "res-cnj-335-2020",
      "res-cnj-574-2024",
      "jwt",
      "codigo-conduta-trt4"
    ],
    "avisosOraculo": [
      "Atualização: a ANPD passou a se chamar Agência Nacional de Proteção de Dados (MP 1.317/2025, convertida na Lei 15.352/2026). A sigla continua ANPD."
    ],
    "fontes": [
      {
        "label": "LGPD compilada – Planalto",
        "url": "https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm"
      },
      {
        "label": "Câmara – norma atualizada",
        "url": "https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Definições (art. 5º):**\n  - **Dado pessoal:** informação relacionada a pessoa natural identificada ou identificável.\n  - **Dado pessoal sensível:** origem racial ou étnica, convicção religiosa, opinião política, filiação sindical ou a organização religiosa/filosófica/política, saúde, vida sexual, dado genético ou biométrico.\n  - **Agentes de tratamento:** **controlador** (decide) e **operador** (executa em nome do controlador).\n  - **Encarregado (DPO):** canal de comunicação entre controlador, titulares e a ANPD.\n- ⚠️ **Atualização:** a **ANPD** passou a se chamar **Agência Nacional de Proteção de Dados** (MP 1.317/2025, convertida na **Lei 15.352/2026**). A sigla continua ANPD.\n- **10 princípios (art. 6º, além da boa-fé):** finalidade, adequação, necessidade, livre acesso, qualidade dos dados, transparência, segurança, prevenção, não discriminação, responsabilização e prestação de contas.\n- **10 bases legais (art. 7º):** consentimento; obrigação legal/regulatória; políticas públicas; estudos por órgão de pesquisa; execução de contrato; exercício regular de direitos em processo; proteção da vida; tutela da saúde; legítimo interesse; proteção do crédito.\n- **Dados sensíveis (art. 11):** consentimento específico e destacado, ou sem consentimento nas hipóteses indispensáveis (incluindo **prevenção à fraude e segurança em autenticação**). Não há \"legítimo interesse\" nem \"proteção do crédito\" aqui.\n- **Direitos do titular (art. 18):** confirmação, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, informação sobre compartilhamento, revogação do consentimento etc.\n- **Poder público (art. 23):** trata dados para cumprir **finalidade pública** e competências legais; deve informar as hipóteses e indicar encarregado.\n- **Segurança (art. 46):** medidas técnicas e administrativas **desde a concepção** (*privacy by design*).\n- **Incidentes (art. 48):** comunicar à ANPD e ao titular \"em **prazo razoável**, conforme definido pela autoridade\" (a lei não fixa dias).\n- **Sanções (art. 52):** advertência; multa simples de até **2% do faturamento**, limitada a **R$ 50 milhões por infração**; multa diária; publicização; bloqueio; eliminação; suspensões e proibição (essas últimas só após alguma das anteriores).\n- **Exemplo prático:** um log de acesso do PJe com CPF de partes é dado pessoal; tratar isso tem base em **obrigação legal/exercício regular de direitos**, não em consentimento.\n- **Conexões:** [[iso-27701]] · [[res-cnj-335-2020]] (PDPJ deve se adequar à LGPD) · [[res-cnj-574-2024]] · [[jwt]] (não pôr dado pessoal no payload) · [[codigo-conduta-trt4]] (privacidade)\n- **Fontes:** [LGPD compilada – Planalto](https://planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709compilado.htm) · [Câmara – norma atualizada](https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html)\n\n---"
  },
  {
    "id": "owasp",
    "aliasIds": [],
    "titulo": "OWASP Top 10:2025 + desenvolvimento seguro",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Muralhista Kerckhoffs",
    "npcRole": "ferreiro",
    "npcSeed": 174710821,
    "oQueE": "Desenvolvimento seguro / programação defensiva: validar toda entrada, usar consultas parametrizadas (contra injeção), tratar exceções sem vazar detalhes (liga com A10), menor privilégio.",
    "exemploPratico": "",
    "fatosChave": [
      "Desenvolvimento seguro / programação defensiva: validar toda entrada, usar consultas parametrizadas (contra injeção), tratar exceções sem vazar detalhes (liga com A10), menor privilégio.",
      "🔵 SDL (Security Development Lifecycle, da Microsoft) e CLASP (OWASP): metodologias que embutem segurança em todo o ciclo de vida."
    ],
    "conexoes": [
      "excecoes",
      "keycloak-sso",
      "sql",
      "ci-cd",
      "protecao-perimetro"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "OWASP Top 10:2025 – introdução",
        "url": "https://owasp.org/Top10/2025/0x00_2025-Introduction/"
      },
      {
        "label": "SecurityWeek",
        "url": "https://www.securityweek.com/two-new-web-application-risk-categories-added-to-owasp-top-10/amp/"
      },
      {
        "label": "GitLab – mudanças",
        "url": "https://about.gitlab.com/blog/2025-owasp-top-10-whats-changed-and-why-it-matters/"
      }
    ],
    "tablePairs": [
      {
        "term": "A01",
        "definition": "Categoria 2025: Broken Access Control (controle de acesso quebrado) · O que mudou: Continua 1º; absorveu SSRF; inclui BOLA/BFLA de APIs",
        "rawRow": "A01 — Broken Access Control (controle de acesso quebrado) — Continua 1º; absorveu SSRF; inclui BOLA/BFLA de APIs"
      },
      {
        "term": "A02",
        "definition": "Categoria 2025: Security Misconfiguration · O que mudou: Subiu do 5º para o 2º",
        "rawRow": "A02 — Security Misconfiguration — Subiu do 5º para o 2º"
      },
      {
        "term": "A03",
        "definition": "Categoria 2025: Software Supply Chain Failures · O que mudou: Nova (amplia \"componentes vulneráveis e desatualizados\")",
        "rawRow": "A03 — Software Supply Chain Failures — Nova (amplia \"componentes vulneráveis e desatualizados\")"
      },
      {
        "term": "A04",
        "definition": "Categoria 2025: Cryptographic Failures · O que mudou: Caiu do 2º",
        "rawRow": "A04 — Cryptographic Failures — Caiu do 2º"
      },
      {
        "term": "A05",
        "definition": "Categoria 2025: Injection · O que mudou: Caiu do 3º",
        "rawRow": "A05 — Injection — Caiu do 3º"
      },
      {
        "term": "A06",
        "definition": "Categoria 2025: Insecure Design · O que mudou: Caiu do 4º",
        "rawRow": "A06 — Insecure Design — Caiu do 4º"
      },
      {
        "term": "A07",
        "definition": "Categoria 2025: Authentication Failures",
        "rawRow": "A07 — Authentication Failures"
      },
      {
        "term": "A08",
        "definition": "Categoria 2025: Software or Data Integrity Failures",
        "rawRow": "A08 — Software or Data Integrity Failures"
      },
      {
        "term": "A09",
        "definition": "Categoria 2025: Security Logging & Alerting Failures · O que mudou: \"Monitoring\" virou \"Alerting\"",
        "rawRow": "A09 — Security Logging & Alerting Failures — \"Monitoring\" virou \"Alerting\""
      },
      {
        "term": "A10",
        "definition": "Categoria 2025: Mishandling of Exceptional Conditions · O que mudou: Nova (falhar aberto, erro mal tratado)",
        "rawRow": "A10 — Mishandling of Exceptional Conditions — Nova (falhar aberto, erro mal tratado)"
      }
    ],
    "textoCompleto": "| # | Categoria 2025 | O que mudou |\n| --- | --- | --- |\n| A01 | **Broken Access Control** (controle de acesso quebrado) | Continua 1º; **absorveu SSRF**; inclui BOLA/BFLA de APIs |\n| A02 | **Security Misconfiguration** | Subiu do 5º para o 2º |\n| A03 | **Software Supply Chain Failures** | **Nova** (amplia \"componentes vulneráveis e desatualizados\") |\n| A04 | Cryptographic Failures | Caiu do 2º |\n| A05 | Injection | Caiu do 3º |\n| A06 | Insecure Design | Caiu do 4º |\n| A07 | Authentication Failures | — |\n| A08 | Software or Data Integrity Failures | — |\n| A09 | Security Logging & Alerting Failures | \"Monitoring\" virou \"Alerting\" |\n| A10 | **Mishandling of Exceptional Conditions** | **Nova** (falhar aberto, erro mal tratado) |\n\n- **Desenvolvimento seguro / programação defensiva:** validar toda entrada, usar consultas parametrizadas (contra injeção), tratar exceções sem vazar detalhes (liga com A10), menor privilégio.\n- 🔵 **SDL** (*Security Development Lifecycle*, da Microsoft) e **CLASP** (OWASP): metodologias que embutem segurança em todo o ciclo de vida.\n- **Conexões:** [[excecoes]] (tratamento de exceções da programação ↔ A10) · [[keycloak-sso]] (A07) · [[sql]] (A05) · [[ci-cd]] (A03 cadeia de suprimentos) · [[protecao-perimetro]]\n- **Fontes:** [OWASP Top 10:2025 – introdução](https://owasp.org/Top10/2025/0x00_2025-Introduction/) · [SecurityWeek](https://www.securityweek.com/two-new-web-application-risk-categories-added-to-owasp-top-10/amp/) · [GitLab – mudanças](https://about.gitlab.com/blog/2025-owasp-top-10-whats-changed-and-why-it-matters/)\n\n---"
  },
  {
    "id": "protecao-perimetro",
    "aliasIds": [],
    "titulo": "Sistemas de proteção: firewall, WAF, UTM, DMZ, Proxy, NAC, antivírus/antispam, IDS/IPS ( + SIEM)",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Defensora Whitfield",
    "npcRole": "mago",
    "npcSeed": 581444762,
    "oQueE": "Firewall: filtra tráfego por regras (endereço, porta, protocolo, estado da conexão).",
    "exemploPratico": "",
    "fatosChave": [
      "Firewall: filtra tráfego por regras (endereço, porta, protocolo, estado da conexão).",
      "WAF (Web Application Firewall): firewall de camada de aplicação HTTP — bloqueia ataques web (injeção, XSS) → liga com owasp.",
      "UTM (Unified Threat Management): appliance que junta várias funções (firewall, IPS, antivírus, filtro web, VPN).",
      "DMZ: sub-rede intermediária onde ficam serviços expostos à internet (web, e-mail), isolando a rede interna.",
      "Proxy: intermediário de requisições (o forward proxy fica na frente dos clientes — filtro de navegação). Contraste: proxy-reverso.",
      "NAC (Network Access Control): só deixa o dispositivo entrar na rede se cumprir a política (ex.: com 802.1X).",
      "IDS × IPS (NIST SP 800-94): detecção de intrusão = monitorar eventos e procurar sinais de incidentes; prevenção = detectar e tentar impedir. Métodos: por assinatura (padrões conhecidos) e por anomalia. Tipos: de rede, wireless, análise de comportamento de rede e de host.",
      "🔵 SIEM: correlaciona logs e eventos de várias fontes para detectar incidentes (citado pelo NIST como tecnologia complementar)."
    ],
    "conexoes": [
      "owasp",
      "proxy-reverso"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NIST SP 800-94",
        "url": "https://csrc.nist.gov/publications/detail/sp/800-94/final"
      },
      {
        "label": "NIST – resumo SP 800-94",
        "url": "https://www.nist.gov/node/589321"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Firewall:** filtra tráfego por regras (endereço, porta, protocolo, estado da conexão).\n- **WAF (*Web Application Firewall*):** firewall de **camada de aplicação HTTP** — bloqueia ataques web (injeção, XSS) → liga com [[owasp]].\n- **UTM (*Unified Threat Management*):** appliance que junta várias funções (firewall, IPS, antivírus, filtro web, VPN).\n- **DMZ:** sub-rede intermediária onde ficam serviços expostos à internet (web, e-mail), isolando a rede interna.\n- **Proxy:** intermediário de requisições (o *forward proxy* fica na frente dos clientes — filtro de navegação). Contraste: [[proxy-reverso]].\n- **NAC (*Network Access Control*):** só deixa o dispositivo entrar na rede se cumprir a política (ex.: com 802.1X).\n- **IDS × IPS (NIST SP 800-94):** detecção de intrusão = monitorar eventos e procurar sinais de incidentes; **prevenção** = detectar **e tentar impedir**. Métodos: por **assinatura** (padrões conhecidos) e por **anomalia**. Tipos: de rede, wireless, análise de comportamento de rede e de host.\n- 🔵 **SIEM:** correlaciona logs e eventos de várias fontes para detectar incidentes (citado pelo NIST como tecnologia complementar).\n- **Fontes:** [NIST SP 800-94](https://csrc.nist.gov/publications/detail/sp/800-94/final) · [NIST – resumo SP 800-94](https://www.nist.gov/node/589321)"
  },
  {
    "id": "vpn-ztna",
    "aliasIds": [],
    "titulo": "VPN, VPN-SSL e ZTNA (Zero Trust)",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Sentinela Alice II",
    "npcRole": "guarda",
    "npcSeed": 2024115345,
    "oQueE": "VPN: túnel criptografado sobre rede pública. IPSec (camada de rede) ou SSL/TLS (VPN-SSL, geralmente via navegador/cliente leve).",
    "exemploPratico": "",
    "fatosChave": [
      "VPN: túnel criptografado sobre rede pública. IPSec (camada de rede) ou SSL/TLS (VPN-SSL, geralmente via navegador/cliente leve).",
      "Zero Trust (NIST SP 800-207, 2020): nenhuma confiança implícita é dada a ativos ou contas só pela localização na rede (LAN × internet) ou pela propriedade do dispositivo; autenticação e autorização de sujeito e dispositivo antes de cada sessão. Lema: \"nunca confie, sempre verifique\".",
      "ZTNA: acesso a aplicações aplicando Zero Trust (acesso por aplicação, não à rede inteira como na VPN tradicional)."
    ],
    "conexoes": [
      "protocolos",
      "tls",
      "controle-acesso",
      "res-cnj-396-2021"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NIST SP 800-207",
        "url": "https://csrc.nist.gov/Pubs/sp/800/207/Final"
      },
      {
        "label": "NIST – never trust, always verify",
        "url": "https://www.nist.gov/blogs/taking-measure/zero-trust-cybersecurity-never-trust-always-verify"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **VPN:** túnel criptografado sobre rede pública. **IPSec** (camada de rede) ou **SSL/TLS** (VPN-SSL, geralmente via navegador/cliente leve).\n- **Zero Trust (NIST SP 800-207, 2020):** **nenhuma confiança implícita** é dada a ativos ou contas só pela **localização na rede** (LAN × internet) ou pela propriedade do dispositivo; autenticação e autorização de sujeito e dispositivo antes de cada sessão. Lema: \"nunca confie, sempre verifique\".\n- **ZTNA:** acesso a aplicações aplicando Zero Trust (acesso por aplicação, não à rede inteira como na VPN tradicional).\n- **Conexões:** [[protocolos]] · [[tls]] · [[controle-acesso]] · [[res-cnj-396-2021]] (segurança do teletrabalho)\n- **Fontes:** [NIST SP 800-207](https://csrc.nist.gov/Pubs/sp/800/207/Final) · [NIST – never trust, always verify](https://www.nist.gov/blogs/taking-measure/zero-trust-cybersecurity-never-trust-always-verify)"
  },
  {
    "id": "wifi-seguranca",
    "aliasIds": [],
    "titulo": "Segurança em redes sem fio",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Guarda Bob II",
    "npcRole": "guarda",
    "npcSeed": 1556804712,
    "oQueE": "Legados (inseguros): WEP, WPA.",
    "exemploPratico": "",
    "fatosChave": [
      "Legados (inseguros): WEP, WPA.",
      "WPA2: usava PSK (chave pré-compartilhada) no modo pessoal — vulnerável a ataque de dicionário offline e ao KRACK (2017).",
      "WPA3 (Wi-Fi Alliance, 2018): modo pessoal troca PSK por SAE (Simultaneous Authentication of Equals) → sigilo direto (forward secrecy), resistência a dicionário offline; PMF (quadros de gerência protegidos) obrigatório.",
      "Modo Enterprise: IEEE 802.1X + EAP + servidor RADIUS (ex.: integrado ao Active Directory; EAP-TLS com certificados é o mais forte)."
    ],
    "conexoes": [
      "ieee-80211",
      "vlan-stp",
      "active-directory"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "TP-Link – What is WPA3",
        "url": "https://community.tp-link.com/en/business/kb/detail/354"
      },
      {
        "label": "arXiv – WPA3 SAE",
        "url": "https://arxiv.org/pdf/2603.23352"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Legados (inseguros):** WEP, WPA.\n- **WPA2:** usava **PSK** (chave pré-compartilhada) no modo pessoal — vulnerável a ataque de dicionário offline e ao **KRACK** (2017).\n- **WPA3 (Wi-Fi Alliance, 2018):** modo pessoal troca PSK por **SAE** (*Simultaneous Authentication of Equals*) → sigilo direto (*forward secrecy*), resistência a dicionário offline; **PMF (quadros de gerência protegidos) obrigatório**.\n- **Modo Enterprise:** **IEEE 802.1X** + **EAP** + servidor **RADIUS** (ex.: integrado ao Active Directory; EAP-TLS com certificados é o mais forte).\n- **Conexões:** [[ieee-80211]] (padrões Wi-Fi) · [[vlan-stp]] · [[active-directory]]\n- **Fontes:** [TP-Link – What is WPA3](https://community.tp-link.com/en/business/kb/detail/354) · [arXiv – WPA3 SAE](https://arxiv.org/pdf/2603.23352)"
  },
  {
    "id": "criptografia",
    "aliasIds": [],
    "titulo": "Criptografia, hashes, certificados e assinaturas digitais",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Criptógrafa Diffie II",
    "npcRole": "mago",
    "npcSeed": 1036637804,
    "oQueE": "Simétrica: mesma chave para cifrar e decifrar — rápida (ex.: AES). Problema: distribuir a chave.",
    "exemploPratico": "Exemplo prático: o magistrado assina a sentença no PJe com certificado ICP-Brasil (token/nuvem) → não repúdio.",
    "fatosChave": [
      "Simétrica: mesma chave para cifrar e decifrar — rápida (ex.: AES). Problema: distribuir a chave.",
      "Assimétrica: par de chaves pública/privada (ex.: RSA, curvas elípticas). Cifrar com a pública do destinatário → só a privada dele decifra.",
      "Hash criptográfico: resumo de tamanho fixo, unidirecional (ex.: SHA-256) → integridade.",
      "Assinatura digital: hash do documento cifrado com a chave privada do autor → autenticidade, integridade e não repúdio.",
      "Certificado digital: vincula uma chave pública a uma identidade, assinado por uma Autoridade Certificadora (AC).",
      "🔵 ICP/PKI e ICP-Brasil: instituída pela MP 2.200-2/2001 para garantir autenticidade, integridade e validade jurídica de documentos eletrônicos. Cadeia: AC Raiz (o ITI) → ACs → Autoridades de Registro (AR). Documento assinado com certificado ICP-Brasil se presume verdadeiro em relação ao signatário.",
      "🔵 Criptografia pós-quântica (NIST, 13/08/2024): FIPS 203 ML-KEM (de CRYSTALS-Kyber, troca de chaves), FIPS 204 ML-DSA (de Dilithium, assinatura), FIPS 205 SLH-DSA (de SPHINCS+, assinatura baseada em hash). Motivo: computadores quânticos ameaçam RSA e curvas elípticas."
    ],
    "conexoes": [
      "res-cnj-522-2023",
      "jwt",
      "tls"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "MP 2.200-2 (Câmara)",
        "url": "https://www2.camara.leg.br/legin/fed/medpro/2001/medidaprovisoria-2200-2-24-agosto-2001-391394-normaatualizada-pe.pdf"
      },
      {
        "label": "ITI – Carta de Serviços",
        "url": "https://www.gov.br/iti/pt-br/acesso-a-informacao/ITI_CartadeServicos_2025.pdf"
      },
      {
        "label": "NIST CSRC – FIPS PQC",
        "url": "https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved"
      },
      {
        "label": "IBM Research – PQC",
        "url": "https://research.ibm.com/blog/nist-pqc-standards"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Simétrica:** **mesma chave** para cifrar e decifrar — rápida (ex.: **AES**). Problema: distribuir a chave.\n- **Assimétrica:** **par de chaves** pública/privada (ex.: **RSA**, curvas elípticas). Cifrar com a pública do destinatário → só a privada dele decifra.\n- **Hash criptográfico:** resumo de tamanho fixo, unidirecional (ex.: SHA-256) → **integridade**.\n- **Assinatura digital:** hash do documento cifrado com a **chave privada** do autor → **autenticidade, integridade e não repúdio**.\n- **Certificado digital:** vincula uma chave pública a uma identidade, assinado por uma **Autoridade Certificadora (AC)**.\n- 🔵 **ICP/PKI e ICP-Brasil:** instituída pela **MP 2.200-2/2001** para garantir **autenticidade, integridade e validade jurídica** de documentos eletrônicos. Cadeia: **AC Raiz (o ITI)** → ACs → Autoridades de Registro (AR). Documento assinado com certificado ICP-Brasil se **presume verdadeiro** em relação ao signatário.\n- 🔵 **Criptografia pós-quântica (NIST, 13/08/2024):** **FIPS 203 ML-KEM** (de CRYSTALS-Kyber, troca de chaves), **FIPS 204 ML-DSA** (de Dilithium, assinatura), **FIPS 205 SLH-DSA** (de SPHINCS+, assinatura baseada em hash). Motivo: computadores quânticos ameaçam RSA e curvas elípticas.\n- **Exemplo prático:** o magistrado assina a sentença no PJe com certificado ICP-Brasil (token/nuvem) → não repúdio.\n- **Conexões:** [[moreq-jus]] · [[jwt]] (assinatura HS256/RS256) · [[tls]]\n- **Fontes:** [MP 2.200-2 (Câmara)](https://www2.camara.leg.br/legin/fed/medpro/2001/medidaprovisoria-2200-2-24-agosto-2001-391394-normaatualizada-pe.pdf) · [ITI – Carta de Serviços](https://www.gov.br/iti/pt-br/acesso-a-informacao/ITI_CartadeServicos_2025.pdf) · [NIST CSRC – FIPS PQC](https://csrc.nist.gov/news/2024/postquantum-cryptography-fips-approved) · [IBM Research – PQC](https://research.ibm.com/blog/nist-pqc-standards)"
  },
  {
    "id": "tls",
    "aliasIds": [],
    "titulo": "TLS 1.2 ( Analista: + TLS 1.3 e limitações do SSL)",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Vigia Rivest II",
    "npcRole": "ferreiro",
    "npcSeed": 1172851222,
    "oQueE": "O que é: protocolo que cria um canal seguro entre dois pontos (confidencialidade, integridade, autenticação do servidor). Dois componentes: handshake (negocia algoritmos e chaves, autentica) e record protocol (protege os dados).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: protocolo que cria um canal seguro entre dois pontos (confidencialidade, integridade, autenticação do servidor). Dois componentes: handshake (negocia algoritmos e chaves, autentica) e record protocol (protege os dados).",
      "🟣 TLS 1.3 × 1.2: removeu troca de chaves RSA estática e DH estático → toda troca de chaves pública tem sigilo direto (forward secrecy); removeu compressão e DSA; handshake mais rápido.",
      "🟣 SSL: antecessor do TLS; SSL 2.0/3.0 são inseguros e não devem ser usados (TLS 1.0 e 1.1 também foram depreciados)."
    ],
    "conexoes": [
      "criptografia",
      "proxy-reverso",
      "vpn-ztna"
    ],
    "avisosOraculo": [
      "Novidade (jul/2026): a RFC 9846 passou a definir o TLS 1.3, tornando obsoletas a RFC 8446 (TLS 1.3 antiga) e a RFC 5246 (TLS 1.2)."
    ],
    "fontes": [
      {
        "label": "RFC 9846",
        "url": "https://www.rfc-editor.org/info/rfc9846/"
      },
      {
        "label": "Draft RFC 8446bis – diferenças do 1.2",
        "url": "https://www.ietf.org/archive/id/draft-rescorla-tls-rfc8446-bis-00.html"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** protocolo que cria um **canal seguro** entre dois pontos (confidencialidade, integridade, autenticação do servidor). Dois componentes: **handshake** (negocia algoritmos e chaves, autentica) e **record protocol** (protege os dados).\n- 🟣 **TLS 1.3 × 1.2:** removeu troca de chaves **RSA estática e DH estático** → toda troca de chaves pública tem **sigilo direto (forward secrecy)**; removeu compressão e DSA; handshake mais rápido.\n- ⚠️ **Novidade (jul/2026):** a **RFC 9846** passou a definir o TLS 1.3, **tornando obsoletas a RFC 8446** (TLS 1.3 antiga) **e a RFC 5246** (TLS 1.2).\n- 🟣 **SSL:** antecessor do TLS; SSL 2.0/3.0 são inseguros e não devem ser usados (TLS 1.0 e 1.1 também foram depreciados).\n- **Conexões:** [[criptografia]] · [[proxy-reverso]] (SSL offloading) · [[vpn-ztna]] (VPN-SSL) · [[tls]]\n- **Fontes:** [RFC 9846](https://www.rfc-editor.org/info/rfc9846/) · [Draft RFC 8446bis – diferenças do 1.2](https://www.ietf.org/archive/id/draft-rescorla-tls-rfc8446-bis-00.html)"
  },
  {
    "id": "controle-acesso",
    "aliasIds": [],
    "titulo": "Controle de acesso: autenticação, autorização, auditoria (AAA), RBAC, MFA",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Capitã Shamir II",
    "npcRole": "mago",
    "npcSeed": 435935618,
    "oQueE": "AAA: Autenticação (quem é você?), Autorização (o que pode fazer?), Auditoria/Accounting (o que fez?).",
    "exemploPratico": "",
    "fatosChave": [
      "AAA: Autenticação (quem é você?), Autorização (o que pode fazer?), Auditoria/Accounting (o que fez?).",
      "RBAC: permissões atribuídas a papéis, e papéis a usuários (ex.: \"Assessor\", \"Servidor de Secretaria\").",
      "MFA: dois ou mais fatores de categorias diferentes — algo que você sabe (senha), tem (token, celular), é (biometria). O CNJ determinou MFA para acesso a sistemas judiciais sensíveis (Portaria CNJ nº 140, de 22/04/2024); o tema entrou na pauta do Comitê de Governança de TIC do TRT4 em 26/04/2024."
    ],
    "conexoes": [
      "keycloak-sso",
      "active-directory",
      "owasp",
      "portaria-162-2021"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "RFC 2989 – AAA",
        "url": "https://www.rfc-editor.org/rfc/rfc2989.txt"
      },
      {
        "label": "NIST – authentication",
        "url": "https://csrc.nist.gov/glossary/term/authentication"
      },
      {
        "label": "NIST – authorization",
        "url": "https://csrc.nist.gov/glossary/term/authorization"
      },
      {
        "label": "NIST – accountability",
        "url": "https://csrc.nist.gov/glossary/term/accountability"
      },
      {
        "label": "NIST – RBAC FAQ",
        "url": "https://csrc.nist.gov/projects/role-based-access-control/faqs"
      },
      {
        "label": "NIST – MFA",
        "url": "https://csrc.nist.gov/glossary/term/multi_factor_authentication"
      },
      {
        "label": "TRT7 – perfis no PJeCor",
        "url": "https://www.trt7.jus.br/files/pje/pje-cor/Manual_do_PJeCor_-_cadastramento_de_usurios.pdf"
      },
      {
        "label": "Portaria CNJ 140/2024",
        "url": "https://atos.cnj.jus.br/atos/detalhar/5536"
      },
      {
        "label": "TRT4 – ata de 26/04/2024",
        "url": "https://www.trt4.jus.br/portais/media/2804387/Ata%20Comit%C3%AA%20de%20Governan%C3%A7a%20de%20TIC%20-%2026_04_2024.pdf"
      },
      {
        "label": "Portaria CNJ 162/2021 (Qlegislação)",
        "url": "https://qlegislacao.com.br/legismais/federal/nac-port-cnj-162-2021"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **AAA:** **Autenticação** (quem é você?), **Autorização** (o que pode fazer?), **Auditoria/Accounting** (o que fez?).\n- **RBAC:** permissões atribuídas a **papéis**, e papéis a usuários (ex.: \"Assessor\", \"Servidor de Secretaria\").\n- **MFA:** dois ou mais fatores de categorias diferentes — algo que você **sabe** (senha), **tem** (token, celular), **é** (biometria). O CNJ determinou MFA para acesso a sistemas judiciais sensíveis (Portaria CNJ nº 140, de 22/04/2024); o tema entrou na pauta do Comitê de Governança de TIC do TRT4 em 26/04/2024.\n- **Conexões:** [[keycloak-sso]] · [[active-directory]] · [[owasp]] (A01 e A07) · [[portaria-162-2021]] (Manual de Gestão de Identidades)\n- **Fontes:** [RFC 2989 – AAA](https://www.rfc-editor.org/rfc/rfc2989.txt) · [NIST – authentication](https://csrc.nist.gov/glossary/term/authentication) · [NIST – authorization](https://csrc.nist.gov/glossary/term/authorization) · [NIST – accountability](https://csrc.nist.gov/glossary/term/accountability) · [NIST – RBAC FAQ](https://csrc.nist.gov/projects/role-based-access-control/faqs) · [NIST – MFA](https://csrc.nist.gov/glossary/term/multi_factor_authentication) · [TRT7 – perfis no PJeCor](https://www.trt7.jus.br/files/pje/pje-cor/Manual_do_PJeCor_-_cadastramento_de_usurios.pdf) · [Portaria CNJ 140/2024](https://atos.cnj.jus.br/atos/detalhar/5536) · [TRT4 – ata de 26/04/2024](https://www.trt4.jus.br/portais/media/2804387/Ata%20Comit%C3%AA%20de%20Governan%C3%A7a%20de%20TIC%20-%2026_04_2024.pdf) · [Portaria CNJ 162/2021 (Qlegislação)](https://qlegislacao.com.br/legismais/federal/nac-port-cnj-162-2021)"
  },
  {
    "id": "ataques-malware",
    "aliasIds": [],
    "titulo": "Ataques, ameaças e códigos maliciosos",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "ambos",
    "npcName": "Protetor Merkle II",
    "npcRole": "mago",
    "npcSeed": 552465857,
    "oQueE": "DoS / DDoS: esgotar recursos para negar serviço; DDoS usa muitas origens (frequentemente uma botnet).",
    "exemploPratico": "",
    "fatosChave": [
      "DoS / DDoS: esgotar recursos para negar serviço; DDoS usa muitas origens (frequentemente uma botnet).",
      "🔵 Spoofing (falsificação de origem: IP, ARP, e-mail), flood (inundação, ex.: SYN flood).",
      "Malwares: vírus (precisa de hospedeiro), worm (se propaga sozinho), trojan (disfarçado), spyware, ransomware (sequestra dados com criptografia), rootkit (esconde presença), backdoor, keylogger. Phishing é fraude que usa engenharia social para obter dados pessoais e financeiros (ex.: credenciais).",
      "Sniffer / análise de pacotes: captura e inspeciona tráfego (ex.: Wireshark) — usado na defesa e no ataque.",
      "🟣 Analista cobra interpretação de pacotes.",
      "🔵 Teste de intrusão (pentest) e análise de vulnerabilidades: pentest explora falhas de forma autorizada (CIS Control 18); varredura de vulnerabilidades identifica (CIS Control 7).",
      "🔵 Hardening: reduzir a superfície de ataque (desativar serviços, contas padrão, aplicar patches) → liga com wsus e linux."
    ],
    "conexoes": [
      "wsus",
      "linux"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CERT.br – Cartilha de Segurança",
        "url": "https://cartilha.cert.br/livro/cartilha-seguranca-internet.pdf"
      },
      {
        "label": "CERT.br – Códigos maliciosos",
        "url": "https://cartilha.cert.br/fasciculos/codigos-maliciosos/fasciculo-codigos-maliciosos.pdf"
      },
      {
        "label": "CISA – DoS e DDoS",
        "url": "https://www.cisa.gov/news-events/news/understanding-denial-service-attacks"
      },
      {
        "label": "RFC 2827 – IP spoofing",
        "url": "https://www.rfc-editor.org/rfc/rfc2827.txt"
      },
      {
        "label": "MITRE – ARP",
        "url": "https://attack.mitre.org/techniques/T1557/002/"
      },
      {
        "label": "NIST – flooding",
        "url": "https://csrc.nist.gov/glossary/term/flooding"
      },
      {
        "label": "RFC 4987 – SYN flood",
        "url": "https://www.rfc-editor.org/rfc/rfc4987.txt"
      },
      {
        "label": "MITRE – phishing de credenciais",
        "url": "https://attack.mitre.org/techniques/T1598/"
      },
      {
        "label": "Wireshark",
        "url": "https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html"
      },
      {
        "label": "NIST SP 800-115",
        "url": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf"
      },
      {
        "label": "CIS Control 18",
        "url": "https://www.cisecurity.org/controls/penetration-testing"
      },
      {
        "label": "CIS Control 7",
        "url": "https://www.cisecurity.org/controls/continuous-vulnerability-management"
      },
      {
        "label": "Microsoft – hardening",
        "url": "https://learn.microsoft.com/en-us/azure/well-architected/security/harden-resources"
      },
      {
        "label": "NIST SP 800-123",
        "url": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-123.pdf"
      },
      {
        "label": "Edital nº 1/2026 (DOU 22/10/2026, cópia)",
        "url": "https://dhg1h5j42swfq.cloudfront.net/2026/10/22060540/diariooficial-126-152.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **DoS / DDoS:** esgotar recursos para negar serviço; DDoS usa muitas origens (frequentemente uma **botnet**).\n- 🔵 **Spoofing** (falsificação de origem: IP, ARP, e-mail), **flood** (inundação, ex.: SYN flood).\n- **Malwares:** vírus (precisa de hospedeiro), worm (se propaga sozinho), **trojan** (disfarçado), spyware, **ransomware** (sequestra dados com criptografia), rootkit (esconde presença), backdoor, keylogger. **Phishing** é fraude que usa engenharia social para obter dados pessoais e financeiros (ex.: credenciais).\n- **Sniffer / análise de pacotes:** captura e inspeciona tráfego (ex.: Wireshark) — usado na defesa e no ataque.\n  - 🟣 Analista cobra **interpretação de pacotes**.\n- 🔵 **Teste de intrusão (pentest) e análise de vulnerabilidades:** pentest **explora** falhas de forma autorizada (CIS Control 18); varredura de vulnerabilidades **identifica** (CIS Control 7).\n- 🔵 **Hardening:** reduzir a superfície de ataque (desativar serviços, contas padrão, aplicar patches) → liga com [[wsus]] e [[linux]].\n- **Fontes:** [CERT.br – Cartilha de Segurança](https://cartilha.cert.br/livro/cartilha-seguranca-internet.pdf) · [CERT.br – Códigos maliciosos](https://cartilha.cert.br/fasciculos/codigos-maliciosos/fasciculo-codigos-maliciosos.pdf) · [CISA – DoS e DDoS](https://www.cisa.gov/news-events/news/understanding-denial-service-attacks) · [RFC 2827 – IP spoofing](https://www.rfc-editor.org/rfc/rfc2827.txt) · [MITRE – ARP](https://attack.mitre.org/techniques/T1557/002/) · [NIST – flooding](https://csrc.nist.gov/glossary/term/flooding) · [RFC 4987 – SYN flood](https://www.rfc-editor.org/rfc/rfc4987.txt) · [MITRE – phishing de credenciais](https://attack.mitre.org/techniques/T1598/) · [Wireshark](https://www.wireshark.org/docs/wsug_html_chunked/ChapterIntroduction.html) · [NIST SP 800-115](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf) · [CIS Control 18](https://www.cisecurity.org/controls/penetration-testing) · [CIS Control 7](https://www.cisecurity.org/controls/continuous-vulnerability-management) · [Microsoft – hardening](https://learn.microsoft.com/en-us/azure/well-architected/security/harden-resources) · [NIST SP 800-123](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-123.pdf) · [Edital nº 1/2026 (DOU 22/10/2026, cópia)](https://dhg1h5j42swfq.cloudfront.net/2026/10/22060540/diariooficial-126-152.pdf)"
  },
  {
    "id": "backup",
    "aliasIds": [],
    "titulo": "Backup e recuperação de dados ( + gestão de incidentes)",
    "zonaId": "06-seguranca-da-informacao",
    "regiaoId": "fortaleza-da-muralha",
    "materia": "Segurança da Informação",
    "cargo": "tecnico",
    "npcName": "Muralhista Kerckhoffs II",
    "npcRole": "mago",
    "npcSeed": 850372319,
    "oQueE": "Regra 3-2-1 (CISA): 3 cópias, em 2 tipos de mídia, 1 fora do local. Variação 3-2-1-1-0: + 1 imutável/offline + 0 erros verificados em teste de restauração.",
    "exemploPratico": "",
    "fatosChave": [
      "Regra 3-2-1 (CISA): 3 cópias, em 2 tipos de mídia, 1 fora do local. Variação 3-2-1-1-0: + 1 imutável/offline + 0 erros verificados em teste de restauração.",
      "Tipos: completo; incremental (só o que mudou desde o último backup de qualquer tipo — restauração precisa do completo + todos os incrementais); diferencial (o que mudou desde o último completo).",
      "Gestão de incidentes e continuidade: preparar → detectar → conter → erradicar → recuperar → lições aprendidas. A ENSEC-PJ exige backups automatizados e segregados e ETIR."
    ],
    "conexoes": [
      "res-cnj-396-2021",
      "portaria-162-2021",
      "ataques-malware"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "CISA – back up data",
        "url": "https://www.cisa.gov/back-government-data"
      },
      {
        "label": "N-able – incremental",
        "url": "https://www.n-able.com/es/blog/data-backup-and-recovery-strategies-and-best-practices"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Regra 3-2-1 (CISA):** **3 cópias**, em **2 tipos de mídia**, **1 fora do local**. Variação 3-2-1-1-0: + 1 imutável/offline + 0 erros verificados em teste de restauração.\n- **Tipos:** completo; **incremental** (só o que mudou desde o último backup de qualquer tipo — restauração precisa do completo + todos os incrementais); diferencial (o que mudou desde o último completo).\n- **Gestão de incidentes e continuidade:** preparar → detectar → conter → erradicar → recuperar → lições aprendidas. A ENSEC-PJ exige **backups automatizados e segregados** e **ETIR**.\n- **Conexões:** [[res-cnj-396-2021]] · [[portaria-162-2021]] (protocolo de crises) · [[ataques-malware]] (ransomware ataca backups)\n- **Fontes:** [CISA – back up data](https://www.cisa.gov/back-government-data) · [N-able – incremental](https://www.n-able.com/es/blog/data-backup-and-recovery-strategies-and-best-practices)\n\n---"
  },
  {
    "id": "processos-threads",
    "aliasIds": [],
    "titulo": "Processos, threads e escalonamento de CPU",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Alpinista Tanenbaum",
    "npcRole": "mago",
    "npcSeed": 1600780256,
    "oQueE": "Processo: programa em execução, com seu próprio espaço de memória. Thread: fluxo de execução dentro de um processo; threads do mesmo processo compartilham memória (mais leves, mas exigem sincronização).",
    "exemploPratico": "",
    "fatosChave": [
      "Processo: programa em execução, com seu próprio espaço de memória. Thread: fluxo de execução dentro de um processo; threads do mesmo processo compartilham memória (mais leves, mas exigem sincronização).",
      "Estados clássicos: novo → pronto → executando → (bloqueado/esperando E/S) → pronto … → terminado.",
      "Escalonamento (alocação de CPU): FCFS/FIFO (por ordem de chegada) · SJF (menor job primeiro — ótimo em tempo médio de espera, mas pode causar starvation dos longos) · Round Robin (fatia de tempo/quantum, preemptivo) · Prioridade (pode causar starvation; resolve com envelhecimento/aging).",
      "Preemptivo × não preemptivo: no preemptivo o SO pode tirar a CPU do processo.",
      "Comunicação e sincronização (IPC): memória compartilhada, troca de mensagens, pipes, sockets; região crítica protegida por mutex, semáforos (Dijkstra) e monitores; condição de corrida (race condition) quando o resultado depende da ordem de execução."
    ],
    "conexoes": [
      "java",
      "mensageria",
      "transacoes"
    ],
    "avisosOraculo": [
      "Conteúdo clássico (Tanenbaum; Silberschatz); sem fonte online única nesta rodada."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Processo:** programa **em execução**, com seu próprio espaço de memória. **Thread:** fluxo de execução **dentro** de um processo; threads do mesmo processo **compartilham memória** (mais leves, mas exigem sincronização).\n- **Estados clássicos:** novo → **pronto** → **executando** → (**bloqueado/esperando** E/S) → pronto … → terminado.\n- **Escalonamento (alocação de CPU):** FCFS/FIFO (por ordem de chegada) · **SJF** (menor job primeiro — ótimo em tempo médio de espera, mas pode causar starvation dos longos) · **Round Robin** (fatia de tempo/*quantum*, preemptivo) · **Prioridade** (pode causar starvation; resolve com **envelhecimento/aging**).\n- **Preemptivo × não preemptivo:** no preemptivo o SO pode **tirar** a CPU do processo.\n- **Comunicação e sincronização (IPC):** memória compartilhada, troca de mensagens, pipes, sockets; **região crítica** protegida por **mutex**, **semáforos** (Dijkstra) e **monitores**; condição de corrida (*race condition*) quando o resultado depende da ordem de execução.\n- **Conexões:** [[java]] (threads, `synchronized`) · [[mensageria]] (troca de mensagens entre serviços) · [[transacoes]] (concorrência no banco)\n- ⚠️ Conteúdo clássico (Tanenbaum; Silberschatz); sem fonte online única nesta rodada."
  },
  {
    "id": "deadlock",
    "aliasIds": [],
    "titulo": "Deadlock (impasse) e starvation (inanição)",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Engenheiro Cerf",
    "npcRole": "sabio",
    "npcSeed": 683276944,
    "oQueE": "Deadlock: conjunto de processos em que cada um espera um recurso preso por outro do conjunto → ninguém anda.",
    "exemploPratico": "Exemplo prático: duas transações no banco: T1 trava a linha A e pede B; T2 trava B e pede A → deadlock (o PostgreSQL detecta e aborta uma delas).",
    "fatosChave": [
      "Deadlock: conjunto de processos em que cada um espera um recurso preso por outro do conjunto → ninguém anda.",
      "As 4 condições de Coffman (1971) — todas precisam ocorrer ao mesmo tempo:",
      "Como lidar: prevenir (quebrar uma das 4 condições, ex.: ordenar a requisição de recursos para eliminar a espera circular) · evitar (ex.: algoritmo do banqueiro, estado seguro) · detectar e recuperar (grafo de alocação, matar/rolar processos) · ignorar (\"algoritmo do avestruz\" — o que a maioria dos SOs de uso geral faz).",
      "Starvation (inanição): um processo nunca consegue o recurso/CPU porque outros sempre passam na frente (ex.: prioridade baixa). Diferente do deadlock: o sistema continua andando, só aquele processo não. Solução típica: aging."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Yale – Deadlock (Coffman)",
        "url": "https://cs.yale.edu/homes/aspnes/pinewiki/Deadlock.html"
      },
      {
        "label": "UIC – Deadlocks (Silberschatz)",
        "url": "https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/7_Deadlocks"
      },
      {
        "label": "Tanenbaum – InformIT",
        "url": "https://www.informit.com/articles/article.aspx?p=25193"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Deadlock:** conjunto de processos em que **cada um espera um recurso preso por outro** do conjunto → ninguém anda.\n- **As 4 condições de Coffman (1971)** — **todas** precisam ocorrer ao mesmo tempo:\n  1. **Exclusão mútua** — recurso não compartilhável;\n  2. **Posse e espera** (*hold and wait*) — segura um recurso enquanto espera outro;\n  3. **Não preempção** — recurso só é liberado por quem o detém;\n  4. **Espera circular** — cadeia fechada P0 → P1 → … → P0.\n- **Como lidar:** **prevenir** (quebrar uma das 4 condições, ex.: ordenar a requisição de recursos para eliminar a espera circular) · **evitar** (ex.: algoritmo do **banqueiro**, estado seguro) · **detectar e recuperar** (grafo de alocação, matar/rolar processos) · **ignorar** (\"algoritmo do avestruz\" — o que a maioria dos SOs de uso geral faz).\n- **Starvation (inanição):** um processo **nunca consegue** o recurso/CPU porque outros sempre passam na frente (ex.: prioridade baixa). Diferente do deadlock: o sistema **continua andando**, só aquele processo não. Solução típica: **aging**.\n- **Exemplo prático:** duas transações no banco: T1 trava a linha A e pede B; T2 trava B e pede A → deadlock (o PostgreSQL detecta e aborta uma delas).\n- **Fontes:** [Yale – Deadlock (Coffman)](https://cs.yale.edu/homes/aspnes/pinewiki/Deadlock.html) · [UIC – Deadlocks (Silberschatz)](https://www.cs.uic.edu/~jbell/CourseNotes/OperatingSystems/7_Deadlocks) · [Tanenbaum – InformIT](https://www.informit.com/articles/article.aspx?p=25193)"
  },
  {
    "id": "memoria",
    "aliasIds": [],
    "titulo": "Gerência de memória",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Vigia Radia",
    "npcRole": "mago",
    "npcSeed": 723466445,
    "oQueE": "Alocação contígua: partições fixas/variáveis → fragmentação externa (buracos entre blocos) e interna (sobra dentro do bloco). Estratégias: first-fit, best-fit, worst-fit.",
    "exemploPratico": "",
    "fatosChave": [
      "Alocação contígua: partições fixas/variáveis → fragmentação externa (buracos entre blocos) e interna (sobra dentro do bloco). Estratégias: first-fit, best-fit, worst-fit.",
      "Paginação: memória lógica dividida em páginas de tamanho fixo e a física em quadros (frames) do mesmo tamanho; tabela de páginas traduz endereços (com TLB como cache). Elimina fragmentação externa (pode ter interna na última página).",
      "Segmentação: divide por segmentos lógicos de tamanho variável (código, dados, pilha) — visão do programador; pode ter fragmentação externa.",
      "Memória virtual: o processo pode ser maior que a RAM; só as páginas necessárias ficam na memória (paginação sob demanda). Page fault = página não está na RAM → SO busca no disco (swap). Thrashing = o sistema passa mais tempo trocando páginas do que executando.",
      "Substituição de páginas: FIFO (sofre a anomalia de Belady), ótimo (teórico), LRU (menos recentemente usada), relógio/segunda chance."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Conteúdo clássico de livro-texto."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Alocação contígua:** partições fixas/variáveis → **fragmentação externa** (buracos entre blocos) e **interna** (sobra dentro do bloco). Estratégias: *first-fit*, *best-fit*, *worst-fit*.\n- **Paginação:** memória lógica dividida em **páginas** de tamanho fixo e a física em **quadros (frames)** do mesmo tamanho; **tabela de páginas** traduz endereços (com **TLB** como cache). Elimina fragmentação externa (pode ter interna na última página).\n- **Segmentação:** divide por **segmentos lógicos de tamanho variável** (código, dados, pilha) — visão do programador; pode ter fragmentação externa.\n- **Memória virtual:** o processo pode ser **maior que a RAM**; só as páginas necessárias ficam na memória (**paginação sob demanda**). **Page fault** = página não está na RAM → SO busca no disco (swap). **Thrashing** = o sistema passa mais tempo trocando páginas do que executando.\n- **Substituição de páginas:** FIFO (sofre a **anomalia de Belady**), **ótimo** (teórico), **LRU** (menos recentemente usada), relógio/segunda chance.\n- ⚠️ Conteúdo clássico de livro-texto."
  },
  {
    "id": "entrada-saida",
    "aliasIds": [],
    "titulo": "Entrada/saída e armazenamento",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Guia Kurose",
    "npcRole": "engenheiro",
    "npcSeed": 897664539,
    "oQueE": "Técnicas de E/S: programada (polling), por interrupção, DMA (o controlador transfere direto para a memória sem ocupar a CPU).",
    "exemploPratico": "",
    "fatosChave": [
      "Técnicas de E/S: programada (polling), por interrupção, DMA (o controlador transfere direto para a memória sem ocupar a CPU).",
      "Armazenamento secundário (HD, SSD) × terciário (fitas, mídia removível/arquivamento — barato, lento, ótimo para backup).",
      "Desempenho/confiabilidade: escalonamento de disco (FCFS, SSTF, SCAN/elevador, C-SCAN); RAID (0 = striping sem redundância; 1 = espelhamento; 5 = paridade distribuída, tolera 1 disco; 6 = dupla paridade, tolera 2; 10 = espelhamento + striping)."
    ],
    "conexoes": [
      "backup",
      "postgresql-versoes"
    ],
    "avisosOraculo": [
      "Conteúdo clássico; níveis RAID conferir na referência SNIA se a banca pedir detalhe."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **Técnicas de E/S:** programada (*polling*), por **interrupção**, **DMA** (o controlador transfere direto para a memória sem ocupar a CPU).\n- **Armazenamento secundário** (HD, SSD) × **terciário** (fitas, mídia removível/arquivamento — barato, lento, ótimo para backup).\n- **Desempenho/confiabilidade:** escalonamento de disco (FCFS, SSTF, SCAN/elevador, C-SCAN); **RAID** (0 = striping sem redundância; 1 = espelhamento; 5 = paridade distribuída, tolera 1 disco; 6 = dupla paridade, tolera 2; 10 = espelhamento + striping).\n- **Conexões:** [[backup]] (fitas, regra 3-2-1) · [[postgresql-versoes]] (AIO do PG 18)\n- ⚠️ Conteúdo clássico; níveis RAID conferir na referência SNIA se a banca pedir detalhe.\n\n---"
  },
  {
    "id": "linux",
    "aliasIds": [],
    "titulo": "Linux: Red Hat Enterprise Linux e Oracle Linux",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Mestre Coffman",
    "npcRole": "engenheiro",
    "npcSeed": 323250915,
    "oQueE": "RHEL 10: disponível em maio/2025 (10.0 GA 13/05/2025; anunciado no Red Hat Summit), com image mode e o assistente de IA RHEL Lightspeed na linha de comando.",
    "exemploPratico": "",
    "fatosChave": [
      "RHEL 10: disponível em maio/2025 (10.0 GA 13/05/2025; anunciado no Red Hat Summit), com image mode e o assistente de IA RHEL Lightspeed na linha de comando.",
      "Oracle Linux 10: 100% compatível em binários com o RHEL 10; kernel padrão UEK 8 (Unbreakable Enterprise Kernel), mas também traz o RHCK (Red Hat Compatible Kernel).",
      "Administração (família RHEL): pacotes com dnf (sucessor do yum) e RPM; serviços com systemctl (systemd); firewall com firewalld/firewall-cmd; SELinux (controle de acesso obrigatório); logs com journalctl.",
      "Comandos que caem: ls, cd, pwd, cp, mv, rm, mkdir, cat, less, grep, find, chmod (permissões rwx/octal, ex.: chmod 750), chown, ps, top, kill, df, du, free, tar, ssh, scp, ip addr, ss/netstat, sudo, useradd, passwd, crontab.",
      "Permissões: r=4 w=2 x=1 para dono, grupo, outros → 755 = rwx r-x r-x."
    ],
    "conexoes": [
      "ataques-malware",
      "docker",
      "protocolos",
      "servicos-rede"
    ],
    "avisosOraculo": [
      "A lista de comandos é conhecimento geral de administração; conferir sintaxe com man."
    ],
    "fontes": [
      {
        "label": "Red Hat – RHEL 10 (pt-br)",
        "url": "https://www.redhat.com/pt-br/about/press-releases/red-hat-introduces-rhel-10"
      },
      {
        "label": "The Register – RHEL 10.0 GA",
        "url": "https://www.theregister.com/2025/05/14/red_hat_enterprise_linux_10/"
      },
      {
        "label": "Oracle – Oracle Linux 10 GA",
        "url": "https://blogs.oracle.com/developers/oracle-linux-10-now-generally-available"
      },
      {
        "label": "Oracle Linux 10 – Release Notes",
        "url": "https://docs.oracle.com/cd/G40711_01/relnotes10.0/OL10-RELNOTES-10-0.pdf"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **RHEL 10:** disponível em **maio/2025** (10.0 GA 13/05/2025; anunciado no Red Hat Summit), com **image mode** e o assistente de IA **RHEL Lightspeed** na linha de comando.\n- **Oracle Linux 10:** **100% compatível em binários com o RHEL 10**; kernel padrão **UEK 8 (Unbreakable Enterprise Kernel)**, mas também traz o **RHCK (Red Hat Compatible Kernel)**.\n- **Administração (família RHEL):** pacotes com **`dnf`** (sucessor do `yum`) e **RPM**; serviços com **`systemctl`** (systemd); firewall com **`firewalld`/`firewall-cmd`**; **SELinux** (controle de acesso obrigatório); logs com **`journalctl`**.\n- **Comandos que caem:** `ls`, `cd`, `pwd`, `cp`, `mv`, `rm`, `mkdir`, `cat`, `less`, `grep`, `find`, `chmod` (permissões rwx/octal, ex.: `chmod 750`), `chown`, `ps`, `top`, `kill`, `df`, `du`, `free`, `tar`, `ssh`, `scp`, `ip addr`, `ss`/`netstat`, `sudo`, `useradd`, `passwd`, `crontab`.\n- **Permissões:** `r=4 w=2 x=1` para **dono, grupo, outros** → `755` = rwx r-x r-x.\n- **Conexões:** [[ataques-malware]] · [[docker]] (contêineres rodam sobre kernel Linux) · [[protocolos]] · [[servicos-rede]] (servidores de aplicação em Linux)\n- **Fontes:** [Red Hat – RHEL 10 (pt-br)](https://www.redhat.com/pt-br/about/press-releases/red-hat-introduces-rhel-10) · [The Register – RHEL 10.0 GA](https://www.theregister.com/2025/05/14/red_hat_enterprise_linux_10/) · [Oracle – Oracle Linux 10 GA](https://blogs.oracle.com/developers/oracle-linux-10-now-generally-available) · [Oracle Linux 10 – Release Notes](https://docs.oracle.com/cd/G40711_01/relnotes10.0/OL10-RELNOTES-10-0.pdf)\n- ⚠️ A lista de comandos é conhecimento geral de administração; conferir sintaxe com `man`."
  },
  {
    "id": "windows",
    "aliasIds": [],
    "titulo": "Windows 11, Windows 10 e Windows Server 2019/2022/2025",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Sábia Stallings",
    "npcRole": "sabio",
    "npcSeed": 711514390,
    "oQueE": "Ciclo de vida fixo (Fixed Lifecycle): mainstream (correções + novidades) → extended (só segurança). \"Fim de vida\" = fim do extended.",
    "exemploPratico": "",
    "fatosChave": [
      "Ciclo de vida fixo (Fixed Lifecycle): mainstream (correções + novidades) → extended (só segurança). \"Fim de vida\" = fim do extended."
    ],
    "conexoes": [
      "powershell"
    ],
    "avisosOraculo": [
      "| Windows Server 2019 | suporte estendido até jan/2029 (conferir na página de lifecycle) |"
    ],
    "fontes": [
      {
        "label": "Microsoft – Windows 10 support has ended",
        "url": "https://support.microsoft.com/kb/5056949"
      },
      {
        "label": "BleepingComputer – ESU até out/2027",
        "url": "https://bleepingcomputer.com/news/microsoft/microsoft-quietly-extends-free-windows-10-esu-support-to-october-2027"
      },
      {
        "label": "Microsoft Learn – Windows Server 2022 Standard (MSL)",
        "url": "https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2022-standard-msl"
      },
      {
        "label": "BleepingComputer – WS 2022 fim do mainstream / WS 2025 até 2034",
        "url": "https://www.bleepingcomputer.com/news/microsoft/microsoft-windows-server-2022-reached-end-of-mainstream-support/amp/"
      },
      {
        "label": "Microsoft Learn – Windows Server 2025 lifecycle",
        "url": "https://learn.microsoft.com/lifecycle/products/windows-server-2025"
      }
    ],
    "tablePairs": [
      {
        "term": "Windows 10",
        "definition": "Situação (levantamento 24/11/2026): fim do suporte em 14/10/2025; continua funcionando, mas sem atualizações/suporte. ESU (Extended Security Updates): consumidor, inicialmente até out/2026 e prorrogado até 12/10/2027; empresas pagam por dispositivo.",
        "rawRow": "Windows 10 — fim do suporte em 14/10/2025; continua funcionando, mas sem atualizações/suporte. ESU (Extended Security Updates): consumidor, inicialmente até out/2026 e prorrogado até 12/10/2027; empresas pagam por dispositivo."
      },
      {
        "term": "Windows 11",
        "definition": "Situação (levantamento 24/11/2026): versão atual do cliente",
        "rawRow": "Windows 11 — versão atual do cliente"
      },
      {
        "term": "Windows Server 2022",
        "definition": "Situação (levantamento 24/11/2026): mainstream encerrado em 13/10/2026; extended até 14/10/2031",
        "rawRow": "Windows Server 2022 — mainstream encerrado em 13/10/2026; extended até 14/10/2031"
      },
      {
        "term": "Windows Server 2025",
        "definition": "Situação (levantamento 24/11/2026): GA em nov/2024; mainstream até nov/2029; extended até 14/11/2034",
        "rawRow": "Windows Server 2025 — GA em nov/2024; mainstream até nov/2029; extended até 14/11/2034"
      }
    ],
    "textoCompleto": "| Produto | Situação (levantamento 24/11/2026) |\n| --- | --- |\n| **Windows 10** | **fim do suporte em 14/10/2025**; continua funcionando, mas sem atualizações/suporte. **ESU** (Extended Security Updates): consumidor, inicialmente até out/2026 e **prorrogado até 12/10/2027**; empresas pagam por dispositivo. |\n| **Windows 11** | versão atual do cliente |\n| **Windows Server 2019** | ⚠️ suporte estendido até jan/2029 (conferir na página de lifecycle) |\n| **Windows Server 2022** | mainstream **encerrado em 13/10/2026**; extended até **14/10/2031** |\n| **Windows Server 2025** | GA em **nov/2024**; mainstream até **nov/2029**; extended até **14/11/2034** |\n\n- **Ciclo de vida fixo (Fixed Lifecycle):** **mainstream** (correções + novidades) → **extended** (só segurança). \"Fim de vida\" = fim do extended.\n- **Fontes:** [Microsoft – Windows 10 support has ended](https://support.microsoft.com/kb/5056949) · [BleepingComputer – ESU até out/2027](https://bleepingcomputer.com/news/microsoft/microsoft-quietly-extends-free-windows-10-esu-support-to-october-2027) · [Microsoft Learn – Windows Server 2022 Standard (MSL)](https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2022-standard-msl) · [BleepingComputer – WS 2022 fim do mainstream / WS 2025 até 2034](https://www.bleepingcomputer.com/news/microsoft/microsoft-windows-server-2022-reached-end-of-mainstream-support/amp/) · [Microsoft Learn – Windows Server 2025 lifecycle](https://learn.microsoft.com/lifecycle/products/windows-server-2025)"
  },
  {
    "id": "active-directory",
    "aliasIds": [],
    "titulo": "Active Directory (AD DS)",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Explorador Shannon",
    "npcRole": "mago",
    "npcSeed": 1766422829,
    "oQueE": "O que é: serviço de diretório do Windows Server que oferece autenticação, aplicação de políticas e gerência centralizada de usuários e computadores. O servidor que roda AD DS é o controlador de domínio (DC).",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: serviço de diretório do Windows Server que oferece autenticação, aplicação de políticas e gerência centralizada de usuários e computadores. O servidor que roda AD DS é o controlador de domínio (DC).",
      "Estrutura lógica: floresta (conjunto de árvores; o primeiro domínio é o domínio raiz) → árvore (domínios com namespace contíguo) → domínio → OU (unidade organizacional) = contêiner para delegar administração e vincular GPOs.",
      "Estrutura física: sites (refletem a rede física, controlam replicação) e DCs.",
      "GPO (Group Policy Object): configurações aplicadas centralmente (ex.: política de senha, bloqueio de USB). Ordem de aplicação clássica LSDOU: Local → Site → Domínio → OU.",
      "FSMO (operations master): 5 funções de mestre único — Schema Master e Domain Naming Master (por floresta); RID Master, PDC Emulator e Infrastructure Master (por domínio).",
      "Protocolos por baixo: LDAP (consulta ao diretório), Kerberos (autenticação), DNS (localizar DCs)."
    ],
    "conexoes": [
      "controle-acesso",
      "keycloak-sso",
      "protocolos",
      "wifi-seguranca"
    ],
    "avisosOraculo": [
      "A lista nominal das 5 funções FSMO e a ordem LSDOU são conhecimento consolidado; nesta rodada só a existência das funções FSMO foi confirmada em fonte Microsoft."
    ],
    "fontes": [
      {
        "label": "Microsoft – AD DS Overview",
        "url": "https://learn.microsoft.com/de-de/previous-versions/orphan-topics/ws.11/cc731053(v=ws.11"
      },
      {
        "label": "Microsoft Learn – Define AD DS (OU)",
        "url": "https://learn.microsoft.com/training/modules/introduction-to-ad-ds/2-define-ad-ds"
      },
      {
        "label": "Microsoft – Information about AD DS",
        "url": "https://technet.microsoft.com/en-us/library/cc540101.aspx"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** serviço de diretório do Windows Server que oferece **autenticação**, aplicação de **políticas** e **gerência centralizada** de usuários e computadores. O servidor que roda AD DS é o **controlador de domínio (DC)**.\n- **Estrutura lógica:** **floresta** (conjunto de árvores; o primeiro domínio é o **domínio raiz**) → **árvore** (domínios com **namespace contíguo**) → **domínio** → **OU (unidade organizacional)** = contêiner para **delegar administração** e **vincular GPOs**.\n- **Estrutura física:** **sites** (refletem a rede física, controlam replicação) e **DCs**.\n- **GPO (Group Policy Object):** configurações aplicadas centralmente (ex.: política de senha, bloqueio de USB). Ordem de aplicação clássica **LSDOU**: Local → Site → Domínio → OU.\n- **FSMO (operations master):** 5 funções de mestre único — **Schema Master** e **Domain Naming Master** (por floresta); **RID Master**, **PDC Emulator** e **Infrastructure Master** (por domínio).\n- **Protocolos por baixo:** **LDAP** (consulta ao diretório), **Kerberos** (autenticação), **DNS** (localizar DCs).\n- **Conexões:** [[controle-acesso]] · [[keycloak-sso]] (Keycloak pode federar usuários do AD via LDAP) · [[protocolos]] · [[wifi-seguranca]] (802.1X/RADIUS integrado ao AD)\n- **Fontes:** [Microsoft – AD DS Overview](https://learn.microsoft.com/de-de/previous-versions/orphan-topics/ws.11/cc731053(v=ws.11)) · [Microsoft Learn – Define AD DS (OU)](https://learn.microsoft.com/training/modules/introduction-to-ad-ds/2-define-ad-ds) · [Microsoft – Information about AD DS](https://technet.microsoft.com/en-us/library/cc540101.aspx)\n- ⚠️ A lista nominal das 5 funções FSMO e a ordem LSDOU são conhecimento consolidado; nesta rodada só a existência das funções FSMO foi confirmada em fonte Microsoft."
  },
  {
    "id": "powershell",
    "aliasIds": [],
    "titulo": "PowerShell",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Guardiã Hopper",
    "npcRole": "sabio",
    "npcSeed": 1173101608,
    "oQueE": "O que é: shell + linguagem de script da Microsoft (hoje multiplataforma) que trabalha com objetos (não só texto). Comandos = cmdlets no padrão Verbo-Substantivo: Get-Process, Get-Service, Stop-Service, Get-ADUser, New-ADUser, Install-WindowsFeature.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: shell + linguagem de script da Microsoft (hoje multiplataforma) que trabalha com objetos (não só texto). Comandos = cmdlets no padrão Verbo-Substantivo: Get-Process, Get-Service, Stop-Service, Get-ADUser, New-ADUser, Install-WindowsFeature.",
      "Pipeline de objetos: Get-Service | Where-Object Status -eq 'Running' | Sort-Object Name.",
      "Ajuda: Get-Help, Get-Command, Get-Member. Execução de scripts controlada pela ExecutionPolicy."
    ],
    "conexoes": [
      "active-directory",
      "windows"
    ],
    "avisosOraculo": [
      "Resumo geral; anexar link da documentação oficial (learn.microsoft.com/powershell) na revisão."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** shell + linguagem de script da Microsoft (hoje multiplataforma) que trabalha com **objetos** (não só texto). Comandos = **cmdlets** no padrão **Verbo-Substantivo**: `Get-Process`, `Get-Service`, `Stop-Service`, `Get-ADUser`, `New-ADUser`, `Install-WindowsFeature`.\n- **Pipeline de objetos:** `Get-Service | Where-Object Status -eq 'Running' | Sort-Object Name`.\n- **Ajuda:** `Get-Help`, `Get-Command`, `Get-Member`. Execução de scripts controlada pela **ExecutionPolicy**.\n- **Conexões:** [[active-directory]] (módulo ActiveDirectory) · [[windows]]\n- ⚠️ Resumo geral; anexar link da documentação oficial (learn.microsoft.com/powershell) na revisão."
  },
  {
    "id": "wsus",
    "aliasIds": [],
    "titulo": "WSUS (Windows Server Update Services)",
    "zonaId": "10-sistemas-operacionais",
    "regiaoId": "montanhas-da-infra",
    "materia": "Sistemas Operacionais",
    "cargo": "analista",
    "npcName": "Escultor Hinton",
    "npcRole": "sabio",
    "npcSeed": 108308521,
    "oQueE": "O que é: função do Windows Server que baixa as atualizações da Microsoft e as distribui na rede interna, deixando o administrador aprovar/adiar e escolher quais máquinas recebem.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: função do Windows Server que baixa as atualizações da Microsoft e as distribui na rede interna, deixando o administrador aprovar/adiar e escolher quais máquinas recebem."
    ],
    "conexoes": [
      "ataques-malware",
      "cis-controls"
    ],
    "avisosOraculo": [
      "Status: a Microsoft anunciou a depreciação do WSUS em 20/09/2024 — sem novos recursos, mas as funções e o conteúdo continuam disponíveis e o papel segue no Windows Server 2025. Recomendação de substitutos em nuvem: Windows Autopatch / Intune (clientes) e Azure Update Manager (servidores)."
    ],
    "fontes": [
      {
        "label": "Microsoft Tech Community – WSUS deprecation",
        "url": "https://techcommunity.microsoft.com/blog/windows-itpro-blog/windows-server-update-services-wsus-deprecation/4250436"
      },
      {
        "label": "heise – WSUS continua no Server 2025",
        "url": "https://heise.de/-9944634"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** função do Windows Server que **baixa as atualizações da Microsoft e as distribui na rede interna**, deixando o administrador **aprovar/adiar** e escolher quais máquinas recebem.\n- ⚠️ **Status:** a Microsoft anunciou a **depreciação do WSUS em 20/09/2024** — **sem novos recursos**, mas as funções e o conteúdo **continuam disponíveis** e o papel **segue no Windows Server 2025**. Recomendação de substitutos em nuvem: **Windows Autopatch / Intune** (clientes) e **Azure Update Manager** (servidores).\n- **Conexões:** [[ataques-malware]] (gestão de patches) · [[cis-controls]] (gestão contínua de vulnerabilidades)\n- **Fontes:** [Microsoft Tech Community – WSUS deprecation](https://techcommunity.microsoft.com/blog/windows-itpro-blog/windows-server-update-services-wsus-deprecation/4250436) · [heise – WSUS continua no Server 2025](https://heise.de/-9944634)\n\n---"
  },
  {
    "id": "osi-tcpip",
    "aliasIds": [],
    "titulo": "Modelo OSI × arquitetura TCP/IP",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Arquiteta Vaswani",
    "npcRole": "engenheiro",
    "npcSeed": 1417081377,
    "oQueE": "*O ARP (descobre o MAC a partir do IP) fica \"entre\" camadas 2 e 3 — a classificação varia por autor.",
    "exemploPratico": "",
    "fatosChave": [
      "*O ARP (descobre o MAC a partir do IP) fica \"entre\" camadas 2 e 3 — a classificação varia por autor.",
      "TCP: orientado a conexão (3-way handshake: SYN → SYN-ACK → ACK), confiável, ordenado, controle de fluxo/congestionamento. UDP: sem conexão, sem garantia, leve (DNS, DHCP, SNMP, streaming).",
      "Comutação: circuitos (caminho dedicado — telefonia), pacotes (cada pacote segue seu caminho — IP), células (pacotes de tamanho fixo, ex.: ATM com células de 53 bytes).",
      "Abrangência: PAN/WPAN (pessoal, Bluetooth) → LAN/WLAN (local) → MAN/WMAN (metropolitana) → WAN/WWAN (longa distância)."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Conteúdo clássico (Tanenbaum/Kurose)."
    ],
    "fontes": [],
    "tablePairs": [
      {
        "term": "7 Aplicação · 6 Apresentação · 5 Sessão",
        "definition": "TCP/IP (4): Aplicação · Exemplos: HTTP, DNS, SMTP, SSH, LDAP, SNMP · Unidade: dados/mensagem",
        "rawRow": "7 Aplicação · 6 Apresentação · 5 Sessão — Aplicação — HTTP, DNS, SMTP, SSH, LDAP, SNMP — dados/mensagem"
      },
      {
        "term": "4 Transporte",
        "definition": "TCP/IP (4): Transporte · Exemplos: TCP, UDP · Unidade: segmento (TCP) / datagrama (UDP)",
        "rawRow": "4 Transporte — Transporte — TCP, UDP — segmento (TCP) / datagrama (UDP)"
      },
      {
        "term": "3 Rede",
        "definition": "TCP/IP (4): Internet · Exemplos: IP, ICMP, IPSec · Unidade: pacote",
        "rawRow": "3 Rede — Internet — IP, ICMP, IPSec — pacote"
      },
      {
        "term": "2 Enlace · 1 Física",
        "definition": "TCP/IP (4): Acesso à rede · Exemplos: Ethernet (802.3), Wi-Fi (802.11), ARP* · Unidade: quadro / bits",
        "rawRow": "2 Enlace · 1 Física — Acesso à rede — Ethernet (802.3), Wi-Fi (802.11), ARP* — quadro / bits"
      }
    ],
    "textoCompleto": "| OSI (7) | TCP/IP (4) | Exemplos | Unidade |\n| --- | --- | --- | --- |\n| 7 Aplicação · 6 Apresentação · 5 Sessão | **Aplicação** | HTTP, DNS, SMTP, SSH, LDAP, SNMP | dados/mensagem |\n| 4 Transporte | **Transporte** | **TCP**, **UDP** | segmento (TCP) / datagrama (UDP) |\n| 3 Rede | **Internet** | **IP**, ICMP, **IPSec** | pacote |\n| 2 Enlace · 1 Física | **Acesso à rede** | Ethernet (802.3), Wi-Fi (802.11), ARP* | quadro / bits |\n\n- *O **ARP** (descobre o MAC a partir do IP) fica \"entre\" camadas 2 e 3 — a classificação varia por autor.\n- **TCP:** orientado a conexão (**3-way handshake**: SYN → SYN-ACK → ACK), confiável, ordenado, controle de fluxo/congestionamento. **UDP:** sem conexão, sem garantia, leve (DNS, DHCP, SNMP, streaming).\n- **Comutação:** **circuitos** (caminho dedicado — telefonia), **pacotes** (cada pacote segue seu caminho — IP), **células** (pacotes de **tamanho fixo**, ex.: ATM com células de 53 bytes).\n- **Abrangência:** PAN/WPAN (pessoal, Bluetooth) → LAN/WLAN (local) → MAN/WMAN (metropolitana) → WAN/WWAN (longa distância).\n- ⚠️ Conteúdo clássico (Tanenbaum/Kurose)."
  },
  {
    "id": "ip-enderecamento",
    "aliasIds": [],
    "titulo": "IPv4, IPv6, CIDR e NAT",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Alpinista Tanenbaum II",
    "npcRole": "sabio",
    "npcSeed": 609639391,
    "oQueE": "IPv4: 32 bits (ex.: 192.168.10.25). Privados (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
    "exemploPratico": "Exemplo: rede do fórum 10.4.20.0/23 → 512 endereços, 510 hosts.",
    "fatosChave": [
      "IPv4: 32 bits (ex.: 192.168.10.25). Privados (RFC 1918): 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16.",
      "CIDR (🔵): notação /n = quantos bits são rede. /24 → 256 endereços (254 hosts úteis); /26 → 64 (62 úteis). Fórmula: hosts úteis = 2^(32−n) − 2.",
      "NAT (🔵): traduz endereços privados em público(s) na saída para a internet (PAT/NAT overload = vários IPs internos num IP público via portas).",
      "IPv6: 128 bits, hexadecimal em 8 grupos (2001:db8::1 — :: comprime zeros, só uma vez). Sem broadcast (usa multicast/anycast); autoconfiguração (SLAAC); cabeçalho simplificado com cabeçalhos de extensão; NDP substitui o ARP."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Faixas privadas e tamanhos são padronizados em RFCs (1918, 8200); conferir se a banca pedir número de RFC."
    ],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- **IPv4:** 32 bits (ex.: `192.168.10.25`). **Privados (RFC 1918):** `10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`.\n- **CIDR (🔵):** notação `/n` = quantos bits são rede. `/24` → 256 endereços (254 hosts úteis); `/26` → 64 (62 úteis). Fórmula: **hosts úteis = 2^(32−n) − 2**.\n- **NAT (🔵):** traduz endereços privados em público(s) na saída para a internet (PAT/NAT overload = vários IPs internos num IP público via portas).\n- **IPv6:** **128 bits**, hexadecimal em 8 grupos (`2001:db8::1` — `::` comprime zeros, só uma vez). Sem broadcast (usa **multicast**/anycast); autoconfiguração (**SLAAC**); cabeçalho simplificado com cabeçalhos de extensão; NDP substitui o ARP.\n- **Exemplo:** rede do fórum `10.4.20.0/23` → 512 endereços, 510 hosts.\n- ⚠️ Faixas privadas e tamanhos são padronizados em RFCs (1918, 8200); conferir se a banca pedir número de RFC."
  },
  {
    "id": "protocolos",
    "aliasIds": [],
    "titulo": "Protocolos e portas (as que mais caem)",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Engenheiro Cerf II",
    "npcRole": "engenheiro",
    "npcSeed": 1394043801,
    "oQueE": "DNS – registros: A (IPv4), AAAA (IPv6), CNAME (apelido), MX (servidor de e-mail), NS (servidor autoritativo), PTR (reverso IP → nome), SOA (autoridade da zona), TXT (texto, ex.: SPF). No Brasil, o registro de domínios .br é feito pelo Registro.br (NIC.br).",
    "exemploPratico": "",
    "fatosChave": [
      "DNS – registros: A (IPv4), AAAA (IPv6), CNAME (apelido), MX (servidor de e-mail), NS (servidor autoritativo), PTR (reverso IP → nome), SOA (autoridade da zona), TXT (texto, ex.: SPF). No Brasil, o registro de domínios .br é feito pelo Registro.br (NIC.br).",
      "IPSec (RFC 4301): segurança na camada de rede. AH = autenticação/integridade (sem cifrar); ESP = cifra + integridade. Modo transporte (protege só a carga) × modo túnel (encapsula o pacote inteiro — VPN site-a-site). Chaves via IKE."
    ],
    "conexoes": [
      "tls",
      "vpn-ztna",
      "active-directory",
      "keycloak-sso"
    ],
    "avisosOraculo": [
      "Portas = registro IANA (conhecimento consolidado); fonte específica não anexada nesta rodada."
    ],
    "fontes": [],
    "tablePairs": [
      {
        "term": "FTP",
        "definition": "Porta (padrão): 20 (dados) / 21 (controle) · Função: transferência de arquivos",
        "rawRow": "FTP — 20 (dados) / 21 (controle) — transferência de arquivos"
      },
      {
        "term": "SSH",
        "definition": "Porta (padrão): 22 · Função: acesso remoto cifrado (substitui Telnet 23)",
        "rawRow": "SSH — 22 — acesso remoto cifrado (substitui Telnet 23)"
      },
      {
        "term": "SMTP",
        "definition": "Porta (padrão): 25 (587 submissão) · Função: envio de e-mail",
        "rawRow": "SMTP — 25 (587 submissão) — envio de e-mail"
      },
      {
        "term": "DNS",
        "definition": "Porta (padrão): 53 (UDP e TCP) · Função: nomes → IPs",
        "rawRow": "DNS — 53 (UDP e TCP) — nomes → IPs"
      },
      {
        "term": "DHCP",
        "definition": "Porta (padrão): 67 servidor / 68 cliente (UDP) · Função: configuração automática de IP — DORA: Discover, Offer, Request, Ack",
        "rawRow": "DHCP — 67 servidor / 68 cliente (UDP) — configuração automática de IP — DORA: Discover, Offer, Request, Ack"
      },
      {
        "term": "HTTP / HTTPS",
        "definition": "Porta (padrão): 80 / 443 · Função: web (HTTPS = HTTP sobre TLS)",
        "rawRow": "HTTP / HTTPS — 80 / 443 — web (HTTPS = HTTP sobre TLS)"
      },
      {
        "term": "POP3",
        "definition": "Porta (padrão): 110 (995 com TLS) · Função: baixa e-mail (normalmente remove do servidor)",
        "rawRow": "POP3 — 110 (995 com TLS) — baixa e-mail (normalmente remove do servidor)"
      },
      {
        "term": "IMAP",
        "definition": "Porta (padrão): 143 (993 com TLS) · Função: acessa e-mail mantendo no servidor (sincroniza pastas)",
        "rawRow": "IMAP — 143 (993 com TLS) — acessa e-mail mantendo no servidor (sincroniza pastas)"
      },
      {
        "term": "SNMP",
        "definition": "Porta (padrão): 161 (agente) / 162 (traps) — UDP · Função: gerência de rede",
        "rawRow": "SNMP — 161 (agente) / 162 (traps) — UDP — gerência de rede"
      },
      {
        "term": "LDAP",
        "definition": "Porta (padrão): 389 (636 LDAPS) · Função: consulta a diretório (AD)",
        "rawRow": "LDAP — 389 (636 LDAPS) — consulta a diretório (AD)"
      }
    ],
    "textoCompleto": "| Protocolo | Porta (padrão) | Função |\n| --- | --- | --- |\n| FTP | 20 (dados) / 21 (controle) | transferência de arquivos |\n| **SSH** | 22 | acesso remoto **cifrado** (substitui Telnet 23) |\n| **SMTP** | 25 (587 submissão) | **envio** de e-mail |\n| **DNS** | 53 (UDP e TCP) | nomes → IPs |\n| **DHCP** | 67 servidor / 68 cliente (UDP) | configuração automática de IP — **DORA**: Discover, Offer, Request, Ack |\n| **HTTP / HTTPS** | 80 / 443 | web (HTTPS = HTTP sobre TLS) |\n| **POP3** | 110 (995 com TLS) | **baixa** e-mail (normalmente remove do servidor) |\n| **IMAP** | 143 (993 com TLS) | acessa e-mail **mantendo no servidor** (sincroniza pastas) |\n| **SNMP** | 161 (agente) / 162 (traps) — UDP | gerência de rede |\n| **LDAP** | 389 (636 LDAPS) | consulta a diretório (AD) |\n\n- **DNS – registros:** **A** (IPv4), **AAAA** (IPv6), **CNAME** (apelido), **MX** (servidor de e-mail), **NS** (servidor autoritativo), **PTR** (reverso IP → nome), **SOA** (autoridade da zona), **TXT** (texto, ex.: SPF). No Brasil, o registro de domínios `.br` é feito pelo **Registro.br (NIC.br)**.\n- **IPSec (RFC 4301):** segurança na **camada de rede**. **AH** = autenticação/integridade (sem cifrar); **ESP** = cifra + integridade. **Modo transporte** (protege só a carga) × **modo túnel** (encapsula o pacote inteiro — VPN site-a-site). Chaves via **IKE**.\n- **Conexões:** [[tls]] (HTTPS, LDAPS, IMAPS) · [[vpn-ztna]] (IPSec) · [[active-directory]] (LDAP, DNS, Kerberos) · [[keycloak-sso]] (federação LDAP)\n- ⚠️ Portas = registro IANA (conhecimento consolidado); fonte específica não anexada nesta rodada."
  },
  {
    "id": "equipamentos-rede",
    "aliasIds": [],
    "titulo": "Equipamentos de interconexão",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Vigia Radia II",
    "npcRole": "sabio",
    "npcSeed": 1352977927,
    "oQueE": "Repetidor / hub: Camada: 1 · O que faz: regenera sinal / repete para todas as portas (um domínio de colisão) | Bridge / switch: Camada: 2 · O que faz: encaminha por endereço MAC; cada porta = domínio de colisão separado",
    "exemploPratico": "",
    "fatosChave": [],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [
      {
        "term": "Repetidor / hub",
        "definition": "Camada: 1 · O que faz: regenera sinal / repete para todas as portas (um domínio de colisão)",
        "rawRow": "Repetidor / hub — 1 — regenera sinal / repete para todas as portas (um domínio de colisão)"
      },
      {
        "term": "Bridge / switch",
        "definition": "Camada: 2 · O que faz: encaminha por endereço MAC; cada porta = domínio de colisão separado",
        "rawRow": "Bridge / switch — 2 — encaminha por endereço MAC; cada porta = domínio de colisão separado"
      },
      {
        "term": "Roteador",
        "definition": "Camada: 3 · O que faz: encaminha por IP entre redes; separa domínios de broadcast",
        "rawRow": "Roteador — 3 — encaminha por IP entre redes; separa domínios de broadcast"
      },
      {
        "term": "Gateway",
        "definition": "Camada: 3 a 7 · O que faz: \"porta de saída\"/tradução entre redes ou protocolos diferentes",
        "rawRow": "Gateway — 3 a 7 — \"porta de saída\"/tradução entre redes ou protocolos diferentes"
      },
      {
        "term": "Switch camada 3",
        "definition": "Camada: 2+3 · O que faz: comuta e roteia (inter-VLAN)",
        "rawRow": "Switch camada 3 — 2+3 — comuta e roteia (inter-VLAN)"
      }
    ],
    "textoCompleto": "| Equipamento | Camada | O que faz |\n| --- | --- | --- |\n| **Repetidor / hub** | 1 | regenera sinal / repete para **todas** as portas (um domínio de colisão) |\n| **Bridge / switch** | 2 | encaminha por **endereço MAC**; cada porta = domínio de colisão separado |\n| **Roteador** | 3 | encaminha por **IP** entre redes; separa domínios de **broadcast** |\n| **Gateway** | 3 a 7 | \"porta de saída\"/tradução entre redes ou protocolos diferentes |\n| Switch camada 3 | 2+3 | comuta e roteia (inter-VLAN) |"
  },
  {
    "id": "vlan-stp",
    "aliasIds": [],
    "titulo": "VLAN (802.1Q), 802.1X, 802.3 e Spanning Tree ( STP/RSTP)",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Guia Kurose II",
    "npcRole": "engenheiro",
    "npcSeed": 254352852,
    "oQueE": "VLAN – IEEE 802.1Q: divide um switch físico em redes lógicas separadas (broadcast isolado); a tag 802.1Q no quadro identifica a VLAN em links trunk. Comunicação entre VLANs exige roteamento.",
    "exemploPratico": "",
    "fatosChave": [
      "VLAN – IEEE 802.1Q: divide um switch físico em redes lógicas separadas (broadcast isolado); a tag 802.1Q no quadro identifica a VLAN em links trunk. Comunicação entre VLANs exige roteamento.",
      "IEEE 802.1X: controle de acesso por porta (cabeada ou Wi-Fi): suplicante → autenticador (switch/AP) → servidor de autenticação (RADIUS), com EAP. Base do NAC.",
      "IEEE 802.3: família Ethernet (Fast Ethernet 100 Mb/s, Gigabit, 10 GbE…).",
      "🟣 STP (IEEE 802.1D): evita loops em redes comutadas elegendo uma root bridge e bloqueando caminhos redundantes. Estados: disabled, blocking, listening, learning, forwarding; reconvergência ~30–50 s.",
      "🟣 RSTP (IEEE 802.1w): evolução rápida (convergência em ~1 s). Só 3 estados: discarding (junta disabled + blocking + listening), learning, forwarding. Papéis: root, designated, alternate e backup. Hoje incorporado ao 802.1D-2004."
    ],
    "conexoes": [
      "wifi-seguranca"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Cisco – Understand RSTP (802.1w)",
        "url": "https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html"
      },
      {
        "label": "Global Knowledge – RSTP",
        "url": "https://www.globalknowledge.com/en-us/resources/articles/rapid-spanning-tree"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **VLAN – IEEE 802.1Q:** divide um switch físico em redes **lógicas** separadas (broadcast isolado); a **tag 802.1Q** no quadro identifica a VLAN em links **trunk**. Comunicação entre VLANs exige **roteamento**.\n- **IEEE 802.1X:** controle de acesso **por porta** (cabeada ou Wi-Fi): suplicante → autenticador (switch/AP) → servidor de autenticação (**RADIUS**), com **EAP**. Base do **NAC**.\n- **IEEE 802.3:** família **Ethernet** (Fast Ethernet 100 Mb/s, Gigabit, 10 GbE…).\n- 🟣 **STP (IEEE 802.1D):** evita **loops** em redes comutadas elegendo uma **root bridge** e bloqueando caminhos redundantes. Estados: **disabled, blocking, listening, learning, forwarding**; reconvergência ~**30–50 s**.\n- 🟣 **RSTP (IEEE 802.1w):** evolução **rápida** (convergência em ~1 s). Só **3 estados**: **discarding** (junta disabled + blocking + listening), **learning**, **forwarding**. Papéis: root, designated, **alternate** e **backup**. Hoje incorporado ao 802.1D-2004.\n- **Fontes:** [Cisco – Understand RSTP (802.1w)](https://www.cisco.com/c/en/us/support/docs/lan-switching/spanning-tree-protocol/24062-146.html) · [Global Knowledge – RSTP](https://www.globalknowledge.com/en-us/resources/articles/rapid-spanning-tree)"
  },
  {
    "id": "cabeamento",
    "aliasIds": [],
    "titulo": "Cabeamento estruturado ( ABNT NBR 14565:2019) e fibras",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Mestre Coffman II",
    "npcRole": "mago",
    "npcSeed": 457827212,
    "oQueE": "NBR 14565:2019 (5ª edição, 30/09/2019): requisitos de cabeamento estruturado metálico e óptico para um edifício ou conjunto de edifícios comerciais em um campus. Baseada na ISO/IEC 11801. (Data centers → NBR 16665; residencial → NBR 16264.)",
    "exemploPratico": "",
    "fatosChave": [
      "NBR 14565:2019 (5ª edição, 30/09/2019): requisitos de cabeamento estruturado metálico e óptico para um edifício ou conjunto de edifícios comerciais em um campus. Baseada na ISO/IEC 11801. (Data centers → NBR 16665; residencial → NBR 16264.)",
      "3 subsistemas: backbone de campus, backbone de edifício e cabeamento horizontal. Elementos: distribuidor de campus (CD), distribuidor de edifício (BD), distribuidor de piso (FD), ponto de consolidação (CP), tomada de telecomunicações (TO); o equipamento terminal (TE) não faz parte do escopo.",
      "Categorias de par trançado (banda): Cat 5e = 100 MHz · Cat 6 = 250 MHz · Cat 6A = 500 MHz (10GBASE-T).",
      "Fibra óptica: monomodo (núcleo fino ~9 µm, um modo de luz, longas distâncias, laser) × multimodo (núcleo ~50/62,5 µm, vários modos, distâncias curtas, LED/VCSEL, mais barata)."
    ],
    "conexoes": [],
    "avisosOraculo": [
      "Há notícia de uma NBR 14565 de 11/2025 (nova edição); o edital cobra a 2019."
    ],
    "fontes": [
      {
        "label": "Normas.com.br – NBR 14565 (escopo)",
        "url": "https://www.normas.com.br/visualizar/abnt-nbr-nm/20583/abnt-nbr14565-cabeamento-estruturado"
      },
      {
        "label": "O Setor Elétrico – normas e categorias",
        "url": "https://www.osetoreletrico.com.br/normas-para-cabeamento-estruturado/"
      },
      {
        "label": "IFRN – 3 subsistemas",
        "url": "https://docentes.ifrn.edu.br/rodrigotertulino/disciplinas/2016.2/arquitetura-de-redes-de-computadores/normas-para-cabeamento-estruturado/normas-para-cabeamento-estruturado"
      },
      {
        "label": "Gran – questões NBR 14565",
        "url": "https://questoes.grancursosonline.com.br/questoes-de-concursos/legislacao-dos-orgaos-nbr-14565-abnt-395909"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **NBR 14565:2019 (5ª edição, 30/09/2019):** requisitos de cabeamento estruturado **metálico e óptico** para **um edifício ou conjunto de edifícios comerciais em um campus**. Baseada na **ISO/IEC 11801**. (Data centers → NBR 16665; residencial → NBR 16264.)\n- **3 subsistemas:** **backbone de campus**, **backbone de edifício** e **cabeamento horizontal**. Elementos: distribuidor de campus (CD), distribuidor de edifício (BD), distribuidor de piso (FD), ponto de consolidação (CP), **tomada de telecomunicações (TO)**; o **equipamento terminal (TE) não faz parte** do escopo.\n- **Categorias de par trançado (banda):** Cat 5e = 100 MHz · **Cat 6 = 250 MHz** · **Cat 6A = 500 MHz** (10GBASE-T).\n- ⚠️ Há notícia de uma **NBR 14565 de 11/2025** (nova edição); o edital cobra a **2019**.\n- **Fibra óptica:** **monomodo** (núcleo fino ~9 µm, um modo de luz, **longas distâncias**, laser) × **multimodo** (núcleo ~50/62,5 µm, vários modos, **distâncias curtas**, LED/VCSEL, mais barata).\n- **Fontes:** [Normas.com.br – NBR 14565 (escopo)](https://www.normas.com.br/visualizar/abnt-nbr-nm/20583/abnt-nbr14565-cabeamento-estruturado) · [O Setor Elétrico – normas e categorias](https://www.osetoreletrico.com.br/normas-para-cabeamento-estruturado/) · [IFRN – 3 subsistemas](https://docentes.ifrn.edu.br/rodrigotertulino/disciplinas/2016.2/arquitetura-de-redes-de-computadores/normas-para-cabeamento-estruturado/normas-para-cabeamento-estruturado) · [Gran – questões NBR 14565](https://questoes.grancursosonline.com.br/questoes-de-concursos/legislacao-dos-orgaos-nbr-14565-abnt-395909)"
  },
  {
    "id": "ieee-80211",
    "aliasIds": [],
    "titulo": "Wi-Fi: família IEEE 802.11 ( ênfase ac/ax/be; ênfase ax/6E)",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "ambos",
    "npcName": "Sábia Stallings II",
    "npcRole": "sabio",
    "npcSeed": 2026524244,
    "oQueE": "Pegadinha: Wi-Fi 6 e 6E são o mesmo padrão 802.11ax — o \"E\" é a banda de 6 GHz.",
    "exemploPratico": "",
    "fatosChave": [
      "Pegadinha: Wi-Fi 6 e 6E são o mesmo padrão 802.11ax — o \"E\" é a banda de 6 GHz.",
      "Segurança: WPA3 (ver wifi-seguranca)."
    ],
    "conexoes": [
      "wifi-seguranca"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "HPE Aruba – Wi-Fi 7 features",
        "url": "https://arubanetworking.hpe.com/techdocs/aos/wifi-design-deploy/generations/wifi7/feature-benefit/"
      },
      {
        "label": "Intel – What is Wi-Fi 7",
        "url": "https://intel.com/content/www/us/en/products/docs/wireless/wi-fi-7.html"
      },
      {
        "label": "HPE – Wi-Fi 7",
        "url": "https://www.hpe.com/ie/en/what-is/wi-fi-7.html"
      }
    ],
    "tablePairs": [
      {
        "term": "Wi-Fi 4",
        "definition": "Padrão: 802.11n · Bandas: 2,4 e 5 GHz · Destaques: MIMO",
        "rawRow": "Wi-Fi 4 — 802.11n — 2,4 e 5 GHz — MIMO"
      },
      {
        "term": "Wi-Fi 5",
        "definition": "Padrão: 802.11ac · Bandas: 5 GHz · Destaques: 256-QAM, MU-MIMO (downlink), canais até 160 MHz",
        "rawRow": "Wi-Fi 5 — 802.11ac — 5 GHz — 256-QAM, MU-MIMO (downlink), canais até 160 MHz"
      },
      {
        "term": "Wi-Fi 6",
        "definition": "Padrão: 802.11ax · Bandas: 2,4 e 5 GHz · Destaques: OFDMA, 1024-QAM, MU-MIMO up/down, TWT (economia de energia)",
        "rawRow": "Wi-Fi 6 — 802.11ax — 2,4 e 5 GHz — OFDMA, 1024-QAM, MU-MIMO up/down, TWT (economia de energia)"
      },
      {
        "term": "Wi-Fi 6E",
        "definition": "Padrão: 802.11ax · Bandas: 6 GHz · Destaques: mesma tecnologia do 6, mas abre a faixa de 6 GHz (até 1200 MHz de espectro extra)",
        "rawRow": "Wi-Fi 6E — 802.11ax — 6 GHz — mesma tecnologia do 6, mas abre a faixa de 6 GHz (até 1200 MHz de espectro extra)"
      },
      {
        "term": "Wi-Fi 7",
        "definition": "Padrão: 802.11be · Bandas: 2,4, 5 e 6 GHz · Destaques: canais de 320 MHz, 4096-QAM (4K-QAM), MLO (Multi-Link Operation), puncturing",
        "rawRow": "Wi-Fi 7 — 802.11be — 2,4, 5 e 6 GHz — canais de 320 MHz, 4096-QAM (4K-QAM), MLO (Multi-Link Operation), puncturing"
      }
    ],
    "textoCompleto": "| Geração | Padrão | Bandas | Destaques |\n| --- | --- | --- | --- |\n| Wi-Fi 4 | 802.11n | 2,4 e 5 GHz | MIMO |\n| **Wi-Fi 5** | **802.11ac** | **5 GHz** | 256-QAM, MU-MIMO (downlink), canais até 160 MHz |\n| **Wi-Fi 6** | **802.11ax** | 2,4 e 5 GHz | **OFDMA**, **1024-QAM**, MU-MIMO up/down, TWT (economia de energia) |\n| **Wi-Fi 6E** | **802.11ax** | **6 GHz** | mesma tecnologia do 6, mas abre a faixa de **6 GHz** (até 1200 MHz de espectro extra) |\n| **Wi-Fi 7** | **802.11be** | 2,4, 5 e 6 GHz | canais de **320 MHz**, **4096-QAM (4K-QAM)**, **MLO (Multi-Link Operation)**, *puncturing* |\n\n- **Pegadinha:** Wi-Fi 6 **e** 6E são o **mesmo padrão 802.11ax** — o \"E\" é a banda de 6 GHz.\n- **Segurança:** WPA3 (ver [[wifi-seguranca]]).\n- **Fontes:** [HPE Aruba – Wi-Fi 7 features](https://arubanetworking.hpe.com/techdocs/aos/wifi-design-deploy/generations/wifi7/feature-benefit/) · [Intel – What is Wi-Fi 7](https://intel.com/content/www/us/en/products/docs/wireless/wi-fi-7.html) · [HPE – Wi-Fi 7](https://www.hpe.com/ie/en/what-is/wi-fi-7.html)\n\n---"
  },
  {
    "id": "servicos-rede",
    "aliasIds": [],
    "titulo": "Serviços de rede e servidores (e-mail, DNS, DHCP, proxy; JBoss/WildFly; Apache; IIS)",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "analista",
    "npcName": "Explorador Shannon II",
    "npcRole": "mago",
    "npcSeed": 678970028,
    "oQueE": "E-mail: SMTP envia/transfere entre servidores; POP3/IMAP recebem. DNS resolve nomes (recursivo × autoritativo, cache/TTL). DHCP entrega IP, máscara, gateway, DNS (concessão/lease). Web proxy intermedeia a navegação (cache, filtro, log).",
    "exemploPratico": "",
    "fatosChave": [
      "E-mail: SMTP envia/transfere entre servidores; POP3/IMAP recebem. DNS resolve nomes (recursivo × autoritativo, cache/TTL). DHCP entrega IP, máscara, gateway, DNS (concessão/lease). Web proxy intermedeia a navegação (cache, filtro, log).",
      "JBoss EAP × WildFly: WildFly (antes \"JBoss AS\", renomeado em 2014) é o projeto comunitário/upstream; o JBoss EAP é a versão comercial com suporte da Red Hat, construída sobre o WildFly (servidor de aplicação Jakarta EE + MicroProfile). Em 2025 a participação da Red Hat no WildFly foi transferida para a IBM, mas o EAP continua sendo vendido pela Red Hat, no modelo upstream-first.",
      "Apache HTTP Server: servidor web open source (Apache Software Foundation), configurado por httpd.conf, módulos (mod_ssl, mod_proxy — pode atuar como proxy reverso), virtual hosts.",
      "IIS (Internet Information Services): servidor web da Microsoft para Windows Server (sites, application pools, ASP.NET).",
      "Logs e administração: logs de acesso/erro (Apache access_log/error_log), gerenciamento de usuários, análise de desempenho."
    ],
    "conexoes": [
      "jakarta-ee",
      "proxy-reverso",
      "servidor-web-aplicacao",
      "monitoramento"
    ],
    "avisosOraculo": [
      "Descrições de Apache/IIS e serviços são gerais; anexar documentação oficial (httpd.apache.org, learn.microsoft.com/iis) na revisão."
    ],
    "fontes": [
      {
        "label": "WildFly – Red Hat's middleware strategy (2025)",
        "url": "https://www.wildfly.org/news/2025/03/05/WildFly-and-Red-Hat-s-middleware-strategy/"
      },
      {
        "label": "Red Hat Developers – JBoss EAP",
        "url": "https://developers.redhat.com/products/eap/overview"
      },
      {
        "label": "Red Hat – EAP × WildFly versions",
        "url": "https://access.redhat.com/node/7107499"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **E-mail:** SMTP **envia/transfere** entre servidores; POP3/IMAP **recebem**. **DNS** resolve nomes (recursivo × autoritativo, cache/TTL). **DHCP** entrega IP, máscara, gateway, DNS (concessão/*lease*). **Web proxy** intermedeia a navegação (cache, filtro, log).\n- **JBoss EAP × WildFly:** **WildFly** (antes \"JBoss AS\", renomeado em **2014**) é o projeto **comunitário/upstream**; o **JBoss EAP** é a versão **comercial com suporte da Red Hat**, construída **sobre o WildFly** (servidor de aplicação **Jakarta EE + MicroProfile**). Em 2025 a participação da Red Hat no WildFly foi **transferida para a IBM**, mas o EAP continua sendo vendido pela Red Hat, no modelo *upstream-first*.\n- **Apache HTTP Server:** servidor web open source (Apache Software Foundation), configurado por `httpd.conf`, **módulos** (`mod_ssl`, `mod_proxy` — pode atuar como **proxy reverso**), **virtual hosts**.\n- **IIS (Internet Information Services):** servidor web da Microsoft para Windows Server (sites, *application pools*, ASP.NET).\n- **Logs e administração:** logs de acesso/erro (Apache `access_log`/`error_log`), gerenciamento de usuários, análise de desempenho.\n- **Conexões:** [[jakarta-ee]] · [[proxy-reverso]] · [[servidor-web-aplicacao]] · [[monitoramento]]\n- **Fontes:** [WildFly – Red Hat's middleware strategy (2025)](https://www.wildfly.org/news/2025/03/05/WildFly-and-Red-Hat-s-middleware-strategy/) · [Red Hat Developers – JBoss EAP](https://developers.redhat.com/products/eap/overview) · [Red Hat – EAP × WildFly versions](https://access.redhat.com/node/7107499)\n- ⚠️ Descrições de Apache/IIS e serviços são gerais; anexar documentação oficial (httpd.apache.org, learn.microsoft.com/iis) na revisão."
  },
  {
    "id": "snmp-gerencia",
    "aliasIds": [],
    "titulo": "Gerenciamento de redes: SNMP, QoS e métricas ( noções)",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "analista",
    "npcName": "Guardiã Hopper II",
    "npcRole": "mago",
    "npcSeed": 1895247860,
    "oQueE": "SNMP: protocolo de camada de aplicação sobre UDP. Gerente (estação de monitoramento) consulta agentes (nos equipamentos) na porta 161; agentes mandam traps (notificações assíncronas) ao gerente na porta 162. INFORM = trap com confirmação.",
    "exemploPratico": "",
    "fatosChave": [
      "SNMP: protocolo de camada de aplicação sobre UDP. Gerente (estação de monitoramento) consulta agentes (nos equipamentos) na porta 161; agentes mandam traps (notificações assíncronas) ao gerente na porta 162. INFORM = trap com confirmação.",
      "MIB (Management Information Base): a \"base de perguntas\" — objetos identificados por OID (ex.: MIB-II, RFC 1213).",
      "Operações: Get, GetNext, GetBulk, Set, Trap, Inform.",
      "Versões: v1 e v2c usam community string (texto claro, fraco); SNMPv3 (RFC 3411–3418) traz USM (autenticação + privacidade/cifra) e VACM (controle de acesso por visão).",
      "QoS: tratar tráfegos de forma diferente (prioridade para voz/vídeo) — marcação (DSCP), filas, policiamento/shaping. SLA = nível de serviço acordado.",
      "Métricas de desempenho: largura de banda, vazão (throughput), latência (atraso), jitter (variação do atraso), perda de pacotes, disponibilidade."
    ],
    "conexoes": [
      "itil",
      "ingles-vocabulario"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "RFC 3414 – USM para SNMPv3",
        "url": "https://www.rfc-editor.org/rfc/rfc3414"
      },
      {
        "label": "NSRC – SNMP (gerente/agente, portas)",
        "url": "https://www.nsrc.org/workshops/2015/wacren-nmm/raw-attachment/wiki/Agenda/snmp.pdf"
      },
      {
        "label": "IBM – SNMPv3 USM",
        "url": "https://www.ibm.com/docs/SSLTBW_2.1.0/com.ibm.zos.v2r1.halz002/snmp_security_user_based.htm"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **SNMP:** protocolo de **camada de aplicação** sobre **UDP**. **Gerente** (estação de monitoramento) consulta **agentes** (nos equipamentos) na **porta 161**; agentes mandam **traps** (notificações assíncronas) ao gerente na **porta 162**. **INFORM** = trap **com confirmação**.\n  - **MIB (Management Information Base):** a \"base de perguntas\" — objetos identificados por **OID** (ex.: MIB-II, RFC 1213).\n  - Operações: **Get, GetNext, GetBulk, Set, Trap, Inform**.\n  - **Versões:** v1 e v2c usam **community string** (texto claro, fraco); **SNMPv3 (RFC 3411–3418)** traz **USM** (autenticação + **privacidade/cifra**) e **VACM** (controle de acesso por visão).\n- **QoS:** tratar tráfegos de forma diferente (prioridade para voz/vídeo) — marcação (DSCP), filas, policiamento/shaping. **SLA** = nível de serviço acordado.\n- **Métricas de desempenho:** **largura de banda**, **vazão (throughput)**, **latência (atraso)**, **jitter** (variação do atraso), **perda de pacotes**, disponibilidade.\n- **Fontes:** [RFC 3414 – USM para SNMPv3](https://www.rfc-editor.org/rfc/rfc3414) · [NSRC – SNMP (gerente/agente, portas)](https://www.nsrc.org/workshops/2015/wacren-nmm/raw-attachment/wiki/Agenda/snmp.pdf) · [IBM – SNMPv3 USM](https://www.ibm.com/docs/SSLTBW_2.1.0/com.ibm.zos.v2r1.halz002/snmp_security_user_based.htm)"
  },
  {
    "id": "monitoramento",
    "aliasIds": [],
    "titulo": "Zabbix, Prometheus, Grafana, ELK e Fluentd ( Técnico: ELK)",
    "zonaId": "11-redes-e-servicos",
    "regiaoId": "montanhas-da-infra",
    "materia": "Redes e Serviços",
    "cargo": "analista",
    "npcName": "Escultor Hinton II",
    "npcRole": "sabio",
    "npcSeed": 532472599,
    "oQueE": "ELK = Elasticsearch + Logstash + Kibana (🔵 Técnico cobra como \"ferramentas de busca, indexação e análise de dados\").",
    "exemploPratico": "Exemplo prático: Prometheus coleta métricas dos microsserviços Spring Boot (Actuator), Grafana mostra o painel; Fluentd/Logstash levam os logs ao Elasticsearch e o Kibana permite buscar o erro de um processo específico.",
    "fatosChave": [
      "ELK = Elasticsearch + Logstash + Kibana (🔵 Técnico cobra como \"ferramentas de busca, indexação e análise de dados\")."
    ],
    "conexoes": [
      "spring-boot",
      "docker",
      "protecao-perimetro",
      "res-cnj-396-2021"
    ],
    "avisosOraculo": [
      "Fluentd como \"unified logging layer/CNCF\" é descrição do próprio projeto (fluentd.org) — link oficial a anexar."
    ],
    "fontes": [
      {
        "label": "Prometheus – Overview",
        "url": "https://prometheus.io/docs/"
      },
      {
        "label": "PSU – Monitoring and Observability",
        "url": "https://web.cecs.pdx.edu/~dmcgrath/courses/Su26/secdevops/monitoring-and-observability.html"
      },
      {
        "label": "SigNoz – Zabbix × Prometheus",
        "url": "https://signoz.io/comparisons/zabbix-vs-prometheus/"
      }
    ],
    "tablePairs": [
      {
        "term": "Zabbix",
        "definition": "Papel: monitoramento de infraestrutura \"tudo em um\" · Ideia-chave: servidor central + agentes (modo passivo = servidor consulta; ativo = agente envia); também SNMP, IPMI, JMX; triggers e alertas",
        "rawRow": "Zabbix — monitoramento de infraestrutura \"tudo em um\" — servidor central + agentes (modo passivo = servidor consulta; ativo = agente envia); também SNMP, IPMI, JMX; triggers e alertas"
      },
      {
        "term": "Prometheus",
        "definition": "Papel: métricas em séries temporais · Ideia-chave: modelo pull via HTTP (raspa o endpoint /metrics); linguagem PromQL; dados com rótulos (labels); projeto CNCF graduado (2018); alertas via Alertmanager",
        "rawRow": "Prometheus — métricas em séries temporais — modelo pull via HTTP (raspa o endpoint /metrics); linguagem PromQL; dados com rótulos (labels); projeto CNCF graduado (2018); alertas via Alertmanager"
      },
      {
        "term": "Grafana",
        "definition": "Papel: visualização · Ideia-chave: dashboards sobre várias fontes (Prometheus, Elasticsearch, PostgreSQL…)",
        "rawRow": "Grafana — visualização — dashboards sobre várias fontes (Prometheus, Elasticsearch, PostgreSQL…)"
      },
      {
        "term": "Elasticsearch",
        "definition": "Papel: busca/indexação · Ideia-chave: armazena e indexa logs/documentos (JSON)",
        "rawRow": "Elasticsearch — busca/indexação — armazena e indexa logs/documentos (JSON)"
      },
      {
        "term": "Logstash",
        "definition": "Papel: pipeline · Ideia-chave: coleta, transforma e envia dados ao Elasticsearch",
        "rawRow": "Logstash — pipeline — coleta, transforma e envia dados ao Elasticsearch"
      },
      {
        "term": "Kibana",
        "definition": "Papel: visualização · Ideia-chave: interface de busca e dashboards do Elasticsearch",
        "rawRow": "Kibana — visualização — interface de busca e dashboards do Elasticsearch"
      },
      {
        "term": "Fluentd",
        "definition": "Papel: coletor de logs · Ideia-chave: \"camada unificada de logs\" (projeto CNCF), alternativa ao Logstash (stack EFK)",
        "rawRow": "Fluentd — coletor de logs — \"camada unificada de logs\" (projeto CNCF), alternativa ao Logstash (stack EFK)"
      }
    ],
    "textoCompleto": "| Ferramenta | Papel | Ideia-chave |\n| --- | --- | --- |\n| **Zabbix** | monitoramento de infraestrutura \"tudo em um\" | servidor central + **agentes** (modo **passivo** = servidor consulta; **ativo** = agente envia); também SNMP, IPMI, JMX; **triggers** e alertas |\n| **Prometheus** | métricas em **séries temporais** | modelo **pull** via HTTP (raspa o endpoint `/metrics`); linguagem **PromQL**; dados com **rótulos (labels)**; projeto **CNCF graduado** (2018); alertas via Alertmanager |\n| **Grafana** | **visualização** | dashboards sobre várias fontes (Prometheus, Elasticsearch, PostgreSQL…) |\n| **Elasticsearch** | busca/indexação | armazena e indexa logs/documentos (JSON) |\n| **Logstash** | pipeline | coleta, transforma e envia dados ao Elasticsearch |\n| **Kibana** | visualização | interface de busca e dashboards do Elasticsearch |\n| **Fluentd** | coletor de logs | \"camada unificada de logs\" (projeto CNCF), alternativa ao Logstash (stack **EFK**) |\n\n- **ELK = Elasticsearch + Logstash + Kibana** (🔵 Técnico cobra como \"ferramentas de busca, indexação e análise de dados\").\n- **Exemplo prático:** Prometheus coleta métricas dos microsserviços Spring Boot (Actuator), Grafana mostra o painel; Fluentd/Logstash levam os logs ao Elasticsearch e o Kibana permite buscar o erro de um processo específico.\n- **Conexões:** [[spring-boot]] · [[kubernetes]] · [[protecao-perimetro]] (SIEM usa logs) · [[res-cnj-396-2021]] (monitoramento contínuo)\n- **Fontes:** [Prometheus – Overview](https://prometheus.io/docs/) · [PSU – Monitoring and Observability](https://web.cecs.pdx.edu/~dmcgrath/courses/Su26/secdevops/monitoring-and-observability.html) · [SigNoz – Zabbix × Prometheus](https://signoz.io/comparisons/zabbix-vs-prometheus/)\n- ⚠️ Fluentd como \"unified logging layer/CNCF\" é descrição do próprio projeto (fluentd.org) — link oficial a anexar.\n\n---"
  },
  {
    "id": "machine-learning",
    "aliasIds": [],
    "titulo": "Aprendizado de máquina (ML)",
    "zonaId": "13-ia-e-nuvem",
    "regiaoId": "montanhas-da-infra",
    "materia": "IA e Computação em Nuvem",
    "cargo": "analista",
    "npcName": "Arquiteta Vaswani II",
    "npcRole": "engenheiro",
    "npcSeed": 1866589959,
    "oQueE": "O que é (Google ML Crash Course): treinar um software — o modelo — para fazer previsões ou gerar conteúdo a partir de dados.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é (Google ML Crash Course): treinar um software — o modelo — para fazer previsões ou gerar conteúdo a partir de dados.",
      "Supervisionado: aprende com dados rotulados (já com a resposta certa). Usos clássicos: regressão (prever número — ex.: tempo de tramitação) e classificação (prever categoria — ex.: assunto de uma petição).",
      "Não supervisionado: dados sem rótulo; acha padrões, típico clustering (agrupar processos parecidos). O modelo não sabe o que cada grupo \"significa\" — quem interpreta é a pessoa.",
      "Por reforço: um agente age num ambiente e aprende por recompensas/penalidades (ex.: robôs, AlphaGo).",
      "IA generativa: cria conteúdo novo (texto, imagem, música) aprendendo padrões dos dados existentes.",
      "Termos que caem: features (atributos de entrada), label (rótulo), treino × validação × teste, overfitting (decorou o treino, vai mal em dado novo) × underfitting, métricas (acurácia, precisão, recall)."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Google – What is Machine Learning?",
        "url": "https://developers.google.com/machine-learning/intro-to-ml/what-is-ml?authuser=1"
      },
      {
        "label": "Google – ML Glossary",
        "url": "https://developers.google.com/machine-learning/glossary/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é (Google ML Crash Course):** treinar um software — o **modelo** — para **fazer previsões ou gerar conteúdo a partir de dados**.\n- **Categorias:**\n  - **Supervisionado:** aprende com dados **rotulados** (já com a resposta certa). Usos clássicos: **regressão** (prever número — ex.: tempo de tramitação) e **classificação** (prever categoria — ex.: assunto de uma petição).\n  - **Não supervisionado:** dados **sem rótulo**; acha padrões, típico **clustering** (agrupar processos parecidos). O modelo não sabe o que cada grupo \"significa\" — quem interpreta é a pessoa.\n  - **Por reforço:** um **agente** age num ambiente e aprende por **recompensas/penalidades** (ex.: robôs, AlphaGo).\n  - **IA generativa:** **cria conteúdo novo** (texto, imagem, música) aprendendo padrões dos dados existentes.\n- **Termos que caem:** *features* (atributos de entrada), *label* (rótulo), treino × validação × teste, **overfitting** (decorou o treino, vai mal em dado novo) × underfitting, métricas (acurácia, precisão, *recall*).\n- **Fontes:** [Google – What is Machine Learning?](https://developers.google.com/machine-learning/intro-to-ml/what-is-ml?authuser=1) · [Google – ML Glossary](https://developers.google.com/machine-learning/glossary/)"
  },
  {
    "id": "redes-neurais",
    "aliasIds": [],
    "titulo": "Redes neurais",
    "zonaId": "13-ia-e-nuvem",
    "regiaoId": "montanhas-da-infra",
    "materia": "IA e Computação em Nuvem",
    "cargo": "analista",
    "npcName": "Alpinista Tanenbaum III",
    "npcRole": "engenheiro",
    "npcSeed": 1621372068,
    "oQueE": "O que é: modelo formado por camadas de neurônios artificiais (entrada → ocultas → saída); cada neurônio soma entradas ponderadas por pesos + viés e aplica uma função de ativação (ex.: ReLU, sigmoide) — é ela que permite aprender relações não lineares.",
    "exemploPratico": "",
    "fatosChave": [
      "O que é: modelo formado por camadas de neurônios artificiais (entrada → ocultas → saída); cada neurônio soma entradas ponderadas por pesos + viés e aplica uma função de ativação (ex.: ReLU, sigmoide) — é ela que permite aprender relações não lineares.",
      "Treino: ajustar os pesos para reduzir a função de perda, com backpropagation (retropropagação do erro) + gradiente descendente.",
      "Deep learning: redes com muitas camadas ocultas. Tipos: CNN (imagens), RNN/LSTM (sequências — processam um token por vez, sem paralelismo), Transformer (atenção — base dos LLMs)."
    ],
    "conexoes": [],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Google – ML Glossary: Fundamentals (backpropagation, ativação)",
        "url": "https://developers.google.com/machine-learning/glossary/fundamentals?authuser=3"
      },
      {
        "label": "Google MLCC – Neural networks",
        "url": "https://developers.google.com/machine-learning/crash-course?authuser=8"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **O que é:** modelo formado por **camadas de neurônios artificiais** (entrada → ocultas → saída); cada neurônio soma entradas **ponderadas por pesos** + viés e aplica uma **função de ativação** (ex.: ReLU, sigmoide) — é ela que permite aprender relações **não lineares**.\n- **Treino:** ajustar os pesos para reduzir a **função de perda**, com **backpropagation** (retropropagação do erro) + gradiente descendente.\n- **Deep learning:** redes com **muitas camadas ocultas**. Tipos: **CNN** (imagens), **RNN/LSTM** (sequências — processam um token por vez, sem paralelismo), **Transformer** (atenção — base dos LLMs).\n- **Fontes:** [Google – ML Glossary: Fundamentals (backpropagation, ativação)](https://developers.google.com/machine-learning/glossary/fundamentals?authuser=3) · [Google MLCC – Neural networks](https://developers.google.com/machine-learning/crash-course?authuser=8)"
  },
  {
    "id": "ia-llm",
    "aliasIds": [],
    "titulo": "IA generativa e LLMs (grandes modelos de linguagem)",
    "zonaId": "13-ia-e-nuvem",
    "regiaoId": "montanhas-da-infra",
    "materia": "IA e Computação em Nuvem",
    "cargo": "analista",
    "npcName": "Engenheiro Cerf III",
    "npcRole": "sabio",
    "npcSeed": 811696753,
    "oQueE": "LLM: modelo que prevê o próximo token (ou sequência de tokens) — um token pode ser uma palavra, um pedaço de palavra ou um caractere. Ganham dos modelos antigos pelo enorme número de parâmetros e pela capacidade de usar contexto amplo.",
    "exemploPratico": "Exemplo prático: assistente que resume petições trabalhistas — com RAG sobre a jurisprudência do TRT4 e revisão humana obrigatória.",
    "fatosChave": [
      "LLM: modelo que prevê o próximo token (ou sequência de tokens) — um token pode ser uma palavra, um pedaço de palavra ou um caractere. Ganham dos modelos antigos pelo enorme número de parâmetros e pela capacidade de usar contexto amplo.",
      "Transformer: arquitetura do artigo \"Attention Is All You Need\" (2017, 8 pesquisadores do Google). Peça central: autoatenção (self-attention) — o modelo pesa a importância de cada token em relação aos outros (ex.: a que palavra o \"ele\" se refere). Usa atenção multi-cabeça e pode ter codificador e decodificador (BERT = encoder; GPT = decoder).",
      "Riscos: alucinação (resposta fluente mas falsa), viés, alto custo computacional.",
      "RAG (Retrieval-Augmented Generation): buscar documentos confiáveis e entregá-los ao modelo junto com a pergunta → reduz alucinação e melhora a exatidão factual.",
      "Outros termos: prompt, janela de contexto, fine-tuning, embeddings (vetores que representam significado), agentes (LLM que usa ferramentas)."
    ],
    "conexoes": [
      "ia-assistentes-dev",
      "lgpd",
      "owasp",
      "itil",
      "pmbok"
    ],
    "avisosOraculo": [
      "Conexão normativa (extra, fora do edital): a Resolução CNJ nº 615/2025 (11/03/2025) regula desenvolvimento, governança, auditoria e uso de IA (inclusive generativa) no Judiciário, com classificação de riscos, vedação de usos de risco excessivo e supervisão humana; revogou a Res. CNJ 332/2020. Uma fonte de escritório de advocacia cita alteração pela Res. CNJ 674/2026 — conferir no portal de atos do CNJ."
    ],
    "fontes": [
      {
        "label": "Google MLCC – What's a large language model?",
        "url": "https://developers.google.com/machine-learning/crash-course/llm/transformers"
      },
      {
        "label": "Cambridge – Architecture of language understanding (RAG, alucinação)",
        "url": "https://www.cambridge.org/core/journals/cambridge-forum-on-ai-law-and-governance/article/architecture-of-language-understanding-the-mechanics-behind-llms/E3DDEFB9C04883733380E04331D6F782"
      },
      {
        "label": "Wikipedia – Attention Is All You Need",
        "url": "https://en.Wikipedia.com/wiki/Attention_Is_All_You_Need"
      },
      {
        "label": "CNJ – Resolução 615/2025 (PDF)",
        "url": "https://atos.cnj.jus.br/files/original1555302025031467d4517244566.pdf"
      },
      {
        "label": "Revista TRF3 – Res. 615 revoga a 332",
        "url": "https://revista.trf3.jus.br/index.php/rtrf3/article/download/742/700"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **LLM:** modelo que **prevê o próximo token** (ou sequência de tokens) — um **token** pode ser uma palavra, um pedaço de palavra ou um caractere. Ganham dos modelos antigos pelo **enorme número de parâmetros** e pela capacidade de usar **contexto amplo**.\n- **Transformer:** arquitetura do artigo **\"Attention Is All You Need\" (2017, 8 pesquisadores do Google)**. Peça central: **autoatenção (self-attention)** — o modelo pesa a importância de cada token em relação aos outros (ex.: a que palavra o \"ele\" se refere). Usa **atenção multi-cabeça** e pode ter **codificador** e **decodificador** (BERT = encoder; GPT = decoder).\n- **Riscos:** **alucinação** (resposta fluente mas falsa), **viés**, alto custo computacional.\n- **RAG (Retrieval-Augmented Generation):** buscar documentos confiáveis e entregá-los ao modelo junto com a pergunta → **reduz alucinação** e melhora a exatidão factual.\n- **Outros termos:** *prompt*, janela de contexto, *fine-tuning*, *embeddings* (vetores que representam significado), agentes (LLM que usa ferramentas).\n- **Exemplo prático:** assistente que resume petições trabalhistas — com RAG sobre a jurisprudência do TRT4 e **revisão humana obrigatória**.\n- **Conexão normativa (extra, fora do edital):** a **Resolução CNJ nº 615/2025** (11/03/2025) regula desenvolvimento, governança, auditoria e uso de IA (inclusive **generativa**) no Judiciário, com **classificação de riscos**, vedação de usos de risco excessivo e **supervisão humana**; **revogou a Res. CNJ 332/2020**. ⚠️ Uma fonte de escritório de advocacia cita alteração pela Res. CNJ 674/2026 — conferir no portal de atos do CNJ.\n- **Conexões:** [[ia-assistentes-dev]] · [[lgpd]] (dados pessoais em prompts) · [[owasp]] (riscos de cadeia de suprimentos/segurança de aplicações) · [[itil]] (Version 5 traz governança de IA) · [[pmbok]] (8ª ed. cobre IA)\n- **Fontes:** [Google MLCC – What's a large language model?](https://developers.google.com/machine-learning/crash-course/llm/transformers) · [Cambridge – Architecture of language understanding (RAG, alucinação)](https://www.cambridge.org/core/journals/cambridge-forum-on-ai-law-and-governance/article/architecture-of-language-understanding-the-mechanics-behind-llms/E3DDEFB9C04883733380E04331D6F782) · [Wikipedia – Attention Is All You Need](https://en.Wikipedia.com/wiki/Attention_Is_All_You_Need) · [CNJ – Resolução 615/2025 (PDF)](https://atos.cnj.jus.br/files/original1555302025031467d4517244566.pdf) · [Revista TRF3 – Res. 615 revoga a 332](https://revista.trf3.jus.br/index.php/rtrf3/article/download/742/700)\n\n---"
  },
  {
    "id": "nuvem",
    "aliasIds": [],
    "titulo": "Computação em nuvem (NIST SP 800-145)",
    "zonaId": "13-ia-e-nuvem",
    "regiaoId": "montanhas-da-infra",
    "materia": "IA e Computação em Nuvem",
    "cargo": "tecnico",
    "npcName": "Vigia Radia III",
    "npcRole": "mago",
    "npcSeed": 1499672852,
    "oQueE": "Definição oficial (NIST, 2011): modelo que permite acesso conveniente, sob demanda e pela rede a um conjunto compartilhado de recursos configuráveis (redes, servidores, armazenamento, aplicações, serviços) que podem ser provisionados e liberados rapidamente com mínimo esforço de gestão. Composto de 5 características essenciais, 3 modelos de serviço e 4 modelos de implantação.",
    "exemploPratico": "Exemplo prático: a PDPJ-Br roda em nuvem com contêineres orquestrados por Kubernetes/Rancher; um tribunal pode manter dados sensíveis em nuvem privada e serviços de pico em pública → híbrida.",
    "fatosChave": [
      "Definição oficial (NIST, 2011): modelo que permite acesso conveniente, sob demanda e pela rede a um conjunto compartilhado de recursos configuráveis (redes, servidores, armazenamento, aplicações, serviços) que podem ser provisionados e liberados rapidamente com mínimo esforço de gestão. Composto de 5 características essenciais, 3 modelos de serviço e 4 modelos de implantação.",
      "5 características essenciais: autoatendimento sob demanda · amplo acesso pela rede · pool de recursos (multi-inquilino) · elasticidade rápida · serviço medido (paga pelo uso).",
      "3 modelos de serviço (quem gerencia o quê):",
      "4 modelos de implantação: privada (uso exclusivo de uma organização) · comunitária (grupo com interesses comuns — ex.: órgãos do Judiciário) · pública (aberta ao público em geral) · híbrida (combinação, com portabilidade)."
    ],
    "conexoes": [
      "docker",
      "microsservicos",
      "res-cnj-335-2020",
      "lgpd",
      "vpn-ztna"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "NIST SP 800-145 (PDF)",
        "url": "https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf"
      },
      {
        "label": "NIST – resumo da definição",
        "url": "https://www.nist.gov/node/402511"
      },
      {
        "label": "NIST – publicação",
        "url": "https://www.nist.gov/publications/nist-definition-cloud-computing?pub_id=909616"
      }
    ],
    "tablePairs": [
      {
        "term": "IaaS",
        "definition": "O cliente controla: SO, aplicações, dados (provedor cuida do hardware/virtualização) · Exemplo: máquinas virtuais, discos",
        "rawRow": "IaaS — SO, aplicações, dados (provedor cuida do hardware/virtualização) — máquinas virtuais, discos"
      },
      {
        "term": "PaaS",
        "definition": "O cliente controla: aplicações e dados (provedor cuida também do SO e runtime) · Exemplo: plataforma para publicar app Java/Node",
        "rawRow": "PaaS — aplicações e dados (provedor cuida também do SO e runtime) — plataforma para publicar app Java/Node"
      },
      {
        "term": "SaaS",
        "definition": "O cliente controla: quase nada — só usa o software (no máximo configurações) · Exemplo: webmail, Microsoft 365",
        "rawRow": "SaaS — quase nada — só usa o software (no máximo configurações) — webmail, Microsoft 365"
      }
    ],
    "textoCompleto": "- **Definição oficial (NIST, 2011):** modelo que permite **acesso conveniente, sob demanda e pela rede** a um **conjunto compartilhado de recursos configuráveis** (redes, servidores, armazenamento, aplicações, serviços) que podem ser **provisionados e liberados rapidamente** com mínimo esforço de gestão. Composto de **5 características essenciais, 3 modelos de serviço e 4 modelos de implantação**.\n- **5 características essenciais:** **autoatendimento sob demanda** · **amplo acesso pela rede** · **pool de recursos** (multi-inquilino) · **elasticidade rápida** · **serviço medido** (paga pelo uso).\n- **3 modelos de serviço (quem gerencia o quê):**\n\n| Modelo | O cliente controla | Exemplo |\n| --- | --- | --- |\n| **IaaS** | SO, aplicações, dados (provedor cuida do hardware/virtualização) | máquinas virtuais, discos |\n| **PaaS** | aplicações e dados (provedor cuida também do SO e runtime) | plataforma para publicar app Java/Node |\n| **SaaS** | quase nada — só usa o software (no máximo configurações) | webmail, Microsoft 365 |\n\n- **4 modelos de implantação:** **privada** (uso exclusivo de uma organização) · **comunitária** (grupo com interesses comuns — ex.: órgãos do Judiciário) · **pública** (aberta ao público em geral) · **híbrida** (combinação, com portabilidade).\n- **Exemplo prático:** a PDPJ-Br roda em **nuvem** com contêineres orquestrados por Kubernetes/Rancher; um tribunal pode manter dados sensíveis em nuvem **privada** e serviços de pico em **pública** → **híbrida**.\n- **Conexões:** [[docker]] · [[kubernetes]] · [[rancher]] · [[microsservicos]] · [[res-cnj-335-2020]] (PDPJ \"em nuvem\") · [[lgpd]] (onde ficam os dados) · [[vpn-ztna]] (Zero Trust)\n- **Fontes:** [NIST SP 800-145 (PDF)](https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-145.pdf) · [NIST – resumo da definição](https://www.nist.gov/node/402511) · [NIST – publicação](https://www.nist.gov/publications/nist-definition-cloud-computing?pub_id=909616)"
  },
  {
    "id": "serverless",
    "aliasIds": [],
    "titulo": "Serverless computing e Serverless Framework",
    "zonaId": "13-ia-e-nuvem",
    "regiaoId": "montanhas-da-infra",
    "materia": "IA e Computação em Nuvem",
    "cargo": "tecnico",
    "npcName": "Guia Kurose III",
    "npcRole": "mago",
    "npcSeed": 796202645,
    "oQueE": "Serverless: o desenvolvedor publica funções/código e o provedor cuida de servidores, escala e disponibilidade; cobra-se por execução. Funções são acionadas por eventos (requisição HTTP, mensagem em fila, agendamento, arquivo no storage). Exemplo de plataforma: AWS Lambda (FaaS – Function as a Service).",
    "exemploPratico": "Exemplo:",
    "fatosChave": [
      "Serverless: o desenvolvedor publica funções/código e o provedor cuida de servidores, escala e disponibilidade; cobra-se por execução. Funções são acionadas por eventos (requisição HTTP, mensagem em fila, agendamento, arquivo no storage). Exemplo de plataforma: AWS Lambda (FaaS – Function as a Service).",
      "Serverless Framework: ferramenta de linha de comando que implanta aplicações na AWS a partir de um único arquivo serverless.yml: o código das funções Lambda, os eventos que as disparam e os recursos de infraestrutura necessários.",
      "Conceitos: service (unidade de organização/projeto), functions, events, resources (CloudFormation), plugins.",
      "Deploy com serverless deploy — tudo vira um stack CloudFormation."
    ],
    "conexoes": [
      "nuvem",
      "arquiteturas",
      "ci-cd",
      "mensageria"
    ],
    "avisosOraculo": [],
    "fontes": [
      {
        "label": "Serverless Framework – documentação",
        "url": "https://serverless.com/framework/docs"
      },
      {
        "label": "Serverless Framework – Concepts",
        "url": "https://www.serverless.com/framework/docs/providers/aws/guide/intro"
      },
      {
        "label": "Serverless Framework – Events",
        "url": "https://serverless.com/framework/docs/providers/aws/guide/events/"
      }
    ],
    "tablePairs": [],
    "textoCompleto": "- **Serverless:** o desenvolvedor publica **funções/código** e o provedor cuida de servidores, escala e disponibilidade; cobra-se **por execução**. Funções são acionadas por **eventos** (requisição HTTP, mensagem em fila, agendamento, arquivo no storage). Exemplo de plataforma: **AWS Lambda** (FaaS – *Function as a Service*).\n- **Serverless Framework:** ferramenta de **linha de comando** que **implanta aplicações na AWS a partir de um único arquivo `serverless.yml`**: o código das **funções Lambda**, os **eventos** que as disparam e os **recursos** de infraestrutura necessários.\n  - Conceitos: **service** (unidade de organização/projeto), **functions**, **events**, **resources** (CloudFormation), **plugins**.\n  - Deploy com **`serverless deploy`** — tudo vira um **stack CloudFormation**.\n- **Exemplo:**\n  ```yaml\n  service: consulta-processo\n  provider:\n    name: aws\n  functions:\n    consultar:\n      handler: handler.consultar\n      events:\n        - httpApi: { path: /processos/{numero}, method: get }\n  ```\n- **Conexões:** [[nuvem]] (serverless ≈ evolução do PaaS/FaaS) · [[arquiteturas]] · [[ci-cd]] (deploy automatizado) · [[mensageria]] (eventos)\n- **Fontes:** [Serverless Framework – documentação](https://serverless.com/framework/docs) · [Serverless Framework – Concepts](https://www.serverless.com/framework/docs/providers/aws/guide/intro) · [Serverless Framework – Events](https://serverless.com/framework/docs/providers/aws/guide/events/)"
  },
  {
    "id": "conteineres-nuvem",
    "aliasIds": [],
    "titulo": "Implantação de aplicações em nuvem e contêineres (lembrete)",
    "zonaId": "13-ia-e-nuvem",
    "regiaoId": "montanhas-da-infra",
    "materia": "IA e Computação em Nuvem",
    "cargo": "tecnico",
    "npcName": "Mestre Coffman III",
    "npcRole": "mago",
    "npcSeed": 1072940318,
    "oQueE": "Docker empacota a aplicação + dependências numa imagem; Kubernetes orquestra (pods, deployments, services, escala); Rancher gerencia vários clusters. Detalhes no arquivo 05 (docker, kubernetes, rancher).",
    "exemploPratico": "",
    "fatosChave": [
      "Docker empacota a aplicação + dependências numa imagem; Kubernetes orquestra (pods, deployments, services, escala); Rancher gerencia vários clusters. Detalhes no arquivo 05 (docker, kubernetes, rancher)."
    ],
    "conexoes": [
      "docker"
    ],
    "avisosOraculo": [],
    "fontes": [],
    "tablePairs": [],
    "textoCompleto": "- Docker empacota a aplicação + dependências numa **imagem**; Kubernetes **orquestra** (pods, deployments, services, escala); Rancher **gerencia vários clusters**. Detalhes no arquivo 05 ([[docker]], [[kubernetes]], [[rancher]]).\n\n---"
  }
];

export const FICHA_ALIAS_MAP: Record<string, string> = {
  "res-cnj-400-2021": "res-cnj-400-2021",
  "codigo-conduta-trt4": "codigo-conduta-trt4",
  "regimento-trt4": "regimento-trt4",
  "res-csjt-360-2023": "res-csjt-360-2023",
  "res-cnj-351-2020": "res-cnj-351-2020",
  "dh-evolucao-fundamentos": "dh-evolucao-fundamentos",
  "dh-geracoes": "dh-geracoes",
  "dh-caracteristicas": "dh-caracteristicas",
  "dh-tratados-cf88": "dh-tratados-cf88",
  "controle-convencionalidade": "controle-convencionalidade",
  "dh-interpretacao-colisao": "dh-interpretacao-colisao",
  "sidh": "sidh",
  "dh-grupos-vulneraveis": "dh-grupos-vulneraveis",
  "res-cnj-492-2023": "res-cnj-492-2023",
  "res-csjt-368-2023": "res-csjt-368-2023",
  "carta-onu": "carta-onu",
  "dudh": "dudh",
  "pidcp": "pidcp",
  "pidesc": "pidesc",
  "cerd": "cerd",
  "cedaw": "cedaw",
  "cdc": "cdc",
  "cdpd": "cdpd",
  "patrimonio-mundial": "patrimonio-mundial",
  "cdb": "cdb",
  "dnudpi": "dnudpi",
  "tpi": "tpi",
  "dadh": "dadh",
  "cadh": "cadh",
  "san-salvador": "san-salvador",
  "res-cnj-335-2020": "res-cnj-335-2020",
  "res-cnj-443-2022": "res-cnj-443-2022",
  "portaria-252-2020": "portaria-252-2020",
  "portaria-284-2021": "portaria-252-2020",
  "portaria-253-2020": "portaria-253-2020",
  "portaria-131-2021": "portaria-131-2021",
  "res-cnj-522-2023": "res-cnj-522-2023",
  "moreq-jus": "res-cnj-522-2023",
  "res-cnj-574-2024": "res-cnj-574-2024",
  "res-cnj-396-2021": "res-cnj-396-2021",
  "portaria-162-2021": "portaria-162-2021",
  "governanca-tic-trt4": "governanca-tic-trt4",
  "pdtic-trt4": "pdtic-trt4",
  "pmbok": "pmbok",
  "itil": "itil",
  "cobit": "cobit",
  "ingles-fcc": "ingles-fcc",
  "ingles-vocabulario": "ingles-vocabulario",
  "ingles-armadilhas": "ingles-armadilhas",
  "processo-software": "processo-software",
  "cmmi": "cmmi",
  "iso-12207": "iso-12207",
  "mps-br": "mps-br",
  "uml": "uml",
  "bpmn": "bpmn",
  "ageis": "ageis",
  "engenharia-requisitos": "engenharia-requisitos",
  "low-code": "low-code",
  "ia-assistentes-dev": "ia-assistentes-dev",
  "padroes-projeto": "padroes-projeto",
  "testes-software": "testes-software",
  "java": "java",
  "microsservicos": "microsservicos",
  "api-rest": "api-rest",
  "json": "api-rest",
  "spring-boot": "spring-boot",
  "service-discovery": "service-discovery",
  "eureka": "service-discovery",
  "api-gateway": "api-gateway",
  "zuul": "api-gateway",
  "mapstruct": "mapstruct",
  "swagger-openapi": "swagger-openapi",
  "jpa-hibernate": "jpa-hibernate",
  "jakarta-ee": "jakarta-ee",
  "postgresql": "postgresql",
  "h2": "h2",
  "keycloak-sso": "keycloak-sso",
  "jwt": "jwt",
  "mensageria": "mensageria",
  "docker": "docker",
  "kubernetes": "docker",
  "rancher": "docker",
  "ci-cd": "ci-cd",
  "proxy-reverso": "proxy-reverso",
  "devops": "devops",
  "gestao-configuracao": "gestao-configuracao",
  "git": "git",
  "gitflow": "gitflow",
  "github-gitlab": "github-gitlab",
  "gitlab-ci": "gitlab-ci",
  "jenkins": "jenkins",
  "circleci": "circleci",
  "maven": "maven",
  "selenium": "selenium",
  "continuous-delivery": "continuous-delivery",
  "balanceamento-carga": "balanceamento-carga",
  "fundamentos-programacao": "fundamentos-programacao",
  "oo": "oo",
  "excecoes": "excecoes",
  "acesso-banco": "acesso-banco",
  "linguagens": "linguagens",
  "dotnet": "dotnet",
  "web-frontend": "web-frontend",
  "js-frameworks": "js-frameworks",
  "jsf-jsp": "jsf-jsp",
  "xml": "xml",
  "ides": "ides",
  "servidor-web-aplicacao": "servidor-web-aplicacao",
  "arquiteturas": "arquiteturas",
  "manutencao-sistemas": "manutencao-sistemas",
  "modelagem-er": "modelagem-er",
  "normalizacao": "normalizacao",
  "sql": "sql",
  "plsql": "plsql",
  "transacoes": "transacoes",
  "postgresql-versoes": "postgresql-versoes",
  "oracle-19c": "oracle-19c",
  "cid": "cid",
  "iso-27001": "iso-27001",
  "iso-27701": "iso-27701",
  "iso-27005": "iso-27005",
  "cis-controls": "cis-controls",
  "lgpd": "lgpd",
  "owasp": "owasp",
  "protecao-perimetro": "protecao-perimetro",
  "vpn-ztna": "vpn-ztna",
  "wifi-seguranca": "wifi-seguranca",
  "criptografia": "criptografia",
  "tls": "tls",
  "controle-acesso": "controle-acesso",
  "ataques-malware": "ataques-malware",
  "backup": "backup",
  "processos-threads": "processos-threads",
  "deadlock": "deadlock",
  "memoria": "memoria",
  "entrada-saida": "entrada-saida",
  "linux": "linux",
  "windows": "windows",
  "active-directory": "active-directory",
  "powershell": "powershell",
  "wsus": "wsus",
  "osi-tcpip": "osi-tcpip",
  "ip-enderecamento": "ip-enderecamento",
  "protocolos": "protocolos",
  "equipamentos-rede": "equipamentos-rede",
  "vlan-stp": "vlan-stp",
  "cabeamento": "cabeamento",
  "ieee-80211": "ieee-80211",
  "servicos-rede": "servicos-rede",
  "snmp-gerencia": "snmp-gerencia",
  "monitoramento": "monitoramento",
  "machine-learning": "machine-learning",
  "redes-neurais": "redes-neurais",
  "ia-llm": "ia-llm",
  "nuvem": "nuvem",
  "serverless": "serverless",
  "conteineres-nuvem": "conteineres-nuvem"
};

export const PONTES: PonteQuest[] = [
  {
    "id": "ponte-privacidade-etica",
    "nome": "Ponte da Ética e Privacidade",
    "descricao": "Una os pergaminhos que ligam o Código de Conduta do TRT4, a LGPD, a ISO 27701 e a PDPJ-Br.",
    "fichaIds": [
      "codigo-conduta-trt4",
      "lgpd",
      "iso-27701",
      "res-cnj-335-2020"
    ],
    "recompensaXp": 250,
    "recompensaItem": "lupa_fonte"
  },
  {
    "id": "ponte-arquitetura-pdpj",
    "nome": "Ponte da Arquitetura PDPJ-Br",
    "descricao": "Conecte a Resolução CNJ 335/2020, Microsserviços, Spring Boot, Keycloak/OAuth2 e Contêineres.",
    "fichaIds": [
      "res-cnj-335-2020",
      "microsservicos",
      "spring-boot",
      "keycloak-sso",
      "docker"
    ],
    "recompensaXp": 320,
    "recompensaItem": "escudo_recurso"
  },
  {
    "id": "ponte-ciberseguranca",
    "nome": "Ponte da Muralha Cibernética",
    "descricao": "Reúna os pergaminhos da ENSEC-PJ (Res. 396), ISO 27001, OWASP Top 10:2025 e TLS.",
    "fichaIds": [
      "res-cnj-396-2021",
      "iso-27001",
      "owasp",
      "tls"
    ],
    "recompensaXp": 280,
    "recompensaItem": "pocao_dica"
  },
  {
    "id": "ponte-governanca-gestao",
    "nome": "Ponte da Governança Estratégica",
    "descricao": "Interligue a Política de Sustentabilidade (Res. 400), o PDTIC do TRT4, o COBIT 2019 e o PMBOK 8.",
    "fichaIds": [
      "res-cnj-400-2021",
      "pdtic-trt4",
      "cobit",
      "pmbok"
    ],
    "recompensaXp": 280,
    "recompensaItem": "elixir_foco"
  },
  {
    "id": "ponte-dados-infra",
    "nome": "Ponte dos Dados e da Infraestrutura",
    "descricao": "Conecte Transações ACID, Deadlock, Monitoramento (Zabbix/Prometheus/ELK) e Nuvem (NIST).",
    "fichaIds": [
      "transacoes",
      "deadlock",
      "monitoramento",
      "nuvem"
    ],
    "recompensaXp": 300,
    "recompensaItem": "escudo_recurso"
  },
  {
    "id": "ponte-babel-global",
    "nome": "Ponte de Porto Babel",
    "descricao": "Una o Vocabulário de Inglês Técnico aos conceitos que ele traduz: API REST, CI/CD, LGPD e Ágeis.",
    "fichaIds": [
      "ingles-vocabulario",
      "api-rest",
      "ci-cd",
      "ageis"
    ],
    "recompensaXp": 240,
    "recompensaItem": "pocao_dica"
  }
];

export const FICHA_BY_ID: Record<string, Ficha> = Object.fromEntries(
  FICHAS.map((f) => [f.id, f])
);

export const ZONA_BY_ID: Record<string, ZonaInfo> = Object.fromEntries(
  ZONAS.map((z) => [z.id, z])
);

export const REGION_BY_ID: Record<string, RegionInfo> = Object.fromEntries(
  REGIONS.map((r) => [r.id, r])
);
