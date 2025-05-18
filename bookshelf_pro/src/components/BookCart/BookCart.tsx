import { memo } from 'react';
import { IBookCartProps } from './BookCart-props';
import styles from './BookCart.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router';

export const BookCart = memo(({ className, uuid, name, author, theme, ...props }: IBookCartProps) => {
    const navigate = useNavigate();
    return (
        <Button
            onClick={() => {
                navigate(`/book/${uuid}`);
            }}
            theme={theme}
            {...props}
            className={cn(styles.cart, className)}
        >
            <div className={styles.cart_header}>
                <div>{name}</div>
                <div>{`Автор: ${author}`}</div>
            </div>
            <div className={styles.cart_container}></div>
        </Button>
    );
});
