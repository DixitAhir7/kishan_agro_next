'use client';

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import axiosInstance from '@/axiosInstance';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';

export default function AdminPanel() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Form state for creating/updating
    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitSuccessful,
            isSubmitted,
            isSubmitting
        }
    } = useForm({
        defaultValues: {
            name: '',
            price: '',
            unit: '',
            category: '',
            description: '',
            isAvailable: true
        }
    });
    const productRef = useRef(null)

    // add product
    const onSubmit = async (data) => {
        try {
            if (editId) {
                const res = await axiosInstance.put(`/products/${editId}`, data);

                if (res.status === 200) {
                    toast("Product updated");
                }
            } else {
                const res = await axiosInstance.post("/products", data);

                if (res.status === 201) {
                    toast("Product added");
                }
            }
            setEditId(null);
            fetchProducts();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

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

    const handleEdit = (product) => {
        setEditId(product._id);
        reset({
            name: product.name,
            price: product.price,
            unit: product.unit,
            category: product.category,
            description: product.description,
            image: product.image,
            alt: product.alt,
            isAvailable: product.isAvailable
        });

        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (id) => {

        if (!confirm("Delete this product?")) return;

        try {
            const res = await axiosInstance.delete(`/products/${id}`);

            if (res.status === 200) {
                toast("Product deleted");
                fetchProducts();
            }

        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
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


    async function authenticate(data) {
        console.log(data)
        const isVerified = await axiosInstance.post("/verify", data.pin)
        if (isVerified.status === 200) {
            setIsAuthenticated(true)
        }
    }

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

                    <form onSubmit={handleSubmit(authenticate)}>
                        <div className="mb-5">
                            <input
                                type='password'
                                maxLength="6"
                                {...register("pin", {
                                    required: "pin is required"
                                })}
                                className={`w-full text-center text-2xl tracking-[0.5em] font-mono p-2 rounded-xl bg-zinc-50 dark:bg-zinc-950 border ${errors.pin ? 'border-red-500 ring-4 ring-red-500/20' : 'border-zinc-200 dark:border-zinc-800'} outline-none transition-all dark:text-white`}
                                placeholder="••••••"
                                autoFocus
                            />
                            {errors && <p className="text-red-500 text-sm mt-3 font-semibold">Incorrect code. try again.</p>}
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-purple-900 hover:bg-purple-600 text-white font-bold py-2.5 px-4 rounded-xl transition-colors shadow-sm focus:outline-none">
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
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Name</label>
                        <input
                            {...register("name", { required: true })}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Category</label>
                        <input
                            {...register("category", { required: true })}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Price</label>
                        <input
                            {...register("price", { required: true })}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Unit</label>
                        <input
                            {...register("unit", { required: true })}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Description</label>
                        <textarea
                            {...register("description", { required: true })}
                            rows="3"
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Image URL</label>
                        <input
                            {...register("image", { required: true })}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-zinc-300">Image Alt</label>
                        <input
                            {...register("alt", { required: true })}
                            className="w-full p-2 border rounded dark:bg-zinc-800 dark:border-zinc-700"
                        />
                    </div>

                    <div className="flex items-center mt-6">
                        <input
                            type="checkbox"
                            {...register("isAvailable")}
                            className="w-5 h-5 text-emerald-600 rounded bg-zinc-100 dark:bg-zinc-800"
                        />
                        <label className="ml-2 text-sm font-bold dark:text-zinc-300">
                            Product Available
                        </label>
                    </div>

                    <div className="md:col-span-2 mt-4 flex gap-4">
                        <button
                            type="submit"
                            className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-emerald-700 transition"
                        >
                            {editId ? "Save Changes" : "Add Product"}
                        </button>

                        {editId && (
                            <button
                                type="button"
                                onClick={() => {
                                    reset();
                                    setEditId(null);
                                }}
                                className="bg-zinc-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-zinc-600 transition"
                            >
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
            <ToastContainer
                autoClose={2000}
                closeButton={true}
            />
        </div>
    );
}
