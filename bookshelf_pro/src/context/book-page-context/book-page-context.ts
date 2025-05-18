import { createContext } from 'react';
import { IBookPageContext } from './interfaces/book-page-context.interface';
import { INITIAL_BOOK_PAGE_STATE } from './constants/initial-state';

export const BookPageContext = createContext<IBookPageContext>(INITIAL_BOOK_PAGE_STATE);
