export const ROUTES = {
    app: {
        root: '/',
        books: '/',
        bookDetails: '/book/:uuid',
        settings: '/settings',
        error: '/*',
    },
} as const;
