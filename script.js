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
const thumbnail = document.getElementById('thumbnail-image');
const video = document.getElementById('phoenix-video');
const videoContainer = video?.parentElement;
const playIcon = playButton?.querySelector('i');

if (playButton && video && thumbnail && playIcon && videoContainer) {
  playButton.addEventListener('click', () => {
    videoContainer.style.display = 'block';
    video.style.display = 'block';
    if (video.paused) {
      thumbnail.classList.add('hidden');
      video.classList.remove('opacity-0', 'pointer-events-none');
      video.play().catch(err => console.error('Erro ao reproduzir vídeo:', err));
      playIcon.classList.replace('fa-play', 'fa-pause');
    } else {
      video.pause();
      playIcon.classList.replace('fa-pause', 'fa-play');
    }
  });
}

// Menu mobile toggle

  const toggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }
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
