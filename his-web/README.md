# MedCore HIS - Hospital Information System

A modern, responsive admin dashboard built with **Next.js 15**, **React 19**, and **Tailwind CSS v4**.

## Features

- 🎨 **Dual Layout Modes** - Switch between Sidebar and Horizontal navigation
- 🌙 **Dark Mode** - Full dark/light theme support with system preference detection
- 📱 **Fully Responsive** - Mobile-first design with slide-out menu
- 🧩 **Modular Architecture** - Easy to extend and customize
- ⚡ **Performance Optimized** - Built with Next.js App Router

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Dashboard page
│
├── components/
│   ├── dashboard/          # Dashboard-specific components
│   │   ├── StatCard.tsx
│   │   ├── QuickActions.tsx
│   │   ├── AppointmentsTable.tsx
│   │   └── index.ts
│   │
│   ├── layout/             # Layout components
│   │   ├── AdminLayout.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Header.tsx
│   │   ├── HorizontalNav.tsx
│   │   ├── MobileMenu.tsx
│   │   └── index.ts
│   │
│   ├── providers/          # Context providers
│   │   ├── ThemeProvider.tsx
│   │   ├── LayoutProvider.tsx
│   │   └── index.ts
│   │
│   └── ui/                 # Reusable UI components
│       ├── Icons.tsx
│       ├── ToggleSwitch.tsx
│       ├── Dropdown.tsx
│       ├── Badge.tsx
│       └── index.ts
│
├── config/                 # Configuration files
│   ├── navigation.ts       # Navigation menu config
│   └── dashboard.ts        # Dashboard data config
│
├── styles/
│   └── globals.css         # Tailwind CSS v4 with @import "tailwindcss"
│
└── types/
    └── index.ts            # TypeScript type definitions
```

## Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Customization

### Adding New Pages

1. Create a new file in `src/app/` (e.g., `src/app/patients/page.tsx`)
2. Wrap content with `<AdminLayout>`:

```tsx
import { AdminLayout } from '@/components/layout';

export default function PatientsPage() {
  return (
    <AdminLayout>
      <h1>Patients</h1>
      {/* Your content */}
    </AdminLayout>
  );
}
```

### Adding Navigation Items

Edit `src/config/navigation.ts`:

```ts
// For sidebar navigation
export const navigationConfig: NavGroup[] = [
  {
    id: 'mygroup',
    label: 'My Group',
    items: [
      {
        id: 'myitem',
        label: 'My Item',
        icon: 'dashboard',
        href: '/mypage',
        badge: 5,
        badgeColor: 'primary',
      },
    ],
  },
];

// For horizontal navigation
export const horizontalNavConfig = [
  // Add items here
];
```

### Adding Icons

Edit `src/components/ui/Icons.tsx`:

```tsx
export const Icons = {
  // Add your icon
  myIcon: createIcon(
    <path d="..." />
  ),
};
```

### Customizing Colors

Edit `src/styles/globals.css`:

```css
@theme {
  --color-primary-500: #your-color;
  /* Add more custom colors */
}
```

### Adding Components

1. Create component in appropriate folder
2. Export from folder's `index.ts`
3. Import using path alias: `import { MyComponent } from '@/components/ui'`

## Key Components

### ToggleSwitch

```tsx
<ToggleSwitch
  checked={isChecked}
  onChange={(checked) => setIsChecked(checked)}
  leftLabel="Off"
  rightLabel="On"
/>
```

### Dropdown

```tsx
<NavDropdown
  label="Menu"
  icon={<Icons.menu size={16} />}
  items={[
    { id: '1', label: 'Option 1', href: '/option1' },
    { id: '2', label: 'Option 2', onClick: () => {} },
  ]}
/>
```

### Badge

```tsx
<Badge variant="primary" size="md" pulse>
  New
</Badge>
```

## Hooks

### useTheme

```tsx
const { theme, toggleTheme, setTheme } = useTheme();
```

### useLayout

```tsx
const {
  mode,
  toggleMode,
  sidebarCollapsed,
  toggleSidebar,
  mobileMenuOpen,
  openMobileMenu,
  closeMobileMenu,
  isMobile,
} = useLayout();
```

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS v4** - Utility-first CSS
- **TypeScript** - Type safety

## License

MIT
