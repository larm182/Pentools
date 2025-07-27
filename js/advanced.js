// Funcionalidades avanzadas para el sitio de comandos de pentesting

// Autocompletado para la barra de búsqueda
function initializeAutocomplete() {
    const searchBar = document.getElementById('search-bar');
    const autocompleteContainer = document.createElement('div');
    autocompleteContainer.id = 'autocomplete-container';
    autocompleteContainer.style.cssText = `
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 8px;
        max-height: 200px;
        overflow-y: auto;
        z-index: 1000;
        display: none;
    `;
    
    searchBar.parentElement.style.position = 'relative';
    searchBar.parentElement.appendChild(autocompleteContainer);

    let currentSuggestions = [];
    
    searchBar.addEventListener('input', async (e) => {
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            autocompleteContainer.style.display = 'none';
            return;
        }

        // Obtener sugerencias
        const suggestions = await getSuggestions(query);
        currentSuggestions = suggestions;
        
        if (suggestions.length > 0) {
            renderSuggestions(suggestions, autocompleteContainer);
            autocompleteContainer.style.display = 'block';
        } else {
            autocompleteContainer.style.display = 'none';
        }
    });

    // Manejar navegación con teclado
    searchBar.addEventListener('keydown', (e) => {
        const items = autocompleteContainer.querySelectorAll('.autocomplete-item');
        let selectedIndex = Array.from(items).findIndex(item => item.classList.contains('selected'));

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = selectedIndex < items.length - 1 ? selectedIndex + 1 : 0;
            updateSelection(items, selectedIndex);
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : items.length - 1;
            updateSelection(items, selectedIndex);
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        } else if (e.key === 'Escape') {
            autocompleteContainer.style.display = 'none';
        }
    });

    // Cerrar autocompletado al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (!searchBar.contains(e.target) && !autocompleteContainer.contains(e.target)) {
            autocompleteContainer.style.display = 'none';
        }
    });
}

async function getSuggestions(query) {
    try {
        const response = await fetch('data/tools.json');
        const toolsData = await response.json();
        
        const suggestions = [];
        
        toolsData.forEach(tool => {
            // Sugerir nombres de herramientas
            if (tool.name.toLowerCase().includes(query)) {
                suggestions.push({
                    type: 'tool',
                    text: tool.name,
                    description: tool.description
                });
            }
            
            // Sugerir comandos
            tool.commands.forEach(command => {
                if (command.cmd.toLowerCase().includes(query)) {
                    suggestions.push({
                        type: 'command',
                        text: command.cmd,
                        description: `${tool.name} - ${command.description}`
                    });
                }
            });
        });
        
        return suggestions.slice(0, 8); // Limitar a 8 sugerencias
    } catch (error) {
        console.error('Error obteniendo sugerencias:', error);
        return [];
    }
}

function renderSuggestions(suggestions, container) {
    container.innerHTML = '';
    
    suggestions.forEach((suggestion, index) => {
        const item = document.createElement('div');
        item.className = 'autocomplete-item';
        item.style.cssText = `
            padding: 0.75rem 1rem;
            cursor: pointer;
            border-bottom: 1px solid var(--card-border);
            transition: background-color 0.2s;
        `;
        
        item.innerHTML = `
            <div style="font-weight: bold; color: var(--button-bg);">${suggestion.text}</div>
            <div style="font-size: 0.9rem; color: var(--text-color); opacity: 0.8;">${suggestion.description}</div>
        `;
        
        item.addEventListener('mouseenter', () => {
            updateSelection(container.querySelectorAll('.autocomplete-item'), index);
        });
        
        item.addEventListener('click', () => {
            document.getElementById('search-bar').value = suggestion.text;
            container.style.display = 'none';
            // Trigger search
            const event = new Event('keyup');
            document.getElementById('search-bar').dispatchEvent(event);
        });
        
        container.appendChild(item);
    });
}

function updateSelection(items, selectedIndex) {
    items.forEach((item, index) => {
        if (index === selectedIndex) {
            item.classList.add('selected');
            item.style.backgroundColor = 'var(--button-bg)';
            item.style.color = 'var(--button-text)';
        } else {
            item.classList.remove('selected');
            item.style.backgroundColor = '';
            item.style.color = '';
        }
    });
}

