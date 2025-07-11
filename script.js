// FAQ Accordion
document.querySelectorAll('.faq-btn').forEach(button => {
  button.addEventListener('click', () => {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    answer.classList.toggle('hidden');
    icon.style.transform = answer.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(180deg)';
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Vídeo: play/pause ao clicar no botão
const playButton = document.getElementById('play-button');
const playIcon = document.getElementById('play-icon');
const video = document.getElementById('phoenix-video');
const thumb = document.getElementById('thumbnail-image');
const overlay = document.getElementById('video-overlay');

let overlayTimeout;

// Inicial: mostra overlay se vídeo pausado
function showOverlay() {
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  overlay.classList.add('opacity-100');
}
function hideOverlay() {
  overlay.classList.remove('opacity-100');
  overlay.classList.add('opacity-0', 'pointer-events-none');
}

// Atualiza ícone e thumb
function showOverlay() {
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  overlay.classList.add('opacity-100');
}
function hideOverlay() {
  overlay.classList.remove('opacity-100');
  overlay.classList.add('opacity-0', 'pointer-events-none');
}

// Atualiza ícone e thumb
function updateButton() {
  if (video.paused) {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    showOverlay(); // Mostra o botão quando pausado
  } else {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    hideOverlay(); // Esconde o botão quando tocando
  }
}

// Clique em qualquer lugar do vídeo (exceto no botão): pausa/despausa
video.parentElement.addEventListener('click', (e) => {
  if (e.target === playButton || playButton.contains(e.target)) return;
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

// Clique no botão play/pause
playButton.addEventListener('click', (e) => {
  e.stopPropagation();
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
});

// Mouse move OU clique: mostra overlay se tocando, depois esconde rápido
['mousemove', 'click'].forEach(evt => {
  video.parentElement.addEventListener(evt, () => {
    if (!video.paused) {
      showOverlay();
      clearTimeout(overlayTimeout);
      overlayTimeout = setTimeout(() => {
        // Só esconde se o vídeo ainda estiver tocando!
        if (!video.paused) {
          hideOverlay();
        }
      }, 900);
    } else {
      // Se o vídeo está pausado, sempre mostra o overlay
      showOverlay();
      clearTimeout(overlayTimeout);
    }
  });
});

// Ao pausar, mostra overlay
video.addEventListener('pause', updateButton);
// Ao tocar, esconde overlay
video.addEventListener('play', () => {
  hideOverlay();
  updateButton();
});
// Ao terminar, mostra overlay e thumb
video.addEventListener('pause', () => {
  showOverlay();
  updateButton();
});

// Inicial
updateButton();

// Máscara telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput && typeof IMask === 'function') {
  IMask(telefoneInput, { mask: '(00) 00000-0000' });
}

// Função para mostrar etapas do formulário
function mostrarEtapa(id) {
  document.querySelectorAll('.etapa').forEach(el => el.classList.remove('ativa'));
  const etapa = document.getElementById(id);
  if (etapa) etapa.classList.add('ativa');
}

// Envio do formulário
const form = document.getElementById('formulario');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    mostrarEtapa('loading');
    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      idade: document.getElementById('idade').value,
      telefone: document.getElementById('telefone').value,
    };
    fetch('/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    })
    .then(response => {
      if (!response.ok) throw new Error('Erro');
      return response.json();
    })
    .then(() => mostrarEtapa('confirmacao'))
    .catch(() => {
      alert("Erro ao enviar. Tente novamente.");
      mostrarEtapa('formulario-section');
    });
  });
}
// Menu mobile toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
});
