#!/bin/bash

set -e  # parar si hay error

echo "📦 Building Astro project..."
npm run build

echo "🛑 Adding .nojekyll to prevent GitHub Pages processing..."
touch docs/.nojekyll

echo "✅ Deployment folder prepared."
echo "👉 Now commit and push:"
echo "    git add ."
echo "    git commit -m \"Deploy\""
echo "    git push"