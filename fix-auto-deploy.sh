#!/bin/bash

echo "🔧 Vercel自動デプロイ修復スクリプト"
echo "=================================="
echo ""

# 最新のコミットハッシュを取得
LATEST_COMMIT=$(git rev-parse HEAD)
echo "📍 最新のコミット: $LATEST_COMMIT"
echo ""

echo "修復手順:"
echo "1. Vercelダッシュボードで古いデプロイメントを削除"
echo "2. GitHub統合をリセット"
echo "3. 自動デプロイをテスト"
echo ""

echo "詳細な手順は VERCEL_GITHUB_INTEGRATION_FIX.md を参照してください。"
echo ""

read -p "自動デプロイテストを実行しますか？ (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧪 自動デプロイテストを開始..."
    
    # テスト用の変更を作成
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    echo "# Auto-deploy test: $TIMESTAMP" >> AUTO_DEPLOY_TEST.md
    
    # コミットしてプッシュ
    git add AUTO_DEPLOY_TEST.md
    git commit -m "🧪 Test: Auto-deployment verification at $TIMESTAMP

This commit tests if Vercel automatically deploys from GitHub pushes.
If this appears in Vercel with commit $LATEST_COMMIT or newer, auto-deploy is working.

Expected behavior:
- New deployment should start within 30 seconds
- Should use THIS commit, not the old 1ea2317
- Build should succeed (no generateStaticParams error)
"
    
    echo "📤 プッシュ中..."
    git push origin main
    
    echo ""
    echo "✅ テストコミットをプッシュしました！"
    echo ""
    echo "🔍 確認手順:"
    echo "1. Vercelダッシュボード (https://vercel.com/dashboard) を開く"
    echo "2. 30秒以内に新しいデプロイメントが開始されるかチェック"
    echo "3. 使用されるコミットが $LATEST_COMMIT またはそれ以降であることを確認"
    echo "4. ビルドが成功することを確認"
    echo ""
    echo "もし古いコミット 1ea2317 が使われたら、Vercel統合を手動でリセットしてください。"
else
    echo "👋 テストをスキップしました。"
    echo "手動で修復を行ってください。"
fi