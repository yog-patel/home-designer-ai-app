#!/bin/bash

# Quick setup script for Home AI mobile installation

echo "🚀 Home AI Mobile Setup"
echo "======================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
  echo "❌ Error: package.json not found. Please run this from the project root."
  exit 1
fi

echo "✅ Project directory verified"
echo ""

# Check if public directory exists
if [ ! -d "public" ]; then
  mkdir public
  echo "✅ Created public directory"
fi

# Check for manifest.json
if [ -f "public/manifest.json" ]; then
  echo "✅ manifest.json already exists"
else
  echo "⚠️  manifest.json not found. Please create it manually or run: npm run setup-pwa"
fi

echo ""
echo "📋 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Create app icons (192x192 and 512x512 PNG files)"
echo "2. Place them in the public/ folder:"
echo "   - icon-192x192.png"
echo "   - icon-512x512.png"
echo "3. Deploy to HTTPS domain (for PWA)"
echo "4. Run: npm run build && npx cap sync"
echo ""
echo "For PWA testing:"
echo "  npm run dev"
echo "  Then open in browser and add to home screen"
echo ""
echo "For native app building:"
echo "  npm run build"
echo "  npx cap open ios  (requires macOS)"
echo "  npx cap open android"
echo ""
