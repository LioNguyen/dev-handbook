# 🚀 Transform React Boilerplate into Bun + Turborepo Monorepo

You are a senior full-stack DevOps architect. Transform my existing React + Vite + Atomic Design repository into a production-ready **Turborepo monorepo** using **Bun**.

---

## 📋 Current Structure

```
react-boilerplate/
├── src/
│   ├── core/ (api, components [atoms/molecules/organisms/templates], config, hooks, i18n, locale, routing)
│   ├── modules/ (auth, users)
│   ├── pages/
│   ├── shared/ (assets, hooks, lib, mocks, store, styles, types, utils)
│   └── test/
├── package.json, vite.config.ts, tsconfig.json, index.html
```

**Tech Stack:** React 19.1.1, Vite 7.1.2, TypeScript 5.8.3, TailwindCSS 4.1.12, React Router 7.8.0, React Query 5.85.3, Zustand 5.0.7, React Hook Form + Zod, Vitest + Playwright, ESLint + Prettier, MSW

---

## 🎯 Target Architecture

```
my-app/
├── apps/
│   ├── frontend/       # ALL existing src/ content goes here
│   ├── backend/        # NEW: NestJS API
│   └── data-service/   # NEW: Python FastAPI
├── packages/shared/    # NEW: Shared TS types
├── package.json, turbo.json, setup.sh, vercel.json, railway.json
```

---

## ⚙️ Requirements

**Must-Have:**

1. ✅ `bun run dev:all` starts all 3 services in parallel with hot reload
2. ✅ Move ALL `src/` content → `apps/frontend/src/` (preserve everything)
3. ✅ Python auto-starts via uvicorn (no manual venv activation)
4. ✅ CORS + Proxy configured correctly
5. ✅ Shared TypeScript types across frontend/backend
6. ✅ Health checks on all services
7. ✅ **Deploy:** Frontend + Backend → Vercel, Python → Railway

**Preserve:** All existing scripts, dependencies, ESLint, Prettier, Vitest, Playwright, MSW, Husky, lint-staged

---

## 🛠 Implementation

### 1️⃣ Root Config

**`package.json`:**

```json
{
  "name": "monorepo",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "scripts": {
    "dev": "turbo run dev --parallel",
    "dev:all": "concurrently -n frontend,backend,python -c green,blue,magenta \"turbo run dev --filter=frontend\" \"turbo run dev --filter=backend\" \"bun run dev:python\"",
    "dev:python": "cd apps/data-service && (source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null) && uvicorn main:app --reload --port 8000",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "format": "turbo run format",
    "test": "turbo run test",
    "test:e2e": "turbo run test:e2e",
    "type-check": "turbo run type-check",
    "clean": "turbo run clean && rm -rf node_modules .turbo",
    "setup:python": "cd apps/data-service && python3 -m venv venv && (source venv/bin/activate || . venv/Scripts/activate) && pip install -r requirements.txt"
  },
  "devDependencies": {
    "turbo": "^2.1.0",
    "concurrently": "^8.2.0",
    "typescript": "~5.8.3"
  }
}
```

**`turbo.json`:**

```json
{
  "$schema": "https://turbo.build/schema.json",
  "pipeline": {
    "dev": { "cache": false, "persistent": true },
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", "build/**", ".next/**"],
      "env": ["NODE_ENV"]
    },
    "lint": { "outputs": [], "dependsOn": ["^build"] },
    "format": { "outputs": [], "cache": false },
    "type-check": { "dependsOn": ["^build"], "outputs": [] },
    "test": { "outputs": ["coverage/**"], "dependsOn": ["^build"] },
    "test:e2e": { "cache": false, "dependsOn": ["build"] },
    "clean": { "cache": false }
  }
}
```

---

### 2️⃣ Frontend (apps/frontend)

**Move all existing files:**

