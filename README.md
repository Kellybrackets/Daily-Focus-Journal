# ✨ Daily Focus Journal

![App Preview](./preview.png) <!-- Add screenshot later -->

A calming digital journal to help you focus on what matters each day. Log goals, reflections, or scripture in a minimalist interface.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/Built_with-React-61DAFB.svg?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-4.9+-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)

## 🌟 Features

### Core
- **Daily Entry Creation**
  - Title, type (Goal 📌/Reflection 💭/Verse 📖), and notes
  - Automatic date tagging
- **Entry Timeline**
  - Reverse-chronological display
  - Visual type indicators
  - Note previews
- **Smart Reminders**
  - Today's focus prompt
  - Empty state encouragement
- **Search & Filter**
  - Full-text search
  - Type-based filtering

### Bonus
- ☀️ Dark/light mode toggle
- 📤 Export to TXT/CSV
- 🔥 Streak counter (consecutive days)

## 🚀 Quick Start

1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/daily-focus-journal.git
   cd daily-focus-journal
   ```
Install dependencies:

``` bash 
npm install
Start the dev server:
```

``` bash
npm run dev
Open http://localhost:3000 in your browser.
```

🎨 Design Principles
Color Palette: Soft pastels (#E6F2FF, #F5F5F5) with muted accents

Typography: Clean sans-serif (Nunito) with generous whitespace

Interactions:

Subtle hover animations (200ms transitions)

Focus states for accessibility

Icons: Emoji-first approach with SVG fallbacks

🧠 Tech Stack
Frontend: React 18 + TypeScript

Styling: CSS Modules (or Tailwind CSS)

State: Context API + localStorage persistence

Build: Vite

📂 Project Structure
```
src/
├── components/
│   ├── EntryCard.tsx       # Journal entry preview
│   ├── EntryForm.tsx       # Creation/editing form
│   ├── DailyPrompt.tsx     # Today's reminder
│   └── FilterBar.tsx       # Search/filter controls
├── hooks/
│   ├── useLocalStorage.ts  # Persistence hook
│   └── useStreak.ts        # Streak counter
├── types/
│   └── journal.d.ts        # Type definitions
├── utils/
│   └── export.ts           # Data export helpers
├── App.tsx
└── main.tsx
```

🔧 Configuration
Create .env file:
```
env
VITE_APP_NAME="Daily Focus Journal"
VITE_DEFAULT_THEME=light

```
🤝 Contributing
Fork the project

Create your branch (git checkout -b feature/NewFeature)

Commit changes (git commit -m 'Add amazing feature')

Push (git push origin feature/NewFeature)

Open a PR
