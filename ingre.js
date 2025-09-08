document.addEventListener('DOMContentLoaded', function() {
    const uploadForm = document.getElementById('uploadForm');
    const perfumeGallery = document.getElementById('perfumeGallery');
    const sortSelect = document.getElementById('sortSelect');
    let perfumes = JSON.parse(localStorage.getItem('perfumes')) || [];

    // Initial render of perfumes
    renderPerfumes();

    // Form submission handler
    uploadForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('perfumeName').value;
        const brand = document.getElementById('perfumeBrand').value;
        const imageFile = document.getElementById('perfumeImage').files[0];
        const pdfFile = document.getElementById('perfumePdf').files[0];

        if (!imageFile) {
            showToast('Por favor, sube una imagen para el perfume.', 'error');
            return;
        }

        // Validate image file size (MAX. 5MB)
        if (imageFile.size > 5 * 1024 * 1024) {
            showToast('La imagen es demasiado grande. Máximo 5MB.', 'error');
            return;
        }

        // Validate PDF file size (MAX. 10MB)
        if (pdfFile && pdfFile.size > 10 * 1024 * 1024) {
            showToast('El archivo PDF es demasiado grande. Máximo 10MB.', 'error');
            return;
        }

        try {
            const imageDataUrl = await readFileAsDataURL(imageFile);
            let pdfDataUrl = null;
            if (pdfFile) {
                pdfDataUrl = await readFileAsDataURL(pdfFile);
            }

            const newPerfume = {
                id: Date.now(),
                name: name,
                brand: brand,
                image: imageDataUrl,
                date: new Date().toISOString(),
                pdf: pdfDataUrl 
            };

            perfumes.push(newPerfume);
            savePerfumes();
            renderPerfumes();
            uploadForm.reset();
            showToast('Perfume añadido con éxito!', 'success');

        } catch (error) {
            console.error("Error al procesar los archivos:", error);
            showToast('Error al añadir el perfume. Inténtalo de nuevo.', 'error');
        }
    });

    // Sort perfumes when selection changes
    sortSelect.addEventListener('change', function() {
        renderPerfumes();
    });

    /**
     * Renders the perfume cards in the gallery based on the current sort order.
     */
    function renderPerfumes() {
        let sortedPerfumes = [...perfumes];
        
        switch(sortSelect.value) {
            case 'newest':
                sortedPerfumes.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case 'oldest':
                sortedPerfumes.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'name':
                sortedPerfumes.sort((a, b) => a.name.localeCompare(b.name));
                break;
        }
        
        perfumeGallery.innerHTML = ''; // Clear existing cards
        
        if (sortedPerfumes.length === 0) {
            perfumeGallery.innerHTML = `
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-spray-can text-5xl text-purple-300 mb-4"></i>
                    <h3 class="text-xl font-medium text-purple-700">No hay perfumes aún</h3>
                    <p class="text-purple-500">Sube tu primer perfume usando el formulario superior</p>
                </div>
            `;
            return;
        }
        
        sortedPerfumes.forEach(perfume => {
            const perfumeCard = document.createElement('div');
            perfumeCard.className = 'perfume-card bg-white rounded-xl shadow-md overflow-hidden fade-in';
            perfumeCard.innerHTML = `
                <div class="h-48 bg-purple-100 flex items-center justify-center overflow-hidden">
                    ${perfume.image ? 
                        `<img src="${perfume.image}" alt="${perfume.name}" class="w-full h-full object-contain p-4">` : 
                        `<i class="fas fa-spray-can text-5xl text-purple-400"></i>`}
                </div>
                <div class="p-4">
                    <h3 class="font-semibold text-lg text-purple-900">${perfume.name}</h3>
                    <p class="text-purple-600 text-sm">${perfume.brand}</p>
                    <div class="flex justify-between items-center mt-3">
                        <span class="text-xs text-purple-400">${formatDate(perfume.date)}</span>
                        <div class="flex space-x-2">
                            ${perfume.pdf ? 
                                `<button data-id="${perfume.id}" class="download-pdf-btn text-blue-400 hover:text-blue-600 transition-colors" title="Descargar PDF">
                                    <i class="fas fa-file-download"></i>
                                </button>` : ''}
                            <button data-id="${perfume.id}" class="delete-perfume-btn text-red-400 hover:text-red-600 transition-colors" title="Eliminar">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            perfumeGallery.appendChild(perfumeCard);
        });

        // Add event listeners to newly created buttons
        document.querySelectorAll('.delete-perfume-btn').forEach(button => {
            button.addEventListener('click', function() {
                deletePerfume(parseInt(this.dataset.id));
            });
        });

        document.querySelectorAll('.download-pdf-btn').forEach(button => {
            button.addEventListener('click', function() {
                downloadPdf(parseInt(this.dataset.id));
            });
        });
    }

    /**
     * Saves the current perfumes array to localStorage.
     */
    function savePerfumes() {
        localStorage.setItem('perfumes', JSON.stringify(perfumes));
    }

    /**
     * Reads a File object and returns its content as a Data URL.
     * @param {File} file - The file to read.
     * @returns {Promise<string>} A promise that resolves with the Data URL.
     */
    function readFileAsDataURL(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
            reader.readAsDataURL(file);
        });
    }

    /**
     * Formats a date string into a more readable format.
     * @param {string} dateString - The date string to format.
     * @returns {string} The formatted date.
     */
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    /**
     * Displays a toast notification.
     * @param {string} message - The message to display.
     * @param {'success'|'error'} type - The type of notification (determines color).
     */
    function showToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium flex items-center ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } opacity-0 transition-opacity duration-300`;
        toast.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            ${message}
        `;
        document.body.appendChild(toast);
        
        // Trigger fade-in
        setTimeout(() => {
            toast.classList.remove('opacity-0');
        }, 10); // Small delay to allow CSS transition to apply

        // Trigger fade-out and removal
        setTimeout(() => {
            toast.classList.add('opacity-0');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Deletes a perfume from the collection.
     * @param {number} id - The ID of the perfume to delete.
     */
    window.deletePerfume = function(id) { // Made global for direct access from HTML (though event delegation is preferred)
        if (confirm('¿Estás seguro de que quieres eliminar este perfume?')) {
            perfumes = perfumes.filter(p => p.id !== id);
            savePerfumes();
            renderPerfumes(); // Re-render the gallery
            showToast('Perfume eliminado con éxito!', 'success');
        }
    };

    /**
     * Downloads the PDF associated with a perfume.
     * @param {number} id - The ID of the perfume whose PDF is to be downloaded.
     */
    window.downloadPdf = function(id) { // Made global for direct access from HTML
        const perfume = perfumes.find(p => p.id === id);
        
        if (perfume && perfume.pdf) {
            const link = document.createElement('a');
            link.href = perfume.pdf;
            // Sanitize filename for download
            const fileName = `${perfume.name.replace(/[^\w\s.-]/gi, '').replace(/\s+/g, '_')}_ficha_tecnica.pdf`;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            showToast('Descargando PDF...', 'success');
        } else {
            showToast('No hay PDF disponible para este perfume.', 'error');
        }
    };
});