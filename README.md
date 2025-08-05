# EMPY Nails - Luxury Nail Salon Website

A modern, elegant website for a nail salon built with vanilla HTML, CSS, and JavaScript. Features a responsive design, smooth animations, and all the functionality needed for a professional nail salon business.

## 🌟 Features

### Design & User Experience
- **Modern, elegant aesthetic** with soft pink gradient color scheme
- **Fully responsive** design that works perfectly on all devices
- **Smooth scrolling navigation** with auto-hiding header
- **Beautiful animations** and hover effects throughout
- **Accessible design** with proper focus states and semantic HTML

### Sections Included
- **Hero Section** - Eye-catching landing area with call-to-action buttons
- **About Us** - Salon information with animated statistics
- **Services** - Complete service offerings with pricing
- **Gallery** - Interactive photo gallery with lightbox functionality
- **Testimonials** - Client reviews and ratings
- **Business Hours** - Clear weekly schedule display
- **Location** - Contact information and map integration
- **Contact Form** - Functional contact form with validation

### Interactive Features
- **Auto-hiding header** that disappears on scroll down and reappears on scroll up
- **Mobile-responsive navigation** with hamburger menu
- **Gallery lightbox** for viewing nail art photos
- **Smooth scroll navigation** to all sections
- **Contact form** with validation and success notifications
- **Scroll-to-top button** for easy navigation
- **Animated counters** for statistics
- **Parallax effects** on hero section

## 🚀 Quick Start

### Prerequisites
- Node.js (for development server)
- Modern web browser

### Installation

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd empy-nails-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The website will automatically open at `http://localhost:3000`
   - Or manually navigate to the URL shown in the terminal

### Alternative: Direct File Opening
If you don't want to use the development server, you can simply:
1. Open `index.html` directly in your web browser
2. All functionality will work without a server

## 📁 Project Structure

```
empy-nails-website/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and responsive design
├── script.js           # JavaScript functionality and interactions
├── package.json        # Project configuration and dependencies
├── cursor.config.js    # Cursor IDE configuration
└── README.md          # This file
```

## 🎨 Customization

### Colors
The website uses a beautiful pink gradient theme. To customize colors, edit the CSS variables in `styles.css`:

```css
/* Primary brand colors */
--primary-color: #ff6b9d;
--secondary-color: #c44569;
--accent-color: #ffd700;
```

### Content
- **Business Information**: Update contact details, hours, and address in `index.html`
- **Services**: Modify service offerings and pricing in the services section
- **Gallery**: Replace placeholder images with actual nail art photos
- **Testimonials**: Add real client reviews and ratings

### Images
- Replace the placeholder Unsplash images in the gallery with actual nail salon photos
- Update the hero background with your salon's branding
- Add your salon's logo to the header

## 🌐 Deployment

### GitHub Pages Deployment

1. **Create a GitHub repository**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Your site will be live at**
   `https://yourusername.github.io/your-repo-name`

### Other Hosting Options

The website is built with vanilla HTML/CSS/JS, making it compatible with any static hosting service:

- **Netlify**: Drag and drop the project folder
- **Vercel**: Connect your GitHub repository
- **Firebase Hosting**: Use Firebase CLI to deploy
- **AWS S3**: Upload files to S3 bucket with static website hosting
- **Any web server**: Upload files to any web hosting service

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server with live reload
npm run build    # Build for production (static site - no build needed)
npm run preview  # Preview the site locally
```

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📱 Mobile Responsiveness

The website is fully responsive and optimized for:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

## ♿ Accessibility Features

- Semantic HTML5 structure
- Proper heading hierarchy
- Alt text for all images
- Focus states for keyboard navigation
- ARIA labels where appropriate
- High contrast color scheme
- Screen reader friendly

## 🎯 Performance

- Optimized images with lazy loading
- Minified CSS and JavaScript
- Efficient animations using CSS transforms
- Throttled scroll events for smooth performance
- Intersection Observer for efficient animations

## 📞 Contact Form

The contact form includes:
- Name, email, phone fields
- Service selection dropdown
- Message textarea
- Form validation
- Success notifications
- Responsive design

**Note**: The form currently simulates submission. To make it functional, you'll need to:
1. Set up a backend service (Node.js, PHP, etc.)
2. Configure email sending (SendGrid, Mailgun, etc.)
3. Update the form action and handling in `script.js`

## 🎨 Design System

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

### Color Palette
- **Primary**: Pink gradient (#ff6b9d to #c44569)
- **Secondary**: Gold accent (#ffd700)
- **Neutral**: Grays (#333, #666, #fafafa)

### Spacing
- Consistent padding and margins throughout
- Responsive spacing that adapts to screen size

## 🔄 Updates and Maintenance

### Regular Updates
- Update business hours and contact information
- Add new nail art photos to gallery
- Refresh testimonials with new client reviews
- Update service offerings and pricing

### Technical Maintenance
- Keep dependencies updated
- Test on different browsers and devices
- Monitor website performance
- Backup your content regularly

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for nail salons everywhere**

For support or questions, please open an issue in the repository. 