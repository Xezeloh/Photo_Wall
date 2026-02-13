(function() {
    // 惊喜花朵系统
    class FlowerSurprise {
        constructor() {
            this.surprises = [
                { type: 'message', content: '💐 今天也是爱你的一天！' },
                { type: 'message', content: '🌸 愿我们的爱情如花般绚烂！' },
                { type: 'message', content: '🌹 你是我的小可爱！' },
                { type: 'message', content: '🌷 感谢你长久的陪伴！' },
                { type: 'memory', content: '还记得我们第一次约会吗？', photo: '初次见面.jpg' },
                { type: 'memory', content: '珠江上的晚风轻拂~', photo: '珠江夜游.jpg' },
                { type: 'memory', content: '第一次来你家找你', photo: '来你家.jpg' },
                { type: 'memory', content: '纵将炽热爱意交于眼眸，依依惜别思念封存于心', photo: '深圳一别.jpg' },
                { type: 'memory', content: '龙与虎', photo: '龙与虎.jpg' },
                { type: 'memory', content: '惊鸿一瞥', photo: '美丽的你.jpg' },
                { type: 'memory', content: '由衷地为你开心', photo: '北大.jpg' },
                { type: 'memory', content: '吃喝玩乐', photo: '在大同.jpg' },

                { type: 'countdown', content: '距离下一个纪念日还有' },
                { type: 'quote', content: '"爱令我们成为更好的自己"' }
            ];
            this.activeSurprises = new Set();
            this.setupEventListeners();
        }

        setupEventListeners() {
            // 点击花朵触发惊喜
            document.addEventListener('click', (event) => {
                if (event.target.closest('#flowerCanvas')) {
                    this.triggerRandomSurprise(event);
                }
            });

            // 特殊按键组合
            document.addEventListener('keydown', (event) => {
                // Ctrl + Shift + F 触发花海模式
                if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'f') {
                    event.preventDefault();
                    this.flowerRainMode();
                }
                
                // Ctrl + Alt + H 触发隐藏惊喜
                if (event.ctrlKey && event.altKey && event.key.toLowerCase() === 'h') {
                    event.preventDefault();
                    this.secretGardenMode();
                }
            });

            // 定时惊喜
            this.scheduleTimedSurprises();
        }

        triggerRandomSurprise(event) {
            // 避免频繁触发
            if (this.activeSurprises.size > 3) return;

            const surprise = this.surprises[Math.floor(Math.random() * this.surprises.length)];
            const id = Date.now() + Math.random();
            
            this.activeSurprises.add(id);
            
            switch(surprise.type) {
                case 'message':
                    this.showMessageSurprise(surprise.content, event.clientX, event.clientY, id);
                    break;
                case 'photo':
                    this.showPhotoSurprise(surprise.content, event.clientX, event.clientY, id);
                    break;
                case 'memory':
                    this.showMemorySurprise(surprise.content, event.clientX, event.clientY, id, surprise.photo);
                    break;
                case 'countdown':
                    this.showCountdownSurprise(event.clientX, event.clientY, id);
                    break;
                case 'quote':
                    this.showQuoteSurprise(surprise.content, event.clientX, event.clientY, id);
                    break;
            }

            // 5秒后自动移除
            setTimeout(() => {
                this.removeSurprise(id);
            }, 5000);
        }

        showMessageSurprise(message, x, y, id) {
            const element = document.createElement('div');
            element.className = 'flower-surprise-message';
            element.id = `surprise-${id}`;
            element.innerHTML = `
                <div class="surprise-content">
                    <span class="flower-emoji">🌸</span>
                    <span class="message-text">${message}</span>
                </div>
            `;
            
            this.positionElement(element, x, y);
            document.body.appendChild(element);
            
            // 添加动画效果
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        }

        showPhotoSurprise(photoName, x, y, id) {
            const element = document.createElement('div');
            element.className = 'flower-surprise-photo';
            element.id = `surprise-${id}`;
            element.innerHTML = `
                <div class="surprise-content">
                    <img src="./special_photos/${photoName}" alt="Special Memory" 
                         onerror="this.parentElement.innerHTML='<p>💕 美好的回忆</p>'">
                    <div class="photo-overlay">
                        <span class="heart-icon">💖</span>
                    </div>
                </div>
            `;
            
            this.positionElement(element, x, y);
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(-50%, -50%) scale(1) rotate(5deg)';
            }, 10);
        }

        showMemorySurprise(memory, x, y, id, photo = null) {
            const element = document.createElement('div');
            element.className = 'flower-surprise-memory';
            element.id = `surprise-${id}`;
            element.innerHTML = `
                <div class="surprise-content">
                    <div class="memory-card">
                        <div class="memory-header">
                            <span class="memory-icon">📖</span>
                            <span class="memory-title">美好回忆</span>
                        </div>
                        <div class="memory-body">
                            <p>${memory}</p>
                        </div>
                        <div class="memory-actions">
                            <button class="view-photo-btn" onclick="showMemoryPhoto('${id}', '${photo || ''}')">
                                📷 查看照片
                            </button>
                        </div>
                        <div class="memory-footer">
                            <small>永远珍藏 ❤️</small>
                        </div>
                    </div>
                </div>
            `;
            
            this.positionElement(element, x, y);
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        }

        showCountdownSurprise(x, y, id) {
            const element = document.createElement('div');
            element.className = 'flower-surprise-countdown';
            element.id = `surprise-${id}`;
            
            // 计算下一个纪念日（示例：每年的6月5日）
            const nextAnniversary = new Date();
            nextAnniversary.setMonth(5); // 6月（0-indexed）
            nextAnniversary.setDate(5);
            if (nextAnniversary < new Date()) {
                nextAnniversary.setFullYear(nextAnniversary.getFullYear() + 1);
            }
            
            const diffTime = nextAnniversary - new Date();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            element.innerHTML = `
                <div class="surprise-content">
                    <div class="countdown-display">
                        <div class="countdown-number">${diffDays}</div>
                        <div class="countdown-label">天</div>
                    </div>
                    <div class="countdown-text">直到我们的下一个纪念日！</div>
                </div>
            `;
            
            this.positionElement(element, x, y);
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(-50%, -50%) scale(1) rotate(-5deg)';
            }, 10);
        }

        showQuoteSurprise(quote, x, y, id) {
            const element = document.createElement('div');
            element.className = 'flower-surprise-quote';
            element.id = `surprise-${id}`;
            element.innerHTML = `
                <div class="surprise-content">
                    <div class="quote-mark">❝</div>
                    <div class="quote-text">${quote}</div>
                    <div class="quote-mark quote-end">❞</div>
                </div>
            `;
            
            this.positionElement(element, x, y);
            document.body.appendChild(element);
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
        }

        positionElement(element, x, y) {
            // 限制显示区域在核心可视范围内
            const minX = 100;  // 左边距
            const maxX = window.innerWidth - 400;  // 右边距，考虑元素宽度
            const minY = 150;  // 上边距，避开固定导航栏
            const maxY = window.innerHeight - 200; // 下边距
            
            // 调整坐标到可视区域
            let adjustedX = Math.max(minX, Math.min(x, maxX));
            let adjustedY = Math.max(minY, Math.min(y, maxY));
            
            // 如果原始位置在屏幕边缘，调整到屏幕中心区域
            if (x < 150 || x > window.innerWidth - 150) {
                adjustedX = window.innerWidth / 2;
            }
            if (y < 200 || y > window.innerHeight - 150) {
            adjustedY = window.innerHeight / 2;
            }
            
            element.style.position = 'fixed';
            element.style.left = `${adjustedX}px`;
            element.style.top = `${adjustedY}px`;
            element.style.transform = 'translate(-50%, -50%) scale(0.8)';
            element.style.opacity = '0';
            element.style.transition = 'all 0.5s ease-out';
            element.style.zIndex = '1001';
        }

        removeSurprise(id) {
            const element = document.getElementById(`surprise-${id}`);
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translate(-50%, -50%) scale(0.5)';
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                    this.activeSurprises.delete(id);
                }, 500);
            }
        }

        // 花海模式 - 大量花朵飘落
        flowerRainMode() {
            const originalInterval = setInterval(() => {
                for(let i = 0; i < 8; i++) { // 从5朵增加到8朵
                    setTimeout(() => {
                        if(window.FlowerSystem) {
                            window.FlowerSystem.createFlower();
                        }
                    }, i * 50); // 缩短间隔时间从100ms到50ms
                }
            }, 300); // 从500ms缩短到300ms，增加频率

            // 显示提示
            this.showTemporaryMessage('🌺 花海模式开启！点击任意地方收获惊喜！');
            
            // 延长时间到15秒
            setTimeout(() => {
                clearInterval(originalInterval);
                this.showTemporaryMessage('✨ 花海结束了，但惊喜还在继续...');
            }, 15000); // 从10秒延长到15秒
        }

        // 秘密花园模式
        secretGardenMode() {
            // 创建特殊的花朵类型
            const specialFlowers = ['rose', 'cherry'];
            
            // 在屏幕周围生成更多花朵（从20朵增加到35朵）
            for(let i = 0; i < 35; i++) {
                setTimeout(() => {
                    const flowerType = specialFlowers[Math.floor(Math.random() * specialFlowers.length)];
                    if(window.FlowerSystem) {
                        const flower = new window.FlowerSystem.Flower(flowerType);
                        flower.x = Math.random() * window.innerWidth;
                        flower.y = Math.random() * window.innerHeight;
                        flower.size *= 2.5; // 增大花朵尺寸
                        window.FlowerSystem.flowers.push(flower);
                    }
                }, i * 100); // 缩短间隔时间
            }
            
            this.showTemporaryMessage('🌹 欢迎来到秘密花园！');
        }

        showTemporaryMessage(text) {
            const msg = document.createElement('div');
            msg.className = 'temporary-message';
            msg.textContent = text;
            msg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(255, 182, 193, 0.95);
                color: #8b0000;
                padding: 20px 40px;
                border-radius: 30px;
                font-family: 'Pacifico', cursive;
                font-size: 20px;
                z-index: 1003;
                box-shadow: 0 8px 25px rgba(0,0,0,0.3);
                backdrop-filter: blur(15px);
                text-align: center;
                border: 3px solid rgba(255, 255, 255, 0.8);
                animation: fadeInOut 3s ease-in-out;
                max-width: 80vw;
            `;
            document.body.appendChild(msg);
            
            setTimeout(() => {
                if(msg.parentNode) {
                    msg.parentNode.removeChild(msg);
                }
            }, 3000);
        }

        scheduleTimedSurprises() {
            // 每隔一段时间随机触发惊喜
            setInterval(() => {
                if(Math.random() < 0.3) { // 30%概率
                    const randomX = Math.random() * window.innerWidth;
                    const randomY = Math.random() * window.innerHeight;
                    const fakeEvent = {
                        clientX: randomX,
                        clientY: randomY
                    };
                    this.triggerRandomSurprise(fakeEvent);
                }
            }, 15000); // 每15秒检查一次
        }
    }

    // 添加CSS样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            20% { opacity: 1; transform: translateX(-50%) translateY(0); }
            80% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
            100% { transform: translateY(0px) rotate(360deg); }
        }
        
        .flower-surprise-message,
        .flower-surprise-photo,
        .flower-surprise-memory,
        .flower-surprise-countdown,
        .flower-surprise-quote {
            position: fixed;
            pointer-events: none;
        }
        
        .surprise-content {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 15px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(10px);
            border: 2px solid rgba(255, 182, 193, 0.5);
            text-align: center;
            max-width: 300px;
        }
        
        .message-text {
            font-family: 'Pacifico', cursive;
            color: #e74c3c;
            font-size: 18px;
            display: block;
            margin-top: 10px;
        }
        
        .flower-emoji {
            font-size: 30px;
            animation: float 3s ease-in-out infinite;
        }
        
        .flower-surprise-photo img {
            max-width: 200px;
            max-height: 200px;
            border-radius: 10px;
            display: block;
            margin: 0 auto;
        }
        
        .photo-overlay {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
            animation: float 2s ease-in-out infinite;
        }
        
        .memory-card {
            font-family: 'Montserrat', sans-serif;
        }
        
        .memory-header {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .memory-icon {
            font-size: 24px;
        }
        
        .memory-title {
            font-weight: bold;
            color: #e74c3c;
        }
        
        .memory-body p {
            font-size: 16px;
            line-height: 1.5;
            color: #333;
            margin: 10px 0;
        }
        
        .memory-footer small {
            color: #777;
            font-style: italic;
        }
        
        .memory-actions {
            margin: 15px 0;
            text-align: center;
            pointer-events: all;
        }
        
        .view-photo-btn {
            background: linear-gradient(45deg, #e74c3c, #ff6b6b);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            font-family: 'Montserrat', sans-serif;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(231, 76, 60, 0.3);
            pointer-events: all;
        }
        
        .view-photo-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(231, 76, 60, 0.4);
            background: linear-gradient(45deg, #c0392b, #e74c3c);
        }
        
        .view-photo-btn:active {
            transform: translateY(0);
        }
        
        .countdown-display {
            display: flex;
            align-items: baseline;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
        }
        
        .countdown-number {
            font-size: 48px;
            font-weight: bold;
            color: #e74c3c;
            font-family: 'Pacifico', cursive;
        }
        
        .countdown-label {
            font-size: 24px;
            color: #777;
        }
        
        .countdown-text {
            font-size: 16px;
            color: #555;
        }
        
        .quote-mark {
            font-size: 40px;
            color: #f1c40f;
            line-height: 1;
        }
        
        .quote-end {
            transform: scaleX(-1);
        }
        
        .quote-text {
            font-size: 18px;
            font-style: italic;
            color: #333;
            margin: 15px 0;
            font-family: 'Georgia', serif;
        }
        
        /* 记忆照片相关样式 */
        .clickable-memory {
            transition: all 0.3s ease;
            border: 2px dashed rgba(231, 76, 60, 0.3);
        }
        
        .clickable-memory:hover {
            border-color: rgba(231, 76, 60, 0.6);
            box-shadow: 0 5px 15px rgba(231, 76, 60, 0.2);
            transform: translateY(-2px);
        }
        
        .memory-photo-placeholder {
            margin-top: 15px;
            padding: 10px;
            background: rgba(255, 182, 193, 0.2);
            border-radius: 8px;
            border: 1px dashed #e74c3c;
        }
        
        .photo-hint {
            color: #e74c3c;
            font-size: 14px;
            font-weight: 500;
        }
        
        .memory-photo-viewer {
            position: fixed;
            pointer-events: none;
        }
        
        .photo-viewer-content {
            background: rgba(255, 255, 255, 0.98);
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(20px);
            border: 3px solid rgba(255, 182, 193, 0.8);
            text-align: center;
            max-width: 90vw;
            max-height: 80vh;
            position: relative;
            pointer-events: all;
        }
        
        .photo-viewer-content img {
            max-width: 100%;
            max-height: 60vh;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            margin-bottom: 15px;
        }
        
        .photo-close-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            width: 35px;
            height: 35px;
            background: #e74c3c;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: bold;
        }
        
        .photo-close-btn:hover {
            background: #c0392b;
            transform: scale(1.1);
        }
        
        .photo-caption {
            color: #e74c3c;
            font-family: 'Pacifico', cursive;
            font-size: 18px;
            margin-top: 10px;
            font-weight: bold;
        }
        
        .photo-error {
            padding: 30px;
            color: #777;
        }
        
        .photo-error p {
            margin: 10px 0;
        }
    `;
    document.head.appendChild(style);

    // 初始化惊喜系统
    window.addEventListener('load', () => {
        new FlowerSurprise();
    });

    // 全局函数：显示记忆照片
    window.showMemoryPhoto = function(memoryId, photo = null) {
        // 创建照片查看器
        const viewer = document.createElement('div');
        viewer.className = 'memory-photo-viewer';
        viewer.id = `photo-viewer-${memoryId}`;
        
        // 使用记忆关联的照片，如果没有则随机选择
        let photoSrc;
        if (photo && photo !== 'null' && photo !== '') {
            // 如果是数字格式，使用images文件夹；如果是文件名，使用special_photos文件夹
            if (/^\d+$/.test(photo)) {
                photoSrc = `./images/${photo}.jpg`;
            } else {
                photoSrc = `./special_photos/${photo}`;
            }
        } else {
            // 如果没有指定照片，则随机选择
            const randomIndex = Math.floor(Math.random() * 11);
            photoSrc = `./images/${randomIndex}.jpg`;
        }
        
        viewer.innerHTML = `
            <div class="photo-viewer-content">
                <div class="photo-close-btn" onclick="closeMemoryPhoto('${memoryId}')">×</div>
                <img src="${photoSrc}" alt="美好回忆" onerror="this.src='./images/0.jpg'; this.onerror=null;">
                <div class="photo-caption">💕 美好的回忆时光</div>
            </div>
        `;
        
        viewer.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1002;
            backdrop-filter: blur(5px);
        `;
        
        document.body.appendChild(viewer);
        
        viewer.addEventListener('click', function(e) {
            if (e.target === viewer) {
                closeMemoryPhoto(memoryId);
            }
        });
        
        // 添加键盘ESC键关闭功能
        const handleKeyDown = function(e) {
            if (e.key === 'Escape') {
                closeMemoryPhoto(memoryId);
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    };
    
    // 全局函数：关闭记忆照片查看器
    window.closeMemoryPhoto = function(memoryId) {
        const viewer = document.getElementById(`photo-viewer-${memoryId}`);
        if (viewer) {
            viewer.style.opacity = '0';
            viewer.style.transform = 'scale(0.9)';
            setTimeout(() => {
                if (viewer.parentNode) {
                    viewer.parentNode.removeChild(viewer);
                }
            }, 300);
        }
    };

})();