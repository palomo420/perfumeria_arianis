        // Menú móvil
        const menuMovilBtn = document.getElementById('menuMovilBtn');
        const menuMovil = document.getElementById('menuMovil');
        
        menuMovilBtn.addEventListener('click', () => {
            menuMovil.classList.toggle('hidden');
            const icon = menuMovilBtn.querySelector('i');
            if (menuMovil.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        const enlacesMenu = document.querySelectorAll('#menuMovil a');
        enlacesMenu.forEach(enlace => {
            enlace.addEventListener('click', () => {
                menuMovil.classList.add('hidden');
                const icon = menuMovilBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
        
        // Smooth scrolling para enlaces internos
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#' || href.includes('http')) return;
                
                e.preventDefault();
                
                const targetId = href;
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil si está abierto
                    if (!menuMovil.classList.contains('hidden')) {
                        menuMovil.classList.add('hidden');
                        const icon = menuMovilBtn.querySelector('i');
                        icon.classList.remove('fa-times');
                        icon.classList.add('fa-bars');
                    }
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Animación de entrada suave
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const fadeInObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        fadeElements.forEach(el => fadeInObserver.observe(el));
        
        // Formulario de contacto
        const formContacto = document.querySelector('section.bg-black form');
        if (formContacto) {
            formContacto.addEventListener('submit', (e) => {
                e.preventDefault();
                alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
                formContacto.reset();
            });
        }
        
        // Formulario newsletter
        const formNewsletter = document.querySelector('section.bg-dorado form');
        if (formNewsletter) {
            formNewsletter.addEventListener('submit', (e) => {
                e.preventDefault();
                const emailInput = formNewsletter.querySelector('input[type="email"]');
                if (emailInput.value) {
                    alert('¡Gracias por suscribirte a nuestro boletín!');
                    emailInput.value = '';
                }
            });
        }
        
        // Funcionalidad del carrusel para móviles
        let isDown = false;
        let startX;
        let scrollLeft;
        const carousel = document.querySelector('.carousel');
        
        if (carousel) {
            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            
            carousel.addEventListener('mouseleave', () => {
                isDown = false;
            });
            
            carousel.addEventListener('mouseup', () => {
                isDown = false;
            });
            
            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
            
            // Soporte táctil
            carousel.addEventListener('touchstart', (e) => {
                startX = e.touches[0].pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            
            carousel.addEventListener('touchmove', (e) => {
                const x = e.touches[0].pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
        }
        
        // Ajustar padding superior en móviles
        function adjustHeaderPadding() {
            const header = document.querySelector('header');
            if (window.innerWidth < 640) {
                document.documentElement.style.setProperty('--header-height', '70px');
            } else {
                document.documentElement.style.setProperty('--header-height', '80px');
            }
        }
        
        window.addEventListener('resize', adjustHeaderPadding);
        adjustHeaderPadding(); // Llamar al cargar la página