import { matchPath } from 'react-router';

import { memoize } from './memoize';
import { IAbsoluteRoutesConfig } from './types';

import { absoluteRoutes } from './createAbsoluteRoutes';

const _getRouteParams = (routes: IAbsoluteRoutesConfig) =>
    memoize((pathname: string) => {
        for (let key in routes) {
            const route = routes[key];
            const match = matchPath(pathname, {
                path: route.path,
                exact: true,
            });

            if (match) {
                return { route, match };
            }
        }
    });

type GetRouteParamsArgsType = { location?: { pathname?: string }; routes?: {} };
export const getRouteParams = ({ location, routes = absoluteRoutes }: GetRouteParamsArgsType) => {
    return location ? _getRouteParams(routes)(location.pathname) : null;
};

export const getLink = (
    route: { path: string },
    params: { [key: string]: string | number } = {},
    location?: { pathname?: string }
) => {
    const { match, route: _route } = getRouteParams({ location }) || {
        match: { params: {} },
        route: { path: '' },
    };
    route = route || _route;

    return route.path
        .split('/')
        .map(path => {
            if (path[0] === ':') {
                const paramName = path.slice(1);
                return params[paramName] || match.params[paramName];
            }

            return path;
        })
        .join('/');
};