```bash
# Move EVERYTHING from root to apps/frontend/
mv src apps/frontend/
mv vite.config.ts tsconfig.json index.html apps/frontend/
mv tailwind.config.js postcss.config.js eslint.config.js .prettierrc apps/frontend/ 2>/dev/null || true
mv vitest.config.ts playwright.config.ts apps/frontend/ 2>/dev/null || true
```

**`apps/frontend/package.json`:** (Keep existing dependencies + add `"shared": "workspace:*"`)

**`apps/frontend/vite.config.ts`:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      shared: path.resolve(__dirname, '../../packages/shared/src'),
    },
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
```

**`apps/frontend/tsconfig.json`:** (Add paths: `"shared": ["../../packages/shared/src"]`)

**`apps/frontend/src/core/api/dataApi.ts`:**

```typescript
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

export const uploadExcelFile = async (
  file: File
): Promise<ExcelAnalysisResult> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/data/excel', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) throw new Error('Failed to upload Excel file')
  return response.json()
}

export const uploadXMLFile = async (file: File): Promise<XMLAnalysisResult> => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/data/xml', {
    method: 'POST',
    body: formData,
  })
  if (!response.ok) throw new Error('Failed to upload XML file')
  return response.json()
}
```

---

### 3️⃣ Backend (apps/backend)

**`apps/backend/package.json`:**

```json
{
  "name": "backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "nest start --watch",
    "build": "nest build",
    "start": "node dist/main",
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@nestjs/common": "^10.3.0",
    "@nestjs/core": "^10.3.0",
    "@nestjs/platform-express": "^10.3.0",
    "@nestjs/config": "^3.1.1",
    "axios": "^1.11.0",
    "form-data": "^4.0.0",
    "multer": "^1.4.5-lts.1",
    "reflect-metadata": "^0.2.1",
    "rxjs": "^7.8.1",
    "shared": "workspace:*"
  },
  "devDependencies": {
    "@nestjs/cli": "^10.3.0",
    "@types/express": "^4.17.21",
    "@types/multer": "^1.4.11",
    "@types/node": "^24.2.1",
    "typescript": "~5.8.3"
  }
}
```

**`apps/backend/src/main.ts`:**

```typescript
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:4173'],
    credentials: true,
  })
  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`🚀 Backend API running on http://localhost:${port}`)
}
bootstrap()
```

**`apps/backend/src/app.module.ts`:**

```typescript
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { AppController } from './app.controller'
import { DataModule } from './data/data.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MulterModule.register({ dest: './uploads' }),
    DataModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
```

**`apps/backend/src/app.controller.ts`:**

```typescript
import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get('health')
  healthCheck() {
    return {
      status: 'ok',
      service: 'backend',
      timestamp: new Date().toISOString(),
    }
  }
}
```

**`apps/backend/src/data/data.module.ts`:**

```typescript
import { Module } from '@nestjs/common'
import { DataController } from './data.controller'
import { DataService } from './data.service'

