import { COLORS_KEYS } from '../constants/colors';
import { SIZES_KEYS } from '../constants/sizes';
import { IBookPageState } from './book-page-state';

export interface IBookPageContext {
    state: IBookPageState;
    dispatch: {
        setColor: (color: COLORS_KEYS) => void;
        setSize: (size: SIZES_KEYS) => void;
        toggleBold: () => void;
    };
}
