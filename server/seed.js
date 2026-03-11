import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import Product from './models/productModel.js';

dotenv.config();
connectDB();

const importData = async () => {
    try {
        const products = [
            {
                name: "UltraTech Cement",
                price: "₹380",
                unit: "per bag",
                category: "Cement",
                description: "Premium quality ordinary portland cement for durable and heavy-duty structural construction work.",
                image: "https://images.unsplash.com/photo-1541888086225-ee8240590824?q=80&w=800&auto=format&fit=crop",
                alt: "Cement construction site"
            },
            {
                name: "Dr. Fixit URPM",
                price: "₹450",
                unit: "per liter",
                category: "Waterproofing",
                description: "Advanced waterproofing solutions to protect buildings from dampness, leakage, and moisture.",
                image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
                alt: "Waterproofing materials"
            },
            {
                name: "Ambuja Cement Plus",
                price: "₹360",
                unit: "per bag",
                category: "Cement",
                description: "High-grade cement offering superior compressive strength and workability for modern architecture.",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
                alt: "Construction cement blocks"
            },
            {
                name: "Tata Tiscon 550SD",
                price: "₹65",
                unit: "per kg",
                category: "Steel & Iron",
                description: "High-strength TMT steel bars ensuring earthquake resistance and robust foundational flexibility.",
                image: "https://images.unsplash.com/photo-1534065609653-b0eb703baabb?q=80&w=800&auto=format&fit=crop",
                alt: "Steel structures"
            },
            {
                name: "Premium Red Bricks",
                price: "₹12",
                unit: "per pc",
                category: "Blocks & Bricks",
                description: "High-density, uniformly baked clay red bricks providing excellent masonry strength.",
                image: "https://images.unsplash.com/photo-1588600746973-19dfded11394?q=80&w=800&auto=format&fit=crop",
                alt: "Stack of red bricks"
            },
            {
                name: "River Sand Quality Grade A",
                price: "₹5000",
                unit: "per ton",
                category: "Raw Materials",
                description: "Clean, sifted river sand essential for producing high-grade mortar and flawless plaster finishes.",
                image: "https://images.unsplash.com/photo-1621619212002-c93f0b2daed3?q=80&w=800&auto=format&fit=crop",
                alt: "Gravel and sand"
            },
            {
                name: "Asian Paints Royale",
                price: "₹3200",
                unit: "per 20L",
                category: "Paints",
                description: "Washable luxury emulsion that provides a smooth finish and prevents fungal growth.",
                image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
                alt: "Paints"
            },
            {
                name: "ACC Gold Water Shield",
                price: "₹410",
                unit: "per bag",
                category: "Cement",
                description: "Specialized water-repellent cement that shields homes from continuous moisture damage.",
                image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
                alt: "ACC Cement"
            }
        ];

        await Product.insertMany(products);
        console.log('Data Successfully Imported!');
        process.exit();
    } catch (error) {
        console.error(`Error importing data: ${error.message}`);
        process.exit(1);
    }
};

importData();
