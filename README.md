# 🚀 Portfolio - Samuel Brito

A place on the internet to call my own — welcome to my portfolio! 😁

**Live:** https://www.devsamuelbrito.com.br

## ✨ Features

- 🌐 **Internationalization** – Portuguese and English, with the language saved in a cookie
- 📱 **Responsive design** – Works across all screen sizes
- 🗂️ **Stacked sections** – Each section is a "sheet": the next one slides over the previous one as you scroll
- 🔠 **Decrypting name** – The hero name is "decrypted" letter by letter
- 🟦 **Pixel displays** – Canvas dot-matrix panels with physics: dots fly in, get pushed by the mouse (with a slight lag) and ripple outward on click
- 🃏 **Project cards** – Auto-playing image carousel, looping wobble on hover and a detailed modal with gallery
- 🔊 **UI sounds** – Click, hover, modal, decrypt and section-change sounds synthesized with the Web Audio API (no audio files), with a mute button
- 📊 **GitHub activity** – A section with my recent activity
- 📄 **CV download** – Resume in the language currently selected, with a download notification
- 🎨 **Modern UI** – Blue theme, Geist fonts and Tailwind CSS

## 🛠️ Technologies Used

- **Framework:** Next.js 16 (App Router) with Turbopack in development
- **Library:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3 + tailwindcss-animated
- **Animations:** Framer Motion
- **Icons:** React Icons + Lucide React
- **Audio:** Web Audio API (synthesized, no dependencies)
- **Analytics:** Vercel Web Analytics
- **Deploy:** Vercel

## 📦 Project Structure

```
src/
├── app/
│   ├── components/            # One folder per page section / feature
│   │   ├── About/
│   │   ├── Certifications/    # Education, with a commit-graph panel
│   │   ├── Contact/
│   │   ├── DownloadNotification/
│   │   ├── Experience/        # Timeline with a sticky pixel display
│   │   ├── FloatingControls/  # Sound toggle + scroll-to-top button
│   │   ├── Footer/
│   │   ├── GitHub/            # GitHub activity
│   │   ├── Hero/
│   │   ├── Navbar/            # Floating navbar + language switch
│   │   ├── Projects/          # Cards, carousel and detail modal
│   │   ├── ScrollTopButton/
│   │   └── Stack/             # Tech stack
│   ├── layout.tsx
│   └── page.tsx               # Assembles the sections
├── assets/images/             # Images
├── components/
│   ├── shared/                # StackedSections, PixelDisplay, DecryptText,
│   │                          # SoundEffects, Background, CursorGlow, Reveal...
│   └── ui/
├── data/                      # sections order, links, brand colors
├── hooks/                     # useTranslation
├── lib/                       # sound engine, sheets (stacked scroll), github, language...
├── locales/                   # pt.json and en.json
├── providers/                 # LanguageContext, MotionProvider
└── utils/
```

The order of the sections is defined in a single place: [src/data/sections.ts](src/data/sections.ts).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/DevSamuelBrito/newportifolio.git
cd newportifolio
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## 📱 Portfolio Sections

- **🏠 Hero** – Intro with the decrypting name, a code window and quick access to projects and CV
- **🚀 Projects** – Projects I've built, with carousel cards and detailed modals
- **💼 Experience** – Professional timeline with a pixel display that follows the current experience
- **🐙 GitHub** – Recent GitHub activity
- **⚙️ Stack** – Technologies I master, have used, or am learning
- **👨‍💻 About** – My background and journey
- **🎓 Certifications** – Education and certificates
- **📞 Contact** – Contact details and social media links

## 🔊 About the sounds

Sounds are on by default and can be muted with the button in the bottom-right corner (the choice is saved in `localStorage`). Browsers only allow audio after the visitor interacts with the page, so nothing plays before the first click or key press. See [src/lib/sound.ts](src/lib/sound.ts) for the sound recipes.

## 🚀 Deployment

The project is live! Check it out at:

- **URL:** https://www.devsamuelbrito.com.br

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for more details.

## 📞 Contact

- **GitHub:** [@DevSamuelBrito](https://github.com/DevSamuelBrito)
- **LinkedIn:** [Samuel Fava de Brito](https://www.linkedin.com/in/samuel-fava-de-brito/)
- **Email:** samuelbrito.dev@gmail.com
