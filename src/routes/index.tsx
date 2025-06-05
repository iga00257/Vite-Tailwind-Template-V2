import { lazy } from 'react';
export const basePath = '';

export const ROUTE_PATH = {
  HOME: '/',
} as const;

const HomePage = lazy(async () => await import('@/components/pages/home'));

export const ROUTES_PARENT_PATH = '/app';

export const routes = [
  {
    path: '/',
    Component: HomePage,
  },
];
