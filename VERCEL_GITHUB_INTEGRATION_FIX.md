# 🚨 Vercel GitHub自動デプロイ修復ガイド

## 問題
- Vercelが22時間前のコミット `1ea2317` から更新されない
- GitHubへのプッシュが自動デプロイをトリガーしない
- Webhookが正しく機能していない

## 解決手順

### ステップ1: Vercelダッシュボードでの作業

1. **Vercelにログイン**
   - https://vercel.com/dashboard にアクセス
   - プロジェクト `interdimensional-ecommerce` を選択

2. **失敗したデプロイメントを削除**
   - "Deployments" タブを開く
   - 22時間前の失敗したデプロイメント（コミット `1ea2317`）を見つける
   - 右側の "..." メニューから "Delete" を選択

3. **GitHub統合をリセット**
   - "Settings" タブ → "Git" セクション
   - "Disconnect from Git" をクリック
   - 確認ダイアログで "Disconnect" を選択

4. **GitHub統合を再接続**
   - "Connect Git Repository" をクリック
   - GitHubを選択し、認証
   - リポジトリ `yannsunn/interdimensional-ecommerce` を選択
   - Production Branch: `main` を設定
   - "Import" をクリック

### ステップ2: 環境変数の設定

プロジェクト設定で以下の環境変数を追加（まだの場合）:
- `DATABASE_URL`: PostgreSQLの接続文字列
- `NEXTAUTH_URL`: デプロイメントURL
- `NEXTAUTH_SECRET`: ランダムな秘密鍵
- `STRIPE_PUBLISHABLE_KEY`: Stripe公開可能キー
- `STRIPE_SECRET_KEY`: Stripeシークレットキー

### ステップ3: 手動デプロイで確認

1. Deploymentsタブで "Create Deployment" をクリック
2. Branch: `main`
3. Commit: 最新のコミット `d9bde09` を選択
4. "Deploy" をクリック

### ステップ4: 自動デプロイの確認

1. ローカルで小さな変更を作成:
   ```bash
   echo "# Auto-deploy test $(date)" >> README.md
   git add README.md
   git commit -m "Test: Verify auto-deployment is working"
   git push origin main
   ```

2. Vercelダッシュボードで新しいデプロイメントが開始されることを確認

## トラブルシューティング

### Webhookが機能しない場合
1. GitHubリポジトリの Settings → Webhooks を確認
2. Vercel webhookが存在し、緑のチェックマークがあることを確認
3. なければ、Vercelで再度Git統合を設定

### ビルドエラーが続く場合
最新のコードは既に修正済み:
- `generateStaticParams` は削除済み
- すべてのページに `export const dynamic = 'force-dynamic'` 設定済み
- 新しいファイル構造 `app/products/[slug].tsx` を使用

## 期待される結果
- GitHubにプッシュすると自動的にVercelでビルドが開始
- 最新のコミットが使用される
- ビルドエラーなしでデプロイ成功