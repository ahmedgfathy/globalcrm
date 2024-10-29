'use client'
import { Box, Button } from '@mui/material';
import React, { useState } from 'react';
import './page.css';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import Header from '../header/page';
import { FaRegCircleUser } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";
import { MdEditNote } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { MdLeaderboard } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { VscSymbolProperty } from "react-icons/vsc";

export default function Page() {
    const [width, setWidth] = useState(280);
    const isExpanded = width > 100;

    // Toggle menu width
    const toggleWidth = () => {
        setWidth(isExpanded ? 80 : 280); // Collapsed width is 80, expanded is 280
    };
    const data = [

        {
            link: "Users References",
            path: "/user-refrences",
            icon: <FaRegCircleUser />


        },
        {
            link: "Calendar",
            path: "/calendar",
            icon: <SlCalender />

        },
        {
            link: "Notes",
            path: "/notes",
            icon: <MdEditNote />

        },
        {
            link: "Calls",
            path: "/calls",
            icon: <LuPhoneCall />


        },

        {
            link: "Leads",
            path: "/leads",
            icon: <MdLeaderboard />

        },
        {
            link: "Properties",
            path: "/properties",
            icon:<VscSymbolProperty/>
           
        },
        {
            link: "Reports",
            path: "/reports",
            icon: <TbReportSearch />

        },




    ]
    return (
        <Box className="container">
            <Box className="menu" sx={{ width: width, transition: 'width 0.3s ease' }}>
                <img src="/assets/images/logo.webp" alt="Logo" />
                {isExpanded ? (
                    <FaAngleLeft className="angle" onClick={toggleWidth} />
                ) : (
                    <FaAngleRight className="angle" onClick={toggleWidth} />
                )}

                <Box className="btns" sx={{gap:"5px"}}>
                    {
                        data.map((item , index)=>{
                            return(
                                <Button sx={{display:"flex",gap:"10px", padding:"10px"}} key={index}>
                                    <span style={{color: "#637381" , fontSize:"20px"}}>{item.icon}</span>
                                    <span style={{ color: "#637381" , textAlign:"justify" , textTransform:"capitalize" , flexGrow:"1"}} >{item.link}</span>
                                </Button>
                            )
                        })
                    }
                </Box>
            </Box>
            <Header menuWidth={width} />
        </Box>
    );
}
