import {
    IRouteConfig,
    IAbsoluteRoutesMap,
    IRoutesResult,
} from './types';

// Global reference for backward compatibility
export let absoluteRoutes: IAbsoluteRoutesMap = new Map();

/**
 * Creates flat absoluteRoutes Map from nested route config (react-router format)
 */
export const createRoutes = <T extends IRouteConfig[]>(routes: T): IRoutesResult<T> => {
    const flatRoutes: IAbsoluteRoutesMap = new Map();

    const processRoute = (
        route: IRouteConfig,
        parentPath: string = '',
        parentDefaults: { [key: string]: any } = {},
    ) => {
        // Build absolute path
        const routePath = route.path.startsWith('/')
            ? route.path
            : parentPath + (route.path ? '/' + route.path : '');

        // Merge default values
        const defaultValues = { ...parentDefaults, ...route.defaultValues };

        // Add to flat routes Map
        flatRoutes.set(route.id, {
            id: route.id,
            path: routePath || '/',
            Component: route.Component,
            defaultValues,
        });

        // Process children recursively
        if (route.children) {
            route.children.forEach((child) => {
                processRoute(child, routePath, defaultValues);
            });
        }
    };

    // Process all root routes
    routes.forEach((route) => processRoute(route, '', {}));

    // Update global reference
    absoluteRoutes = flatRoutes;

    return {
        absoluteRoutes: flatRoutes,
        routerRoutes: routes,
    };
};
