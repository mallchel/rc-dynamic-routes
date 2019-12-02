import { ComponentType } from 'react';
export interface IRelativeRoutesConfig {
    [key: string]: {
        parent?: string;
        defaultValue?: string | number;
        path: string;
        component: ComponentType;
    };
}
export interface IAbsoluteRoutesConfig {
    [key: string]: {
        component: ComponentType;
        path: string;
    };
}
