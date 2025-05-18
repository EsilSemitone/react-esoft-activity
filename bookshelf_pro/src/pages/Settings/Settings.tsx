import { useContext } from 'react';
import styles from './Settings.module.css';
import { AppContext } from '../../context/app-context/app-context';
import { Button } from '../../components/Button/Button';
import { THEME } from '../../common/enums/theme';

function Settings() {
    const { state, dispatch } = useContext(AppContext);
    const { state: appState } = useContext(AppContext);

    return (
        <div className={styles.settings}>
            <h1>Настройки</h1>
            <div className={styles.settings_container}>
                <div className={styles.settings_item}>
                    <div>Тема:</div>
                    <Button onClick={dispatch.toggleTheme} theme={appState.theme}>
                        {state.theme === THEME.LIGHT ? 'Темная' : 'Светлая'}
                    </Button>
                </div>
                <div className={styles.settings_item}>
                    <div>Сброс избранного:</div>
                    <Button onClick={dispatch.resetFavorites} theme={appState.theme}>
                        Сбросить
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Settings;
