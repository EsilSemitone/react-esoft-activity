import { NavLink, Outlet } from 'react-router';
import styles from './Layout.module.css';
import { ROUTS } from '../../common/constants/routs';
import { Button } from '../../components/Button/Button';
import { AppContext } from '../../context/app-context/app-context';
import { useCallback, useContext, useReducer } from 'react';
import { THEME } from '../../common/enums/theme';
import cn from 'classnames';
import { BookPageContext } from '../../context/book-page-context/book-page-context';
import { getItem } from '../../common/localstorage/localstorage';
import { LOCALSTORAGE_KEYS } from '../../common/constants/localstorage-keys';
import { INITIAL_BOOK_PAGE_STATE } from '../../context/book-page-context/constants/initial-state';
import { bookReducer } from './helpers/book-reducer';
import { BOOK_DISPATCH_TYPE } from './helpers/book-dispatch-type';
import { COLORS_KEYS } from '../../context/book-page-context/constants/colors';
import { SIZES_KEYS } from '../../context/book-page-context/constants/sizes';

function Layout() {
    const { state, dispatch } = useContext(AppContext);
    const bookViewSettings = getItem(LOCALSTORAGE_KEYS.BOOK_VIEW_SETTINGS);

    const [bookState, bookDispatch] = useReducer(bookReducer, {
        ...(bookViewSettings ? JSON.parse(bookViewSettings) : INITIAL_BOOK_PAGE_STATE.state),
    });

    const setColor = useCallback((color: COLORS_KEYS) => {
        bookDispatch({ type: BOOK_DISPATCH_TYPE.SET_COLOR, payload: color });
    }, []);
    const setSize = useCallback((size: SIZES_KEYS) => {
        bookDispatch({ type: BOOK_DISPATCH_TYPE.SET_SIZE, payload: size });
    }, []);
    const toggleBold = useCallback(() => {
        bookDispatch({ type: BOOK_DISPATCH_TYPE.TOGGLE_BOLD });
    }, []);

    return (
        <div
            className={cn(styles['layout'], {
                [styles['light']]: state.theme === THEME.LIGHT,
                [styles['dark']]: state.theme === THEME.DARK,
            })}
        >
            <div className={styles['menu']}>
                <h1>Книжная полка Pro</h1>
                <div className={styles['navigate']}>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles['menu-item'], {
                                [styles['light']]: state.theme === THEME.LIGHT,
                                [styles['dark']]: state.theme === THEME.DARK,
                                [styles['active']]: isActive,
                            })
                        }
                        to={ROUTS.app.books}
                    >
                        Книги
                    </NavLink>
                    <NavLink
                        className={({ isActive }) =>
                            cn(styles['menu-item'], {
                                [styles['light']]: state.theme === THEME.LIGHT,
                                [styles['dark']]: state.theme === THEME.DARK,
                                [styles['active']]: isActive,
                            })
                        }
                        to={ROUTS.app.settings}
                    >
                        Настройки
                    </NavLink>
                </div>
                <div className={styles['menu-footer']}>
                    <div>Тема</div>
                    <Button onClick={dispatch.toggleTheme}>{state.theme === THEME.LIGHT ? 'Темная' : 'Светлая'}</Button>
                </div>
            </div>
            <div className={styles['content']}>
                <BookPageContext.Provider
                    value={{
                        state: bookState,
                        dispatch: {
                            setColor,
                            setSize,
                            toggleBold,
                        },
                    }}
                >
                    <Outlet></Outlet>
                </BookPageContext.Provider>
            </div>
        </div>
    );
}

export default Layout;
