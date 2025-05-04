import { LOCALSTORAGE_KEYS } from '../../../common/constants/localstorage-keys';
import { THEME } from '../../../common/enums/theme';
import { saveItem } from '../../../common/localstorage/localstorage';
import { IAppState } from '../../../common/state/app/app-state.interface';
import { APP_DISPATCH_TYPE } from './app-dispatch-type';

export function appStateReducer(state: IAppState, { type, payload }: { type: APP_DISPATCH_TYPE; payload?: any }) {
    switch (type) {
        case APP_DISPATCH_TYPE.ADD_BOOK: {
            return { ...state, books: [...state.books, payload] };
        }
        case APP_DISPATCH_TYPE.REMOVE_BOOK: {
            return { ...state, books: state.books.filter((book) => book.uuid !== payload) };
        }
        case APP_DISPATCH_TYPE.SET_FILTERS: {
            return { ...state, filters: { ...(state.filters || {}), ...payload } };
        }
        case APP_DISPATCH_TYPE.SET_SEARCH_QUERY: {
            return { ...state, searchQuery: payload };
        }
        case APP_DISPATCH_TYPE.TOGGLE_FAVORITE: {
            const indexBook = state.favorites.findIndex((uuid) => uuid === payload);

            if (indexBook === -1) {
                saveItem(LOCALSTORAGE_KEYS.FAVORITES, JSON.stringify([...state.favorites, payload]));
                return { ...state, favorites: [...state.favorites, payload] };
            }

            saveItem(LOCALSTORAGE_KEYS.THEME, JSON.stringify([...state.favorites.splice(indexBook, 1)]));
            return { ...state, favorites: [...state.favorites.splice(indexBook, 1)] };
        }
        case APP_DISPATCH_TYPE.TOGGLE_THEME: {
            const theme = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
            saveItem(LOCALSTORAGE_KEYS.THEME, theme);
            return { ...state, theme };
        }

        case APP_DISPATCH_TYPE.RESET_FILTER_AND_SEARCH_QUERY: {
            return { ...state, searchQuery: null, filters: {} };
        }

        case APP_DISPATCH_TYPE.RESET_FAVORITES: {
            saveItem(LOCALSTORAGE_KEYS.FAVORITES, JSON.stringify([]));
            return { ...state, favorites: [] };
        }
    }
}
