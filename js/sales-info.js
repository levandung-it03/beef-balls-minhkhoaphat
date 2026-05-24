const SALE_DATA_URL = './data/sale.json';
const SELECTORS = {
  deliveryInfo: 'deliveryInfo',
  pricingContainer: 'pricingTableContainer'
};

function getElement(id) {
  return document.getElementById(id);
}

function formatPrice(value) {
  if (typeof value === 'number') {
    return new Intl.NumberFormat('vi-VN').format(value) + 'đ';
  }

  if (typeof value === 'string') {
    const normalized = value.replace(/\D/g, '');
    if (!normalized) return value;
    return new Intl.NumberFormat('vi-VN').format(Number(normalized)) + 'đ';
  }

  return '';
}

function renderPricingTable(data) {
  const pricingContainer = getElement(SELECTORS.pricingContainer);
  if (!pricingContainer) return;

  const rows = (Array.isArray(data) ? data : []).map(item => `
      <tr>
        <td>${item.name || ''}</td>
        <td>${item.unit || ''}</td>
        <td class="price">${formatPrice(item.price)}</td>
        <td>${item.note || ''}</td>
      </tr>
    `).join('');

  pricingContainer.innerHTML = `
    <table class="pricing-table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Đơn vị</th>
          <th>Giá</th>
          <th>Ghi chú</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
  `;
}

function renderDeliveryInfo(delivery) {
  const deliveryInfo = getElement(SELECTORS.deliveryInfo);
  if (!deliveryInfo) return;

  const safeArray = (value) => Array.isArray(value) ? value : [];
  const renderList = (title, items) => `
    <div class="delivery-item">
      <strong>${title}</strong>
      <ul>
        ${safeArray(items).map(item => `<li>${item}</li>`).join('')}
      </ul>
    </div>
  `;

  deliveryInfo.innerHTML = `
    ${renderList('TP HCM:', safeArray(delivery?.tphcm))}
    ${renderList('Khách tỉnh:', safeArray(delivery?.others))}
  `;
}

function renderError(targetId, message) {
  const target = getElement(targetId);
  if (!target) return;
  target.innerHTML = `<div class="delivery-error">${message}</div>`;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Fetch failed: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function loadSaleData() {
  try {
    return await fetchJson(SALE_DATA_URL);
  } catch (error) {
    console.error('loadSaleData:', error);
    return {};
  }
}

async function initSalesInfo() {
  const saleData = await loadSaleData();

  renderDeliveryInfo(saleData.delivery);
  renderPricingTable(saleData.price);
}

document.addEventListener('partialsLoaded', initSalesInfo);
