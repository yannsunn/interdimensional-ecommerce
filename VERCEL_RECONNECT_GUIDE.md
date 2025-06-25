# 🚨 VERCEL緊急再接続ガイド

## 🔴 現在の問題
- Vercelが12時間以上古いコミット `5709464` から更新されない
- GitHub → Vercel の自動デプロイが完全に切断されている
- 新しいコミットがすべて無視されている

## ✅ 解決手順（5分で完了）

### 方法A: Vercelプロジェクトの再接続（推奨）

1. **Vercelダッシュボード**にログイン
   - https://vercel.com/dashboard

2. **プロジェクトを選択**
   - `interdimensional-ecommerce` をクリック

3. **Settings → Git**
   - 「Disconnect from Git」をクリック
   - 確認ダイアログで「Yes, disconnect」

4. **再接続**
   - 「Connect Git Repository」をクリック
   - GitHub を選択
   - `yannsunn/interdimensional-ecommerce` を選択
   - Production Branch: `main`
   - 「Import」をクリック

5. **手動デプロイ**
   - 「Deploy」ボタンをクリック
   - 最新コミットが使用されることを確認

### 方法B: Vercel CLIで強制デプロイ

```bash
# プロジェクトディレクトリで実行
vercel --prod --force
```

質問への回答:
- Set up and deploy? → **Yes**
- Which scope? → **AwakeInc**（または適切なスコープ）
- Link to existing project? → **Yes**
- What's the name? → **interdimensional-ecommerce**

### 方法C: 完全新規作成（最終手段）

1. **現在のプロジェクトを削除**
   - Settings → Advanced → Delete Project

2. **新規プロジェクト作成**
   - https://vercel.com/new
   - GitHubリポジトリをインポート
   - 環境変数を再設定

## 🎯 確認ポイント

### 成功の指標
- [ ] 最新コミットでビルドが開始される
- [ ] Function Runtimeエラーが解消される
- [ ] 今後のpushが自動デプロイされる

### 環境変数（必要に応じて再設定）
```
DATABASE_URL=your_database_url
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your_secret
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_SECRET_KEY=sk_...
```

## 📞 サポート

問題が解決しない場合:
1. Vercel Status: https://www.vercel-status.com/
2. GitHub Webhooks: リポジトリ Settings → Webhooks で確認

## 💡 予防策

今後この問題を避けるために:
1. 定期的にデプロイメント状態を確認
2. 失敗したデプロイメントは即座に対処
3. Vercel CLIをバックアップ手段として準備