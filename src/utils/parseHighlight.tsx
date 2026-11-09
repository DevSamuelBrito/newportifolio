/**
 * Transforma trechos entre {{ chaves duplas }} dos arquivos de tradução
 * em texto destacado (azul e semi-negrito).
 */
export function parseHighlight(text: string) {
  const parts = text.split(/(\{\{.*?\}\})/g);

  return parts.map((part, index) => {
    if (part.startsWith("{{") && part.endsWith("}}")) {
      const content = part.slice(2, -2).trim();
      return (
        <span key={index} className="font-semibold text-blue-400">
          {content}
        </span>
      );
    }
    return part;
  });
}
