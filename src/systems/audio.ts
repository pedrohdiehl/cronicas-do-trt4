import type { RegionId } from '../types';

export type MusicTrackId =
  | RegionId
  | 'title'
  | 'battle'
  | 'npc-duel'
  | 'miniboss'
  | 'boss';

export interface SoundtrackMeta {
  id: MusicTrackId;
  title: string;
  subtitle: string;
  category: 'regiao' | 'combate';
  audioUrl?: string;
}

// Bespoke Suno 16-bit SNES RPG soundtracks already uploaded (remaining tracks seamlessly use built-in SNES synth)
export const CUSTOM_AUDIO_TRACKS: Partial<Record<MusicTrackId, string>> = {
  title: '/assets/aistudio/title.mp3_0e7df232.mp3',
  'reino-da-toga': '/assets/aistudio/reino-da-toga_baf46fbc.mp3',
  'cidadela-do-conselho': '/assets/aistudio/cidadela-do-conselho_fe5b9ee4.mp3',
  'porto-babel': '/assets/aistudio/porto-babel_5e6008db.mp3',
  battle: '/assets/aistudio/battle_7f855757.mp3',
};

export function getTrackAudioUrl(id: MusicTrackId): string | null {
  return CUSTOM_AUDIO_TRACKS[id] || null;
}

export const SOUNDTRACK_CATALOG: SoundtrackMeta[] = [
  { id: 'title', title: 'Abertura das Crônicas', subtitle: 'Harpa heroica & trompas SNES', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS.title },
  { id: 'reino-da-toga', title: 'Praça do Reino da Toga', subtitle: 'Flauta medieval & alaúde (Legislação / DH)', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS['reino-da-toga'] },
  { id: 'cidadela-do-conselho', title: 'Salões do Conselho', subtitle: 'Cravo real & cordas solenes (Governança / PDPJ)', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS['cidadela-do-conselho'] },
  { id: 'floresta-do-codigo', title: 'Bosque das Runas Binárias', subtitle: 'Flauta mística & sinos arpejados (Eng. Software / Dev)', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS['floresta-do-codigo'] },
  { id: 'fortaleza-da-muralha', title: 'Bastião Criptográfico', subtitle: 'Marcha menor & metais tensos (Segurança / LGPD)', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS['fortaleza-da-muralha'] },
  { id: 'montanhas-da-infra', title: 'Picos da Nuvem', subtitle: 'Vento alpino & cristais (SO / Redes / IA)', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS['montanhas-da-infra'] },
  { id: 'porto-babel', title: 'Docas de Porto Babel', subtitle: 'Valsa marítima & acordeão (Inglês Técnico)', category: 'regiao', audioUrl: CUSTOM_AUDIO_TRACKS['porto-babel'] },
  { id: 'battle', title: 'Encontro no Caminho', subtitle: 'Tema de combate contra monstros comuns', category: 'combate', audioUrl: CUSTOM_AUDIO_TRACKS.battle },
  { id: 'npc-duel', title: 'Duelo Acadêmico com NPC', subtitle: 'Cravo veloz & melodia rival energética', category: 'combate', audioUrl: CUSTOM_AUDIO_TRACKS['npc-duel'] },
  { id: 'miniboss', title: 'Guardião da Zona (Mini-Boss)', subtitle: 'Ostinato urgente & metais de batalha', category: 'combate', audioUrl: CUSTOM_AUDIO_TRACKS.miniboss },
  { id: 'boss', title: 'Batalha Decisiva — Boss', subtitle: 'Tema épico estilo Final Fantasy / Chrono Trigger', category: 'combate', audioUrl: CUSTOM_AUDIO_TRACKS.boss },
];

