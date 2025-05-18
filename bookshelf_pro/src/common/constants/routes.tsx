import { createBrowserRouter } from 'react-router';
import { ROUTES } from './routs';
import Layout from '../../layout/Layout/Layout';
import Books from '../../pages/Books/Books';
import BookDetails from '../../pages/BookDetails/BookDetails';
import Settings from '../../pages/Settings/Settings';
import { PageNotFound } from '../../components/PageNotFound/PageNotFound';

export const ROUTER = createBrowserRouter([
    {
        path: ROUTES.app.root,
        element: <Layout></Layout>,
        children: [
            {
                path: ROUTES.app.books,
                element: <Books></Books>,
            },
            {
                path: ROUTES.app.bookDetails,
                element: <BookDetails></BookDetails>,
            },
            {
                path: ROUTES.app.settings,
                element: <Settings></Settings>,
            },
            {
                path: ROUTES.app.error,
                element: <PageNotFound></PageNotFound>,
            },
        ],
    },
]);
