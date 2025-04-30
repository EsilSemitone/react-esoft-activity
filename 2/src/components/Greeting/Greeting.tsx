import { useEffect, useState } from 'react';
import styles from './Greeting.module.css';
import { IGreetingProps } from './Greeting.props';

function Greeting({ name }: IGreetingProps) {
    const [oldName, setOldName] = useState(name);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (name !== oldName) {
            setIsFirstRender(false);
            setOldName(name);
        }
    }, [name]);

    return (
        <div className={styles['greeting']}>
            {isFirstRender && (
                <>
                    Привет <span>{name}</span>
                </>
            )}
            {!isFirstRender && (
                <>
                    Привет, у тебя поменялось имя, теперь ты <span>{name}</span>
                </>
            )}
        </div>
    );
}

export default Greeting;
