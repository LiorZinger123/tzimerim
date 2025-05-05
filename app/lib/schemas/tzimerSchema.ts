import mongoose from 'mongoose';

const tzimerSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    pricePerWeekdayNight: { type: Number, required: true },
    pricePerWeekendNight: { type: Number, required: true },
});

const Tzimer = mongoose.models.Tzimer || mongoose.model('Tzimer', tzimerSchema);

export default Tzimer;
