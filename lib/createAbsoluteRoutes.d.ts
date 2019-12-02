import { IRelativeRoutesConfig, IAbsoluteRoutesConfig } from './types';
export declare const absoluteRoutes: IAbsoluteRoutesConfig;
declare const createAbsoluteRoutes: (relativeRoutes: IRelativeRoutesConfig) => IAbsoluteRoutesConfig;
export default createAbsoluteRoutes;
