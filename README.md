# Get dynamic links and paths
This library has helpers for creating dynamic route links and route paths, without hard coding

## Preparing - generate your routes config
```ts
const relativeRoutes: IRelativeRoutesConfig = {
    companies: { path: '/companies', component: () => <TestComponent name={'Companies'} /> },
    company: {
        parent: 'companies',
        path: '/:companyId',
        component: () => <TestComponent name={'Company'} />,
        defaultValues: { companyId: '$defaultValue' }, // Optional, default param for companyId
    },
    filters: {
        parent: 'company',
        path: '/filters/:filterId',
        component: () => <TestComponent name={'Filter'} />,
        defaultValues: { filterId: '0' },
    }
};
const absoluteRoutes = createAbsoluteRoutes(relativeRoutes);
// absoluteRoutes {
//   companies: {
//        path: "/companies",
//        component: () => {…},
//    },
//   company: {
//        parent: "companies",
//        path: "/companies/:companyId",
//        component: () => {…},
//        defaultValue: '$defaultValue',
//    },
//    filters: {
//        parent: 'company',
//        path: '/companies/:companyId/filters/:filterId',
//        component: () => {...},
//        defaultValue: '0',
//    }
//}
```
## getLink - for getting route link
```ts
const link = getLink(absoluteRoutes.company, { companyId: 1 });
// result /companies/1

const link = getLink(absoluteRoutes.company);
// result /companies/$defaultValue

const link = getLink(absoluteRoutes.filters);
// result /companies/$defaultValue/filters/0

// You can pass the window.location to gathering missing params
window.location = 'http://localhost:3001/companies/1/filters/2'
const link = getLink(absoluteRoutes.filters, {}, window.location);
// result /companies/1/filters/2

// And override params
const link = getLink(absoluteRoutes.filters, { filterId: 33 }, window.location);
// result /companies/1/filters/33
```

## getRouteParams - for getting route params from location
```ts
window.location = 'http://localhost:3001/companies/0'
const paramsFromCurrentLocation = getRouteParams({ location: window.location })
// paramsFromCurrentLocation {
//        route: {
//            parent: "companies",
//           path: "/companies/:companyId",
//            component: () => {…},
//            defaultValue: '$defaultValue',
//        },
//        match: {
//            path: "/companies/:companyId",
//            url: "/companies/0",
//            isExact: true,
//           params: {companyId: "0"},
//        }
//    }
```

## Example
```ts
function App() {
    return (
        <BrowserRouter>
            <nav>
                {Object.keys(absoluteRoutes).map(routeKey => {
                    const absoluteConfig = absoluteRoutes[routeKey];
                    return (
                        <NavLink
                            key={absoluteConfig.path}
                            to={getLink(absoluteConfig, {}, window.location)}
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
```
