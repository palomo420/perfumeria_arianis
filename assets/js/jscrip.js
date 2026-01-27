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
        
        // Funcionalidad del carrusel mejorado
        function initCarousel() {
            const carouselInner = document.getElementById('carouselInner');
            const nextBtn = document.getElementById('nextBtn');
            const prevBtn = document.getElementById('prevBtn');
            const indicators = document.querySelectorAll('.carousel-indicator');
            
            // Validar que los elementos existan
            if (!carouselInner || indicators.length === 0) {
                console.log('Elementos del carrusel no encontrados');
                return;
            }
            
            let currentIndex = 0;
            let autoplayInterval;
            const autoplayDelay = 5000; // 5 segundos
            
            // Actualizar posición del carrusel
            function updateCarousel() {
                const translateX = -currentIndex * 100;
                carouselInner.style.transform = `translateX(${translateX}%)`;
                updateIndicators();
            }
            
            // Actualizar indicadores
            function updateIndicators() {
                indicators.forEach((indicator, index) => {
                    if (index === currentIndex) {
                        indicator.classList.add('active', 'bg-dorado');
                        indicator.classList.remove('bg-gray-300');
                    } else {
                        indicator.classList.remove('active', 'bg-dorado');
                        indicator.classList.add('bg-gray-300');
                    }
                });
            }
            
            // Ir al índice especificado
            function goToIndex(index) {
                const totalItems = carouselInner.children.length;
                if (index < 0) {
                    currentIndex = totalItems - 1;
                } else if (index >= totalItems) {
                    currentIndex = 0;
                } else {
                    currentIndex = index;
                }
                updateCarousel();
                resetAutoplay();
            }
            
            // Siguiente slide
            function nextSlide() {
                goToIndex(currentIndex + 1);
            }
            
            // Slide anterior
            function prevSlide() {
                goToIndex(currentIndex - 1);
            }
            
            // Iniciar autoplay
            function startAutoplay() {
                autoplayInterval = setInterval(nextSlide, autoplayDelay);
            }
            
            // Detener autoplay
            function stopAutoplay() {
                clearInterval(autoplayInterval);
            }
            
            // Resetear autoplay
            function resetAutoplay() {
                stopAutoplay();
                startAutoplay();
            }
            
            // Event Listeners para botones
            if (nextBtn) nextBtn.addEventListener('click', nextSlide);
            if (prevBtn) prevBtn.addEventListener('click', prevSlide);
            
            // Event Listeners para indicadores
            indicators.forEach(indicator => {
                indicator.addEventListener('click', () => {
                    const index = parseInt(indicator.getAttribute('data-index'));
                    goToIndex(index);
                });
            });
            
            // Soporte para navegación con teclado
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowRight') nextSlide();
                if (e.key === 'ArrowLeft') prevSlide();
            });
            
            // Soporte táctil/swipe
            let touchStartX = 0;
            carouselInner.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopAutoplay();
            });
            
            carouselInner.addEventListener('touchend', (e) => {
                const touchEndX = e.changedTouches[0].screenX;
                const diff = touchStartX - touchEndX;
                
                if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                }
                resetAutoplay();
            });
            
            // Pausar en hover
            carouselInner.addEventListener('mouseenter', stopAutoplay);
            carouselInner.addEventListener('mouseleave', startAutoplay);
            
            // Inicializar
            updateCarousel();
            startAutoplay();
        }
        
        // Inicializar cuando el DOM esté listo
        document.addEventListener('DOMContentLoaded', () => {
            initCarousel();
        });