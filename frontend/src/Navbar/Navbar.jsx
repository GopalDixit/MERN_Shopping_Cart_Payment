import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const handleNavigate = () => {
        navigate('/home');
    };
    const navigate = useNavigate();
  return (
    <nav className="w-full p-4">
      <div className="max-w-9xl mx-auto px-4">
        <div className=" ">
    
          <div className="flex">
            <button onClick={handleNavigate} className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</button>

          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
