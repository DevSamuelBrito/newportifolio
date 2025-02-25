"use client"
import DevControle from "@/assets/images/devcontrole.png";
import DalyGames from "@/assets/images/dalyGames.jpg";
import tarefasNextJs from "@/assets/images/tarefasNextJs.jpg";
import { FaReact } from "react-icons/fa";
import { SiNextdotjs, SiMongodb, SiPrisma, SiTypescript, SiTailwindcss, SiStyledcomponents, SiFirebase, SiReact, SiNodedotjs } from "react-icons/si";
import { ProjectCard } from "./components/ProjectCard";
import { useLanguage } from "@/app/providers/LanguageContext";

const translation = {
  en: {
    projects: "Projects"
  }, pt: {
    projects: "Projetos"
  }
}

export function Projects() {
  const { language } = useLanguage();

  return (
    <section className="bg-gray-900 min-h-screen pt-14">
      <div className="px-4 md:px-0 max-w-screen-xl lg:max-w-[70rem] xl:max-w-[76rem] 2xl:max-w-[92rem] py-8 mx-auto min-h-fit" >


        <div className="text-center">
          <h2 className="text-3xl font-bold text-white relative inline-block">
            {translation[language].projects}
            <span className="block w-24 h-1 bg-blue-500 mt-2 mx-auto rounded-full"></span>
          </h2>
        </div>


        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">

          <ProjectCard title="Dev Controle" src={DevControle} stack={[SiTypescript, FaReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma]} post="https://www.linkedin.com/posts/samuel-fava-de-brito_nextjs-react-typescript-activity-7295234873252888576-0_00?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY" repository="https://github.com/DevSamuelBrito/Dev_Controle.git" descriptionBr={`Dev_Controle é uma aplicação full-stack desenvolvida com Next.js para gerenciamento de usuários e chamados.
          import DalyGames from "@/assets/images/dalygames.png";
O projeto inclui autenticação de usuários, cadastro e gerenciamento de clientes e criação de chamados vinculados.Além disso, qualquer pessoa pode abrir um chamado informando apenas o e-mail do cliente.

💡 Criado para estudo de MongoDB, rotas de API e deploy de aplicações full-stack.`} descriptionEn={`Dev_Controle is a full-stack application developed with Next.js for user and ticket management.
The project includes user authentication, customer registration and management, and creation of linked tickets. In addition, anyone can open a ticket by simply providing the customer's email.

💡 Created for studying MongoDB, API routes, and deploying full-stack applications.`} />

          <ProjectCard title="DalyGames" src={DalyGames} stack={[SiTypescript, FaReact, SiNextdotjs, SiTailwindcss]} descriptionBr={`DalyGames é uma aplicação web desenvolvida com Next.js para explorar e gerenciar jogos. O projeto consome uma API REST para exibir detalhes dos jogos, incluindo título, descrição, imagem, plataformas e categorias. Algumas das principais funcionalidades incluem pesquisa de jogos, exibição de um jogo do dia e a possibilidade de favoritar títulos no perfil do usuário. Durante o desenvolvimento, foquei na criação de componentes reutilizáveis e no uso de renderização server-side e client-side para otimizar a experiência do usuário.`} descriptionEn={`DalyGames is a web application developed with Next.js for exploring and managing games. The project uses a REST API to display game details, including title, description, image, platforms, and categories. Some of the main features include searching for games, displaying a game of the day, and the ability to favorite titles on the user's profile. During development, I focused on creating reusable components and using server-side and client-side rendering to optimize the user experience. This project was a great opportunity to improve my knowledge of Next.js, TypeScript, REST APIs, and Tailwind CSS.`} post="https://www.linkedin.com/posts/samuel-fava-de-brito_boa-tarde-pessoal-hoje-quero-compartilhar-activity-7281731227349319680-TPVb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY" repository="https://github.com/DevSamuelBrito/DalyGames.git" />
          <ProjectCard title="Tarefas NextJs" src={tarefasNextJs} stack={[SiTypescript, SiStyledcomponents, SiFirebase, SiReact, SiNextdotjs, SiNodedotjs]} post="https://www.linkedin.com/posts/samuel-fava-de-brito_ol%C3%A1-pessoal-espero-que-estejam-bem-recentemente-activity-7237147758741094404-m2mZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY" repository="https://github.com/DevSamuelBrito/Tarefas_NextJS.git" descriptionBr={`Este projeto é uma aplicação de lista de tarefas (To-Do List) desenvolvida com Next.js, focada em gerenciamento e compartilhamento de tarefas. A autenticação é feita via Google usando NextAuth, permitindo que usuários criem, editem e compartilhem tarefas com outras pessoas. Caso um usuário queira interagir com tarefas compartilhadas, ele também precisa estar autenticado. O sistema conta com um painel de controle, onde os usuários podem gerenciar suas tarefas e definir se elas serão públicas ou privadas. Além disso, implementei endpoints para gerenciar tarefas e comentários, utilizando Firebase para armazenar os dados. Esse projeto foi uma ótima oportunidade para aprofundar meus conhecimentos em Next.js, autenticação com NextAuth e integração com Firebase.`} descriptionEn={`This project is a To-Do List application developed with Next.js, focused on task management and sharing. Authentication is done via Google using NextAuth, allowing users to create, edit and share tasks with others. If a user wants to interact with shared tasks, he/she also needs to be authenticated. The system has a control panel, where users can manage their tasks and define whether they are public or private. In addition, I implemented endpoints to manage tasks and comments, using Firebase to store the data. This project was a great opportunity to deepen my knowledge of Next.js, authentication with NextAuth and integration with Firebase.`} />
        </div>
      </div>
    </section>
  );
}
