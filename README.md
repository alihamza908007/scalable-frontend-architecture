# Scalable Frontend Architecture

A modern, production-ready Next.js starter template designed for scalable frontend applications. This project demonstrates best practices for building maintainable, type-safe, and performant React applications using a feature-based architecture.

## 🧱 Tech Stack

- **Framework**: Next.js 16 (App Router) - Latest version with server components and optimized routing
- **Language**: TypeScript (strict mode) - Full type safety and developer experience
- **Styling**: Tailwind CSS + ShadCN UI - Utility-first CSS with pre-built accessible components
- **State Management**:
  - TanStack Query - Server state management with caching and synchronization
  - Zustand - Client-side state with persistence support
- **Forms & Validation**: React Hook Form + Zod - Type-safe forms with runtime validation
- **Testing**:
  - Vitest - Fast unit testing with native ESM support
  - Playwright - End-to-end testing for critical user flows
- **Development**: ESLint, Prettier, Husky (pre-commit hooks)

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router pages and layouts
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with providers
│   ├── page.tsx                 # Home page
│   ├── providers.tsx            # React Query provider setup
│   ├── dashboard/               # Protected dashboard page
│   └── login/                   # Authentication page
├── features/                    # Feature-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── api/                 # Auth-related API calls
│   │   ├── components/          # Auth components (LoginForm)
│   │   ├── hooks/               # Custom auth hooks (useAuth)
│   │   ├── schemas/             # Zod validation schemas
│   │   └── types.ts             # Auth-specific types
│   └── dashboard/               # Dashboard feature
│       └── dashboard.tsx        # Dashboard component
└── shared/                      # Shared utilities and components
    ├── components/
    │   ├── form-input.tsx       # Reusable form input
    │   └── ui/                  # ShadCN UI components
    ├── lib/
    │   ├── api-client.ts        # Centralized API client
    │   ├── query-client.ts      # TanStack Query configuration
    │   └── utils.ts             # Utility functions
    ├── store/
    │   └── auth-store.ts        # Global auth state (Zustand)
    ├── config/                  # Configuration files
    ├── hooks/                   # Shared custom hooks
    ├── styles/                  # Shared styles
    └── types/                   # Global type definitions
```

## 🏗️ Architecture Decisions

### Feature-Based Architecture

- **Why?** Promotes scalability by organizing code around business domains rather than technical layers
- **Benefits**: Easier maintenance, clear boundaries, reduced coupling, team autonomy
- **Implementation**: Each feature (`auth`, `dashboard`) is self-contained with its own components, hooks, types, and API logic

### State Management Separation

- **Server State**: TanStack Query for API data (caching, synchronization, background updates)
- **Client State**: Zustand for UI state (auth status, form state) with cookie persistence
- **Why?** Prevents state management complexity and ensures optimal performance for each state type

### Type Safety First

- **Strict TypeScript**: Catches errors at compile time, improves refactoring confidence
- **Zod Schemas**: Runtime validation ensures API contracts and form data integrity
- **Why?** Reduces runtime bugs and improves developer experience with IntelliSense

### Component Design

- **ShadCN UI**: Accessible, customizable components built on Radix UI primitives
- **Composition over Configuration**: Small, reusable components that compose well
- **Why?** Consistent UI, accessibility compliance, and maintainable component library

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd scalable-frontend-architecture
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run Vitest tests
- `npm run test:e2e` - Run Playwright E2E tests

### Environment Setup

Create a `.env.local` file for environment variables:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

- Uses Vitest with React Testing Library
- Tests are located in `src/**/*.test.ts`

### E2E Tests

```bash
npm run test:e2e
```

- Uses Playwright for browser automation
- Tests are located in `e2e/**/*.spec.ts`

## 📈 Scaling Strategy for Teams

### Feature Development

1. Create new feature directory under `src/features/`
2. Implement components, hooks, types, and API logic within the feature
3. Use shared utilities from `src/shared/` for common functionality
4. Keep features independent to enable parallel development

### Code Organization Principles

- **Single Responsibility**: Each file/module has one clear purpose
- **Dependency Injection**: Use hooks and providers for dependencies
- **Shared Logic**: Move reusable code to `shared/` as features grow
- **Type Safety**: Define types at the feature level, promote to shared when needed

### Performance Considerations

- **Code Splitting**: Use dynamic imports for route-based and feature-based splitting
- **Image Optimization**: Leverage Next.js Image component for automatic optimization
- **Bundle Analysis**: Monitor bundle size and optimize imports
- **Caching Strategy**: Configure TanStack Query for optimal caching based on data freshness requirements

### Team Workflow

- **Feature Branches**: Develop features in isolated branches
- **Code Reviews**: Mandatory reviews for shared code changes
- **CI/CD**: Automated testing and deployment pipelines
- **Documentation**: Keep README and inline docs updated

## 🤝 Contributing

1. Follow the established project structure
2. Write tests for new features
3. Ensure TypeScript strict mode compliance
4. Update documentation as needed
5. Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License.
