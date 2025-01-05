document.addEventListener('DOMContentLoaded', () => {
    // Elementos del DOM
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const links = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const contactForm = document.getElementById('contactForm');
    const themeToggle = document.getElementById('checkbox');

    // Función para manejar el scroll y actualizar la navegación
    function handleScroll() {
        const scrollPosition = window.scrollY;

        // Cambiar estilo del header al hacer scroll
        if (scrollPosition > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Actualizar link activo en la navegación
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                links.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').slice(1) === section.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    // Event listener para el scroll
    window.addEventListener('scroll', handleScroll);

    // Navegación suave al hacer clic en los links
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
            // Cerrar menú móvil si está abierto
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // Toggle del menú móvil
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Animación de las barras de progreso de habilidades
    function animateSkills() {
        const skillBars = document.querySelectorAll('.progreso');
        skillBars.forEach(bar => {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 100);
        });
    }

    // Observador de intersección para animar las habilidades cuando sean visibles
    const skillsSection = document.getElementById('habilidades');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(skillsSection);

    // Manejo del formulario de contacto
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const response = await fetch('/api/enviar-email', {
            method: 'POST',
            body: JSON.stringify(Object.fromEntries(formData)),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const result = await response.json();
        if (result.success) {
            alert('Mensaje enviado con éxito!');
            contactForm.reset();
        } else {
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
        }
    });

    // Cambio de tema (claro/oscuro)
    function setTheme(isDark) {
        document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }

    // Verificar preferencia de tema guardada
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme === 'dark');
        themeToggle.checked = savedTheme === 'dark';
    } else {
        // Si no hay preferencia guardada, usar la preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
        themeToggle.checked = prefersDark;
    }

    themeToggle.addEventListener('change', () => {
        setTheme(themeToggle.checked);
    });

    // Actualizar tema si cambia la preferencia del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        setTheme(e.matches);
        themeToggle.checked = e.matches;
    });
});