import { COLORS_KEYS } from '../constants/colors';
import { SIZES_KEYS } from '../constants/sizes';

export interface IBookPageState {
    color: COLORS_KEYS;
    size: SIZES_KEYS;
    bold: boolean;
}
