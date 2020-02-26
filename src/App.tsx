import React from 'react';
import { BrowserRouter, Route, NavLink } from 'react-router-dom';

import { createAbsoluteRoutes, getLink, getRouteParams } from './modules';
import { relativeRoutes } from './routesConfig';

import './app.css';

const absoluteRoutes = createAbsoluteRoutes(relativeRoutes);

console.log(
    getLink(absoluteRoutes.filters, { filterId: 33 }, window.location),
    getRouteParams({ location: window.location })
);
function App() {
    return (
        <BrowserRouter>
            <nav>
                {Object.keys(absoluteRoutes).map(routeKey => {
                    const absoluteConfig = absoluteRoutes[routeKey];
                    return (
                        <NavLink
                            key={absoluteConfig.path}
                            to={getLink(absoluteConfig)}
                            activeClassName={'_activeClassName'}
                        >
                            {routeKey}
                        </NavLink>
                    );
                })}
            </nav>

            <div className={'containers-wrapper'}>
                {Object.keys(absoluteRoutes).map(routeKey => {
                    const { path, component } = absoluteRoutes[routeKey];
                    return <Route key={path} path={path} component={component} />;
                })}
            </div>
        </BrowserRouter>
    );
}

export default App;
