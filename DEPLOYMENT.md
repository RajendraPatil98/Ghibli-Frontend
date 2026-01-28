# Deployment Guide for Ghibli Art Generator Frontend

## Quick Start - Local Docker Deployment

### Prerequisites
- Docker installed (version 20.10+)
- Docker Compose installed (version 2.0+)
- Backend API running (locally or remote)

### Step 1: Configure Environment Variables

Create a `.env.local` file:

```bash
# .env.local (do not commit to git)
VITE_API_BASE_URL=http://localhost:8082/api/v1
```

Or if backend is on Render:
```bash
VITE_API_BASE_URL=https://ghibli-api.onrender.com/api/v1
```

### Step 2: Build and Run with Docker Compose

```bash
# Build the Docker image
docker-compose build

# Run the service
docker-compose up -d

# View logs
docker-compose logs -f ghibli-frontend

# Stop the service
docker-compose down
```

### Step 3: Access the Application

```
http://localhost:3000
```

---

## Deployment to Render.com

### Prerequisites
- Render.com account
- GitHub repository with frontend code
- Backend API already deployed to Render

### Step 1: Create Render Web Service

1. Go to [render.com/dashboard](https://render.com/dashboard)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select the `Ghibli-Frontend` repository branch

### Step 2: Configure Service

| Setting | Value |
|---------|-------|
| **Name** | ghibli-frontend |
| **Environment** | Docker |
| **Plan** | Free (or Standard for production) |
| **Region** | Choose closest to users |

### Step 3: Add Environment Variables

In Render Dashboard → Environment:

```
VITE_API_BASE_URL=https://ghibli-api.onrender.com/api/v1
NODE_ENV=production
```

### Step 4: Deploy

1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Monitor logs in Render Dashboard
4. Access your app at: `https://ghibli-frontend.onrender.com`

---

## Deployment to Vercel (Alternative - Recommended for React)

### Step 1: Install Vercel CLI

```bash
npm i -g vercel
```

### Step 2: Configure Environment

Create `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_API_BASE_URL": "@ghibli_api_url"
  }
}
```

### Step 3: Deploy

```bash
vercel --prod
```

---

## Deployment to Netlify (Alternative)

### Step 1: Create netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[context.production.environment]
  VITE_API_BASE_URL = "https://ghibli-api.onrender.com/api/v1"

[context.deploy-preview.environment]
  VITE_API_BASE_URL = "https://ghibli-api.onrender.com/api/v1"
```

### Step 2: Deploy via GitHub

1. Push code to GitHub
2. Connect repo to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy automatically on push

---

## Local Development

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173` (Vite default)

### Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` directory

### Preview Production Build

```bash
npm run preview
```

---

## Performance Optimization

### Image Optimization
```javascript
// Use next-gen formats (WebP)
// Implement lazy loading for images
// Compress images with tools like ImageOptim
```

### Code Splitting
```javascript
// React Router already implements code splitting
// Monitor bundle size: npm run build
```

### Caching Strategy
```
Static assets (JS, CSS): 1 year
HTML (index.html): 1 hour
API responses: Cache in Redux/Zustand
```

### Current Build Size
- Gzipped: ~150-200KB
- Uncompressed: ~500-600KB

---

## Environment-Specific Configuration

### Development
```bash
VITE_API_BASE_URL=http://localhost:8082/api/v1
```

### Staging
```bash
VITE_API_BASE_URL=https://ghibli-api-staging.onrender.com/api/v1
```

### Production
```bash
VITE_API_BASE_URL=https://ghibli-api.onrender.com/api/v1
```

---

## Troubleshooting

### Cannot connect to backend
```bash
# Check API_BASE_URL in .env
cat .env.local

# Verify backend is running
curl https://ghibli-api.onrender.com/api/v1/generate-from-text

# Check browser console for CORS errors
# Add backend URL to CORS whitelist
```

### Port already in use
```bash
# Use different port
docker run -p 5000:3000 ghibli-frontend
```

### Build fails with dependencies
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Slow build on Render
```bash
# Render might be using free tier (slow)
# Upgrade to standard plan for faster builds
# Or use Vercel/Netlify for faster deployments
```

---

## GitHub Actions CI/CD (Optional)

Create `.github/workflows/frontend-deploy.yml`:

```yaml
name: Deploy Frontend to Render

on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'package.json'
      - 'Dockerfile'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Trigger Render Deploy
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }} \
            -H 'Content-Type: application/json'
```

Add `RENDER_DEPLOY_HOOK` secret from Render dashboard.

---

## Monitoring

### Render.com Monitoring
- **Logs**: Dashboard → Logs
- **Metrics**: Monitor CPU, Memory, Bandwidth
- **Errors**: Set up error alerts

### Frontend Monitoring
```javascript
// Add error tracking (Sentry)
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.VITE_SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

### Performance Monitoring
```javascript
// Web Vitals tracking
// Monitor CLS, FID, LCP
// Use Lighthouse CI
```

---

## Security Best Practices

1. **Never commit .env files** ✓ (in .gitignore)
2. **Use environment variables** for all secrets
3. **Enable HTTPS only** in production
4. **Set CORS properly** for backend
5. **Implement rate limiting** on backend
6. **Update dependencies regularly**
   ```bash
   npm audit
   npm update
   ```
7. **Use Content Security Policy** headers
8. **Implement CSRF protection**

---

## Rollback Strategy

### Render.com Rollback
1. Go to Render Dashboard
2. Select service → Deployments
3. Click previous deployment → Redeploy

### Vercel Rollback
1. Go to Vercel Dashboard
2. Select project → Deployments
3. Click previous deployment → Redeploy

### Git Rollback
```bash
# Revert to previous commit
git revert <commit-hash>
git push origin main
```

---

## Connecting Frontend to Backend

### Update API URL in environment

For development:
```javascript
// src/config.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8082/api/v1';
```

For API calls:
```javascript
const response = await fetch(`${API_BASE_URL}/generate-from-text`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ prompt, style })
});
```

---

Last Updated: January 27, 2026
