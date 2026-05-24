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
