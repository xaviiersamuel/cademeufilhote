(function () {
  const scriptPath = document.currentScript ? document.currentScript.getAttribute('src') || '' : '';
  const scriptFile = 'js/loadComponents.js';
  const basePath = scriptPath.endsWith(scriptFile) ? scriptPath.slice(0, -scriptFile.length) || './' : './';

  window.appBasePath = basePath;

  const components = [
    { id: 'navbar-container', file: 'navbar.html' },
    { id: 'sidebar-left-container', file: 'sidebar-left.html' },
  ];

  function isRelativePath(value) {
    return value && !value.startsWith('#') && !value.startsWith('http') && !value.startsWith('mailto:') && !value.startsWith('tel:') && !value.startsWith('data:') && !value.startsWith('/');
  }

  function resolveInjectedPaths(container) {
    container.querySelectorAll('[src]').forEach((element) => {
      const value = element.getAttribute('src');
      if (isRelativePath(value)) {
        element.setAttribute('src', `${basePath}${value}`);
      }
    });

    container.querySelectorAll('[href]').forEach((element) => {
      const value = element.getAttribute('href');
      if (isRelativePath(value)) {
        element.setAttribute('href', `${basePath}${value}`);
      }
    });
  }

  function applySidebarVariant(container) {
    if (container.dataset.sidebarVariant !== 'share') return;

    container.innerHTML = `
      <div class="contacts-card">
        <h3>Compartilhar com Contatos</h3>
        <ul id="contactsListShare"></ul>
      </div>
    `;
  }

  function loadComponent(component) {
    const container = document.getElementById(component.id);

    if (!container || container.dataset.componentDisabled === 'true') {
      return Promise.resolve();
    }

    return fetch(`${basePath}components/${component.file}?v=${Date.now()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao carregar ${component.file}`);
        }
        return response.text();
      })
      .then((html) => {
        container.innerHTML = html;
        applySidebarVariant(container);
        resolveInjectedPaths(container);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  Promise.all(components.map(loadComponent))
    .then(() => {
      window.componentsLoaded = true;
      document.dispatchEvent(new CustomEvent('componentsLoaded'));
    });
})();
