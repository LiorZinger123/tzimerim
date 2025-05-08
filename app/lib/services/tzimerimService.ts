import { Document } from 'mongodb';
import TzimerSchema from '../schemas/tzimerSchema';
import { Tzimer } from '../../utils/interfaces';
import { transformToTzimer } from '@/app/utils/helper';

export const getAllTzimerim = async (): Promise<Tzimer[]> => {
    const data = await TzimerSchema.find({}).lean();
    return data.map((tzimer: Document) => transformToTzimer(tzimer));
};

export const getSingleTzimer = async (id: string): Promise<Tzimer | null> => {
    const data = await TzimerSchema.findOne({ _id: id }).lean();
    return data ? transformToTzimer(data) : null;
};

export const createTzimer = async (data: Tzimer) => {
    const tzimer = new TzimerSchema(data);
    try {
        await tzimer.validate();
    } catch {
        return 400;
    }
    await tzimer.save();
    return 201;
};

export const searchTzimerim = async (query: string) => {
    const data = await TzimerSchema.find({
        $or: [{ name: { $regex: query, $options: 'i' } }],
    }).lean();

    return data.map((tzimer: Document) => transformToTzimer(tzimer));
};

export const deleteTzimer = async (id: string) => {
    return await TzimerSchema.findByIdAndDelete(id);
};
