#!/bin/bash

echo "🚨 VERCEL EMERGENCY DEPLOYMENT SCRIPT 🚨"
echo "======================================"
echo ""
echo "This script will force Vercel to use the latest commit."
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project directory. Please run from project root."
    exit 1
fi

echo "📍 Current directory: $(pwd)"
echo "📍 Latest commit: $(git rev-parse HEAD)"
echo ""

echo "Choose deployment method:"
echo "1) Vercel CLI (recommended - requires vercel CLI)"
echo "2) Create deployment trigger file"
echo "3) Exit"
echo ""
read -p "Enter choice (1-3): " choice

case $choice in
    1)
        echo "🚀 Using Vercel CLI for forced deployment..."
        
        # Check if vercel CLI is installed
        if ! command -v vercel &> /dev/null; then
            echo "⚠️  Vercel CLI not found. Installing..."
            npm i -g vercel
        fi
        
        echo "📦 Running forced production deployment..."
        vercel --prod --force --build-env FORCE_DEPLOY=true --build-env VERCEL_GIT_COMMIT_SHA=$(git rev-parse HEAD)
        
        echo "✅ Deployment triggered!"
        ;;
        
    2)
        echo "📝 Creating deployment trigger file..."
        
        # Create a unique trigger file
        TIMESTAMP=$(date +%s)
        echo "FORCE_DEPLOY_${TIMESTAMP}" > VERCEL_DEPLOY_TRIGGER_${TIMESTAMP}.txt
        
        # Stage and commit
        git add VERCEL_DEPLOY_TRIGGER_${TIMESTAMP}.txt
        git commit -m "🚨 FORCE VERCEL DEPLOYMENT - Timestamp: ${TIMESTAMP}

This commit forces Vercel to recognize the latest changes.
Previous commits were ignored due to stuck deployment.

Latest working commit: $(git rev-parse HEAD)
" 
        
        # Push to trigger deployment
        git push origin main
        
        echo "✅ Trigger file created and pushed!"
        echo "📍 Check Vercel dashboard for new deployment"
        ;;
        
    3)
        echo "👋 Exiting..."
        exit 0
        ;;
        
    *)
        echo "❌ Invalid choice"
        exit 1
        ;;
esac

echo ""
echo "🔍 Next steps:"
echo "1. Check Vercel dashboard at https://vercel.com/dashboard"
echo "2. Look for new deployment with latest commit"
echo "3. If still showing old commit, use manual redeploy from dashboard"
echo ""
echo "📝 Latest commit that should deploy: $(git rev-parse HEAD)"