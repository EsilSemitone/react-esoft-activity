import { useEffect, useState } from 'react';
import styles from './Container.module.css';
import { getRandomName } from './helpers/get-random-name';
import Greeting from '../Greeting/Greeting';
import Clock from '../Clock/Clock';
import Header from '../Header/Header';

function Container() {
    const [name, setName] = useState<string>(() => getRandomName());

    useEffect(() => {
        const interval = setInterval(() => {
            setName(getRandomName());
        }, 1000 * 10);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div className={styles['container']}>
            <Header></Header>
            <Greeting name={name}></Greeting>
            <Clock></Clock>
        </div>
    );
}

export default Container;
