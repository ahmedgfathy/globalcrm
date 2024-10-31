import React from 'react'
import "./page.css"
import { IoClose } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { MdOutlineFullscreen } from "react-icons/md";

export default function page() {
    return (
        <Box className="setting">


            <Grid container>
                <Grid item xs={10} lg={4} className="item">

                    <Box>
                        <p><IoClose /> <MdRefresh /><MdOutlineFullscreen /></p>
                        <p>Settings</p>
                    </Box>


                    <Box>
                        <FormGroup>

                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <Typography>Off</Typography>
                                <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                <Typography>On</Typography>
                            </Stack>
                        </FormGroup>
                    </Box>


                </Grid>
            </Grid>

        </Box>
    )
}
