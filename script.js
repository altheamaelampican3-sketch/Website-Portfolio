// 1. SMOOTH SCROLL
document.querySelectorAll('.nav-links a[href^="#"], .hero-buttons a').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// 2. ACTIVE NAV LINK SA SCROLL
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 150) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});

// 3. TYPING EFFECT
const words = ['Aspiring Web Developer', 'Creative Learner', 'Future Web Designer'];
const typingEl = document.getElementById('typing');
let w = 0, c = 0, deleting = false;

function type() {
  if (!typingEl) return;
  const word = words[w];
  typingEl.textContent = word.substring(0, c);

  if (!deleting && c < word.length) {
    c++;
  } else if (deleting && c > 0) {
    c--;
  } else if (!deleting) {
    deleting = true;
    setTimeout(type, 1200);
    return;
  } else {
    deleting = false;
    w = (w + 1) % words.length;
  }
  setTimeout(type, deleting ? 50 : 100);
}
type();

// 4. FADE-IN SA SCROLL
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('show');
  });
}, { threshold: 0.1 });
document.querySelectorAll('.fade').forEach(el => observer.observe(el));

// 5. MOBILE MENU
const menuBtn = document.getElementById('menu-btn');
const navMenu = document.querySelector('.nav-links');

if (menuBtn && navMenu) {
  menuBtn.addEventListener('click', () => navMenu.classList.toggle('open'));
  navMenu.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => navMenu.classList.remove('open'))
  );
}

// 6. BACK TO TOP
const topBtn = document.getElementById('top-btn');

if (topBtn) {
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );
}

// 7. PROFILE PICTURE EFFECTS
const profile = document.getElementById('profile');

if (profile) {
  profile.addEventListener('mouseenter', () => profile.classList.add('hover-glow'));

  profile.addEventListener('mouseleave', () => {
    profile.classList.remove('hover-glow');
    profile.style.transform = '';
  });

  profile.addEventListener('mousemove', e => {
    const rect = profile.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // 3D tilt
    profile.style.transform =
      'perspective(600px) scale(1.05) rotateY(${x * 15}deg) rotateX(${-y * 15}deg)';

    // sparkle
    if (Math.random() < 0.2) {
      const spark = document.createElement('div');
      spark.className = 'sparkle';
      spark.style.left = (e.clientX - rect.left) + 'px';
      spark.style.top = (e.clientY - rect.top) + 'px';
      profile.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    }
  });

  // click = burst sa sparkles
  profile.addEventListener('click', () => {
    for (let i = 0; i < 12; i++) {
      const spark = document.createElement('div');
      spark.className = 'sparkle';
      const angle = (i / 12) * Math.PI * 2;
      spark.style.left = (50 + Math.cos(angle) * 40) + '%';
      spark.style.top = (50 + Math.sin(angle) * 40) + '%';
      profile.appendChild(spark);
      setTimeout(() => spark.remove(), 800);
    }
  });
}