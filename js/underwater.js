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
        this.size = 140; // Tamaño realista
        this.time = 0;
        
        // Posición inicial
        this.x = window.innerWidth * 0.5;
        this.y = window.innerHeight * 0.7;
        
        // Dirección de nado (vector unitario)
        this.angle = -Math.PI / 2; // Nadando hacia arriba por defecto
        this.speed = 0;
    }

    update(width, height) {
        this.time += 0.006; // Nado lento y realista
        
        // Ciclo de propulsión de 0 a 2PI
        const cycle = (this.time * 2.8) % (Math.PI * 2);
        
        // Fases: propulsión (cuando cycle está entre 0 y PI) y planeo (entre PI y 2PI)
        let isPropelling = cycle < Math.PI;
        let intensity = isPropelling ? Math.sin(cycle) : 0;
        
        // Velocidad: aumenta durante la propulsión, decae lentamente en el planeo
        if (isPropelling) {
            this.speed = 0.25 + intensity * 0.65;
        } else {
            this.speed *= 0.985; // Resistencia del agua (decelera)
        }
        
        // Deriva en X e Y simulando nado libre diagonal muy lento
        // Cambiamos levemente la dirección del nado a lo largo del tiempo
        const driftAngle = Math.sin(this.time * 0.2) * 0.5 - Math.PI / 2; // Vaivén vertical/diagonal
        this.angle = driftAngle;
        
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        
        // Reposicionar si sale de los límites (reaparece desde abajo)
        if (this.y < -this.size * 2) {
            this.y = height + this.size;
            this.x = Math.random() * (width * 0.6) + width * 0.2;
        }
        if (this.x < -this.size * 2) {
            this.x = width + this.size;
        } else if (this.x > width + this.size * 2) {
            this.x = -this.size;
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(this.x, this.y);
        
        // Orientar el cuerpo en la dirección del nado (con rotación)
        this.ctx.rotate(this.angle + Math.PI / 2);
        
        const cycle = (this.time * 2.8) % (Math.PI * 2);
        const isPropelling = cycle < Math.PI;
        const intensity = isPropelling ? Math.sin(cycle) : 0;
        
        // Contracción del cuerpo: el manto se vuelve más angosto durante la propulsión
        const scaleX = 1 - intensity * 0.22;
        const scaleY = 1 + intensity * 0.15;
        
        const width = this.size * 0.65 * scaleX;
        const height = this.size * 0.8 * scaleY;
        
        // Silueta morada sumamente oscura y profunda del abismo
        const silhouetteColor = 'rgba(12, 3, 20, 0.82)';
        this.ctx.fillStyle = silhouetteColor;
        this.ctx.strokeStyle = 'rgba(8, 2, 14, 0.4)';
        this.ctx.lineWidth = 1;
        
        // 1. Dibujar tentáculos primero (se arrastran detrás de la cabeza)
        for (let i = 0; i < 8; i++) {
            // Distribución de ángulos iniciales de los tentáculos
            const startAngle = (Math.PI / 9) * (i - 3.5);
            
            // Punto de origen del tentáculo en la base de la cabeza
            const originX = Math.cos(startAngle + Math.PI/2) * (width * 0.35);
            const originY = height * 0.1;
            
            let points = [];
            let prevX = originX;
            let prevY = originY;
            points.push({x: prevX, y: prevY});
            
            const length = this.size * 2.4;
            const segmentCount = 14; // Alta definición de curvatura
            const segmentLength = length / segmentCount;
            
            // Factor de contracción: los tentáculos se cierran en un cono durante la propulsión,
            // y se expanden ampliamente en forma de paracaídas durante el planeo.
            const spread = isPropelling ? (0.2 + (1 - intensity) * 0.8) : (1.0 + Math.sin(cycle) * 0.4);
            
            for (let j = 1; j <= segmentCount; j++) {
                // Ondulación en base a propagación física (frente de onda que viaja del cuerpo a la punta)
                const wave = Math.sin(this.time * 4.5 - j * 0.38 + i * 0.7) * (6 + j * 1.6 * (2 - spread));
                const angle = startAngle * spread + Math.PI/2 + (wave * Math.PI / 180);
                
                // Si está propulsándose, las puntas se curvan levemente hacia adentro
                const forceAngle = angle + (isPropelling ? (Math.sin(this.time * 5 + j * 0.2) * 0.05) : 0);
                
                const segX = prevX + Math.cos(forceAngle) * segmentLength;
                const segY = prevY + Math.sin(forceAngle) * segmentLength;
                
                points.push({x: segX, y: segY});
                prevX = segX;
                prevY = segY;
            }
            
            // Dibujar el tentáculo cónico (silueta morada oscura de grueso a delgado)
            for (let j = 0; j < points.length - 1; j++) {
                const p1 = points[j];
                const p2 = points[j+1];
                const t = j / (points.length - 1);
                
                // Conicidad: empieza en 16px y termina en 1.5px
                const thickness = 15.5 * (1 - t * 0.86) + 1.5;
                
                this.ctx.beginPath();
                this.ctx.moveTo(p1.x, p1.y);
                this.ctx.lineTo(p2.x, p2.y);
                this.ctx.strokeStyle = silhouetteColor;
                this.ctx.lineWidth = thickness;
                this.ctx.lineCap = 'round';
                this.ctx.stroke();
                
                // Ventosas (suction cups) dibujadas sutilmente a lo largo de un lado como parte de la silueta
                if (j > 0 && j % 1 === 0) {
                    const dx = p2.x - p1.x;
                    const dy = p2.y - p1.y;
                    const len = Math.sqrt(dx*dx + dy*dy);
                    if (len > 0) {
                        const nx = -dy / len;
                        const ny = dx / len;
                        const side = i < 4 ? 1 : -1;
                        
                        // Posicionar ventosa en el costado del tentáculo
                        const cupOffset = thickness * 0.48;
                        const cupX = p1.x + nx * cupOffset * side;
                        const cupY = p1.y + ny * cupOffset * side;
                        const cupSize = (thickness * 0.28) + 0.6;
                        
                        this.ctx.beginPath();
                        this.ctx.arc(cupX, cupY, cupSize, 0, Math.PI * 2);
                        this.ctx.fillStyle = 'rgba(20, 6, 34, 0.82)'; // Silueta de ventosa
                        this.ctx.fill();
                    }
                }
            }
        }
        
        // 2. Dibujar el Manto/Cabeza (Silueta limpia morada sumamente oscura)
        this.ctx.fillStyle = silhouetteColor;
        this.ctx.beginPath();
        // El domo del pulpo (cabeza bulbosa real de cefalópodo)
        this.ctx.arc(0, -height * 0.1, width / 2, Math.PI, 0, false);
        // Semicuerpo que conecta con los tentáculos
        this.ctx.quadraticCurveTo(width / 2, height * 0.35, 0, height * 0.48);
        this.ctx.quadraticCurveTo(-width / 2, height * 0.35, -width / 2, -height * 0.1);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
        
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
