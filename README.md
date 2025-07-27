# Comandos de Pentesting - Sitio Web

Un sitio web completo para consultar comandos de herramientas de pentesting con funcionalidades avanzadas de búsqueda, categorización y exportación.

## 🚀 Características

### Funcionalidades Principales
- **Catálogo completo de herramientas** de pentesting organizadas por categorías
- **Barra de búsqueda** con autocompletado inteligente
- **Categorización** por tipo de herramienta (Escaneo, Vulnerabilidades, Fuerza Bruta, etc.)
- **Comandos detallados** con descripción y casos de uso
- **Copiar comandos** con un solo clic
- **Modo oscuro/claro** para mejor experiencia de usuario
- **Exportación a PDF** de los comandos
- **Sistema de favoritos** (usando localStorage)
- **Historial de búsqueda**
- **Diseño responsive** para móviles y escritorio

### Categorías Incluidas
- 🔍 **Escaneo y Enumeración** (Nmap, Gobuster, theHarvester, FFUF, ETC)
- 🛡️ **Detección de Vulnerabilidades** (Nikto, Nuclei, WPScan, ETC)
- 🔐 **Fuerza Bruta y Cracking** (Hydra, John the Ripper, Hashcat, ETC)
- 📡 **Intercepción y Manipulación de Tráfico** (Wireshark, Burp Suite, ETC)
- 💉 **Explotación** (Metasploit, SQLMap, ETC)
- 🔎 **OSINT** (Shodan, Maltego, ETC)
- 🎭 **Ingenieria Social** (Set, zphisher, ETC)

## 🛠️ Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS para temas
- **JavaScript ES6+** - Funcionalidades interactivas
- **JSON** - Base de datos de comandos
- **Responsive Design** - Compatible con todos los dispositivos

## 📁 Estructura del Proyecto

```
pentesting-commands-app/
├── index.html              # Página principal
├── css/
│   └── style.css           # Estilos principales
├── js/
│   ├── script.js           # Funcionalidades básicas
│   └── advanced.js         # Funcionalidades avanzadas
├── data/
│   └── tools.json          # Base de datos de herramientas
└── README.md               # Documentación
```

## 🚀 Instalación y Uso

### Opción 1: Servidor Local
```bash
# Navegar al directorio del proyecto
cd pentesting-commands-app

# Iniciar servidor HTTP local
python3 -m http.server 8000

# Abrir en el navegador
# http://localhost:8000
```

### Opción 2: Abrir Directamente
Simplemente abrir el archivo `index.html` en cualquier navegador web moderno.

## 📖 Guía de Uso

### Búsqueda de Comandos
1. **Búsqueda por texto**: Escribir en la barra de búsqueda para filtrar herramientas y comandos
2. **Autocompletado**: El sistema sugiere herramientas y comandos mientras escribes
3. **Navegación con teclado**: Usar flechas arriba/abajo y Enter para seleccionar sugerencias

### Navegación por Categorías
- Hacer clic en cualquier categoría del sidebar para filtrar herramientas
- Cada categoría muestra solo las herramientas relevantes

### Copiar Comandos
- Hacer clic en el botón "Copiar" junto a cualquier comando
- El comando se copia al portapapeles automáticamente
- Confirmación visual con cambio de texto del botón

### Modo Oscuro/Claro
- Usar el botón "Modo Oscuro/Claro" en la esquina superior derecha
- El tema se mantiene entre sesiones del navegador

### Exportar a PDF
- Hacer clic en "Exportar PDF" para generar un documento imprimible
- Se abre una nueva ventana con formato optimizado para impresión

### Favoritos
- Los comandos copiados muestran un botón de estrella
- Hacer clic para agregar/quitar de favoritos
- Los favoritos se guardan localmente en el navegador

## 🔧 Personalización

### Agregar Nuevas Herramientas
Editar el archivo `data/tools.json` con la siguiente estructura:

```json
{
  "category": "Nombre de la Categoría",
  "name": "Nombre de la Herramienta",
  "description": "Descripción breve de la herramienta",
  "commands": [
    {
      "type": "Tipo de Comando",
      "cmd": "comando -flags argumentos",
      "description": "Descripción del comando"
    }
  ]
}
```

### Modificar Estilos
- Editar `css/style.css` para cambiar colores, fuentes o layout
- Las variables CSS en `:root` controlan el tema claro
- Las variables en `[data-theme="dark"]` controlan el tema oscuro

### Agregar Funcionalidades
- Funcionalidades básicas en `js/script.js`
- Funcionalidades avanzadas en `js/advanced.js`

## 🌐 Compatibilidad

- **Navegadores**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **Dispositivos**: Escritorio, tablet y móvil
- **Resoluciones**: Optimizado para 320px - 4K

## 📝 Herramientas Incluidas

### Escaneo y Enumeración
- **Nmap**: Escaneo de puertos y servicios
- **Gobuster**: Fuerza bruta de directorios y subdominios
- **theHarvester**: Recopilación de información OSINT
- **FFUF**: Fuzzing web rápido

### Detección de Vulnerabilidades
- **Nikto**: Escaneo de vulnerabilidades web
- **Nuclei**: Escaneo basado en plantillas
- **WPScan**: Análisis de seguridad WordPress

### Fuerza Bruta y Cracking
- **Hydra**: Ataques de fuerza bruta multiprotocolo
- **John the Ripper**: Cracking de contraseñas
- **Hashcat**: Cracking con aceleración GPU

### Intercepción y Manipulación
- **Wireshark**: Análisis de tráfico de red
- **Burp Suite**: Testing de aplicaciones web

### Explotación
- **Metasploit**: Framework de explotación
- **SQLMap**: Explotación de inyección SQL

### OSINT
- **Shodan**: Motor de búsqueda de dispositivos
- **Maltego**: Análisis de enlaces y minería de datos

## 🤝 Contribuciones

Para contribuir al proyecto:
1. Agregar nuevas herramientas al archivo JSON
2. Mejorar la interfaz de usuario
3. Optimizar el rendimiento
4. Reportar bugs o sugerir mejoras

## 📄 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🔒 Nota de Seguridad

Este sitio web es únicamente para fines educativos y de investigación en seguridad. Usar estas herramientas solo en sistemas propios o con autorización explícita. El uso no autorizado puede ser ilegal.

---

**Desarrollado para la comunidad de pentesting y seguridad informática** 🛡️

