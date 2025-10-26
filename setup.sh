#!/bin/bash
set -e

echo "🚀 Setting up Bun + Turborepo Monorepo..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Bun is installed
if ! command -v bun &> /dev/null; then
  echo -e "${RED}❌ Bun not installed. Install it with: curl -fsSL https://bun.sh/install | bash${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Bun found ($(bun --version))${NC}"

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
  echo -e "${RED}❌ Python 3 not found. Please install Python 3.8 or higher${NC}"
  exit 1
fi
echo -e "${GREEN}✓ Python $(python3 --version | cut -d' ' -f2) found${NC}"

# Create directory structure if needed
echo -e "${BLUE}📦 Creating monorepo structure...${NC}"
mkdir -p apps/frontend apps/backend apps/data-service packages/shared/src/{types,utils}

# Check if we need to move existing files
if [ -d "src" ] && [ ! -d "apps/frontend/src" ]; then
  echo -e "${YELLOW}→ Moving existing React app to apps/frontend/${NC}"
  
  # Move source files
  mv src apps/frontend/ 2>/dev/null || true
  
  # Move config files
  for file in vite.config.ts tsconfig.json tsconfig.app.json tsconfig.node.json index.html tailwind.config.js postcss.config.js eslint.config.js components.json vitest.config.ts playwright.config.ts; do
    [ -f "$file" ] && mv "$file" apps/frontend/ 2>/dev/null || true
  done
  
  # Move directories
  for dir in tests public; do
    [ -d "$dir" ] && mv "$dir" apps/frontend/ 2>/dev/null || true
  done
  
  echo -e "${GREEN}✓ Frontend files moved${NC}"
fi

# Set up Python environment
echo -e "${BLUE}🐍 Setting up Python environment...${NC}"
cd apps/data-service

if [ ! -d "venv" ]; then
  # Create venv in a safe location
  python3 -m venv venv 2>/dev/null || {
    echo -e "${YELLOW}⚠ Standard venv creation failed, trying alternative method...${NC}"
    python3 -m venv --without-pip venv
    cd venv/bin
    ./python -m ensurepip
    cd ../..
  }
  if [ -d "venv" ]; then
    echo -e "${GREEN}✓ Python virtual environment created${NC}"
  else
    echo -e "${RED}❌ Failed to create Python virtual environment${NC}"
    echo -e "${YELLOW}→ You may need to manually create it later${NC}"
    cd ../..
    skip_python=true
  fi
fi

if [ "$skip_python" != "true" ]; then
  # Activate virtual environment based on OS
  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
  else
    source venv/bin/activate
  fi

  # Upgrade pip
  pip install --upgrade pip --quiet

  # Install Python dependencies
  if [ -f "requirements.txt" ]; then
    echo -e "${BLUE}→ Installing Python dependencies...${NC}"
    pip install -r requirements.txt --quiet
    echo -e "${GREEN}✓ Python dependencies installed${NC}"
  else
    echo -e "${YELLOW}⚠ requirements.txt not found${NC}"
  fi

  # Deactivate virtual environment
  deactivate
  cd ../..
else
  cd ../..
fi

# Install Node.js dependencies
echo -e "${BLUE}📦 Installing Node.js dependencies...${NC}"
bun install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
  echo -e "${BLUE}→ Creating .env file...${NC}"
  cat > .env << 'EOF'
NODE_ENV=development
PORT=3000
PYTHON_API_URL=http://localhost:8000
VITE_API_URL=http://localhost:3000
EOF
  echo -e "${GREEN}✓ .env file created${NC}"
fi

# Create uploads directory for backend
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
echo "  ${YELLOW}bun run dev${NC}      - Start frontend & backend"
echo "  ${YELLOW}bun run build${NC}    - Build all apps"
echo "  ${YELLOW}bun run test${NC}     - Run all tests"
echo "  ${YELLOW}bun run lint${NC}     - Lint all code"
echo ""
echo -e "${GREEN}🚀 Get started: ${YELLOW}bun run dev:all${NC}"
echo ""
