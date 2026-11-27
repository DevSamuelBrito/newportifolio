/**
 * Dados públicos do GitHub para a seção "Atividade no GitHub". A busca roda no servidor
 * (com cache de 1 hora), então a API não é chamada a cada visita e não há problema de CORS.
 * Se algo falhar, a função devolve `null` nessa parte e a seção mostra um aviso em vez de quebrar a página.
 */

export const GITHUB_USER = "DevSamuelBrito";

const REVALIDATE_SECONDS = 3600;

export interface ContributionDay {
  date: string;
  count: number;
  /** 0 a 4, como no gráfico do GitHub */
  level: number;
}

export interface ContributionCalendar {
  /** Dias em ordem, de domingo a sábado, semana por semana. `null` = dia vazio (antes do começo ou no futuro) */
  cells: (ContributionDay | null)[];
  total: number;
  activeDays: number;
  currentStreak: number;
  longestStreak: number;
  bestCount: number;
  bestDate: string | null;
  from: string | null;
  to: string | null;
}

export interface GitHubRepo {
  name: string;
  url: string;
  language: string | null;
  stars: number;
  pushed: string;
}

export interface GitHubData {
  user: string;
  profileUrl: string;
  calendar: ContributionCalendar | null;
  repos: GitHubRepo[] | null;
}

async function getJson(url: string): Promise<unknown> {
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!response.ok) throw new Error(`${response.status} ${url}`);

  return response.json();
}

const isDate = (value: unknown): value is string => typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

/** Dia da semana (0 = domingo) de uma data "AAAA-MM-DD", em UTC (não depende do fuso do servidor) */
const weekday = (date: string) => new Date(`${date}T00:00:00Z`).getUTCDay();

function buildCalendar(raw: unknown): ContributionCalendar {
  const list = (raw as { contributions?: unknown })?.contributions;

  if (!Array.isArray(list)) throw new Error("calendário: formato inesperado");

  const days: ContributionDay[] = list
    .filter((item): item is { date: string; count: number; level: number } => !!item && isDate(item.date))
    .map((item) => ({
      date: item.date,
      count: Math.max(0, Number(item.count) | 0),
      level: Math.min(4, Math.max(0, Number(item.level) | 0)),
    }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));

  if (days.length === 0) throw new Error("calendário vazio");

  // o último dia da lista é "hoje" para a API; a grade fecha a semana de hoje com dias vazios
  const today = days[days.length - 1].date;

  const dayOfWeek = weekday(today);

  const visible = 364 + dayOfWeek + 1;

  const recent = days.slice(-visible);

  const cells: (ContributionDay | null)[] = [
    ...Array.from({ length: visible - recent.length }, () => null),
    ...recent,
    ...Array.from({ length: 6 - dayOfWeek }, () => null),
  ];

  let total = 0;
  let activeDays = 0;
  let longestStreak = 0;
  let running = 0;
  let bestCount = 0;
  let bestDate: string | null = null;

  for (const day of recent) {
    total += day.count;

    if (day.count > 0) {
      activeDays++;
      running++;
      longestStreak = Math.max(longestStreak, running);
    } else {
      running = 0;
    }

    if (day.count > bestCount) {
      bestCount = day.count;
      bestDate = day.date;
    }
  }

  // sequência atual: dias seguidos com contribuição até hoje (se hoje ainda está zerado, conta até ontem)
  let cursor = recent.length - 1;

  if (cursor >= 0 && recent[cursor].count === 0) cursor--;

  let currentStreak = 0;

  while (cursor >= 0 && recent[cursor].count > 0) {
    currentStreak++;
    cursor--;
  }

  return {
    cells,
    total,
    activeDays,
    currentStreak,
    longestStreak,
    bestCount,
    bestDate,
    from: recent[0]?.date ?? null,
    to: recent[recent.length - 1]?.date ?? null,
  };
}

function buildRepos(raw: unknown): GitHubRepo[] {
  if (!Array.isArray(raw)) throw new Error("repositórios: formato inesperado");

  return raw
    .filter(
      (repo) =>
        repo &&
        typeof repo.name === "string" &&
        typeof repo.html_url === "string" &&
        !repo.fork &&
        !repo.archived &&
        // o repositório do perfil (README) leva o nome do usuário e não é um projeto
        repo.name.toLowerCase() !== GITHUB_USER.toLowerCase()
    )
    .map((repo) => ({
      name: repo.name as string,
      url: repo.html_url as string,
      language: typeof repo.language === "string" ? repo.language : null,
      stars: Math.max(0, Number(repo.stargazers_count) | 0),
      pushed: typeof repo.pushed_at === "string" ? repo.pushed_at : "",
    }));
}

export async function getGitHubData(): Promise<GitHubData> {
  const [calendar, repos] = await Promise.allSettled([
    getJson(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`).then(buildCalendar),
    getJson(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`).then(buildRepos),
  ]);

  return {
    user: GITHUB_USER,
    profileUrl: `https://github.com/${GITHUB_USER}`,
    calendar: calendar.status === "fulfilled" ? calendar.value : null,
    repos: repos.status === "fulfilled" ? repos.value : null,
  };
}
