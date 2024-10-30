
'use client'
import React from 'react';
import { Box, FormControl, Grid, Typography, Link, Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import "./login.css"
import { IoSettingsSharp } from "react-icons/io5";
import { FaCircle } from "react-icons/fa";
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter()

    return (
        <Box className="login" >
            <Button className='setting'>
                <svg
                    className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium rtl-10dohqv icon"
                    focusable="false"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    style={{ transform: "rotate(77.49deg)" }}
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M14.279 2.152C13.909 2 13.439 2 12.5 2s-1.408 0-1.779.152a2.008 2.008 0 0 0-1.09 1.083c-.094.223-.13.484-.145.863a1.615 1.615 0 0 1-.796 1.353a1.64 1.64 0 0 1-1.579.008c-.338-.178-.583-.276-.825-.308a2.026 2.026 0 0 0-1.49.396c-.318.242-.553.646-1.022 1.453c-.47.807-.704 1.21-.757 1.605c-.07.526.074 1.058.4 1.479c.148.192.357.353.68.555c.477.297.783.803.783 1.361c0 .558-.306 1.064-.782 1.36c-.324.203-.533.364-.682.556a1.99 1.99 0 0 0-.399 1.479c.053.394.287.798.757 1.605c.47.807.704 1.21 1.022 1.453c.424.323.96.465 1.49.396c.242-.032.487-.13.825-.308a1.64 1.64 0 0 1 1.58.008c.486.28.774.795.795 1.353c.015.38.051.64.145.863c.204.49.596.88 1.09 1.083c.37.152.84.152 1.779.152s1.409 0 1.779-.152a2.008 2.008 0 0 0 1.09-1.083c.094-.223.13-.483.145-.863c.02-.558.309-1.074.796-1.353a1.64 1.64 0 0 1 1.579-.008c.338.178.583.276.825.308c.53.07 1.066-.073 1.49-.396c.318-.242.553-.646 1.022-1.453c.47-.807.704-1.21.757-1.605a1.99 1.99 0 0 0-.4-1.479c-.148-.192-.357-.353-.68-.555c-.477-.297-.783-.803-.783-1.361c0-.558.306-1.064.782-1.36c.324-.203.533-.364.682-.556a1.99 1.99 0 0 0 .399-1.479c-.053-.394-.287-.798-.757-1.605c-.47-.807-.704-1.21-1.022-1.453a2.026 2.026 0 0 0-1.49-.396c-.242.032-.487.13-.825.308a1.64 1.64 0 0 1-1.58-.008a1.615 1.615 0 0 1-.795-1.353c-.015-.38-.051-.64-.145-.863a2.007 2.007 0 0 0-1.09-1.083"
                        clipRule="evenodd"
                        opacity="0.5"
                    />
                    <path
                        fill="currentColor"
                        d="M15.523 12c0 1.657-1.354 3-3.023 3c-1.67 0-3.023-1.343-3.023-3S10.83 9 12.5 9c1.67 0 3.023 1.343 3.023 3"
                    />
                </svg>
                <FaCircle className='circle' />
            </Button>
            <Grid container className='container'>
                <Grid item xs={12} lg={8} >
                    <Grid container className='inside-container'>
                        <Grid item xs={10} lg={5.5} className='left'>
                            <Typography variant="h4" gutterBottom>
                                Account Login

                            </Typography>
                            <p className='p-1'>
                                <Link to="/signup">Do you have an account ? </Link>
                                {' '}
                                <Link to="/start">start</Link>
                            </p>

                            <form >
                                <Box className="row">
                                    <label htmlFor="">
                                        Email                                    </label>
                                    <input
                                        required
                                        id="email"
                                        type='email'
                                    />
                                </Box>
                                <p><Link>Forgot your password ? </Link></p>
                                <Box className="row">
                                    <label htmlFor="">password</label>
                                    <input
                                        required
                                        id="email"
                                        placeholder='characters +6'
                                        type='password'
                                    />
                                </Box>
                                <Button type='submit' onClick={() => {

                                    router.push("/dashboard")
                                }} className='btn'>Login</Button>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item lg={3.7} className='right' sx={{ display: { xs: "none", lg: "flex" }, padding: "20px" }}>
                    <h1>
                        Vision Integration
                    </h1>
                    <p >
                        Provides the optimal solution for workflow with the highest levels of technology and analysis


                    </p>
                    <Image
                        src="/assets/images/image.webp"  // Path to the image (in the "public" folder)
                        alt="My beautiful image"
                        width={400}                 // Desired width
                        height={300}                  // Desired height
                        priority                       // This enables preloading if needed
                    />
                </Grid>

            </Grid>
        </Box>
    );
}
