import { Document, WithId } from 'mongodb';
import TzimerSchema from '../schemas/tzimerSchema';
import { Tzimer } from '../../utils/interfaces';

export const getAllTzimerim = async (): Promise<Tzimer[]> => {
    const data = await TzimerSchema.find({}).lean();

    return data.map((tzimer: Document) => {
        const { _id, ...rest } = tzimer;
        return { ...rest } as Tzimer;
    });
};

export const getSingleTzimer = async (id: number): Promise<Tzimer | null> => {
    const data = await TzimerSchema.findOne({ id }).lean();

    if (!data) {
        return null;
    }

    const { _id, ...rest } = data as WithId<Document>;
    return rest as Tzimer;
};
