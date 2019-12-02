import React from 'react';
import { IRelativeRoutesConfig } from './modules/types';

const TestComponent = ({ name }: { name: string }) => <div className={'component-container'}>{name}</div>;
export const relativeRoutes: IRelativeRoutesConfig = {
    // login
    // login: { path: '/login', component: () => <TestComponent name={'Login'} /> },

    // leads
    // leads: { path: '/leads', component: () => <TestComponent name={'Leads'} /> },
    // leadEdit: { parent: 'leads', path: '/edit/:leadId', component: () => <TestComponent name={'LeadEdit'} /> },
    // leadCreate: { parent: 'leads', path: '/create', component: () => <TestComponent name={'LeadCreate'} /> },
    // leadsProcessing: {
    //     parent: 'leads',
    //     path: '/processing',
    //     component: () => <TestComponent name={'LeadsProcessing'} />,
    // },

    // deals
    // deals: { path: '/deals', component: () => <TestComponent name={'Deals'} /> },
    // dealEdit: { parent: 'deals', path: '/edit/:dealId', component: () => <TestComponent name={'DealEdit'} /> },
    // dealCreate: { parent: 'deals', path: '/create', component: () => <TestComponent name={'DealCreate'} /> },

    // companies
    companies: { path: '/companies', component: () => <TestComponent name={'Companies'} /> },
    company: {
        parent: 'companies',
        path: '/:companyId',
        component: () => <TestComponent name={'Company'} />,
        defaultValue: 0,
    },
    // companyEdit: {
    //     parent: 'companies',
    //     path: '/edit/:companyId',
    //     component: () => <TestComponent name={'CompanyEdit'} />,
    // },
    // companyCreate: {
    //     parent: 'companies',
    //     path: '/create',
    //     component: () => <TestComponent name={'CompanyEdit'} />,
    // },

    // users
    users: { parent: 'company', path: '/users', component: () => <TestComponent name={'Users'} /> },
    userEdit: { parent: 'users', path: '/edit/:userId', component: () => <TestComponent name={'UserEdit'} /> },
    userCreate: { parent: 'users', path: '/create', component: () => <TestComponent name={'UserEdit'} /> },

    // // clients
    // clients: { path: '/clients', component: () => <TestComponent name={'Clients'} /> },
    // clientEdit: {
    //     parent: 'clients',
    //     path: '/edit/:clientId',
    //     component: () => <TestComponent name={'ClientEdit'} />,
    // },
    // clientCreate: {
    //     parent: 'clients',
    //     path: '/create',
    //     component: () => <TestComponent name={'ClientEdit'} />,
    // },

    // // profile
    // profile: { path: '/profile', component: () => <TestComponent name={'Profile'} /> },

    // // serviceRefresh
    // serviceRefresh: { path: '/serviceRefresh', component: () => <TestComponent name={'ServiceRefresh'} /> },

    // // Calculator
    // calculator: { path: '/calculator', component: () => <TestComponent name={'Calculator'} /> },
};
