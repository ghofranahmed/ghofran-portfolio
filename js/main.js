const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const currentYear = document.querySelector('#current-year');

if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

const setActiveLink = (id) => {
    navLinks.forEach((link) => {
        const listItem = link.parentElement;
        const isActive = link.getAttribute('href') === `#${id}`;

        if (listItem) {
            listItem.classList.toggle('active', isActive);
        }
    });
};

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveLink(entry.target.id);
            }
        });
    },
    {
        rootMargin: '-35% 0px -45% 0px',
        threshold: 0.2,
    }
);

sections.forEach((section) => sectionObserver.observe(section));

if (sections.length > 0) {
    setActiveLink(sections[0].id);
}

if (navToggle && navbar) {
    navToggle.addEventListener('click', () => {
        const isOpen = navbar.classList.toggle('menu-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (navbar && navToggle) {
            navbar.classList.remove('menu-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navbar && navToggle) {
        navbar.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }
});
