import { useEffect, useState } from 'react';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import styles from './App.module.css';
import { Theme } from '../../context/ThemeContext/types';
import { useLocalStorage } from '../../hooks/use-localstorage';
import Header from '../Header/Header';
import Counter from '../Counter/Counter';
import RandomNumbersComponent from '../RandomNumbersComponent/RandomNumbersComponent';
import Form from '../Form/Form';

function App() {
    const [item, setItem] = useLocalStorage<Theme>('theme');
    const [theme, setTheme] = useState<Theme>(item ?? 'white');

    useEffect(() => {
        setItem(theme);
    }, [setItem, theme]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <div className={styles['app']}>
                <Header></Header>
                <Counter></Counter>
                <RandomNumbersComponent></RandomNumbersComponent>
                <Form></Form>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
