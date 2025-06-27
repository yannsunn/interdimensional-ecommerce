# Vercel環境変数設定ガイド 🚀

## 必須環境変数

Vercelプロジェクトの設定画面で以下の環境変数を設定してください：

### 1. NextAuth関連
```
NEXTAUTH_URL=https://interdimensional-ecommerce.vercel.app
NEXTAUTH_SECRET=（32文字以上のランダムな文字列）
```

**NEXTAUTH_SECRETの生成方法:**
```bash
openssl rand -base64 32
```

### 2. データベース関連
```
DATABASE_URL=（PostgreSQLの接続文字列）
POSTGRES_PRISMA_URL=（PrismaのPostgreSQL接続文字列）
POSTGRES_URL_NO_SSL=（SSL無しのPostgreSQL接続文字列）
POSTGRES_URL_NON_POOLING=（非プーリング接続文字列）
```

### 3. 決済関連（Stripe）
```
STRIPE_PUBLISHABLE_KEY=pk_test_...（Stripeの公開可能キー）
STRIPE_SECRET_KEY=sk_test_...（Stripeのシークレットキー）
STRIPE_WEBHOOK_SECRET=whsec_...（StripeのWebhookシークレット）
```

### 4. その他の必須設定
```
NODE_ENV=production
```

## Vercelでの設定手順

1. Vercelダッシュボードにログイン
2. プロジェクトを選択
3. Settings → Environment Variables
4. 各変数を追加（Production、Preview、Developmentすべてにチェック）
5. Save

## データベースの設定

### Vercel Postgresを使用する場合：
1. Vercel → Storage → Create Database
2. Postgresを選択
3. 作成後、自動的に環境変数が設定される

### 外部データベースを使用する場合：
1. Supabase、Neon、Railway等でPostgreSQLを作成
2. 接続文字列をコピー
3. DATABASE_URL環境変数に設定

## ビルドコマンド

`package.json`に定義済み：
```json
"vercel-build": "prisma generate && prisma db push && next build"
```

## トラブルシューティング

### CSS 404エラー
- ビルドログを確認
- `_next/static/css`ディレクトリが生成されているか確認

### NextAuth 500エラー
- NEXTAUTH_URLが正しく設定されているか確認
- NEXTAUTH_SECRETが設定されているか確認
- データベース接続が正常か確認

### ファビコン404エラー
- `/public/favicon.ico`が存在するか確認
- ビルドに含まれているか確認

## 確認事項

1. **環境変数の確認**
   ```bash
   vercel env pull
   ```

2. **ビルドログの確認**
   - Vercelダッシュボード → Functions → Logs

3. **デプロイメントの確認**
   - ビルドが成功しているか
   - エラーログがないか

## サポート

問題が解決しない場合：
1. Vercelのビルドログを確認
2. ブラウザの開発者ツールでネットワークエラーを確認
3. GitHub Issuesで報告