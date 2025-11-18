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

// Vídeo Vimeo: play/pause ao clicar no botão
const playButton = document.getElementById('play-button');
const playIcon = document.getElementById('play-icon');
const videoIframe = document.getElementById('phoenix-video');
const overlay = document.getElementById('video-overlay');
const blackOverlay = document.getElementById('video-black-overlay');
const spinner = document.getElementById('video-spinner');

// Inicializa o Vimeo Player
const player = new Vimeo.Player(videoIframe);

let overlayTimeout;
let isPlaying = false;

// Funções de overlay
function showOverlay() {
  overlay.classList.remove('opacity-0', 'pointer-events-none');
  overlay.classList.add('opacity-100');
}

function hideOverlay() {
  overlay.classList.remove('opacity-100');
  overlay.classList.add('opacity-0', 'pointer-events-none');
}

// Funções para o overlay preto
function showBlackOverlay() {
  blackOverlay.style.opacity = '1';
  blackOverlay.style.visibility = 'visible';
}

function hideBlackOverlay() {
  blackOverlay.style.opacity = '0';
  blackOverlay.style.visibility = 'hidden';
}

// Atualiza ícone
function updateButton(playing) {
  if (playing) {
    playIcon.classList.remove('fa-play');
    playIcon.classList.add('fa-pause');
    hideOverlay();
    hideBlackOverlay(); // Esconde a tela preta quando está tocando
    if (spinner) { spinner.style.opacity = '0'; spinner.style.pointerEvents = 'none'; }
  } else {
    playIcon.classList.remove('fa-pause');
    playIcon.classList.add('fa-play');
    showOverlay();
    showBlackOverlay(); // Mostra a tela preta quando pausado/parado
    if (spinner) { spinner.style.opacity = '0'; spinner.style.pointerEvents = 'none'; }
  }
}

// Clique em qualquer lugar do vídeo (exceto no botão): pausa/despausa
videoIframe.parentElement.addEventListener('click', async (e) => {
  if (e.target === playButton || playButton.contains(e.target)) return;
  const paused = await player.getPaused();
  if (paused) {
    player.play();
  } else {
    player.pause();
  }
});

// Clique no botão play/pause
playButton.addEventListener('click', async (e) => {
  e.stopPropagation();
  if (spinner) { spinner.style.opacity = '1'; spinner.style.pointerEvents = 'none'; }
  const paused = await player.getPaused();
  if (paused) {
    player.play();
  } else {
    player.pause();
  }
});

// Mouse move: mostra overlay se tocando, depois esconde rápido
['mousemove', 'click'].forEach(evt => {
  videoIframe.parentElement.addEventListener(evt, async () => {
    const paused = await player.getPaused();
    if (!paused) {
      showOverlay();
      clearTimeout(overlayTimeout);
      overlayTimeout = setTimeout(async () => {
        const stillPlaying = !(await player.getPaused());
        if (stillPlaying) {
          hideOverlay();
        }
      }, 900);
    } else {
      showOverlay();
      clearTimeout(overlayTimeout);
    }
  });
});

// Event listeners do Vimeo
player.on('play', () => {
  isPlaying = true;
  updateButton(true);
  if (spinner) { spinner.style.opacity = '0'; spinner.style.pointerEvents = 'none'; }
});

player.on('pause', () => {
  isPlaying = false;
  updateButton(false);
  if (spinner) { spinner.style.opacity = '0'; spinner.style.pointerEvents = 'none'; }
});

player.on('ended', () => {
  isPlaying = false;
  updateButton(false);
  if (spinner) { spinner.style.opacity = '0'; spinner.style.pointerEvents = 'none'; }
});

// Inicial
showOverlay();

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
      nome: document.getElementById('nome') ? document.getElementById('nome').value : '',
      idade: document.getElementById('idade') ? document.getElementById('idade').value : '',
      telefone: document.getElementById('telefone') ? document.getElementById('telefone').value : ''
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
    // Toggle menu ao clicar no botão
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!mobileMenu.classList.contains('hidden') && 
          !mobileMenu.contains(e.target) && 
          !toggleBtn.contains(e.target)) {
        mobileMenu.classList.add('hidden');
      }
    });

    // Fechar menu ao clicar em um link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
});

const legalTexts = {
  termos: `
    <h2 class="text-2xl font-bold text-phoenix-magenta mb-2">Termos de Uso</h2>
    <p>Ao acessar e utilizar nosso site, você concorda com os seguintes termos:</p>
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
    <p>Na Phoenix, sua privacidade é prioridade. Veja como tratamos seus dados:</p>
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
