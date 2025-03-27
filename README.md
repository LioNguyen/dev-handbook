# React Boilerplate

A modern, feature-rich React application starter template with best practices and tools preconfigured for rapid development.

## 🚀 Features

- **React 18** with TypeScript support
- **Vite** for lightning-fast development and building
- **UI Components** powered by Radix UI primitives
- **Styling** with Tailwind CSS 4 and Styled Components
- **State Management** with TanStack React Query
- **Routing** via React Router v7
- **Internationalization** using i18next
- **Data Tables** with TanStack Table
- **Form Validation** using Zod
- **Testing** with Vitest and Testing Library
- **Component Documentation** with Storybook
- **Code Generation** using Plop
- **Git Hooks** with Husky for code quality

## 📦 Getting Started

```bash
# Clone the repository
git clone git@github.com:LioNguyen/dev-handbook.git

# Navigate to the project directory
cd template/react18-vite

# Install dependencies
yarn install

# Start development server
yarn dev
```

## 🔧 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn test` - Run tests
- `yarn test-watch` - Run tests in watch mode
- `yarn coverage` - Generate test coverage report
- `yarn storybook` - Start Storybook server
- `yarn build-storybook` - Build Storybook for deployment
- `yarn plop` - Run code generators

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── designSystem/     # Design system tokens and themes
├── hooks/            # Custom React hooks
├── pages/            # Application pages/routes
├── services/         # API services and data fetching
├── utils/            # Helper functions and utilities
├── i18n/             # Internationalization configurations
├── App.tsx           # Application entry point
└── main.tsx          # React rendering setup
```

## 🎨 Design System

This boilerplate includes a comprehensive design system with:

- Radix UI primitives for accessible components
- Tailwind CSS for utility-first styling
- Custom component library documented in Storybook
- Light/dark mode theming support

## 📚 Learn More

To customize this boilerplate for your project:

1. Update project name and details in `package.json`
2. Configure your design tokens in the design system
3. Set up your API services and data models
4. Start building your application components

## 📄 License

MIT
