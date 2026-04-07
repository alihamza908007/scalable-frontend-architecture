# Scalable Frontend Architecture

A production-ready Next.js starter template designed for building scalable, maintainable, and performant frontend applications. This architecture demonstrates enterprise-level patterns used by scaling SaaS companies.

## 🧱 Tech Stack

- **Framework**: Next.js 16 (App Router) - Server-first architecture with optimized routing
- **Language**: TypeScript (strict mode) - Full type safety and developer experience
- **Styling**: Tailwind CSS + ShadCN UI - Utility-first CSS with accessible components
- **State Management**:
  - TanStack Query - Server state management with caching and synchronization
  - Zustand - Client-side state (deprecated in favor of server state where possible)
- **Authentication**: NextAuth.js - Secure authentication with session management
- **Forms & Validation**: React Hook Form + Zod - Type-safe forms with runtime validation
- **Testing**:
  - Vitest - Fast unit testing with native ESM support
  - Playwright - End-to-end testing for critical user flows
- **Development**: ESLint, Prettier, Husky (pre-commit hooks)
- **Performance**: Web Vitals tracking, bundle analysis, dynamic imports
- **Observability**: Structured logging, global error boundaries

## 🏗️ Architecture Decisions

### Feature-Based Architecture

**Why?** Promotes scalability by organizing code around business domains rather than technical layers. Enables parallel development by multiple teams.

**Benefits**:

- Clear boundaries between features
- Easier maintenance and refactoring
- Independent deployment capabilities
- Reduced coupling between business logic

**Implementation**:

- Each feature (`auth`, `dashboard`, `teams`) is self-contained
- Features only import from `shared/` utilities
- ESLint rules prevent cross-feature imports

### Server vs Client Component Strategy

**Why?** Maximize server-side rendering for performance and SEO while minimizing client-side JavaScript.

**Rules**:

- All components default to Server Components
- Client components explicitly marked with `.client.tsx`
- Data fetching happens in Server Components
- Client components only for interactivity (forms, state, effects)

### State Management Separation

**Why?** Different state types have different requirements for caching, synchronization, and persistence.

**Rules**:

- **TanStack Query**: Server state (API data, caching, background updates)
- **Zustand**: Client-only state (UI state, local preferences) - use sparingly
- **NextAuth**: Authentication state with secure session management

### Type Safety First

**Why?** Catches errors at compile time, improves refactoring confidence, and enhances developer experience.

**Implementation**:

- Strict TypeScript configuration
- Zod schemas for runtime validation
- Typed API responses and form data
- Environment variable validation

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router (Server Components)
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with providers and error boundary
│   ├── page.tsx                 # Home page
│   ├── providers.tsx            # React Query + NextAuth providers
│   ├── dashboard/               # Protected dashboard page
│   ├── login/                   # Authentication page
│   └── teams/                   # Teams management page
├── features/                    # Feature-based modules
│   ├── auth/                    # Authentication feature
│   │   ├── api/                 # Auth-related API calls
│   │   ├── components/          # Auth components (login-form.client.tsx)
│   │   ├── hooks/               # Custom auth hooks
│   │   ├── schemas/             # Zod validation schemas
│   │   └── types.ts             # Auth-specific types
│   ├── dashboard/               # Dashboard feature
│   │   └── dashboard.client.tsx # Dashboard component
│   └── teams/                   # Teams management feature
│       ├── api/                 # Teams API layer
│       ├── components/          # Teams components
│       ├── hooks/               # Teams hooks (useTeams, etc.)
│       ├── schemas/             # Teams validation schemas
│       └── types.ts             # Teams types
└── shared/                      # Shared utilities and components
    ├── components/
    │   ├── error-boundary.client.tsx  # Global error boundary
    │   ├── form-input.tsx       # Reusable form input
    │   ├── web-vitals.client.tsx # Performance tracking
    │   └── ui/                  # ShadCN UI components
    ├── lib/
    │   ├── api-client.ts        # Centralized API client with retry
    │   ├── auth.ts              # NextAuth configuration
    │   ├── env.ts               # Environment validation
    │   ├── logger.ts            # Structured logging
    │   ├── query-client.ts      # TanStack Query configuration
    │   ├── query-keys.ts        # Consistent query keys
    │   └── web-vitals.ts        # Web Vitals utilities
    ├── store/                   # Client state (use sparingly)
    └── types/                   # Global type definitions
