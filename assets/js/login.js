 // Manejo del formulario
        const loginForm = document.getElementById('loginForm');
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const emailError = document.getElementById('emailError');
        const passwordError = document.getElementById('passwordError');
        const successMessage = document.getElementById('successMessage');

        // Validar email
        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        // Limpiar errores
        emailInput.addEventListener('focus', () => {
            emailError.style.display = 'none';
        });

        passwordInput.addEventListener('focus', () => {
            passwordError.style.display = 'none';
        });

        // Envío del formulario
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let hasError = false;
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            // Validar email
            if (!email) {
                emailError.textContent = 'El correo es requerido';
                emailError.style.display = 'block';
                hasError = true;
            } else if (!validateEmail(email)) {
                emailError.textContent = 'Ingresa un correo válido';
                emailError.style.display = 'block';
                hasError = true;
            }

            // Validar contraseña
            if (!password) {
                passwordError.textContent = 'La contraseña es requerida';
                passwordError.style.display = 'block';
                hasError = true;
            } else if (password.length < 6) {
                passwordError.textContent = 'La contraseña debe tener al menos 6 caracteres';
                passwordError.style.display = 'block';
                hasError = true;
            }

            if (!hasError) {
                // Aquí iría la lógica de envío al servidor
                successMessage.textContent = '✓ Iniciando sesión...';
                successMessage.style.display = 'block';
                
                // Simular envío (después conectarías con tu backend)
                setTimeout(() => {
                    console.log('Datos de login:', { email, password });
                    // window.location.href = 'index.html'; // Redireccionar después del login
                }, 2000);
            }
        });

        // Función para recuperar contraseña
        function handleForgotPassword(e) {
            e.preventDefault();
            alert('Se te enviará un correo de recuperación a: ' + emailInput.value || 'tu@email.com');
        }