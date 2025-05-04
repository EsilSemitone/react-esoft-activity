import { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import styles from './Books.module.css';
import { AppContext } from '../../context/app-context/app-context';
import { useNavigate, useSearchParams } from 'react-router';
import { Input } from '../../components/Input/Input';
import { BookCart } from '../../components/BookCart/BookCart';
import cn from 'classnames';
import { THEME } from '../../common/enums/theme';
import { IBook } from '../../common/interfaces/book.interface';
import { IFilters } from '../../context/app-context/interfaces/filters.interface';
import Select from 'react-select';
import { Button } from '../../components/Button/Button';

function Books() {
    const { state, dispatch } = useContext(AppContext);
    const [books, setBooks] = useState<IBook[]>([]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [isOnlyFavorites, setIsOnlyFavorites] = useState(false);

    const getBooks = useCallback(
        (filters: IFilters, searchQuery: string | null | undefined, isOnlyFavorites: boolean) => {
            let books: IBook[] = JSON.parse(JSON.stringify(state.books));

            if (isOnlyFavorites) {
                books = books.filter((book) => state.favorites.includes(book.uuid));
            }

            if (searchQuery) {
                books = books.filter((book) => book.name.includes(searchQuery));
            }

            if (filters.author) {
                books = books.filter((book) => book.author === filters.author);
            }

            if (filters.written_year) {
                books = books.filter(
                    (book) => new Date(book.written_date).getFullYear() === Number.parseInt(filters.written_year!),
                );
            }

            setBooks(books);
        },
        [state.books, state.favorites],
    );

    useEffect(() => {
        getBooks(state.filters, state.searchQuery, isOnlyFavorites);
    }, [getBooks, state.filters, state.searchQuery, isOnlyFavorites]);

    useEffect(() => {
        const onlyFavorites = searchParams.get('onlyFavorites');

        if (onlyFavorites !== null) {
            if (onlyFavorites === 'false') setIsOnlyFavorites(false);
            if (onlyFavorites === 'true') setIsOnlyFavorites(true);
        }

        const query = searchParams.get('searchQuery');

        if (query) {
            dispatch.setSearchQuery(query);
        }

        const author = searchParams.get('author');

        if (author) {
            dispatch.setFilters({ author });
        }

        const written_year = searchParams.get('written_year');

        if (written_year) {
            dispatch.setFilters({ written_year });
        }
    }, []);

    const setQueryParam = ({ key, value }: { key: string; value: string }) => {
        setSearchParams((prevParams) => {
            const params = new URLSearchParams(prevParams);

            if (value === '') {
                params.delete(key);
            } else {
                params.set(key, value);
            }

            return params;
        });
    };

    const onChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setQueryParam({ key: 'searchQuery', value: query });
        dispatch.setSearchQuery(query);
    };

    const onChangeAuthor = (value: string | undefined) => {
        if (!value) {
            return;
        }
        setQueryParam({ key: 'author', value });
        dispatch.setFilters({ author: value });
    };

    const onChangeYear = (value: number | undefined) => {
        if (!value) {
            return;
        }
        setQueryParam({ key: 'written_year', value: String(value) });
        dispatch.setFilters({ written_year: String(value) });
    };

    const reset = () => {
        dispatch.resetFiltersAndSearchQuery();
        setSearchParams({});
        setIsOnlyFavorites(false);
    };

    return (
        <div className={styles['books']}>
            <div className={styles['books-header']}>
                <div className={styles['heder-item']}>{`Книг в избранном ${state.favorites.length}`}</div>
                <Button onClick={reset}>Сбросить все</Button>
                <div className={styles['heder-item']}>
                    <div>Только избранное</div>
                    <input
                        type="checkbox"
                        checked={isOnlyFavorites}
                        onChange={() => {
                            setQueryParam({ key: 'onlyFavorites', value: String(!isOnlyFavorites) });
                            setIsOnlyFavorites((bool) => !bool);
                        }}
                    />
                </div>

                <div className={styles['heder-item']}>
                    <div>Автор: </div>
                    <Select
                        className={styles['select']}
                        options={Array.from(new Set(books.map((b) => b.author))).map((author) => ({
                            value: author,
                            label: author,
                        }))}
                        onChange={(option) => onChangeAuthor(option?.label)}
                        value={
                            state.filters.author ? { value: state.filters.author, label: state.filters.author } : null
                        }
                    />
                </div>
                <div className={styles['heder-item']}>
                    <div>Год: </div>
                    <Select
                        className={styles['select']}
                        options={Array.from(new Set(books.map((b) => new Date(b.written_date).getFullYear())))
                            .sort((a, b) => a - b)
                            .map((date) => {
                                return { value: date, label: date };
                            })}
                        onChange={(option) => onChangeYear(option?.label)}
                        value={
                            state.filters.written_year
                                ? {
                                      value: Number(state.filters.written_year),
                                      label: Number(state.filters.written_year),
                                  }
                                : null
                        }
                    />
                </div>
                <div className={styles['search-input']}>
                    <Input
                        onChange={onChangeSearchInput}
                        className={styles['input']}
                        placeholder="Поиск"
                        value={state.searchQuery || ''}
                    ></Input>
                    <img src="/search-icon.svg" alt="Иконка поиска" />
                </div>
            </div>
            <div className={styles['book-list']}>
                {books.map(({ uuid, name, author }) => (
                    <BookCart
                        key={uuid}
                        className={cn({
                            [styles['dark-border']]: state.theme === THEME.LIGHT,
                            [styles['light-border']]: state.theme === THEME.DARK,
                        })}
                        onClick={() => {
                            navigate(`/book/${uuid}`);
                        }}
                        uuid={uuid}
                        name={name}
                        author={author}
                    ></BookCart>
                ))}
            </div>
        </div>
    );
}

export default Books;
