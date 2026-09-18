/**
 * RUBA KUMAR - 3D FUTURISTIC DEVELOPER PORTFOLIO APPLICATION LOGIC
 * Theme: Dark Black & Burnt-Orange 3D Agency Aesthetic
 */

document.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
  initSpotlightEffect();
  initTechFilter();
  initProjectModals();
  initContactInteractions();
  initScrollSpyAndNav();
  initScrollReveal();
});

/* ==========================================================================
   1. Ambient Burnt-Orange Particle Constellation Canvas
   ========================================================================== */
function initParticleCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 150 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 20000), 55);

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.6 + 0.8;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.color = Math.random() > 0.4 ? 'rgba(255, 107, 0,' : 'rgba(255, 140, 20,';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0) this.x = width;
      if (this.x > width) this.x = 0;
      if (this.y < 0) this.y = height;
      if (this.y > height) this.y = 0;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 1.5;
          this.y -= Math.sin(angle) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `${this.color}${this.baseAlpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Connect particles with faint orange filaments
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.14;
          ctx.beginPath();
          ctx.strokeStyle = `rgba(255, 107, 0, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Card Proximity Spotlight Lighting
   ========================================================================== */
function initSpotlightEffect() {
  const cards = document.querySelectorAll('.spotlight-card, .tech-card, .project-card');
  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   3. Skills Toolkit Filter System
   ========================================================================== */
function initTechFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const techCards = document.querySelectorAll('.tech-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      techCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/* ==========================================================================
   4. Interactive Project Modals with Live Simulators
   ========================================================================== */
function initProjectModals() {
  const backdrop = document.getElementById('project-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const viewBtns = document.querySelectorAll('.btn-project-view');

  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalTech = document.getElementById('modal-tech');
  const modalDesc = document.getElementById('modal-desc');
  const modalSimulator = document.getElementById('modal-simulator-container');

  if (!backdrop) return;

  const projectData = {
    '1': {
      title: 'Personal AI Life Manager',
      image: 'assets/images/project_ai_3d.jpg',
      tech: ['Python', 'Flask', 'JavaScript', 'Database', 'AI', 'Tailored 3D UI'],
      desc: 'A unified personal AI assistant crafted to simplify daily activities, task tracking, and note-taking through an intuitive web interface. Built with Python and Flask for a responsive backend, backed by structured database models and smart conversational AI capabilities.',
      simulatorHtml: `
        <div class="interactive-simulator-box">
          <div class="simulator-header">
            <span>⚡ LIVE INTERACTIVE SIMULATION: AI Assistant Interface</span>
            <span style="color: var(--accent-orange-bright);">● Online</span>
          </div>
          <div class="chat-sim-messages" id="sim-chat-window">
            <div class="chat-bubble bot">Hello! I'm your Life Manager AI. How can I assist your productivity today?</div>
          </div>
          <div style="display: flex; gap: 8px;">
            <input type="text" id="sim-chat-input" placeholder="Type a task or note (e.g. Schedule meeting tomorrow)..." class="form-input" style="padding: 10px 14px; font-size: 0.8125rem;">
            <button id="sim-chat-send" class="btn-hire-me" style="padding: 8px 18px; font-size: 0.8125rem;">Send</button>
          </div>
          <div style="display: flex; gap: 6px; margin-top: 8px; flex-wrap: wrap;">
            <button class="social-pill" style="font-size: 0.72rem; padding: 4px 10px;" onclick="simulateChatPrompt('Create note: Study ML model architectures')">+ Note: Study ML models</button>
            <button class="social-pill" style="font-size: 0.72rem; padding: 4px 10px;" onclick="simulateChatPrompt('Add task: Submit Project Report by Friday')">+ Task: Submit Report</button>
          </div>
        </div>
      `
    },
    '2': {
      title: 'Student Performance Prediction',
      image: 'assets/images/project_ml_3d.jpg',
      tech: ['Python', 'Pandas', 'Scikit-learn', 'Machine Learning', 'Regression Analytics'],
      desc: 'An end-to-end predictive machine learning model that analyzes historical academic indicators—such as weekly study duration, attendance rates, and exam scores—to calculate expected semester GPA and early intervention pathways.',
      simulatorHtml: `
        <div class="interactive-simulator-box">
          <div class="simulator-header">
            <span>📊 LIVE INTERACTIVE SIMULATION: Scikit-learn Regression Predictor</span>
            <span style="color: var(--accent-orange-bright);">R² Score: 0.941</span>
          </div>
          <div class="sim-slider-group">
            <div class="sim-slider-labels">
              <span>Weekly Study Hours:</span>
              <strong id="study-val" style="color: var(--accent-orange-bright);">14 hrs/week</strong>
            </div>
            <input type="range" min="2" max="35" value="14" class="sim-slider" id="study-slider">
          </div>
          <div class="sim-slider-group">
            <div class="sim-slider-labels">
              <span>Class Attendance Rate:</span>
              <strong id="attend-val" style="color: var(--accent-orange-bright);">88%</strong>
            </div>
            <input type="range" min="40" max="100" value="88" class="sim-slider" id="attend-slider">
          </div>
          <div class="prediction-result-card">
            <div>
              <div style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Predicted Academic GPA</div>
              <div id="predicted-gpa" style="font-size: 1.6rem; font-weight: 800; color: #fff; font-family: var(--font-display);">3.48 / 4.0</div>
            </div>
            <div style="text-align: right;">
              <span id="predicted-badge" class="section-tag" style="margin-bottom: 0;">Honors Tier (Distinction)</span>
            </div>
          </div>
        </div>
      `
    },
    '3': {
      title: 'Laundry & Dry Cleaning Management',
      image: 'assets/images/project_laundry_3d.jpg',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Backend', 'Database', 'Logistics Automation'],
      desc: 'A full-stack workflow application engineered to modernize dry cleaning and laundry service operations. Features multi-stage order tracking (Booking -> Pickup -> Wash -> Quality Check -> Delivery), customer notifications, and routing automation.',
      simulatorHtml: `
        <div class="interactive-simulator-box">
          <div class="simulator-header">
            <span>📦 LIVE INTERACTIVE SIMULATION: Order Status & Dispatch Pipeline</span>
            <span style="color: var(--accent-orange-bright);">● Order #7842 Active</span>
          </div>
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 16px; text-align: center;">
            <div id="p-step-1" style="padding: 10px 6px; background: rgba(255, 107, 0, 0.15); border: 1px solid var(--accent-orange); border-radius: 8px; font-size: 0.75rem; color: var(--accent-orange-bright);">1. Booked ✓</div>
            <div id="p-step-2" style="padding: 10px 6px; background: rgba(255, 107, 0, 0.15); border: 1px solid var(--accent-orange); border-radius: 8px; font-size: 0.75rem; color: var(--accent-orange-bright);">2. In Processing ✓</div>
            <div id="p-step-3" style="padding: 10px 6px; background: rgba(255, 140, 20, 0.2); border: 1px solid var(--border-medium); border-radius: 8px; font-size: 0.75rem; color: #fff;">3. Quality Check ⚙</div>
            <div id="p-step-4" style="padding: 10px 6px; background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border-subtle); border-radius: 8px; font-size: 0.75rem; color: var(--text-muted);">4. Out for Delivery</div>
          </div>
          <div style="display: flex; gap: 10px; align-items: center; justify-content: space-between;">
            <span style="font-size: 0.8125rem; color: var(--text-secondary);">Simulate dispatch driver handoff:</span>
            <button id="btn-advance-pipeline" class="btn-hire-me" style="padding: 8px 18px; font-size: 0.8125rem;">Advance Stage ➔</button>
          </div>
        </div>
      `
    }
  };

  viewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projId = btn.getAttribute('data-project');
      const data = projectData[projId];
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalDesc.textContent = data.desc;

      modalTech.innerHTML = data.tech
        .map((t) => `<span class="tech-pill">${t}</span>`)
        .join('');

      modalSimulator.innerHTML = data.simulatorHtml;

      backdrop.classList.add('open');
      document.body.style.overflow = 'hidden';

      if (projId === '1') attachChatSimHandlers();
      if (projId === '2') attachPredictionSimHandlers();
      if (projId === '3') attachLaundrySimHandlers();
    });
  });

  function closeModal() {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && backdrop.classList.contains('open')) {
      closeModal();
    }
  });
}

