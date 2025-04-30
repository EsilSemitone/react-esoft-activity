import styles from './CounterList.module.css';
import { ICounterListProps } from './CounterList.props';

function CounterList({ children }: ICounterListProps) {
    return <div className={styles['counter-list']}>{children}</div>;
}

export default CounterList;
