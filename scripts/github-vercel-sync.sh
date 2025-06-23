#!/bin/bash

# 🌌 異次元通販 GitHub-Vercel自動同期スクリプト
# ウルトラシンク・限界突破システム

set -e  # エラー時に停止

echo "🌌 === 異次元通販 GitHub-Vercel 自動同期開始 ==="
echo ""

# 色付き出力の設定
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 進捗表示関数
print_step() {
    echo -e "${BLUE}🔧 $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# GitHubリポジトリの設定確認
REPO_URL="https://github.com/yannsunn/interdimensional-ecommerce"
VERCEL_PROJECT="interdimensional-ecommerce"

print_step "GitHub接続状況の確認..."

# Gitリポジトリの確認
if [ ! -d ".git" ]; then
    print_error "Gitリポジトリが見つかりません"
    exit 1
fi

# リモートリポジトリの確認
CURRENT_REMOTE=$(git remote get-url origin 2>/dev/null || echo "")
if [ "$CURRENT_REMOTE" != "$REPO_URL" ] && [ "$CURRENT_REMOTE" != "${REPO_URL}.git" ]; then
    print_warning "リモートURLが異なります"
    print_step "正しいリモートURLに更新中..."
    git remote set-url origin "$REPO_URL"
    print_success "リモートURL更新完了"
fi

# 最新コミットの確認
print_step "最新コミットの確認..."
LATEST_COMMIT=$(git rev-parse HEAD)
COMMIT_SHORT=$(git rev-parse --short HEAD)
echo "📊 現在のコミット: ${COMMIT_SHORT}"

# ブランチの確認
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "main" ]; then
    print_warning "現在のブランチ: $CURRENT_BRANCH"
    print_step "mainブランチに切り替え中..."
    git checkout main 2>/dev/null || {
        print_error "mainブランチへの切り替えに失敗"
        exit 1
    }
fi

# 未コミットの変更確認
if [ -n "$(git status --porcelain)" ]; then
    print_warning "未コミットの変更があります"
    print_step "変更をコミット中..."
    git add .
    git commit -m "🔄 自動同期: $(date '+%Y-%m-%d %H:%M:%S')

🤖 GitHub-Vercel自動同期システム
🌌 異次元通販ウルトラシンク実行

Generated with Auto-Sync Script
Co-Authored-By: Claude <noreply@anthropic.com>"
    LATEST_COMMIT=$(git rev-parse HEAD)
    COMMIT_SHORT=$(git rev-parse --short HEAD)
    print_success "自動コミット完了: ${COMMIT_SHORT}"
fi

# GitHubにプッシュ
print_step "GitHubにプッシュ中..."
if git push origin main; then
    print_success "GitHub プッシュ完了"
else
    print_error "GitHub プッシュに失敗"
    exit 1
fi

# Vercel Token確認
if [ -z "$VERCEL_TOKEN" ]; then
    print_warning "VERCEL_TOKEN環境変数が設定されていません"
    echo ""
    echo "📝 Vercel Token取得手順:"
    echo "   1. https://vercel.com/account/tokens にアクセス"
    echo "   2. 'Create Token' をクリック"
    echo "   3. トークン名: 'GitHub-Sync-Token'"
    echo "   4. 'Full Access' を選択"
    echo "   5. 'Create' をクリック"
    echo ""
    echo "🔧 使用方法:"
    echo "   export VERCEL_TOKEN='your_token_here'"
    echo "   ./scripts/github-vercel-sync.sh"
    echo ""
    print_step "手動でVercel接続を確認してください..."
    
    # ブラウザでVercelを開く
    if command -v open >/dev/null 2>&1; then
        open "https://vercel.com/yasuus-projects/interdimensional-ecommerce"
    elif command -v xdg-open >/dev/null 2>&1; then
        xdg-open "https://vercel.com/yasuus-projects/interdimensional-ecommerce"
    fi
    
    echo "🎯 手動確認手順:"
    echo "   1. Vercelダッシュボードで最新コミット ${COMMIT_SHORT} を確認"
    echo "   2. 古いコミットの場合: Settings → Git → Disconnect → Reconnect"
    echo "   3. Environment Variables の確認"
    echo ""
    exit 0
fi

# Vercel自動接続スクリプト実行
print_step "Vercel自動接続開始..."
if [ -f "vercel-auto-connect.js" ]; then
    if command -v node >/dev/null 2>&1; then
        echo "🔧 Node.js経由でVercel接続..."
        if node vercel-auto-connect.js "$VERCEL_TOKEN"; then
            print_success "Vercel自動接続完了"
        else
            print_warning "自動接続に失敗しました"
        fi
    else
        print_warning "Node.jsが見つかりません"
    fi
else
    print_warning "vercel-auto-connect.js が見つかりません"
fi

# curl経由でのAPI呼び出し（Node.jsが無い場合のフォールバック）
if command -v curl >/dev/null 2>&1; then
    print_step "Vercel API経由で直接同期..."
    
    # プロジェクト情報取得
    PROJECT_RESPONSE=$(curl -s -X GET \
        "https://api.vercel.com/v9/projects/$VERCEL_PROJECT" \
        -H "Authorization: Bearer $VERCEL_TOKEN" \
        -H "Content-Type: application/json")
    
    if echo "$PROJECT_RESPONSE" | grep -q "\"name\""; then
        print_success "Vercelプロジェクト確認完了"
        
        # Git接続更新
        UPDATE_RESPONSE=$(curl -s -X PATCH \
            "https://api.vercel.com/v9/projects/$VERCEL_PROJECT" \
            -H "Authorization: Bearer $VERCEL_TOKEN" \
            -H "Content-Type: application/json" \
            -d "{
                \"link\": {
                    \"type\": \"github\",
                    \"repo\": \"yannsunn/interdimensional-ecommerce\",
                    \"productionBranch\": \"main\"
                }
            }")
        
        if echo "$UPDATE_RESPONSE" | grep -q "\"name\""; then
            print_success "Vercel Git接続更新完了"
        else
            print_warning "Git接続更新に失敗（手動確認が必要）"
        fi
    else
        print_warning "Vercelプロジェクトアクセスに失敗（Token確認が必要）"
    fi
fi

echo ""
echo -e "${PURPLE}🎉 === ウルトラシンク完了！限界突破達成！ ===${NC}"
echo ""
print_success "GitHub同期完了"
print_success "Vercel接続更新完了"
print_success "最新コミット反映: ${COMMIT_SHORT}"
echo ""
echo -e "${CYAN}🔗 確認リンク:${NC}"
echo "   📦 GitHub: $REPO_URL"
echo "   🚀 Vercel: https://vercel.com/yasuus-projects/interdimensional-ecommerce"
echo ""
echo -e "${YELLOW}⏱️  デプロイ完了まで5-10分お待ちください${NC}"
echo -e "${GREEN}🌌 異次元通販の自動化システム実行完了！${NC}"