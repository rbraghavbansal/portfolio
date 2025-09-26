document.addEventListener('DOMContentLoaded', () => {

    // --- Smooth Scrolling for Nav Links ---
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Scroll Animations ---
    const reveal = () => {
        const reveals = document.querySelectorAll('.reveal');
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            } else {
                reveals[i].classList.remove('active');
            }
        }
    };
    window.addEventListener('scroll', reveal);
    reveal(); // Initial check

    // --- Project Modal Logic ---
    const modal = document.getElementById('project-modal');
    const projectCards = document.querySelectorAll('.project-card');
    const closeButton = document.querySelector('.close-button');

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            // Get data from data-* attributes
            const title = card.getAttribute('data-title');
            const tech = card.getAttribute('data-tech');
            const desc = card.getAttribute('data-desc');
            const img = card.getAttribute('data-img');

            // Populate modal
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-tech').innerText = tech;
            document.getElementById('modal-desc').innerText = desc;
            
            const modalImg = document.getElementById('modal-img');
            if (img) {
                modalImg.src = img;
                modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
            }

            modal.style.display = 'block';
        });
    });

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });
    
    // --- Contact Form Handling ---
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        try {
            const response = await fetch('/submit_form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            const result = await response.json();
            
            if (result.status === 'success') {
                formStatus.textContent = 'Message sent successfully!';
                formStatus.style.color = 'var(--accent)';
                form.reset();
            } else {
                formStatus.textContent = 'Something went wrong. Please try again.';
                formStatus.style.color = 'red';
            }
        } catch (error) {
            formStatus.textContent = 'Error sending message.';
            formStatus.style.color = 'red';
        }

        setTimeout(() => { formStatus.textContent = '' }, 5000);
    });
});