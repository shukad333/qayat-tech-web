// Sticky header style on scroll
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll);
onScroll();

// Mobile menu
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('open');
  links.classList.toggle('open');
});
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  toggle.classList.remove('open');
  links.classList.remove('open');
}));

// Reveal on scroll
const revealEls = document.querySelectorAll('.card, .value, .research, .industry, .process li, .why, .section-head');
revealEls.forEach(el => el.classList.add('reveal'));
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Contact form: opens the visitor's email client with the message pre-filled.
// For a server-side form, replace this with Formspree / Netlify Forms / your own API.
const isArabic = document.documentElement.lang === 'ar';
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const body = isArabic
    ? `الاسم: ${d.name}\nالشركة: ${d.company}\nالبريد الإلكتروني: ${d.email}\nالهاتف: ${d.phone}\nمهتم بـ: ${d.interest}\n\n${d.message}`
    : `Name: ${d.name}\nCompany: ${d.company}\nEmail: ${d.email}\nPhone: ${d.phone}\nInterested in: ${d.interest}\n\n${d.message}`;
  const subject = (isArabic ? 'استفسار من الموقع - ' : 'Website enquiry - ') + d.interest;
  window.location.href = `mailto:info@qayat.qa?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('formNote').textContent = isArabic
    ? 'شكراً لك! سيتم فتح برنامج البريد الإلكتروني لإرسال رسالتك.'
    : 'Thank you! Your email client should open now to send the message.';
});

document.getElementById('year').textContent = new Date().getFullYear();
