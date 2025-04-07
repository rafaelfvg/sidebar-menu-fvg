# Sidebar Menu FVG

A customizable and responsive sidebar menu component for React ande Next applications.

## Installation

You can install the `shared-sidebar-menu-fvg` package using npm or yarn:

**npm:**

```bash
npm i shared-sidebar-menu-fvg
```


## React.js Example (React Router)

```jsx
import React from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import SidebarMenu, { SidebarItem } from 'shared-sidebar-menu-fvg';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';

const Layout = () => {
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = React.useState<string>('');

  const handleNavigation = (href: string) => {
    setActiveLink(href);
    console.log(`Navigating to: ${href}`);
    navigate(href);
  };

  const isActive = (href: string) => activeLink === href;

  const menuItems: SidebarItem[] = [
    { name: 'Home', href: '/', icon: <FaHome />, permissions: ['user', 'admin'] },
    { name: 'Users', href: '/users', icon: <FaUser />, permissions: ['admin'] },
    {
      name: 'Settings',
      icon: <FaCog />,
      permissions: ['admin', 'user'],
      href: '',
      submenu: [
        { name: 'Profile', href: '/settings/profile', permissions: ['admin', 'user'], icon: <></> },
        { name: 'Security', href: '/settings/security', permissions: ['admin'], icon: <></> },
      ],
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu 
        handleNavigation={handleNavigation} 
        isActive={isActive}
        items={menuItems} 
        permissions={['admin', 'user']}
      />
      <main style={{ flex: 1, padding: '1rem' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
```


## Next.js Example (App Router)

```jsx
'use client'; // This is important for client-side navigation

import React, { useState } from 'react';
import SidebarMenu, { MenuItem } from 'shared-sidebar-menu-fvg';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function AppRouterExample() {
  const [activeLink, setActiveLink] = useState<string>('');
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setActiveLink(href);
    router.push(href);
  };

  const isActive = (href: string, isSubmenu?: boolean) => {
    return activeLink === href;
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: <FaHome />,
      permissions: ['user', 'admin'],
    },
    {
      name: 'Users',
      href: '/users',
      icon: <FaUser />,
      permissions: ['admin'],
    },
    {
      name: 'Settings',
      icon: <FaCog />,
      permissions: ['admin', 'user'],
      submenu: [
        {
          name: 'Profile',
          href: '/settings/profile',
          permissions: ['admin', 'user'],
        },
        {
          name: 'Security',
          href: '/settings/security',
          permissions: ['admin'],
        },
      ],
    },
  ];

  return (
    <div>
      <SidebarMenu
        handleNavigation={handleNavigation}
        isActive={isActive}
        items={menuItems}
      />
      {/* Your main content here */}
      <main>
        <h1>Main Content (App Router)</h1>
        <p>Current Active Link: {activeLink}</p>
      </main>
    </div>
  );
}

```


## Next.js Example (Pages Router)


```jsx
import React, { useState } from 'react';
import SidebarMenu, { MenuItem } from 'shared-sidebar-menu-fvg';
import { FaHome, FaUser, FaCog } from 'react-icons/fa';
import { useRouter } from 'next/router';

export default function PagesRouterExample() {
  const [activeLink, setActiveLink] = useState<string>('');
  const router = useRouter();

  const handleNavigation = (href: string) => {
    setActiveLink(href);
    router.push(href);
  };

  const isActive = (href: string, isSubmenu?: boolean) => {
    return activeLink === href;
  };

  const menuItems: MenuItem[] = [
    {
      name: 'Home',
      href: '/',
      icon: <FaHome />,
      permissions: ['user', 'admin'],
    },
    {
      name: 'Users',
      href: '/users',
      icon: <FaUser />,
      permissions: ['admin'],
    },
    {
      name: 'Settings',
      icon: <FaCog />,
      permissions: ['admin', 'user'],
      submenu: [
        {
          name: 'Profile',
          href: '/settings/profile',
          permissions: ['admin', 'user'],
        },
        {
          name: 'Security',
          href: '/settings/security',
          permissions: ['admin'],
        },
      ],
    },
  ];

  return (
    <div>
      <SidebarMenu
        handleNavigation={handleNavigation}
        isActive={isActive}
        items={menuItems}
      />
      {/* Your main content here */}
      <main>
        <h1>Main Content (Pages Router)</h1>
        <p>Current Active Link: {activeLink}</p>
      </main>
    </div>
  );
}

```


## Compatibility

The sidebar-fvg component is designed to be compatible with both React and Next.js. The core component logic is framework-agnostic. The only difference lies in how you handle navigation, which is demonstrated in the examples above.

## Features

- Responsive Design: Adapts to different screen sizes.
- Collapsible: Can be collapsed to show only icons.
- Submenus: Supports nested submenus.
- Active Link Styling: Highlights the currently active link.
- Permission-Based Rendering: Show/hide menu items based on user permissions.
- Customizable: Easily customize the appearance with CSS.
- Typescript: The package is written in typescript.
- Compatible with React and Next.js: Works seamlessly in both environments.

## Contributing

Contributions are welcome! Please feel free to open issues and pull requests.