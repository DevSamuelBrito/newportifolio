//images
import DevControle from "@/assets/images/devcontrole.png";

import DalyGames from "@/assets/images/dalyGames.jpg";

import tarefasNextJs from "@/assets/images/tarefasNextJs.jpg";

import devmotors from "@/assets/images/devmotors.png";

import intergeek from "@/assets/images/intergeek.png";

import rockPaper from "@/assets/images/paperTrouserRock.png";

import webRepositorio from "@/assets/images/webRepositorios.png";

import portifolio from "@/assets/images/portifolio.png";

import portifolio1 from "@/assets/images/portifolio1.png";

import calculator from "@/assets/images/calculator.png";

import portifolIo from "@/assets/images/portifol-io.png";

import crudAspNet from "@/assets/images/crudaspnet.png";

import lpMaintanceLp from '@/assets/images/lp-maintenance-drinking-fountains.png'

//icons
import { FaReact } from "react-icons/fa";

import { SiNextdotjs, SiMongodb, SiPrisma, SiTypescript, SiTailwindcss, SiStyledcomponents, SiFirebase, SiReact, SiNodedotjs, SiHtml5, SiCss, SiMysql, SiJavascript, SiDotnet, SiPostgresql, SiShadcnui, SiResend, SiCloudinary, SiDocker, SiVercel, } from "react-icons/si";

import { CSharpIcon } from "../../Stack/components/Icons/csharpIcon";


