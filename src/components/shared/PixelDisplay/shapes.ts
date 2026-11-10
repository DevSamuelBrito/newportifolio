/** Quantidade de pontos por lado do display */
export const GRID = 26;

/** Cada ponto é desenhado em um quadrado de `GRID * SUPERSAMPLE` px e depois reduzido, para ter bordas suaves */
const SUPERSAMPLE = 4;

/**
 * Uma forma do display: ou o miolo de um SVG (geometria do lucide, viewBox 24) que vira pontos,
 * ou uma função que já devolve a grade de intensidades (0 a 1) desenhada à mão.
 */
export type ShapeSource = string | (() => Float32Array);

/** Ícones das experiências, na ordem delas (do mais recente ao mais antigo) */
export const EXPERIENCE_SHAPES: ShapeSource[] = [
  // engrenagem: sistemas industriais da Canastra (silhueta preenchida: disco + 8 dentes, com furo)
  `<defs><mask id="hole"><rect width="24" height="24" fill="white"/><circle cx="12" cy="12" r="3" fill="black"/></mask></defs>` +
    `<g mask="url(#hole)" fill="white" stroke="none"><circle cx="12" cy="12" r="6.4"/>` +
    [0, 45, 90, 135]
      .map((angle) => `<rect x="10.3" y="2.2" width="3.4" height="19.6" rx="0.5" transform="rotate(${angle} 12 12)"/>`)
      .join("") +
    `</g>`,
  // </>: freelancer
  `<path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/>`,
  // servidor: setor de TI
  `<rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/>`,
  // monitor: estágio de TI
  `<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>`,
  // raio: eletricista de manutenção
  `<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" fill="white"/>`,
];

/** Pequeno "pincel" para desenhar formas na grade, ponto a ponto */
function createCanvas() {
  const grid = new Float32Array(GRID * GRID);

  const set = (x: number, y: number, value: number) => {
    const column = Math.round(x);

    const row = Math.round(y);

    if (column < 0 || row < 0 || column >= GRID || row >= GRID) return;

    const index = row * GRID + column;

    if (grid[index] < value) grid[index] = value;
  };

  return {
    grid,
    rect(x: number, y: number, width: number, height: number, value: number) {
      for (let row = y; row < y + height; row++) for (let column = x; column < x + width; column++) set(column, row, value);
    },
    line(x0: number, y0: number, x1: number, y1: number, value: number, thickness = 1) {
      const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) * 2 || 1;

      for (let step = 0; step <= steps; step++) {
        const x = x0 + ((x1 - x0) * step) / steps;

        const y = y0 + ((y1 - y0) * step) / steps;

        for (let dx = 0; dx < thickness; dx++) for (let dy = 0; dy < thickness; dy++) set(x + dx, y + dy, value);
      }
    },
    ring(cx: number, cy: number, inner: number, outer: number, value: number) {
      for (let y = Math.floor(cy - outer); y <= cy + outer; y++) {
        for (let x = Math.floor(cx - outer); x <= cx + outer; x++) {
          const distance = Math.hypot(x - cx, y - cy);

          if (distance >= inner && distance <= outer) set(x, y, value);
        }
      }
    },
    /** Preenche o polígono (lista de pontos [x, y]) usando o teste de "ponto dentro" */
    polygon(points: [number, number][], value: number) {
      for (let y = 0; y < GRID; y++) {
        for (let x = 0; x < GRID; x++) {
          let inside = false;

          for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
            const [xi, yi] = points[i];

            const [xj, yj] = points[j];

            if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
          }

          if (inside) set(x, y, value);
        }
      }
    },
    disc(cx: number, cy: number, radius: number, value: number) {
      for (let y = Math.floor(cy - radius); y <= cy + radius; y++) {
        for (let x = Math.floor(cx - radius); x <= cx + radius; x++) {
          if ((x - cx) ** 2 + (y - cy) ** 2 <= radius * radius) set(x, y, value);
        }
      }
    },
  };
}

