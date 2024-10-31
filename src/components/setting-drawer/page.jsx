import React from 'react';
import "./page.css";
import { IoClose } from "react-icons/io5";
import { MdRefresh, MdOutlineFullscreen, MdOutlineLanguage } from "react-icons/md";
import { styled } from '@mui/material/styles';
import { Box, Grid, FormGroup, Switch } from '@mui/material';

export default function Page(props) {
    const AntSwitch = styled(Switch)(({ theme }) => ({
        width: 28,
        height: 16,
        padding: 0,
        display: 'flex',
        '&:active': {
            '& .MuiSwitch-thumb': {
                width: 15,
            },
            '& .MuiSwitch-switchBase.Mui-checked': {
                transform: 'translateX(9px)',
            },
        },
        '& .MuiSwitch-switchBase': {
            padding: 2,
            '&.Mui-checked': {
                transform: 'translateX(12px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
            width: 12,
            height: 12,
            borderRadius: 6,
            transition: theme.transitions.create(['width'], { duration: 200 }),
        },
        '& .MuiSwitch-track': {
            borderRadius: 8,
            opacity: 1,
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
        },
    }));

    return (
        <Box className="setting">
            <Grid container>
                <Grid item xs={10} md={2.8} className="item" sx={{
                    background: `url(/assets/images/blue.png), url(/assets/images/red.png), white`,
                    left: props.close ? "-100%" : "0px"
                }}>
                    <Box className="top">
                        <p>
                            <IoClose onClick={() => props.setClose(true)} />
                            <MdRefresh />
                            <MdOutlineFullscreen />
                        </p>
                        <p>Settings</p>
                    </Box>

                    <Box className="mode">
                        <FormGroup className="form">
                            <Box className="row">
                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.32" d="M16.9462 11.0863..." fill="#666" />
                                    <path d="M19.2407 2.28853..." fill="#1c251E" />
                                </svg>
                            </Box>
                            <p>Mode</p>
                        </FormGroup>
                    </Box>

                    <Box className="lang">
                        <FormGroup className="form">
                            <Box className="row">
                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                <MdOutlineLanguage />
                            </Box>
                            <p>Language</p>
                        </FormGroup>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}
