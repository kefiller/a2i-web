import React from 'react';
import './error-indicator.css';

export default function ErrrorIndicator({error} = {}) {
    return (
        <div>Error: {error}</div>
    );
};
