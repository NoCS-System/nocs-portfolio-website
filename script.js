// ナビゲーション機能
document.addEventListener('DOMContentLoaded', function() {
    // ハンバーガーメニューの制御
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションリンクのクリック時にメニューを閉じる
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // スクロール時のナビゲーションバーの背景変更
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // スムーススクロール
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // ナビゲーションバーの高さを考慮
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // スクロールアニメーション
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // アニメーション対象の要素を監視
    const animateElements = document.querySelectorAll('.app-card, .skill-item, .contact-method');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // チーム写真のインタラクティブ機能
    const photoLeft = document.querySelector('.photo-left');
    const photoRight = document.querySelector('.photo-right');

    if (photoLeft && photoRight) {
        // マウスホバー効果
        photoLeft.addEventListener('mouseenter', function() {
            this.classList.add('focused');
            photoRight.classList.remove('focused');
        });

        photoRight.addEventListener('mouseenter', function() {
            this.classList.add('focused');
            photoLeft.classList.remove('focused');
        });

        // マウスリーブ効果
        photoLeft.addEventListener('mouseleave', function() {
            this.classList.remove('focused');
        });

        photoRight.addEventListener('mouseleave', function() {
            this.classList.remove('focused');
        });

        // タッチデバイス対応
        let touchStartX = 0;
        let touchEndX = 0;

        const teamPhoto = document.querySelector('.team-photo');
        if (teamPhoto) {
            teamPhoto.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });

            teamPhoto.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
        }

        function handleSwipe() {
            const swipeThreshold = 50;
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // 左スワイプ - 右側にフォーカス
                    photoRight.classList.add('focused');
                    photoLeft.classList.remove('focused');
                } else {
                    // 右スワイプ - 左側にフォーカス
                    photoLeft.classList.add('focused');
                    photoRight.classList.remove('focused');
                }
            }
        }

        // スクロール時の自動フォーカス切り替え
        let scrollTimeout;
        window.addEventListener('scroll', function() {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(function() {
                const aboutSection = document.getElementById('about');
                if (aboutSection) {
                    const rect = aboutSection.getBoundingClientRect();
                    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
                    
                    if (isVisible) {
                        // スクロール位置に基づいてフォーカスを切り替え
                        const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                        if (scrollProgress > 0.5) {
                            photoRight.classList.add('focused');
                            photoLeft.classList.remove('focused');
                        } else {
                            photoLeft.classList.add('focused');
                            photoRight.classList.remove('focused');
                        }
                    }
                }
            }, 100);
        });
    }

    // お問い合わせフォームの処理
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // フォームデータの取得
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');

            // 簡単なバリデーション
            if (!name || !email || !message) {
                showNotification('すべての項目を入力してください。', 'error');
                return;
            }

            if (!isValidEmail(email)) {
                showNotification('有効なメールアドレスを入力してください。', 'error');
                return;
            }

            // 送信処理（実際の実装ではサーバーに送信）
            showNotification('お問い合わせありがとうございます。後日ご連絡いたします。', 'success');
            
            // フォームをリセット
            this.reset();
        });
    }

    // メールアドレスのバリデーション
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // 通知表示機能
    function showNotification(message, type = 'info') {
        // 既存の通知を削除
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // 新しい通知を作成
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // スタイルを追加
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
            color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
            padding: 1rem;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // アニメーション表示
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // 閉じるボタンの機能
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });

        // 自動で閉じる
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }

    // スキルアイテムのホバーエフェクト
    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // アプリカードのホバーエフェクト
    const appCards = document.querySelectorAll('.app-card');
    appCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // パララックス効果（軽量版）
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.hero-visual');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // テキストタイピング効果（オプション）
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // ページ読み込み時のアニメーション
    window.addEventListener('load', function() {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        if (heroTitle && heroSubtitle) {
            setTimeout(() => {
                heroTitle.style.opacity = '1';
                heroTitle.style.transform = 'translateY(0)';
            }, 500);
            
            setTimeout(() => {
                heroSubtitle.style.opacity = '1';
                heroSubtitle.style.transform = 'translateY(0)';
            }, 1000);
        }
    });

    // 初期スタイル設定
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(30px)';
        heroTitle.style.transition = 'all 0.8s ease';
    }
    
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(30px)';
        heroSubtitle.style.transition = 'all 0.8s ease';
    }

    // コピー機能（URL共有用）
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('URLをクリップボードにコピーしました！', 'success');
        }).catch(() => {
            showNotification('コピーに失敗しました。', 'error');
        });
    }

    // 右クリックメニューにコピー機能を追加
    document.addEventListener('contextmenu', function(e) {
        if (e.target.closest('.app-card')) {
            e.preventDefault();
            const currentUrl = window.location.href;
            copyToClipboard(currentUrl);
        }
    });

    // キーボードショートカット
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + C でURLコピー
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            const currentUrl = window.location.href;
            copyToClipboard(currentUrl);
        }
        
        // ESCキーでモバイルメニューを閉じる
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // パフォーマンス最適化：画像の遅延読み込み
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
});

// ユーティリティ関数
const Utils = {
    // デバイス判定
    isMobile: () => window.innerWidth <= 768,
    isTablet: () => window.innerWidth > 768 && window.innerWidth <= 1024,
    isDesktop: () => window.innerWidth > 1024,

    // スムーススクロール
    scrollTo: (element, offset = 0) => {
        const target = typeof element === 'string' ? document.querySelector(element) : element;
        if (target) {
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    },

    // 要素の可視性判定
    isElementInViewport: (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};
