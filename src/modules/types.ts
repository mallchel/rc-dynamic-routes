import { ComponentType } from 'react';

export interface IRelativeRoutesConfig {
    [key: string]: {
        parent?: string;
        defaultValues?: { [key: string]: any };
        path: string;
        component?: ComponentType;
    };
}

export interface IAbsoluteRoutesConfig {
    [key: string]: { component?: ComponentType; path: string; defaultValues: { [key: string]: any } };
}
