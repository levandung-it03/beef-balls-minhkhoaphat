const siteComponents = [
  'header',
  'hero',
  'products',
  'location',
  'sales-info',
  'contact',
  'footer'
];

async function loadComponent(name) {
  const container = document.getElementById(name);
  if (!container) return;

  try {
    const response = await fetch(`./partials/${name}.html`);
    if (!response.ok) {
      throw new Error(`Không tải được component ${name}`);
    }
    container.innerHTML = await response.text();
  } catch (error) {
    console.error(error);
    container.innerHTML = `<div class="component-error">Không tải được phần ${name}. Vui lòng thử lại sau.</div>`;
  }
}

async function loadComponents() {
  await Promise.all(siteComponents.map(loadComponent));
  document.dispatchEvent(new Event('partialsLoaded'));
}
