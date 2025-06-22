#!/bin/bash

echo "🌌 異次元通販セットアップスクリプト 🌌"
echo "==============================================="

# カラー定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# エラーハンドリング
set -e

error_exit() {
    echo -e "${RED}❌ エラー: $1${NC}" >&2
    exit 1
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# 前提条件チェック
check_prerequisites() {
    info "前提条件をチェック中..."
    
    # Node.js チェック
    if ! command -v node &> /dev/null; then
        error_exit "Node.js がインストールされていません。https://nodejs.org/ からインストールしてください。"
    fi
    
    local node_version=$(node -v | sed 's/v//')
    local required_version="18.0.0"
    
    if [ "$(printf '%s\n' "$required_version" "$node_version" | sort -V | head -n1)" != "$required_version" ]; then
        error_exit "Node.js バージョン $required_version 以上が必要です。現在のバージョン: $node_version"
    fi
    
    # npm チェック
    if ! command -v npm &> /dev/null; then
        error_exit "npm がインストールされていません。"
    fi
    
    success "前提条件クリア！"
}

# 依存関係インストール
install_dependencies() {
    info "依存関係をインストール中..."
    
    if [ -f "package-lock.json" ]; then
        npm ci
    else
        npm install
    fi
    
    success "依存関係のインストール完了！"
}

# 環境変数設定
setup_env() {
    info "環境変数を設定中..."
    
    if [ ! -f ".env.local" ]; then
        if [ -f ".env.local.example" ]; then
            cp .env.local.example .env.local
            warning "環境変数ファイルを作成しました。.env.local を編集して必要な値を設定してください。"
            echo
            echo -e "${CYAN}必要な環境変数:${NC}"
            echo "  - DATABASE_URL: PostgreSQL接続URL"
            echo "  - NEXTAUTH_SECRET: ランダムな秘密キー"
            echo "  - STRIPE_PUBLIC_KEY & STRIPE_SECRET_KEY: Stripeキー（オプション）"
            echo
        else
            error_exit ".env.local.example ファイルが見つかりません。"
        fi
    else
        info ".env.local ファイルが既に存在します。"
    fi
}

# データベースセットアップ
setup_database() {
    info "データベースをセットアップ中..."
    
    # .env.local から DATABASE_URL を確認
    if [ -f ".env.local" ]; then
        if grep -q "DATABASE_URL=" .env.local; then
            local db_url=$(grep "DATABASE_URL=" .env.local | cut -d '=' -f2 | tr -d '"')
            if [ -z "$db_url" ] || [ "$db_url" = "postgresql://user:password@localhost:5432/interdimensional_shop" ]; then
                warning "DATABASE_URL が設定されていません。PostgreSQLデータベースのURLを .env.local に設定してください。"
                return
            fi
        else
            warning "DATABASE_URL が .env.local に見つかりません。"
            return
        fi
    fi
    
    # Prisma クライアント生成
    info "Prisma クライアントを生成中..."
    npm run prisma:generate
    
    # マイグレーション実行
    info "データベースマイグレーションを実行中..."
    npm run prisma:migrate
    
    # シードデータ投入
    info "シードデータを投入中..."
    npm run prisma:seed
    
    success "データベースセットアップ完了！"
}

# 開発サーバー起動オプション
start_dev_server() {
    echo
    echo -e "${PURPLE}🚀 セットアップ完了！${NC}"
    echo
    echo -e "${CYAN}開発サーバーを起動しますか？ (y/n):${NC}"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        info "開発サーバーを起動中..."
        npm run dev
    else
        echo
        echo -e "${GREEN}後で開発サーバーを起動するには:${NC}"
        echo "  npm run dev"
        echo
        echo -e "${GREEN}ブラウザで以下のURLにアクセス:${NC}"
        echo "  http://localhost:3000"
    fi
}

# メイン処理
main() {
    echo -e "${PURPLE}"
    cat << 'EOF'
    ✨ 宇宙と古代の叡智があなたの開発環境を変える！ ✨
    
     ◯    ◯         異次元通販
    ◯ ◯  ◯ ◯       セットアップ開始
     ◯    ◯    
    
EOF
    echo -e "${NC}"
    
    check_prerequisites
    install_dependencies
    setup_env
    
    echo
    echo -e "${CYAN}データベースをセットアップしますか？ (y/n):${NC}"
    echo -e "${YELLOW}注意: PostgreSQLデータベースが必要です。${NC}"
    read -r db_response
    
    if [[ "$db_response" =~ ^[Yy]$ ]]; then
        setup_database
    else
        warning "データベースセットアップをスキップしました。"
        echo "  後でセットアップするには:"
        echo "    npm run prisma:generate"
        echo "    npm run prisma:migrate"
        echo "    npm run prisma:seed"
    fi
    
    start_dev_server
}

# スクリプト実行
main "$@"