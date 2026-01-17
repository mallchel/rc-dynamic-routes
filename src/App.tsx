import React from 'react';
import { createBrowserRouter, RouterProvider, NavLink, Outlet } from 'react-router';

import { createRoutes, getLink, getRouteParams } from './modules';
import { routes } from './routesConfig';

import './app.css';

// New API: pass routes in react-router format, get absoluteRoutes Map for getLink
const { absoluteRoutes, routerRoutes } = createRoutes(routes);

console.log('absoluteRoutes:', absoluteRoutes);
console.log('routerRoutes:', routerRoutes);
console.log(
    'getLink example:',
    getLink(absoluteRoutes.get('filters')!, { filterId: 33 }, window.location),
    getRouteParams({ location: window.location })
);

// Layout component with navigation
function Layout() {
    return (
        <>
            <nav>
                {[...absoluteRoutes.keys()].map(routeKey => {
                    const absoluteConfig = absoluteRoutes.get(routeKey)!;
                    return (
                        <NavLink
                            key={absoluteConfig.path}
                            to={getLink(absoluteConfig)}
                            className={({ isActive }) => isActive ? '_activeClassName' : ''}
                        >
                            {routeKey}
                        </NavLink>
                    );
                })}
            </nav>
            <div className={'containers-wrapper'}>
                <Outlet />
            </div>
        </>
    );
}

// Create router - routerRoutes is the same as input, ready for createBrowserRouter
const router = createBrowserRouter([
    {
        path: '/',
        Component: Layout,
        children: routerRoutes
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
