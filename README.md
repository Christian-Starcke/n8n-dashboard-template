# N8N Automation Dashboard Template

A modern, full-featured frontend template for n8n automation projects, built with [Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme) and Astro. This template provides a solid foundation for building dashboards and UIs for your n8n automation workflows.

## 🚀 Features

- ✅ **Perfect Lighthouse Score** - Optimized for performance
- ✅ **Blazing Fast Performance** - Built with Astro 🚀
- ✅ **Earth Theme (Default)** - Beautiful green-themed design perfect for dashboards
- ✅ **Fully Themeable** - Easy customization with CSS custom properties
- ✅ **Responsive Design** - Mobile-friendly layouts
- ✅ **SEO Best Practices** - Open Graph, Canonical URLs, sitemap
- ✅ **Ready-to-Use Dashboard Components** - MetricCard, StatusBadge, WorkflowCard, ExecutionTable, and more
- ✅ **N8N API Integration** - Built-in utilities for connecting to n8n instances
- ✅ **Theme Switcher** - Switch between Classic, Dark, Earth, Ocean, and Sand themes

## 📦 Using This Template

### Option 1: Use as GitHub Template

1. Click the **"Use this template"** button on GitHub
2. Create a new repository from this template
3. Clone your new repository
4. Follow the setup instructions below

### Option 2: Clone Directly

```bash
git clone https://github.com/Christian-Starcke/n8n-dashboard-template.git
cd n8n-dashboard-template
```

## 🛠️ Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```env
# Required: Base URL of your n8n instance
PUBLIC_N8N_BASE_URL=http://localhost:5678

# Optional: API Key for authenticated requests
PUBLIC_N8N_API_KEY=your-api-key-here
```

For production deployments (e.g., Vercel):
1. Go to your Vercel project settings
2. Navigate to Environment Variables
3. Add `PUBLIC_N8N_BASE_URL` with your n8n instance URL
4. Add `PUBLIC_N8N_API_KEY` if you want to use API authentication

### 3. Start Development Server

```bash
npm start
# or
npm run dev
```

Visit `http://localhost:4321` to see your dashboard.

### 4. Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── MetricCard.astro
│   │   ├── StatusBadge.astro
│   │   ├── WorkflowCard.astro
│   │   ├── ExecutionTable.astro
│   │   ├── ChartCard.astro
│   │   ├── DashboardGrid.astro
│   │   ├── LoadingState.astro
│   │   └── EmptyState.astro
│   └── ...                 # Other Odyssey theme components
├── pages/
│   ├── index.astro         # Dashboard overview
│   ├── workflows/          # Workflow management pages
│   ├── executions/         # Execution monitoring pages
│   └── settings/           # Settings page
├── utils/
│   └── n8n/                # N8N API integration
│       ├── api.ts          # API client
│       ├── types.ts        # TypeScript types
│       └── helpers.ts      # Helper functions
└── config/
    ├── settings.js         # Site configuration
    └── nav.js              # Navigation configuration
```

## 🎨 Dashboard Components

### MetricCard
Display KPIs and metrics with optional change indicators.

```astro
---
import { MetricCard } from '@components/odyssey-theme';
---

<MetricCard
  title="Total Workflows"
  value={12}
  change={2}
  changeLabel="this month"
  icon="mdi:workflow"
/>
```

### StatusBadge
Show workflow/execution status with color coding.

```astro
---
import { StatusBadge } from '@components/odyssey-theme';
---

<StatusBadge status="success" />
<StatusBadge status="error" />
<StatusBadge status="running" />
```

### WorkflowCard
Display workflow information in a card format.

```astro
---
import { WorkflowCard } from '@components/odyssey-theme';
---

<WorkflowCard
  id="wf-1"
  name="Data Sync Workflow"
  active={true}
  executionCount={142}
  lastExecution={{
    status: 'success',
    time: '5 minutes ago'
  }}
/>
```

### ExecutionTable
Display execution history in a table format.

```astro
---
import { ExecutionTable } from '@components/odyssey-theme';
---

<ExecutionTable executions={executions} showWorkflowName={true} />
```

## 🔌 N8N API Integration

The template includes a ready-to-use n8n API client:

```typescript
import { createN8nClient } from '../utils/n8n/api';

const client = createN8nClient();

// Get all workflows
const workflows = await client.getWorkflows();

// Get a specific workflow
const workflow = await client.getWorkflow('workflow-id');

// Get executions
const executions = await client.getExecutions({ limit: 20 });

// Execute a workflow
const execution = await client.executeWorkflow('workflow-id');
```

## ⚙️ Configuration

### Update Site Settings

Edit `src/config/settings.js` to customize:
- Site title and description
- Site URL (for sitemap generation)
- Brand name
- Theme switcher visibility

### Update Navigation

Edit `src/config/nav.js` to customize the navigation menu.

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

## 🚀 Deploy to Vercel

This template is ready to deploy to Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel project settings:
   - `PUBLIC_N8N_BASE_URL`
   - `PUBLIC_N8N_API_KEY` (optional)
4. Vercel will automatically detect Astro and configure the build

Or use the Vercel CLI:
```bash
vercel
```

## 📝 Customization Guide

### Adding New Dashboard Pages

1. Create a new file in `src/pages/`
2. Import the `Layout` component
3. Use dashboard components from `@components/odyssey-theme`
4. Add the page to navigation in `src/config/nav.js`

### Connecting to Real N8N Data

1. Update pages to use the n8n API client
2. Replace placeholder data with API calls
3. Handle loading and error states
4. Consider using Astro server endpoints for API calls

Example:
```astro
---
import { createN8nClient } from '../utils/n8n/api';

const client = createN8nClient();
let workflows = [];
let error = null;

try {
  workflows = await client.getWorkflows();
} catch (e) {
  error = e.message;
}
---

{error ? (
  <p>Error: {error}</p>
) : (
  <WorkflowCard workflows={workflows} />
)}
```

## 🎯 Next Steps

1. **Configure your n8n instance** - Set up environment variables
2. **Customize branding** - Update settings, logo, and colors
3. **Connect real data** - Replace placeholder data with API calls
4. **Add custom features** - Extend the dashboard with your specific needs
5. **Deploy** - Push to production and enjoy your dashboard!

## 📚 Based on Odyssey Theme

This template is based on the excellent [Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme) by [treefarmstudio](https://github.com/treefarmstudio).

## 📄 License

See the original [Odyssey Theme LICENSE](LICENSE) file.

## 🤝 Support

For issues related to this n8n template, please open an issue in this repository.

For issues related to the underlying Odyssey Theme, please refer to the [original repository](https://github.com/treefarmstudio/odyssey-theme).

## 🙏 Credits

- [Odyssey Theme](https://github.com/treefarmstudio/odyssey-theme) - Base theme
- [Astro](https://astro.build) - Web framework
- [n8n](https://n8n.io) - Workflow automation platform
