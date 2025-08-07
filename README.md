# TrendStyle - Modern E-commerce Website

A beautiful, responsive e-commerce website built with HTML, CSS, and JavaScript featuring trending products, modern design, and interactive shopping cart functionality.

## 🌟 Features

### Design & UI
- **Modern Aesthetic**: Clean, minimalist design with gradient backgrounds and smooth animations
- **Responsive Layout**: Fully responsive design that works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, smooth transitions, and engaging animations
- **Beautiful Typography**: Uses Inter font family for modern, readable text

### Product Showcase
- **Trending Products**: 12 carefully curated trending products with high-quality images
- **Product Categories**: Fashion, Tech, Home & Living, and Beauty categories
- **Product Badges**: Visual indicators for hot items, new arrivals, and best sellers
- **Detailed Information**: Product names, descriptions, and pricing

### Shopping Experience
- **Shopping Cart**: Interactive cart with add/remove functionality
- **Cart Modal**: Beautiful modal popup for cart management
- **Quantity Controls**: Increase/decrease product quantities
- **Real-time Updates**: Cart count and total price updates instantly

### User Experience
- **Smooth Scrolling**: Navigation links with smooth scroll behavior
- **Notifications**: Toast notifications for user actions
- **Newsletter Signup**: Email subscription with validation
- **Mobile-Friendly**: Optimized for mobile devices with touch-friendly interactions

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and modern structure
- **CSS3**: Advanced styling with Flexbox, Grid, and animations
- **JavaScript (ES6+)**: Interactive functionality and dynamic content
- **Font Awesome**: Icons for enhanced visual appeal
- **Google Fonts**: Inter font family for typography
- **Unsplash**: High-quality product images

## 📁 Project Structure

```
trendstyle/
├── index.html          # Main HTML file
├── styles.css          # CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional dependencies required

### Installation
1. Clone or download the project files
2. Open `index.html` in your web browser
3. The website will load with all features ready to use

### Running Locally
```bash
# If you have Python installed
python -m http.server 8000

# If you have Node.js installed
npx serve .

# Or simply open index.html in your browser
```

## 🎨 Design Features

### Color Scheme
- **Primary Gradient**: Purple to blue gradient (#667eea to #764ba2)
- **Accent Colors**: Orange-red gradient for CTAs (#ff6b6b to #ee5a24)
- **Neutral Colors**: Clean whites and grays for content areas

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear typographic scale for headings and body text

### Animations
- **Fade-in Effects**: Products and categories animate in sequence
- **Hover Transforms**: Cards lift and scale on hover
- **Floating Animation**: Hero section card with continuous floating motion
- **Smooth Transitions**: All interactive elements have smooth transitions

## 📱 Responsive Design

The website is fully responsive with breakpoints at:
- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: Below 768px

### Mobile Features
- Collapsible navigation menu
- Touch-friendly buttons and interactions
- Optimized layouts for small screens
- Proper spacing and typography scaling

## 🛒 Shopping Cart Features

### Functionality
- Add products to cart
- Remove products from cart
- Adjust quantities
- Real-time total calculation
- Persistent cart state during session

### Cart Modal
- Beautiful slide-in animation
- Product images and details
- Quantity controls
- Total price display
- Checkout button (placeholder)

## 📧 Newsletter Integration

- Email validation
- Success/error notifications
- Clean form design
- Responsive layout

## 🔧 Customization

### Adding Products
To add new products, edit the `trendingProducts` array in `script.js`:

```javascript
{
    id: 13,
    name: "Your Product Name",
    description: "Product description",
    price: 99.99,
    image: "https://your-image-url.com/image.jpg",
    category: "Category",
    badge: "🔥 Hot" // Optional
}
```

### Styling Changes
- Modify colors in `styles.css` variables
- Adjust animations and transitions
- Update typography and spacing
- Customize responsive breakpoints

### Adding Categories
To add new categories, update the category grid in `index.html` and add corresponding icons.

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue in the repository.

---

**Built with ❤️ for modern e-commerce experiences**

