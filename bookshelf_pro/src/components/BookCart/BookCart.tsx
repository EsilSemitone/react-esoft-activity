import { memo } from 'react';
import { IBookCartProps } from './BookCart-props';
import styles from './BookCart.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';

export const BookCart = memo(({ className, uuid, name, author, ...props }: IBookCartProps) => {
    return (
        <Button {...props} className={cn(styles['cart'], className)}>
            <div className={styles['cart-header']}>
                <div>{name}</div>
                <div>{`Автор: ${author}`}</div>
            </div>
            <div className={styles['cart-container']}></div>
        </Button>
    );
});
