import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import styles from './Form.module.css';

function Form() {
    const [text, setText] = useState<string>('');

    const changeText = ({ target }: ChangeEvent<HTMLInputElement>) => {
        setText(target.value);
    };

    const ref = useRef<null | HTMLInputElement>(null);
    const focusElement = (e: MouseEvent<HTMLButtonElement>) => {
        if (ref.current) {
            ref.current.focus();
        }
    };

    return (
        <div className={styles['form']}>
            <input ref={ref} className={styles['input']} type="text" value={text} onChange={changeText} />
            <button className={styles['button']} onClick={focusElement}>
                фокус
            </button>
        </div>
    );
}

export default Form;
