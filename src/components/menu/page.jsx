'use client'
import { Box } from '@mui/material';
import React, { useState } from 'react';
import './page.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Header from '../header/page';

export default function Page() {
    const [width, setWidth] = useState(280);
    const isExpanded = width > 100;

    // Toggle menu width
    const toggleWidth = () => {
        setWidth(isExpanded ? 80 : 280); // Collapsed width is 80, expanded is 280
    };

    return (
        <Box className="container">
            <Box className="menu" sx={{ width: width, transition: 'width 0.3s ease' }}>
                <img src="/assets/images/logo.webp" alt="Logo" />
                {isExpanded ? (
                    <FaAngleLeft className="angle" onClick={toggleWidth} />
                ) : (
                    <FaAngleRight className="angle" onClick={toggleWidth} />
                )}
            </Box>
            <Header menuWidth={width} />
        </Box>
    );
}
