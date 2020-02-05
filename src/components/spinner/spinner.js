import React from 'react';

import './spinner.css';

export default function Spinner() {
    return (
        <div className="spinner-border text-dark" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );
}