import { Tzimer } from './interfaces';
import { Document } from 'mongodb';

export const transformToTzimer = (doc: Document): Tzimer => {
    const { _id, __v, ...rest } = doc;
    return rest as Tzimer;
};
