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
    const isExpanded = width > 110;
    const [activeIndex, setActiveIndex] = useState(null);

    // Toggle menu width
    const toggleWidth = () => {
        setWidth(isExpanded ? 110 : 280);
    };

    const toggleNested = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const data = [
        { link: "Users References", path: "/user-refrences", icon: <FaRegCircleUser />, nested: [{ link: "Users References", path: "#", icon: <FaRegCircleUser /> }] },
        { link: "Calendar", path: "/calendar", icon: <SlCalender />, nested: [{ link: "Calendar Events", path: "#", icon: <SlCalender /> }] },
        { link: "Notes", path: "/notes", icon: <MdEditNote />, nested: [{ link: "User Notes", path: "#", icon: <MdEditNote /> }] },
        { link: "Calls", path: "/calls", icon: <LuPhoneCall />, nested: [{ link: "User Calls", path: "#", icon: <LuPhoneCall /> }] },
        { link: "Leads", path: "/leads", icon: <MdLeaderboard />, nested: [{ link: "User Leads", path: "#", icon: <MdLeaderboard /> }] },
        { link: "Properties", path: "/properties", icon: <VscSymbolProperty />, nested: [{ link: "User Properties", path: "#", icon: <VscSymbolProperty /> }] },
        { link: "Reports", path: "/reports", icon: <TbReportSearch />, nested: [{ link: "User Reports", path: "#", icon: <TbReportSearch /> }] },
    ];

    return (
        <Box className="container">
            <Box
                className="menu"
                sx={{
                    width: width,
                    transition: 'width 0.3s ease',
                    padding: isExpanded ? "20px" : "20px 5px",
                    left: { xs: isExpanded ? "0px" : "-100%", lg: "0px" },
                    position: "fixed",
                    top: "0",
                    height: "100vh",
                    zIndex: 1000,
                    background: "white"
                }}
            >
                <img src="/assets/images/logo.webp" alt="Logo" />
                {isExpanded ? (
                    <FaAngleLeft className="angle" onClick={toggleWidth} />
                ) : (
                    <FaAngleRight className="angle" onClick={toggleWidth} />
                )}

                <Box className="btns" sx={{ gap: "5px" }}>
                    {data.map((item, index) => (
                        <Box key={index} sx={{ width: "100%", position: "relative" }}>
                            <Button
                                sx={{
                                    display: "flex",
                                    gap: "10px",
                                    padding: "10px",
                                    width: "100%",
                                    backgroundColor: `${activeIndex === index ? "rgb(95 148 46 / 8%)" : undefined}`
                                }}
                                onClick={isExpanded ? () => toggleNested(index) : undefined}
                                onMouseOver={!isExpanded ? () => toggleNested(index) : undefined}
                            >
                                <p style={{ display: "flex", flexGrow: "1", alignItems: "center", gap: isExpanded ? "10px" : "5px", flexDirection: isExpanded ? "row" : "column" }}>
                                    <span style={{ color: `${activeIndex === index ? "#5f942e" : "#637381"}`, fontSize: isExpanded ? "20px" : "15px" }}>{item.icon}</span>
                                    <span style={{
                                        color: `${activeIndex === index ? "#5f942e" : "#637381"}`,
                                        fontWeight: isExpanded ? "lighter" : "600",
                                        fontSize: isExpanded ? "16px" : "11px",
                                        textAlign: isExpanded ? "justify" : "center",
                                        textTransform: "capitalize",
                                        flexGrow: "1"
                                    }}>{item.link}</span>
                                </p>
                                <FaAngleRight
                                    style={{
                                        color: `${activeIndex === index ? "#5f942e" : "#637381"}`,
                                        transform: `rotate(${activeIndex === index ? "90deg" : "0deg"})`,
                                        transition: "0.5s"
                                    }}
                                />
                            </Button>

                            {activeIndex === index && (
                                <Box className="nested" sx={{
                                    width: isExpanded ? "130px" : "auto",
                                    background: isExpanded ? "transparent" : `url(/assets/images/blue.png), url(/assets/images/red.png), white`,
                                    zIndex: "1000",
                                    position: isExpanded ? "relative" : "absolute",
                                    height: isExpanded ? "100%" : "auto",
                                    borderRadius: "10px",
                                    top: "0px",
                                    left: "0px",
                                    transition: "0.5s",
                                    margin: isExpanded ? "5px 5px 10px 5px" : "0px"
                                }}>
                                    {item.nested.map((itm, idx) => (
                                        <Button
                                            sx={{
                                                backgroundColor: "transparent",
                                                "&:hover": { backgroundColor: "#f2f2f2" },
                                                display: "flex",
                                                gap: "10px",
                                                padding: "10px",
                                                minWidth: "200px"
                                            }}
                                            key={idx}
                                        >
                                            <span style={{ color: "#637381", fontSize: "20px" }}>{itm.icon}</span>
                                            <span style={{ color: "#637381", textAlign: "justify", textTransform: "capitalize", flexGrow: "1" }}>{itm.link}</span>
                                        </Button>
                                    ))}
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            </Box>
            <Header menuWidth={width} />
        </Box>
    );
}
