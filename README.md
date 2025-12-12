# N8N Automation Dashboard Template

A modern, full-featured frontend template for n8n automation projects, built with [Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme) and Astro. This template provides a solid foundation for building dashboards and UIs for your n8n automation workflows.

## Features

- ✅ **Perfect Lighthouse Score** - Optimized for performance
- ✅ **Blazing Fast Performance** - Built with Astro 🚀
- ✅ **Earth Theme (Default)** - Beautiful green-themed design perfect for dashboards
- ✅ **Fully Themeable** - Easy customization with CSS custom properties
- ✅ **Responsive Design** - Mobile-friendly layouts
- ✅ **SEO Best Practices** - Open Graph, Canonical URLs, sitemap
- ✅ **Ready-to-Use Components** - Dashboard components, cards, forms, and more
- ✅ **Theme Switcher** - Switch between Classic, Dark, Earth, Ocean, and Sand themes

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start
# or
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration

### Update Site Settings

Edit `src/config/settings.js` to customize:
- Site title and description
- Site URL (for sitemap generation)
- Brand name
- Theme switcher visibility

### Update Deployment URL

Edit `astro.config.mjs` to set your production site URL for sitemap generation.

### Default Theme

This template is configured with the **Earth theme** as the default. The Earth theme features:
- Green primary colors (#2c3e2d)
- Light background (#eeeff1)
- Professional, dashboard-friendly aesthetic

You can change the default theme by editing:
- `src/components/theme-switcher/ThemeProvider.astro` - Sets initial theme
- `src/components/theme-switcher/theme-switcher.ts` - Sets default when no preference is saved

## Customization for N8N Projects

This template is ready to be customized for your n8n automation projects:

1. **Dashboard Layouts** - Convert landing pages to dashboard views
2. **API Integration** - Connect to n8n API for workflow data
3. **Data Visualization** - Add charts and metrics components
4. **Workflow Management** - Build UI for managing n8n workflows

## Deploy to Vercel

This template is ready to deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Vercel will automatically detect Astro and configure the build

Or use the Vercel CLI:
```bash
vercel
```

## Based on Odyssey Theme

This template is based on the excellent [Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme) by [treefarmstudio](https://github.com/treefarmstudio). 

## License

See the original [Odyssey Theme LICENSE](LICENSE) file.

## Support

For issues related to this n8n template, please open an issue in this repository.

For issues related to the underlying Odyssey Theme, please refer to the [original repository](https://github.com/treefarmstudio/odyssey-theme).