```

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

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
API_BASE_URL=http://localhost:3001
```

4. Start the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with boundary checks
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run analyze` - Build with bundle analyzer

### Authentication

Default credentials for testing:

- Email: `admin@example.com`
- Password: `password`

## 🧪 Testing Strategy

### Philosophy

- **Unit Tests**: Logic, hooks, utilities
- **Integration Tests**: API calls, component interactions
- **E2E Tests**: Critical user journeys (login → dashboard → teams)

### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test -- --coverage
```

### Test Structure

- Unit tests: `src/**/*.test.ts`
- E2E tests: `e2e/**/*.spec.ts`
- Mocks: `src/test/mocks/`

## 📈 Performance Strategy

### Web Vitals Tracking

Automatic tracking of Core Web Vitals with reporting to console (extend for analytics).

### Bundle Analysis

```bash
npm run analyze
```

Generates bundle size report to optimize loading performance.

### Code Splitting

- Route-based splitting via Next.js App Router
- Component-based splitting with dynamic imports
- Feature-based splitting for large applications

### Image Optimization

- Next.js Image component for automatic optimization
- WebP format with fallbacks
- Responsive images with srcset

## 🔒 Security

### Authentication

- NextAuth.js with secure session handling
- HTTP-only cookies for session tokens
- CSRF protection built-in

### API Security

- Centralized API client with error handling
- Request/response type validation
- Environment-based configuration

### Code Security

- ESLint rules for security best practices
- TypeScript strict mode prevents type-related vulnerabilities
- Dependency scanning with npm audit

## 🛠️ Development Workflow

### Feature Development

1. Create feature directory under `src/features/`
2. Implement API layer first
3. Add types and schemas
4. Create hooks for data fetching
5. Build components (server-first)
6. Add tests
7. Update navigation

### Code Quality

- Pre-commit hooks with Husky
- ESLint with import boundary rules
- TypeScript strict mode
- Consistent naming conventions

### Deployment

- CI/CD pipeline with GitHub Actions
- Automated testing on PRs
- Bundle analysis on builds
- Environment-specific configurations

## 📊 Scaling Strategy for Teams

### Multi-Team Development

- **Feature Ownership**: Each team owns specific features
- **Shared Contracts**: `shared/` contains team-agreed utilities
- **Import Boundaries**: ESLint prevents accidental coupling
- **Independent Deployment**: Features can be deployed separately

### Code Organization Principles

- **Single Responsibility**: Each file has one clear purpose
- **Dependency Injection**: Use hooks and providers for dependencies
- **Shared Logic**: Move reusable code to `shared/` as features grow
- **Type Safety**: Define types at feature level, promote to shared when needed

### Performance at Scale

- **Bundle Splitting**: Feature-based code splitting
- **Caching Strategy**: Configure TanStack Query for optimal caching
- **Image Optimization**: CDN integration for global performance
- **Monitoring**: Web Vitals tracking with alerting

### Team Workflow

- **Feature Branches**: Develop features in isolated branches
- **Code Reviews**: Mandatory reviews for shared code changes
- **Documentation**: Keep README and inline docs updated
- **Testing**: Comprehensive test coverage for confidence

## 🤝 Contributing

1. Follow the established project structure
2. Write tests for new features
3. Ensure TypeScript strict mode compliance
4. Update documentation as needed
5. Follow conventional commit messages

## 📄 License

This project is licensed under the MIT License.

---

## 🏛️ Architecture Diagram

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Next.js App   │    │  Feature Layer  │    │  Shared Layer   │
│   (Server)      │    │  (Business)     │    │  (Utilities)    │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • App Router    │    │ • auth/         │    │ • UI Components │
│ • Server Comp.  │    │ • dashboard/    │    │ • API Client    │
│ • Middleware    │    │ • teams/        │    │ • Query Client  │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         └───────────────────────┼───────────────────────┘
                                 │
                    ┌────────────────────┐
                    │  Data Flow         │
                    │  (TanStack Query)  │
                    └────────────────────┘
                                 │
                    ┌────────────────────┐
                    │  External APIs     │
                    │  (REST/GraphQL)    │
                    └────────────────────┘
```

This architecture supports:

- **Horizontal Scaling**: Add features without affecting others
- **Team Autonomy**: Multiple teams can work simultaneously
- **Performance**: Server-first with optimal caching
- **Maintainability**: Clear boundaries and separation of concerns
