import { useContext } from 'react';
import styles from './BookDetails.module.css';
import { useParams } from 'react-router';
import { AppContext } from '../../context/app-context/app-context';
import { Button } from '../../components/Button/Button';
import { BookPageContext } from '../../context/book-page-context/book-page-context';
import Select from 'react-select';
import { COLORS, COLORS_KEYS } from '../../context/book-page-context/constants/colors';
import { SIZES, SIZES_KEYS } from '../../context/book-page-context/constants/sizes';

function BookDetails() {
    const { uuid } = useParams();
    const { state, dispatch } = useContext(AppContext);
    const book = state.books.find((b) => b.uuid === uuid);
    const { state: bookState, dispatch: bookDispatch } = useContext(BookPageContext);

    const onChangeColor = (color: string | undefined) => {
        if (!color) {
            return;
        }

        bookDispatch.setColor(color as COLORS_KEYS);
    };

    const onChangeSize = (size: string | undefined) => {
        if (!size) {
            return;
        }

        bookDispatch.setSize(size as SIZES_KEYS);
    };

    return (
        <>
            {!book && <h1>Книга не найдена!</h1>}
            {book && (
                <div className={styles.book_details__container}>
                    <div
                        style={{
                            color: bookState.color ? bookState.color : '',
                            fontSize: bookState.size ? SIZES[bookState.size] : '',
                            fontWeight: bookState.bold ? '600' : '',
                        }}
                        className={styles.book_details__book}
                    >
                        <h1>{book.name}</h1>
                        <div>{`Автор: ${book.author}`}</div>
                        <div>{`Написана: ${book.written_date.toLocaleDateString()}`}</div>
                        <p>{book.description}</p>
                        <Button
                            className={styles.button}
                            theme={state.theme}
                            onClick={() => {
                                dispatch.toggleFavorite(uuid!);
                            }}
                        >
                            В избранное
                        </Button>
                    </div>
                    <div className={styles.book_details__settings}>
                        <h1>Настройки</h1>
                        <div className={styles.setting_item}>
                            <div>Цвет текста</div>
                            <Select
                                className={styles.select}
                                options={Object.keys(COLORS).map((key) => {
                                    return { value: key, label: key };
                                })}
                                onChange={(option) => onChangeColor(option?.value)}
                                value={
                                    bookState.color
                                        ? {
                                              value: bookState.color as string,
                                              label: bookState.color as string,
                                          }
                                        : null
                                }
                            />
                        </div>
                        <div className={styles.setting_item}>
                            <div>Цвет текста</div>
                            <Select
                                className={styles.select}
                                options={Object.keys(SIZES).map((size) => {
                                    return { value: size, label: size };
                                })}
                                onChange={(option) => onChangeSize(option?.value)}
                                value={
                                    bookState.size
                                        ? {
                                              value: bookState.size as string,
                                              label: bookState.size as string,
                                          }
                                        : null
                                }
                            />
                        </div>
                        <Button
                            onClick={() => {
                                bookDispatch.toggleBold();
                            }}
                            theme={state.theme}
                        >{`Жирный текст ${bookState.bold ? 'вкл' : 'выкл'}`}</Button>
                    </div>
                </div>
            )}
        </>
    );
}

export default BookDetails;
