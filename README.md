# NestJS Job Hub API

A basic NestJS application for job hub management, featuring user authentication and CRUD operations.

## Description

This project is built with NestJS framework and provides a RESTful API for managing users in a job hub system. It includes MongoDB integration, EJS templating, and comprehensive testing setup.

## Features

- **User Management**: Complete CRUD operations for users
- **MongoDB Integration**: Using Mongoose ODM
- **Authentication Ready**: BcryptJS for password hashing
- **Validation**: Global validation pipes with class-validator
- **Templating**: EJS view engine for server-side rendering
- **Static Assets**: Serving CSS, JS, and images
- **Configuration Management**: Environment-based configuration
- **Testing**: Jest for unit and e2e testing
- **Linting & Formatting**: ESLint and Prettier

## Tech Stack

- **Framework**: NestJS
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Templating**: EJS
- **Validation**: class-validator & class-transformer
- **Testing**: Jest
- **Linting**: ESLint
- **Formatting**: Prettier

## Installation

```bash
# Install dependencies
npm install

# Or using yarn
yarn install

# Or using bun
bun install
```

## Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/jobhub
PORT=3000
```

## Running the Application

```bash
# Development mode with watch
npm run start:dev

# Production build
npm run build
npm run start:prod

# Debug mode
npm run start:debug
```

## API Endpoints

### Users

- `GET /` - Home page (renders EJS template)
- `POST /users` - Create a new user
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user by ID
- `DELETE /users/:id` - Delete user by ID

## User Schema

```typescript
{
  email: string;      // required
  password: string;   // required
  name?: string;
  age?: number;
  address?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## Testing

```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e

# Watch mode
npm run test:watch
```

## Code Quality

```bash
# Lint and fix
npm run lint

# Format code
npm run format
```

## Project Structure

```
src/
├── app.controller.ts      # Root controller
├── app.module.ts          # Root module
├── app.service.ts         # Root service
├── main.ts                # Application entry point
└── users/                 # Users module
    ├── dto/
    │   ├── create-user.dto.ts
    │   └── update-user.dto.ts
    ├── schemas/
    │   └── user.schema.ts
    ├── users.controller.ts
    ├── users.module.ts
    └── users.service.ts
public/                    # Static assets
├── css/
│   └── styles.css
views/                     # EJS templates
└── home.ejs
test/                      # Test files
└── app.e2e-spec.ts
```

## Scripts

- `npm run build` - Build the application
- `npm run start` - Start production server
- `npm run start:dev` - Start development server with watch
- `npm run start:debug` - Start debug server
- `npm run start:prod` - Start production server
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run e2e tests
- `npm run lint` - Lint and fix code
- `npm run format` - Format code with Prettier

## Dependencies

### Production

- @nestjs/common, @nestjs/core, @nestjs/platform-express
- @nestjs/mongoose, mongoose
- @nestjs/config
- @nestjs/mapped-types
- bcryptjs
- class-transformer, class-validator
- ejs
- reflect-metadata, rxjs

### Development

- @nestjs/cli, @nestjs/schematics, @nestjs/testing
- @typescript-eslint/eslint-plugin, @typescript-eslint/parser
- eslint, eslint-config-prettier, eslint-plugin-prettier
- jest, ts-jest, supertest
- prettier
- ts-node, ts-loader, tsconfig-paths
- typescript
- @types packages
