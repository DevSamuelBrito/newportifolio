//components
import { GitHubActivity } from "./components/GitHubActivity";

//lib
import { getGitHubData } from "@/lib/github";

/** Seção "Atividade no GitHub": busca os dados no servidor (cache de 1h) e entrega pronta para a tela. */
export async function GitHub() {
  const data = await getGitHubData();

  return <GitHubActivity data={data} />;
}
