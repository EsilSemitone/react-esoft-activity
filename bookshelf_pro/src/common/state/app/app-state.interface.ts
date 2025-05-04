import { THEME } from '../../enums/theme';
import { IBook } from '../../interfaces/book.interface';
import { IFilters } from '../../../context/app-context/interfaces/filters.interface';

export interface IAppState {
    theme: THEME;
    books: IBook[];
    favorites: string[];
    searchQuery?: string | null;
    filters: IFilters;
}
