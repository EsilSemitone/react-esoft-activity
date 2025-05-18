import { createRoot } from 'react-dom/client';
import './index.css';
import App from './components/App/App.tsx';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import Todo from './components/Todo/Todo.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to={'/dz-2-tasks(1-4,6)'}></Navigate>,
    },
    {
        path: '/dz-2-tasks(1-4,6)',
        element: <App></App>,
    },
    {
        path: '/dz-2-tasks(5,bonusTask)',
        element: <Todo></Todo>,
    },
    {
        path: '/*',
        element: <Navigate to={'/dz-2-tasks(1-4,6)'}></Navigate>,
    },
]);

createRoot(document.getElementById('root')!).render(<RouterProvider router={router}></RouterProvider>);
