(function() {
    let flowers = [];
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.id = 'flowerCanvas';
    
    // 设置画布样式
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '98';
    document.body.appendChild(canvas);

    window.onresize = resizeCanvas;
    resizeCanvas();

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // 花朵类定义
    class Flower {
        constructor(type) {
            this.type = type;
            this.x = Math.random() * canvas.width;
            this.y = -50;
            this.size = Math.random() * 20 + 15;
            this.speed = Math.random() * 1.2 + 0.5; // 减慢下落速度
            this.rotation = Math.random() * Math.PI * 2;
            this.rotationSpeed = (Math.random() - 0.5) * 0.05;
            this.alpha = 1;
            this.alphaDecay = Math.random() * 0.001 + 0.0005; // 减慢透明度衰减
            this.oscillation = Math.random() * Math.PI * 2;
            this.oscillationSpeed = Math.random() * 0.03 + 0.01; // 减慢摆动速度
        }

        update() {
            this.y += this.speed;
            this.rotation += this.rotationSpeed;
            this.oscillation += this.oscillationSpeed;
            
            // 水平摆动效果
            this.x += Math.sin(this.oscillation) * 0.5;
            
            this.alpha -= this.alphaDecay;
            
            return this.alpha > 0 && this.y < canvas.height + 100;
        }

        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            switch(this.type) {
                case 'rose':
                    this.drawRose(ctx);
                    break;
                case 'cherry':
                    this.drawCherryBlossom(ctx);
                    break;
                case 'sunflower':
                    this.drawSunflower(ctx);
                    break;
                case 'lavender':
                    this.drawLavender(ctx);
                    break;
            }
            
            ctx.restore();
        }

        // 绘制玫瑰花
        drawRose(ctx) {
            const scale = this.size / 30;
            
            // 花瓣（红色渐变）
            ctx.fillStyle = '#e74c3c';
            for(let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI / 4);
                ctx.beginPath();
                ctx.ellipse(0, -10 * scale, 8 * scale, 15 * scale, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // 花心
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(0, 0, 5 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // 花茎
            ctx.fillStyle = '#27ae60';
            ctx.fillRect(-2 * scale, 0, 4 * scale, 30 * scale);
        }

        // 绘制樱花
        drawCherryBlossom(ctx) {
            const scale = this.size / 25;
            
            // 五瓣花
            ctx.fillStyle = '#ffafcc';
            ctx.beginPath();
            for(let i = 0; i < 5; i++) {
                const angle = (i * Math.PI * 2) / 5;
                const x = Math.cos(angle) * 8 * scale;
                const y = Math.sin(angle) * 8 * scale;
                ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.fill();
            
            // 花心
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(0, 0, 3 * scale, 0, Math.PI * 2);
            ctx.fill();
        }

        // 绘制向日葵
        drawSunflower(ctx) {
            const scale = this.size / 35;
            
            // 花盘
            ctx.fillStyle = '#f1c40f';
            ctx.beginPath();
            ctx.arc(0, 0, 12 * scale, 0, Math.PI * 2);
            ctx.fill();
            
            // 花瓣（黄色）
            ctx.fillStyle = '#f9e79f';
            for(let i = 0; i < 16; i++) {
                ctx.rotate(Math.PI / 8);
                ctx.beginPath();
                ctx.ellipse(0, -15 * scale, 6 * scale, 12 * scale, 0, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // 花心纹理
            ctx.fillStyle = '#d4ac0d';
            for(let i = 0; i < 8; i++) {
                const angle = (i * Math.PI * 2) / 8;
                const radius = 8 * scale;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                ctx.beginPath();
                ctx.arc(x, y, 2 * scale, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // 绘制薰衣草
        drawLavender(ctx) {
            const scale = this.size / 20;
            
            // 花穗
            ctx.fillStyle = '#bb8fce';
            ctx.beginPath();
            ctx.ellipse(0, -5 * scale, 3 * scale, 10 * scale, 0, 0, Math.PI * 2);
            ctx.fill();
            
            // 小花朵
            ctx.fillStyle = '#d2b4de';
            for(let i = 0; i < 6; i++) {
                const offsetY = -15 * scale + (i * 5 * scale);
                ctx.beginPath();
                ctx.arc(0, offsetY, 2.5 * scale, 0, Math.PI * 2);
                ctx.fill();
            }
            
            // 茎干
            ctx.fillStyle = '#27ae60';
            ctx.fillRect(-1 * scale, 0, 2 * scale, 25 * scale);
        }
    }

    // 渲染循环
    function render() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        // 更新和绘制花朵
        for(let i = flowers.length - 1; i >= 0; i--) {
            const flower = flowers[i];
            if(!flower.update()) {
                flowers.splice(i, 1);
            } else {
                flower.draw(context);
            }
        }
        
        requestAnimationFrame(render);
    }

    // 创建花朵
    function createFlower(type = null) {
        const flowerTypes = ['rose', 'cherry', 'sunflower', 'lavender'];
        const selectedType = type || flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
        flowers.push(new Flower(selectedType));
    }

    // 定期生成花朵 (情人节模式 - 主要生成玫瑰)
    setInterval(() => {
        const flowerCount = Math.floor(Math.random() * 2) + 1;
        for(let i = 0; i < flowerCount; i++) {
            setTimeout(() => createFlower('rose'), i * 500); // 默认生成玫瑰花
        }
    }, 5000);

    // 鼠标点击生成特殊花朵
    window.addEventListener('click', function(event) {
        if(Math.random() < 0.3) { // 30%概率生成花朵
            const flowerTypes = ['rose', 'cherry', 'sunflower', 'lavender'];
            const type = flowerTypes[Math.floor(Math.random() * flowerTypes.length)];
            const flower = new Flower(type);
            flower.x = event.clientX;
            flower.y = event.clientY;
            flower.size *= 1.5; // 点击生成的花朵更大
            flowers.push(flower);
        }
    });

    // 鼠标移动偶尔生成小花朵 (情人节模式 - 玫瑰花瓣)
    window.addEventListener('mousemove', function(event) {
        if(Math.random() < 0.005) { // 0.5%概率
            const flower = new Flower('rose'); // 生成玫瑰花瓣
            flower.x = event.clientX;
            flower.y = event.clientY;
            flower.size = Math.random() * 8 + 5; // 更小的花瓣
            flower.alpha = 0.6;
            flowers.push(flower);
        }
    });

    // 特殊节日模式 (情人节为默认模式)
    function checkSpecialDates() {
        const now = new Date();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        // 默认情人节模式 - 更密集的玫瑰雨
        setInterval(() => createFlower('rose'), 1500); // 从2秒缩短到1.5秒
        
        // 情人节当天超级加强效果
        if(month === 2 && day === 14) {
            setInterval(() => createFlower('rose'), 800); // 从1.5秒缩短到0.8秒
        }
        // 其他季节保持玫瑰主题
    }

    // 启动渲染和特殊日期检查
    render();
    checkSpecialDates();

    // 对外暴露控制函数
    window.FlowerSystem = {
        createFlower: createFlower,
        clearFlowers: () => { flowers = []; },
        setFlowerDensity: (density) => {
            // 可以调整花朵密度
        }
    };

})();