// Funcionalidad de exportar a PDF
function initializeExportToPDF() {
    const exportButton = document.createElement('button');
    exportButton.textContent = 'Exportar PDF';
    exportButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: var(--button-bg);
        color: var(--button-text);
        border: none;
        padding: 0.75rem 1.5rem;
        border-radius: 25px;
        cursor: pointer;
        font-size: 0.9rem;
        transition: background-color 0.3s;
        z-index: 1000;
        box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    `;
    
    exportButton.addEventListener('mouseenter', () => {
        exportButton.style.backgroundColor = 'var(--button-hover)';
    });
    
    exportButton.addEventListener('mouseleave', () => {
        exportButton.style.backgroundColor = 'var(--button-bg)';
    });
    
    exportButton.addEventListener('click', exportToPDF);
    
    document.body.appendChild(exportButton);
}

function exportToPDF() {
    // Crear una ventana nueva con el contenido para imprimir
    const printWindow = window.open('', '_blank');
    const toolCommandsSection = document.getElementById('tool-commands-section');
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Pentools - Comandos de Herramientas de Pentesting - Cheatsheet</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    margin: 20px;
                    line-height: 1.6;
                }
                h1 {
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 30px;
                }
                h3 {
                    color: #3498db;
                    border-bottom: 2px solid #3498db;
                    padding-bottom: 5px;
                    margin-top: 30px;
                }
                h4 {
                    color: #2c3e50;
                    margin-top: 20px;
                }
                .command-box {
                    background-color: #2c3e50;
                    color: #ecf0f1;
                    padding: 10px;
                    border-radius: 5px;
                    font-family: 'Courier New', monospace;
                    margin: 10px 0;
                    word-break: break-all;
                }
                .description {
                    margin-bottom: 15px;
                    color: #555;
                }
                @media print {
                    body { margin: 0; }
                    .no-print { display: none; }
                }
            </style>
        </head>
        <body>
            <h1>Pentools - Comandos de Herramientas de Pentesting - Cheatsheet</h1>
            ${toolCommandsSection.innerHTML.replace(/Copiar/g, '')}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    
    // Esperar a que se cargue y luego imprimir
    setTimeout(() => {
        printWindow.print();
        printWindow.close();
    }, 500);
}

// Funcionalidad de favoritos (usando localStorage)
function initializeFavorites() {
    const favoriteCommands = JSON.parse(localStorage.getItem('favoriteCommands') || '[]');
    
    // Agregar botones de favoritos a cada comando
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('copy-button')) {
            const commandBox = e.target.closest('.command-box');
            if (commandBox && !commandBox.querySelector('.favorite-button')) {
                const favoriteButton = document.createElement('button');
                favoriteButton.className = 'favorite-button';
                favoriteButton.innerHTML = '⭐';
                favoriteButton.style.cssText = `
                    position: absolute;
                    top: 0.5rem;
                    right: 4rem;
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    opacity: 0.7;
                    transition: opacity 0.3s;
                `;
                
                const command = e.target.dataset.command;
                if (favoriteCommands.includes(command)) {
                    favoriteButton.style.opacity = '1';
                }
                
                favoriteButton.addEventListener('click', () => toggleFavorite(command, favoriteButton));
                commandBox.appendChild(favoriteButton);
            }
        }
    });
}

function toggleFavorite(command, button) {
    let favoriteCommands = JSON.parse(localStorage.getItem('favoriteCommands') || '[]');
    
    if (favoriteCommands.includes(command)) {
        favoriteCommands = favoriteCommands.filter(cmd => cmd !== command);
        button.style.opacity = '0.7';
    } else {
        favoriteCommands.push(command);
        button.style.opacity = '1';
    }
    
    localStorage.setItem('favoriteCommands', JSON.stringify(favoriteCommands));
}

// Funcionalidad de historial de búsqueda
function initializeSearchHistory() {
    const searchBar = document.getElementById('search-bar');
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory') || '[]');
    
    searchBar.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.target.value.trim()) {
            const query = e.target.value.trim();
            
            // Agregar al historial (evitar duplicados)
            searchHistory = searchHistory.filter(item => item !== query);
            searchHistory.unshift(query);
            searchHistory = searchHistory.slice(0, 10); // Mantener solo los últimos 10
            
            localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        }
    });
}

// Inicializar todas las funcionalidades avanzadas
document.addEventListener('DOMContentLoaded', () => {
    // Esperar un poco para que se cargue el script principal
    setTimeout(() => {
        initializeAutocomplete();
        initializeExportToPDF();
        initializeFavorites();
        initializeSearchHistory();
    }, 100);
});