window.simulateChatPrompt = function (text) {
  const input = document.getElementById('sim-chat-input');
  if (input) {
    input.value = text;
    const sendBtn = document.getElementById('sim-chat-send');
    if (sendBtn) sendBtn.click();
  }
};

function attachChatSimHandlers() {
  const input = document.getElementById('sim-chat-input');
  const sendBtn = document.getElementById('sim-chat-send');
  const chatWindow = document.getElementById('sim-chat-window');

  if (!input || !sendBtn || !chatWindow) return;

  function send() {
    const text = input.value.trim();
    if (!text) return;

    const userBubble = document.createElement('div');
    userBubble.className = 'chat-bubble user';
    userBubble.textContent = text;
    chatWindow.appendChild(userBubble);
    input.value = '';
    chatWindow.scrollTop = chatWindow.scrollHeight;

    setTimeout(() => {
      const botBubble = document.createElement('div');
      botBubble.className = 'chat-bubble bot';
      const lower = text.toLowerCase();
      if (lower.includes('note')) {
        botBubble.innerHTML = `✓ <strong>Saved to Notes:</strong> "${text.replace(/create note:/i, '').trim()}" under Personal AI Life Manager.`;
      } else if (lower.includes('task')) {
        botBubble.innerHTML = `✓ <strong>Added to Task Queue:</strong> "${text.replace(/add task:/i, '').trim()}" with high priority tag.`;
      } else {
        botBubble.textContent = `Action recorded: "${text}". Personal AI Assistant updated.`;
      }
      chatWindow.appendChild(botBubble);
      chatWindow.scrollTop = chatWindow.scrollHeight;
    }, 450);
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') send();
  });
}