/** Medalha: fitas em V, disco com aro e uma estrela de cinco pontas no meio */
function medal(): Float32Array {
  const canvas = createCanvas();

  // fitas em V (terminam antes do disco, para não aparecerem por cima dele)
  canvas.polygon(
    [
      [7, 0],
      [11.5, 0],
      [14.5, 7],
      [10, 7],
    ],
    0.7
  );

  canvas.polygon(
    [
      [19, 0],
      [14.5, 0],
      [11.5, 7],
      [16, 7],
    ],
    0.7
  );

  // disco: miolo suave e aro mais forte
  const cx = 13;

  const cy = 15.5;

  canvas.disc(cx, cy, 10, 0.3);
  canvas.ring(cx, cy, 8.6, 10.4, 0.85);

  // estrela de 5 pontas no meio
  const star: [number, number][] = Array.from({ length: 10 }, (_, point) => {
    const angle = -Math.PI / 2 + (point * Math.PI) / 5;

    const radius = point % 2 === 0 ? 6.4 : 2.7;

    return [cx + radius * Math.cos(angle), cy + 0.5 + radius * Math.sin(angle)];
  });

  canvas.polygon(star, 1);

  return canvas.grid;
}

export const MEDAL_SHAPES: ShapeSource[] = [medal];

/** Gráfico de barras dentro de uma moldura (atividade no GitHub) */
function barsChart(): Float32Array {
  const canvas = createCanvas();

  // moldura
  canvas.rect(1, 2, 24, 1, 0.55);
  canvas.rect(1, 22, 24, 1, 0.55);
  canvas.rect(1, 2, 1, 21, 0.55);
  canvas.rect(24, 2, 1, 21, 0.55);

  // "título" do gráfico e legenda
  canvas.rect(3, 4, 9, 1, 1);
  canvas.rect(3, 6, 5, 1, 0.6);
  canvas.rect(20, 4, 2, 2, 1);

  // barras crescentes: topo mais claro, corpo mais escuro nas primeiras
  [4, 6, 5, 8, 7, 10, 13].forEach((height, bar) => {
    const x = 3 + bar * 3;

    for (let y = 21 - height; y <= 20; y++) canvas.rect(x, y, 2, 1, y === 21 - height ? 1 : bar > 3 ? 0.75 : 0.5);
  });

  // linha do chão
  canvas.rect(2, 20, 22, 1, 0.3);

  return canvas.grid;
}

export const BARS_SHAPES: ShapeSource[] = [barsChart];

/** Transforma uma forma em uma grade GRID x GRID de intensidades (0 a 1) */
export function rasterize(source: ShapeSource): Promise<Float32Array> {
  if (typeof source === "function") return Promise.resolve(source());

  return new Promise((resolve) => {
    const size = GRID * SUPERSAMPLE;

    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="2 2 20 20" width="${size}" height="${size}" ` +
      `fill="none" stroke="white" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">${source}</svg>`;

    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement("canvas");

      canvas.width = size;
      canvas.height = size;

      const context = canvas.getContext("2d", { willReadFrequently: true });

      const result = new Float32Array(GRID * GRID);

      if (!context) {
        resolve(result);
        return;
      }

      context.drawImage(image, 0, 0, size, size);

      const { data } = context.getImageData(0, 0, size, size);

      for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
          const cell = Math.floor(y / SUPERSAMPLE) * GRID + Math.floor(x / SUPERSAMPLE);

          result[cell] += data[(y * size + x) * 4 + 3] / 255;
        }
      }

      // média do bloco (alfa) e um pequeno reforço, descartando o que é só "sujeira" de borda
      for (let cell = 0; cell < result.length; cell++) {
        const value = Math.min(1, (result[cell] / (SUPERSAMPLE * SUPERSAMPLE)) * 1.35);

        result[cell] = value < 0.12 ? 0 : value;
      }

      resolve(result);
    };

    image.onerror = () => resolve(new Float32Array(GRID * GRID));

    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
}
