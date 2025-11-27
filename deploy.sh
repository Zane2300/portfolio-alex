#!/bin/bash

set -e  # stop if error

# Auto-fix CRLF if someone edited this file in Windows
dos2unix "$0" 2>/dev/null

echo "📦 Installing Node Modules..."
npm install

echo "📦 Building Astro project..."
npm run build

echo "🛑 Adding .nojekyll to prevent GitHub Pages processing..."
touch docs/.nojekyll

echo "✅ Deployment folder prepared."
echo "👉 Now commit and push:"
echo "    git add ."
echo "    git commit -m \"Deploy\""
echo "    git push"