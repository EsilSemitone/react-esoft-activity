import { useCallback, useContext, useState } from 'react';
import styles from './Counter.module.css';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext';
import cn from 'classnames';
import CounterPanel from '../CounterPanel/CounterPanel';
import { ICounterListItem } from './interfaces/counter-list-item';
import { getRandomCounterList } from './helpers/get-random-counter-list';
import CounterList from '../CounterList/CounterList';
import CounterItem from '../CounterItem/CounterItem';

function Counter() {
    const { theme } = useContext(ThemeContext);
    const [num, setNum] = useState<number>(0);
    const [counterList, setCounterList] = useState<ICounterListItem[]>(() => getRandomCounterList(4));
    const [someState, setSomeState] = useState<number>(() => Math.random());

    const increment = useCallback(() => {
        setNum((num) => num + 1);
        setCounterList((list) => [...list, ...getRandomCounterList(1)]);
    }, []);

    const decrement = useCallback(() => {
        setNum((num) => num - 1);
        setCounterList((list) => {
            const items = [...list];
            items.pop();
            return items;
        });
    }, []);

    return (
        <div
            className={cn(styles['counter-container'], {
                [styles['white']]: theme === 'white',
                [styles['dark']]: theme === 'dark',
            })}
        >
            <button
                onClick={() => {
                    setSomeState(Math.random());
                }}
                className={cn(styles['button'], {
                    [styles['white']]: theme === 'dark',
                    [styles['dark']]: theme === 'white',
                })}
            >
                Кнопка которая просто меняет состояние чтобы дети ниже перерендерелись
            </button>
            {/* CounterPanel обернут в memo, а так же сохранена ссылка на increment/decrement
             по этому нажатие кнопки не вызовет перерендер компонена (^ 6 задание)*/}
            <CounterPanel increment={increment} decrement={decrement}></CounterPanel>
            <CounterList>
                {counterList.map(({ id, title }) => (
                    <CounterItem
                        className={cn({
                            [styles['white']]: theme === 'dark',
                            [styles['dark']]: theme === 'white',
                        })}
                        key={id}
                        title={title}
                    ></CounterItem>
                ))}
            </CounterList>
        </div>
    );
}

export default Counter;
