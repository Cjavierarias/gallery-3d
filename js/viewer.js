// Gestión del visor 3D interactivo
class GalleryViewer {
    constructor() {
        this.modal = document.getElementById('viewer-modal');
        this.modelViewer = document.getElementById('model-viewer');
        this.modalTitle = document.getElementById('modal-title');
        this.closeBtn = document.querySelector('.close');
        this.productCards = document.querySelectorAll('.product-card');
        
        this.currentModel = null;
        this.isRotating = true;
        
        this.init();
    }

    init() {
        // Event listeners para las tarjetas de producto
        this.productCards.forEach(card => {
            card.addEventListener('click', () => this.openModal(card));
        });

        // Event listeners para el modal
        this.closeBtn.addEventListener('click', () => this.closeModal());
        
        // Cerrar modal al hacer clic fuera
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });

        // Controles personalizados
        this.setupControls();

        // Eventos del model-viewer
        this.setupModelViewerEvents();

        // Prevenir scroll del body cuando el modal está abierto
        this.modal.addEventListener('show', () => {
            document.body.style.overflow = 'hidden';
        });

        this.modal.addEventListener('hide', () => {
            document.body.style.overflow = '';
        });
    }

    openModal(card) {
        const modelSrc = card.dataset.model;
        const productTitle = card.querySelector('h3').textContent;
        const productImage = card.querySelector('img').src;

        // Actualizar título del modal
        this.modalTitle.textContent = `Visor 3D - ${productTitle}`;

        // Mostrar modal
        this.modal.style.display = 'block';
        
        // Cargar modelo 3D
        this.loadModel(modelSrc);

        // Añadir animación de entrada
        setTimeout(() => {
            this.modal.querySelector('.modal-content').style.animation = 'slideIn 0.3s ease';
        }, 10);
    }

    closeModal() {
        // Animación de salida
        this.modal.querySelector('.modal-content').style.animation = 'slideOut 0.3s ease';
        
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modelViewer.src = '';
            this.modelViewer.classList.remove('loaded');
        }, 300);
    }

    loadModel(src) {
        // Mostrar loader
        this.modelViewer.classList.remove('loaded');
        
        // Cargar nuevo modelo
        this.modelViewer.src = src;
        
        // Resetear controles
        this.isRotating = true;
        this.modelViewer.autoRotate = true;
        document.getElementById('toggle-rotation').textContent = 'Pausar rotación';
    }

    setupControls() {
        // Botón de resetear cámara
        document.getElementById('reset-camera').addEventListener('click', () => {
            this.modelViewer.cameraTarget = 'auto auto auto';
            this.modelViewer.cameraOrbit = '0deg 75deg 105%';
            this.modelViewer.fieldOfView = '45deg';
        });

        // Botón de toggle rotación
        document.getElementById('toggle-rotation').addEventListener('click', () => {
            this.isRotating = !this.isRotating;
            this.modelViewer.autoRotate = this.isRotating;
            document.getElementById('toggle-rotation').textContent = 
                this.isRotating ? 'Pausar rotación' : 'Reanudar rotación';
        });
    }

    setupModelViewerEvents() {
        // Cuando el modelo se carga completamente
        this.modelViewer.addEventListener('load', () => {
            console.log('Modelo 3D cargado exitosamente');
            this.modelViewer.classList.add('loaded');
            
            // Configuración adicional post-carga
            setTimeout(() => {
                this.modelViewer.cameraOrbit = '0deg 75deg 105%';
                this.modelViewer.autoRotateDelay = 1000;
            }, 100);
        });

        // Manejo de errores
        this.modelViewer.addEventListener('error', (event) => {
            console.error('Error al cargar el modelo 3D:', event);
            this.showError('Error al cargar el modelo 3D. Por favor, intenta de nuevo.');
        });

        // Eventos de interacción
        this.modelViewer.addEventListener('camera-change', (event) => {
            // Puedes añadir lógica adicional cuando la cámara cambia
            console.log('Cámara movida');
        });

        // Detectar dispositivos móviles para ajustar comportamiento
        if (this.isMobile()) {
            this.modelViewer.touchAction = 'pan-y';
        }
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: #e74c3c;">
                <h3>¡Ups!</h3>
                <p>${message}</p>
            </div>
        `;
        
        this.modelViewer.style.display = 'none';
        this.modal.querySelector('.viewer-container').appendChild(errorDiv);
        
        setTimeout(() => {
            errorDiv.remove();
            this.modelViewer.style.display = 'block';
        }, 3000);
    }

    isMobile() {
        return window.innerWidth <= 768 || 
               /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

// Animación de salida para el modal
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(-50px); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar la galería cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new GalleryViewer();
});

// Optimización de rendimiento
document.addEventListener('DOMContentLoaded', () => {
    // Precargar imágenes de miniaturas
    const images = document.querySelectorAll('.product-thumbnail');
    images.forEach(img => {
        const preloadImg = new Image();
        preloadImg.src = img.src;
    });

    // Lazy loading para modelos 3D (se cargan solo cuando se abre el modal)
    console.log('Galería 3D inicializada y optimizada');
});

// Service Worker para caché offline (opcional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
        console.log('Service Worker no registrado (opcional)');
    });
}
