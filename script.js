const messages = [
    "İyi ki varsın  çünkü her gülüşün içimi ısıtıyor.",
    "İyi ki varsın çünkü seninle konuşurken zaman duruyor.",
    "İyi ki varsın çünkü en kötü günümü bile güzelleştiriyorsun.",
    "İyi ki varsın çünkü seninle her şey daha anlamlı.",
    "İyi ki varsın çünkü bana huzur veriyorsun.",
    "İyi ki varsın çünkü beni benden daha iyi tanıyorsun.",
    "İyi ki varsın çünkü varlığınla hayatıma renk katıyorsun.",
    "İyi ki varsın çünkü sesini duymak bile beni mutlu etmeye yetiyor.",
    "İyi ki varsın çünkü kalbimin en güzel köşesi senin.",
    "İyi ki varsın çünkü her sabah uyanma sebebimsin.",
    "İyi ki varsın çünkü mesafeler sevgimize engel değil.",
    "İyi ki varsın çünkü seninle her an bir macera.",
];

const jar = document.getElementById('unit-jar');
const messageCard = document.getElementById('unit-message');
const messageText = document.getElementById('message-text');
const closeBtn = document.getElementById('unit-close');

// Confetti Canvas
const confettiCanvas = document.getElementById('confetti-canvas');
const ctxConfetti = confettiCanvas.getContext('2d');

// Flower Canvas
const flowerCanvas = document.getElementById('flower-canvas');
const ctxFlower = flowerCanvas.getContext('2d');

let confetti = [];
let animationId;

// Resize canvases
function resizeCanvas() {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    flowerCanvas.width = window.innerWidth;
    flowerCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- Confetti System ---
class Particle {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 10 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = `hsl(${Math.random() * 360}, 100%, 70%)`;
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
    }
    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;
    }
    draw() {
        ctxConfetti.save();
        ctxConfetti.translate(this.x, this.y);
        ctxConfetti.rotate(this.rotation * Math.PI / 180);
        ctxConfetti.fillStyle = this.color;
        ctxConfetti.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctxConfetti.restore();
    }
}

function startConfetti() {
    if (animationId) cancelAnimationFrame(animationId);
    confetti = [];
    for (let i = 0; i < 100; i++) {
        confetti.push(new Particle());
    }
    animateConfetti();
}

