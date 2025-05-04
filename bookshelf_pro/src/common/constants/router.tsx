import { createBrowserRouter } from 'react-router';
import { ROUTS } from './routs';
import Layout from '../../layout/Layout/Layout';
import Books from '../../pages/Books/Books';
import BookDetails from '../../pages/BookDetails/BookDetails';
import Settings from '../../pages/Settings/Settings';

export const ROUTER = createBrowserRouter([
    {
        path: ROUTS.app.root,
        element: <Layout></Layout>,
        children: [
            {
                path: ROUTS.app.books,
                element: <Books></Books>,
            },
            {
                path: ROUTS.app.bookDetails,
                element: <BookDetails></BookDetails>,
            },
            {
                path: ROUTS.app.settings,
                element: <Settings></Settings>,
            },
            {
                path: ROUTS.app.error,
                element: <div>страница не найдена</div>,
            },
        ],
    },
]);
