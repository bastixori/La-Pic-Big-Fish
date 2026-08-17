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
        this.ctx.fillStyle = 'rgba(232, 160, 32, 0.02)'; // Tono dorado sumamente tenue y lejano
        
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
            rayGrad.addColorStop(0, 'rgba(255, 220, 100, 0.12)'); // Sol dorado muy difuso y tenue
            rayGrad.addColorStop(0.3, 'rgba(232, 160, 32, 0.04)'); // Tono dorado de transición casi invisible
            rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            this.ctx.fillStyle = rayGrad;
            this.ctx.fill();
        }
        
        this.ctx.restore();
    }
}

class FishSchool {
    constructor(ctx, count = 55) {
        this.ctx = ctx;
        this.count = count;
        this.fishes = [];
        this.schoolX = -300;
        this.schoolY = 220;
        this.targetY = 220;
        this.speed = 2.1;
        this.time = 0;
        
        this.init();
    }

    init() {
        for (let i = 0; i < this.count; i++) {
            // Peces MUY grandes y altamente asimétricos
            const size = Math.random() * 70 + 45; // 45px a 115px — peces enormes y dominantes
            const depth = (size - 45) / 70; // profundidad para opacidad
            
            this.fishes.push({
                offsetX: Math.random() * 700 - 350,  // Dispersión muy amplia
                offsetY: Math.random() * 340 - 170,
                size: size,
                aspect: Math.random() * 0.18 + 0.32,         // grosor muy variable (delgados a gordos)
                dorsalFactor: Math.random() * 0.85 + 1.1,    // lomo MUY asimétrico y pronunciado
                bellyFactor: Math.random() * 0.75 + 0.75,    // vientre MUY asimétrico
                tailUpperScale: Math.random() * 0.7 + 1.1,   // lóbulo dorsal cola mucho más largo
                tailLowerScale: Math.random() * 0.55 + 0.6,  // lóbulo ventral cola mucho más corto
                tailSkew: Math.random() * 0.4 - 0.2,         // sesgo lateral de la cola
                noseSharpness: Math.random() * 0.6 + 0.7,    // hocico puntiagudo vs redondeado
                bodyHump: Math.random() * 0.35 + 0.05,       // joroba dorsal adicional
                opacity: 0.28 + depth * 0.42,
                speedOffset: Math.random() * 0.25 + 0.88,
                wiggleSpeed: Math.random() * 0.10 + 0.07,
                phase: Math.random() * Math.PI * 2
            });
        }
    }

    update(width, height) {
        this.time += 0.01;
        
        // Mover el centro del cardumen horizontalmente
        this.schoolX += this.speed;
        
        // Patrón de nado ondulante en Y usando seno
        this.schoolY = this.targetY + Math.sin(this.time * 1.4) * 60;
        
        // Si el cardumen sale completamente de la pantalla por la derecha
        if (this.schoolX > width + 300) {
            this.schoolX = -300;
            // Nueva altura y velocidad aleatoria
            this.targetY = Math.random() * (height * 0.6) + height * 0.15;
            this.speed = Math.random() * 1.0 + 1.9;
        }
    }

