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
    const bouquetCount = 45; // Daha fazla çiçek
    const types = ['whiteRose', 'peony', 'chrysanthemum'];
    for (let i = 0; i < bouquetCount; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        let fHue;
        // Çiçek tiplerine göre renk tabanları
        if (type === 'whiteRose') fHue = Math.random() * 20 + 40; // Krem/beyaz alt ton, düşük doygunluk kullanılacak
        else if (type === 'peony') fHue = Math.random() * 30 + 320; // Açık pembe ve macenta
        else if (type === 'chrysanthemum') fHue = Math.random() * 60 + 30; // Sarı, turuncu veya lila
        
        flowers.push({
            x: Math.random() * window.innerWidth,
            y: window.innerHeight,
            height: window.innerHeight * (0.3 + Math.random() * 0.5),
            width: Math.random() * 1.5 + 0.5, // Dal kalınlığı
            progress: 0,
            speed: Math.random() * 0.003 + 0.001,
            curve: (Math.random() - 0.5) * 150,
            hue: fHue,
            type: type,
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

        // Draw Flower Head
        if (f.progress > 0.8) { 
            const bloomProgress = (f.progress - 0.8) * 5; 
            const maxRadius = f.type === 'peony' ? 30 : (f.type === 'chrysanthemum' ? 22 : 25);
            const currentRadius = maxRadius * Math.min(1, bloomProgress);

            ctxFlower.save();
            ctxFlower.translate(tipX, tipY);

            // Çiçeğe özel ışıltı ve renk
            ctxFlower.shadowBlur = 15;
            let saturation = '100%';
            let lightness = '75%';
            if (f.type === 'whiteRose') {
                saturation = '15%'; // Çok düşük doygunluk
                lightness = '85%'; // Çok açık (beyazımsı)
                ctxFlower.shadowColor = `hsl(${f.hue}, ${saturation}, ${lightness})`;
            } else if (f.type === 'peony') {
                ctxFlower.shadowColor = `hsl(${f.hue}, 90%, 75%)`;
            } else {
                ctxFlower.shadowColor = `hsl(${f.hue}, 100%, 65%)`;
            }

            if (f.type === 'whiteRose') {
                // --- BEYAZ GÜL ÇİZİMİ ---
                const layers = 5;
                for (let i = 0; i < layers; i++) {
                    const layerProgress = Math.min(1, bloomProgress * 1.5 - (i * 0.1));
                    if (layerProgress <= 0) continue;
                    const petalCount = 3 + i;
                    const layerRadius = currentRadius * (0.2 + i * 0.18);
                    for (let j = 0; j < petalCount; j++) {
                        ctxFlower.beginPath();
                        const angle = (j * (Math.PI * 2) / petalCount) + (i * 0.5);
                        const px = Math.cos(angle) * layerRadius * 0.5;
                        const py = Math.sin(angle) * layerRadius * 0.5;
                        ctxFlower.arc(px, py, layerRadius * 0.6, 0, Math.PI * 2);
                        const gradient = ctxFlower.createRadialGradient(px, py, 0, px, py, layerRadius * 0.6);
                        gradient.addColorStop(0, `hsl(${f.hue}, 20%, 95%)`); // İç kısmı daha saf beyaz
                        gradient.addColorStop(1, `hsl(${f.hue}, 25%, 80%)`); // Kenarları hafif gölgeli
                        ctxFlower.fillStyle = gradient;
                        ctxFlower.fill();
                        ctxFlower.strokeStyle = `hsla(${f.hue}, 20%, 50%, 0.15)`;
                        ctxFlower.lineWidth = 0.5;
                        ctxFlower.stroke();
                    }
                }
                ctxFlower.beginPath();
                ctxFlower.arc(0, 0, currentRadius * 0.2, 0, Math.PI * 2);
                ctxFlower.fillStyle = `hsl(${f.hue}, 30%, 85%)`;
                ctxFlower.fill();

            } else if (f.type === 'peony') {
                // --- ŞAKAYIK ÇİZİMİ --- (Daha geniş, katmanlı, volümlü dolgun yapraklar)
                const layers = 6;
                for (let i = 0; i < layers; i++) {
                    const layerProgress = Math.min(1, bloomProgress * 1.2 - (i * 0.15));
                    if (layerProgress <= 0) continue;
                    const petalCount = 4 + i * 2; 
                    const layerRadius = currentRadius * (0.3 + i * 0.15);
                    for (let j = 0; j < petalCount; j++) {
                        ctxFlower.beginPath();
                        const angle = (j * (Math.PI * 2) / petalCount) + (i * 0.3);
                        const px = Math.cos(angle) * layerRadius * 0.4;
                        const py = Math.sin(angle) * layerRadius * 0.4;
                        // Şakayık yaprakları biraz daha oval ve düzensiz
                        ctxFlower.ellipse(px, py, layerRadius * 0.9, layerRadius * 0.6, angle, 0, Math.PI * 2);
                        const gradient = ctxFlower.createRadialGradient(px, py, 0, px, py, layerRadius * 0.9);
                        gradient.addColorStop(0, `hsl(${f.hue}, 85%, ${75 + i * 4}%)`); // iç kısım daha aydınlık
                        gradient.addColorStop(1, `hsl(${f.hue}, 95%, ${45 + i * 4}%)`); // kenarlar daha koyu
                        ctxFlower.fillStyle = gradient;
                        ctxFlower.fill();
                        ctxFlower.strokeStyle = `hsla(${f.hue}, 100%, 20%, 0.1)`;
                        ctxFlower.lineWidth = 0.3;
                        ctxFlower.stroke();
                    }
                }
                ctxFlower.beginPath();
                ctxFlower.arc(0, 0, currentRadius * 0.15, 0, Math.PI * 2);
                ctxFlower.fillStyle = `hsl(45, 100%, 60%)`; // Sarı polen merkezi
                ctxFlower.fill();

            } else if (f.type === 'chrysanthemum') {
                // --- KASIMPATI ÇİZİMİ --- (Çok sayıda ince oval dışarı fırlayan yaprak)
                ctxFlower.fillStyle = `hsl(${f.hue}, 100%, 30%)`;
                ctxFlower.beginPath();
                ctxFlower.arc(0, 0, currentRadius * 0.3, 0, Math.PI*2);
                ctxFlower.fill();

                const totalPetals = 45; // Çok yapraklı
                for (let k = 0; k < totalPetals; k++) {
                    const layerProgress = Math.min(1, bloomProgress);
                    if (layerProgress <= 0) continue;
                    
                    const angle = k * (Math.PI * 2) / totalPetals;
                    // Biraz rastgelelik katarak ince ve uzun yapraklar dağılsın
                    const petLength = currentRadius * (0.6 + Math.random() * 0.4) * layerProgress; 
                    const petWidth = currentRadius * 0.15;
                    
                    ctxFlower.save();
                    ctxFlower.rotate(angle);
                    ctxFlower.beginPath();
                    // Yaprak çizimi (uzun, uçları sivri)
                    ctxFlower.moveTo(0, 0);
                    ctxFlower.quadraticCurveTo(petWidth, -petLength / 2, 0, -petLength);
                    ctxFlower.quadraticCurveTo(-petWidth, -petLength / 2, 0, 0);
                    
                    const gradient = ctxFlower.createLinearGradient(0, 0, 0, -petLength);
                    gradient.addColorStop(0, `hsl(${f.hue}, 90%, 40%)`);
                    gradient.addColorStop(1, `hsl(${f.hue}, 95%, ${65 + Math.random()*15}%)`); // dışa doğru açılan renk
                    ctxFlower.fillStyle = gradient;
                    ctxFlower.fill();
                    ctxFlower.restore();
                }
                // Merkezi polen
                ctxFlower.beginPath();
                ctxFlower.arc(0, 0, currentRadius * 0.15, 0, Math.PI * 2);
                ctxFlower.fillStyle = `hsl(${f.hue + 20}, 90%, 60%)`;
                ctxFlower.fill();
            }

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
