/**
 * Sons da interface, sintetizados na hora com a Web Audio API (sem arquivos de áudio).
 *
 * - O som vem ligado por padrão; a escolha de silenciar fica salva no localStorage.
 * - Navegadores só liberam áudio depois de uma interação do visitante: antes disso
 *   `play` simplesmente não faz nada (sem erro nem aviso no console).
 * - Sons repetidos em sequência rápida são limitados (THROTTLE_MS) para não virar ruído.
 */

export type SoundName =
  | "click"
  | "tick"
  | "hover"
  | "thump"
  | "open"
  | "close"
  | "confirm"
  | "up"
  | "on"
  | "off"
  | "decrypt"
  | "section";

const STORAGE_KEY = "sound-muted";

/** Volume geral (0 a 1) */
const MASTER_VOLUME = 0.55;

/** Intervalo mínimo (ms) entre dois sons do mesmo tipo */
const THROTTLE_MS: Partial<Record<SoundName, number>> = { hover: 140, tick: 45, click: 45, decrypt: 40, section: 320 };

const DEFAULT_THROTTLE_MS = 60;

interface Tone {
  type?: OscillatorType;
  /** frequência inicial (Hz) */
  from: number;
  /** frequência final (Hz): o tom desliza de `from` até `to` */
  to?: number;
  /** atraso (s) para começar */
  at?: number;
  /** duração (s) */
  duration: number;
  volume: number;
}

interface Noise {
  at?: number;
  duration: number;
  volume: number;
  /** tipo e frequência de corte do filtro que dá "cor" ao ruído */
  filter: BiquadFilterType;
  frequency: number;
}

let context: AudioContext | null = null;

let output: GainNode | null = null;

let noiseBuffer: AudioBuffer | null = null;

let muted = false;

let mutedLoaded = false;

const lastPlayed = new Map<SoundName, number>();

const listeners = new Set<() => void>();

const loadMuted = () => {
  if (mutedLoaded || typeof window === "undefined") return;

  mutedLoaded = true;

  try {
    muted = window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    muted = false;
  }
};

/** Para `useSyncExternalStore`: avisa a interface quando o som é ligado/desligado */
export const subscribeMuted = (listener: () => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const isMuted = () => {
  loadMuted();

  return muted;
};

export const setMuted = (value: boolean) => {
  loadMuted();

  // ao silenciar, o "desligado" soa uma última vez, antes de o som ser cortado
  if (value) playSound("off");

  muted = value;

  try {
    window.localStorage.setItem(STORAGE_KEY, value ? "1" : "0");
  } catch {
    // sem localStorage (modo privado, por exemplo): vale só nesta visita
  }

  listeners.forEach((listener) => listener());

  // um som de confirmação ao ligar/desligar, para o visitante ouvir (ou não) a diferença
  if (!value) playSound("on");
};

const getContext = (): { ctx: AudioContext; out: GainNode } | null => {
  if (typeof window === "undefined") return null;

  // antes da primeira interação o navegador bloqueia o áudio: nem tenta
  if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return null;

  if (!context) {
    const Context = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!Context) return null;

    context = new Context();

    const compressor = context.createDynamicsCompressor();

    output = context.createGain();

    output.gain.value = MASTER_VOLUME;

    output.connect(compressor);

    compressor.connect(context.destination);
  }

  if (context.state === "suspended") void context.resume();

  return output ? { ctx: context, out: output } : null;
};

const tone = (ctx: AudioContext, out: AudioNode, { type = "sine", from, to = from, at = 0, duration, volume }: Tone) => {
  const start = ctx.currentTime + at;

  const oscillator = ctx.createOscillator();

  const gain = ctx.createGain();

  oscillator.type = type;

  oscillator.frequency.setValueAtTime(from, start);

  if (to !== from) oscillator.frequency.exponentialRampToValueAtTime(to, start + duration);

  // ataque quase instantâneo e queda suave: sem estalo no começo nem no fim
  gain.gain.setValueAtTime(0.0001, start);

  gain.gain.exponentialRampToValueAtTime(volume, start + 0.006);

  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  oscillator.connect(gain);

  gain.connect(out);

  oscillator.start(start);

  oscillator.stop(start + duration + 0.03);
};

const noise = (ctx: AudioContext, out: AudioNode, { at = 0, duration, volume, filter, frequency }: Noise) => {
  if (!noiseBuffer) {
    noiseBuffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);

    const data = noiseBuffer.getChannelData(0);

    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }

  const start = ctx.currentTime + at;

  const source = ctx.createBufferSource();

  const biquad = ctx.createBiquadFilter();

  const gain = ctx.createGain();

  source.buffer = noiseBuffer;

  biquad.type = filter;

  biquad.frequency.value = frequency;

  gain.gain.setValueAtTime(volume, start);

  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);

  source.connect(biquad);

  biquad.connect(gain);

  gain.connect(out);

  source.start(start);

  source.stop(start + duration + 0.03);
};

