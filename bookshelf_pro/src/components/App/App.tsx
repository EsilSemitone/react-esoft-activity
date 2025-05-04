import { useCallback, useReducer } from 'react';
import { LOCALSTORAGE_KEYS } from '../../common/constants/localstorage-keys';
import { THEME } from '../../common/enums/theme';
import { AppContext } from '../../context/app-context/app-context';
import { INITIAL_APP_STATE } from '../../common/state/app/initial-app-state';
import { appStateReducer } from './helpers/app-state-reducer';
import { APP_DISPATCH_TYPE } from './helpers/app-dispatch-type';
import { IBook } from '../../common/interfaces/book.interface';
import { IFilters } from '../../context/app-context/interfaces/filters.interface';
import { RouterProvider } from 'react-router';
import { ROUTER } from '../../common/constants/router';
import { getItem } from '../../common/localstorage/localstorage';

function App() {
    const theme = getItem<THEME>(LOCALSTORAGE_KEYS.THEME);
    const favorites = getItem(LOCALSTORAGE_KEYS.FAVORITES);
    const localstorageSearchQuery = getItem(LOCALSTORAGE_KEYS.SEARCH_QUERY);
    const localstorageFilters = getItem(LOCALSTORAGE_KEYS.FILTERS);

    const [state, dispatch] = useReducer(appStateReducer, {
        ...INITIAL_APP_STATE,
        ...(theme ? { theme } : {}),
        ...(favorites ? { favorites: JSON.parse(favorites) } : {}),
        ...(localstorageSearchQuery ? { searchQuery: localstorageSearchQuery } : {}),
        ...(localstorageFilters ? { filters: JSON.parse(localstorageFilters) } : {}),
    });

    const toggleTheme = useCallback(() => {
        dispatch({ type: APP_DISPATCH_TYPE.TOGGLE_THEME });
    }, []);

    const addBook = useCallback((book: Omit<IBook, 'uuid'>) => {
        dispatch({ type: APP_DISPATCH_TYPE.ADD_BOOK, payload: book });
    }, []);

    const removeBook = useCallback((uuid: string) => {
        dispatch({ type: APP_DISPATCH_TYPE.REMOVE_BOOK, payload: uuid });
    }, []);

    const toggleFavorite = useCallback((uuid: string) => {
        dispatch({ type: APP_DISPATCH_TYPE.TOGGLE_FAVORITE, payload: uuid });
    }, []);

    const setSearchQuery = useCallback((query: string | null) => {
        dispatch({ type: APP_DISPATCH_TYPE.SET_SEARCH_QUERY, payload: query });
    }, []);

    const setFilters = useCallback((filters: IFilters) => {
        dispatch({ type: APP_DISPATCH_TYPE.SET_FILTERS, payload: filters });
    }, []);

    const resetFiltersAndSearchQuery = useCallback(() => {
        dispatch({ type: APP_DISPATCH_TYPE.RESET_FILTER_AND_SEARCH_QUERY });
    }, []);

    const resetFavorites = useCallback(() => {
        dispatch({ type: APP_DISPATCH_TYPE.RESET_FAVORITES });
    }, []);

    return (
        <AppContext.Provider
            value={{
                state,
                dispatch: {
                    toggleTheme,
                    addBook,
                    removeBook,
                    toggleFavorite,
                    setSearchQuery,
                    setFilters,
                    resetFiltersAndSearchQuery,
                    resetFavorites,
                },
            }}
        >
            <RouterProvider router={ROUTER}></RouterProvider>
        </AppContext.Provider>
    );
}

export default App;
