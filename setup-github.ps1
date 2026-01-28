# GitHub Setup Script for Ghibli Art Generator Frontend (PowerShell)
# This script helps initialize and push the project to GitHub

Write-Host "🎨 Ghibli Art AI - Frontend GitHub Setup Script" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Check if git is initialized
if (-not (Test-Path ".git")) {
    Write-Host "Initializing git repository..." -ForegroundColor Blue
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
} else {
    Write-Host "✓ Git repository already exists" -ForegroundColor Green
}

Write-Host ""

# Step 2: Verify .gitignore
Write-Host "Verifying .gitignore configuration..." -ForegroundColor Blue
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    if ($gitignoreContent -match "node_modules") {
        Write-Host "✓ .gitignore properly configured" -ForegroundColor Green
    } else {
        Write-Host "⚠ Warning: node_modules not in .gitignore" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ Warning: .gitignore not found" -ForegroundColor Yellow
}

Write-Host ""

# Step 3: Install dependencies
Write-Host "Installing dependencies (this may take a moment)..." -ForegroundColor Blue
if (Test-Path "package.json") {
    npm install
    Write-Host "✓ Dependencies installed" -ForegroundColor Green
} else {
    Write-Host "✗ package.json not found" -ForegroundColor Red
    exit 1
}

Write-Host ""

# Step 4: Add and commit files
Write-Host "Adding files to git..." -ForegroundColor Blue
git add -A
Write-Host "✓ Files staged" -ForegroundColor Green

Write-Host ""

# Step 5: Initial commit
Write-Host "Creating initial commit..." -ForegroundColor Blue
git commit -m "Initial commit: Ghibli Art Generator Frontend with Docker configuration" 2>$null || Write-Host "⚠ Nothing to commit" -ForegroundColor Yellow
Write-Host "✓ Initial commit created" -ForegroundColor Green

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Create a new repository on GitHub: https://github.com/new"
Write-Host "2. Name it: Ghibli-Frontend"
Write-Host "3. Copy the repository URL"
Write-Host "4. Run: git remote add origin <your-repo-url>"
Write-Host "5. Run: git branch -M main"
Write-Host "6. Run: git push -u origin main"
Write-Host ""
Write-Host "To connect to existing repository:" -ForegroundColor Blue
Write-Host "git remote add origin https://github.com/yourusername/Ghibli-Frontend.git"
Write-Host "git branch -M main"
Write-Host "git push -u origin main"
Write-Host ""
Write-Host "✓ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "To start development:" -ForegroundColor Blue
Write-Host "npm run dev"
