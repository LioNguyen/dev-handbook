# 🚀 Bun + Turborepo Monorepo

A production-ready monorepo featuring React, NestJS, and Python FastAPI services, orchestrated with Turborepo and Bun.

## 📋 Table of Contents

1. [Project Structure](#-project-structure)
2. [Tech Stack](#-tech-stack)
3. [Quick Start](#-quick-start)
4. [Installation](#-installation)
5. [Development](#-development)
6. [Services Overview](#-services-overview)
7. [Available Commands](#-available-commands)
8. [API Usage](#-api-usage)
9. [Configuration](#-configuration)
10. [Deployment](#-deployment)
11. [Testing](#-testing)
12. [Troubleshooting](#-troubleshooting)

## 📋 Project Structure

```
monorepo/
├── apps/
│   ├── frontend/       # React 19 + Vite + TailwindCSS
│   ├── backend/        # NestJS API server
│   └── data-service/   # Python FastAPI data processing
├── packages/
│   └── shared/         # Shared TypeScript types
├── package.json        # Root workspace config
├── turbo.json          # Turborepo configuration
├── setup.sh            # Automated setup script
└── vercel.json         # Deployment config
```

## 🛠 Tech Stack

### Frontend (`apps/frontend`)

- **React 19.1.1** - UI library
- **Vite 7.1.2** - Build tool
- **TypeScript 5.8.3** - Type safety
- **TailwindCSS 4.1.12** - Styling
- **React Router 7.8.0** - Routing
- **React Query 5.85.3** - Data fetching
- **Zustand 5.0.7** - State management
- **React Hook Form + Zod** - Form validation
- **Vitest + Playwright** - Testing
- **Atomic Design** - Component architecture

### Backend (`apps/backend`)

- **NestJS 10.3.0** - Node.js framework
- **TypeScript 5.8.3** - Type safety
- **Multer** - File upload handling
- **Axios** - HTTP client
- **CORS** - Cross-origin resource sharing

### Data Service (`apps/data-service`)

- **FastAPI 0.109.0** - Python web framework
- **Pandas 2.2.0** - Data analysis
- **OpenPyXL 3.1.2** - Excel file handling
- **Uvicorn 0.27.0** - ASGI server

### Shared (`packages/shared`)

- TypeScript types shared across all services
- Validation utilities
- Common constants

## 🚀 Quick Start

### Prerequisites

- **Bun** >= 1.0.0 ([Install](https://bun.sh))
- **Python** >= 3.11.0 ([Install](https://python.org))
- **Node.js** >= 18.0.0 (for compatibility)

### ⚡️ Fast Setup

```bash
# Clone and setup
git clone <your-repo-url>
cd monorepo

# Run automated setup
chmod +x setup.sh
./setup.sh

# Start all services
bun run dev:all
```

The setup script will:

- ✅ Verify Bun and Python installation
- ✅ Install all Node.js dependencies
- ✅ Create Python virtual environment
- ✅ Install Python dependencies
- ✅ Create `.env` file
- ✅ Set up directory structure

## 📦 Installation

### 🚨 Important: Directory Name Issue

If your project path contains a colon (`:`) like `template:react-boilerplate`, Python's venv will fail.

**Option 1: Rename Directory (Recommended)**

```bash
cd ..
mv "template:react-boilerplate" "template-react-boilerplate"
cd template-react-boilerplate
```

**Option 2: Use System Python**

```bash
cd apps/data-service
pip3 install -r requirements.txt
```

### Manual Installation Steps

```bash
# 1. Install Node.js dependencies
bun install

# 2. Set up Python environment (if directory renamed)
cd apps/data-service
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
deactivate
cd ../..

# 3. Create environment file
cp .env.example .env
```

## 🎯 Development

### Start All Services

```bash
# Start frontend, backend, and Python service
bun run dev:all
```

This will start:

- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000
- **Python**: http://localhost:8000

### Start Individual Services

```bash
# Frontend only
bun run dev --filter=frontend

# Backend only
bun run dev --filter=backend

# Python service only
bun run dev:python

# Or start Python manually
cd apps/data-service
python3 main.py
```

### Verify Services

```bash
# Check frontend (open in browser)
open http://localhost:5173

# Check backend health
curl http://localhost:3000/health

# Check Python service health
curl http://localhost:8000/health
```

## 🌐 Services Overview

### Frontend (Port 5173)

React application with Atomic Design architecture:

- **Atoms**: Basic UI components (Button, Input, Card)
- **Molecules**: Composite components (FormErrors, etc.)
- **Organisms**: Complex components
- **Templates**: Page layouts

**Features:**

- File upload for Excel and XML analysis
- Real-time data processing
- Responsive design
- Dark/Light theme support
- Internationalization (i18n)

### Backend (Port 3000)

NestJS API server providing:

**Endpoints:**

- `GET /health` - Health check
- `POST /data/excel` - Upload and analyze Excel files
- `POST /data/xml` - Upload and analyze XML files

**Features:**

- CORS enabled for frontend
- File upload via Multer
- Proxy to Python service for data processing
- Automatic file cleanup

### Python Service (Port 8000)

FastAPI service for data analysis:

**Endpoints:**

- `GET /` - Service information
- `GET /health` - Health check
- `POST /analyze/excel` - Analyze Excel files
- `POST /analyze/xml` - Analyze XML files

**Features:**

- Excel file analysis (columns, rows, data types)
- XML structure analysis (elements, attributes)
- Automatic file validation

## 📝 Available Commands

### Development

```bash
bun run dev          # Start all Node.js services
bun run dev:all      # Start all services (including Python)
bun run dev:python   # Start Python service only
```

### Build

```bash
bun run build        # Build all apps
```

### Testing

```bash
bun run test         # Run all unit tests
bun run test:e2e     # Run E2E tests
bun run test:coverage # Run tests with coverage
bun run test:ui      # Run tests in UI mode
```

### Code Quality

```bash
bun run lint         # Lint all code
bun run lint:fix     # Fix linting issues
bun run format       # Format all code
bun run type-check   # TypeScript type checking
```

### Cleanup

```bash
bun run clean        # Clean build artifacts
bun run clean:all    # Clean everything including node_modules
```

## 💡 API Usage

### API Flow

```
User Upload File → Frontend (5173)
                     ↓ POST /api/data/excel
                   Backend (3000)
                     ↓ POST /analyze/excel
                   Python (8000)
                     ↓ Pandas Analysis
                   Return Results
                     ↓
                   Frontend Display
```

### Upload Excel File

```typescript
import { uploadExcelFile } from '@/core/api/dataApi'
import type { ExcelAnalysisResult } from 'shared'

const handleUpload = async (file: File) => {
  try {
    const result: ExcelAnalysisResult = await uploadExcelFile(file)
    console.log('Columns:', result.columns)
    console.log('Rows:', result.rows)
    console.log('Data types:', result.dtypes)
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

### Upload XML File

```typescript
import { uploadXMLFile } from '@/core/api/dataApi'
import type { XMLAnalysisResult } from 'shared'

const handleUpload = async (file: File) => {
  try {
    const result: XMLAnalysisResult = await uploadXMLFile(file)
    console.log('Root element:', result.root)
    console.log('Child count:', result.childCount)
    console.log('All elements:', result.allElements)
  } catch (error) {
    console.error('Upload failed:', error)
  }
}
```

## 🔧 Configuration

### Environment Variables

Create `.env` in the root:

```env
NODE_ENV=development
PORT=3000
PYTHON_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:3000
```

For production:

```env
NODE_ENV=production
PORT=3000
PYTHON_API_URL=https://your-railway-app.railway.app
VITE_API_URL=https://your-vercel-app.vercel.app
```

### Turborepo

The `turbo.json` configures task pipelines:

- **dev**: Runs services in watch mode
- **build**: Builds all apps with dependency awareness
- **test**: Runs tests with caching
- **lint**: Lints code with output caching

### Package Management

This monorepo uses **Bun workspaces**:

```json
{
  "workspaces": ["apps/*", "packages/*"]
}
```

#### Adding Dependencies

```bash
# Add to specific workspace
bun add <package> --filter=frontend
bun add <package> --filter=backend

# Add to root
bun add -D <package>

# Python dependencies
cd apps/data-service
source venv/bin/activate
pip install <package>
pip freeze > requirements.txt
```

## 🚢 Deployment

### Vercel (Frontend + Backend)

```bash
# Install Vercel CLI
bun add -g vercel

# Deploy
vercel --prod
```

**Environment Variables in Vercel:**

- `PYTHON_API_URL` - URL of deployed Python service

### Railway (Python Service)

1. Create new Railway project
2. Connect GitHub repository
3. Set root directory to `apps/data-service`
4. Railway auto-detects Python and installs dependencies
5. Copy deployment URL
6. Add to Vercel as `PYTHON_API_URL`

### Manual Deployment

```bash
# Build all services
bun run build

# Frontend - Deploy dist/ to any static host
cd apps/frontend/dist

# Backend - Deploy as Node.js app
cd apps/backend
bun run start

# Python - Run with production server
cd apps/data-service
uvicorn main:app --host 0.0.0.0 --port $PORT
```

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
bun run test

# Run with coverage
bun run test:coverage

# Run in watch mode
bun run test:watch

# Run in UI mode
bun run test:ui
```

### E2E Tests

```bash
# Run E2E tests
bun run test:e2e

# Run in UI mode
bun run test:e2e:ui

# Run in headed mode
bun run test:e2e:headed

# Debug mode
bun run test:e2e:debug
```

## 🔍 Troubleshooting

### Port Conflicts

```bash
# Kill processes on specific ports
lsof -ti:5173 | xargs kill -9  # Frontend
lsof -ti:3000 | xargs kill -9  # Backend
lsof -ti:8000 | xargs kill -9  # Python
```

### Python Virtual Environment Issues

```bash
# Recreate virtual environment
cd apps/data-service
rm -rf venv
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

### Clear and Reinstall

```bash
bun run clean:all
bun install

# Python dependencies
cd apps/data-service
pip3 install --upgrade -r requirements.txt
```

### Type Errors with Shared Package

```bash
# Rebuild shared package
cd packages/shared
bun run type-check

# Restart dev servers
bun run dev:all
```

## 📚 What's Included

### ✅ Features Implemented

- ✅ **Frontend (apps/frontend)** - All existing React code preserved
  - Vite configured with proxy to backend (`/api` → `http://localhost:3000`)
  - TypeScript paths updated for shared package
  - New API client for data uploads (`src/core/api/dataApi.ts`)

- ✅ **Backend (apps/backend)** - NestJS API server
  - CORS enabled for frontend
  - File upload handling with Multer
  - Health check and data processing endpoints
  - Proxies requests to Python service

- ✅ **Python Service (apps/data-service)** - FastAPI data processing
  - Excel and XML analysis endpoints
  - CORS middleware configured
  - Pandas-powered data analysis

- ✅ **Shared Package (packages/shared)** - TypeScript types
  - Types for Excel and XML analysis
  - File validation utilities
  - Accessible from all TypeScript apps

### 📦 Dependencies Installed

**Root:** turbo, concurrently, typescript

**Frontend:** All existing dependencies + shared package

**Backend:** @nestjs/core, multer, axios, shared package

**Python:** fastapi, uvicorn, pandas, openpyxl

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- React Team
- NestJS Team
- FastAPI Team
- Turborepo Team
- Bun Team
