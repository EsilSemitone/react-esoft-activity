import { IInputProps } from './Input-props';
import styles from './Input.module.css';
import cn from 'classnames';

export function Input({ className, ...props }: IInputProps) {
    return <input {...props} className={cn(className, styles['input'])} />;
}
