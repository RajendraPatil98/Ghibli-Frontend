#!/bin/bash
# GitHub Setup Script for Ghibli Art Generator Frontend
# This script helps initialize and push the project to GitHub

set -e

echo "🎨 Ghibli Art AI - Frontend GitHub Setup Script"
echo "================================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${BLUE}Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}✓ Git repository initialized${NC}"
else
    echo -e "${GREEN}✓ Git repository already exists${NC}"
fi

echo ""

# Step 2: Verify .gitignore
echo -e "${BLUE}Verifying .gitignore configuration...${NC}"
if grep -q "node_modules" .gitignore 2>/dev/null; then
    echo -e "${GREEN}✓ .gitignore properly configured${NC}"
else
    echo -e "${YELLOW}⚠ Warning: node_modules not in .gitignore${NC}"
fi

echo ""

# Step 3: Install dependencies
echo -e "${BLUE}Installing dependencies (this may take a moment)...${NC}"
if [ -f "package.json" ]; then
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}✗ package.json not found${NC}"
    exit 1
fi

echo ""

# Step 4: Add and commit files
echo -e "${BLUE}Adding files to git...${NC}"
git add -A
echo -e "${GREEN}✓ Files staged${NC}"

echo ""

# Step 5: Initial commit
echo -e "${BLUE}Creating initial commit...${NC}"
git commit -m "Initial commit: Ghibli Art Generator Frontend with Docker configuration" || echo -e "${YELLOW}⚠ Nothing to commit${NC}"
echo -e "${GREEN}✓ Initial commit created${NC}"

echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Create a new repository on GitHub: https://github.com/new"
echo "2. Name it: Ghibli-Frontend"
echo "3. Copy the repository URL"
echo "4. Run: git remote add origin <your-repo-url>"
echo "5. Run: git branch -M main"
echo "6. Run: git push -u origin main"
echo ""
echo -e "${BLUE}To connect to existing repository:${NC}"
echo "git remote add origin https://github.com/yourusername/Ghibli-Frontend.git"
echo "git branch -M main"
echo "git push -u origin main"
echo ""
echo -e "${GREEN}✓ Setup complete!${NC}"
echo ""
echo -e "${BLUE}To start development:${NC}"
echo "npm run dev"
