export function parseHighlight(text: string) {
  const parts = text.split(/(\{\{.*?\}\})/g);
  
  return parts.map((part, index) => {
    if (part.startsWith('{{') && part.endsWith('}}')) {
      const content = part.slice(2, -2);
      return <span key={index} className="font-bold text-blue-500">{content}</span>;
    }
    return part;
  });
}