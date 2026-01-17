import { matchPath } from 'react-router';

import { memoize } from './memoize';
import { IAbsoluteRoutesMap } from './types';

import { absoluteRoutes } from './createAbsoluteRoutes';

const _getRouteParams = (routes: IAbsoluteRoutesMap) =>
    memoize((pathname: string) => {
        for (const [key, route] of routes) {
            const match = matchPath(
                { path: route.path, end: true },
                pathname
            );

            if (match) {
                return { route, match };
            }
        }
    });

type GetRouteParamsArgsType = { location?: { pathname?: string }; routes?: IAbsoluteRoutesMap };
export const getRouteParams = ({ location, routes = absoluteRoutes }: GetRouteParamsArgsType) => {
    return location?.pathname ? _getRouteParams(routes)(location.pathname) : null;
};

export const getLink = (
    route: { path: string; defaultValues?: { [key: string]: any } },
    params: { [key: string]: string | number } = {},
    location?: { pathname?: string }
) => {
    const { match } = getRouteParams({ location }) || {
        match: { params: {} },
    };

    return route.path
        .split('/')
        .map(path => {
            if (path[0] === ':') {
                const paramName = path.slice(1);
                return (
                    params[paramName] ||
                    match.params[paramName] ||
                    (route.defaultValues ? route.defaultValues[paramName] : '')
                );
            }

            return path;
        })
        .join('/');
};
