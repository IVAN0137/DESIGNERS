document.addEventListener('DOMContentLoaded', () => {
    // Cambio de tema oscuro
    const themeSwitch = document.getElementById('checkbox');
    themeSwitch.addEventListener('change', () => {
        document.body.setAttribute('data-theme', themeSwitch.checked ? 'dark' : 'light');
        localStorage.setItem('theme', themeSwitch.checked ? 'dark' : 'light');
    });

    // Restaurar tema desde localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        themeSwitch.checked = true;
    }

    // Menú responsive
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    // Al hacer clic en el icono del menú, mostrar u ocultar el menú
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Si se hace clic en un enlace de navegación, cerramos el menú
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
        });
    });

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(anchor.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Botón para volver arriba
    const scrollToTop = document.createElement('button');
    scrollToTop.textContent = '↑';
    scrollToTop.classList.add('scroll-to-top');
    document.body.appendChild(scrollToTop);

    window.addEventListener('scroll', () => {
        scrollToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    scrollToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Animación de barras de progreso
    const barras = document.querySelectorAll('.barra-progreso .progreso');
    const opciones = { threshold: 0.5 };
    const observador = new IntersectionObserver((entradas) => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.width = entrada.target.getAttribute('style').split(':')[1];
            }
        });
    }, opciones);

    barras.forEach(barra => observador.observe(barra));
});
