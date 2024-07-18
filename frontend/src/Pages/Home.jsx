import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AddProduct from '../Components/AddProduct';

function Home() {
    const location = useLocation();
    const navigate = useNavigate();
    const [showAddProduct, setShowAddProduct] = useState(false);

    const { username } = location.state || {};

    useEffect(() => {
        if (!username) {
            navigate('/login');
        }
    }, [username, navigate]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        navigate('/login');
    };
    const handleNavigate = () => {
        navigate('/ProductCard');
    };

    const handleAddProduct = () => {
        setShowAddProduct(true);
    };

    const handleCloseAddProduct = () => {
        setShowAddProduct(false);
    };

    return (
        <div>
            <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mb-4 focus:outline-none"
                style={{ marginLeft: 1200 }}
            >
                Logout
            </button>
            <div className="flex flex-col items-center justify-center h-screen"style={{marginTop:-45}}>
                <h2 className="text-2xl mb-4">Home</h2>
                <p className="mb-6">Welcome, {username}!</p>
                <button
                    onClick={handleNavigate}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg mb-4 focus:outline-none"
                >
                    Shop Items
                </button>
                <button
                    onClick={handleAddProduct}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none"
                >
                    Add Product
                </button>
                {showAddProduct && <AddProduct onClose={handleCloseAddProduct} />}
            </div>
        </div>
    );
}

export default Home;
