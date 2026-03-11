'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [pinInput, setPinInput] = useState('');
    const [pinError, setPinError] = useState(false);
    const CORRECT_PIN = '123456';
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state for creating/updating
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        unit: '',
        category: '',
        description: '',
        image: '',
        alt: '',
        isAvailable: true
    });
    const [editId, setEditId] = useState(null);

    const fetchProducts = async () => {
        try {
            const { data } = await axios.get('http://localhost:5000/api/products?admin=true');
            setProducts(data);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch admin products', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/products/${editId}`, formData);
            } else {
                // Create
                await axios.post('http://localhost:5000/api/products', formData);
            }
            // Reset form and reload list
            setEditId(null);
            setFormData({ name: '', price: '', unit: '', category: '', description: '', image: '', alt: '', isAvailable: true });
            fetchProducts();
        } catch (error) {
            console.error('Error saving product', error);
        }
    };

    const handleEdit = (product) => {
        setEditId(product._id);
        setFormData({
            name: product.name,
            price: product.price,
            unit: product.unit,
            category: product.category,
            description: product.description,
            image: product.image,
            alt: product.alt,
            isAvailable: product.isAvailable
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                fetchProducts();
            } catch (error) {
                console.error("Error deleting product", error);
            }
        }
    };

    const toggleAvailability = async (id, currentStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, { isAvailable: !currentStatus });
            fetchProducts();
        } catch (error) {
            console.error("Error toggling status", error);
        }
    };

    const handlePinSubmit = (e) => {
        e.preventDefault();
        if (pinInput === CORRECT_PIN) {
            setIsAuthenticated(true);
            setPinError(false);
        } else {
            setPinError(true);
            setPinInput('');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center px-4">
                <div className="max-w-md w-full bg-white dark:bg-zinc-900 p-8 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full mb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50 mb-2">Admin Access</h2>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-8">Please enter the 6-digit access code.</p>

                    <form onSubmit={handlePinSubmit}>
                        <div className="mb-6">
                            <input
                                type="password"
                                maxLength="6"
                                value={pinInput}
                                onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                                className={`w-full text-center text-3xl tracking-[0.5em] font-mono p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950 border ${pinError ? 'border-red-500 ring-4 ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20'} outline-none transition-all dark:text-white`}
                                placeholder="••••••"
                                autoFocus
                            />
                            {pinError && <p className="text-red-500 text-sm mt-3 font-semibold">Incorrect code. Please try again.</p>}
                        </div>
                        <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl transition-colors shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/30">
                            Verify Access
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">Admin Dashboard</h1>

            {/* Create / Edit Form */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 mb-10">
                <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 mb-6">
                    {editId ? `Editing Product` : 'Add New Product'}
                </h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Name</label>
                        <input required type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Category</label>
                        <input required type="text" name="category" value={formData.category} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Price (e.g. ₹380)</label>
                        <input required type="text" name="price" value={formData.price} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Unit (e.g. per bag)</label>
                        <input required type="text" name="unit" value={formData.unit} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Description</label>
                        <textarea required name="description" value={formData.description} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" rows="3"></textarea>
                    </div>
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Image URL</label>
                        <input required type="text" name="image" value={formData.image} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Image Alt Text</label>
                        <input required type="text" name="alt" value={formData.alt} onChange={handleInputChange} className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700" />
                    </div>

                    <div className="flex items-center mt-6">
                        <input type="checkbox" name="isAvailable" checked={formData.isAvailable} onChange={handleInputChange} className="w-5 h-5 text-emerald-600 rounded bg-zinc-100 dark:bg-zinc-800" />
                        <label className="ml-2 text-sm font-bold dark:text-zinc-300">Product Available</label>
                    </div>

                    <div className="md:col-span-2 mt-4 flex gap-4">
                        <button type="submit" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition">
                            {editId ? 'Save Changes' : 'Add Product'}
                        </button>
                        {editId && (
                            <button type="button" onClick={() => { setEditId(null); setFormData({ name: '', price: '', unit: '', category: '', description: '', image: '', alt: '', isAvailable: true }) }} className="bg-zinc-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-zinc-600 transition">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* List */}
            {loading ? <p>Loading...</p> : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left bg-white dark:bg-zinc-900 rounded-lg overflow-hidden shadow-sm">
                        <thead className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                            <tr>
                                <th className="p-4">Name</th>
                                <th className="p-4">Category</th>
                                <th className="p-4">Price</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {products.map(p => (
                                <tr key={p._id} className="dark:text-zinc-300">
                                    <td className="p-4 font-bold">{p.name}</td>
                                    <td className="p-4">{p.category}</td>
                                    <td className="p-4">{p.price}</td>
                                    <td className="p-4">
                                        <button
                                            onClick={() => toggleAvailability(p._id, p.isAvailable)}
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${p.isAvailable ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}
                                        >
                                            {p.isAvailable ? 'Available' : 'Hidden'}
                                        </button>
                                    </td>
                                    <td className="p-4 flex gap-3">
                                        <button onClick={() => handleEdit(p)} className="text-emerald-600 hover:text-emerald-800 font-semibold">Edit</button>
                                        <button onClick={() => handleDelete(p._id)} className="text-red-500 hover:text-red-700 font-semibold">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
