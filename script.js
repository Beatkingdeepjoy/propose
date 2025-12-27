document.addEventListener('DOMContentLoaded', () => {
    // Floating hearts
    const heartsBg = document.getElementById('hearts-bg');
    const colors = ['#ff4d8d', '#ff97c1', '#ffd700', '#6a0dad', '#ffffff'];

    for (let i = 0; i < 60; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 20 + 15}s`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.fontSize = `${Math.random() * 20 + 15}px`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heartsBg.appendChild(heart);
    }

    // Audio elements
    const bgMusic = document.getElementById('bg-music');
    const heartSound = document.getElementById('heart-sound');
    const yesSound = document.getElementById('yes-sound');
    const soundControl = document.getElementById('sound-control');
    const soundIcon = document.getElementById('sound-icon');
    let isPlaying = false;

    // Attempt autoplay on first interaction
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.volume = 0.3;
            bgMusic.play().then(() => {
                isPlaying = true;
                soundIcon.className = 'fas fa-volume-up';
            });
        }
    }, { once: true });

    // Toggle sound
    soundControl.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            soundIcon.className = 'fas fa-volume-mute';
        } else {
            bgMusic.play();
            soundIcon.className = 'fas fa-volume-up';
        }
        isPlaying = !isPlaying;
    });

    // Heartbeat on hover
    document.getElementById('proposal-text').addEventListener('mouseenter', () => {
        heartSound.currentTime = 0;
        heartSound.play();
    });

    // Yes button - celebration
    document.getElementById('yes-btn').addEventListener('click', () => {
        yesSound.play();
        document.getElementById('proposal-text').innerHTML = "You've Made Me The Happiest Person! 💖";
        document.getElementById('proposal-text').style.color = "#ffd700";

        // Modern confetti
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff4d8d', '#ff97c1', '#ffd700', '#6a0dad', '#00ccff']
        });

        setTimeout(() => {
            alert("My darling Wify, I promise to love you forever and make every day as magical as this moment! 💍❤️");
        }, 800);
    });

    // No button - playful dodge
    document.getElementById('no-btn').addEventListener('click', () => {
        const btn = document.getElementById('no-btn');
        const x = Math.random() * (window.innerWidth - 200);
        const y = Math.random() * (window.innerHeight - 100);

        btn.style.position = 'fixed';
        btn.style.left = `${x}px`;
        btn.style.top = `${y}px`;
        btn.style.transition = 'all 0.4s ease';

        btn.innerHTML = '<i class="fas fa-heart-broken"></i> Nope! Try Again! 😏';

        setTimeout(() => {
            btn.style.position = 'static';
            btn.innerHTML = '<i class="fas fa-grin-wink"></i> Try Saying No 😉';
        }, 2000);
    });

    // Save love note
    const loveNote = document.getElementById('love-note');
    const saveBtn = document.getElementById('save-note');

    // Load saved note
    const saved = localStorage.getItem('loveNoteToWify');
    if (saved) loveNote.value = saved;

    saveBtn.addEventListener('click', () => {
        localStorage.setItem('loveNoteToWify', loveNote.value);
        saveBtn.innerHTML = '<i class="fas fa-check"></i> Note Saved!';
        saveBtn.style.background = 'linear-gradient(135deg, #00cc66, #009944)';

        setTimeout(() => {
            saveBtn.innerHTML = '<i class="fas fa-save"></i> Save This Love Note';
            saveBtn.style.background = '';
        }, 2000);
    });

    // Click anywhere for floating hearts
    document.addEventListener('click', (e) => {
        if (e.target.closest('button')) return;
        const emojis = ['❤️', '💖', '🥰', '😍', '💕', '💘'];
        const emoji = document.createElement('div');
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = e.clientX + 'px';
        emoji.style.top = e.clientY + 'px';
        emoji.style.fontSize = '2.5rem';
        emoji.style.pointerEvents = 'none';
        emoji.style.zIndex = '9999';
        emoji.style.animation = 'floatUp 1.2s ease-out forwards';
        document.body.appendChild(emoji);

        setTimeout(() => emoji.remove(), 1200);
    });
});

// CSS for floating click emoji
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        to { transform: translateY(-120px); opacity: 0; }
    }
`;
document.head.appendChild(style);