// contact.js - lightweight form interactions and confetti
document.addEventListener('DOMContentLoaded', () => {
  // year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const form = document.getElementById('contactForm');
  const success = document.getElementById('successMessage');
  const clearBtn = document.getElementById('clearBtn');
  const scrollBtn = document.getElementById('scrollToForm');

  function spawnConfetti(x = window.innerWidth / 2, y = window.innerHeight / 3) {
    const colors = ['#2563EB', '#EF4444', '#581C87', '#FACC15', '#fff'];
    for (let i = 0; i < 30; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.left = (x + (Math.random() - 0.5) * 200) + 'px';
      el.style.top = (y + (Math.random() - 0.5) * 60) + 'px';
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      document.body.appendChild(el);
      // animate
      requestAnimationFrame(() => {
        el.style.transition = 'transform 1.2s cubic-bezier(.2,.8,.2,1), opacity 1.2s linear, top 1.2s ease';
        el.style.opacity = '1';
        el.style.top = (parseFloat(el.style.top) + 300 + Math.random() * 200) + 'px';
        el.style.transform = `translateX(${(Math.random() - 0.5) * 500}px) rotate(${Math.random() * 720}deg)`;
      });
      // remove
      setTimeout(() => el.remove(), 1600 + Math.random() * 800);
    }
  }

  if (scrollBtn) scrollBtn.addEventListener('click', () => {
    document.getElementById('contactSection').scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  if (clearBtn) clearBtn.addEventListener('click', () => {
    form.reset();
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // show sending animation on button
      const btn = form.querySelector('.send-btn');
      btn.disabled = true;
      btn.textContent = 'Sending... ⏳';
      btn.style.opacity = '0.9';

      // tiny fake network delay
      setTimeout(() => {
        btn.textContent = 'Sent! ✅';
        spawnConfetti(window.innerWidth / 2, form.getBoundingClientRect().top + window.scrollY);
        // show success
        success.classList.remove('hidden');
        // slide it in
        success.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 480, easing: 'ease-out' });
        // reset form state after a bit
        setTimeout(() => {
          btn.disabled = false;
          btn.textContent = 'Send Message 🚀';
        }, 1800);
      }, 900 + Math.random() * 800);
    });
  }
});