/** A "receita" de cada som: tons e ruídos combinados */
const RECIPES: Record<SoundName, (ctx: AudioContext, out: AudioNode) => void> = {
  // clique de botão: estalinho agudo com um corpo curto que cai de tom
  click: (ctx, out) => {
    tone(ctx, out, { from: 880, to: 360, duration: 0.075, volume: 0.2 });
    noise(ctx, out, { duration: 0.02, volume: 0.1, filter: "highpass", frequency: 3200 });
  },

  // troca leve (idioma, setas, miniaturas): mais curto e mais discreto que o clique
  tick: (ctx, out) => {
    tone(ctx, out, { type: "triangle", from: 1500, to: 1050, duration: 0.04, volume: 0.1 });
  },

  // passar o mouse em algo: quase imperceptível, só uma "bolinha" subindo
  hover: (ctx, out) => {
    tone(ctx, out, { from: 640, to: 800, duration: 0.07, volume: 0.04 });
  },

  // impacto grave (clique nos painéis de pontos): batida de bumbo + ruído abafado
  thump: (ctx, out) => {
    tone(ctx, out, { from: 150, to: 42, duration: 0.5, volume: 0.6 });
    tone(ctx, out, { type: "triangle", from: 320, to: 90, duration: 0.14, volume: 0.22 });
    noise(ctx, out, { duration: 0.16, volume: 0.22, filter: "lowpass", frequency: 420 });
  },

  // abrir: duas notas subindo
  open: (ctx, out) => {
    tone(ctx, out, { from: 420, to: 640, duration: 0.13, volume: 0.14 });
    tone(ctx, out, { from: 640, to: 920, at: 0.07, duration: 0.16, volume: 0.12 });
  },

  // fechar: duas notas descendo
  close: (ctx, out) => {
    tone(ctx, out, { from: 700, to: 460, duration: 0.11, volume: 0.13 });
    tone(ctx, out, { from: 460, to: 300, at: 0.06, duration: 0.14, volume: 0.1 });
  },

  // confirmação (download): arpejo maior curto e brilhante
  confirm: (ctx, out) => {
    [523, 659, 784].forEach((frequency, index) => {
      tone(ctx, out, { from: frequency, at: index * 0.075, duration: 0.2, volume: 0.12 });
      tone(ctx, out, { type: "triangle", from: frequency * 2, at: index * 0.075, duration: 0.12, volume: 0.04 });
    });
  },

  // voltar ao topo: varrida subindo
  up: (ctx, out) => {
    tone(ctx, out, { from: 280, to: 1000, duration: 0.24, volume: 0.12 });
    noise(ctx, out, { duration: 0.22, volume: 0.05, filter: "bandpass", frequency: 1800 });
  },

  // letra "decifrada" no nome: pinguinho digital bem baixo, com o tom variando um pouco a cada letra
  decrypt: (ctx, out) => {
    tone(ctx, out, { type: "triangle", from: 1700 + Math.random() * 900, duration: 0.035, volume: 0.035 });
  },

  // troca de seção: "folha" passando (sopro filtrado) com duas notas suaves subindo
  section: (ctx, out) => {
    noise(ctx, out, { duration: 0.2, volume: 0.06, filter: "bandpass", frequency: 900 });
    tone(ctx, out, { from: 392, to: 440, duration: 0.2, volume: 0.07 });
    tone(ctx, out, { from: 587, to: 659, at: 0.06, duration: 0.22, volume: 0.05 });
  },

  on: (ctx, out) => {
    tone(ctx, out, { from: 560, to: 880, duration: 0.11, volume: 0.15 });
  },

  off: (ctx, out) => {
    tone(ctx, out, { from: 560, to: 280, duration: 0.11, volume: 0.15 });
  },
};

export const playSound = (name: SoundName) => {
  if (typeof window === "undefined" || isMuted()) return;

  const now = performance.now();

  if (now - (lastPlayed.get(name) ?? -Infinity) < (THROTTLE_MS[name] ?? DEFAULT_THROTTLE_MS)) return;

  try {
    const audio = getContext();

    if (!audio) return;

    lastPlayed.set(name, now);

    RECIPES[name](audio.ctx, audio.out);
  } catch {
    // áudio indisponível: a interface segue funcionando em silêncio
  }
};
