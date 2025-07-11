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

const legalTexts = {
  termos: `
    <h2 class="text-2xl font-bold text-phoenix-magenta mb-2">Termos de Uso</h2>
    <p>Bem-vindo à Phoenix English School! Ao acessar e utilizar nosso site, você concorda com os seguintes termos:</p>
    <ul class="list-disc ml-6 space-y-2">
      <li><strong>Uso do Site:</strong> O conteúdo deste site é para fins informativos e educacionais. Não é permitido copiar, distribuir ou modificar qualquer parte sem autorização.</li>
      <li><strong>Cadastro:</strong> Ao se inscrever, você concorda em fornecer informações verdadeiras e manter seus dados atualizados.</li>
      <li><strong>Privacidade:</strong> Seus dados são protegidos conforme nossa Política de Privacidade. Não compartilhamos informações pessoais sem consentimento.</li>
      <li><strong>Propriedade Intelectual:</strong> Todo o conteúdo, incluindo textos, imagens, vídeos e marcas, pertence à Phoenix English School e não pode ser utilizado sem permissão.</li>
      <li><strong>Responsabilidades:</strong> Não nos responsabilizamos por danos decorrentes do uso inadequado do site ou de informações fornecidas por terceiros.</li>
      <li><strong>Alterações:</strong> Podemos atualizar estes termos a qualquer momento. Recomendamos revisá-los periodicamente.</li>
    </ul>
    <p class="mt-4">Dúvidas? Entre em contato: <a href="mailto:phoenixschool10@gmail.com" class="text-phoenix-magenta underline">phoenixschool10@gmail.com</a></p>
  `,
  privacidade: `
    <h2 class="text-2xl font-bold text-phoenix-magenta mb-2">Política de Privacidade</h2>
    <p>Na Phoenix English School, sua privacidade é prioridade. Veja como tratamos seus dados:</p>
    <ul class="list-disc ml-6 space-y-2">
      <li><strong>Coleta de Dados:</strong> Coletamos apenas informações necessárias para inscrição, contato e melhoria dos serviços.</li>
      <li><strong>Uso dos Dados:</strong> Utilizamos seus dados para comunicação, envio de conteúdos e promoções, e para aprimorar sua experiência.</li>
      <li><strong>Compartilhamento:</strong> Não compartilhamos seus dados com terceiros, exceto quando exigido por lei ou para execução dos serviços contratados.</li>
      <li><strong>Segurança:</strong> Adotamos medidas técnicas e administrativas para proteger suas informações.</li>
      <li><strong>Direitos do Usuário:</strong> Você pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento.</li>
      <li><strong>Cookies:</strong> Utilizamos cookies para melhorar a navegação. Você pode desativá-los nas configurações do navegador.</li>
    </ul>
    <p class="mt-4">Para mais informações, entre em contato: <a href="mailto:phoenixschool10@gmail.com" class="text-phoenix-magenta underline">phoenixschool10@gmail.com</a></p>
  `,
  faq: `
    <h2 class="text-2xl font-bold text-phoenix-magenta mb-2">Perguntas Frequentes</h2>
    <div class="space-y-4">
      <div>
        <h3 class="font-bold">Quanto tempo leva para ficar fluente com o método Phoenix?</h3>
        <p>Nosso método foi projetado para transformar seu inglês em 18 meses de estudo consistente. Muitos alunos já conseguem se comunicar de forma básica no primeiro mês.</p>
      </div>
      <div>
        <h3 class="font-bold">Preciso saber algo de inglês antes de começar?</h3>
        <p>Não! A Phoenix foi desenvolvida tanto para iniciantes absolutos quanto para quem já tem algum conhecimento. As turmas são divididas por níveis.</p>
      </div>
      <div>
        <h3 class="font-bold">Qual a diferença da Phoenix para os cursinhos tradicionais?</h3>
        <p>Metodologia baseada em aquisição natural da língua, foco em comunicação, suporte ao aluno e plataforma exclusiva.</p>
      </div>
      <div>
        <h3 class="font-bold">Como funciona o suporte ao aluno?</h3>
        <p>Oferecemos suporte via WhatsApp, e-mail e plataforma, com professores disponíveis para tirar dúvidas e orientar seu aprendizado.</p>
      </div>
      <div>
        <h3 class="font-bold">Posso estudar online?</h3>
        <p>Sim! Temos aulas presenciais e online ao vivo, além de plataforma digital para prática extra.</p>
      </div>
    </div>
  `
};

// Função para abrir modal
function openLegalModal(type) {
  const modal = document.getElementById('modal-legal');
  const content = document.getElementById('modal-legal-content');
  content.innerHTML = legalTexts[type] || '';
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

// Fechar modal
function closeLegalModal() {
  document.getElementById('modal-legal').classList.add('hidden');
  document.body.style.overflow = '';
}

// Eventos dos links do footer
document.querySelectorAll('a[href="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const text = link.textContent.trim().toLowerCase();
    if (text.includes('termos')) openLegalModal('termos');
    else if (text.includes('privacidade')) openLegalModal('privacidade');
    else if (text.includes('faq')) openLegalModal('faq');
  });
});

// Botão de fechar
document.getElementById('close-modal-legal').addEventListener('click', closeLegalModal);

// Fechar ao clicar fora do modal
document.getElementById('modal-legal').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLegalModal();
});
