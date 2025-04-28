# React 19 Modern Application

A modern React 19 application built with TypeScript, featuring a comprehensive development setup with testing, documentation, and internationalization capabilities.

## 🌟 Key Features

- **React 19** - Leveraging the latest React features including Context Selectors
- **TypeScript** - Type-safe development experience
- **Internationalization** - Multi-language support with i18next
- **Component Library** - Documented with Storybook
- **Comprehensive Testing** - Unit and interaction testing
- **Modern Data Fetching** - Using TanStack React Query

## 🛠️ Technology Stack

### Core Technologies

- React 19
- TypeScript
- Vite
- React Router v7
- Styled Components
- Zod for schema validation
- TanStack React Query

### Testing

- Vitest
- React Testing Library
- Storybook Interaction Testing

### Development Tools

- ESLint
- Husky (Git hooks)
- Plop (Code generator)
- Storybook

## 🚀 Getting Started

```bash
# Clone the repository
git clone git@github.com:LioNguyen/dev-handbook.git

# Install dependencies
yarn install

# Start the development server
yarn dev
```

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests
- `yarn test:ui` - Run tests with UI
- `yarn storybook` - Start Storybook development server
- `yarn plop` - Generate new components using templates

## 📚 Documentation

Component documentation is available through Storybook. Run `yarn storybook` to view the component library with interactive examples and usage guidelines.

## 🧪 Testing

This project uses a comprehensive testing setup:

- Unit and integration tests with Vitest and Testing Library
- Component interaction testing with Storybook
- Test coverage reporting with `yarn test:coverage`

## 🌐 Internationalization

Multi-language support is implemented using i18next and react-i18next, making it easy to add new languages and translate content.

## 🤝 Contributing

1. Ensure linting passes with `yarn lint`
2. Make sure all tests pass with `yarn test`
3. Follow the project's code style guidelines
4. Submit a pull request with detailed description of changes

---

Built with modern best practices and a focus on developer experience and code quality.

## Project Structure

# Cấu trúc dự án hoàn chỉnh

