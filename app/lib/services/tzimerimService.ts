import { Document } from 'mongodb';
import TzimerSchema from '../schemas/tzimerSchema';
import { NewTzimer, Tzimer } from '../../utils/interfaces';
import { transformToTzimer } from '@/app/utils/helper';
import { UnavailableDate } from '@/app/utils/interfaces';

export const getTzimerim = async (
    skip: number,
    limit: number,
): Promise<Tzimer[]> => {
    const data = await TzimerSchema.find({}).skip(skip).limit(limit).lean();
    return data.map((tzimer: Document) => transformToTzimer(tzimer));
};

export const getSingleTzimer = async (id: number): Promise<Tzimer | null> => {
    const data = await TzimerSchema.findOne({ siteId: id }).lean();
    return data ? transformToTzimer(data) : null;
};

export const createTzimer = async (data: NewTzimer): Promise<number> => {
    if (!Array.isArray(data.unavailableDates)) return 400;

    const unavailableDates = data.unavailableDates.map(
        (dateRange: UnavailableDate) => ({
            from: new Date(dateRange.checkIn),
            to: new Date(dateRange.checkOut),
        }),
    );

    let siteId: number;
    const documents = await TzimerSchema.find()
        .sort({ _id: -1 })
        .limit(1)
        .lean();

    if (documents.length === 0) {
        siteId = 1;
    } else {
        const lastDocument = documents[0];
        siteId = lastDocument.siteId + 1;
    }

    const tzimer = new TzimerSchema({
        siteId,
        ...data,
        unavailableDates,
    });

    try {
        await tzimer.validate();
    } catch {
        return 400;
    }
    await tzimer.save();
    return 201;
};

export const searchTzimerim = async (query: string): Promise<Tzimer[]> => {
    const data = await TzimerSchema.find({
        $or: [{ name: { $regex: query, $options: 'i' } }],
    }).lean();

    return data.map((tzimer: Document) => transformToTzimer(tzimer));
};

export const deleteTzimer = async (name: string): Promise<Tzimer | null> => {
    return await TzimerSchema.findOneAndDelete({ name });
};

export const updateTzimer = async (
    name: string,
    updateData: Partial<Tzimer>,
): Promise<number> => {
    const updatedTzimer = await TzimerSchema.findOneAndUpdate(
        { name },
        { $set: updateData },
        { new: true, runValidators: true },
    ).lean();

    if (!updatedTzimer) {
        return 404;
    }

    return 204;
};
