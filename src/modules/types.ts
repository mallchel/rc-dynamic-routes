import { ComponentType } from 'react';

// Input format - matches react-router's route objects
export interface IRouteConfig {
    id: string;
    path: string;
    Component?: ComponentType;
    defaultValues?: { [key: string]: any };
    children?: IRouteConfig[];
}

// Flat route with absolute path (for getLink)
export interface IAbsoluteRouteConfig {
    id: string;
    path: string;
    Component?: ComponentType;
    defaultValues: { [key: string]: any };
}

// Map-based absolute routes
export type IAbsoluteRoutesMap = Map<string, IAbsoluteRouteConfig>;

export interface IRoutesResult<T extends IRouteConfig[]> {
    // Flat Map with absolute paths (for getLink)
    absoluteRoutes: IAbsoluteRoutesMap;
    // Same as input, for createBrowserRouter
    routerRoutes: T;
}



export interface IRelativeRoutesConfig {
    [key: string]: {
        parent?: string;
        defaultValues?: { [key: string]: any };
        path: string;
        component?: ComponentType;
    };
}
