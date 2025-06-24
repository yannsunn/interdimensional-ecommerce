# 🚨 Vercel Deployment Fix Guide

## 問題の概要
- Vercelが22時間前の失敗したデプロイメント（コミット `1ea2317`）でスタック
- 新しいコミットが無視されている
- エラー: 既に削除済みの `generateStaticParams` が原因

## 即座の解決方法

### 方法1: Vercel CLIを使用（推奨）
```bash
# Vercel CLIをインストール（未インストールの場合）
npm i -g vercel

# プロジェクトディレクトリで実行
vercel --prod --force

# または特定のコミットを指定
vercel --prod --force --build-env VERCEL_GIT_COMMIT_SHA=d9bde09
```

### 方法2: Vercelダッシュボードから
1. https://vercel.com/dashboard にアクセス
2. プロジェクトを選択
3. "Deployments" タブを開く
4. 22時間前の失敗したデプロイメントの "..." メニューから "Delete" を選択
5. 最新のコミットの横の "..." メニューから "Redeploy" を選択
6. "Use different commit" をクリックし、最新のコミットハッシュ `d9bde09` を入力
7. "Create new Deployment" をクリック

### 方法3: GitHub統合をリセット
1. Vercelのプロジェクト設定 > Git
2. "Disconnect from Git" をクリック
3. 再度GitHubリポジトリを接続
4. Production Branchが "main" に設定されていることを確認

### 方法4: APIを使用した強制デプロイ
```bash
# Vercel APIトークンが必要
curl -X POST https://api.vercel.com/v13/deployments \
  -H "Authorization: Bearer YOUR_VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "interdimensional-ecommerce",
    "gitSource": {
      "type": "github",
      "ref": "main",
      "sha": "d9bde09"
    },
    "target": "production",
    "buildCommand": "npm run build",
    "installCommand": "npm install",
    "framework": "nextjs"
  }'
```

## 確認すべきポイント
- [ ] 最新のコミットハッシュは `d9bde09`
- [ ] `app/products/[slug]/page.tsx` は削除済み
- [ ] `app/products/[slug].tsx` が新しい構造
- [ ] すべてのページに `export const dynamic = 'force-dynamic'` が設定済み

## 今後の予防策
1. デプロイ前にローカルでビルドテスト: `npm run build`
2. 失敗したデプロイメントは即座に削除
3. 定期的にキャッシュをクリア
4. Vercel CLIを使用して確実にデプロイ