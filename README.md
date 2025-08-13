# AiBhai - Your AI Companion in Life, Faith, and Growth

AiBhai is a comprehensive, AI-powered personal assistant platform designed to support individuals across all essential domains of life: health, mental wellness, spirituality, productivity, relationships, finance, career, and continuous learning.

## 🚀 Features

- **Life Planner & Habit Architect** - AI-powered calendar management with smart time blocking
- **Health & Wellness Guide** - Comprehensive health tracking and mental wellness support
- **Faith & Spiritual Advisor** - Customizable spiritual guidance for all beliefs
- **Business & Career Coach** - Professional growth support and startup mentoring
- **Financial Wellness Assistant** - Smart budgeting and financial planning
- **Social & Emotional Growth** - Relationship coaching and emotional resilience

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Modern CSS with CSS Grid, Flexbox, and CSS Variables
- **Icons**: Font Awesome 6
- **Deployment**: Netlify with automatic deployments from GitHub
- **PWA Ready**: Service Worker support for offline functionality

## 📁 Project Structure

```
aibhai-webapp/
├── index.html              # Main HTML file
├── assets/
│   ├── css/
│   │   └── styles.css      # Main stylesheet
│   ├── js/
│   │   └── main.js         # Main JavaScript file
│   └── images/
│       ├── favicon.ico     # Website favicon
│       └── logo.png        # Logo image
├── README.md               # This file
├── netlify.toml           # Netlify configuration
└── .gitignore             # Git ignore rules
```

## 🚀 Quick Start

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/aibhai-webapp.git
   cd aibhai-webapp
   ```

2. **Open locally**
   ```bash
   # Option 1: Open index.html directly in browser
   open index.html
   
   # Option 2: Use a local server (recommended)
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Visit** `http://localhost:8000` in your browser

### Deploy to Netlify

#### Method 1: Drag & Drop (Easiest)
1. Go to [netlify.com](https://netlify.com)
2. Drag your project folder to the deploy area
3. Your site will be live instantly!

#### Method 2: GitHub Integration (Recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Auto-deploy on every push to main branch

## 🔧 Configuration

### Environment Variables
Set these in your Netlify dashboard under Site Settings > Environment Variables:

```bash
CONTACT_EMAIL=hello@aibhai.com
ANALYTICS_ID=your-google-analytics-id
```

### Custom Domain
1. In Netlify dashboard, go to Site Settings
2. Domain Management → Add custom domain
3. Follow DNS instructions to point your domain to Netlify

## 📱 Features

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface

### Performance
- Optimized images and assets
- Minified CSS and JavaScript
- Fast loading times
- Progressive Web App (PWA) ready

### Accessibility
- ARIA labels and semantic HTML
- Keyboard navigation support
- Screen reader compatible
- High contrast color scheme

### SEO Optimized
- Meta tags and Open Graph data
- Structured data markup
- Fast loading and mobile-friendly
- Clean URL structure

## 🎨 Customization

### Colors
Edit the CSS variables in `assets/css/styles.css`:

```css
:root {
    --primary: #6366f1;        /* Main brand color */
    --secondary: #10b981;      /* Secondary brand color */
    --accent: #f59e0b;         /* Accent color */
    --text-primary: #1f2937;   /* Main text color */
    --text-secondary: #6b7280; /* Secondary text */
}
```

### Content
- Edit text content directly in `index.html`
- Update pricing in the pricing section
- Modify feature descriptions as needed

### Images
- Add your logo to `assets/images/logo.png`
- Update favicon at `assets/images/favicon.ico`
- Add hero images or screenshots as needed

## 🧪 Testing

### Manual Testing Checklist
- [ ] All navigation links work
- [ ] Modal forms function properly
- [ ] Responsive design on mobile/tablet/desktop
- [ ] Demo chat interface works
- [ ] All buttons have hover effects
- [ ] Page loads quickly
- [ ] Images load properly

### Browser Compatibility
- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+

## 📊 Analytics

The site is prepared for analytics integration:
- Google Analytics 4
- Facebook Pixel
- Custom event tracking

Add your tracking codes in the `<head>` section of `index.html`.

## 🔒 Security

Security headers are configured in `netlify.toml`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 🚀 Performance Tips

1. **Optimize Images**: Compress images before adding them
2. **Use WebP Format**: For better compression
3. **Minimize HTTP Requests**: Combine CSS/JS files if needed
4. **Enable Gzip**: Configured automatically by Netlify
5. **CDN**: Netlify provides global CDN automatically

## 📝 Todo / Roadmap

- [ ] Add contact form with Netlify Forms
- [ ] Implement newsletter signup
- [ ] Add blog/content section
- [ ] Create dashboard mockups
- [ ] Add testimonials section
- [ ] Integrate with payment processor
- [ ] Add multi-language support
- [ ] Implement dark mode

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

- Email: hello@aibhai.com
- Website: [aibhai.com](https://aibhai.com)
- Documentation: Coming soon

## 🙏 Acknowledgments

- Font Awesome for icons
- CSS inspiration from modern web design trends
- Color palette inspired by modern productivity apps

---

Made with ❤️ for personal growth and development.

## 🔄 Version History

- **v1.0.0** (2024) - Initial release with core features
  - Responsive landing page
  - Interactive demo
  - Pricing plans
  - Modal system
  - Mobile optimization