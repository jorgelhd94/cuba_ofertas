import { useCallback } from 'react';

export const useQueryString = (searchParams: URLSearchParams) => {
    const createQueryString = useCallback(
        (param: { name: string; value: string | null }) => {
            const params = new URLSearchParams(searchParams.toString());

            if (!param.value) {
                params.delete(param.name);
                return params;
            }

            params.set(param.name, param.value);

            return params.toString();
        },
        [searchParams]
    );

    return { createQueryString };
};

