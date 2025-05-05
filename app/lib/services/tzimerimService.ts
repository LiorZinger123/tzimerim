import { Db, Document, WithId } from 'mongodb';
import { Tzimer } from '../../utils/interfaces';

const tzimerCollection = process.env.TZIMERIM_COLLECTION_NAME || '';

export const getAllTzimerim = async (db: Db): Promise<Tzimer[]> => {
    const data = await db.collection(tzimerCollection).find({}).toArray();

    return data.map((tzimer: Document) => {
        const { _id, ...rest } = tzimer;
        return { ...rest } as Tzimer;
    });
};

export const getSingleTzimer = async (
    db: Db,
    id: number,
): Promise<Tzimer | null> => {
    const data = await db.collection(tzimerCollection).findOne({ id });

    if (!data) {
        return null;
    }

    const { _id, ...rest } = data as WithId<Document>;
    return rest as Tzimer;
};