@Module({
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
```

**`apps/backend/src/data/data.controller.ts`:**

```typescript
import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { DataService } from './data.service'

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post('excel')
  @UseInterceptors(FileInterceptor('file'))
  async uploadExcel(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded')
    return this.dataService.analyzeFile(file, 'excel')
  }

  @Post('xml')
  @UseInterceptors(FileInterceptor('file'))
  async uploadXml(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file uploaded')
    return this.dataService.analyzeFile(file, 'xml')
  }
}
```

**`apps/backend/src/data/data.service.ts`:**

```typescript
import { Injectable, InternalServerErrorException } from '@nestjs/common'
import axios from 'axios'
import FormData from 'form-data'
import * as fs from 'fs'
import type { ExcelAnalysisResult, XMLAnalysisResult } from 'shared'

@Injectable()
export class DataService {
  private readonly pythonApiUrl =
    process.env.PYTHON_API_URL || 'http://localhost:8000'

  async analyzeFile(
    file: Express.Multer.File,
    type: 'excel' | 'xml'
  ): Promise<ExcelAnalysisResult | XMLAnalysisResult> {
    try {
      const formData = new FormData()
      formData.append('file', fs.createReadStream(file.path))
      const response = await axios.post(
        `${this.pythonApiUrl}/analyze/${type}`,
        formData,
        {
          headers: formData.getHeaders(),
        }
      )
      fs.unlinkSync(file.path)
      return response.data
    } catch (error) {
      console.error('Error analyzing file:', error)
      throw new InternalServerErrorException('Failed to analyze file')
    }
  }
}
```

**`apps/backend/nest-cli.json`:**

```json
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": { "deleteOutDir": true }
}
```

**`apps/backend/tsconfig.json`:** (Add paths: `"shared": ["../../packages/shared/src"]`)

---

### 4️⃣ Python Service (apps/data-service)

**`apps/data-service/main.py`:**

```python
from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import xml.etree.ElementTree as ET
from typing import Dict, Any
import tempfile
import os

app = FastAPI(title="Data Processing Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Data Processing Service", "status": "running"}

@app.get("/health")
async def health_check() -> Dict[str, str]:
    return {"status": "ok", "service": "python-data-service"}

@app.post("/analyze/excel")
async def analyze_excel(file: UploadFile) -> Dict[str, Any]:
    if not file.filename.endswith(('.xlsx', '.xls')):
        raise HTTPException(status_code=400, detail="File must be Excel format")
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix='.xlsx') as temp_file:
            content = await file.read()
            temp_file.write(content)
            temp_path = temp_file.name
        df = pd.read_excel(temp_path)
        os.unlink(temp_path)
        return {
            "columns": df.columns.tolist(),
            "rows": len(df),
            "shape": df.shape,
            "dtypes": df.dtypes.astype(str).to_dict()
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing Excel: {str(e)}")

@app.post("/analyze/xml")
async def analyze_xml(file: UploadFile) -> Dict[str, Any]:
    if not file.filename.endswith('.xml'):
        raise HTTPException(status_code=400, detail="File must be XML format")
    try:
        content = await file.read()
        root = ET.fromstring(content)
        all_elements = set()
        for elem in root.iter():
            all_elements.add(elem.tag)
        return {
            "root": root.tag,
            "childCount": len(root),
            "allElements": list(all_elements),
            "attributes": root.attrib
        }
    except ET.ParseError as e:
        raise HTTPException(status_code=400, detail=f"Invalid XML: {str(e)}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing XML: {str(e)}")
```

**`apps/data-service/requirements.txt`:**

```
fastapi==0.109.0
uvicorn[standard]==0.27.0
pandas==2.2.0
openpyxl==3.1.2
python-multipart==0.0.6
```

**`apps/data-service/__init__.py`:** (empty file)

**`apps/data-service/package.json`:**

```json
{
  "name": "data-service",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "uvicorn main:app --reload --port 8000",
    "start": "uvicorn main:app --host 0.0.0.0 --port $PORT"
  }
}
```

---

### 5️⃣ Shared Package (packages/shared)

**`packages/shared/package.json`:**

```json
{
  "name": "shared",
  "version": "1.0.0",
  "private": true,
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "scripts": {
    "type-check": "tsc --noEmit",
    "lint": "eslint \"src/**/*.ts\" --fix"
  },
  "devDependencies": {
    "typescript": "~5.8.3"
  }
}
```

**`packages/shared/src/index.ts`:**

```typescript
export * from './types/excel'
export * from './types/xml'
export * from './utils/validators'
```

**`packages/shared/src/types/excel.ts`:**

```typescript
export interface ExcelAnalysisResult {
  columns: string[]
  rows: number
  shape: [number, number]
  dtypes: Record<string, string>
}
```

**`packages/shared/src/types/xml.ts`:**

```typescript
export interface XMLAnalysisResult {
  root: string
  childCount: number
  allElements: string[]
  attributes: Record<string, string>
}
```

**`packages/shared/src/utils/validators.ts`:**

```typescript
export const isValidFileType = (
  filename: string,
  allowedTypes: string[]
): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase()
  return extension ? allowedTypes.includes(extension) : false
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

