// script.js - interactions and animations

// Mobile menu toggle
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
menuBtn?.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
      // close mobile menu
      navLinks.classList.remove('show');
    }
  });
});

// Intersection Observer for fade-in
const faders = document.querySelectorAll('.fade-in');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      // optionally unobserve
      io.unobserve(entry.target);
    }
  });
},{threshold:0.2});
faders.forEach(f=>io.observe(f));

// Typing effect for hero
const typingEl = document.querySelector('.typing');
if(typingEl){
  const full = typingEl.textContent;
  typingEl.textContent = '';
  let i=0;
  const speed = 60;
  function type(){
    if(i<=full.length){
      typingEl.textContent = full.slice(0,i) + (i%2===0 ? '|' : '');
      i++;
      setTimeout(type, speed);
    } else {
      typingEl.textContent = full; // finish
    }
  }
  type();
}

// Active nav link on scroll
const sections = document.querySelectorAll('main section, header');
const navAs = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec=>{
    const top = sec.offsetTop - 90;
    if(pageYOffset >= top) current = sec.getAttribute('id');
  });
  navAs.forEach(a=>{
    a.classList.remove('active');
    if(a.getAttribute('href') === '#' + current) a.classList.add('active');
  });
});

// Small accessibility helper: prefers-reduced-motion
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
if(prefersReduce.matches){
  document.querySelectorAll('*').forEach(el=>el.style.animationDuration='0s');
}
