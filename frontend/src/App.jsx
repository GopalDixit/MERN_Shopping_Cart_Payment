import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Login from './Pages/login';
import Register from './Pages/Register';
import Home from './Pages/Home';
import PrivateRoute from './PrivateRoute';
import ProductCard from './Components/ProductCard';
import Navbar from './Navbar/Navbar'

const App = () => {
    return (
        <Router>
            {/* <Navbar/> */}
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />

                <Route element={<PrivateRoute />}>
                    <Route path='/home' element={<Home />} />
                    <Route path='/productcard' element={<ProductCard />} />
                </Route>
                <Route path='/' element={<Navigate to="/login" />} />
            </Routes>
        </Router>
    );
}

export default App;
