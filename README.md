# ConnectStore - E-Commerce Product Catalog

A modern, high-performance e-commerce product catalog built with React, TypeScript, and Nx monorepo architecture. Features advanced filtering, virtual scrolling, and seamless state management.

## 🚀 Tech Stack

### Core Technologies

- **React 19** - Latest React with concurrent features
- **TypeScript 5.9** - Type-safe development
- **Nx 21.5** - Modern monorepo tooling and build system
- **Vite 7** - Lightning-fast development and bundling
- **Node.js** - JavaScript runtime

### State Management & Data

- **Redux Toolkit (RTK) 2.9** - Predictable state management
- **React Redux 9.2** - React bindings for Redux
- **React Router DOM 6.29** - Client-side routing with URL sync

### UI & Styling

- **Bootstrap 5.3** - Responsive design system
- **Sass** - Enhanced CSS with variables and mixins
- **CSS Modules** - Scoped component styling

### Performance & Optimization

- **@tanstack/react-virtual 3.13** - Virtual scrolling for large lists
- **SWC** - Fast TypeScript/JavaScript compiler
- **Code Splitting** - Lazy loading and bundle optimization

### Testing & Quality

- **Jest 30** - Unit testing framework
- **React Testing Library 16** - Component testing utilities
- **Cypress 14** - End-to-end testing
- **ESLint 9** - Code linting and formatting
- **Prettier 2.6** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

### Development Tools

- **Nx Console** - IDE extension for Nx
- **Babel** - JavaScript transpilation
- **Verdaccio** - Local npm registry for testing

### Deployment & CI/CD

- **Vercel** - Production deployment platform
- **GitHub Actions Ready** - CI/CD pipeline support
- **Nx Cloud** - Distributed builds and caching

## 📦 Project Structure

```
connectclo/
├── apps/
│   ├── connectstore/           # Main React application
│   └── connectstore-e2e/       # E2E test suite
├── libs/
│   ├── components/             # Reusable UI components
│   ├── shared/                 # Shared utilities, types, hooks
│   ├── store/                  # Redux store and state management
│   └── ui/                     # Design system and styles
└── tools/                      # Build and development tools
```

## 🛠 Available Scripts

### Development

```bash
npm run dev              # Start development server
npm start               # Alias for development server
npm run preview         # Preview production build locally
```

### Building & Deployment

```bash
npm run build           # Build for production
npm run build:prod      # Build with production configuration
```

### Testing

```bash
npm test               # Run all unit tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Generate test coverage reports
npm run e2e            # Run end-to-end tests
npm run e2e:open       # Open Cypress test runner
```

### Code Quality

```bash
npm run lint           # Lint all projects
npm run lint:fix       # Fix linting issues automatically
npm run typecheck      # Type check all projects
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
```

### Nx Utilities

```bash
npm run graph          # Visualize project dependencies
npm run clean          # Reset Nx cache
npm run affected:build # Build only affected projects
npm run affected:test  # Test only affected projects
npm run affected:lint  # Lint only affected projects
npm run affected:e2e   # E2E test only affected projects
```

## ✨ Features

### 🏪 Product Catalog

- **Dynamic Product Grid** - Responsive grid layout with Bootstrap
- **Product Cards** - Rich product display with images, pricing, and metadata
- **Virtual Scrolling** - High-performance rendering of large product lists
- **Lazy Loading** - Optimized loading for better performance

### 🔍 Advanced Search & Filtering

- **Real-time Search** - Instant search with debounced input
- **Multi-criteria Filtering**:
  - Pricing options (Free, Paid, View Only)
  - Price range slider (₹0 - ₹999)
  - Sort options (Name, Price High to Low, Price Low to High)
- **Filter State Persistence** - Maintains filters across page reloads
- **URL Synchronization** - Shareable URLs with filter state

### 🎛 State Management

- **Redux Toolkit Integration** - Modern Redux with slices and RTK Query
- **Centralized Store** - Unified state management across components
- **Optimized Selectors** - Memoized state selection for performance
- **Type-safe Actions** - Fully typed Redux actions and state

### 🔗 URL State Synchronization

- **Deep Linking** - Bookmark and share specific filter combinations
- **Browser Navigation** - Proper back/forward button support
- **Query Parameter Mapping**:
  - `q` - Search query
  - `pricing` - Selected pricing options
  - `sort` - Sort preference
  - `minPrice`, `maxPrice` - Price range

### 📱 Responsive Design

- **Mobile-First** - Optimized for all screen sizes
- **Bootstrap Grid** - Flexible layout system
- **Touch-Friendly** - Mobile gesture support
- **Accessibility** - WCAG compliance and screen reader support

### 🎯 Performance Optimizations

- **Virtual Scrolling** - Smooth handling of thousands of products
- **Code Splitting** - Lazy-loaded components and routes
- **Bundle Optimization** - Minimal bundle size with tree shaking
- **Caching Strategies** - Efficient data caching and updates

### 🧪 Testing Coverage

- **Unit Tests** - Component and utility function testing
- **Integration Tests** - Feature workflow testing
- **E2E Tests** - Complete user journey validation
- **Visual Regression** - UI consistency testing

### 🏗 Architecture Features

- **Monorepo Structure** - Organized, scalable codebase
- **Component Library** - Reusable, documented components
- **Type Safety** - Comprehensive TypeScript coverage
- **Modular Design** - Clean separation of concerns
- **Plugin Architecture** - Extensible Nx workspace

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/connectclo.git
   cd connectclo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

### 🎨 UnCSS Integration

- **Automatic CSS Purging** - Remove unused CSS automatically
- **Bundle Size Optimization** - Smaller CSS bundles for faster loading
- **Build Pipeline Integration** - Seamless integration with existing build process

### 📱 Progressive Web App (PWA)

- **Offline Support** - Browse products without internet connection
- **App-like Experience** - Native app feel in the browser
- **Push Notifications** - Product updates and promotions
- **Install Prompt** - Add to home screen functionality
- **Service Worker** - Advanced caching and background sync
