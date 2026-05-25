import { contactData } from '../data/contact.js';

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
    ${data.sales.items.length == 0 ? ''
      : `<div class="contact-card">
        <h3>👩‍💼 ${data.sales.title}</h3>
        ${renderContactItems(data.sales.items)}
      </div>`}
    ${data.dayDelivery.items.length == 0 ? ''
      : `<div class="contact-card">
        <h3>🚚 ${data.dayDelivery.title}</h3>
        ${renderContactItems(data.dayDelivery.items)}
      </div>`}
    ${data.nightDelivery.items.length == 0 ? ''
      : `<div class="contact-card">
        <h3>⏰ ${data.nightDelivery.title}</h3>
        ${renderContactItems(data.nightDelivery.items)}
      </div>`}
    </div>
    <div class="contact-footer-info">
      <strong>🍀 ${data.manager.title}</strong>
      ${renderContactItems(data.manager.items)}
      <strong>Xin cảm ơn quý khách hàng!!!</strong>
      <p style="margin-top: var(--spacing-md);">Nhận thương lượng trao đổi về số lượng lớn và chịu trách nhiệm pháp lý</p>
    </div>
  `;
}

function initContact() {
  renderContactSection(contactData);
}

document.addEventListener('partialsLoaded', initContact);
