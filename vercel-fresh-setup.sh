#!/bin/bash

echo "🚀 Vercel新規セットアップスクリプト"
echo "================================"
echo ""

echo "現状: 既存のVercelプロジェクトが削除またはアクセス不可"
echo ""

# 古い設定ファイルをクリーンアップ
echo "🧹 古いVercel設定をクリーンアップ中..."
rm -rf .vercel
rm -f .vercel.json

echo "✅ クリーンアップ完了"
echo ""

echo "セットアップ方法を選択:"
echo "1) Vercel CLIで新規セットアップ"
echo "2) Vercelダッシュボード手順を表示（推奨）"
echo "3) 環境変数リストを表示"
echo "4) 終了"
echo ""

read -p "選択してください (1-4): " choice

case $choice in
    1)
        echo "🔧 Vercel CLIで新規セットアップを開始..."
        echo ""
        echo "⚠️ 注意: 以下の質問に答えてください:"
        echo "- Set up and deploy? → Yes"
        echo "- Which scope? → AwakeInc（または適切なスコープ）"
        echo "- Link to existing project? → No"
        echo "- Project name? → interdimensional-ecommerce"
        echo "- Code directory? → ./"
        echo ""
        
        vercel
        
        echo ""
        echo "✅ セットアップ完了!"
        echo "次に環境変数を設定してください:"
        echo "vercel env add DATABASE_URL"
        echo "vercel env add NEXTAUTH_URL"
        echo "vercel env add NEXTAUTH_SECRET"
        echo "など..."
        ;;
        
    2)
        echo "📋 Vercelダッシュボード手順:"
        echo ""
        echo "1. https://vercel.com/new をブラウザで開く"
        echo "2. 'Import Git Repository' を選択"
        echo "3. GitHub連携を許可"
        echo "4. 'yannsunn/interdimensional-ecommerce' を選択"
        echo "5. 設定:"
        echo "   - Project Name: interdimensional-ecommerce"
        echo "   - Framework: Next.js"
        echo "   - Root Directory: ./"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: .next"
        echo "6. 環境変数を設定（下記リスト参照）"
        echo "7. 'Deploy' をクリック"
        echo ""
        echo "詳細は VERCEL_FRESH_SETUP.md を参照してください。"
        ;;
        
    3)
        echo "📝 設定すべき環境変数:"
        echo ""
        echo "DATABASE_URL=postgresql://username:password@host:port/database"
        echo "NEXTAUTH_URL=https://your-project.vercel.app"
        echo "NEXTAUTH_SECRET=your-random-secret-key"
        echo "STRIPE_PUBLISHABLE_KEY=pk_..."
        echo "STRIPE_SECRET_KEY=sk_..."
        echo "STRIPE_WEBHOOK_SECRET=whsec_..."
        echo ""
        echo "🔒 注意: 実際の値は安全に管理してください"
        ;;
        
    4)
        echo "👋 終了します"
        exit 0
        ;;
        
    *)
        echo "❌ 無効な選択"
        exit 1
        ;;
esac

echo ""
echo "🎯 次のステップ:"
echo "1. 新しいVercelプロジェクトの作成"
echo "2. 環境変数の設定"
echo "3. 最新コミットでのデプロイ確認"
echo "4. 成功したデプロイメントの確認"
echo ""
echo "📍 最新コミット: $(git rev-parse HEAD)"