# Get dynamic links and paths

[![npm downloads](https://img.shields.io/npm/dm/rc-dynamic-routes.svg)](https://www.npmjs.com/package/rc-dynamic-routes)

Helpers for creating dynamic route links and route paths for **react-router v7**, without hard coding.

## Installation

```bash
npm install rc-dynamic-routes react-router
# or
yarn add rc-dynamic-routes react-router
```

## Define your routes config

Use the native react-router format with nested routes:

```tsx
import { IRouteConfig } from 'rc-dynamic-routes';

const routes: IRouteConfig[] = [
    {
        id: 'companies',
        path: '/companies',
        Component: Companies,
        children: [
            {
                id: 'company',
                path: ':companyId',
                Component: Company,
                defaultValues: { companyId: '$defaultValue' },
                children: [
                    {
                        id: 'filters',
                        path: 'filters/:filterId',
                        Component: Filter,
                        defaultValues: { filterId: '0' },
                    },
                ],
            },
        ],
    },
];
```

## createRoutes - generate absoluteRoutes Map and routerRoutes

```tsx
import { createRoutes } from 'rc-dynamic-routes';

const { absoluteRoutes, routerRoutes } = createRoutes(routes);

// absoluteRoutes is a Map<string, IAbsoluteRouteConfig>:
// Map {
//   'companies' => { id: 'companies', path: '/companies', ... },
//   'company'   => { id: 'company', path: '/companies/:companyId', ... },
//   'filters'   => { id: 'filters', path: '/companies/:companyId/filters/:filterId', ... },
// }

// routerRoutes is the same as input - use directly with createBrowserRouter
```

## getLink - generate route links with params

```tsx
import { getLink } from 'rc-dynamic-routes';

// Get route from Map by id
const companyRoute = absoluteRoutes.get('company')!;
const filtersRoute = absoluteRoutes.get('filters')!;

// Generate link with params
const link = getLink(companyRoute, { companyId: 1 });
// result: /companies/1

// Uses defaultValues when params not provided
const link = getLink(companyRoute);
// result: /companies/$defaultValue

const link = getLink(filtersRoute);
// result: /companies/$defaultValue/filters/0

// Pass window.location to gather missing params from current URL
// Current URL: http://localhost:3000/companies/1/filters/2
const link = getLink(filtersRoute, {}, window.location);
// result: /companies/1/filters/2

// Override specific params
const link = getLink(filtersRoute, { filterId: 33 }, window.location);
// result: /companies/1/filters/33
```

## getRouteParams - get route params from location

```tsx
import { getRouteParams } from 'rc-dynamic-routes';

// Current URL: http://localhost:3000/companies/123
const result = getRouteParams({ location: window.location });
// result: {
//   route: { id: 'company', path: '/companies/:companyId', ... },
//   match: { params: { companyId: '123' }, ... }
// }
```

## Full Example with react-router v7

```tsx
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router';
import { createRoutes, getLink } from 'rc-dynamic-routes';

const routes = [
    {
        id: 'companies',
        path: '/companies',
        Component: CompaniesLayout,
        children: [
            {
                id: 'company',
                path: ':companyId',
                Component: CompanyPage,
                defaultValues: { companyId: '0' },
            },
        ],
    },
];

const { absoluteRoutes, routerRoutes } = createRoutes(routes);

// Layout with navigation
function Layout() {
    return (
        <>
            <nav>
                {[...absoluteRoutes.keys()].map(routeKey => {
                    const route = absoluteRoutes.get(routeKey)!;
                    return (
                        <NavLink
                            key={route.path}
                            to={getLink(route)}
                            className={({ isActive }) => isActive ? 'active' : ''}
                        >
                            {routeKey}
                        </NavLink>
                    );
                })}
            </nav>
            <Outlet />
        </>
    );
}

// Create router with nested routes
const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: routerRoutes,
    },
]);

function App() {
    return <RouterProvider router={router} />;
}
```

## Important: Parent routes need Outlet

In react-router v7, parent routes must render `<Outlet />` to display their children:

```tsx
// Parent route component (has children)
function CompaniesLayout() {
    return (
        <div>
            <h1>Companies</h1>
            <Outlet /> {/* Required to render child routes */}
        </div>
    );
}

// Leaf route component (no children)
function CompanyPage() {
    return <div>Company Details</div>;
}
```

## API Reference

### `createRoutes(routes)`

Creates both `absoluteRoutes` Map and `routerRoutes` array from route config.

**Parameters:**
- `routes: IRouteConfig[]` - Array of route objects in react-router format

**Returns:**
- `absoluteRoutes: Map<string, IAbsoluteRouteConfig>` - Flat Map with absolute paths
- `routerRoutes: IRouteConfig[]` - Same as input, for `createBrowserRouter`

### `getLink(route, params?, location?)`

Generates a URL path from a route config.

**Parameters:**
- `route: { path: string; defaultValues?: object }` - Route config from `absoluteRoutes.get(id)`
- `params?: object` - URL params to substitute
- `location?: { pathname?: string }` - Location to extract missing params from

**Returns:** `string` - Generated URL path

### `getRouteParams({ location, routes? })`

Finds matching route and extracts params from a location.

**Parameters:**
- `location: { pathname?: string }` - Location to match against
- `routes?: Map` - Optional routes Map (defaults to global `absoluteRoutes`)

**Returns:** `{ route, match } | null`

## Types

```typescript
interface IRouteConfig {
    id: string;
    path: string;
    Component?: ComponentType;
    defaultValues?: { [key: string]: any };
    children?: IRouteConfig[];
}

interface IAbsoluteRouteConfig {
    id: string;
    path: string;              // Absolute path
    Component?: ComponentType;
    defaultValues: { [key: string]: any };
}

type IAbsoluteRoutesMap = Map<string, IAbsoluteRouteConfig>;
```
