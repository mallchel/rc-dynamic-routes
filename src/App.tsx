import React from 'react';

const relativeRoutes = {
    // login
    login: { path: '/login', component: () => 'Login' },

    // leads
    leads: { path: '/leads', component: () => 'Leads' },
    leadEdit: { parent: 'leads', path: '/edit/:leadId', component: () => 'LeadEdit' },
    leadCreate: { parent: 'leads', path: '/create', component: () => 'LeadCreate' },
    leadsProcessing: {
        parent: 'leads',
        path: '/processing',
        component: () => 'LeadsProcessing',
    },

    // deals
    deals: { path: '/deals', component: () => 'Deals' },
    dealEdit: { parent: 'deals', path: '/edit/:dealId', component: () => 'DealEdit' },
    dealCreate: { parent: 'deals', path: '/create', component: () => 'DealCreate' },

    // companies
    companies: { path: '/companies', component: () => 'Companies' },
    companyEdit: {
        parent: 'companies',
        path: '/edit/:companyId',
        component: () => 'CompanyEdit',
    },
    companyCreate: {
        parent: 'companies',
        path: '/create',
        component: () => 'CompanyEdit',
    },

    // users
    users: { path: '/users', component: () => 'Users' },
    userEdit: { parent: 'users', path: '/edit/:userId', component: () => 'UserEdit' },
    userCreate: { parent: 'users', path: '/create', component: () => 'UserEdit' },

    // clients
    clients: { path: '/clients', component: () => 'Clients' },
    clientEdit: {
        parent: 'clients',
        path: '/edit/:clientId',
        component: () => 'ClientEdit',
    },
    clientCreate: {
        parent: 'clients',
        path: '/create',
        component: () => 'ClientEdit',
    },

    // profile
    profile: { path: '/profile', component: () => 'Profile' },

    // serviceRefresh
    serviceRefresh: { path: '/serviceRefresh', component: () => 'ServiceRefresh' },

    // Calculator
    calculator: { path: '/calculator', component: () => 'Calculator' },

    // Page not found
    notFound: { path: '*', component: () => 'NotFound' },
};

function App() {
    return <div></div>;
}

export default App;
