# 🚀 Vercel完全デプロイガイド - 異次元通販

## 🌟 **Vercel推奨理由**

- **Next.js最適化**: Vercel開発元による完璧サポート
- **自動デプロイ**: GitHubプッシュで即座にデプロイ
- **エッジネットワーク**: 世界中で高速アクセス
- **サーバーレス**: 自動スケーリング
- **PostgreSQL統合**: データベースもVercelで一元管理

---

## 🔧 **ステップ1: Vercelアカウント作成**

### **1. アカウント登録**
1. [vercel.com](https://vercel.com) にアクセス
2. 「Sign up」をクリック
3. **「Continue with GitHub」** を選択（推奨）
4. GitHubで認証許可

### **2. チーム設定**
- Personal Account のまま進行（無料プラン）
- 必要に応じて後でProプランにアップグレード

---

## 📦 **ステップ2: プロジェクトインポート**

### **1. 新規プロジェクト作成**
1. Vercelダッシュボードで **「Add New...」** → **「Project」**
2. **「Import Git Repository」** セクションを確認
3. GitHubリポジトリ `interdimensional-ecommerce` を選択
4. **「Import」** をクリック

### **2. プロジェクト設定**
```
Project Name: interdimensional-ecommerce
Framework Preset: Next.js (自動検出)
Root Directory: ./ (デフォルト)
Build Command: npm run build (自動設定)
Output Directory: (空欄 - Next.jsが自動処理)
Install Command: npm install (自動設定)
Development Command: npm run dev (自動設定)
```

### **3. 初回デプロイ実行**
- **「Deploy」** ボタンをクリック
- 初回は環境変数未設定でも構いません（後で設定）

---

## 🗄️ **ステップ3: Vercel Postgres設定**

### **1. ストレージ作成**
1. プロジェクトダッシュボードで **「Storage」** タブ
2. **「Create Database」** をクリック
3. **「Postgres」** を選択
4. データベース設定:
   ```
   Database Name: interdimensional-db
   Region: Washington D.C., USA (iad1) - 推奨
   ```
5. **「Create」** をクリック

### **2. 環境変数自動連携**
- Vercelが自動で `DATABASE_URL` を環境変数に追加
- **「Connect Project」** をクリックしてプロジェクトと連携

### **3. データベース接続確認**
```bash
# ローカルで確認（.env.localに一時的にURLを追加）
echo "DATABASE_URL=your-vercel-postgres-url" >> .env.local
npx prisma db push
npx prisma db seed
```

---

## ⚙️ **ステップ4: 環境変数完全設定**

### **1. 環境変数画面アクセス**
1. プロジェクト設定 → **「Environment Variables」**
2. 以下の変数を順次追加

### **2. 必須環境変数**

#### **認証関連**
```env
NEXTAUTH_SECRET=
```
生成方法:
```bash
openssl rand -base64 32
```

```env
NEXTAUTH_URL=https://your-app-name.vercel.app
```
（デプロイ後にVercelから提供されるURL）

#### **Stripe設定**
```env
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **3. 環境設定**
- **Environment**: Production, Preview, Development すべてに適用
- **Value**: 各キーの値を入力
- **Add** で保存

---

## 💳 **ステップ5: Stripe統合設定**

### **1. Stripeアカウント設定**
1. [stripe.com](https://stripe.com) でアカウント作成
2. 日本事業者として登録
3. テストモードでAPIキー取得

### **2. Webhook エンドポイント作成**
1. Stripe Dashboard → **開発者** → **Webhook**
2. **「エンドポイントを追加」**
3. エンドポイントURL:
   ```
   https://your-app-name.vercel.app/api/webhook/stripe
   ```
4. 監視するイベント:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `checkout.session.expired`

### **3. Webhook署名シークレット**
- 作成されたWebhookの詳細から署名シークレットをコピー
- Vercelの環境変数 `STRIPE_WEBHOOK_SECRET` に設定

---

## 🔄 **ステップ6: データベース初期化**

### **1. Prismaマイグレーション**
```bash
# Vercel Postgres URLを使用
npx prisma migrate deploy
```

### **2. シードデータ投入**
```bash
npx prisma db seed
```

### **3. 接続確認**
```bash
npx prisma studio
# http://localhost:5555 でデータ確認
```

---

## 🌐 **ステップ7: カスタムドメイン設定**

### **1. ドメイン購入（オプション）**
- お名前.com、ムームードメイン等
- 推奨名: `interdimensional-shop.com`

### **2. Vercelドメイン設定**
1. プロジェクト設定 → **「Domains」**
2. **「Add」** でカスタムドメイン追加
3. DNS設定指示に従って設定

### **3. SSL自動発行**
- Vercelが自動でSSL証明書発行
- 数分でHTTPS対応完了

---

## 📊 **ステップ8: デプロイ後確認**

### **1. 基本動作確認**
- [ ] サイトが正常表示される
- [ ] 商品一覧ページ表示
- [ ] 商品詳細ページ表示
- [ ] ユーザー登録動作
- [ ] ログイン動作
- [ ] カート機能動作
- [ ] 管理画面アクセス（admin@interdimensional.shop / admin123）

### **2. 決済フロー確認**
- [ ] チェックアウトページ表示
- [ ] Stripe決済画面遷移
- [ ] テストカード決済成功
- [ ] 成功ページ表示
- [ ] Webhook受信確認

### **3. モバイル対応確認**
- [ ] スマートフォンで正常表示
- [ ] タッチ操作動作
- [ ] レスポンシブデザイン確認

---

## 🔍 **トラブルシューティング**

### **よくある問題**

#### **1. ビルドエラー**
```bash
# ローカルでビルドテスト
npm run build

# 型エラー確認
npm run type-check
```

#### **2. データベース接続エラー**
- Vercel Postgres の接続文字列確認
- 環境変数 `DATABASE_URL` の値確認
- ネットワーク制限の確認

#### **3. Stripe Webhook エラー**
- WebhookエンドポイントURL正確性確認
- 署名シークレット確認
- Stripeダッシュボードでイベント履歴確認

#### **4. 環境変数未反映**
- 環境変数保存後、**再デプロイ** 実行
- **「Redeploy」** ボタンをクリック

---

## 🚀 **パフォーマンス最適化**

### **1. Vercel Analytics有効化**
1. プロジェクト設定 → **「Analytics」**
2. **「Enable」** でアクセス解析開始

### **2. エッジファンクション活用**
- API routesが自動でエッジ最適化
- 世界中で高速レスポンス

### **3. 画像最適化**
- Next.js Image コンポーネント使用
- Vercelが自動で WebP/AVIF 変換

---

## 💡 **Vercel Pro機能（有料プラン）**

### **追加機能**
- **チームコラボレーション**
- **高度なアナリティクス**
- **パスワード保護**
- **A/Bテスト**
- **エッジConfig**

### **料金**
- **Hobby**: $0/月 (個人使用)
- **Pro**: $20/月 (商用利用)
- **Enterprise**: カスタム価格

---

## 🎯 **本番運用準備**

### **1. 本番モード切り替え**
- StripeをLiveモードに変更
- 本番用APIキーに更新
- Webhook本番エンドポイント設定

### **2. 監視設定**
- Vercel Analytics有効
- Google Analytics統合
- エラートラッキング設定

### **3. バックアップ**
- データベース定期バックアップ
- GitHubでコード管理

---

## 🌟 **デプロイ完了！**

**🎉 おめでとうございます！**

あなたの異次元通販が正式に宇宙にデプロイされました！

**Vercelの提供URL**: `https://your-app-name.vercel.app`

世界中のユーザーが異次元商品を購入できる準備が整いました！

---

**🌌 異次元通販 - Vercelで宇宙デビュー完了！ ⚡**