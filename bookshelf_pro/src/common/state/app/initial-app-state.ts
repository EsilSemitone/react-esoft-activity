import { THEME } from '../../enums/theme';
import { BOOKS } from '../../seed/books';
import { IAppState } from './app-state.interface';

export const INITIAL_APP_STATE: IAppState = {
    theme: THEME.LIGHT,
    books: BOOKS,
    favorites: [],
    searchQuery: null,
    filters: {},
};
