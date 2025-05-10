import mongoose from 'mongoose';

const tzimerCollection = process.env.TZIMERIM_COLLECTION_NAME;

if (!tzimerCollection)
    throw new Error('Missing TZIMERIM_COLLECTION_NAME env var');

const schema = new mongoose.Schema(
    {
        siteId: { type: Number, required: true },
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        unavailableDates: [
            new mongoose.Schema(
                {
                    checkIn: { type: Date, required: true },
                    checkOut: { type: Date, required: true },
                },
                { _id: false },
            ),
        ],
    },
    { collection: process.env.TZIMERIM_COLLECTION_NAME, strict: true },
);

const TzimerSchema =
    mongoose.models[tzimerCollection] ||
    mongoose.model(tzimerCollection, schema);

export default TzimerSchema;
