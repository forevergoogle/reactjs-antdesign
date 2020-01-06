import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import ManifestPage from './containers/Manifest/PageContainer';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PrivatePage from './pages/PrivatePage/PrivatePage';
import OrderImport from './containers/Order/PageContainer';
import CreateOrderPage from './containers/Order/PageCreateContainer';
import PageContainer from './containers/OrderList/PageContainer';

const routes = [
    {
        key: '01',
        path: '/',
        exact: true,
        main: () => <HomePage/>
    },
    {
        key: '02',
        path: '/manifest/:id?',
        exact: false,
        main: () => <ManifestPage />
    },
    {
        key: '0303',
        path: '/order/import/:id?',
        exact: false,
        main: () => <OrderImport />
    },
    {
        path: '/403',
        exact: true,
        main: () => <PrivatePage />
    },
    {
        key: '0304',
        path: '/order/create/:id?',
        exact: false,
        main: () => <CreateOrderPage />
    },
    {
        key: '0305',
        path: '/order/list',
        exact: false,
        main: () => <PageContainer />
    },
    {
        path: '/404',
        exact: true,
        main: () => <NotFoundPage />
    },
    {
        path: '',
        exact: false,
        main: () => <NotFoundPage />
    },
];

export default routes;