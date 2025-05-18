import { ButtonHTMLAttributes, ReactNode } from 'react';
import { THEME } from '../../common/enums/theme';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    size?: 'little' | 'big';
    form?: 'default' | 'circle';
    theme: THEME;
}
