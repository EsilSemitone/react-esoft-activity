import { useMemo, useState } from 'react';
import styles from './RandomNumbersComponent.module.css';
import { getRandomNumbers } from './helpers/get-random-numbers';

function RandomNumbersComponent() {
    const [numbers, setNumbers] = useState<number[]>(() => getRandomNumbers());

    const sumNumbers = useMemo(() => {
        return numbers.reduce((acc, num) => {
            return acc + num;
        }, 0);
    }, [numbers]);

    return (
        <div className={styles['counter-panel']}>
            <p>{`Номера: ${numbers.join(', ')}`}</p>
            <p>{`Сумма ${sumNumbers}`}</p>
            <button
                className={styles['button']}
                onClick={() => {
                    setNumbers(getRandomNumbers());
                }}
            >
                Новые номера
            </button>
        </div>
    );
}

export default RandomNumbersComponent;
