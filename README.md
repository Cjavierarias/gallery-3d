# 🎨 Galería 3D Industrial

Una galería web interactiva de productos industriales con visor 3D integrado. Desarrollada con tecnologías web modernas y alojada en GitHub Pages.

## ✨ Características

- **Visor 3D Interactivo**: Rotación, zoom y vista desde cualquier ángulo
- **Diseño Responsive**: Perfecto en móvil, tablet y escritorio
- **Realidad Aumentada**: Ver productos en tu espacio (soportado en dispositivos compatibles)
- **Carga Rápida**: Optimizado para rendimiento
- **100% Estático**: Sin backend requerido
- **Código Modular**: Fácil de personalizar y expandir

## 🚀 Tecnologías utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con animaciones
- **JavaScript Vanilla** - Sin dependencias pesadas
- **Google Model Viewer** - Componente web para 3D
- **GitHub Pages** - Hosting gratuito

## 📦 Instalación y uso local

1. **Clonar el repositorio**
```bash
git clone https://github.com/[tu-usuario]/gallery-3d.git
cd gallery-3d
```

2. **Servir localmente**
```bash
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve .

# Opción 3: VS Code Live Server
# Instalar extensión "Live Server" y hacer clic derecho en index.html
```

3. **Abrir en navegador**
```
http://localhost:8000
```

## 🎯 Uso

- **Navegar**: Explora la galería de productos
- **Ver en 3D**: Haz clic en cualquier producto
- **Interactuar**:
  - Rotar: Arrastrar con mouse o dedo
  - Zoom: Rueda del mouse o pellizcar
  - Reset: Botón "Resetear vista"
  - AR: Botón "Ver en tu espacio" (dispositivos compatibles)

## 📁 Estructura del proyecto

```
gallery-3d/
│
├── index.html          # Página principal
├── css/
│   └── style.css      # Estilos principales
├── js/
│   └── viewer.js      # Lógica del visor 3D
├── assets/
│   ├── images/        # Miniaturas de productos
│   └── models/        # Modelos 3D en formato .glb
└── README.md          # Este archivo
```

## 🎨 Personalización

### Agregar nuevos productos
1. Añadir miniatura en `assets/images/`
2. Añadir modelo 3D en `assets/models/` (formato .glb)
3. Actualizar `index.html`:

```html
<div class="product-card" data-model="assets/models/tu_modelo.glb">
    <img src="assets/images/tu_miniatura.jpg" alt="Descripción" class="product-thumbnail">
    <h3>Título del producto</h3>
    <p>Descripción breve</p>
</div>
```

### Cambiar colores y estilos
Editar `css/style.css`:

```css
:root {
    --primary-color: #667eea;
    --secondary-color: #764ba2;
    --text-color: #333;
    --bg-color: #f5f5f5;
}
```

## 🔧 Optimización

### Reducir tamaño de modelos 3D
Usar glTF Pipeline:
```bash
npm install -g gltf-pipeline
gltf-pipeline -i modelo.glb -o modelo_optimized.glb --draco.compression
```

### Optimización en Blender:
- Reducir polígonos (Decimate Modifier)
- Comprimir texturas
- Exportar con compresión

### Mejorar rendimiento
- Usar imágenes WebP para miniaturas
- Implementar lazy loading para modelos
- Habilitar compresión gzip en servidor

## 📱 Compatibilidad

| Navegador | Versión mínima |
|----------|----------------|
| Chrome   | 72+           |
| Firefox  | 85+           |
| Safari   | 15+           |
| Edge     | 79+           |

## 🌐 Despliegue en GitHub Pages

1. **Subir a GitHub:**
```bash
git add .
git commit -m "Primera versión de la galería 3D"
git push origin main
```

2. **Configurar GitHub Pages:**
   - Ve a Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Save

Tu sitio estará disponible en:
```
https://[tu-usuario].github.io/gallery-3d/
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crea tu rama (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- Google Model Viewer por el componente 3D
- Poly Pizza por modelos 3D gratuitos
- Sketchfab por recursos 3D CC0

## 📞 Soporte

¿Problemas o preguntas? Abre un issue en GitHub.

⭐ Si este proyecto te fue útil, considera darle una estrella en GitHub!