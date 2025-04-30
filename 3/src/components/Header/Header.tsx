import { useContext } from 'react';
import styles from './Header.module.css';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import { Theme } from '../../context/ThemeContext/types';
import cn from 'classnames';

function Header() {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme((theme: Theme) => {
            return theme === 'white' ? 'dark' : 'white';
        });
    };

    return (
        <header
            className={cn(styles['header'], {
                [styles['white']]: theme === 'white',
                [styles['dark']]: theme === 'dark',
            })}
        >
            <div
                className={cn(styles['header-left'], {
                    [styles['white']]: theme === 'white',
                    [styles['dark']]: theme === 'dark',
                })}
            >
                <p>Дз - 2</p>
            </div>
            <button
                className={cn(styles['theme-button'], {
                    [styles['white']]: theme === 'dark',
                    [styles['dark']]: theme === 'white',
                })}
                onClick={toggleTheme}
            >
                {theme === 'white' ? 'dark' : 'white'}
            </button>
        </header>
    );
}

export default Header;
