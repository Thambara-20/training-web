import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Deardiary from '../DearDiary/DearDiary';
import Profile from '../Profile/Profile';


function ResponsiveAppBar() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


    return (
        <AppBar position="static" style={{backgroundColor:'transparent', boxShadow:'none'}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {<Deardiary />}

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton >
                                <Profile/>
                            </IconButton>
                        </Tooltip>
                    
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