function attachPredictionSimHandlers() {
  const study = document.getElementById('study-slider');
  const attend = document.getElementById('attend-slider');
  const studyVal = document.getElementById('study-val');
  const attendVal = document.getElementById('attend-val');
  const gpaOut = document.getElementById('predicted-gpa');
  const badgeOut = document.getElementById('predicted-badge');

  if (!study || !attend) return;

  function calculate() {
    const s = parseFloat(study.value);
    const a = parseFloat(attend.value);

    studyVal.textContent = `${s} hrs/week`;
    attendVal.textContent = `${a}%`;

    let score = 0.9 + (s * 0.045) + (a * 0.02);
    if (score > 4.0) score = 4.0;
    if (score < 1.0) score = 1.0;

    gpaOut.textContent = `${score.toFixed(2)} / 4.0`;

    if (score >= 3.6) {
      badgeOut.textContent = '🌟 Top Distinction Tier';
    } else if (score >= 3.0) {
      badgeOut.textContent = '✨ Honors Standing';
    } else {
      badgeOut.textContent = '✓ Regular Standing';
    }
  }

  [study, attend].forEach((el) => el.addEventListener('input', calculate));
  calculate();
}

function attachLaundrySimHandlers() {
  const btn = document.getElementById('btn-advance-pipeline');
  let current = 3;
  if (!btn) return;

  btn.addEventListener('click', () => {
    current++;
    if (current > 4) current = 1;

    for (let i = 1; i <= 4; i++) {
      const stepEl = document.getElementById(`p-step-${i}`);
      if (!stepEl) continue;

      if (i < current) {
        stepEl.style.background = 'rgba(255, 107, 0, 0.15)';
        stepEl.style.borderColor = 'var(--accent-orange)';
        stepEl.style.color = 'var(--accent-orange-bright)';
        stepEl.innerHTML = `${i}. Completed ✓`;
      } else if (i === current) {
        stepEl.style.background = 'rgba(255, 140, 20, 0.25)';
        stepEl.style.borderColor = 'var(--accent-orange-bright)';
        stepEl.style.color = '#fff';
        stepEl.innerHTML = `${i}. Active Processing ⚙`;
      } else {
        stepEl.style.background = 'rgba(255, 255, 255, 0.03)';
        stepEl.style.borderColor = 'var(--border-subtle)';
        stepEl.style.color = 'var(--text-muted)';
        const labels = ['', 'Booked', 'In Processing', 'Quality Check', 'Out for Delivery'];
        stepEl.innerHTML = `${i}. ${labels[i]}`;
      }
    }

    showToast(`Order #7842 progressed to Stage ${current}!`);
  });
}

/* ==========================================================================
   5. Copy-to-Clipboard & Toast Notifications
   ========================================================================== */
function initContactInteractions() {
  const copyBtns = document.querySelectorAll('.btn-copy');

  copyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (textToCopy) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          showToast(`Copied to clipboard: ${textToCopy}`);
        }).catch(() => {
          showToast(`Copied: ${textToCopy}`);
        });
      }
    });
  });

  // Resume Download button notification
  const resumeBtn = document.getElementById('btn-download-resume');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Opening Ruba Kumar CV / Resume...');
    });
  }

  // Contact Form
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');
      const submitBtn = document.getElementById('contact-submit-btn');

      let isValid = true;

      if (!nameInput.value.trim()) {
        showFieldError('name-error', 'Please enter your name');
        isValid = false;
      } else {
        hideFieldError('name-error');
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(emailInput.value.trim())) {
        showFieldError('email-error', 'Please enter a valid email address');
        isValid = false;
      } else {
        hideFieldError('email-error');
      }

      if (!msgInput.value.trim() || msgInput.value.trim().length < 8) {
        showFieldError('message-error', 'Please provide a message with at least 8 characters');
        isValid = false;
      } else {
        hideFieldError('message-error');
      }

      if (!isValid) return;

      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Message...</span>`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        form.reset();
        showToast(`Thank you, ${nameInput.value.trim() || 'friend'}! Your message was sent successfully.`);
      }, 900);
    });
  }
}

function showFieldError(id, msg) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = msg;
    el.classList.add('visible');
  }
}

function hideFieldError(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.remove('visible');
  }
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="color: var(--accent-orange-bright); font-size: 1.1rem;">✦</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ==========================================================================
   6. Scroll-Spy Navigation, Back-to-Top, Mobile Drawer
   ========================================================================== */
function initScrollSpyAndNav() {
  const header = document.querySelector('.site-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-links a');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      document.body.style.overflow = mobileDrawer.classList.contains('open') ? 'hidden' : '';
    });

    drawerLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
}

/* ==========================================================================
   7. Scroll Reveal Animations
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => observer.observe(el));
}
