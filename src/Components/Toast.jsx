import React from 'react';


const Toast = ({ message, type, onClose }) => {
    const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';

    return (
        <div
            className={`fixed top-5 right-5 w-80 p-4 rounded-lg shadow-lg ${bgColor} text-white transition-transform transform duration-300 ease-in-out`}
            style={{
                opacity: 0.9,
                transition: 'opacity 0.5s ease-in-out, transform 0.3s ease-in-out',
                animation: 'slide-in 0.3s forwards'
            }}
        >
            <div className="flex justify-between items-center">
                <span>{message}</span>
                <button onClick={onClose} className="text-white hover:text-gray-200">
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Toast;