export const ProjectsData = [
    {
        id: 'lpMaintanceLp',
        index: -1,
        src: lpMaintanceLp,
        stack: [SiReact, SiNextdotjs, SiTailwindcss, SiVercel],
        post: "",
        repository: "https://github.com/DevSamuelBrito/lp-maintenance-drinking-fountains.git",
        title: "LP Maintenance Drinking Fountains",
        descriptionBr: ``,
        descriptionEn: `This project was a simple landing page created for a maintenance company specializing in drinking fountains. The page was developed using HTML and CSS, with the goal of providing a clean and professional online presence for the business. The design focuses on showcasing the company's services, contact information, and a call to action for potential customers to get in touch. This project was an opportunity to practice basic web development skills and create a functional website for a local business.`

    },
    {
        id: "crudAspNet",
        index: 0,
        src: crudAspNet,
        stack: [CSharpIcon, SiDotnet, SiPostgresql, SiDocker],
        post: "",
        repository: "https://github.com/DevSamuelBrito/CRUD_ASPNET",
        title: "CRUD ASP.NET Core API",
        descriptionBr: `Projeto de estudo de uma API RESTful completa para gerenciamento de tarefas desenvolvida com ASP.NET Core 9.0, seguindo os princípios de Clean Architecture e melhores práticas de desenvolvimento. Este projeto foi criado para aprofundar conhecimentos em arquitetura de software e desenvolvimento back-end com .NET.
  
            🏗️ Arquitetura e Padrões
            - Clean Architecture com camadas bem separadas (API, Application, Domain, Infrastructure)
            - DTOs para separação de responsabilidades
            - Repository Pattern para acesso a dados
            - AutoMapper para mapeamento de objetos
            - Validações automáticas com Data Annotations
  
            ✨ Funcionalidades Principais
            - CRUD completo de tarefas (Create, Read, Update, Delete)
            - Sistema de paginação com filtros por título e status
            - Tratamento global de exceções com respostas padronizadas
            - Rate limiting (limitação de requisições por IP)
            - Logging estruturado com ILogger
            - Documentação automática com Swagger/OpenAPI
  
            🚀 Tecnologias e Ferramentas
            - Entity Framework Core 9.0 com PostgreSQL
            - Docker e Docker Compose para containerização
            - Migrações automáticas no startup
            - Testes unitários com xUnit
            - CI/CD com GitHub Actions
            - CORS configurado para integração com frontend
  
            Este projeto demonstra conhecimentos sólidos em arquitetura de software, desenvolvimento de APIs REST, integração com banco de dados e práticas de DevOps.`,
        descriptionEn: `Study project of a complete RESTful API for task management built with ASP.NET Core 9.0, following Clean Architecture principles and development best practices. This project was created to deepen knowledge in software architecture and back-end development with .NET.
  
            🏗️ Architecture and Patterns
            - Clean Architecture with well-separated layers (API, Application, Domain, Infrastructure)
            - DTOs for separation of concerns
            - Repository Pattern for data access
            - AutoMapper for object mapping
            - Automatic validation with Data Annotations
  
            ✨ Main Features
            - Complete CRUD operations for tasks (Create, Read, Update, Delete)
            - Pagination system with filters by title and status
            - Global exception handling with standardized responses
            - Rate limiting (request limitation per IP)
            - Structured logging with ILogger
            - Automatic documentation with Swagger/OpenAPI
  
            🚀 Technologies and Tools
            - Entity Framework Core 9.0 with PostgreSQL
            - Docker and Docker Compose for containerization
            - Automatic migrations on startup
            - Unit tests with xUnit
            - CI/CD with GitHub Actions
            - CORS configured for frontend integration
  
            This project demonstrates solid knowledge in software architecture, REST API development, database integration, and DevOps practices.`
    },
    {
        id: "Portifol.io",
        index: 1,
        src: portifolIo,
        stack: [SiTypescript, SiNextdotjs, SiPostgresql, SiPrisma, SiTailwindcss, SiShadcnui, SiResend, SiCloudinary],
        post: "https://www.linkedin.com/posts/samuel-fava-de-brito_nextjs-react-typescript-activity-7389254768482762752-Asl3?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY",
        repository: "https://github.com/DevSamuelBrito/Portifol.io",
        title: "Portifol.io",
        descriptionBr: `Portifol.io é uma aplicação completa desenvolvida em Next.js que demonstra um sistema de autenticação e gerenciamento de imagens. Este projeto de estudo foi criado para aprofundar conhecimentos em Next.js (App Router e API Routes), integração com serviços externos e gerenciamento de estado.
  
            Principais Funcionalidades:
  
            🔐 Sistema de Autenticação Completo
            - Registro e login com credenciais usando NextAuth.js
            - Criptografia de senhas com bcrypt
            - Recuperação de senha via email (integração com Resend)
            - Gerenciamento de sessões seguro
  
            👤 Gerenciamento de Perfil
            - Upload e edição de foto de perfil
            - Alteração de nome, username e senha
            - Exclusão de conta
  
            📸 Galeria de Imagens Avançada
            - Upload de imagens para Cloudinary com preview
            - Marcação de fotos como favoritas
            - Controle de privacidade (fotos públicas/privadas)
            - Exclusão de imagens
  
            📊 Feed Interativo
            - Visualização de todas as fotos públicas
            - Sistema de busca de fotos
            - Galeria de favoritos
            - Interface responsiva e moderna
  
            Este projeto utiliza tecnologias modernas como Prisma para gerenciamento do banco de dados PostgreSQL, Cloudinary para armazenamento de imagens, Tailwind CSS e shadcn UI para uma interface elegante, além de Sonner para notificações toast. Ideal para demonstrar habilidades em desenvolvimento full-stack com Next.js.`,
        descriptionEn: `Portifol.io is a complete application developed in Next.js that demonstrates a authentication and image management system. This study project was created to deepen knowledge in Next.js (App Router and API Routes), integration with external services, and state management.
  
            Main Features:
  
            🔐 Complete Authentication System
            - Registration and login with credentials using NextAuth.js
            - Password encryption with bcrypt
            - Password recovery via email (Resend integration)
            - Secure session management
  
            👤 Profile Management
            - Upload and edit profile picture
            - Change name, username, and password
            - Account deletion
  
            📸 Advanced Image Gallery
            - Upload images to Cloudinary with preview
            - Mark photos as favorites
            - Privacy control (public/private photos)
            - Image deletion

            📊 Interactive Feed
            - View all public photos
            - Photo search system
            - Favorites gallery
            - Responsive and modern interface
  
            This project uses modern technologies such as Prisma for PostgreSQL database management, Cloudinary for image storage, Tailwind CSS and shadcn UI for an elegant interface, plus Sonner for toast notifications. Ideal for demonstrating full-stack development skills with Next.js.`
    },
    {
        id: "portfolio",
        index: 2,
        src: portifolio,
        stack: [SiTypescript, FaReact, SiNextdotjs, SiTailwindcss],
        post: "https://www.linkedin.com/posts/samuel-fava-de-brito_nextjs-tailwindcss-framermotion-activity-7313680203027771392-L90L?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY",
        repository: "https://github.com/DevSamuelBrito/newportifolio.git",
        title: "Portifolio",
        descriptionBr: `Este portfólio foi criado para demonstrar minhas habilidades como desenvolvedor full-stack, com foco em tecnologias modernas como Next.js, TypeScript, Tailwind CSS e Framer-Motion. Ao longo do desenvolvimento, utilizei componentes reutilizáveis, animações interativas e design responsivo para garantir uma ótima experiência de usuário, seja no desktop ou dispositivos móveis.
  
            Futuramente também busco melhorar o design e a performance, garantindo uma interface intuitiva e otimizada com dados vindo diretamente de APIs.
  
            Fique à vontade para explorar os projetos e, caso queira entrar em contato, utilize uma das opções de rede social abaixo.`,
        descriptionEn: `This portfolio was created to showcase my skills as a full-stack developer, focusing on modern technologies such as Next.js, TypeScript, Tailwind CSS and Framer-Motion. Throughout the development, I used reusable components, interactive animations and responsive design to ensure a great user experience, whether on desktop or mobile devices.
  
            In the future, I also aim to improve the design and performance, ensuring an intuitive and optimized interface with data coming directly from APIs.
  
            Feel free to explore the projects and, if you want to get in touch, use one of the social media options below.`
    },
    {
        id: "devControle",
        index: 3,
        src: DevControle,
        stack: [SiTypescript, FaReact, SiNextdotjs, SiTailwindcss, SiMongodb, SiPrisma, SiNodedotjs],
        post: "https://www.linkedin.com/posts/samuel-fava-de-brito_nextjs-react-typescript-activity-7295234873252888576-0_00?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY",
        repository: "https://github.com/DevSamuelBrito/Dev_Controle.git",
        title: "Dev Controle",
        descriptionBr: `Dev_Controle é uma aplicação full-stack desenvolvida com Next.js para gerenciamento de usuários e chamados.
            O projeto inclui autenticação de usuários, cadastro e gerenciamento de clientes e criação de chamados vinculados.Além disso, qualquer pessoa pode abrir um chamado informando apenas o e-mail do cliente.
  
            💡 Criado para estudo de MongoDB, rotas de API e deploy de aplicações full-stack.`,
        descriptionEn: `Dev_Controle is a full-stack application developed with Next.js for user and ticket management.
            The project includes user authentication, customer registration and management, and creation of linked tickets. In addition, anyone can open a ticket by simply providing the customer's email.
  
            💡 Created for studying MongoDB, API routes, and deploying full-stack applications.`
    },
    {
        id: "devMotors",
        index: 4,
        src: devmotors,
        stack: [SiTypescript, SiNextdotjs, SiReact, SiStyledcomponents],
        post: "",
        repository: "https://github.com/DevSamuelBrito/Dev_Motors",
        title: "Dev Motors",
        descriptionBr: `O DevMotors é um projeto desenvolvido para uma oficina especializada em manutenção de carros, localizada em São Paulo. Esse site foi construído utilizando Next.js e outras tecnologias modernas, garantindo uma aplicação rápida, responsiva e otimizada.Diferente de um site estático, o DevMotors consome informações diretamente do Cosmic JS, um CMS headless que permite gerenciar o conteúdo do site de forma dinâmica, sem precisar modificar o código. Principais Funcionalidades:
  
            -  Página Inicial: Banner interativo com informações principais e chamada para ação.
            -  Seção de Serviços: Lista dos serviços oferecidos, com imagens ilustrativas.
            -  Página de Post Dinâmico: Exibe detalhes de um post específico baseado no slug da URL.
            -  Contato: Exibe telefone, email, endereço e horário de funcionamento.
            -  Submenu de Navegação: Facilita o acesso às páginas do site.
            -  Página de Erro 404 Personalizada: Exibição amigável quando um usuário acessa uma página inexistente.
  
            Esse projeto me ajudou a entender como conectar um CMS a um site dinâmico e a importância de separar a lógica da aplicação do conteúdo, permitindo que o site seja facilmente atualizado sem alterações no código.`,
        descriptionEn: `DevMotors is a project developed for a workshop specializing in car maintenance, located in São Paulo. This website was built using Next.js and other modern technologies, ensuring a fast, responsive and optimized application.
  
            Unlike a static website, DevMotors consumes information directly from Cosmic JS, a headless CMS that allows you to manage the website content dynamically, without having to modify the code.Main Features:
  
            -  App Page: Interactive banner with main information and call to action.
            -  Services Section: List of services offered, with illustrative images.
            -  Dynamic Post Page: Displays details of a specific post based on the URL slug.
            -  Contact: Displays phone number, email, address and opening hours.
            -  Navigation Submenu: Facilitates access to the website pages.
            -  Custom 404 Error Page: User-friendly display when a user accesses a non-existent page.
  
            This project helped me understand how to connect a CMS to a dynamic website and the importance of separating application logic from content, allowing the site to be easily updated without code changes.`
    },
    {
        id: "dalyGames",
        index: 5,
        src: DalyGames,
        stack: [SiTypescript, FaReact, SiNextdotjs, SiTailwindcss],
        post: "https://www.linkedin.com/posts/samuel-fava-de-brito_boa-tarde-pessoal-hoje-quero-compartilhar-activity-7281731227349319680-TPVb?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY",
        repository: "https://github.com/DevSamuelBrito/DalyGames.git",
        title: "DalyGames",
        descriptionBr: `DalyGames é uma aplicação web desenvolvida com Next.js para explorar e gerenciar jogos. O projeto consome uma API REST para exibir detalhes dos jogos, incluindo título, descrição, imagem, plataformas e categorias. Algumas das principais funcionalidades incluem pesquisa de jogos, exibição de um jogo do dia e a possibilidade de favoritar títulos no perfil do usuário. Durante o desenvolvimento, foquei na criação de componentes reutilizáveis e no uso de renderização server-side e client-side para otimizar a experiência do usuário.`,
        descriptionEn: `DalyGames is a web application developed with Next.js for exploring and managing games. The project uses a REST API to display game details, including title, description, image, platforms, and categories. Some of the main features include searching for games, displaying a game of the day, and the ability to favorite titles on the user's profile. During development, I focused on creating reusable components and using server-side and client-side rendering to optimize the user experience. This project was a great opportunity to improve my knowledge of Next.js, TypeScript, REST APIs, and Tailwind CSS.`
    },
    {
        id: "tarefasNextJs",
        index: 6,
        src: tarefasNextJs,
        stack: [SiTypescript, SiStyledcomponents, SiFirebase, SiReact, SiNextdotjs],
        post: "https://www.linkedin.com/posts/samuel-fava-de-brito_ol%C3%A1-pessoal-espero-que-estejam-bem-recentemente-activity-7237147758741094404-m2mZ?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD44OtcB71SEienB1BwQGiG7Hy58WIX10wY",
        repository: "https://github.com/DevSamuelBrito/Tarefas_NextJS.git",
        title: "Tarefas NextJs",
        descriptionBr: `Este projeto é uma aplicação de lista de tarefas (To-Do List) desenvolvida com Next.js, focada em gerenciamento e compartilhamento de tarefas. A autenticação é feita via Google usando NextAuth, permitindo que usuários criem, editem e compartilhem tarefas com outras pessoas. Caso um usuário queira interagir com tarefas compartilhadas, ele também precisa estar autenticado. O sistema conta com um painel de controle, onde os usuários podem gerenciar suas tarefas e definir se elas serão públicas ou privadas. Além disso, implementei endpoints para gerenciar tarefas e comentários, utilizando Firebase para armazenar os dados. Esse projeto foi uma ótima oportunidade para aprofundar meus conhecimentos em Next.js, autenticação com NextAuth e integração com Firebase.`,
        descriptionEn: `This project is a To-Do List application developed with Next.js, focused on task management and sharing. Authentication is done via Google using NextAuth, allowing users to create, edit and share tasks with others. If a user wants to interact with shared tasks, he/she also needs to be authenticated. The system has a control panel, where users can manage their tasks and define whether they are public or private. In addition, I implemented endpoints to manage tasks and comments, using Firebase to store the data. This project was a great opportunity to deepen my knowledge of Next.js, authentication with NextAuth and integration with Firebase.`
    },
    {
        id: "webRepositorios",
        index: 7,
        src: webRepositorio,
        stack: [SiReact, SiJavascript],
        post: "",
        repository: "https://github.com/DevSamuelBrito/web-repositorios",
        title: "Web Repositorios",
        descriptionBr: `Esse foi meu primeiro projeto completo usando React, criado para entender melhor a ferramenta e sua dinâmica com componentes, estados e rotas.
  
            Com essa aplicação, você pode pesquisar por um repositório do GitHub e visualizar todas as issues abertas e fechadas associadas a ele. O projeto utiliza o React Router para navegação entre páginas e a API do GitHub para buscar os dados em tempo real.
            Principais funcionalidades:
  
            ✔️ Pesquisa por repositórios diretamente na API do GitHub
            ✔️ Listagem das issues abertas e fechadas de cada repositório
            ✔️ Filtragem para exibir apenas issues abertas, fechadas ou ambas
            ✔️ Navegação entre páginas utilizando React Router
  
            Esse projeto foi um grande aprendizado para mim, pois me ajudou a entender como funciona o React, o React Router e a integração com APIs externas. 🚀`,
        descriptionEn: `This was my first complete project using React, created to better understand the tool and its dynamics with components, states and routes.
  
            With this application, you can search for a GitHub repository and view all open and closed issues associated with it. The project uses React Router to navigate between pages and the GitHub API to retrieve data in real time.
  
            Main features:
  
            ✔️ Search for repositories directly in the GitHub API
            ✔️ List of open and closed issues for each repository
            ✔️ Filtering to display only open, closed or both issues
            ✔️ Navigation between pages using React Router
  
            This project was a great learning experience for me, as it helped me understand how React, React Router and integration with external APIs work. 🚀`
    },
    {
        id: "rockPaper",
        index: 8,
        src: rockPaper,
        stack: [SiHtml5, SiCss, SiJavascript],
        post: "",
        repository: "https://github.com/DevSamuelBrito/Paper-Rock-Scissors",
        title: "Pedra Papel e Tesoura JS",
        descriptionBr: `Esse projeto foi uma forma divertida de praticar JavaScript, onde desenvolvi um jogo clássico de Pedra, Papel e Tesoura que registra o placar do jogador contra a máquina.
  
            O diferencial desse projeto é que ele utiliza o LocalStorage do navegador para armazenar o número de vitórias, derrotas e empates, garantindo que o progresso do jogador não seja perdido ao recarregar a página.
            Principais funcionalidades:
  
            ✔️ Escolha entre pedra, papel ou tesoura e jogue contra a máquina
            ✔️ Contador de vitórias, derrotas e empates atualizado em tempo real
            ✔️ Armazenamento dos resultados no LocalStorage para persistência dos dados
            ✔️ Interface simples e intuitiva
  
            Esse projeto foi um ótimo exercício para aprofundar meus conhecimentos em manipulação do DOM, eventos de clique e armazenamento local no navegador.`,
        descriptionEn: `This project was a fun way to practice JavaScript, where I developed a classic Rock, Paper, Scissors game that records the player's score against the machine.
  
            The unique thing about this project is that it uses the browser's LocalStorage to store the number of wins, losses, and ties, ensuring that the player's progress is not lost when reloading the page.
  
            Main features:
  
            ✔️ Choose between rock, paper, or scissors and play against the machine
            ✔️ Win, loss, and ties counter updated in real time
            ✔️ Results stored in LocalStorage for data persistence
            ✔️ Simple and intuitive interface
  
            This project was a great exercise to deepen my knowledge of DOM manipulation, click events, and local storage in the browser.`
    },
    {
        id: "calculator",
        index: 9,
        src: calculator,
        stack: [SiHtml5, SiCss, SiJavascript],
        post: "",
        repository: "https://github.com/DevSamuelBrito/Calculator-JS",
        title: "Calculadora JS",
        descriptionBr: `Essa calculadora foi um dos meus primeiros projetos ao começar a aprender JavaScript. Desenvolvida com HTML, CSS e JavaScript, ela me ajudou a entender conceitos fundamentais como manipulação do DOM, eventos de clique e lógica de programação.
  
            Com uma interface simples e responsiva, a calculadora permite realizar operações matemáticas básicas, como adição, subtração, multiplicação e divisão, diretamente no navegador.
            Principais funcionalidades:
  
            ✔️ Interface amigável e fácil de usar
            ✔️ Suporte a números decimais
            ✔️ Botão de limpar para reiniciar os cálculos
            ✔️ Feedback visual ao pressionar os botões
  
            Esse projeto foi um grande aprendizado e me motivou a continuar explorando o desenvolvimento web. 🚀`,
        descriptionEn: `This calculator was one of my first projects when I started learning JavaScript. Developed with HTML, CSS, and JavaScript, it helped me understand fundamental concepts such as DOM manipulation, click events, and programming logic.
  
            With a simple and responsive interface, the calculator allows you to perform basic mathematical operations, such as addition, subtraction, multiplication, and division, directly in the browser.
  
            Main features:
  
            ✔️ User-friendly and easy-to-use interface
            ✔️ Support for decimal numbers
            ✔️ Clear button to restart calculations
            ✔️ Visual feedback when pressing buttons
  
            This project was a great learning experience and motivated me to continue exploring web development. 🚀`
    },
    {
        id: "intergeek",
        index: 10,
        src: intergeek,
        stack: [SiHtml5, SiCss, SiDotnet, SiMysql],
        post: "",
        repository: "https://github.com/DevSamuelBrito/Projeto-Interdisciplinar-InterGeek.git",
        title: "InterGeek - Fatec",
        descriptionBr: `Durante meu tempo na Fatec Rio Preto, participei de um projeto acadêmico em grupo onde desenvolvemos um site completo para gerenciamento de produtos e usuários. O projeto envolvia a criação da documentação, além do desenvolvimento do site utilizando tecnologias como HTML, CSS, MySQL, C#, .NET e ASP.NET para implementar o padrão MVC.
            Fiquei responsável pelo repositório do front-end, que foi integrado ao back-end, onde o site implementava um CRUD completo. O sistema permitia a criação de usuários (tanto usuários comuns quanto administradores), a escolha de produtos, a adição ao carrinho e a finalização da compra. Além disso, o sistema interagia com o banco de dados, atualizando as informações em tempo real.
  
            Vale ressaltar que, naquele momento, estávamos em fase de APRENDIZADO dessas tecnologias, por conta disso que página está tão feio e também isso tornou o projeto desafiador, mas também uma excelente oportunidade de consolidar e aplicar o conhecimento adquirido.`,
        descriptionEn: `During my time at Fatec Rio Preto, I participated in a group academic project where we developed a complete website for product and user management. The project involved creating documentation, as well as developing the website using technologies such as HTML, CSS, MySQL, C#, .NET and ASP.NET to implement the MVC standard.
  
            I was responsible for the front-end repository, which was integrated with the back-end, where the website implemented a complete CRUD. The system allowed users to be created (both regular users and administrators), choose products, add them to the cart and complete the purchase. In addition, the system interacted with the database, updating the information in real time.
  
            It is worth mentioning that, at that time, we were in the LEARNING phase of these technologies, which is why the page is so ugly and this also made the project challenging, but also an excellent opportunity to consolidate and apply the knowledge acquired.`
    },
    {
        id: "portfolioAntigo",
        index: 11,
        src: portifolio1,
        stack: [SiHtml5, SiCss],
        post: "",
        repository: "https://github.com/DevSamuelBrito/portfolio.git",
        title: "Portifolio",
        descriptionBr: `Esse foi o meu primeiro portfólio, desenvolvido apenas com HTML e CSS, quando comecei a explorar o mundo do desenvolvimento web. O objetivo desse projeto era criar uma página simples e estruturada para apresentar um pouco sobre mim e meus primeiros trabalhos.
            O que aprendi com esse projeto?
  
            -  Estruturação de páginas com HTML
            -  Estilização com CSS, incluindo flexbox e grid
            -  Melhoria na organização do código
            -  Primeiros passos na criação de um design responsivo
  
            Embora seja um projeto simples, ele foi fundamental para o meu aprendizado e evolução no desenvolvimento web. Com o tempo, fui aprimorando minhas habilidades e explorando novas tecnologias para construir portfólios mais modernos e dinâmicos.`,
        descriptionEn: `This was my first portfolio, developed only with HTML and CSS, when I started exploring the world of web development. The goal of this project was to create a simple and structured page to present a little about myself and my first works.
            What did I learn from this project?
  
            -  Structuring pages with HTML
            -  Styling with CSS, including flexbox and grid
            -  Improving code organization
            -  First steps in creating a responsive design
  
            Although it was a simple project, it was fundamental for my learning and evolution in web development. Over time, I improved my skills and explored new technologies to build more modern and dynamic portfolios.`
    }
]