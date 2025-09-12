/* Small JS: typewriter, scroll-based animations, modal for projects, theme toggle, form stub */

document.addEventListener('DOMContentLoaded', () => {
  // YEAR
  document.getElementById('year').textContent = new Date().getFullYear();

  // TYPEWRITER
  const phrases = ["Frontend Developer", "UI/UX Enthusiast", "Loves JavaScript", "Open to collaboration"];
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

  // MENU (mobile)
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('main-nav');
  menuToggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // SKILL BARS: animate when in view
  const skillBars = document.querySelectorAll('.bar > div');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el = e.target;
        const level = el.getAttribute('data-level');
        el.style.width = level + '%';
      } else {
        // optionally collapse when out of view:
        //e.target.style.width = '0%';
      }
    });
  }, {threshold: 0.45});
  skillBars.forEach(b => obs.observe(b));

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

  // CONTACT FORM (simple JS stub)
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    if(!name || !email || !message){ alert('Please complete the form.'); return; }
    // Option 1: open mailto (simple)
    const mailto = `mailto:you@example.com?subject=${encodeURIComponent('Portfolio contact from '+name)}&body=${encodeURIComponent(message + '\n\n--\n' + name + '\n' + email)}`;
    window.location.href = mailto;
    // Option 2: send via API — replace with your backend or Formspree
  });

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
