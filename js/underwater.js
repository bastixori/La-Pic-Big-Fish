/**
 * La Picá Big Fish - Fondo Marino Dinámico (v1.1)
 * Animación fluida de fondo mediante HTML5 Canvas y JS autónomo.
 */

class SunRays {
    constructor(ctx) {
        this.ctx = ctx;
        this.angleOffset = 0;
    }

    update() {
        // Oscilar lentamente el ángulo de los rayos
        this.angleOffset += 0.002;
    }

    draw(width, height) {
        this.ctx.save();
        
        // Crear gradiente radial desde el centro-superior
        const startX = width * 0.4;
        const startY = -50;
        
        // Dibujar múltiples rayos
        const rayCount = 8;
        this.ctx.fillStyle = 'rgba(232, 160, 32, 0.08)'; // Tono dorado suave solarizado
        
        for (let i = 0; i < rayCount; i++) {
            const angle = (i * (Math.PI * 2 / rayCount)) / 4 + Math.sin(this.angleOffset + i) * 0.05 + 0.5;
            const rayWidth = 60 + Math.sin(this.angleOffset * 2 + i) * 20;
            
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            
            // Extremos del rayo en la parte inferior
            const endX1 = startX + Math.cos(angle - 0.1) * (height * 1.5);
            const endY1 = startY + Math.sin(angle - 0.1) * (height * 1.5);
            const endX2 = startX + Math.cos(angle + 0.1) * (height * 1.5);
            const endY2 = startY + Math.sin(angle + 0.1) * (height * 1.5);
            
            this.ctx.lineTo(endX1, endY1);
            this.ctx.lineTo(endX2, endY2);
            this.ctx.closePath();
            
            // Rellenar con un gradiente lineal para que se desvanezca hacia abajo
            const rayGrad = this.ctx.createLinearGradient(startX, startY, (endX1 + endX2) / 2, (endY1 + endY2) / 2);
            rayGrad.addColorStop(0, 'rgba(255, 210, 80, 0.38)'); // Sol dorado más brillante
            rayGrad.addColorStop(0.3, 'rgba(232, 160, 32, 0.18)'); // Tono dorado de transición
            rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = rayGrad;
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
}

class FishSchool {
    constructor(ctx, count = 25) {
        this.ctx = ctx;
        this.count = count;
        this.fishes = [];
        this.schoolX = -100;
        this.schoolY = 200;
        this.targetY = 200;
        this.speed = 2.4; // Más rápido como se solicitó
        this.time = 0;
        
        this.init();
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            this.fishes.push({
                offsetX: Math.random() * 260 - 130, // Mayor dispersión horizontal para el cardumen de 90 peces
                offsetY: Math.random() * 160 - 80,  // Mayor dispersión vertical
                size: Math.random() * 13 + 6,       // Mayor variedad de tamaños
                speedOffset: Math.random() * 0.2 + 0.9,
                wiggleSpeed: Math.random() * 0.15 + 0.1,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    update(width, height) {
        this.time += 0.01;
        
        // Mover el centro del cardumen horizontalmente de izquierda a derecha
        this.schoolX += this.speed;
        
        // Patrón de nado ondulante en Y usando seno
        this.schoolY = this.targetY + Math.sin(this.time * 1.5) * 50;
        
        // Si el cardumen sale completamente de la pantalla por la derecha
        if (this.schoolX > width + 150) {
            this.schoolX = -150;
            // Nueva altura y dirección aleatoria
            this.targetY = Math.random() * (height * 0.6) + height * 0.15;
            this.speed = Math.random() * 1.2 + 2.0; // Velocidad aleatoria más rápida
        }
    }

    draw() {
        this.ctx.save();
        
        this.fishes.forEach(fish => {
            const x = this.schoolX + fish.offsetX + Math.sin(this.time * 2 + fish.phase) * 10;
            const y = this.schoolY + fish.offsetY + Math.cos(this.time * 1.5 + fish.phase) * 5;
            
            // Dibujar pez individual
            this.ctx.save();
            this.ctx.translate(x, y);
            
            // Determinar ángulo de nado basado en el movimiento de onda en Y
            const angle = Math.atan2(Math.cos(this.time * 1.5) * 50 * 0.03, this.speed);
            this.ctx.rotate(angle);
            
            // Color turquesa brillante (de la imagen del usuario, con excelente opacidad)
            this.ctx.fillStyle = 'rgba(0, 201, 177, 0.45)';
            
            // Cuerpo del pez (Elipse)
            this.ctx.beginPath();
            this.ctx.ellipse(0, 0, fish.size, fish.size / 2.5, 0, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Cola oscilante (Triángulo)
            const wiggle = Math.sin(this.time * 15 * fish.wiggleSpeed + fish.phase) * (fish.size * 0.3);
            this.ctx.beginPath();
            this.ctx.moveTo(-fish.size, 0);
            this.ctx.lineTo(-fish.size - fish.size / 2, -fish.size / 2.5 + wiggle);
            this.ctx.lineTo(-fish.size - fish.size / 2, fish.size / 2.5 + wiggle);
            this.ctx.closePath();
            this.ctx.fill();
            
            // Ojo pequeño brillante
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
            this.ctx.beginPath();
            this.ctx.arc(fish.size * 0.4, -fish.size * 0.08, 1.5, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });
        
        this.ctx.restore();
    }
}

class Jellyfish {
    constructor(ctx) {
        this.ctx = ctx;
        this.reset();
        // Empezar en un lugar aleatorio
        this.y = Math.random() * 500 + 200;
    }

    reset() {
        this.x = Math.random() * window.innerWidth;
        this.y = window.innerHeight + 100;
        this.size = Math.random() * 20 + 25; // Ancho del cuerpo
        this.speedY = -(Math.random() * 0.3 + 0.3); // Sube despacio
        this.time = Math.random() * 100;
        this.pulseSpeed = Math.random() * 0.02 + 0.015;
    }

    update(width, height) {
        this.time += this.pulseSpeed;
        
        // Movimiento vertical de pulso (propulsión de medusa)
        const pulse = Math.sin(this.time * 5);
        const currentSpeed = this.speedY * (1.5 + pulse); // Acelera en la contracción
        this.y += currentSpeed;
        
        // Deriva lateral suave
        this.x += Math.sin(this.time) * 0.2;
        
        // Si sale de la pantalla por arriba
        if (this.y < -100) {
            this.reset();
        }
    }

    draw() {
        this.ctx.save();
        
        const pulseScale = 1 + Math.sin(this.time * 5) * 0.15;
        const width = this.size * pulseScale;
        const height = this.size * 0.75;
        
        this.ctx.translate(this.x, this.y);
        
        // Dibujar tentáculos ondulantes
        this.ctx.strokeStyle = 'rgba(255, 0, 180, 0.15)';
        this.ctx.lineWidth = 1.5;
        
        for (let i = -2; i <= 2; i++) {
            const startX = (width / 4) * i;
            this.ctx.beginPath();
            this.ctx.moveTo(startX, height / 2);
            
            // Dibujar tentáculo con curvas de Bézier
            let prevX = startX;
            let prevY = height / 2;
            for (let j = 1; j <= 4; j++) {
                const segY = prevY + 15;
                const segX = startX + Math.sin(this.time * 3 + j + i) * 6;
                this.ctx.lineTo(segX, segY);
                prevX = segX;
                prevY = segY;
            }
            this.ctx.stroke();
        }
        
        // Cuerpo de la medusa (Semicírculo / Campana translúcida multicolor)
        const grad = this.ctx.createRadialGradient(0, -height/4, 2, 0, 0, width);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        grad.addColorStop(0.5, 'rgba(255, 0, 180, 0.25)'); // Magenta
        grad.addColorStop(0.8, 'rgba(0, 201, 177, 0.20)'); // Turquesa
        grad.addColorStop(1, 'rgba(0, 201, 177, 0.02)');
        
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, width / 2, Math.PI, 0, false);
        this.ctx.quadraticCurveTo(width / 2, height / 2, 0, height / 3);
        this.ctx.quadraticCurveTo(-width / 2, height / 2, -width / 2, 0);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

class OctopusBg {
    constructor(ctx) {
        this.ctx = ctx;
        this.active = false;
        this.reset();
        
        // Aparece por primera vez a los 10 segundos para verificación rápida
        setTimeout(() => {
            this.startAppearance();
        }, 10000);
    }

    reset() {
        this.active = false;
        this.x = -200;
        this.y = window.innerHeight * 0.7;
        this.targetX = window.innerWidth + 200;
        this.size = 75; // Un poco más grande para mejor visualización
        this.time = 0;
        this.speedX = 1.4; // Más dinámico
        
        // Programar siguiente aparición en exactamente 1 minuto (60000 ms)
        setTimeout(() => {
            this.startAppearance();
        }, 60000);
    }

    startAppearance() {
        this.active = true;
        this.x = -150;
        this.y = window.innerHeight * (Math.random() * 0.4 + 0.4); // Zona central/baja
        this.speedX = Math.random() * 0.5 + 0.8;
    }

    update(width, height) {
        if (!this.active) return;
        
        this.time += 0.02;
        
        // Avance en X pulsado (se impulsa y frena)
        const pulse = Math.max(0, Math.sin(this.time * 4.5));
        this.x += this.speedX * (0.3 + pulse * 1.8);
        
        // Movimiento vertical sutil
        this.y += Math.sin(this.time * 2) * 0.6;
        
        // Si sale de la pantalla, se resetea y espera al siguiente intervalo
        if (this.x > width + 200) {
            this.reset();
        }
    }

    draw() {
        if (!this.active) return;
        
        this.ctx.save();
        
        // Configurar sombra brillante dorada fosforescente para el borde
        this.ctx.shadowColor = 'rgba(232, 160, 32, 0.95)';
        this.ctx.shadowBlur = 15;
        
        this.ctx.translate(this.x, this.y);
        
        // Rotar levemente según el impulso
        const pulse = Math.sin(this.time * 4.5);
        const angle = Math.PI / 10 + pulse * 0.05;
        this.ctx.rotate(angle);
        
        const size = this.size;
        
        // Colores: Cuerpo morado translúcido, Borde dorado fosforescente
        const bodyColor = 'rgba(150, 0, 220, 0.35)';
        const borderColor = 'rgba(232, 160, 32, 0.95)';
        
        // 8 Tentáculos que ondean
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 5;
        this.ctx.lineCap = 'round';
        
        for (let i = 0; i < 8; i++) {
            const startAngle = (Math.PI / 6) * (i - 3.5);
            this.ctx.beginPath();
            
            // Punto de origen en la parte trasera de la cabeza
            const originX = -size * 0.3;
            const originY = Math.sin(startAngle) * (size * 0.2);
            
            this.ctx.moveTo(originX, originY);
            
            // Trayectoria del tentáculo
            let prevX = originX;
            let prevY = originY;
            const length = size * 1.5;
            
            for (let j = 1; j <= 5; j++) {
                const segX = originX - (length / 5) * j;
                const segY = originY + Math.sin(this.time * 5 + j + i) * (8 + pulse * 6);
                this.ctx.lineTo(segX, segY);
                prevX = segX;
                prevY = segY;
            }
            
            // Dibujar relleno morado del tentáculo primero
            this.ctx.save();
            this.ctx.shadowBlur = 0; // Desactivar sombra para relleno para evitar artefactos oscuros
            this.ctx.strokeStyle = bodyColor;
            this.ctx.lineWidth = 8;
            this.ctx.stroke();
            this.ctx.restore();
            
            // Dibujar el borde dorado con sombra
            this.ctx.stroke();
        }
        
        // Cabeza del pulpo (Gran elipse bulbosa)
        const grad = this.ctx.createRadialGradient(size/4, -size/10, 2, 0, 0, size);
        grad.addColorStop(0, 'rgba(220, 100, 255, 0.6)'); // Centro morado brillante
        grad.addColorStop(0.7, 'rgba(150, 0, 220, 0.4)'); // Cuerpo morado
        grad.addColorStop(1, 'rgba(100, 0, 150, 0.1)');
        
        // Rellenar cabeza
        this.ctx.save();
        this.ctx.shadowBlur = 0; // Sin sombra en relleno
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size, size / 1.6, 0, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
        
        // Delinear la cabeza con borde dorado brillante
        this.ctx.strokeStyle = borderColor;
        this.ctx.lineWidth = 4;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, size, size / 1.6, 0, 0, Math.PI * 2);
        this.ctx.stroke();
        
        this.ctx.restore();
    }
}

class UnderwaterBackground {
    constructor() {
        this.canvas = document.getElementById('underwater-canvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.animationFrameId = null;
        this.isVisible = true;
        
        // Inicializar elementos
        this.sunRays = new SunRays(this.ctx);
        this.school = new FishSchool(this.ctx, 90); // El triple de peces (90)
        this.jellyfishList = [
            new Jellyfish(this.ctx),
            new Jellyfish(this.ctx),
            new Jellyfish(this.ctx)
        ];
        this.octopus = new OctopusBg(this.ctx);
        
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        
        // Controlar visibilidad de pestaña para suspender rendering
        document.addEventListener('visibilitychange', () => {
            this.isVisible = !document.hidden;
            if (this.isVisible) {
                this.loop();
            } else {
                if (this.animationFrameId) {
                    cancelAnimationFrame(this.animationFrameId);
                }
            }
        });
        
        // Iniciar loop de animación
        this.loop();
    }

    resize() {
        const dpr = window.devicePixelRatio || 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        
        // Escalar el contexto según el ratio del dispositivo
        this.ctx.scale(dpr, dpr);
    }

    loop() {
        if (!this.isVisible) return;
        
        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // Actualizar y dibujar elementos
        this.sunRays.update();
        this.sunRays.draw(this.width, this.height);
        
        this.jellyfishList.forEach(jelly => {
            jelly.update(this.width, this.height);
            jelly.draw();
        });
        
        this.octopus.update(this.width, this.height);
        this.octopus.draw();
        
        this.school.update(this.width, this.height);
        this.school.draw();
        
        this.animationFrameId = requestAnimationFrame(() => this.loop());
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new UnderwaterBackground();
});
