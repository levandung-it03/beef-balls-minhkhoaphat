# NHÀ BÒ VIÊN - Static Website

A clean, modular static HTML/CSS/JavaScript website for a Vietnamese beef balls and tendon supplier.

## Project Structure

This is a pure static website with **NO server-side rendering** and **NO JSX**. All files are organized for easy maintenance and deployment.

```
/
├── index.html              # Main HTML entry point
├── css/                    # All stylesheets
│   ├── root.css           # Global styles, variables, dark mode
│   ├── header.css         # Header component styles
│   ├── hero.css           # Hero section styles
│   ├── products.css       # Products section styles
│   ├── location.css       # Location section styles
│   ├── sales-info.css     # Sales/pricing section styles
│   ├── contact.css        # Contact section styles
│   └── footer.css         # Footer styles
├── js/                     # All JavaScript files
│   ├── theme.js           # Theme toggle (light/dark mode)
│   ├── header.js          # Header component logic
│   ├── hero.js            # Hero section logic
│   ├── products.js        # Products section logic
│   ├── location.js        # Location section logic
│   ├── sales-info.js      # Pricing table logic
│   ├── contact.js         # Contact section logic
│   ├── footer.js          # Footer component logic
│   ├── firebase-util.js   # Firebase integration utilities
│   └── main.js            # Application initialization
├── assets/                 # Images and other media
│   └── placeholder.jpg
└── public/                 # Static assets (icons, etc)
```

## Features

✅ **Dark/Light Theme Toggle** - Persistent theme preference using localStorage
✅ **Fully Responsive** - Mobile-first design, works on all devices
✅ **Modular Components** - Each section is independent and reusable
✅ **Zero Dependencies** - Pure HTML, CSS, JavaScript (no frameworks)
✅ **Fast & Lightweight** - Minimal file sizes, instant load times
✅ **Smooth Animations** - Scroll-based animations and transitions
✅ **Modern Design** - Clean, professional look with premium colors
✅ **Firebase Ready** - Prepared for Firestore integration for pricing

## Running the Website

### Local Development
```bash
# Using Python 3
python3 -m http.server 8000

# Using Node.js http-server
npx http-server -p 8000

# Visit: http://localhost:8000
```

### Deployment
Simply upload all files to your hosting provider:
- Traditional hosting (cPanel, etc.)
- Static site hosts (GitHub Pages, Netlify, Vercel)
- Any web server that serves static files

## File Organization

### CSS Architecture
- **root.css**: Contains CSS custom properties (variables) for consistent theming
- **Component CSS files**: Each component has its own stylesheet with responsive breakpoints
- **Dark mode**: Implemented using `body.dark` class selector
- **Responsive**: Mobile-first approach with breakpoints at 768px and 480px

### JavaScript Architecture
- **theme.js**: Handles theme toggle and persistence
- **Component JS files**: Each contains the HTML template and initialization logic
- **main.js**: Application-wide setup (smooth scroll, animations, navigation)
- **firebase-util.js**: Firebase configuration template and utilities

## Customization

### Update Colors
Edit `/css/root.css` and modify the CSS custom properties:
```css
:root {
  --color-primary: #D4705F;  /* Main brand color */
  --color-accent: #2D5016;   /* Accent color */
  /* ... */
}
```

### Update Content
Edit individual component JS files in `/js/`:
- `header.js` - Navigation and header
- `hero.js` - Hero section
- `products.js` - Product cards
- `contact.js` - Contact information
- `footer.js` - Footer content

### Add Images
1. Place images in `/assets/` folder
2. Update the path in the component files:
```javascript
<img src="./assets/your-image.jpg" alt="Description">
```

## Firebase Integration

To enable Firebase pricing data:

1. Create a Firebase project and Firestore database
2. Add your Firebase config to `js/firebase-util.js`
3. Create a "pricing" collection in Firestore
4. The pricing table will automatically load from Firebase

### Firestore Schema
```
collection: "pricing"
documents: {
  name: "Bò viên thường",
  unit: "1kg",
  price: "45.000đ",
  note: "Bò viên cơ bản"
}
```

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Performance

