import { useEffect, useState } from 'react';
import styles from './Clock.module.css';

function Clock() {
    const [dateTime, setDateTime] = useState(() => new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setDateTime(new Date());
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={styles['clock']}>
            <div className={styles['date-time']}>{dateTime.toLocaleString()}</div>
            {dateTime.getMinutes() % 5 === 0 ? 'Время делится на 5' : ''}
        </div>
    );
}

export default Clock;
