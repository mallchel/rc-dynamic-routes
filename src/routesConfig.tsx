import React from 'react';
import { Outlet } from 'react-router';
import { IRouteConfig } from './modules/types';

// Component for routes WITH children - renders Outlet
const LayoutComponent = ({ name }: { name: string }) => (
    <div className={'component-container'}>
        {name}
        <Outlet />
    </div>
);

// Component for leaf routes (no children)
const TestComponent = ({ name }: { name: string }) => <div className={'component-container'}>{name}</div>;

export const routes = [
    {
        id: 'companies',
        path: '/companies',
        Component: () => <LayoutComponent name={'Companies'} />,  // Has children → needs Outlet
        children: [
            {
                id: 'company',
                path: ':companyId',
                Component: () => <LayoutComponent name={'Company'} />,  // Has children → needs Outlet
                defaultValues: { companyId: '$defaultValue' },
                children: [
                    {
                        id: 'filters',
                        path: 'filters/:filterId',
                        Component: () => <TestComponent name={'Filter'} />,  // Leaf route
                        defaultValues: { filterId: '0' },
                    },
                    {
                        id: 'users',
                        path: 'users',
                        Component: () => <LayoutComponent name={'Users'} />,  // Has children → needs Outlet
                        children: [
                            {
                                id: 'userEdit',
                                path: 'edit/:userId',
                                Component: () => <TestComponent name={'UserEdit'} />,  // Leaf route
                                defaultValues: { userId: '0' },
                            },
                            {
                                id: 'userCreate',
                                path: 'create',
                                Component: () => <TestComponent name={'UserCreate'} />,  // Leaf route
                            },
                        ],
                    },
                ],
            },
        ],
    },
];

