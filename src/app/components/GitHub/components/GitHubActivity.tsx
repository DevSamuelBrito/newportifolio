"use client";

//icons
import { ArrowUpRight } from "lucide-react";

//components
import { PixelDisplay } from "@/components/shared/PixelDisplay";

import { BARS_SHAPES } from "@/components/shared/PixelDisplay/shapes";

import { Reveal } from "@/components/shared/Reveal";

import { Section } from "@/components/shared/Section";

import { SectionHeading } from "@/components/shared/SectionHeading";

//hooks
import { useTranslation } from "@/hooks/useTranslation";

//types
import type { GitHubData } from "@/lib/github";

/** Quantos repositórios aparecem na lista */
const REPOS_SHOWN = 4;

/** Cor de cada nível de contribuição (0 a 4), do mais apagado ao mais forte */
const LEVEL_CLASS = ["bg-white/[0.06]", "bg-blue-500/25", "bg-blue-500/50", "bg-blue-500/80", "bg-cyan-300"];

interface GitHubActivityProps {
  data: GitHubData;
}

export function GitHubActivity({ data }: GitHubActivityProps) {
  const { t, language } = useTranslation();

  const locale = language === "en" ? "en-US" : "pt-BR";

  // timeZone UTC: as datas vêm como "AAAA-MM-DD" e não podem recuar um dia por causa do fuso
  const formatDay = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString(locale, { day: "2-digit", month: "short", timeZone: "UTC" }).replace(/\.| de/g, "");

  const formatMonthYear = (iso: string) =>
    new Date(iso).toLocaleDateString(locale, { month: "short", year: "numeric", timeZone: "UTC" }).replace(/\.| de/g, "");

  const { calendar, repos } = data;

  const stats = calendar
    ? [
        { value: calendar.activeDays.toLocaleString(locale), label: t.github.activeDays },
        { value: calendar.currentStreak.toLocaleString(locale), label: t.github.currentStreak },
        { value: calendar.longestStreak.toLocaleString(locale), label: t.github.longestStreak },
        {
          value: calendar.bestCount.toLocaleString(locale),
          label: `${t.github.bestDay}${calendar.bestDate ? ` · ${formatDay(calendar.bestDate)}` : ""}`,
        },
      ]
    : [];

  const shownRepos = (repos ?? []).slice(0, REPOS_SHOWN);

  return (
    <Section id="github">
      <SectionHeading
        eyebrow={t.github.eyebrow}
        title={t.github.heading}
        highlight={t.github.highlight}
        subtitle={t.github.subtitle}
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {/* Painel fixo (só em telas grandes): gráfico de barras em pontos; clique para "commitar" */}
        <aside className="hidden lg:sticky lg:top-28 lg:col-span-5 lg:block lg:self-start">
          <div className="glass p-5">
            <PixelDisplay sources={BARS_SHAPES} />
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-7">
          {calendar ? (
            <>
              <Reveal className="grid items-end gap-6 sm:grid-cols-[auto_1fr]">
                <div>
                  <p className="text-gradient text-6xl font-extrabold leading-none tracking-tighter sm:text-7xl">
                    {calendar.total.toLocaleString(locale)}
                  </p>

                  <p className="mt-3 text-neutral-400">{t.github.total}</p>
                </div>

                <dl className="glass grid grid-cols-2 overflow-hidden">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`p-4 ${index % 2 === 0 ? "border-r border-neutral-800" : ""} ${index < 2 ? "border-b border-neutral-800" : ""}`}
                    >
                      <dt className="sr-only">{stat.label}</dt>
                      <dd className="text-2xl font-bold text-white">{stat.value}</dd>
                      <p aria-hidden className="mt-1 text-xs text-neutral-400">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.1} className="glass mt-6 p-5">
                {/* Calendário: uma coluna por semana, 7 linhas (domingo a sábado) */}
                <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ gridAutoColumns: "minmax(0, 1fr)" }}>
                  {calendar.cells.map((day, index) =>
                    day ? (
                      <span
                        key={day.date}
                        title={`${day.count} ${t.github.contributionsOn} ${formatDay(day.date)}`}
                        className={`aspect-square rounded-[3px] ${LEVEL_CLASS[day.level]} ${day.date === calendar.to ? "ring-1 ring-white/80" : ""}`}
                      />
                    ) : (
                      <span key={`empty-${index}`} aria-hidden className="aspect-square" />
                    )
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between font-mono text-xs text-neutral-500">
                  <span>
                    {calendar.from && formatMonthYear(calendar.from)} — {calendar.to && formatMonthYear(calendar.to)}
                  </span>

                  <span className="flex items-center gap-1.5">
                    {t.github.today}
                    <span aria-hidden className="inline-block h-2.5 w-2.5 rounded-[3px] ring-1 ring-white/70" />
                  </span>
                </div>
              </Reveal>
            </>
          ) : (
            <Reveal className="glass p-6 text-neutral-400">
              <p>{t.github.unavailable}</p>

              <a
                href={data.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300"
              >
                {t.github.visit}
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          )}

          {shownRepos.length > 0 && (
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between gap-4">
                <h3 className="font-mono text-xs uppercase tracking-widest text-neutral-500">{t.github.reposTitle}</h3>

                <a
                  href={data.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1 font-mono text-xs font-medium text-blue-400 transition-colors hover:text-blue-300"
                >
                  {t.github.allRepos}
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <ul className="grid gap-4 sm:grid-cols-2">
                {shownRepos.map((repo, index) => (
                  <Reveal key={repo.name} delay={(index % 2) * 0.1} className="h-full">
                    <li className="h-full list-none">
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="glass glass-hover block h-full p-4"
                      >
                        <p className="truncate font-mono text-sm font-semibold text-blue-400">{repo.name}</p>

                        <p className="mt-3 font-mono text-xs text-neutral-500">
                          {[repo.language, repo.stars > 0 ? `★ ${repo.stars}` : null, repo.pushed ? formatMonthYear(repo.pushed) : null]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                      </a>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
}
