document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contact');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(form);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        fetch('https://formspree.io/f/mjkoozej', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status === 200) {
                    alert("Form submitted successfully");
                } else {
                    console.log(response);
                    alert(json.message);
                }
            })
            .catch(error => {
                console.log(error);
                alert("Something went wrong!");
            })
            .then(function() {
                form.reset();
            });
    });
});


// Optional: smooth scroll
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Theme toggle example (light/dark)
// const toggle = document.createElement('button');
// toggle.textContent = '🌙';
// toggle.classList.add('theme-toggle');
// toggle.style = "position:fixed;bottom:1rem;right:1rem;";
// document.body.appendChild(toggle);
// toggle.addEventListener('click', () => {
//   document.body.classList.toggle('dark-mode');
//   toggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
// });
// Smooth scroll for nav
document.querySelectorAll('nav a').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Reveal sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

// Apply to all .section elements
document.querySelectorAll('.section').forEach(section => {
  observer.observe(section);
});

