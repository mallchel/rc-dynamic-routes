declare type GetRouteParamsArgsType = {
    location?: {
        pathname?: string;
    };
    routes?: {};
};
export declare const getRouteParams: ({ location, routes }: GetRouteParamsArgsType) => any;
export declare const getLink: (route: {
    path: string;
    defaultValue?: string | number;
}, params?: {
    [key: string]: string | number;
}, location?: {
    pathname?: string;
}) => string;
export {};
