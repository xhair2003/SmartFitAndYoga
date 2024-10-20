import React from 'react';
import { Link } from 'react-router-dom';
import MatrixParallax from 'react-matrix-parallax';
import './ErrorPage.css';

const ErrorPage = () => {
    return (
        <MatrixParallax>
            <div className="error-container">
                <div className="error-code">404</div>
                <div className="error-message">
                    Oops! The page you are looking for does not exist.
                </div>
            </div>
        </MatrixParallax>
    );
};

export default ErrorPage;
