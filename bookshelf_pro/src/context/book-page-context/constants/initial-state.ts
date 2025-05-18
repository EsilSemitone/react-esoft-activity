import { COLORS_KEYS } from './colors';
import { SIZES_KEYS } from './sizes';

export const INITIAL_BOOK_PAGE_STATE = {
    state: {
        color: 'black' as COLORS_KEYS,
        size: 'medium' as SIZES_KEYS,
        bold: false,
    },
    dispatch: {
        setColor: (color: COLORS_KEYS) => {},
        setSize: (size: SIZES_KEYS) => {},
        toggleBold: () => {},
    },
};
