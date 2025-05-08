import { Tzimer } from './interfaces';
import { Document } from 'mongodb';

export const transformToTzimer = (doc: Document): Tzimer => {
    const { _id, __v, ...rest } = doc;
    return { _id: _id.toString(), ...rest } as Tzimer;
};
