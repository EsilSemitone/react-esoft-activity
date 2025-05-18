import { IBook } from '../../../common/interfaces/book.interface';
import { IAppState } from '../../../common/state/app/app-state.interface';
import { IFilters } from './filters.interface';

export interface IAppContext {
    state: IAppState;
    dispatch: {
        toggleTheme: () => void;
        addBook: (book: IBook) => void;
        removeBook: (uuid: string) => void;
        toggleFavorite: (uuid: string) => void;
        setSearchQuery: (query: string) => void;
        setFilters: (filters: IFilters) => void;
        resetFiltersAndSearchQuery: () => void;
        resetFavorites: () => void;
    };
}
