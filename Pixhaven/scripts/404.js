// 404.js - countdown redirect and interactive 3D tilt
(function () {
  const countdownEl = document.getElementById('countdown');
  const card = document.querySelector('.card');
  const goHome = document.getElementById('goHome');
  let count = 10;
  if (countdownEl) countdownEl.textContent = count;

  // countdown timer
  const timer = setInterval(() => {
    count -= 1;
    if (countdownEl) countdownEl.textContent = count;
    if (count <= 0) {
      clearInterval(timer);
      // redirect to index.html
      window.location.href = './index.html';
    }
  }, 1000);

  // interactive 3D tilt on mouse move
  if (card) {
    const scene = document.querySelector('.scene');
    scene.addEventListener('mousemove', (e) => {
      const rect = scene.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rx = (-y / rect.height) * 12; // rotateX
      const ry = (x / rect.width) * 18; // rotateY
      card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
    });
    scene.addEventListener('mouseleave', () => { card.style.transform = '' });
  }

  // clicking home link stops the timer
  if (goHome) goHome.addEventListener('click', () => clearInterval(timer));
})();
