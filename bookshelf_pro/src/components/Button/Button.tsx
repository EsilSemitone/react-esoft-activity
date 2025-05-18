import { IButtonProps } from './Button-props';
import styles from './Button.module.css';
import cn from 'classnames';
import { THEME } from '../../common/enums/theme';

export function Button({ children, className, theme, form = 'default', size = 'little', ...props }: IButtonProps) {
    return (
        <button
            {...props}
            className={cn(styles.button, className, {
                [styles.little]: size === 'little',
                [styles.big]: size === 'big',
                [styles.circle]: form === 'circle',
                [styles.dark]: theme === THEME.LIGHT,
                [styles.light]: theme === THEME.DARK,
            })}
        >
            {children}
        </button>
    );
}
