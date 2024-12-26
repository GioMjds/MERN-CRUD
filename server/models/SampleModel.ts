import mongoose from 'mongoose';

const sampleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

export const SampleModel = mongoose.model('Sample', sampleSchema);