# Level Up - Task Management Platform

Level Up is a gamified task management platform that helps you track your tasks, learning progress, and achievements.

## Features

- 📋 Task Management with priority levels and progress tracking
- 📚 Learning progress tracking with course completion
- 🏆 Achievement system with unlockable badges
- 🌓 Dark mode support
- 📱 Fully responsive design

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Radix UI
- shadcn/ui components
- React Hook Form
- Zod validation

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/level-up.git
cd level-up
```

2. Install dependencies:
```bash
cd packages/frontend
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
packages/frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── lib/           # Utilities and mock data
│   ├── pages/         # Page components
│   └── styles/        # Global styles
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
