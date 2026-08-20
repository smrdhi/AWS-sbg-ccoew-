const header = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-link');
const revealItems = document.querySelectorAll('.reveal');
const statItems = document.querySelectorAll('[data-count]');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.getElementById('lightbox-close');
// const galleryImages = document.querySelectorAll('.gallery-track img');
const galleryImages = document.querySelectorAll(
    '.gallery-track img, .timeline-gallery img'
);

const updateHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('chapter-card')) {
          animateStats();
        }
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));

const animateStats = () => {
  statItems.forEach((item, index) => {
    const target = Number(item.dataset.count);
    const duration = 1100 + index * 120;
    let start = 0;
    const step = () => {
      const progress = Math.min(1, (Date.now() - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(target * eased);
      item.textContent = value.toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
    };
    const startTime = Date.now();
    requestAnimationFrame(step);
  });
};

window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('load', updateHeader);

const countdownDate = new Date('2026-07-17T14:00:00').getTime();
const countdownEl = document.getElementById('countdown');

const updateCountdown = () => {
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    countdownEl.textContent = 'Now live';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownEl.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
};

updateCountdown();
setInterval(updateCountdown, 1000);

// const sections = document.querySelectorAll('main section[id]');
// const activeSection = (id) => {
//   navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
// };

// const sectionObserver = new IntersectionObserver(
//   (entries) => {
//     entries.forEach((entry) => {
//       if (entry.isIntersecting) activeSection(entry.target.id);
//     });
//   },
//   { threshold: 0.45 }
// );

// sections.forEach((section) => sectionObserver.observe(section));
const sections = document.querySelectorAll("main section[id]");

window.addEventListener("scroll", () => {
  let current = "home";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");

    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

// Make Home active on first load
window.dispatchEvent(new Event("scroll"));
// 

galleryImages.forEach((image) => {
  image.addEventListener('click', () => {
    lightboxImage.src = image.src;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

const closeLightbox = () => {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
};

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox();
});

// new addn

const particleContainer = document.getElementById("particles");

for(let i=0;i<40;i++){

const p=document.createElement("span");

p.className="particle";

p.style.left=Math.random()*100+"vw";

p.style.animationDuration=
10+Math.random()*15+"s";

p.style.animationDelay=
Math.random()*10+"s";

p.style.opacity=Math.random();

particleContainer.appendChild(p);

}
// cursor effect
 const cursor=document.querySelector(".cursor-light");

 document.addEventListener("mousemove",e=>{

 cursor.style.left=e.clientX+"px"; 

 cursor.style.top=e.clientY+"px";

 });