export const validateFileSize = (size: number): boolean => {
  return size <= MAX_FILE_SIZE
}
```

**`packages/shared/tsconfig.json`:**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020"],
    "moduleResolution": "bundler",
    "strict": true,
    "skipLibCheck": true,
    "declaration": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

---

### 6️⃣ Environment & Git

**`.env`:**

```env
NODE_ENV=development
PORT=3000
PYTHON_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:3000
```

**`.env.example`:**

```env
NODE_ENV=development
PORT=3000
PYTHON_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:3000
```

**`.gitignore`:**

```
node_modules/
venv/
__pycache__/
*.pyc
dist/
build/
.turbo/
.env
.env.local
uploads/
coverage/
*.log
.DS_Store
```

---

### 7️⃣ Deployment Configs

**`vercel.json`:** (Frontend + Backend on Vercel)

```json
{
  "version": 2,
  "buildCommand": "cd ../.. && bun install && bun run build --filter=frontend --filter=backend",
  "outputDirectory": "apps/frontend/dist",
  "builds": [
    {
      "src": "apps/backend/package.json",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "apps/backend/dist/main.js"
    },
    {
      "handle": "filesystem"
    },
    {
      "src": "/(.*)",
      "dest": "apps/frontend/dist/index.html"
    }
  ],
  "env": {
    "PYTHON_API_URL": "@python_api_url"
  }
}
```

**`apps/data-service/railway.json`:** (Python on Railway)

```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

**`apps/data-service/Procfile`:** (Railway alternative)

```
web: uvicorn main:app --host 0.0.0.0 --port $PORT
```

**`apps/data-service/runtime.txt`:** (Railway Python version)

```
python-3.11.0
```

---

### 8️⃣ Setup Script

**`setup.sh`:**

```bash
#!/bin/bash
set -e

echo "🚀 Setting up Bun + Turborepo Monorepo..."

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

if ! command -v bun &> /dev/null; then
  echo -e "${RED}❌ Bun not installed. Run: curl -fsSL https://bun.sh/install | bash${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Bun found${NC}"

if ! command -v python3 &> /dev/null; then
  echo -e "${RED}❌ Python 3 not found. Install Python 3.8+${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Python $(python3 --version | cut -d' ' -f2) found${NC}"

echo -e "${BLUE}📦 Creating monorepo structure...${NC}"
mkdir -p apps/frontend apps/backend apps/data-service packages/shared/src/{types,utils}

if [ -d "src" ] && [ ! -d "apps/frontend/src" ]; then
  echo -e "${YELLOW}→ Moving existing React app to apps/frontend/${NC}"

  # Move all source files
  mv src apps/frontend/

  # Move config files
  for file in vite.config.ts tsconfig.json index.html tailwind.config.js postcss.config.js eslint.config.js .prettierrc vitest.config.ts playwright.config.ts; do
    [ -f "$file" ] && mv "$file" apps/frontend/ 2>/dev/null || true
  done

  # Backup original package.json
  [ -f "package.json" ] && cp package.json apps/frontend/package.json.bak

  echo -e "${GREEN}✓ Frontend files moved${NC}"
fi

echo -e "${BLUE}🐍 Setting up Python environment...${NC}"
cd apps/data-service

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  source venv/Scripts/activate
else
  source venv/bin/activate
fi

pip install --upgrade pip --quiet

if [ -f "requirements.txt" ]; then
  pip install -r requirements.txt --quiet
else
  echo "fastapi==0.109.0
uvicorn[standard]==0.27.0
pandas==2.2.0
openpyxl==3.1.2
python-multipart==0.0.6" > requirements.txt
  pip install -r requirements.txt --quiet
fi

deactivate
cd ../..
echo -e "${GREEN}✓ Python ready${NC}"

echo -e "${BLUE}📦 Installing dependencies...${NC}"
bun install

if [ ! -f "apps/backend/src/main.ts" ]; then
  echo -e "${BLUE}⚙️  Initializing NestJS...${NC}"
  cd apps/backend
  bunx @nestjs/cli new . --skip-git --package-manager bun || true
  cd ../..
  echo -e "${GREEN}✓ NestJS initialized${NC}"
fi

if [ ! -f ".env" ]; then
  cat > .env << 'EOF'
NODE_ENV=development
PORT=3000
PYTHON_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:3000
EOF
  echo -e "${GREEN}✓ .env created${NC}"
fi

mkdir -p apps/backend/uploads

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}✅ Setup complete!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Services:${NC}"
echo "  • Frontend:  http://localhost:5173"
echo "  • Backend:   http://localhost:3000"
echo "  • Python:    http://localhost:8000"
echo ""
echo -e "${BLUE}Commands:${NC}"
echo "  ${YELLOW}bun run dev:all${NC}  - Start all services"
echo "  ${YELLOW}bun run build${NC}    - Build all"
echo "  ${YELLOW}bun run test${NC}     - Run tests"
echo ""
echo -e "${GREEN}🚀 Start: bun run dev:all${NC}"
```

