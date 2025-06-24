# 🌌 異次元通販 - Interdimensional E-commerce

宇宙と古代の叡智があなたの運命を変える！異次元からの商品をお届けする本格的なECサイトです。

## ✨ 特徴

- 🔮 **異次元的なデザイン**: ポータルエフェクト、グリッチテキスト、浮遊要素
- ⚡ **最新技術スタック**: Next.js 14 (App Router)、Prisma、Stripe
- 🐉 **フル機能EC**: 商品管理、カート、決済、注文管理
- 🌟 **レスポンシブ**: モバイルファーストデザイン
- 🔯 **認証システム**: NextAuth.js with credentials

## 🛠 技術スタック

- **フロントエンド**: Next.js 14, TypeScript, Tailwind CSS
- **アニメーション**: Framer Motion
- **データベース**: PostgreSQL + Prisma ORM
- **認証**: NextAuth.js
- **決済**: Stripe
- **状態管理**: Zustand
- **デプロイ**: Vercel

## 🚀 セットアップ

### 自動セットアップ（推奨）

```bash
# プロジェクトをクローン
git clone https://github.com/yourusername/interdimensional-ecommerce.git
cd interdimensional-ecommerce

# 自動セットアップスクリプト実行
./setup.sh
```

### 手動セットアップ

```bash
# 1. 依存関係インストール
npm install

# 2. 環境変数設定
cp .env.local.example .env.local
# .env.local を編集して必要な値を設定

# 3. データベースセットアップ
npm run prisma:generate
npm run prisma:migrate
npm run prisma:seed

# 4. 開発サーバー起動
npm run dev
```

### Vercelデプロイ

詳細は `VERCEL_DEPLOY.md` を参照してください。

1. GitHubリポジトリ作成
2. Vercelでプロジェクトインポート
3. 環境変数設定
4. 自動デプロイ完了

## 🔑 デフォルトアカウント

シードデータにより以下のアカウントが作成されます：

**管理者アカウント**
- Email: `admin@interdimensional.shop`
- Password: `admin123`

**テストユーザー**
- Email: `test@example.com`
- Password: `test123`

## 📦 主要機能

### 🛒 ECサイト機能
- 商品一覧・詳細表示
- カート機能
- 決済処理（Stripe）
- 注文履歴
- ユーザー認証

### 👑 管理機能
- 商品の CRUD 操作
- 注文管理
- ユーザー管理

### 🎨 特殊効果
- 異次元ポータルアニメーション
- グリッチテキストエフェクト
- 浮遊要素
- グラデーションアニメーション

## 🗂 ディレクトリ構造

```
interdimensional-shop/
├── app/                    # Next.js App Router
│   ├── api/               # API Routes
│   ├── (auth)/            # 認証関連ページ
│   ├── (shop)/            # ショップページ
│   └── admin/             # 管理画面
├── components/            # Reactコンポーネント
│   ├── ui/               # 基本UIコンポーネント
│   ├── layout/           # レイアウト関連
│   ├── effects/          # 特殊効果
│   └── shop/             # ショップ関連
├── lib/                  # ユーティリティ
├── prisma/              # データベーススキーマ
└── types/               # 型定義
```

## 📊 データベーススキーマ

主要なモデル：
- `User` - ユーザー情報
- `Product` - 商品情報（怪しさレベル、効果、証言等を含む）
- `Order` - 注文情報
- `Cart` - カート情報

## 🎯 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# Prisma Studio（データベースGUI）
npm run prisma:studio

# 型チェック
npm run type-check

# リント
npm run lint
```

## 🚀 デプロイ

### Vercelへのデプロイ

1. Vercelアカウントでリポジトリを接続
2. 環境変数を設定
3. PostgreSQLデータベース（Vercel Postgres推奨）をセットアップ
4. デプロイ

### データベースマイグレーション

```bash
# 本番環境でのマイグレーション
npx prisma migrate deploy

# シードデータの投入
npx prisma db seed
```

## 🤝 コントリビュート

1. フォークして feature ブランチを作成
2. 変更をコミット
3. プルリクエストを作成

## 📝 ライセンス

MIT License

## 🌟 今後の拡張予定

- [ ] レビュー・評価機能
- [ ] ポイントシステム
- [ ] サブスクリプション
- [ ] AR商品プレビュー
- [ ] AI占い機能
- [ ] NFT連携

---

🔮 **異次元通販で、あなたの人生を量子レベルで変革しましょう！** ✨
