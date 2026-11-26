/**
 * Deterministic gender resolver for human RPG NPCs so female names ALWAYS get
 * female human sprites/portraits and male names ALWAYS get male human sprites/portraits.
 * Armored knights (guarda) and non-human monsters are gender-neutral.
 */

export type NpcGender = 'female' | 'male';

const FEMALE_TITLES = new Set([
  'magistrada',
  'tradutora',
  'auditora',
  'capita',
  'conselheira',
  'coordenadora',
  'criptografa',
  'curadora',
  'defensora',
  'diretora',
  'druida',
  'engenheira',
  'ferreira',
  'guardia',
  'inspetora',
  'maga',
  'mediadora',
  'mestra',
  'ouvidora',
  'procuradora',
  'relatora',
  'sabia',
  'tabelia',
  'tecela',
  'arquiteta',
  'bibliotecaria',
  'juiza',
  'professora',
  'instrutora',
  'doutora',
  'senhora',
  'dama',
  'estrela',
  'fada',
  'cleriga',
  'escrivaoa',
]);

const MALE_TITLES = new Set([
  'juiz',
  'desembargador',
  'chanceler',
  'conselheiro',
  'construtor',
  'engenheiro',
  'escrivao',
  'escultor',
  'explorador',
  'gestor',
  'mestre',
  'oficial',
  'pregoeiro',
  'protetor',
  'secretario',
  'sabio',
  'timoneiro',
  'tribuno',
  'jurista',
  'capitao',
  'ferreiro',
  'diretor',
  'auditor',
  'coordenador',
  'procurador',
  'relator',
  'mediador',
  'inspetor',
  'tradutor',
  'arquiteto',
  'professor',
]);

const FEMALE_NAMES = new Set([
  'ada',
  'alice',
  'amanda',
  'ana',
  'aurora',
  'barbara',
  'beatriz',
  'bruna',
  'camila',
  'carla',
  'carolina',
  'clara',
  'daniela',
  'diana',
  'elena',
  'elisa',
  'evelyn',
  'fernanda',
  'gabriela',
  'grace',
  'helena',
  'isabela',
  'julia',
  'larissa',
  'laura',
  'leticia',
  'livia',
  'luana',
  'lucia',
  'lumina',
  'margaret',
  'maria',
  'mariana',
  'marina',
  'natalia',
  'patricia',
  'paula',
  'radia',
  'rafaela',
  'renata',
  'sofia',
  'taylyne',
  'vanessa',
  'virginia',
]);

const MALE_NAMES = new Set([
  'antonio',
  'arthur',
  'bob',
  'brooks',
  'bruno',
  'caio',
  'carlos',
  'cerf',
  'coffman',
  'diego',
  'dijkstra',
  'eduardo',
  'felipe',
  'fowler',
  'gabriel',
  'gamma',
  'gosling',
  'gustavo',
  'henrique',
  'hinton',
  'joao',
  'kerckhoffs',
  'knuth',
  'kurose',
  'linus',
  'lucas',
  'lucio',
  'marcos',
  'mateus',
  'merkle',
  'miguel',
  'otavio',
  'paulo',
  'pedro',
  'rafael',
  'renato',
  'rivest',
  'rodrigo',
  'shannon',
  'tanenbaum',
  'tiago',
  'valerio',
]);

function normalizeWord(w: string): string {
  return w
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z]/g, '');
}

/**
 * Classifies an NPC name into 'female' or 'male' using explicit Portuguese gendered
 * titles and known given names (e.g., "Tradutora Beatriz" -> 'female',
 * "Mago Ada" -> 'female', "Vigia Radia" -> 'female', "Chanceler Renato" -> 'male').
 */
export function detectNpcGender(npcName?: string): NpcGender {
  if (!npcName) return 'male';

  const words = npcName
    .split(/\s+/)
    .map(normalizeWord)
    .filter((w) => w.length > 0 && !['ii', 'iii', 'iv', 'v', 'de', 'da', 'do', 'dos', 'das'].includes(w));

  if (words.length === 0) return 'male';

  // 1. Check explicit female given name first (e.g., "Mago Ada", "Vigia Radia", "Sentinela Alice")
  for (const w of words) {
    if (FEMALE_NAMES.has(w)) return 'female';
  }

  // 2. Check explicit female title (e.g., "Tradutora Beatriz", "Ferreira Turing", "Sábia Stallings", "Mestra Codd")
  for (const w of words) {
    if (FEMALE_TITLES.has(w)) return 'female';
  }

  // 3. Check explicit male title or male given name
  for (const w of words) {
    if (MALE_TITLES.has(w) || MALE_NAMES.has(w)) return 'male';
  }

  // 4. Fallback heuristic on first word ending in 'a' (excluding epicene titles like guarda/sentinela/vigia/guia/escriba/alquimista/alpinista/muralhista/runista/jurista)
  const first = words[0];
  const epicene = new Set([
    'guarda',
    'sentinela',
    'vigia',
    'guia',
    'escriba',
    'alquimista',
    'alpinista',
    'muralhista',
    'runista',
    'jurista',
    'artifice',
  ]);
  if (!epicene.has(first) && first.endsWith('a')) {
    return 'female';
  }
  return 'male';
}
