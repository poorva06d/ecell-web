document.addEventListener('DOMContentLoaded', () => {
  // YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // TYPEWRITER
  const phrases = ["Frontend Developer", "Loves JavaScript", "Open to collaboration"];
  let tIndex = 0, chIndex = 0, forward = true;
  const typeNode = document.getElementById('typewriter');
  const cursor = document.querySelector('.cursor');
  function tick() {
    const full = phrases[tIndex];
    if (forward) {
      chIndex++;
      if (chIndex >= full.length) { forward = false; setTimeout(tick, 1200); return; }
    } else {
      chIndex--;
      if (chIndex <= 0) { forward = true; tIndex = (tIndex+1) % phrases.length; setTimeout(tick, 250); return; }
    }
    typeNode.textContent = full.slice(0,chIndex);
    setTimeout(tick, forward ? 80 : 35);
  }
  tick();
  // blink cursor
  setInterval(()=> cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0', 600);

  // THEME TOGGLE
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  themeToggle.addEventListener('click', ()=>{
    body.classList.toggle('light');
    localStorage.setItem('theme', body.classList.contains('light') ? 'light' : 'dark');
  });
  // restore theme
  if(localStorage.getItem('theme') === 'light') body.classList.add('light');

  // PROJECT MODAL
  const projects = document.querySelectorAll('.project');
  const modal = document.getElementById('proj-modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalLink = document.getElementById('modal-link');
  const modalGithub = document.getElementById('modal-github');
  const modalClose = document.getElementById('modal-close');

  projects.forEach(p => {
    p.addEventListener('click', ()=>{
      const title = p.dataset.title;
      const desc = p.dataset.desc;
      const img = p.dataset.img;
      const link = p.dataset.link || '#';
      modalImg.src = img;
      modalTitle.textContent = title;
      modalDesc.textContent = desc;
      modalLink.href = link;
      modalGithub.href = link;
      modal.style.display = 'flex';
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });
  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });
  function closeModal(){ modal.style.display = 'none'; modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(ev){
      const href = this.getAttribute('href');
      if(href === '#') return;
      ev.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      if(nav.style.display === 'flex' && window.innerWidth < 980) nav.style.display = 'none';
    });
  });
});