```plaintext
project-root/
│
├── designSystem/                          # Design system (outside src)
│   ├── components/                        # UI components
│   │   ├── ui/                            # shadCN/ui components
│   │   │   ├── button/
│   │   │   │   ├── Button.tsx
│   │   │   │   └── index.ts
│   │   │   ├── input/
│   │   │   │   ├── Input.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   ├── custom/                        # Your custom UI components
│   │   │   ├── feature-card/
│   │   │   │   ├── FeatureCard.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   ├── compound/                      # Composed components
│   │   │   ├── auth-forms/
│   │   │   │   ├── AuthForm.tsx
│   │   │   │   └── index.ts
│   │   │   ├── data-tables/
│   │   │   │   ├── DataTable.tsx
│   │   │   │   └── index.ts
│   │   │   └── ...
│   │   └── layouts/                       # Layout components
│   │       ├── container/
│   │       │   ├── Container.tsx
│   │       │   └── index.ts
│   │       ├── grid/
│   │       │   ├── Grid.tsx
│   │       │   └── index.ts
│   │       └── ...
│   │
│   ├── tokens/                            # Design tokens
│   │   ├── colors.ts                      # Color palette definitions
│   │   ├── typography.ts                  # Font definitions
│   │   ├── spacing.ts                     # Spacing scale
│   │   ├── radius.ts                      # Border radius values
│   │   ├── shadows.ts                     # Shadow definitions
│   │   └── index.ts                       # Exports all tokens
│   │
│   ├── themes/                            # Theme configuration
│   │   ├── themeConfig.ts                 # CSS variable definitions
│   │   ├── dark.ts                        # Dark theme overrides
│   │   ├── light.ts                       # Light theme defaults
│   │   └── index.ts
│   │
│   ├── styles/                            # Global styles
│   │   ├── globals.css                    # Global CSS with Tailwind
│   │   ├── reset.css                      # CSS reset/normalizations
│   │   └── animations.css                 # Animation utilities
│   │
│   ├── utils/                             # Design system utilities
│   │   ├── cn.ts                          # Class name merging utility
│   │   └── themeUtils.ts                  # Theme helpers
│   │
│   ├── index.ts                           # Main exports
│   └── tailwind.preset.ts                 # Tailwind preset config
│
├── src/                                   # Application code
│   ├── core/                              # Core application framework (theo ảnh)
│   │   ├── api/                           # API client foundation
│   │   │   ├── hooks/                     # API hooks tái sử dụng
│   │   │   │   ├── index.ts               # Exports all hooks
│   │   │   │   ├── useDelete.ts           # Hook for DELETE requests
│   │   │   │   ├── useGetAll.ts           # Hook for GET all requests
│   │   │   │   ├── useGetById.ts          # Hook for GET by ID requests
│   │   │   │   ├── usePost.ts             # Hook for POST requests
│   │   │   │   └── usePut.ts              # Hook for PUT requests
│   │   │   ├── interceptors/              # Request/response interceptors
│   │   │   │   ├── authInterceptor.ts     # Authentication interceptor
│   │   │   │   ├── errorInterceptor.ts    # Error handling interceptor
│   │   │   │   └── index.ts               # Exports all interceptors
│   │   │   ├── apiClient.ts               # Base API client
│   │   │   ├── apiPaths.ts                # API endpoints definitions
│   │   │   ├── errorHandling.ts           # API error handling
│   │   │   └── index.ts                   # API module exports
│   │   │
│   │   ├── config/                        # App configuration
│   │   │   ├── environment.ts             # Environment variables
│   │   │   ├── settings.ts                # App settings
│   │   │   └── index.ts                   # Config exports
│   │   │
│   │   ├── i18n/                          # Internationalization setup
│   │   │   ├── locales/                   # Translation files
│   │   │   │   ├── en/                    # English translations
│   │   │   │   │   ├── common.json        # Common English texts
│   │   │   │   │   └── validation.json    # Validation messages in English
│   │   │   │   ├── vi/                    # Vietnamese translations
│   │   │   │   │   ├── common.json        # Common Vietnamese texts
│   │   │   │   │   └── validation.json    # Validation messages in Vietnamese
│   │   │   │   └── index.ts               # Exports all locales
│   │   │   ├── i18n.ts                    # i18n configuration
│   │   │   ├── useLanguageSwitcher.ts     # Hook for switching languages
│   │   │   └── index.ts                   # i18n exports
│   │   │
│   │   ├── router/                        # Routing foundation
│   │   │   ├── index.ts                   # Router exports
│   │   │   ├── router.tsx                 # Main router configuration
│   │   │   └── routes.ts                  # Route definitions
│   │   │
│   │   ├── store/                         # State management foundation
│   │   │   ├── contextFactory.ts          # Create context utilities
│   │   │   ├── index.ts                   # Store exports
│   │   │   └── store.ts                   # Redux store configuration
│   │   │
│   │   ├── utils/                         # Utilities
│   │   │   ├── components/                # Utility components
│   │   │   │   ├── lazyLoad/              # Lazy loading utilities
│   │   │   │   │   ├── index.ts
│   │   │   │   │   └── lazyLoad.tsx
│   │   │   │   ├── withErrorBoundary/     # Error boundary wrapper
│   │   │   │   │   ├── index.ts
│   │   │   │   │   ├── withErrorBoundary.tsx
│   │   │   │   │   └── DefaultFallback.tsx
│   │   │   │   └── index.ts
│   │   │   ├── formatters/                # Data formatting utilities
│   │   │   │   ├── dateFormat.ts          # Date formatting
│   │   │   │   ├── numberFormat.ts        # Number formatting
│   │   │   │   └── index.ts               # Formatter exports
│   │   │   ├── hooks/                     # Utility hooks
│   │   │   │   ├── index.ts               # Hook exports
│   │   │   │   ├── useDebounce.ts         # Debounce hook
│   │   │   │   ├── useLocation.ts         # Location hook
│   │   │   │   ├── useNavigate.ts         # Navigation hook
│   │   │   │   ├── usePrevious.ts         # Previous value hook
│   │   │   │   └── useScreenSize.ts       # Screen size detection
│   │   │   ├── storage/                   # Storage utilities
│   │   │   │   ├── index.ts               # Storage exports
│   │   │   │   ├── storage.ts             # Abstract storage
│   │   │   │   └── localStorage.ts        # LocalStorage implementation
│   │   │   └── index.ts                   # Utils exports
│   │   │
│   │   └── index.ts                       # Core module exports
│   │
│   ├── shared/                            # Shared across domains
│   │   ├── components/                    # Shared UI components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── PageHeader.tsx
│   │   │   └── GlobalNotifications.tsx
│   │   ├── hooks/                         # Shared custom hooks
│   │   │   ├── usePagination.ts
│   │   │   └── useSearch.ts
│   │   ├── assets/                        # Shared assets
│   │   │   ├── images/
│   │   │   └── icons/
│   │   └── services/                      # Shared services
│   │       ├── logService.ts
│   │       └── analyticsService.ts
│   │
│   ├── domain/                            # Business domains
│   │   ├── auth/                          # Authentication domain
│   │   │   ├── components/                # Auth-specific components
│   │   │   │   ├── LoginForm.tsx
│   │   │   │   └── RegistrationForm.tsx
│   │   │   ├── hooks/                     # Auth-specific hooks
│   │   │   │   ├── useLogin.ts
│   │   │   │   └── useRegistration.ts
│   │   │   ├── services/                  # Auth business logic
│   │   │   │   └── authService.ts
│   │   │   ├── repositories/              # Auth data access
│   │   │   │   └── authRepository.ts
│   │   │   ├── api.ts                     # Auth API calls
│   │   │   ├── slice.ts                   # Auth state management
│   │   │   ├── types.ts                   # Auth type definitions
│   │   │   └── constants.ts               # Auth constants
│   │   │
│   │   ├── products/                      # Products domain
│   │   │   ├── components/                # Product-specific components
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   ├── ProductList.tsx
│   │   │   │   └── ProductDetail.tsx
│   │   │   ├── hooks/                     # Product-specific hooks
│   │   │   │   ├── useProductSearch.ts
│   │   │   │   └── useProductFilter.ts
│   │   │   ├── services/                  # Product business logic
│   │   │   │   ├── productService.ts
│   │   │   │   └── pricingService.ts
│   │   │   ├── repositories/              # Product data access
│   │   │   │   └── productRepository.ts
│   │   │   ├── api.ts
│   │   │   ├── slice.ts
│   │   │   ├── types.ts
│   │   │   └── constants.ts
│   │   │
│   │   └── users/                         # Users domain
│   │       ├── components/
│   │       │   ├── UserProfile.tsx
│   │       │   ├── UserSettings.tsx
│   │       │   └── UserAvatar.tsx
│   │       ├── hooks/
│   │       │   ├── useUserProfile.ts
│   │       │   └── useUserSettings.ts
│   │       ├── services/
│   │       │   └── userService.ts
│   │       ├── repositories/
│   │       │   └── userRepository.ts
│   │       ├── api.ts
│   │       ├── slice.ts
│   │       ├── types.ts
│   │       └── constants.ts
│   │
│   ├── layouts/                           # Application-specific layouts
│   │   ├── DashboardLayout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── MainLayout.tsx
│   │
│   ├── pages/                             # Route-based page components
│   │   ├── dashboard/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── DashboardAnalytics.tsx
│   │   │   └── DashboardSettings.tsx
│   │   ├── settings/
│   │   │   ├── Settings.tsx
│   │   │   ├── SettingsProfile.tsx
│   │   │   └── SettingsSecurity.tsx
│   │   ├── auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── ForgotPassword.tsx
│   │   └── Home.tsx
│   │
│   ├── constants/                         # Application constants
│   │   ├── routes.ts
│   │   ├── errorCodes.ts
│   │   └── appConfig.ts
│   │
│   ├── App.css                            # App-specific CSS
│   ├── App.tsx                            # Main application component
│   ├── main.tsx                           # Entry point
│   └── vite-env.d.ts                      # Vite environment types
│
├── public/                                # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   └── images/
│
├── .eslintrc.js                           # ESLint configuration
├── .prettierrc                            # Prettier configuration
├── tailwind.config.ts                     # Tailwind configuration (TypeScript)
├── vite.config.ts                         # Vite configuration (TypeScript)
├── tsconfig.json                          # TypeScript configuration
├── package.json                           # Dependencies and scripts
└── README.md                              # Project documentation
```
