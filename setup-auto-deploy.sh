#!/bin/bash

# 🚀 異次元通販 自動デプロイ設定スクリプト
# GitHub Actions + Vercel 完全自動化

echo "🌌 === 異次元通販 自動デプロイ設定開始 ==="
echo ""

# 色付き出力
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Vercel CLI インストール確認
if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}📦 Vercel CLI をインストールしています...${NC}"
    npm install -g vercel
fi

# プロジェクト情報取得
echo -e "${BLUE}🔍 Vercel プロジェクト情報を取得中...${NC}"

# Vercel ログイン
echo -e "${YELLOW}⚡ Vercelにログインしてください:${NC}"
vercel login

# プロジェクトリンク
echo -e "${BLUE}🔗 プロジェクトをリンク中...${NC}"
vercel link

# プロジェクトID取得
echo -e "${BLUE}📊 プロジェクト設定を取得中...${NC}"
VERCEL_ORG_ID=$(vercel env ls | grep VERCEL_ORG_ID | awk '{print $2}' || echo "")
VERCEL_PROJECT_ID=$(vercel env ls | grep VERCEL_PROJECT_ID | awk '{print $2}' || echo "")

if [ -z "$VERCEL_ORG_ID" ] || [ -z "$VERCEL_PROJECT_ID" ]; then
    # .vercel/project.json から取得
    if [ -f ".vercel/project.json" ]; then
        VERCEL_ORG_ID=$(cat .vercel/project.json | grep orgId | cut -d'"' -f4)
        VERCEL_PROJECT_ID=$(cat .vercel/project.json | grep projectId | cut -d'"' -f4)
    fi
fi

# Deploy Hook 作成
echo -e "${BLUE}🪝 Deploy Hook を作成中...${NC}"
echo ""
echo -e "${YELLOW}📝 以下の手順を実行してください:${NC}"
echo "1. https://vercel.com/yasuus-projects/interdimensional-ecommerce/settings/git"
echo "2. 'Deploy Hooks' セクションを探す"
echo "3. 'Create Hook' をクリック"
echo "4. Name: 'github-auto-deploy'"
echo "5. Branch: 'main'"
echo "6. 作成されたURLをコピー"
echo ""
read -p "Deploy Hook URL を入力してください: " DEPLOY_HOOK

# GitHub Secrets 設定表示
echo ""
echo -e "${GREEN}✅ === GitHub Secrets 設定値 ===${NC}"
echo ""
echo "以下の値を GitHub リポジトリの Secrets に追加してください:"
echo ""
echo "🔗 https://github.com/yannsunn/interdimensional-ecommerce/settings/secrets/actions/new"
echo ""
echo -e "${BLUE}VERCEL_TOKEN:${NC}"
echo "  https://vercel.com/account/tokens で作成"
echo ""
echo -e "${BLUE}VERCEL_ORG_ID:${NC}"
echo "  $VERCEL_ORG_ID"
echo ""
echo -e "${BLUE}VERCEL_PROJECT_ID:${NC}"
echo "  $VERCEL_PROJECT_ID"
echo ""
echo -e "${BLUE}VERCEL_DEPLOY_HOOK:${NC}"
echo "  $DEPLOY_HOOK"
echo ""

# 設定ファイル作成
cat > .github/auto-deploy-config.txt << EOL
# 異次元通販 自動デプロイ設定
VERCEL_ORG_ID=$VERCEL_ORG_ID
VERCEL_PROJECT_ID=$VERCEL_PROJECT_ID
VERCEL_DEPLOY_HOOK=$DEPLOY_HOOK
# この値を GitHub Secrets に設定してください
EOL

echo -e "${GREEN}✅ 設定ファイルを作成しました: .github/auto-deploy-config.txt${NC}"
echo ""

# 最終確認
echo -e "${YELLOW}🎯 === 設定完了後の動作 ===${NC}"
echo "1. GitHub に push すると自動的に Vercel にデプロイ"
echo "2. 30分ごとに自動同期チェック"
echo "3. 手動トリガーも可能"
echo ""
echo -e "${GREEN}🌌 異次元通販の完全自動化設定が完了しました！${NC}"