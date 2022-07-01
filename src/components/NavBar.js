import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Typography from '@mui/material/Typography';

import Auth from "../security/Auth";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from "@mui/icons-material/Store";
import Link2 from "@mui/material/Link";
import {Link} from "react-router-dom";
const NavBar =() =>{

    const sections = [
        { title: 'Technology', url: '#' },
        { title: 'Design', url: '#' },
        { title: 'Culture', url: '#' },
        { title: 'Business', url: '#' },
        { title: 'Politics', url: '#' },
        { title: 'Opinion', url: '#' },
        { title: 'Science', url: '#' },
        { title: 'Health', url: '#' },
        { title: 'Style', url: '#' },
        { title: 'Travel', url: '#' },
    ];

    return(
        <React.Fragment>
            <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Button size="small">Subscribe</Button>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="center"
                    noWrap
                    sx={{ flex: 1 }}
                >
                    Ebook
                </Typography>
                {
                    Auth.getCurrentUser() === null ? (
                        <>
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                            <Button variant="outlined" size="small">
                                Sign up
                            </Button>
                        </>
                    ) :(
                        <Link to="/checkout-cart" style={{ textDecoration: "none",display:'flex',color:'blue' }}>
                                <ShoppingCartIcon className="icon" />
                                <span>Your cart</span>
                        </Link>
                    )
                }
            </Toolbar>
            <Toolbar
                component="nav"
                variant="dense"
                sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
            >
                {sections.map((section) => (
                    <Link2
                        color="inherit"
                        noWrap
                        key={section.title}
                        variant="body2"
                        href={section.url}
                        sx={{ p: 1, flexShrink: 0 }}
                    >
                        {section.title}
                    </Link2>
                ))}
            </Toolbar>
        </React.Fragment>
    )
}
export default NavBar
