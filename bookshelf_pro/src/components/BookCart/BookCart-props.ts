import { HTMLAttributes } from 'react';
import { THEME } from '../../common/enums/theme';

export interface IBookCartProps extends HTMLAttributes<HTMLElement> {
    uuid: string;
    name: string;
    author: string;
    theme: THEME;
}
