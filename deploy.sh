#!/bin/bash
set -e

echo "Installing Node Modules..."
npm install

echo "Building Astro project..."
npm run build

echo "Adding .nojekyll..."
touch docs/.nojekyll

echo "Done. Now commit and push:"
echo "  git add ."
echo "  git commit -m \"Deploy\""
echo "  git push"
