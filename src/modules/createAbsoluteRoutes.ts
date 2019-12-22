import { ComponentType } from 'react';
import { IRelativeRoutesConfig, IAbsoluteRoutesConfig } from './types';

export const absoluteRoutes: IAbsoluteRoutesConfig = {};
const createAbsoluteRoutes = (relativeRoutes: IRelativeRoutesConfig): IAbsoluteRoutesConfig => {
    const getRoute = (
        routeName: string
    ): { component: ComponentType; path: string; defaultValues: { [key: string]: any } } => {
        const route = relativeRoutes[routeName];
        const parentRoute = route.parent ? getRoute(route.parent) : { path: null, defaultValues: {} };

        return {
            ...route,
            component: route.component,
            path: (parentRoute.path || '') + route.path,
            defaultValues: { ...parentRoute.defaultValues, ...route.defaultValues },
        };
    };

    Object.keys(relativeRoutes).forEach(routeName => {
        absoluteRoutes[routeName] = getRoute(routeName);
    });

    return absoluteRoutes;
};
export default createAbsoluteRoutes;
