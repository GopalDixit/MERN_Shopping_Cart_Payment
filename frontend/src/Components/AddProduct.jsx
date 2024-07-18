import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = ({ onClose }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleAddProduct = async () => {
        const productData = {
            name,
            description,
            image: imageUrl,
            price,
        };

        try {
            const response = await axios.post(`$(window.location.origin)/api/addproduct/add`, productData);
            console.log(response.data);
            onClose();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl mb-4">Add Product</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="imageUrl">Image URL</label>
                    <input
                        type="text"
                        id="imageUrl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
                    <input
                        type="number"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg mr-2 focus:outline-none"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleAddProduct}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                    >
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProduct;