// MIDI note number to Hz
function midiToHz(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

interface SongSpec {
  bpm: number; // eighth-note steps per minute (2 steps per beat)
  leadWave: OscillatorType;
  leadFilter: number;
  arpWave: OscillatorType;
  bassWave: OscillatorType;
  lead: (number | null)[]; // 32 steps (A + B sections)
  harmony: (number | null)[];
  arp: (number | null)[];
  bass: (number | null)[];
  drums: ('.' | 'K' | 'S' | 'H' | 'T')[]; // Kick, Snare, Hi-hat, Timpani
}

// 11 full 32-step original SNES 16-bit RPG compositions (100% free Web Audio synthesis)
const SONGS: Record<MusicTrackId, SongSpec> = {
  title: {
    bpm: 112,
    leadWave: 'triangle',
    leadFilter: 2400,
    arpWave: 'sine',
    bassWave: 'triangle',
    lead: [
      74, null, 77, 81, 86, null, 84, 81, 79, null, 77, 76, 74, null, null, null,
      74, null, 77, 81, 88, null, 86, 84, 81, null, 79, 81, 86, null, null, null,
    ],
    harmony: [
      62, null, 65, null, 69, null, 69, null, 67, null, 65, null, 62, null, 64, null,
      62, null, 65, null, 72, null, 70, null, 69, null, 67, null, 69, null, null, null,
    ],
    arp: [
      62, 65, 69, 74, 65, 69, 74, 69, 67, 70, 74, 79, 64, 69, 73, 69,
      62, 65, 69, 74, 67, 72, 76, 72, 65, 69, 72, 77, 62, 69, 74, 69,
    ],
    bass: [
      50, null, null, null, 53, null, null, null, 55, null, null, null, 57, null, null, null,
      50, null, null, null, 48, null, null, null, 53, null, 55, null, 50, null, null, null,
    ],
    drums: [
      'T', '.', '.', '.', '.', '.', 'H', '.', 'T', '.', '.', '.', '.', '.', 'H', '.',
      'T', '.', '.', '.', 'H', '.', '.', '.', 'T', '.', 'H', '.', 'T', '.', '.', '.',
    ],
  },

  // 1. Reino da Toga — Warm medieval town square (Chrono Trigger Truce / Millennial Fair vibe)
  'reino-da-toga': {
    bpm: 118,
    leadWave: 'triangle',
    leadFilter: 2600,
    arpWave: 'triangle',
    bassWave: 'triangle',
    lead: [
      79, null, 81, 83, 86, null, 83, 81, 79, 76, 74, null, 76, 79, 81, null,
      83, null, 86, 88, 86, null, 83, 81, 79, 81, 83, 81, 79, null, null, null,
    ],
    harmony: [
      67, null, null, 71, 74, null, 71, null, 67, null, 62, null, 64, null, 69, null,
      71, null, 74, null, 74, null, 71, null, 67, null, 66, null, 67, null, null, null,
    ],
    arp: [
      67, 71, 74, 71, 62, 66, 69, 66, 64, 67, 71, 67, 60, 64, 67, 64,
      67, 71, 74, 71, 60, 64, 67, 64, 62, 66, 69, 66, 67, 71, 74, 71,
    ],
    bass: [
      55, null, 59, null, 50, null, 54, null, 52, null, 55, null, 48, null, 52, null,
      55, null, 59, null, 48, null, 52, null, 50, null, 54, null, 55, null, 50, null,
    ],
    drums: [
      'K', '.', 'H', '.', 'S', '.', 'H', '.', 'K', '.', 'H', '.', 'S', '.', 'H', '.',
      'K', '.', 'H', '.', 'S', '.', 'H', '.', 'K', '.', 'S', '.', 'K', '.', 'H', '.',
    ],
  },

  // 2. Cidadela do Conselho — Regal marble palace harpsichord & strings
  'cidadela-do-conselho': {
    bpm: 108,
    leadWave: 'sawtooth',
    leadFilter: 1700,
    arpWave: 'triangle',
    bassWave: 'triangle',
    lead: [
      76, 79, 83, null, 84, 83, 79, null, 78, 81, 83, null, 79, 76, null, null,
      83, 86, 88, null, 86, 83, 81, null, 79, 78, 76, 78, 76, null, null, null,
    ],
    harmony: [
      64, null, 67, null, 72, null, 67, null, 66, null, 71, null, 67, null, 64, null,
      71, null, 76, null, 74, null, 69, null, 67, null, 66, null, 64, null, null, null,
    ],
    arp: [
      64, 67, 71, 76, 60, 64, 67, 72, 62, 66, 69, 74, 64, 67, 71, 67,
      64, 67, 71, 76, 62, 66, 69, 74, 59, 63, 66, 71, 64, 67, 71, 76,
    ],
    bass: [
      52, null, null, null, 48, null, null, null, 50, null, null, null, 52, null, 47, null,
      52, null, null, null, 50, null, null, null, 47, null, null, null, 52, null, null, null,
    ],
    drums: [
      'T', '.', '.', '.', 'H', '.', '.', '.', 'T', '.', '.', '.', 'S', '.', '.', '.',
      'T', '.', '.', '.', 'H', '.', '.', '.', 'T', '.', 'S', '.', 'T', '.', '.', '.',
    ],
  },

  // 3. Floresta do Código — Mystical Secret of the Forest flute + shimmering chimes
  'floresta-do-codigo': {
    bpm: 104,
    leadWave: 'sine',
    leadFilter: 3000,
    arpWave: 'sine',
    bassWave: 'triangle',
    lead: [
      77, null, 81, null, 84, 86, 84, null, 81, null, 79, 77, 76, null, null, null,
      74, null, 77, null, 81, 84, 88, null, 86, 84, 81, 79, 77, null, null, null,
    ],
    harmony: [
      65, null, null, null, 69, null, null, null, 67, null, null, null, 64, null, null, null,
      62, null, null, null, 65, null, null, null, 67, null, 64, null, 65, null, null, null,
    ],
    arp: [
      65, 69, 72, 77, 72, 69, 65, 72, 64, 67, 72, 76, 72, 67, 64, 67,
      62, 65, 69, 74, 69, 65, 62, 69, 60, 67, 72, 76, 65, 69, 72, 77,
    ],
    bass: [
      53, null, null, null, 53, null, null, null, 48, null, null, null, 52, null, null, null,
      50, null, null, null, 50, null, null, null, 48, null, 55, null, 53, null, null, null,
    ],
    drums: [
      '.', '.', 'H', '.', '.', '.', 'H', '.', 'K', '.', 'H', '.', '.', '.', 'H', '.',
      '.', '.', 'H', '.', '.', '.', 'H', '.', 'K', '.', 'H', '.', '.', '.', '.', '.',
    ],
  },

  // 4. Fortaleza da Muralha — Tense cryptographic fortress march (minor key)
  'fortaleza-da-muralha': {
    bpm: 124,
    leadWave: 'square',
    leadFilter: 1450,
    arpWave: 'triangle',
    bassWave: 'sawtooth',
    lead: [
      69, null, 72, 71, 69, null, 64, null, 65, null, 69, 71, 72, null, 71, null,
      76, null, 74, 72, 71, null, 69, 68, 69, null, 72, 71, 69, null, null, null,
    ],
    harmony: [
      60, null, null, null, 60, null, 59, null, 57, null, null, null, 60, null, 59, null,
      64, null, 62, null, 59, null, 56, null, 57, null, 60, null, 57, null, null, null,
    ],
    arp: [
      57, 60, 64, 60, 57, 60, 64, 60, 53, 57, 60, 57, 52, 56, 59, 56,
      57, 60, 64, 60, 50, 53, 57, 53, 52, 56, 59, 64, 57, 60, 64, 57,
    ],
    bass: [
      45, 45, null, 45, 45, null, 43, null, 41, 41, null, 41, 40, null, 44, null,
      45, 45, null, 45, 50, null, 48, null, 47, null, 44, null, 45, null, 45, null,
    ],
    drums: [
      'K', '.', 'H', '.', 'S', '.', 'H', 'K', 'K', '.', 'H', '.', 'S', '.', 'S', '.',
      'K', '.', 'H', '.', 'S', '.', 'H', 'K', 'K', '.', 'S', '.', 'T', '.', 'S', '.',
    ],
  },

  // 5. Montanhas da Infra — Soaring alpine synth-flute + crystal clouds
  'montanhas-da-infra': {
    bpm: 110,
    leadWave: 'triangle',
    leadFilter: 2900,
    arpWave: 'sine',
    bassWave: 'triangle',
    lead: [
      81, null, 88, null, 86, 83, 81, null, 79, null, 83, null, 81, null, null, null,
      84, null, 91, null, 88, 86, 84, null, 83, 81, 79, 76, 81, null, null, null,
    ],
    harmony: [
      69, null, 76, null, 74, null, 69, null, 67, null, 71, null, 69, null, null, null,
      72, null, 79, null, 76, null, 72, null, 71, null, 67, null, 69, null, null, null,
    ],
    arp: [
      69, 76, 81, 76, 67, 74, 79, 74, 65, 72, 77, 72, 64, 71, 76, 71,
      60, 67, 72, 79, 62, 69, 74, 81, 64, 71, 76, 83, 69, 76, 81, 76,
    ],
    bass: [
      57, null, null, null, 55, null, null, null, 53, null, null, null, 52, null, null, null,
      48, null, null, null, 50, null, null, null, 52, null, null, null, 57, null, null, null,
    ],
    drums: [
      'T', '.', '.', '.', 'H', '.', '.', '.', 'T', '.', '.', '.', 'H', '.', '.', '.',
      'T', '.', 'H', '.', '.', '.', 'H', '.', 'T', '.', '.', '.', 'H', '.', '.', '.',
    ],
  },

  // 6. Porto Babel — Cheerful coastal harbor shanty / FFVI South Figaro vibe
  'porto-babel': {
    bpm: 132,
    leadWave: 'triangle',
    leadFilter: 2500,
    arpWave: 'square',
    bassWave: 'triangle',
    lead: [
      79, 83, 86, null, 88, 86, 83, 79, 81, 84, 86, null, 83, null, 79, null,
      86, 88, 91, null, 88, 86, 83, 81, 79, 83, 81, 78, 79, null, null, null,
    ],
    harmony: [
      67, null, 71, null, 72, null, 71, null, 69, null, 74, null, 71, null, 67, null,
      74, null, 79, null, 76, null, 72, null, 71, null, 69, null, 67, null, null, null,
    ],
    arp: [
      67, 71, 74, 71, 60, 64, 67, 64, 62, 66, 69, 66, 67, 71, 74, 71,
      67, 71, 74, 79, 60, 64, 67, 72, 62, 66, 69, 74, 67, 71, 74, 67,
    ],
    bass: [
      55, null, 50, null, 48, null, 52, null, 50, null, 54, null, 55, null, 50, null,
      55, null, 59, null, 48, null, 52, null, 50, null, 54, null, 55, null, 50, null,
    ],
    drums: [
      'K', '.', 'H', '.', 'S', '.', 'H', '.', 'K', '.', 'H', 'K', 'S', '.', 'H', '.',
      'K', '.', 'H', '.', 'S', '.', 'H', '.', 'K', 'H', 'S', '.', 'K', '.', 'S', '.',
    ],
  },

  // 7. Standard Monster Battle — Energetic SNES encounter
  battle: {
    bpm: 152,
    leadWave: 'square',
    leadFilter: 2200,
    arpWave: 'triangle',
    bassWave: 'sawtooth',
    lead: [
      76, 76, 79, 76, 83, null, 81, 79, 76, 79, 81, 79, 76, 74, 71, null,
      76, 79, 83, 86, 88, null, 86, 83, 81, 83, 79, 76, 78, 79, 76, null,
    ],
    harmony: [
      64, null, 67, null, 71, null, 69, null, 64, null, 69, null, 64, null, 59, null,
      64, null, 71, null, 76, null, 74, null, 69, null, 67, null, 66, null, 64, null,
    ],
    arp: [
      64, 67, 71, 67, 64, 67, 71, 67, 60, 64, 67, 64, 59, 63, 66, 63,
      64, 67, 71, 76, 60, 64, 67, 72, 62, 66, 69, 74, 59, 63, 66, 71,
    ],
    bass: [
      52, 52, 52, 55, 52, 52, 50, 47, 48, 48, 48, 52, 47, 47, 47, 50,
      52, 52, 55, 59, 48, 48, 52, 55, 50, 50, 54, 57, 47, 50, 52, 47,
    ],
    drums: [
      'K', 'H', 'S', 'H', 'K', 'K', 'S', 'H', 'K', 'H', 'S', 'H', 'K', 'H', 'S', 'S',
      'K', 'H', 'S', 'H', 'K', 'K', 'S', 'H', 'K', 'H', 'S', 'K', 'T', 'S', 'K', 'S',
    ],
  },

  // 8. NPC Academic Duel — Spirited, noble rival theme (fast harpsichord + heroic bright lead!)
  'npc-duel': {
    bpm: 162,
    leadWave: 'sawtooth',
    leadFilter: 2400,
    arpWave: 'square',
    bassWave: 'triangle',
    lead: [
      81, 83, 84, 88, 86, null, 84, 83, 81, 79, 81, 84, 83, null, 79, null,
      81, 84, 88, 91, 89, 88, 86, 84, 83, 84, 86, 88, 81, null, null, null,
    ],
    harmony: [
      69, null, 72, null, 74, null, 72, null, 69, null, 72, null, 71, null, 67, null,
      69, null, 76, null, 77, null, 74, null, 71, null, 74, null, 69, null, null, null,
    ],
    arp: [
      69, 72, 76, 81, 67, 71, 74, 79, 65, 69, 72, 77, 64, 68, 71, 76,
      69, 72, 76, 81, 62, 65, 69, 74, 64, 68, 71, 76, 69, 72, 76, 69,
    ],
    bass: [
      57, null, 57, 60, 55, null, 55, 59, 53, null, 53, 57, 52, null, 56, null,
      57, null, 60, 64, 50, null, 53, 57, 52, null, 56, 59, 57, 52, 57, null,
    ],
    drums: [
      'K', 'H', 'S', 'H', 'K', 'H', 'S', 'H', 'K', 'H', 'S', 'H', 'K', 'S', 'T', 'S',
      'K', 'H', 'S', 'H', 'K', 'K', 'S', 'H', 'K', 'H', 'S', 'S', 'K', 'T', 'S', 'H',
    ],
  },

  // 9. Zone Mini-Boss — Syncopated urgent guardian theme
  miniboss: {
    bpm: 168,
    leadWave: 'sawtooth',
    leadFilter: 1950,
    arpWave: 'square',
    bassWave: 'sawtooth',
    lead: [
      74, 74, 77, 76, 74, 79, 77, 76, 74, 72, 74, 77, 81, null, 79, null,
      86, 85, 86, 81, 84, 83, 81, 79, 77, 76, 74, 77, 76, null, 73, null,
    ],
    harmony: [
      62, null, 65, null, 62, null, 67, null, 62, null, 65, null, 69, null, 67, null,
      74, null, 74, null, 72, null, 69, null, 65, null, 62, null, 64, null, 61, null,
    ],
    arp: [
      62, 65, 69, 65, 62, 67, 70, 67, 62, 65, 69, 74, 60, 64, 67, 72,
      62, 65, 69, 74, 58, 62, 65, 70, 55, 58, 62, 67, 57, 61, 64, 69,
    ],
    bass: [
      50, 50, 53, 50, 50, 55, 53, 50, 50, 48, 50, 53, 48, 48, 55, 52,
      50, 50, 57, 50, 46, 46, 53, 46, 43, 43, 50, 43, 45, 45, 52, 49,
    ],
    drums: [
      'K', 'K', 'S', 'H', 'K', 'H', 'S', 'K', 'K', 'K', 'S', 'H', 'K', 'S', 'S', 'H',
      'K', 'K', 'S', 'H', 'K', 'K', 'S', 'K', 'K', 'H', 'S', 'K', 'T', 'T', 'S', 'S',
    ],
  },

  // 10. Region Boss — Epic FFVI "Decisive Battle" / Chrono Trigger boss climax!
  boss: {
    bpm: 178,
    leadWave: 'sawtooth',
    leadFilter: 2600,
    arpWave: 'square',
    bassWave: 'sawtooth',
    lead: [
      76, 76, 79, 78, 76, 83, 82, 83, 88, 86, 83, 81, 79, 78, 76, null,
      83, 84, 83, 79, 86, 88, 86, 83, 91, 88, 86, 83, 82, 83, 88, null,
    ],
    harmony: [
      64, null, 67, 66, 64, null, 71, null, 76, null, 71, null, 67, 66, 64, null,
      71, null, 72, null, 74, null, 71, null, 79, null, 74, null, 70, 71, 76, null,
    ],
    arp: [
      64, 67, 71, 76, 64, 67, 71, 76, 60, 64, 67, 72, 59, 63, 66, 71,
      64, 67, 71, 76, 62, 66, 69, 74, 60, 67, 72, 79, 59, 66, 71, 75,
    ],
    bass: [
      40, 40, 47, 40, 40, 40, 52, 47, 48, 48, 52, 48, 47, 47, 51, 47,
      40, 40, 47, 52, 50, 50, 54, 57, 48, 48, 55, 52, 47, 47, 54, 51,
    ],
    drums: [
      'K', 'K', 'S', 'K', 'K', 'K', 'S', 'H', 'K', 'K', 'S', 'K', 'T', 'S', 'T', 'S',
      'K', 'K', 'S', 'K', 'K', 'K', 'S', 'K', 'K', 'T', 'S', 'K', 'T', 'S', 'S', 'S',
    ],
  },
};

/**
 * 100% Free Multi-Voice SNES 16-Bit Soundtrack & SFX Synthesizer (Web Audio API).
 * Features warm low-pass filtering, stereo delay/reverb bus, 5 polyphonic channels,
 * and distinct themes for every Region, NPC Duels, Monsters, Mini-Bosses, and Region Bosses.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicBus: GainNode | null = null;
  private delayNode: DelayNode | null = null;
  private noiseBuffer: AudioBuffer | null = null;

  private volume = 0.45;
  private muted = false;
  private bgmTimer: number | null = null;
  private currentTrack: MusicTrackId | null = null;
  private stepIdx = 0;

  // Custom MP3 soundtrack engine (Suno HD audio tracks with smooth fade-in & autoplay unlock)
  private activeAudio: HTMLAudioElement | null = null;
  private audioCache = new Map<MusicTrackId, HTMLAudioElement>();
  private fadeTimer: number | null = null;
  private pendingUnlockTrack: MusicTrackId | null = null;
  private unlockListenersBound = false;

  private getMusicAudioVolume(): number {
    // Mastered MP3 tracks sit comfortably beneath crisp Web Audio SFX
    return Math.max(0, Math.min(1, this.volume * 0.72));
  }

  private clearFade(): void {
    if (this.fadeTimer !== null) {
      clearInterval(this.fadeTimer);
      this.fadeTimer = null;
    }
  }

  private bindGestureUnlock(): void {
    if (this.unlockListenersBound || typeof window === 'undefined') return;
    this.unlockListenersBound = true;
    const onGesture = () => {
      if (this.muted) return;
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
      const pending = this.pendingUnlockTrack;
      if (pending) {
        this.pendingUnlockTrack = null;
        this.startMusic(pending);
      }
    };
    window.addEventListener('pointerdown', onGesture, { capture: true, passive: true });
    window.addEventListener('keydown', onGesture, { capture: true, passive: true });
  }

  private ensureCtx(): AudioContext | null {
    if (this.muted || typeof window === 'undefined') return null;
    const AudioCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtor) return null;

    if (!this.ctx) {
      this.ctx = new AudioCtor();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = this.volume;
      this.masterGain.connect(this.ctx.destination);

      // Warm SNES reverb/echo bus for music
      this.musicBus = this.ctx.createGain();
      this.musicBus.gain.value = 0.85;
      this.musicBus.connect(this.masterGain);

      this.delayNode = this.ctx.createDelay(0.5);
      this.delayNode.delayTime.value = 0.21;
      const delayFb = this.ctx.createGain();
      delayFb.gain.value = 0.22;
      const delayFilter = this.ctx.createBiquadFilter();
      delayFilter.type = 'lowpass';
      delayFilter.frequency.value = 1800;

      this.musicBus.connect(this.delayNode);
      this.delayNode.connect(delayFilter);
      delayFilter.connect(delayFb);
      delayFb.connect(this.delayNode);
      delayFilter.connect(this.masterGain);

      // Pre-generate crisp white noise buffer for snare / hi-hat / sword slash
      const sampleRate = this.ctx.sampleRate;
      const len = Math.floor(sampleRate * 0.25);
      const buf = this.ctx.createBuffer(1, len, sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      this.noiseBuffer = buf;
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.03);
    }
    return this.ctx;
  }

  public configure(volume: number, muted: boolean): void {
    this.volume = Math.max(0, Math.min(1, volume));
    this.muted = muted;
    if (muted) {
      this.stopMusic();
    } else {
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.03);
      }
      if (this.activeAudio && this.fadeTimer === null) {
        this.activeAudio.volume = this.getMusicAudioVolume();
      }
    }
  }

  public getCurrentTrack(): MusicTrackId | null {
    return this.currentTrack;
  }

  public isUsingCustomAudio(track?: MusicTrackId): boolean {
    const id = track ?? this.currentTrack;
    return id ? Boolean(getTrackAudioUrl(id)) : false;
  }

  public getTrackMeta(id: MusicTrackId): SoundtrackMeta {
    return SOUNDTRACK_CATALOG.find((t) => t.id === id) || SOUNDTRACK_CATALOG[1];
  }

  private playSynthVoice(
    freq: number,
    duration: number,
    wave: OscillatorType,
    gainLevel: number,
    filterHz: number,
    useMusicBus = true,
    delayOffset = 0,
    slideTo?: number
  ): void {
    const ctx = this.ensureCtx();
    if (!ctx || !this.masterGain || !this.musicBus) return;

    const now = ctx.currentTime + delayOffset;
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = wave;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, slideTo), now + duration);
    }

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterHz, now);

    const peak = Math.max(0.001, gainLevel);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(peak, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(peak * 0.45, now + duration * 0.55);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(useMusicBus ? this.musicBus : this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.03);
  }

  private playDrum(kind: 'K' | 'S' | 'H' | 'T'): void {
    const ctx = this.ensureCtx();
    if (!ctx || !this.musicBus || !this.noiseBuffer) return;
    const now = ctx.currentTime;

    if (kind === 'K' || kind === 'T') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(kind === 'T' ? 140 : 125, now);
      osc.frequency.exponentialRampToValueAtTime(kind === 'T' ? 58 : 42, now + (kind === 'T' ? 0.18 : 0.09));
      gain.gain.setValueAtTime(kind === 'T' ? 0.14 : 0.16, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === 'T' ? 0.2 : 0.11));
      osc.connect(gain);
      gain.connect(this.musicBus);
      osc.start(now);
      osc.stop(now + 0.22);
      return;
    }

    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = kind === 'H' ? 'highpass' : 'bandpass';
    filter.frequency.value = kind === 'H' ? 6800 : 2100;

    const gain = ctx.createGain();
    const dur = kind === 'H' ? 0.045 : 0.11;
    gain.gain.setValueAtTime(kind === 'H' ? 0.035 : 0.085, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicBus);
    src.start(now);
    src.stop(now + dur + 0.02);
  }

  // --- SFX ---
  public playStep(): void {
    const pitch = 135 + (Math.random() - 0.5) * 26;
    this.playSynthVoice(pitch, 0.04, 'triangle', 0.08, 900, false, 0, pitch * 0.72);
  }

  public playDogBark(): void {
    // Cheerful cute pixel dog "Au! Au!"
    this.playSynthVoice(420, 0.075, 'triangle', 0.22, 1800, false, 0, 640);
    this.playSynthVoice(470, 0.09, 'triangle', 0.24, 1900, false, 0.1, 700);
  }

  public playDialogOpen(): void {
    this.playSynthVoice(440, 0.08, 'triangle', 0.18, 2200, false, 0);
    this.playSynthVoice(587.33, 0.1, 'triangle', 0.2, 2400, false, 0.06);
  }

  public playTypeBlip(): void {
    const pitch = 520 + (Math.random() - 0.5) * 80;
    this.playSynthVoice(pitch, 0.028, 'square', 0.045, 1800, false);
  }

  public playSwordSlash(): void {
    const ctx = this.ensureCtx();
    if (!ctx || !this.masterGain || !this.noiseBuffer) return;
    const now = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuffer;
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3400, now);
    filter.frequency.exponentialRampToValueAtTime(650, now + 0.15);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
    src.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    src.start(now);
    src.stop(now + 0.18);
  }

  public playMonsterHit(): void {
    this.playSwordSlash();
    this.playSynthVoice(240, 0.11, 'sawtooth', 0.22, 1400, false, 0.05, 85);
    this.playSynthVoice(523.25, 0.11, 'triangle', 0.22, 2600, false, 0.08);
    this.playSynthVoice(783.99, 0.18, 'triangle', 0.22, 2800, false, 0.15);
  }

  public playShieldBlock(): void {
    this.playSynthVoice(660, 0.09, 'sine', 0.22, 3200, false, 0, 990);
    this.playSynthVoice(880, 0.18, 'triangle', 0.2, 3200, false, 0.06, 1320);
  }

  public playCorrect(): void {
    this.playMonsterHit();
  }

  public playWrong(): void {
    this.playSynthVoice(215, 0.15, 'sawtooth', 0.22, 1100, false, 0, 145);
    this.playSynthVoice(150, 0.22, 'sawtooth', 0.2, 950, false, 0.13, 95);
  }

  public playItemPickup(): void {
    this.playSynthVoice(587.33, 0.09, 'sine', 0.22, 3000, false, 0);
    this.playSynthVoice(880, 0.12, 'sine', 0.24, 3200, false, 0.07);
    this.playSynthVoice(1174.66, 0.2, 'triangle', 0.22, 3200, false, 0.15);
  }

  public playLevelUp(): void {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((n, idx) => {
      this.playSynthVoice(n, idx === notes.length - 1 ? 0.42 : 0.12, 'triangle', 0.26, 3000, false, idx * 0.09);
    });
  }

  public playBattleStart(mode: 'monster' | 'npc-duel' | 'miniboss' | 'boss' = 'monster'): void {
    const seq =
      mode === 'boss'
        ? [220, 207.65, 196, 261.63, 185, 293.66]
        : mode === 'npc-duel'
          ? [392, 493.88, 587.33, 783.99]
          : mode === 'miniboss'
            ? [293.66, 349.23, 329.63, 440]
            : [330, 392, 493.88];
    seq.forEach((n, idx) => {
      this.playSynthVoice(
        n,
        0.11,
        mode === 'boss' || mode === 'miniboss' ? 'sawtooth' : 'square',
        0.18,
        2200,
        false,
        idx * 0.065
      );
    });
  }

  public startMusic(track: MusicTrackId): void {
    if (this.muted) return;
    const isAlreadyPlaying =
      this.currentTrack === track &&
      (this.bgmTimer !== null || (this.activeAudio !== null && !this.activeAudio.paused));
    if (isAlreadyPlaying) return;

    this.stopMusic();
    this.currentTrack = track;
    this.stepIdx = 0;

    const customUrl = getTrackAudioUrl(track);
    if (customUrl && typeof Audio !== 'undefined') {
      this.startAudioFileTrack(track, customUrl);
      return;
    }

    this.startSynthLoop(track);
  }

  private startAudioFileTrack(track: MusicTrackId, url: string): void {
    let audio = this.audioCache.get(track);
    if (!audio) {
      audio = new Audio(url);
      audio.loop = true;
      audio.preload = 'auto';
      this.audioCache.set(track, audio);
    }

    // Combat & Title themes always start fresh on beat 1; overworld regions gently start/continue
    const isCombatOrTitle =
      track === 'title' ||
      track === 'battle' ||
      track === 'npc-duel' ||
      track === 'miniboss' ||
      track === 'boss';
    try {
      if (isCombatOrTitle || Number.isNaN(audio.currentTime) || audio.ended) {
        audio.currentTime = 0;
      }
    } catch {
      // ignore seek error before metadata loads
    }

    audio.onerror = () => {
      if (this.currentTrack === track && this.activeAudio === audio) {
        this.activeAudio = null;
        this.clearFade();
        this.startSynthLoop(track);
      }
    };

    this.activeAudio = audio;
    const targetVol = this.getMusicAudioVolume();
    audio.volume = Math.min(0.05, targetVol);

    const playPromise = audio.play();
    const beginFadeIn = () => {
      if (this.activeAudio !== audio || this.muted) return;
      this.pendingUnlockTrack = null;
      this.clearFade();
      const steps = 8;
      let tick = 0;
      this.fadeTimer = window.setInterval(() => {
        tick += 1;
        if (this.activeAudio !== audio || this.muted) {
          this.clearFade();
          return;
        }
        const finalVol = this.getMusicAudioVolume();
        audio.volume = Math.min(finalVol, (finalVol * tick) / steps);
        if (tick >= steps) {
          audio.volume = finalVol;
          this.clearFade();
        }
      }, 40);
    };

    if (playPromise && typeof playPromise.then === 'function') {
      playPromise
        .then(beginFadeIn)
        .catch(() => {
          // Browser blocked autoplay before user gesture — silently arm one-time unlock
          if (this.currentTrack === track && !this.muted) {
            this.pendingUnlockTrack = track;
            this.bindGestureUnlock();
          }
        });
    } else {
      beginFadeIn();
    }
  }

  private startSynthLoop(track: MusicTrackId): void {
    const song = SONGS[track] || SONGS['reino-da-toga'];
    const stepMs = Math.round((60 / song.bpm / 2) * 1000); // 8th-note grid
    const stepSec = stepMs / 1000;

    const playStepNow = () => {
      if (this.muted) return;
      const i = this.stepIdx % song.lead.length;

      const leadMidi = song.lead[i];
      if (leadMidi !== null && leadMidi !== undefined) {
        this.playSynthVoice(
          midiToHz(leadMidi),
          stepSec * 1.65,
          song.leadWave,
          track === 'boss' || track === 'npc-duel' ? 0.11 : 0.095,
          song.leadFilter,
          true
        );
      }

      const harmMidi = song.harmony[i];
      if (harmMidi !== null && harmMidi !== undefined) {
        this.playSynthVoice(
          midiToHz(harmMidi),
          stepSec * 2.4,
          'triangle',
          0.055,
          1700,
          true
        );
      }

      const arpMidi = song.arp[i];
      if (arpMidi !== null && arpMidi !== undefined) {
        this.playSynthVoice(
          midiToHz(arpMidi),
          stepSec * 0.85,
          song.arpWave,
          0.042,
          2100,
          true
        );
      }

      const bassMidi = song.bass[i];
      if (bassMidi !== null && bassMidi !== undefined) {
        this.playSynthVoice(
          midiToHz(bassMidi),
          stepSec * 1.45,
          song.bassWave,
          0.095,
          750,
          true
        );
      }

      const drum = song.drums[i];
      if (drum && drum !== '.') {
        this.playDrum(drum);
      }

      this.stepIdx += 1;
    };

    playStepNow();
    this.bgmTimer = window.setInterval(playStepNow, stepMs);
  }

  public stopMusic(): void {
    this.clearFade();
    if (this.bgmTimer !== null) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio = null;
    }
    this.pendingUnlockTrack = null;
    this.currentTrack = null;
  }
}

export const soundEngine = new SoundEngine();
