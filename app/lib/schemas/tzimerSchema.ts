import mongoose from 'mongoose';

const tzimerCollection = process.env.TZIMERIM_COLLECTION_NAME;

if (!tzimerCollection)
    throw new Error('Missing TZIMERIM_COLLECTION_NAME env var');

const schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        pricePerWeekdayNight: { type: Number, required: true },
        pricePerWeekendNight: { type: Number, required: true },
    },
    { collection: process.env.TZIMERIM_COLLECTION_NAME },
);

const TzimerSchema =
    mongoose.models[tzimerCollection] ||
    mongoose.model(tzimerCollection, schema);

export default TzimerSchema;
