import React from 'react';

import './error-indicator.css';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <span className="boom">Упс!</span>
            <span>
                Пожалуйста, проверьте соединение с интернетом!
            </span>
        </div>
    );
};

export default ErrorIndicator;
