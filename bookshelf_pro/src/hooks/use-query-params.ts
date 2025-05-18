import { useSearchParams } from 'react-router';

export const useQueryParams = () => {
    const [searchParams, setSearchParams] = useSearchParams();

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

    const resetParams = () => {
        setSearchParams(new URLSearchParams());
    };

    return { setQueryParam, resetParams, searchParams };
};