- First Paint: < 1s
- Fully Interactive: < 2s
- Total Bundle Size: < 500KB
- No external dependencies

## License

© 2024 NHÀ BÒ VIÊN. All rights reserved.

```sql
DROP TABLE IF EXISTS sale_delivery;
DROP TABLE IF EXISTS sale_price;
DROP TABLE IF EXISTS contact_item;
DROP TABLE IF EXISTS contact_types;

CREATE TABLE sale_delivery (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    place TEXT NOT NULL CHECK(place IN ('HCM', 'OTHERS')),
    value NVARCHAR(50) NOT NULL
);

CREATE TABLE sale_price (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name NVARCHAR(40) NOT NULL,
    unit NVARCHAR(5),
    price NVARCHAR(20),
    note NVARCHAR(50)
);

CREATE TABLE contact_types (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    code NVARCHAR(50),
    title NVARCHAR(50) NOT NULL
);

CREATE TABLE contact_item (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    types_id BIGINT NOT NULL,
    name NVARCHAR(40) NOT NULL,
    phone NVARCHAR(20),

    CONSTRAINT fk_contact_item_types
        FOREIGN KEY (types_id)
        REFERENCES contact_types(id)
);
```

```sql
-- =========================
-- INSERT CONTACT TYPES
-- =========================

INSERT INTO contact_types(id, code, title)
VALUES
    (1, 'sales', 'Quản lý bán hàng'),
    (2, 'day_delivery', 'Giao hàng ca sáng & tỉnh'),
    (3, 'night_delivery', 'Xử lý giao hàng ca chiều'),
    (4, 'manager', 'Khiếu nại & Tương thương');


-- =========================
-- INSERT CONTACT ITEMS
-- =========================

INSERT INTO contact_item(id, types_id, name, phone)
VALUES
(
  	1,
    (SELECT id FROM contact_types WHERE code = 'sales'),
    'Chi Huệ',
    '082 5689824'
),

(
  	2,
    (SELECT id FROM contact_types WHERE code = 'day_delivery'),
    'Anh Đến',
    '090 9681659'
),

(
  	3,
    (SELECT id FROM contact_types WHERE code = 'day_delivery'),
    'Quốc Việt',
    '086 5078892'
),

(
  	4,
    (SELECT id FROM contact_types WHERE code = 'night_delivery'),
    'Anh Khoa',
    '+84 90 9269441'
),

(
  	5,
    (SELECT id FROM contact_types WHERE code = 'night_delivery'),
    'Anh Thiên',
    '090 2339633'
),

(
  	6,
    (SELECT id FROM contact_types WHERE code = 'night_delivery'),
    'Anh Vượng',
    '+84 90 9094995'
),

(
  	7,
    (SELECT id FROM contact_types WHERE code = 'manager'),
    'Chị Nga',
    '090 2047479'
);
-- =========================
-- INSERT DELIVERY RULES
-- =========================

INSERT INTO sale_delivery(id, place, value)
VALUES
    (1, 'HCM', 'Nhận đơn trước 12h trưa mỗi ngày'),
    (2, 'HCM', 'Đơn sau 12h rời qua ngày mai'),
    (3, 'HCM', 'Giao đơn 2-5h chiều mỗi ngày'),

    (4, 'OTHERS', 'Nhận trước 1 ngày'),
    (5, 'OTHERS', 'Cọc 200k làm tin'),
    (6, 'OTHERS', 'Ra chành gửi biên nhận thanh toán hết mới thả hàng');

-- =========================
-- INSERT PRICE LIST
-- =========================

INSERT INTO sale_price(id, name, unit, price, note)
VALUES
    (
  			1,
        'Bò viên thường',
        '1kg',
        45000,
        'Bò viên cơ bản'
    ),

    (
  			2,
        'Bò viên gân',
        '1kg',
        45000,
        'Bò viên có vừa gân bò'
    ),

    (
  			3,
        'Bò viên siêu gân',
        '1kg',
        45000,
        'Bò viên có nhiều gân bò'
    ),

    (
  			4,
        'Gân bò & trâu',
        '1kg',
        45000,
        'Hỗn hợp gân bò & trâu đã làm sạch'
    );
```