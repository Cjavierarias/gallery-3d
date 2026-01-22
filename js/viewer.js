// js/viewer.js - Versión corregida
document.addEventListener('DOMContentLoaded', function() {
    console.log('Galería 3D inicializando...');
    
    const modal = document.getElementById('viewer-modal');
    const modelViewer = document.getElementById('model-viewer');
    const modalTitle = document.getElementById('modal-title');
    const closeBtn = document.querySelector('.close');
    const productCards = document.querySelectorAll('.product-card');
    
    let isRotating = true;

    // Función para abrir el modal
    function openModal(card) {
        const modelSrc = card.dataset.model;
        const productTitle = card.querySelector('h3').textContent;
        
        console.log('Abriendo modal con modelo:', modelSrc);
        
        modalTitle.textContent = `Visor 3D - ${productTitle}`;
        modal.style.display = 'block';
        
        // Cargar modelo con timeout
        setTimeout(() => {
            modelViewer.src = modelSrc;
        }, 100);
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.style.display = 'none';
        modelViewer.src = '';
    }

    // Event listeners para tarjetas
    productCards.forEach(card => {
        card.addEventListener('click', () => openModal(card));
        card.style.cursor = 'pointer'; // Asegurar que se vea clickable
    });

    // Event listeners para modal
    closeBtn.addEventListener('click', closeModal);
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Controles
    document.getElementById('reset-camera').addEventListener('click', () => {
        if (modelViewer) {
            modelViewer.cameraTarget = 'auto auto auto';
            modelViewer.cameraOrbit = '0deg 75deg 105%';
            console.log('Cámara reseteada');
        }
    });

    document.getElementById('toggle-rotation').addEventListener('click', (e) => {
        if (modelViewer) {
            isRotating = !isRotating;
            modelViewer.autoRotate = isRotating;
            e.target.textContent = isRotating ? 'Pausar rotación' : 'Reanudar rotación';
            console.log('Rotación:', isRotating ? 'activada' : 'pausada');
        }
    });

    // Eventos del model-viewer
    modelViewer.addEventListener('load', () => {
        console.log('✅ Modelo cargado exitosamente');
        modelViewer.classList.add('loaded');
        
        // Configurar cámara inicial
        setTimeout(() => {
            modelViewer.cameraOrbit = '0deg 75deg 105%';
        }, 500);
    });

    modelViewer.addEventListener('error', (event) => {
        console.error('❌ Error al cargar modelo:', event);
        alert('Error al cargar el modelo 3D. Verifica la ruta del archivo.');
    });

    // Detectar carga lenta
    let loadingTimeout = setTimeout(() => {
        if (!modelViewer.classList.contains('loaded')) {
            console.warn('⚠️ La carga está tardando más de lo esperado');
        }
    }, 5000);

    modelViewer.addEventListener('load', () => {
        clearTimeout(loadingTimeout);
    });
});
