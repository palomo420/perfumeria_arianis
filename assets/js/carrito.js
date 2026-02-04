// Sistema de Carrito de Compras

// Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar producto al carrito
function agregarAlCarrito(event) {
    event.preventDefault();
    
    // Obtener la tarjeta del producto más cercana
    const tarjeta = event.target.closest('.perfume-bottle');
    if (!tarjeta) return;
    
    // Extraer información del producto
    const nombre = tarjeta.querySelector('h3')?.textContent || 'Producto sin nombre';
    const precio = tarjeta.querySelector('.text-dorado.text-lg, .text-dorado.text-2xl')?.textContent || '0';
    const descripcion = tarjeta.querySelector('p')?.textContent || '';
    
    // Crear ID único para el producto
    const productoId = nombre.toLowerCase().replace(/\s+/g, '-');
    
    // Verificar si el producto ya existe en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);
    
    if (productoExistente) {
        // Si existe, aumentar cantidad
        productoExistente.cantidad++;
    } else {
        // Si no existe, agregar nuevo producto
        carrito.push({
            id: productoId,
            nombre: nombre,
            precio: parseFloat(precio.replace(/[^\d.-]/g, '')),
            descripcion: descripcion,
            cantidad: 1
        });
    }
    
    // Guardar carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Actualizar contador
    actualizarContador();
    
    // Mostrar modal con los detalles del producto
    mostrarModalProducto(nombre, precio);
}

// Función para actualizar el contador del carrito
function actualizarContador() {
    const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    const contadores = document.querySelectorAll('.carrito-contador');
    
    contadores.forEach(contador => {
        contador.textContent = totalProductos;
    });
}

// Función para mostrar modal de confirmación
function mostrarModalProducto(nombre, precio) {
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in';
    modal.id = 'modal-producto';
    
    const contenido = document.createElement('div');
    contenido.className = 'bg-white rounded-lg shadow-2xl p-8 max-w-md w-full mx-4 transform transition-all animate-scale-up';
    
    contenido.innerHTML = `
        <div class="text-center">
            <div class="mb-6">
                <i class="fas fa-check-circle text-5xl text-green-500"></i>
            </div>
            <h2 class="text-2xl font-bold text-black mb-4">¡Producto Agregado!</h2>
            <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <p class="text-gray-700 font-semibold mb-2">${nombre}</p>
                <p class="text-dorado text-2xl font-bold">${precio}</p>
            </div>
            <p class="text-gray-600 mb-6">Producto agregado al carrito correctamente.</p>
            <div class="flex gap-3">
                <button class="flex-1 bg-gray-200 text-gray-800 font-semibold py-3 px-4 rounded-lg hover:bg-gray-300 transition duration-300" onclick="cerrarModal()">
                    Continuar Comprando
                </button>
                <button class="flex-1 bg-dorado text-black font-semibold py-3 px-4 rounded-lg hover:shadow-lg transition duration-300" onclick="irAlCarrito()">
                    <i class="fas fa-shopping-bag mr-2"></i> Ordenar
                </button>
            </div>
        </div>
    `;
    
    modal.appendChild(contenido);
    document.body.appendChild(modal);
    
    // Cerrar al hacer clic en el fondo
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

// Función para cerrar el modal
function cerrarModal() {
    const modal = document.getElementById('modal-producto');
    if (modal) {
        modal.style.animation = 'fadeOut 0.3s ease-out';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
}

// Función para ir al carrito
function irAlCarrito() {
    alert('Redirigiendo a la página de compra...');
    // Aquí puedes redirigir a la página del carrito/checkout
    // window.location.href = 'carrito.html';
}

// Función para agregar event listeners a todos los botones
function inicializarBotonesCarrito() {
    const botonesAgregar = document.querySelectorAll('button:has(.fa-shopping-bag)');
    
    botonesAgregar.forEach(boton => {
        // Verificar si el texto contiene "agregar"
        const textoBoton = boton.textContent.toLowerCase();
        if (textoBoton.includes('agregar')) {
            boton.addEventListener('click', agregarAlCarrito);
        }
    });
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    inicializarBotonesCarrito();
    actualizarContador();
});

// También ejecutar cuando el contenido dinámico se carga
document.addEventListener('contentloaded', () => {
    inicializarBotonesCarrito();
    actualizarContador();
});

// Exportar funciones para uso en consola si es necesario
window.carrito = carrito;
window.verCarrito = () => console.table(carrito);
window.limpiarCarrito = () => {
    carrito = [];
    localStorage.removeItem('carrito');
    actualizarContador();
    console.log('Carrito vaciado');
};
