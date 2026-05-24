function renderContactItems(items) {
  return items.map(item => `
    <div class="contact-person">
      <span class="person-name">${item.name}</span>
      <div class="person-phone">
        <span class="phone-icon">📞</span>
        <a href="${item.href}" class="phone-link">${item.phone}</a>
        <span class="zalo-badge">Zalo</span>
      </div>
    </div>
  `).join('');
}

function renderContactSection(data) {
  const container = document.getElementById('contactContent');
  if (!container) return;

  container.innerHTML = `
    <div class="contact-grid">
      <div class="contact-card">
        <h3>${data.sales.title}</h3>
        ${renderContactItems(data.sales.items)}
      </div>
      <div class="contact-card">
        <h3>${data.dayDelivery.title}</h3>
        ${renderContactItems(data.dayDelivery.items)}
      </div>
      <div class="contact-card">
        <h3>${data.nightDelivery.title}</h3>
        ${renderContactItems(data.nightDelivery.items)}
      </div>
    </div>
    <div class="contact-footer-info">
      <strong>${data.manager.title}</strong>
      ${renderContactItems(data.manager.items)}
      <strong>${data.manager.subtitle}</strong>
      <p style="margin-top: var(--spacing-md);">${data.manager.note}</p>
    </div>
  `;
}

async function loadContactData() {
  try {
    const response = await fetch('./data/contact.json');
    if (!response.ok) {
      throw new Error('Không tải được dữ liệu liên hệ');
    }
    const data = await response.json();
    renderContactSection(data);
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener('partialsLoaded', loadContactData);
