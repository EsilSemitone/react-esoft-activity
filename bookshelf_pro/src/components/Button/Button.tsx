import { useContext } from 'react';
import { AppContext } from '../../context/app-context/app-context';
import { IButtonProps } from './Button-props';
import styles from './Button.module.css';
import cn from 'classnames';
import { THEME } from '../../common/enums/theme';

export function Button({ children, className, form = 'default', size = 'little', ...props }: IButtonProps) {
    const { state } = useContext(AppContext);
    return (
        <button
            {...props}
            className={cn(styles['button'], className, {
                [styles['little']]: size === 'little',
                [styles['big']]: size === 'big',
                [styles['circle']]: form === 'circle',
                [styles['dark']]: state.theme === THEME.LIGHT,
                [styles['light']]: state.theme === THEME.DARK,
            })}
        >
            {children}
        </button>
    );
}
