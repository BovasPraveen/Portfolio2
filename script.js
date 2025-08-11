
// Typing effect
const phrases = ['Full Stack Developer', 'Java & Spring Boot', 'Frontend: HTML, CSS, JS', 'Building reliable apps'];
let idx = 0, char = 0, cur = '', isDeleting=false;
const typedEl = document.getElementById('typed');
function type(){
  const full = phrases[idx];
  if(!isDeleting){
    cur = full.slice(0, ++char);
    typedEl.textContent = cur;
    if(cur === full){ isDeleting = true; setTimeout(type, 900); return; }
  } else {
    cur = full.slice(0, --char);
    typedEl.textContent = cur;
    if(char === 0){ isDeleting = false; idx = (idx+1)%phrases.length; }
  }
  setTimeout(type, isDeleting ? 60 : 120);
}
document.addEventListener('DOMContentLoaded', function(){
  // start typing
  type();

  // nav toggle
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', ()=> navLinks.classList.toggle('show'));

  // smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
      if(navLinks.classList.contains('show')) navLinks.classList.remove('show');
    });
  });

  // form handling with fetch to keep single-page UX
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', async function(e){
    e.preventDefault();
    const formData = new FormData(form);
    try{
      const resp = await fetch(form.action, {
        method:'POST',
        headers:{ 'Accept': 'application/json' },
        body: formData
      });
      if(resp.ok){
        document.getElementById('formResponse').hidden=false;
        document.getElementById('formResponse').textContent = 'Thanks — message sent!';
        form.reset();
      } else {
        const json = await resp.json();
        document.getElementById('formResponse').hidden=false;
        document.getElementById('formResponse').textContent = json.error || 'Oops! There was a problem.';
      }
    }catch(err){
      document.getElementById('formResponse').hidden=false;
      document.getElementById('formResponse').textContent = 'Network error — please try again later.';
    }
  });
});