function animateConfetti() {
    ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((p, index) => {
        p.update();
        p.draw();
        if (p.y > confettiCanvas.height) confetti.splice(index, 1);
    });
    if (confetti.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    } else {
        ctxConfetti.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
}

// Improved Flower System
const flowers = [];

function initFlowers() {
    const bouquetCount = 40; // More flowers to fill screen
    for (let i = 0; i < bouquetCount; i++) {
        flowers.push({
            // Distribute across the entire width
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            // Varied heights, some shorter, some taller
            height: window.innerHeight * (0.3 + Math.random() * 0.5),
            // Thinner, more delicate stems
            width: Math.random() * 1.5 + 0.5,
            progress: 0,
            // Slower, more gentle growth
            speed: Math.random() * 0.003 + 0.001,
            // More natural curves
            curve: (Math.random() - 0.5) * 150,
            hue: Math.random() * 20 + 345, // Red roses
            leafs: []
        });
    }
    animateFlowers();
}


function animateFlowers() {
    ctxFlower.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);

    let growing = false;

    flowers.forEach(f => {
        if (f.progress < 1) {
            f.progress += f.speed;
            growing = true;
        }

        // Calculate Tip Position
        const currentH = f.height * f.progress;
        const tipX = f.x + Math.sin(f.progress * Math.PI) * f.curve;
        const tipY = f.y - currentH;

        // Draw Stem
        ctxFlower.beginPath();
        ctxFlower.moveTo(f.x, f.y);
        ctxFlower.quadraticCurveTo(f.x, f.y - currentH / 2, tipX, tipY);
        ctxFlower.strokeStyle = '#2d6a4f'; // Dark green stem
        ctxFlower.lineWidth = f.width;
        ctxFlower.stroke();

        // Draw Leafs (simplified)
        if (f.progress > 0.3) {
            // Left leaf
            ctxFlower.beginPath();
            const leafX = f.x + Math.sin(0.3 * Math.PI) * f.curve;
            const leafY = f.y - f.height * 0.3;
            ctxFlower.ellipse(leafX - 10, leafY, 10, 5, -0.5, 0, Math.PI * 2);
            ctxFlower.fillStyle = '#40916c';
            ctxFlower.fill();
        }
        if (f.progress > 0.6) {
            // Right leaf
            ctxFlower.beginPath();
            const leafX = f.x + Math.sin(0.6 * Math.PI) * f.curve;
            const leafY = f.y - f.height * 0.6;
            ctxFlower.ellipse(leafX + 10, leafY, 8, 4, 0.5, 0, Math.PI * 2);
            ctxFlower.fillStyle = '#40916c';
            ctxFlower.fill();
        }

        // Draw Flower Head (Procedural Rose)
        if (f.progress > 0.8) { // Start blooming a bit earlier for smoother transition
            const bloomProgress = (f.progress - 0.8) * 5; // Scale 0.2 progress to 0-1
            const maxRadius = 25; // Slightly larger for better detail
            const currentRadius = maxRadius * Math.min(1, bloomProgress);

            ctxFlower.save();
            ctxFlower.translate(tipX, tipY);

            // Glow Effect
            ctxFlower.shadowBlur = 15;
            ctxFlower.shadowColor = `hsl(${f.hue}, 100%, 75%)`;

            // Draw multiple layers of petals to form a rose
            const layers = 5;
            for (let i = 0; i < layers; i++) {
                // Determine how open this layer is based on bloom progress
                // Outer layers open first
                const layerProgress = Math.min(1, bloomProgress * 1.5 - (i * 0.1));
                if (layerProgress <= 0) continue;

                const petalCount = 3 + i; // More petals in outer layers
                const layerRadius = currentRadius * (0.2 + i * 0.18);

                for (let j = 0; j < petalCount; j++) {
                    ctxFlower.beginPath();
                    // Spiral rotation + petal offset to create overlapping effect
                    const angle = (j * (Math.PI * 2) / petalCount) + (i * 0.5);

                    const px = Math.cos(angle) * layerRadius * 0.5;
                    const py = Math.sin(angle) * layerRadius * 0.5;

                    ctxFlower.arc(px, py, layerRadius * 0.6, 0, Math.PI * 2);

                    // Gradient for depth
                    const gradient = ctxFlower.createRadialGradient(px, py, 0, px, py, layerRadius * 0.6);
                    gradient.addColorStop(0, `hsl(${f.hue}, 90%, ${50 + i * 5}%)`); // lighter center
                    gradient.addColorStop(1, `hsl(${f.hue}, 100%, ${30 + i * 5}%)`); // darker edge

                    ctxFlower.fillStyle = gradient;
                    ctxFlower.fill();

                    // Thin outline for definition
                    ctxFlower.strokeStyle = `hsla(${f.hue}, 100%, 20%, 0.1)`;
                    ctxFlower.lineWidth = 0.5;
                    ctxFlower.stroke();
                }
            }

            // Center bud (tight spiral visual)
            ctxFlower.beginPath();
            ctxFlower.arc(0, 0, currentRadius * 0.2, 0, Math.PI * 2);
            ctxFlower.fillStyle = `hsl(${f.hue}, 100%, 25%)`;
            ctxFlower.fill();

            ctxFlower.restore();
        }
    });

    if (growing) {
        requestAnimationFrame(animateFlowers);
    }
}

// Start Flowers on Load
initFlowers();

// --- Event Listeners ---
jar.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    messageText.textContent = messages[randomIndex];
    messageCard.classList.remove('hidden');
    startConfetti();
});

closeBtn.addEventListener('click', () => {
    messageCard.classList.add('hidden');
});
