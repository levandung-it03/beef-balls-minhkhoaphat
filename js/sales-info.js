const defaultPricingData = [
  { name: 'Bò viên thường', unit: '1kg', price: '45.000đ', note: 'Bò viên cơ bản' },
  { name: 'Bò viên gân', unit: '1kg', price: '55.000đ', note: 'Có chứa gân bò' },
  { name: 'Bò viên siêu gân', unit: '1kg', price: '65.000đ', note: 'Gân nhiều, chất lượng cao' },
  { name: 'Gân trâu sạch', unit: '1kg', price: '75.000đ', note: 'Gân trâu tươi sạch' },
  { name: 'Gân bò sạch', unit: '1kg', price: '70.000đ', note: 'Gân bò tươi sạch' }
];

function renderPricingTable(data) {
  const pricingContainer = document.getElementById('pricingTableContainer');
  if (!pricingContainer) return;

  let tableHTML = `
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
  `;

  data.forEach(item => {
    tableHTML += `
      <tr>
        <td>${item.name}</td>
        <td>${item.unit}</td>
        <td class="price">${item.price}</td>
        <td>${item.note}</td>
      </tr>
    `;
  });

  tableHTML += `
      </tbody>
    </table>
  `;

  pricingContainer.innerHTML = tableHTML;
}

async function loadPricingData() {
  const pricingContainer = document.getElementById('pricingTableContainer');
  if (!pricingContainer) return;

  try {
    if (window.FirebaseUtil && typeof window.FirebaseUtil.getPricingData === 'function') {
      const data = await window.FirebaseUtil.getPricingData();
      renderPricingTable(data.length > 0 ? data : defaultPricingData);
    } else {
      renderPricingTable(defaultPricingData);
    }
  } catch (error) {
    console.error(error);
    renderPricingTable(defaultPricingData);
  }
}

document.addEventListener('partialsLoaded', loadPricingData);
