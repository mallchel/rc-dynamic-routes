export interface IRelativeRoutesConfig {
    [key: string]: {
        parent: string;
        path: string;
        component: React.Component;
    };
}

export interface IAbsoluteRoutesConfig {
    [key: string]: { component: React.Component; path: string };
}
