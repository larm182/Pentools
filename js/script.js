document.addEventListener('DOMContentLoaded', async () => {
    const searchBar = document.getElementById('search-bar');
    const categoriesSidebar = document.getElementById('categories-sidebar');
    const toolCommandsSection = document.getElementById('tool-commands-section');

    // Cargar datos desde el archivo JSON
    let toolsData = [];
    try {
        const response = await fetch('data/tools.json');
        toolsData = await response.json();
    } catch (error) {
        console.error('Error cargando datos:', error);
        toolCommandsSection.innerHTML = '<p>Error cargando los datos de las herramientas.</p>';
        return;
    }

    // Función para renderizar los comandos de las herramientas
    const renderTools = (filter = '') => {
        toolCommandsSection.innerHTML = '';
        const filteredTools = toolsData.filter(tool => 
            tool.name.toLowerCase().includes(filter.toLowerCase()) ||
            tool.description.toLowerCase().includes(filter.toLowerCase()) ||
            tool.commands.some(cmd => cmd.cmd.toLowerCase().includes(filter.toLowerCase()))
        );

        if (filteredTools.length === 0) {
            toolCommandsSection.innerHTML = '<p>No se encontraron comandos para su búsqueda.</p>';
            return;
        }

        filteredTools.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.classList.add('tool-card');
            toolCard.innerHTML = `
                <h3>${tool.name}</h3>
                <p>${tool.description}</p>
            `;

            tool.commands.forEach(command => {
                const commandSection = document.createElement('div');
                commandSection.classList.add('command-section');
                commandSection.innerHTML = `
                    <h4>${command.type}</h4>
                    <div class="command-box">
                        <pre>${command.cmd}</pre>
                        <button class="copy-button" data-command="${command.cmd}">Copiar</button>
                    </div>
                    <p>${command.description}</p>
                `;
                toolCard.appendChild(commandSection);
            });
            toolCommandsSection.appendChild(toolCard);
        });

        // Añadir event listeners a los botones de copiar
        document.querySelectorAll('.copy-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const commandToCopy = e.target.dataset.command;
                navigator.clipboard.writeText(commandToCopy).then(() => {
                    e.target.textContent = '¡Copiado!';
                    setTimeout(() => e.target.textContent = 'Copiar', 2000);
                }).catch(err => {
                    console.error('Error al copiar: ', err);
                });
            });
        });
    };

    // Funcionalidad de búsqueda
    searchBar.addEventListener('keyup', (e) => {
        renderTools(e.target.value);
    });

    // Funcionalidad de filtrado por categoría
    categoriesSidebar.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const category = e.target.dataset.category;
            const filteredTools = toolsData.filter(tool => tool.category === category);
            toolCommandsSection.innerHTML = '';
            if (filteredTools.length === 0) {
                toolCommandsSection.innerHTML = '<p>No se encontraron herramientas en esta categoría.</p>';
                return;
            }
            filteredTools.forEach(tool => {
                const toolCard = document.createElement('div');
                toolCard.classList.add('tool-card');
                toolCard.innerHTML = `
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
                `;
                tool.commands.forEach(command => {
                    const commandSection = document.createElement('div');
                    commandSection.classList.add('command-section');
                    commandSection.innerHTML = `
                        <h4>${command.type}</h4>
                        <div class="command-box">
                            <pre>${command.cmd}</pre>
                            <button class="copy-button" data-command="${command.cmd}">Copiar</button>
                        </div>
                        <p>${command.description}</p>
                    `;
                    toolCard.appendChild(commandSection);
                });
                toolCommandsSection.appendChild(toolCard);
            });

            // Añadir event listeners a los botones de copiar
            document.querySelectorAll('.copy-button').forEach(button => {
                button.addEventListener('click', (e) => {
                    const commandToCopy = e.target.dataset.command;
                    navigator.clipboard.writeText(commandToCopy).then(() => {
                        e.target.textContent = '¡Copiado!';
                        setTimeout(() => e.target.textContent = 'Copiar', 2000);
                    }).catch(err => {
                        console.error('Error al copiar: ', err);
                    });
                });
            });
        }
    });

    // Modo oscuro/claro
    const themeToggle = document.createElement('button');
    themeToggle.classList.add('theme-toggle');
    themeToggle.textContent = 'Modo Oscuro';
    document.body.appendChild(themeToggle);

    themeToggle.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = 'Modo Oscuro';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = 'Modo Claro';
        }
    });

    // Renderizar todas las herramientas al cargar la página
    renderTools();
});

