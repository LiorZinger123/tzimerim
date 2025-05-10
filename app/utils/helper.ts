import { NextRequest } from 'next/server';
import { Tzimer } from './interfaces';
import { Document } from 'mongodb';

export const transformToTzimer = (doc: Document): Tzimer => {
    const { _id, __v, ...rest } = doc;
    return rest as Tzimer;
};

export const getQueryParams = (
    request: NextRequest,
    param: string,
): string | null => {
    const urlString = request.url ?? '';
    const { searchParams } = new URL(urlString);
    return searchParams.get(param);
};
