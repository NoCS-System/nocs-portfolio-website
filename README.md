# iOS/Android アプリ開発者ポートフォリオ

モバイルアプリ開発に特化したフリーランスエンジニアのポートフォリオサイトです。

## 🚀 特徴

- **モダンなデザイン**: スタイリッシュでレスポンシブなUI
- **iOS/Android特化**: モバイルアプリ開発の実績を魅力的に表示
- **名刺機能**: クラウドワークスなどで簡単にURL共有可能
- **無料ホスティング**: GitHub Pagesで完全無料公開

## 📱 セクション構成

1. **Hero Section**: インパクトのあるトップビジュアル
2. **About**: 2人の開発者紹介（インタラクティブな写真セクション）
3. **Apps**: 制作アプリのギャラリー（開発中・企画中含む）
4. **Skills**: 技術スキルとツールの表示
5. **Contact**: お問い合わせフォーム

## 🎭 インタラクティブ機能

### About セクションの2人紹介
- **ホバー効果**: マウスを左右の写真に合わせると、該当する開発者の情報が表示
- **フォーカス効果**: 一方にフォーカスすると、もう一方が薄くなる演出
- **タッチ対応**: モバイルデバイスでのスワイプ操作に対応
- **スクロール連動**: スクロール位置に応じて自動でフォーカスが切り替わる

## 🛠 技術スタック

- **HTML5**: セマンティックなマークアップ
- **CSS3**: モダンなスタイリングとアニメーション
- **JavaScript**: インタラクティブ機能
- **Font Awesome**: アイコンライブラリ
- **Google Fonts**: Inter フォント

## 🚀 GitHub Pagesでの公開方法

### 1. リポジトリの作成
```bash
# 新しいリポジトリを作成
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### 2. GitHub Pagesの設定
1. GitHubリポジトリのページを開く
2. Settings → Pages に移動
3. Source を "Deploy from a branch" に設定
4. Branch を "main" に設定
5. Save をクリック

### 3. カスタマイズ
- `index.html` の内容を自分の情報に更新
- アプリのスクリーンショットを追加
- 連絡先情報を更新

## 📝 カスタマイズガイド

### 基本情報の変更
```html
<!-- タイトルとメタ情報 -->
<title>あなたの名前 | iOS/Android アプリ開発者</title>
<meta name="description" content="あなたの説明文">

<!-- 2人開発者の情報 -->
<div class="person-info">
    <h4>開発者1の名前</h4>
    <p>開発者1の専門分野</p>
</div>
<div class="person-info">
    <h4>開発者2の名前</h4>
    <p>開発者2の専門分野</p>
</div>
```

### チーム写真の追加
```html
<!-- 実際の画像を使用する場合 -->
<div class="photo-left" data-person="left">
    <img src="team-photo.jpg" alt="開発者1" class="person-image">
    <div class="person-overlay">
        <div class="person-info">
            <h4>開発者1の名前</h4>
            <p>開発者1の専門分野</p>
        </div>
    </div>
</div>
```

### アプリ情報の追加
```html
<div class="app-card">
    <div class="app-preview">
        <div class="app-screenshot">
            <!-- アプリのスクリーンショット画像を追加 -->
            <img src="path/to/screenshot.jpg" alt="アプリ名">
        </div>
    </div>
    <div class="app-info">
        <h3>アプリ名</h3>
        <p>アプリの説明</p>
        <div class="app-tech">
            <span class="tech-tag">使用技術</span>
        </div>
        <div class="app-status">
            <span class="status-badge development">開発中</span>
        </div>
    </div>
</div>
```

### スキルの追加・変更
```html
<div class="skill-item">
    <i class="fab fa-swift"></i>
    <span>Swift</span>
</div>
```

## 🎨 デザインカスタマイズ

### カラーテーマの変更
```css
/* メインカラーの変更 */
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --accent-color: #f093fb;
}
```

### フォントの変更
```css
/* Google Fontsから別のフォントを選択 */
@import url('https://fonts.googleapis.com/css2?family=Your+Font:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Your Font', sans-serif;
}
```

## 📱 レスポンシブ対応

- **デスクトップ**: 1200px以上
- **タブレット**: 768px - 1024px
- **モバイル**: 768px以下

## 🔧 機能

- **スムーススクロール**: セクション間の滑らかな移動
- **アニメーション**: スクロール時のフェードイン効果
- **モバイルメニュー**: ハンバーガーメニュー対応
- **フォームバリデーション**: お問い合わせフォームの入力チェック
- **通知システム**: 操作結果のフィードバック

## 📞 お問い合わせ

お問い合わせフォームからの送信は現在デモモードです。
実際の運用では、以下のような方法で連絡を受け取ることをお勧めします：

- **メール**: メールアドレスを直接記載
- **SNS**: Twitter、LinkedInなどのリンク
- **フォームサービス**: Formspree、Netlify Formsなどの利用

## 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

---

**注意**: このサイトはGitHub Pagesで公開することを前提に設計されています。他のホスティングサービスを使用する場合は、適切に設定を調整してください。
