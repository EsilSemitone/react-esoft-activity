import { useContext } from 'react';
import styles from './Settings.module.css';
import { AppContext } from '../../context/app-context/app-context';
import { Button } from '../../components/Button/Button';
import { THEME } from '../../common/enums/theme';

function Settings() {
    const { state, dispatch } = useContext(AppContext);

    return (
        <div className={styles['settings']}>
            <h1>Настройки</h1>
            <div className={styles['settings-container']}>
                <div className={styles['settings-item']}>
                    <div>Тема:</div>
                    <Button onClick={dispatch.toggleTheme}>{state.theme === THEME.LIGHT ? 'Темная' : 'Светлая'}</Button>
                </div>
                <div className={styles['settings-item']}>
                    <div>Сброс избранного:</div>
                    <Button onClick={dispatch.resetFavorites}>Сбросить</Button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
