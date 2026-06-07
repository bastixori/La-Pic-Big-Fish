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

class BottomOctopus {
    constructor(ctx) {
        this.ctx = ctx;
        this.size = 120; // Tamaño adecuado
        this.time = Math.random() * 100;
        this.pulseSpeed = 0.005; // Movimiento sumamente lento (relajado, respirando)
    }

    update(width, height) {
        this.time += this.pulseSpeed;
        
        // Mantenerse centrado horizontalmente al fondo con un leve vaivén casi imperceptible
        this.x = width * 0.5 + Math.sin(this.time * 0.5) * 15;
        
        // Simular respiración lenta (sube y baja levemente en el fondo)
        const breath = Math.sin(this.time * 2.0) * 8;
        this.y = height - this.size * 0.35 + breath;
    }

    draw() {
        this.ctx.save();
        
        const size = this.size;
        const breathScale = 1 + Math.sin(this.time * 2.0) * 0.03;
        const width = size * breathScale;
        const height = size * 0.72 * breathScale;
        
        this.ctx.translate(this.x, this.y);
        
        // Rotación de balanceo muy lenta
        const tilt = Math.cos(this.time * 0.5) * 0.04;
        this.ctx.rotate(tilt);
        
        // Colores: Morado sumamente oscuro y realista
        const mainColor = 'rgba(25, 4, 38, 0.72)';
        
        // Dibujar 8 tentáculos detallados y extendidos que caen/descansan hacia abajo
        for (let i = 0; i < 8; i++) {
            // Distribuir ángulos hacia abajo
            const startAngle = (Math.PI / 10) * (i - 3.5);
            
            // Origen del tentáculo bajo la cabeza
            const originX = Math.cos(startAngle + Math.PI/2) * (width * 0.3);
            const originY = height * 0.25;
            
            // Generar la curva del tentáculo usando cinemática directa simplificada
            let points = [];
            let prevX = originX;
            let prevY = originY;
            points.push({x: prevX, y: prevY});
            
            const length = size * 2.0;
            const segmentCount = 10; // Más segmentos para mayor realismo y detalle
            const segmentLength = length / segmentCount;
            
            for (let j = 1; j <= segmentCount; j++) {
                // Ondulación lenta en reposo
                const wave = Math.sin(this.time * 2.5 + j * 0.45 + i * 0.8) * (8 + j * 1.5);
                const angle = startAngle + Math.PI/2 + (wave * Math.PI / 180);
                
                const segX = prevX + Math.cos(angle) * segmentLength;
                const segY = prevY + Math.sin(angle) * segmentLength;
                
                points.push({x: segX, y: segY});
                prevX = segX;
                prevY = segY;
            }
            
            // Dibujar el cuerpo cónico del tentáculo (grueso a delgado)
            for (let j = 0; j < points.length - 1; j++) {
                const p1 = points[j];
                const p2 = points[j+1];
                const t = j / (points.length - 1);
                const thickness = 15 * (1 - t * 0.82) + 2; // De 15px a 2.7px
                
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.strokeStyle = mainColor;
                this.ctx.lineWidth = thickness;
                this.ctx.lineCap = 'round';
                this.ctx.stroke();
                
                // Dibujar ventosas realistas (suction cups) en el costado exterior
                if (j > 0 && j % 1 === 0) {
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const len = Math.sqrt(dx*dx + dy*dy);
                    if (len > 0) {
                        // Vector normal
                        const nx = -dy / len;
                        const ny = dx / len;
                        
                        // Alternar ventosas a un lado del tentáculo
                        const side = i < 4 ? 1 : -1;
                        const cupOffset = thickness * 0.52;
                        const cupX = p1.x + nx * cupOffset * side;
                        const cupY = p1.y + ny * cupOffset * side;
                        const cupSize = (thickness * 0.36) + 1.2;
                        
                        // Ventosa exterior (cuerpo claro)
                        this.ctx.beginPath();
                        this.ctx.arc(cupX, cupY, cupSize, 0, Math.PI * 2);
                        this.ctx.fillStyle = 'rgba(110, 75, 140, 0.45)'; // Tono ventosa realista
                        this.ctx.fill();
                        
                        // Borde de la ventosa
                        this.ctx.strokeStyle = 'rgba(25, 4, 38, 0.35)';
                        this.ctx.lineWidth = 1;
                        this.ctx.stroke();
                    }
                }
            }
        }
        
        // Cabeza del pulpo (Mantle bulboso realista con sombreado degradado)
        const grad = this.ctx.createRadialGradient(-width*0.05, -height*0.2, 5, 0, 0, width * 0.65);
        grad.addColorStop(0, 'rgba(80, 25, 120, 0.75)'); // Destello de luz morado oscuro
        grad.addColorStop(0.5, mainColor);                 // Morado muy oscuro
        grad.addColorStop(1, 'rgba(15, 0, 25, 0.3)');     // Sombra periférica
        
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(0, -height*0.08, width / 2, Math.PI, 0, false);
        this.ctx.quadraticCurveTo(width / 2, height * 0.3, 0, height * 0.42);
        this.ctx.quadraticCurveTo(-width / 2, height * 0.3, -width / 2, -height*0.08);
        this.ctx.closePath();
        this.ctx.fill();
        
        // Delineado sutil del manto para definir volumen
        this.ctx.strokeStyle = 'rgba(10, 0, 18, 0.35)';
        this.ctx.lineWidth = 2.5;
        this.ctx.stroke();
        
        // Ojos realistas (pequeños, oscuros, semiocultos y con reflejo)
        this.ctx.fillStyle = 'rgba(10, 0, 18, 0.85)';
        this.ctx.beginPath();
        this.ctx.arc(-width * 0.22, height * 0.15, 4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(width * 0.22, height * 0.15, 4, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Brillo blanco en la pupila (reflejo de luz marina)
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.beginPath();
        this.ctx.arc(-width * 0.20, height * 0.13, 1.2, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.beginPath();
        this.ctx.arc(width * 0.24, height * 0.13, 1.2, 0, Math.PI * 2);
        this.ctx.fill();
        
        this.ctx.restore();
    }
}

// Se eliminó la clase OctopusBg ya que el usuario solicitó borrar el pulpo dorado/fosforescente.

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
        this.bottomOctopus = new BottomOctopus(this.ctx);
        
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
        
        this.bottomOctopus.update(this.width, this.height);
        this.bottomOctopus.draw();
        
        this.school.update(this.width, this.height);
        this.school.draw();
        
        this.animationFrameId = requestAnimationFrame(() => this.loop());
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new UnderwaterBackground();
});
