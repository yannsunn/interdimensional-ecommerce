#!/bin/bash

echo "🧹 Vercel完全クリーンアップスクリプト"
echo "===================================="
echo ""

echo "⚠️  警告: このスクリプトは根本的なクリーンアップを実行します"
echo ""

echo "現在の状況:"
echo "- 40個以上の失敗したデプロイメント"
echo "- すべて同じgenerateStaticParamsエラー"
echo "- Vercelが古いコードに固執"
echo ""

echo "推奨される削除対象:"
echo "✅ すべての'Error'ステータスのデプロイメント"
echo "✅ 過去24時間のすべての失敗デプロイ"
echo "✅ 特にコミット 1ea2317 関連"
echo ""

echo "選択肢:"
echo "1) Vercel CLIで強制クリーンデプロイ"
echo "2) 手動クリーンアップガイドを表示"
echo "3) プロジェクト再作成の手順を表示"
echo "4) 終了"
echo ""

read -p "選択してください (1-4): " choice

case $choice in
    1)
        echo "🚀 Vercel CLIで強制クリーンデプロイを実行..."
        
        if ! command -v vercel &> /dev/null; then
            echo "⚠️ Vercel CLI not found. Installing..."
            npm i -g vercel
        fi
        
        echo "📦 完全にクリーンな環境でデプロイ..."
        
        # 複数の環境変数でキャッシュを無効化
        vercel --prod --force \
            --build-env CLEAN_DEPLOY=true \
            --build-env FORCE_REBUILD="$(date +%s)" \
            --build-env VERCEL_ENV=production \
            --build-env NODE_ENV=production \
            --build-env NEXT_TELEMETRY_DISABLED=1
        
        echo "✅ クリーンデプロイ完了!"
        ;;
        
    2)
        echo "📋 手動クリーンアップ手順:"
        echo ""
        echo "1. https://vercel.com/dashboard → プロジェクト選択"
        echo "2. 'Deployments' タブを開く"
        echo "3. 以下を削除（...メニュー → Delete）:"
        echo "   - すべての 'Error' ステータス"
        echo "   - JCqrkAzAq (24h ago) から最新まで"
        echo "   - 特にコミット 1ea2317 関連"
        echo "4. 最新2-3個のみ残す（それらも失敗なら削除）"
        echo "5. 'Create Deployment' で最新コミットから手動デプロイ"
        ;;
        
    3)
        echo "🔄 プロジェクト完全再作成手順:"
        echo ""
        echo "1. Vercelプロジェクト設定 → Advanced → Delete Project"
        echo "2. プロジェクト名入力して削除確認"
        echo "3. 新規プロジェクト作成:"
        echo "   - Import Git Repository"
        echo "   - yannsunn/interdimensional-ecommerce を選択"
        echo "   - Framework: Next.js"
        echo "   - Build Command: npm run build"
        echo "   - Output Directory: .next"
        echo "4. 環境変数を再設定"
        echo "5. ドメイン設定を更新"
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
echo "📍 最新のコミット: $(git rev-parse HEAD)"
echo "📍 期待されるデプロイ: このコミットまたはそれ以降"
echo ""
echo "🔍 確認:"
echo "1. Vercelダッシュボードで新しいデプロイメントを確認"
echo "2. 古いコミット(1ea2317)ではなく最新コミットが使用されることを確認"
echo "3. generateStaticParamsエラーが解消されることを確認"