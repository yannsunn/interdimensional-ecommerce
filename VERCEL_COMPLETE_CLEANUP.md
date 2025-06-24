# 🚨 Vercel完全クリーンアップ手順

## 現状分析
- 過去40個以上のデプロイメントがすべて失敗
- 同じ`generateStaticParams`エラーが継続
- Vercelが古いコードまたはキャッシュに固執

## 即座に削除すべきもの

### 1. Vercelダッシュボードで削除
**すべての失敗したデプロイメントを削除:**
1. https://vercel.com/dashboard → プロジェクト選択
2. "Deployments" タブ
3. **全ての "Error" ステータスのデプロイメントを削除**
   - 特に古いもの（1日前〜）を優先
   - 最新3個程度を残して、他はすべて削除

### 2. プロジェクト完全削除・再作成（推奨）
**最も確実な方法:**
1. Vercelプロジェクト設定 → "Advanced" → "Delete Project"
2. プロジェクト名を入力して削除確認
3. 新規プロジェクト作成:
   - "Import Git Repository"
   - `yannsunn/interdimensional-ecommerce` を選択
   - Framework: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. 環境変数の再設定
新しいプロジェクトで環境変数を設定:
```
DATABASE_URL=your_postgres_url
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

## 自動実行スクリプト

下記のコマンドで自動クリーンアップを実行できます:
```bash
# Vercel CLIで強制的に新規デプロイ
vercel --prod --force --build-env CLEAN_DEPLOY=true

# または完全に新しい環境として
vercel --prod --force --build-env VERCEL_ENV=production --build-env NODE_ENV=production
```

## 削除対象（手動の場合）

### 確実に削除すべき失敗デプロイメント:
- `JCqrkAzAq` (24h ago) - 最初の問題のあるデプロイ
- `9MNDjNM6p` から `1ea2317` まで - 全ての失敗デプロイ
- 過去24時間のすべての "Error" ステータス

### 保持するもの:
- 最新の2-3個のみ（それらも失敗なら削除）

## 期待される結果
1. クリーンな状態でのデプロイ開始
2. 最新のコミット `e46acc2` の使用
3. `generateStaticParams` エラーの解消
4. 成功デプロイメント

## 緊急時の最終手段
すべて失敗した場合:
1. Vercelプロジェクトを完全削除
2. 新しいVercelプロジェクトを作成
3. GitHubから改めてインポート
4. ドメインとDNS設定を更新