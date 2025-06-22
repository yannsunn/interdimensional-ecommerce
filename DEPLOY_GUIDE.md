# 🚀 異次元通販デプロイガイド

## 🌐 **GitHub + Vercel完全デプロイ手順**

### **ステップ1: GitHubリポジトリ作成**

1. **GitHub.comでリポジトリ作成**
   - リポジトリ名: `interdimensional-ecommerce`
   - 説明: `🌌 異次元通販 - 宇宙と古代の叡智があなたの運命を変える本格ECサイト`
   - Public設定

2. **ローカルとGitHub接続**
```bash
# リモートリポジトリ追加（YOUR_USERNAMEを実際のユーザー名に変更）
git remote add origin https://github.com/YOUR_USERNAME/interdimensional-ecommerce.git

# GitHubにプッシュ
git push -u origin main
```

---

### **ステップ2: Vercelデプロイ**

#### **1. Vercel アカウント作成**
- [vercel.com](https://vercel.com) にアクセス
- 「Sign up」→「Continue with GitHub」
- GitHubアカウントで認証

#### **2. プロジェクトインポート**
- Vercel ダッシュボードで「Add New」→「Project」
- GitHubから `interdimensional-ecommerce` を選択
- 「Import」をクリック

#### **3. ビルド設定**
```
Framework Preset: Next.js
Build Command: npm run build
Output Directory: (空欄のまま)
Install Command: npm install
Development Command: npm run dev
```

---

### **ステップ3: データベース設定**

#### **オプション1: Vercel Postgres（推奨）**
1. Vercelプロジェクトページで「Storage」タブ
2. 「Create Database」→「Postgres」
3. データベース名: `interdimensional-db`
4. 作成後、「DATABASE_URL」をコピー

#### **オプション2: 外部PostgreSQL**
- **Supabase**: [supabase.com](https://supabase.com) - 無料枠あり
- **Railway**: [railway.app](https://railway.app) - 簡単セットアップ
- **Neon**: [neon.tech](https://neon.tech) - サーバーレスPostgreSQL

---

### **ステップ4: 環境変数設定**

Vercelプロジェクト設定で以下を追加：

```env
# 必須
DATABASE_URL=postgresql://username:password@host:port/database
NEXTAUTH_SECRET=超強力な秘密キー（32文字以上推奨）
NEXTAUTH_URL=https://your-app-name.vercel.app

# Stripe（テスト環境）
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# オプション（メール送信）
EMAIL_SERVER_HOST=smtp.gmail.com
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER=your-email@gmail.com
EMAIL_SERVER_PASSWORD=app-password
EMAIL_FROM=異次元通販 <noreply@your-domain.com>
```

#### **環境変数生成ヘルパー**
```bash
# NEXTAUTH_SECRET生成
openssl rand -base64 32

# または
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

### **ステップ5: Stripe設定**

#### **1. Stripeアカウント作成**
- [stripe.com](https://stripe.com) でアカウント作成
- 日本のビジネス情報を入力

#### **2. APIキー取得**
- Stripe Dashboard → 開発者 → APIキー
- 公開可能キー（pk_test_...）をコピー
- シークレットキー（sk_test_...）をコピー

#### **3. Webhook設定**
- Stripe Dashboard → 開発者 → Webhook
- エンドポイント追加: `https://your-app.vercel.app/api/webhook/stripe`
- イベント選択:
  - `checkout.session.completed`
  - `payment_intent.succeeded`
  - `payment_intent.payment_failed`
- Webhook署名シークレットをコピー

---

### **ステップ6: データベース初期化**

デプロイ後、以下のコマンドをローカルで実行：

```bash
# 本番データベースURL設定
export DATABASE_URL="your-production-database-url"

# Prismaマイグレーション
npx prisma migrate deploy

# シードデータ投入
npx prisma db seed
```

---

### **ステップ7: カスタムドメイン設定（オプション）**

#### **1. ドメイン購入**
- お名前.com、ムームードメイン等で購入
- 推奨: `interdimensional-shop.com`

#### **2. Vercelでドメイン設定**
- プロジェクト設定 → Domains
- カスタムドメインを追加
- DNS設定を指示通りに変更

#### **3. SSL証明書**
- Vercelが自動でSSL証明書を発行
- HTTPS://your-domain.com でアクセス可能

---

### **ステップ8: 監視・メンテナンス**

#### **1. Vercel Analytics**
- プロジェクト設定でAnalyticsを有効化
- アクセス数、パフォーマンス監視

#### **2. エラー監視**
- Vercel Functionsのログを確認
- Stripe Dashboardで決済状況確認

#### **3. データベース監視**
- Prisma Studioでデータ確認
- データベース使用量チェック

---

## 🔧 **トラブルシューティング**

### **よくある問題と解決法**

#### **1. ビルドエラー**
```bash
# ローカルでビルドテスト
npm run build

# 型エラーの場合
npm run type-check
```

#### **2. データベース接続エラー**
- DATABASE_URLの形式確認
- データベースサーバーの稼働状況確認
- IP制限の確認

#### **3. Stripe Webhook エラー**
- WebhookエンドポイントURLの確認
- STRIPE_WEBHOOK_SECRETの確認
- Stripeダッシュボードでイベント履歴確認

#### **4. 環境変数が反映されない**
- Vercelで環境変数を保存後、再デプロイ実行
- 本番環境とプレビュー環境の設定確認

---

## 📊 **デプロイ後チェックリスト**

- [ ] サイトが正常表示される
- [ ] 商品一覧が表示される
- [ ] ユーザー登録・ログインが動作
- [ ] カート機能が動作
- [ ] 決済フローが動作（テストモード）
- [ ] 管理画面にアクセス可能
- [ ] 異次元エフェクトが動作
- [ ] モバイルで正常表示
- [ ] SSL証明書が有効
- [ ] 独自ドメインでアクセス可能

---

## 🌟 **パフォーマンス最適化**

### **1. 画像最適化**
```jsx
// next/image を使用
import Image from 'next/image'

<Image
  src="/product-image.jpg"
  alt="商品画像"
  width={400}
  height={400}
  placeholder="blur"
/>
```

### **2. キャッシュ設定**
```js
// next.config.js
module.exports = {
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

### **3. CDN活用**
- Vercel Edge Networkが自動適用
- 静的ファイルの高速配信

---

## 🎯 **本番運用開始**

### **1. Stripe本番モード**
- テストが完了したら本番モードに切り替え
- 本番用APIキーを環境変数に設定

### **2. 監視設定**
- UptimeRobotでサイト監視
- Google Analyticsでアクセス解析

### **3. バックアップ**
- データベースの定期バックアップ設定
- コードのGitHub保管

---

**🌌 異次元通販の宇宙デビュー準備完了！**

このガイドに従って、あなたの異次元ECサイトを世界に公開しましょう！