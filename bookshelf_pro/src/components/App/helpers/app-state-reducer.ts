import { THEME } from '../../../common/enums/theme';
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
            const book = state.favorites.find((id) => id === payload);

            if (!book) {
                return { ...state, favorites: [...state.favorites, payload] };
            }
            return { ...state, favorites: state.favorites.filter((id) => id !== payload) };
        }
        case APP_DISPATCH_TYPE.TOGGLE_THEME: {
            const theme = state.theme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
            return { ...state, theme };
        }

        case APP_DISPATCH_TYPE.RESET_FILTER_AND_SEARCH_QUERY: {
            return { ...state, searchQuery: null, filters: {} };
        }

        case APP_DISPATCH_TYPE.RESET_FAVORITES: {
            return { ...state, favorites: [] };
        }

        default: {
            return state;
        }
    }
}
