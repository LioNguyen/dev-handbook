#!/bin/bash

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${BLUE}🔍 Verifying Monorepo Structure...${NC}"
echo ""

# Function to check file/directory
check_exists() {
  if [ -e "$1" ]; then
    echo -e "${GREEN}✓${NC} $1"
    return 0
  else
    echo -e "${RED}✗${NC} $1 ${RED}(missing)${NC}"
    return 1
  fi
}

# Root files
echo -e "${BLUE}📁 Root Configuration:${NC}"
check_exists "package.json"
check_exists "turbo.json"
check_exists ".env"
check_exists ".env.example"
check_exists "setup.sh"
check_exists "vercel.json"
echo ""

# Frontend
echo -e "${BLUE}📁 Frontend (apps/frontend):${NC}"
check_exists "apps/frontend/package.json"
check_exists "apps/frontend/src"
check_exists "apps/frontend/vite.config.ts"
check_exists "apps/frontend/tsconfig.json"
check_exists "apps/frontend/src/core/api/dataApi.ts"
echo ""

# Backend
echo -e "${BLUE}📁 Backend (apps/backend):${NC}"
check_exists "apps/backend/package.json"
check_exists "apps/backend/src/main.ts"
check_exists "apps/backend/src/app.module.ts"
check_exists "apps/backend/src/data/data.controller.ts"
check_exists "apps/backend/src/data/data.service.ts"
check_exists "apps/backend/nest-cli.json"
check_exists "apps/backend/tsconfig.json"
echo ""

# Python Service
echo -e "${BLUE}📁 Python Service (apps/data-service):${NC}"
check_exists "apps/data-service/package.json"
check_exists "apps/data-service/main.py"
check_exists "apps/data-service/requirements.txt"
check_exists "apps/data-service/railway.json"
check_exists "apps/data-service/Procfile"
echo ""

# Shared Package
echo -e "${BLUE}📁 Shared Package (packages/shared):${NC}"
check_exists "packages/shared/package.json"
check_exists "packages/shared/src/index.ts"
check_exists "packages/shared/src/types/excel.ts"
check_exists "packages/shared/src/types/xml.ts"
check_exists "packages/shared/src/utils/validators.ts"
echo ""

# Documentation
echo -e "${BLUE}📁 Documentation:${NC}"
check_exists "README.monorepo.md"
check_exists "QUICKSTART.md"
check_exists "TRANSFORMATION_COMPLETE.md"
echo ""

# Check if dependencies are installed
echo -e "${BLUE}📦 Dependencies:${NC}"
if [ -d "node_modules" ]; then
  echo -e "${GREEN}✓${NC} node_modules"
else
  echo -e "${RED}✗${NC} node_modules ${YELLOW}(run: bun install)${NC}"
fi

if command -v bun &> /dev/null; then
  echo -e "${GREEN}✓${NC} Bun installed ($(bun --version))"
else
  echo -e "${RED}✗${NC} Bun not installed"
fi

if command -v python3 &> /dev/null; then
  echo -e "${GREEN}✓${NC} Python installed ($(python3 --version 2>&1))"
else
  echo -e "${RED}✗${NC} Python not installed"
fi

echo ""
echo -e "${BLUE}🚀 Next Steps:${NC}"
echo "  1. ${YELLOW}bun run dev:all${NC} - Start all services"
echo "  2. Open http://localhost:5173 (Frontend)"
echo "  3. Test http://localhost:3000/health (Backend)"
echo "  4. Test http://localhost:8000/health (Python)"
echo ""
echo -e "${GREEN}✅ Verification complete!${NC}"
