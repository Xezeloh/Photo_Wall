(function() {
    // 季节性花朵主题系统
    class SeasonalFlowerThemes {
        constructor() {
            this.currentSeason = this.getCurrentSeason();
            this.themes = {
                spring: {
                    name: '春暖花开',
                    flowers: ['cherry', 'lavender'],
                    colors: ['#ffafcc', '#bb8fce', '#f9e79f'],
                    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
                    particleEffect: 'blossom',
                    music: 'spring_melody.mp3'
                },
                summer: {
                    name: '夏日阳光',
                    flowers: ['sunflower', 'rose'],
                    colors: ['#f1c40f', '#e74c3c', '#f9e79f'],
                    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
                    particleEffect: 'sunbeam',
                    music: 'summer_breeze.mp3'
                },
                autumn: {
                    name: '秋日私语',
                    flowers: ['cherry', 'lavender'],
                    colors: ['#d4ac0d', '#bb8fce', '#f5b7b1'],
                    background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)',
                    particleEffect: 'leaf',
                    music: 'autumn_whisper.mp3'
                },
                winter: {
                    name: '冬日暖阳',
                    flowers: ['rose', 'lavender'],
                    colors: ['#e8f4f8', '#bb8fce', '#aed6f1'],
                    background: 'linear-gradient(135deg, #e6dada 0%, #274046 100%)',
                    particleEffect: 'snowflake',
                    music: 'winter_serenade.mp3'
                },
                valentine: {
                    name: '浪漫情人节',
                    flowers: ['rose'],
                    colors: ['#e74c3c', '#f1948a', '#fadbd8'],
                    background: 'linear-gradient(135deg, #ffafbd 0%, #ffc3a0 100%)',
                    particleEffect: 'heart',
                    music: 'valentine_love.mp3'
                },
                anniversary: {
                    name: '周年纪念',
                    flowers: ['rose', 'sunflower'],
                    colors: ['#f1c40f', '#e74c3c', '#f9e79f'],
                    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%)',
                    particleEffect: 'sparkle',
                    music: 'anniversary_celebration.mp3'
                }
            };
            
            this.setupThemeSwitcher();
            this.applyCurrentTheme();
            this.setupSpecialDateDetection();
        }

        getCurrentSeason() {
            const now = new Date();
            const month = now.getMonth() + 1; // 1-12
            
            // 检查特殊节日
            const day = now.getDate();
            
            // 情人节
            if (month === 2 && day === 14) {
                return 'valentine';
            }
            
            // 纪念日 (6月5日)
            if (month === 6 && day === 5) {
                return 'anniversary';
            }
            
            // 按季节划分
            if (month >= 3 && month <= 5) return 'spring';      // 春季
            if (month >= 6 && month <= 8) return 'summer';      // 夏季
            if (month >= 9 && month <= 11) return 'autumn';     // 秋季
            return 'winter';                                    // 冬季
        }

        setupThemeSwitcher() {
            // 创建主题切换按钮
            const themeButton = document.createElement('div');
            themeButton.id = 'season-theme-button';
            themeButton.innerHTML = '🌸';
            themeButton.title = '切换季节主题';
            
            themeButton.style.cssText = `
                position: fixed;
                bottom: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                background: rgba(255, 255, 255, 0.9);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                z-index: 1000;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
                border: 2px solid rgba(255, 182, 193, 0.5);
            `;
            
            themeButton.addEventListener('mouseenter', () => {
                themeButton.style.transform = 'scale(1.1) rotate(10deg)';
                themeButton.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
            });
            
            themeButton.addEventListener('mouseleave', () => {
                themeButton.style.transform = 'scale(1) rotate(0deg)';
                themeButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
            });
            
            themeButton.addEventListener('click', () => {
                this.showThemeSelector();
            });
            
            document.body.appendChild(themeButton);
        }

        showThemeSelector() {
            // 创建主题选择面板
            const selector = document.createElement('div');
            selector.id = 'theme-selector';
            selector.innerHTML = `
                <div class="selector-header">
                    <h3>🌸 季节主题选择</h3>
                    <span class="close-selector">×</span>
                </div>
                <div class="theme-grid">
                    ${Object.keys(this.themes).map(themeKey => `
                        <div class="theme-option ${themeKey}" data-theme="${themeKey}">
                            <div class="theme-preview" style="background: ${this.themes[themeKey].background}"></div>
                            <div class="theme-name">${this.themes[themeKey].name}</div>
                        </div>
                    `).join('')}
                </div>
            `;
            
            selector.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 255, 255, 0.95);
                border-radius: 20px;
                padding: 25px;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                z-index: 1003;
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255, 182, 193, 0.7);
                min-width: 400px;
                max-width: 90vw;
            `;
            
            // 添加样式
            if (!document.getElementById('theme-selector-styles')) {
                const styles = document.createElement('style');
                styles.id = 'theme-selector-styles';
                styles.textContent = `
                    .selector-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 20px;
                    }
                    
                    .selector-header h3 {
                        margin: 0;
                        color: #e74c3c;
                        font-family: 'Pacifico', cursive;
                    }
                    
                    .close-selector {
                        font-size: 28px;
                        cursor: pointer;
                        color: #777;
                        transition: color 0.3s;
                    }
                    
                    .close-selector:hover {
                        color: #e74c3c;
                    }
                    
                    .theme-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                        gap: 15px;
                    }
                    
                    .theme-option {
                        cursor: pointer;
                        border-radius: 15px;
                        overflow: hidden;
                        transition: all 0.3s ease;
                        border: 2px solid transparent;
                    }
                    
                    .theme-option:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                        border-color: #ffafcc;
                    }
                    
                    .theme-option.active {
                        border-color: #e74c3c;
                        box-shadow: 0 0 20px rgba(231, 76, 60, 0.5);
                    }
                    
                    .theme-preview {
                        height: 80px;
                        border-radius: 12px 12px 0 0;
                    }
                    
                    .theme-name {
                        padding: 10px;
                        text-align: center;
                        font-family: 'Montserrat', sans-serif;
                        font-size: 14px;
                        color: #333;
                        background: rgba(255, 255, 255, 0.8);
                    }
                    
                    .overlay {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 1002;
                    }
                `;
                document.head.appendChild(styles);
            }
            
            // 创建遮罩层
            const overlay = document.createElement('div');
            overlay.className = 'overlay';
            
            overlay.addEventListener('click', () => {
                document.body.removeChild(selector);
                document.body.removeChild(overlay);
            });
            
            document.body.appendChild(overlay);
            document.body.appendChild(selector);
            
            // 添加选项点击事件
            selector.querySelectorAll('.theme-option').forEach(option => {
                option.addEventListener('click', () => {
                    const themeKey = option.dataset.theme;
                    this.switchTheme(themeKey);
                    document.body.removeChild(selector);
                    document.body.removeChild(overlay);
                });
            });
            
            // 关闭按钮事件
            selector.querySelector('.close-selector').addEventListener('click', () => {
                document.body.removeChild(selector);
                document.body.removeChild(overlay);
            });
        }

        switchTheme(themeKey) {
            this.currentSeason = themeKey;
            this.applyCurrentTheme();
            
            // 显示切换通知
            this.showThemeNotification(this.themes[themeKey].name);
            
            // 触发主题切换动画
            this.triggerThemeTransition();
        }

        applyCurrentTheme() {
            const theme = this.themes[this.currentSeason];
            
            // 应用背景渐变
            document.body.style.background = theme.background;
            
            // 更新花朵系统参数
            if (window.FlowerSystem) {
                window.FlowerSystem.currentTheme = theme;
            }
            
            // 如果有对应的背景音乐，可以在这里切换
            this.changeBackgroundMusic(theme.music);
            
            // 应用粒子效果
            this.applyParticleEffect(theme.particleEffect);
        }

        changeBackgroundMusic(musicFile) {
            // 这里可以根据需要切换背景音乐
            console.log(`切换到背景音乐: ${musicFile}`);
        }

        applyParticleEffect(effectType) {
            // 根据不同的主题应用不同的粒子效果
            console.log(`应用粒子效果: ${effectType}`);
            
            // 可以在这里调用不同的粒子系统
            switch(effectType) {
                case 'blossom':
                    this.createBlossomEffect();
                    break;
                case 'sunbeam':
                    this.createSunbeamEffect();
                    break;
                case 'leaf':
                    this.createLeafEffect();
                    break;
                case 'snowflake':
                    this.createSnowflakeEffect();
                    break;
                case 'heart':
                    this.createHeartEffect();
                    break;
                case 'sparkle':
                    this.createSparkleEffect();
                    break;
            }
        }

        createBlossomEffect() {
            // 樱花飘落效果
            if (window.FlowerSystem) {
                setInterval(() => {
                    window.FlowerSystem.createFlower('cherry');
                }, 800);
            }
        }

        createSunbeamEffect() {
            // 阳光射线效果
            console.log('创建阳光效果');
        }

        createLeafEffect() {
            // 落叶效果
            console.log('创建落叶效果');
        }

        createSnowflakeEffect() {
            // 雪花效果
            console.log('创建雪花效果');
        }

        createHeartEffect() {
            // 爱心效果（加强现有的爱心系统）
            console.log('创建爱心效果');
        }

        createSparkleEffect() {
            // 闪烁星光效果
            console.log('创建星光效果');
        }

        triggerThemeTransition() {
            // 创建过渡动画效果
            const transition = document.createElement('div');
            transition.id = 'theme-transition';
            transition.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 70%);
                z-index: 1001;
                pointer-events: none;
                animation: themeTransition 1.5s ease-out;
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes themeTransition {
                    0% { opacity: 0; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.1); }
                    100% { opacity: 0; transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(transition);
            
            setTimeout(() => {
                if (transition.parentNode) {
                    transition.parentNode.removeChild(transition);
                }
                if (style.parentNode) {
                    style.parentNode.removeChild(style);
                }
            }, 1500);
        }

        showThemeNotification(themeName) {
            const notification = document.createElement('div');
            notification.className = 'theme-notification';
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-icon">🌸</span>
                    <span class="notification-text">已切换到 ${themeName} 主题</span>
                </div>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.95);
                border-radius: 25px;
                padding: 15px 30px;
                box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
                z-index: 1002;
                backdrop-filter: blur(15px);
                border: 2px solid rgba(255, 182, 193, 0.7);
                animation: slideDown 0.5s ease-out;
                font-family: 'Pacifico', cursive;
                color: #e74c3c;
            `;
            
            const slideStyle = document.createElement('style');
            slideStyle.textContent = `
                @keyframes slideDown {
                    from { 
                        opacity: 0; 
                        transform: translateX(-50%) translateY(-50px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(-50%) translateY(0); 
                    }
                }
            `;
            document.head.appendChild(slideStyle);
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideDown 0.5s ease-out reverse';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                    if (slideStyle.parentNode) {
                        slideStyle.parentNode.removeChild(slideStyle);
                    }
                }, 500);
            }, 2000);
        }

        setupSpecialDateDetection() {
            // 每天检查是否需要更新主题
            setInterval(() => {
                const newSeason = this.getCurrentSeason();
                if (newSeason !== this.currentSeason) {
                    this.currentSeason = newSeason;
                    this.applyCurrentTheme();
                    this.showThemeNotification(this.themes[newSeason].name + ' 到来啦！');
                }
            }, 3600000); // 每小时检查一次
        }
    }

    // 页面加载完成后初始化
    window.addEventListener('load', () => {
        window.SeasonalFlowerThemes = new SeasonalFlowerThemes();
    });

})();