import { LOCALSTORAGE_KEYS } from '../../../common/constants/localstorage-keys';
import { saveItem } from '../../../common/localstorage/localstorage';
import { IBookPageState } from '../../../context/book-page-context/interfaces/book-page-state';
import { BOOK_DISPATCH_TYPE } from './book-dispatch-type';

export function bookReducer(state: IBookPageState, { type, payload }: { type: BOOK_DISPATCH_TYPE; payload?: any }) {
    switch (type) {
        case BOOK_DISPATCH_TYPE.SET_COLOR: {
            saveItem(LOCALSTORAGE_KEYS.BOOK_VIEW_SETTINGS, JSON.stringify({ ...state, color: payload }));
            return { ...state, color: payload };
        }
        case BOOK_DISPATCH_TYPE.SET_SIZE: {
            saveItem(LOCALSTORAGE_KEYS.BOOK_VIEW_SETTINGS, JSON.stringify({ ...state, size: payload }));
            return { ...state, size: payload };
        }
        case BOOK_DISPATCH_TYPE.TOGGLE_BOLD: {
            saveItem(LOCALSTORAGE_KEYS.BOOK_VIEW_SETTINGS, JSON.stringify({ ...state, bold: !state.bold }));
            return { ...state, bold: !state.bold };
        }
    }
}
