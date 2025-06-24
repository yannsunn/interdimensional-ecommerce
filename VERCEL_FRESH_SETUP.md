# 🚀 Vercel完全新規セットアップ手順

## 現状
- 既存のVercelプロジェクトが削除またはアクセス不可
- 新しくセットアップが必要

## ステップ1: Vercelアカウント確認
1. https://vercel.com/dashboard にアクセス
2. GitHubでログイン
3. プロジェクト一覧を確認
   - `interdimensional-ecommerce` が存在しない場合 → 削除されている
   - 存在する場合 → アクセス権限の問題

## ステップ2: 新規プロジェクト作成

### 方法A: Vercelダッシュボードから（推奨）
1. https://vercel.com/new にアクセス
2. "Import Git Repository" を選択
3. GitHub連携を許可
4. `yannsunn/interdimensional-ecommerce` を選択
5. 設定:
   - Project Name: `interdimensional-ecommerce`
   - Framework: `Next.js`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. 環境変数を設定:
   ```
   DATABASE_URL=your_postgres_connection_string
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=your_random_secret
   STRIPE_PUBLISHABLE_KEY=pk_...
   STRIPE_SECRET_KEY=sk_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```
7. "Deploy" をクリック

### 方法B: Vercel CLIから
```bash
# 新しいプロジェクトとして初期化
vercel

# 質問に答える:
# ? Set up and deploy "~\異次元通販"? → Yes
# ? Which scope should contain your project? → AwakeInc (または適切なスコープ)
# ? Link to existing project? → No
# ? What's your project's name? → interdimensional-ecommerce
# ? In which directory is your code located? → ./

# 環境変数を設定
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel env add STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET

# プロダクションデプロイ
vercel --prod
```

## ステップ3: ドメイン設定（必要に応じて）
1. Vercelダッシュボード → プロジェクト → "Domains"
2. カスタムドメインを追加（必要な場合）

## ステップ4: GitHub Actions設定
既存の `.github/workflows/vercel-deploy.yml` を使用するため:
1. GitHubリポジトリ → Settings → Secrets and variables → Actions
2. 以下のシークレットを追加:
   - `VERCEL_TOKEN`: Vercelのトークン
   - `VERCEL_ORG_ID`: VercelのOrganization ID
   - `VERCEL_PROJECT_ID`: VercelのProject ID

## 期待される結果
- 新しいVercelプロジェクトが作成される
- 最新のコミットでビルドが実行される
- `generateStaticParams` エラーが解消される
- 成功したデプロイメント

## トラブルシューティング
- "Your Project was either deleted" エラー → 方法Aを使用
- ビルドエラー → 環境変数の設定を確認
- 権限エラー → GitHubの連携を再設定