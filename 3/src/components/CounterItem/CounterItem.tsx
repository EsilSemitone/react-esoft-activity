import styles from './CounterItem.module.css';
import cn from 'classnames';
import { ICounterItemProps } from './CounterItem.props';
import { memo } from 'react';

const CounterItem = memo(function ({ title, className }: ICounterItemProps) {
    return (
        <div className={cn(styles['counter-item'], className)}>
            <div>{title}</div>
        </div>
    );
});

export default CounterItem;