```bash
chmod +x setup.sh
```

---

## 🎯 Execution Steps

**AI Assistant must:**

1. ✅ Generate ALL files above in correct structure
2. ✅ **Move ENTIRE `src/` directory → `apps/frontend/src/`** (preserve everything)
3. ✅ Move all config files (vite, tsconfig, etc.) → `apps/frontend/`
4. ✅ Update `apps/frontend/package.json` dependencies (add `"shared": "workspace:*"`)
5. ✅ Configure Vite proxy for `/api` routes
6. ✅ Set up NestJS with CORS, Multer, Data module
7. ✅ Create Python FastAPI with Excel/XML endpoints
8. ✅ Create shared package with TypeScript types
9. ✅ Generate `setup.sh` script (executable)
10. ✅ Create Vercel config (frontend + backend)
11. ✅ Create Railway config (Python service)

---

## 🚀 Deployment Steps

### Vercel (Frontend + Backend):

```bash
# Install Vercel CLI
bun add -g vercel

# Link project
vercel link

# Set environment variable
vercel env add PYTHON_API_URL production

# Deploy
vercel --prod
```

### Railway (Python):

1. Create new Railway project
2. Connect GitHub repo
3. Select `apps/data-service` as root directory
4. Railway auto-detects Python + `requirements.txt`
5. Get deployment URL → Add to Vercel env as `PYTHON_API_URL`

---

## ✅ Success Criteria

- ✅ `./setup.sh` completes without errors
- ✅ `bun run dev:all` starts all 3 services
- ✅ Frontend loads at http://localhost:5173
- ✅ `curl http://localhost:3000/health` returns `{"status":"ok"}`
- ✅ `curl http://localhost:8000/health` returns `{"status":"ok"}`
- ✅ All existing tests/lint/format scripts work
- ✅ Hot reload works on all services
- ✅ File uploads work: `/api/data/excel` and `/api/data/xml`
- ✅ Vercel deployment succeeds (frontend + backend)
- ✅ Railway deployment succeeds (Python)

---

## 📝 Post-Setup Verification

```bash
# Structure check
tree -L 3 -I 'node_modules|venv'

# Start all services
bun run dev:all

# In another terminal:
curl http://localhost:3000/health  # Backend
curl http://localhost:8000/health  # Python
curl http://localhost:5173         # Frontend
```

**Timeline:** Clone → Setup → Running in **under 2 minutes** 🚀
