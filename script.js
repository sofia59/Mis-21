// ===== SONIDO =====
const music = document.getElementById('music');
const soundBtn = document.getElementById('soundBtn');
let isPlaying = false;

if (soundBtn && music) {
    soundBtn.addEventListener('click', () => {
        console.log('Botón clickeado');
        
        if (isPlaying) {
            music.pause();
            soundBtn.textContent = '♫';
            isPlaying = false;
            console.log('Pausado');
        } else {
            const playPromise = music.play();
            
            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        soundBtn.textContent = '♪';
                        isPlaying = true;
                        console.log('Reproduciendo');
                    })
                    .catch((error) => {
                        console.error('Error al reproducir:', error);
                    });
            }
        }
    });
} else {
    console.error('No se encontraron los elementos de audio');
}

music.volume = 0.25;

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const eventDate = new Date(2025, 10, 24, 20, 0, 0).getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
        document.getElementById('countdownTimer').textContent = '¡HOY!';
        document.getElementById('countdownDate').textContent = 'Que comience la fiesta';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const timerText = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    document.getElementById('countdownTimer').textContent = timerText;
    
    if (days === 0) {
        document.getElementById('countdownDate').textContent = `${hours}h ${minutes}m ${seconds}s`;
    } else if (days === 1) {
        document.getElementById('countdownDate').textContent = '1 día restante';
    } else {
        document.getElementById('countdownDate').textContent = `${days} días restantes`;
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

// ===== SCROLL REVEAL EFFECT =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.portada, .details-wrapper, .reason-card, .confirm-box').forEach(el => {
    observer.observe(el);
});

// ===== CONFETTI =====
let hasTriggered = false;
window.addEventListener('scroll', () => {
    const section4 = document.querySelector('.section-4');
    const rect = section4.getBoundingClientRect();
    
    if (rect.top < window.innerHeight && !hasTriggered) {
        hasTriggered = true;
        createBurst();
    }
});

function createBurst() {
    const colors = ['#1976d2', '#4caf50', '#0d47a1', '#1565c0', '#388e3c', '#ffffff'];
    for (let i = 0; i < 40; i++) {
        const burst = document.createElement('div');
        burst.classList.add('confetti-burst');
        
        const angle = (i / 40) * Math.PI * 2;
        const velocity = 400 + Math.random() * 300;
        const tx = Math.cos(angle) * velocity;
        const ty = Math.sin(angle) * velocity;
        const rz = Math.random() * 720 - 360;

        burst.style.setProperty('--tx', tx + 'px');
        burst.style.setProperty('--ty', ty + 'px');
        burst.style.setProperty('--rz', rz + 'deg');
        burst.style.left = '50%';
        burst.style.top = '50%';
        burst.style.width = Math.random() * 8 + 4 + 'px';
        burst.style.height = burst.style.width;
        burst.style.background = colors[Math.floor(Math.random() * colors.length)];
        burst.style.borderRadius = '50%';

        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 2500);
    }
}