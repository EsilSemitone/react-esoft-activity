import styles from './CounterPanel.module.css';
import cn from 'classnames';
import { ICounterPanelProps } from './CounterPanel.props';
import { memo, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';

const CounterPanel = memo(function ({ increment, decrement }: ICounterPanelProps) {
    console.log('render CounterPanel');
    const { theme } = useContext(ThemeContext);

    return (
        <div
            className={cn(styles['counter-panel'], {
                [styles['white']]: theme === 'white',
                [styles['dark']]: theme === 'dark',
            })}
        >
            <button
                className={cn(styles['counter-button'], {
                    [styles['white']]: theme === 'dark',
                    [styles['dark']]: theme === 'white',
                })}
                onClick={() => increment()}
            >
                +
            </button>
            <button
                className={cn(styles['counter-button'], {
                    [styles['white']]: theme === 'dark',
                    [styles['dark']]: theme === 'white',
                })}
                onClick={() => decrement()}
            >
                -
            </button>
        </div>
    );
});

export default CounterPanel;
