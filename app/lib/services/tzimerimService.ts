import { Document } from 'mongodb';
import TzimerSchema from '../schemas/tzimerSchema';
import { Tzimer } from '../../utils/interfaces';
import { transformToTzimer } from '@/app/utils/helper';

export const getAllTzimerim = async (): Promise<Tzimer[]> => {
    const data = await TzimerSchema.find({}).lean();
    return data.map((tzimer: Document) => transformToTzimer(tzimer));
};

export const getSingleTzimer = async (id: number): Promise<Tzimer | null> => {
    const data = await TzimerSchema.findOne({ id }).lean();
    return data ? transformToTzimer(data) : null;
};
