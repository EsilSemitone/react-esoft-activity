import { createContext } from 'react';
import { IAppContext } from './interfaces/app-context.interface';
import { INITIAL_APP_STATE } from '../../common/state/app/initial-app-state';
import { IBook } from '../../common/interfaces/book.interface';
import { IFilters } from './interfaces/filters.interface';

export const AppContext = createContext<IAppContext>({
    state: INITIAL_APP_STATE,
    dispatch: {
        toggleTheme: function (): void {},
        addBook: function (book: Omit<IBook, 'uuid'>): void {},
        removeBook: function (uuid: string): void {},
        toggleFavorite: function (uuid: string): void {},
        setSearchQuery: function (query: string): void {},
        setFilters: function (filters: IFilters): void {},
        resetFiltersAndSearchQuery: function (): void {},
        resetFavorites: function (): void {},
    },
});
