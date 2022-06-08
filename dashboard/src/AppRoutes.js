import { lazy, createContext, useContext, Suspense } from 'react';
import { generatePath } from 'react-router';
import { BrowserRouter, Route, Routes as BrowserRoutes, Navigate } from 'react-router-dom';

import { RouteFallback } from "lib/components";

const Machines = lazy(() => import('Machines'));
const Machine = lazy(() => import('Machines/Machine'));
const Proxies = lazy(() => import('Proxies'));
const Proxy = lazy(() => import('Proxies/Proxy'));
const Channels = lazy(() => import('Channels'));
const Channel = lazy(() => import('Channels/Channel'));
const KeywordCategories = lazy(() => import('Keywords/Categories'));
const KeywordCategory = lazy(() => import('Keywords/Category'));
const Keywords = lazy(() => import('Keywords/Keywords'));
const Keyword = lazy(() => import('Keywords/Keyword'));

const RedirectToMachines = () => <Navigate to="/machines" />;

export const routes = {
    MACHINES: {
        id: 'MACHINES',
        path: '/machines',
        exact: true,
        Component: Machines,
    },
    MACHINE_EDIT: {
        id: 'MACHINE_EDIT',
        path: '/machines/edit/:id',
        exact: true,
        Component: Machine,
    },
    MACHINE_ADD: {
        id: 'MACHINE_ADD',
        path: '/machines/add',
        exact: true,
        Component: Machine,
    },
    PROXIES: {
        id: 'PROXIES',
        path: '/proxies',
        exact: true,
        Component: Proxies,
    },
    PROXY_ADD: {
        id: 'PROXY_ADD',
        path: '/proxies/add',
        exact: true,
        Component: Proxy,
    },
    PROXY_EDIT: {
        id: 'PROXY_EDIT',
        path: '/proxies/edit/:id',
        exact: true,
        Component: Proxy,
    },
    CHANNELS: {
        id: 'CHANNELS',
        path: '/channels',
        exact: true,
        Component: Channels,
    },
    CHANNEL_ADD: {
        id: 'CHANNEL_ADD',
        path: '/channels/add',
        exact: true,
        Component: Channel,
    },
    CHANNEL_EDIT: {
        id: 'CHANNEL_EDIT',
        path: '/channels/edit/:id',
        exact: true,
        Component: Channel,
    },
    KEYWORD_CATEGORIES: {
        id: 'KEYWORD_CATEGORIES',
        path: '/keywords/categories',
        exact: true,
        Component: KeywordCategories,
    },
    KEYWORD_CATEGORY_ADD: {
        id: 'KEYWORD_CATEGORY_ADD',
        path: '/keywords/category/add',
        exact: true,
        Component: KeywordCategory,
    },
    KEYWORD_CATEGORY_EDIT: {
        id: 'KEYWORD_CATEGORY_EDIT',
        path: '/keywords/category/edit/:id',
        exact: true,
        Component: KeywordCategory,
    },
    KEYWORDS: {
        id: 'KEYWORDS',
        path: '/keywords/list/:categoryId',
        exact: true,
        Component: Keywords,
    },
    KEYWORD_EDIT: {
        id: 'KEYWORD',
        path: '/keyword/edit/:id',
        exact: true,
        Component: Keyword,
    },
    KEYWORD_ADD: {
        id: 'KEYWORD_ADD',
        path: '/keyword/add/:categoryId',
        exact: true,
        Component: Keyword,
    },
    ROOT: {
        path: "/",
        exact: true,
        Component: RedirectToMachines,
    }
}

/**
 * Generate path for given route. Pass params for routes
 * which contain dynamic parts like query params
 * @param {String|Object} routeOrRouteId    Route object to match.
 * @param {Object} params                   Object containing data for query parameters included in matched route.
 */

export function generateLink(route, params) {
    return generatePath(route.path, params);
}

export const Routes = () => {
    return (
        <BrowserRouter>
            <BrowserRoutes>
                {Object.values(routes).map((r, i) =>
                    <Route
                        key={i}
                        path={r.path}
                        element={<Suspense fallback={<RouteFallback />}><r.Component /></Suspense>}
                    />
                )}
            </BrowserRoutes>
        </BrowserRouter>
    );
};

export const RoutesContext = createContext(routes);

export const RoutesProvider = ({ children }) => {
    const provide = {
        routes,
    };

    return (
        <RoutesContext.Provider value={provide}>{children}</RoutesContext.Provider>
    );
};

export function useAppRoutes() {
    const context = useContext(RoutesContext);
    if (!context) {
        throw new Error(`useAppRoutes must be used within a RoutesProvider`);
    }
    return context;
}