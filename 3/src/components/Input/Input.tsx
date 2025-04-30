import styles from './Input.module.css';
import { IInputProps } from './Input.props';

function Input(props: IInputProps) {
    return <input className={styles['input']} {...props} />;
}

export default Input;
