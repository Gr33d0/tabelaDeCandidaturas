import mongoose from 'mongoose';

const BusinessSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        unique: true 
    },
    city: {
        type: String
    }

});

// O nome do modelo 'Business' será usado para referenciar em outros modelos.
export const BusinessModel = mongoose.model('Business', BusinessSchema);