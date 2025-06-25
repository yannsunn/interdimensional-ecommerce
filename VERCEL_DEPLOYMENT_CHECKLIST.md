# Vercelデプロイメント完全チェックリスト

## ✅ ビルド成功確認
- [x] `npm run build` がローカルで成功
- [x] TypeScriptエラーなし
- [x] 静的ページの生成成功
- [x] 動的ルートの設定確認

## 📋 必須環境変数
Vercelのプロジェクト設定で以下の環境変数を設定してください：

### 1. データベース設定
```
DATABASE_URL = "your-postgresql-connection-string"
```
- Vercel Postgresを使用する場合は自動設定可能
- Supabase、Neon、その他のPostgreSQLプロバイダーも利用可能

### 2. NextAuth設定
```
NEXTAUTH_URL = "https://your-domain.vercel.app"
NEXTAUTH_SECRET = "your-generated-secret"
```
- `NEXTAUTH_SECRET`は以下のコマンドで生成：
  ```bash
  openssl rand -base64 32
  ```

### 3. Stripe設定
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_..."
STRIPE_SECRET_KEY = "sk_test_..."
STRIPE_WEBHOOK_SECRET = "whsec_..."
```
- Stripeダッシュボードから取得
- Webhook Secretは、Vercelデプロイ後にWebhookエンドポイントを設定してから取得

## 🚀 デプロイ手順

### 1. GitHubリポジトリの準備
```bash
git init
git add .
git commit -m "Initial commit for Vercel deployment"
git branch -M main
git remote add origin https://github.com/yourusername/interdimensional-shop.git
git push -u origin main
```

### 2. Vercelでのプロジェクト作成
1. [Vercel](https://vercel.com)にログイン
2. "New Project"をクリック
3. GitHubリポジトリを選択
4. 以下の設定を確認：
   - Framework Preset: `Next.js`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

### 3. 環境変数の設定
1. プロジェクト設定 → Environment Variables
2. 上記の必須環境変数をすべて追加
3. Production、Preview、Developmentで使用する環境を選択

### 4. データベースの準備
1. Vercel Postgresを使用する場合：
   - Storageタブから新規作成
   - 自動的に環境変数が設定される

2. 外部データベースを使用する場合：
   - DATABASE_URLを手動で設定
   - SSLが必要な場合は`?sslmode=require`を追加

### 5. Prismaスキーマの適用
デプロイ後、以下を実行：
```bash
# Vercel CLIを使用
vercel env pull .env.local
npx prisma db push
npx prisma db seed
```

## 🔍 デプロイ後の確認事項

### 1. 基本機能の確認
- [ ] ホームページが正常に表示される
- [ ] 商品一覧ページが表示される
- [ ] 商品詳細ページが表示される
- [ ] ユーザー登録が可能
- [ ] ログイン/ログアウトが正常に動作
- [ ] カート機能が動作する

### 2. Stripe統合の確認
- [ ] Webhook URLを設定（`https://your-domain.vercel.app/api/webhook/stripe`）
- [ ] テストモードで決済が完了する
- [ ] 注文完了ページが表示される

### 3. 管理画面の確認
- [ ] `/admin`にアクセスできる（管理者権限必要）
- [ ] ダッシュボードの統計が表示される
- [ ] 商品管理機能が動作する

## ⚠️ トラブルシューティング

### ビルドエラーが発生する場合
1. Node.jsバージョンを確認（package.jsonで20.xを指定済み）
2. 依存関係のキャッシュをクリア
3. `vercel.json`の設定を確認

### データベース接続エラー
1. DATABASE_URLが正しく設定されているか確認
2. SSL設定が必要か確認
3. Prismaクライアントの生成を確認

### 500エラーが発生する場合
1. Vercelのログを確認
2. 環境変数がすべて設定されているか確認
3. APIルートのエラーハンドリングを確認

## 📊 パフォーマンス最適化

### 1. 画像の最適化
- Next.js Image Componentを使用済み
- 適切なサイズとフォーマットで配信

### 2. キャッシュ設定
- 静的アセットは自動的にキャッシュ
- APIレスポンスは必要に応じてキャッシュヘッダーを設定

### 3. Edge Functions
- 必要に応じてEdge Runtimeを使用可能
- 現在はNode.js Runtimeを使用

## 🔐 セキュリティチェック

- [x] HTTPS自動設定
- [x] 環境変数の安全な管理
- [x] CSRFトークン（NextAuth内蔵）
- [x] SQLインジェクション対策（Prisma使用）
- [x] XSS対策（React自動エスケープ）
- [x] セキュリティヘッダー設定済み

## 📝 最終チェック

1. **必須タスク**
   - [ ] すべての環境変数を設定
   - [ ] データベースを接続
   - [ ] Prismaスキーマを適用
   - [ ] 初期データをシード（必要に応じて）

2. **推奨タスク**
   - [ ] カスタムドメインを設定
   - [ ] Google Analyticsを設定
   - [ ] エラー監視ツールを設定
   - [ ] バックアップ戦略を確立

## 🎉 デプロイ完了後

1. プロダクション環境でのテスト実施
2. Stripeを本番モードに切り替え（準備ができたら）
3. SEO設定の最適化
4. パフォーマンスモニタリングの設定

これですべての準備が整いました！Vercelへのデプロイを開始してください。