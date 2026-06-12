const bgm = document.getElementById('bgm');
const muteBtn = document.getElementById('mute-btn');
let started = false;

function startBgm() {
  if (started) return;
  started = true;
  bgm.play().catch(() => {});
  document.removeEventListener('click', startBgm);
}

// Try immediate autoplay; if the browser blocks it, wait for first click.
bgm.play().then(() => {
  started = true;
}).catch(() => {
  document.addEventListener('click', startBgm);
});

muteBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // don't let this count as the "start" click
  if (!started) startBgm();
  bgm.muted = !bgm.muted;
  muteBtn.textContent = bgm.muted ? '♩' : '♪';
  muteBtn.classList.toggle('muted', bgm.muted);
  muteBtn.setAttribute('aria-label', bgm.muted ? 'Unmute music' : 'Mute music');
});

// Tile dim effect
document.querySelectorAll('.tile').forEach(tile => {
  tile.addEventListener('mouseenter', () => {
    document.querySelectorAll('.tile').forEach(other => {
      if (other !== tile) other.style.opacity = '0.5';
    });
  });

  tile.addEventListener('mouseleave', () => {
    document.querySelectorAll('.tile').forEach(other => {
      other.style.opacity = '';
    });
  });
});
