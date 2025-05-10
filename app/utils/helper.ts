import { NextRequest } from 'next/server';
import { NewTzimer } from './interfaces';
import { NewTzimerTypes } from './records';

export const getQueryParams = (
    request: NextRequest,
    param: string,
): string | null => {
    const urlString = request.url ?? '';
    const { searchParams } = new URL(urlString);
    return searchParams.get(param);
};

export const validateNewTzimer = (data: NewTzimer) => {
    const requiredKeys = Object.keys(NewTzimerTypes).filter(
        (key) => key !== 'createdAt' && key !== 'updatedAt',
    ) as Array<keyof NewTzimer>;

    for (const key of requiredKeys) {
        if (!data[key] || typeof data[key] !== NewTzimerTypes[key]) {
            return false;
        }
    }
    return true;
};
