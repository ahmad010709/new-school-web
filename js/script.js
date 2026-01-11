// Sticky Header and Active Link
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);

    // Active link highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        menuToggle.querySelector('i').classList.toggle('fa-bars');
        menuToggle.querySelector('i').classList.toggle('fa-times');
    });
}

// Smooth Scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        // Close mobile menu if open
        if (navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            menuToggle.querySelector('i').classList.add('fa-bars');
            menuToggle.querySelector('i').classList.remove('fa-times');
        }

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Simple Admission Form Submission
const admissionForm = document.getElementById('admissionForm');
if (admissionForm) {
    admissionForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(admissionForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Thank you! Your message has been saved to the database.');
                admissionForm.reset();
            } else {
                alert('Error submitting form. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Could not connect to the server. Make sure the Node.js server is running.');
        }
    });
}

// Section Title Reveal Animation
const observerOptions = {
    threshold: 0.1
};

const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

document.querySelectorAll('.section-title h2').forEach(title => {
    titleObserver.observe(title);
});


// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved user preference
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Modal Logic
window.openModal = function (modalId) {
    document.getElementById(modalId).style.display = 'block';

    // Close mobile menu if open
    const navLinksContainer = document.querySelector('.nav-links');
    const menuToggle = document.querySelector('.menu-toggle');
    if (navLinksContainer.classList.contains('active')) {
        navLinksContainer.classList.remove('active');
        menuToggle.querySelector('i').classList.add('fa-bars');
        menuToggle.querySelector('i').classList.remove('fa-times');
    }
}

window.closeModal = function (modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
}


// Handle Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(loginForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Login Successful!');
                closeModal('loginModal');
                // Create session or redirect here
            } else {
                alert('Invalid Username or Password');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error during login.');
        }
    });
}

// Handle Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(signupForm);
        const data = Object.fromEntries(formData.entries());

        if (data.password !== data.repeat_password) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Account Created Successfully! Please Login.');
                closeModal('signupModal');
                openModal('loginModal');
            } else {
                const msg = await response.text();
                alert('Signup Failed: ' + msg);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error during signup.');
        }
    });
}

// Handle Scholarship Form
const scholarshipForm = document.getElementById('scholarshipForm');
if (scholarshipForm) {
    scholarshipForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(scholarshipForm);
        const data = Object.fromEntries(formData.entries());

        try {
            const response = await fetch('http://localhost:3000/api/scholarship', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                alert('Application Submitted Successfully!');
                scholarshipForm.reset();
            } else {
                alert('Error submitting application.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Server error.');
        }
    });
}
