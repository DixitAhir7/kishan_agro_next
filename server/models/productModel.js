import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a product name'],
        trim: true,
    },
    price: {
        type: String,
        required: [true, 'Please add a product price'],
    },
    unit: {
        type: String,
        required: [true, 'Please add a unit of measurement'],
    },
    category: {
        type: String,
        required: [true, 'Please select a category for this product'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    image: {
        type: String,
        required: [true, 'Please add an image URL'],
    },
    alt: {
        type: String,
        required: [true, 'Please add alt text for the image'],
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatic fields
});

const Product = mongoose.model('Product', productSchema);

export default Product;