    draw() {
        this.ctx.save();
        
        this.fishes.forEach(fish => {
            const x = this.schoolX + fish.offsetX + Math.sin(this.time * 2 + fish.phase) * 14;
            const y = this.schoolY + fish.offsetY + Math.cos(this.time * 1.5 + fish.phase) * 7;
            
            this.ctx.save();
            this.ctx.translate(x, y);
            
            // Ángulo de nado según ondulación
            const angle = Math.atan2(Math.cos(this.time * 1.4) * 60 * 0.025, this.speed);
            this.ctx.rotate(angle);
            
            const len = fish.size;
            const h = len * fish.aspect;
            const df = fish.dorsalFactor;
            const bf = fish.bellyFactor;
            const hump = fish.bodyHump;
            const nose = fish.noseSharpness;
            const wiggle = Math.sin(this.time * 14 * fish.wiggleSpeed + fish.phase) * (len * 0.26);
            
            const primaryColor = `rgba(0, 201, 177, ${fish.opacity})`;
            const softColor    = `rgba(0, 220, 195, ${fish.opacity * 0.75})`;
            
            // 1. Aleta Dorsal extendida con joroba variable
            this.ctx.fillStyle = softColor;
            this.ctx.beginPath();
            this.ctx.moveTo(len * 0.22, -h * df * 0.62);
            this.ctx.bezierCurveTo(
                len * 0.05, -h * df * (1.7 + hump * 2.5),
                -len * 0.18, -h * df * (1.95 + hump * 2.2),
                -len * 0.52, -h * df * 0.35
            );
            this.ctx.quadraticCurveTo(-len * 0.32, -h * df * 0.52, len * 0.22, -h * df * 0.62);
            this.ctx.closePath();
            this.ctx.fill();

            // 2. Aleta Ventral / Pélvica muy asimétrica
            this.ctx.fillStyle = softColor;
            this.ctx.beginPath();
            this.ctx.moveTo(-len * 0.05, h * bf * 0.68);
            this.ctx.bezierCurveTo(
                -len * 0.22, h * bf * 1.6,
                -len * 0.48, h * bf * 1.7,
                -len * 0.55, h * bf * 0.38
            );
            this.ctx.closePath();
            this.ctx.fill();

            // 3. Cola enormemente asimétrica con sesgo
            const tailBaseX  = -len * 0.82;
            const tailBaseY  = wiggle * 0.35;
            const upperWiggle = wiggle * 1.5;
            const lowerWiggle = wiggle * 0.75;
            const skewY = h * fish.tailSkew * 2.5;

            this.ctx.fillStyle = primaryColor;
            this.ctx.beginPath();
            this.ctx.moveTo(tailBaseX, -h * 0.2 + tailBaseY);
            this.ctx.bezierCurveTo(
                tailBaseX - len * 0.28, -h * 0.9  + upperWiggle + skewY,
                tailBaseX - len * 0.72, -h * 1.6  * fish.tailUpperScale + upperWiggle + skewY,
                tailBaseX - len * 0.96, -h * 1.35 * fish.tailUpperScale + upperWiggle + skewY
            );
            this.ctx.bezierCurveTo(
                tailBaseX - len * 0.7,  -h * 0.15 + tailBaseY + skewY * 0.3,
                tailBaseX - len * 0.55,  h * 0.18 + tailBaseY,
                tailBaseX - len * 0.82,  h * 1.05 * fish.tailLowerScale + lowerWiggle
            );
            this.ctx.bezierCurveTo(
                tailBaseX - len * 0.58,  h * 1.2  * fish.tailLowerScale + lowerWiggle,
                tailBaseX - len * 0.28,  h * 0.5  + lowerWiggle,
                tailBaseX,               h * 0.16 + tailBaseY
            );
            this.ctx.closePath();
            this.ctx.fill();

            // 4. Cuerpo Principal — silueta muy asimétrica con hocico variable
            this.ctx.fillStyle = primaryColor;
            this.ctx.beginPath();
            this.ctx.moveTo(len * nose, 0);
            this.ctx.bezierCurveTo(
                len * (nose - 0.5), -h * df * (0.85 + hump * 1.8),
                -len * 0.1,         -h * df * (1.12 + hump * 0.8),
                tailBaseX,          -h * 0.2 + tailBaseY
            );
            this.ctx.lineTo(tailBaseX, h * 0.16 + tailBaseY);
            this.ctx.bezierCurveTo(
                -len * 0.3,            h * bf * 0.95,
                len * (nose - 0.65),   h * bf * (1.2 + hump * 0.5),
                len * nose,            0
            );
            this.ctx.closePath();
            this.ctx.fill();

            // 5. Aleta Pectoral grande
            const pecFlutter = Math.sin(this.time * 16 * fish.wiggleSpeed + fish.phase) * 0.22;
            this.ctx.save();
            this.ctx.translate(len * 0.15, h * 0.15);
            this.ctx.rotate(0.28 + pecFlutter);
            this.ctx.fillStyle = `rgba(0, 225, 200, ${fish.opacity * 0.85})`;
            this.ctx.beginPath();
            this.ctx.moveTo(0, 0);
            this.ctx.bezierCurveTo(-len * 0.25, h * 0.5, -len * 0.5, h * 0.9, -len * 0.55, h * 0.28);
            this.ctx.closePath();
            this.ctx.fill();
            this.ctx.restore();

            // 6. Aleta Anal asimétrica
            this.ctx.fillStyle = `rgba(0, 215, 190, ${fish.opacity * 0.7})`;
            this.ctx.beginPath();
            this.ctx.moveTo(-len * 0.55, h * bf * 0.45);
            this.ctx.bezierCurveTo(
                -len * 0.68, h * bf * 1.15,
                -len * 0.78, h * bf * 1.25,
                -len * 0.82, h * 0.16 + tailBaseY
            );
            this.ctx.closePath();
            this.ctx.fill();

            // 7. Ojo prominente con brillo
            const eyeX = len * (nose - 0.42);
            const eyeY = -h * df * 0.25;
            const eyeRadius = Math.max(3, len * 0.10);

            this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1, fish.opacity * 1.6)})`;
            this.ctx.beginPath();
            this.ctx.arc(eyeX, eyeY, eyeRadius, 0, Math.PI * 2);
            this.ctx.fill();

            // Pupila oscura interior
            this.ctx.fillStyle = 'rgba(10, 30, 40, 0.75)';
            this.ctx.beginPath();
            this.ctx.arc(eyeX + eyeRadius * 0.25, eyeY, eyeRadius * 0.48, 0, Math.PI * 2);
            this.ctx.fill();

            // 7. Línea de Branquia / Opérculo
            this.ctx.strokeStyle = `rgba(0, 240, 210, ${fish.opacity * 0.55})`;
            this.ctx.lineWidth = Math.max(1, len * 0.035);
            this.ctx.beginPath();
            this.ctx.arc(len * 0.32, -h * 0.06, h * 0.46, Math.PI * 0.65, Math.PI * 1.45, false);
            this.ctx.stroke();
            
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
