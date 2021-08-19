import React from 'react';
import {connect} from "react-redux";
import {fade, makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import clsx from 'clsx';
import {Link} from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MailIcon from '@material-ui/icons/Mail';
import UserApi from "../userManagers/UserApi";
import {SwipeableDrawer} from "@material-ui/core";
import PaymentIcon from '@material-ui/icons/Payment';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'center',
    },
    hide: {
        display: 'none',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "16px"
        },
        justifyContent: "center"
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: drawerWidth,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const Header = (props) => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);


    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const renderMenuItems = () => {
        if (props.auth === null) {
            return null;
        } else if (props.auth === false) {
            return <div>
                <MenuItem onClick={handleMenuClose}><Link className={classes.link} to={"/sign-in"}>Zaloguj
                    się</Link></MenuItem>
                <MenuItem onClick={handleMenuClose}><Link className={classes.link}
                                                          to={"/sign-up"}>Zarejestruj</Link></MenuItem>
            </div>
        } else {
            return <div>
                <MenuItem onClick={handleMenuClose}><a className={classes.link} href={"/profile"}>Mój
                    profil</a></MenuItem>
                <MenuItem onClick={handleMenuClose}><a className={classes.link}
                                                       href={"/api/logout"}>Wyloguj</a></MenuItem>
            </div>
        }
    }

    const menuId = 'menu-appbar';
    const renderMenu = (
        <Menu
            id={menuId}
            anchorEl={anchorEl}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            transformOrigin={{vertical: "top", horizontal: "center"}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {renderMenuItems()}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}>
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link className={classes.link} to={'/'}>Potrzebny lekarz</Link>
                    </Typography>
                    <div className={classes.grow}/>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {!props.auth
                            ? <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleProfileMenuOpen}
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton> : null}
                    </div>
                    {props.auth
                        ? <IconButton
                            edge="end"
                            onClick={handleDrawerOpen}
                            className={clsx(open && classes.hide)}
                            color="inherit"
                            aria-label="open drawer"
                        >
                            <MenuIcon />
                        </IconButton> : null}
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                className={classes.drawer}
                anchor="right"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    {props.auth && props.auth.firstName
                        ? <Typography className={classes.title} variant="h6" noWrap>
                            Witaj {props.auth.firstName}!
                        </Typography> : null}
                </div>
                <Divider/>
                <div onClick={toggleDrawer(false)}
                     onKeyDown={toggleDrawer(false)} role="presentation">
                    <List>
                        <Link to={'/profile'} className={classes.link}>
                            <ListItem button key={"my-profile"}>
                                <ListItemIcon> <AccountCircle/> </ListItemIcon>
                                <ListItemText primary={"Mój profil"}/>
                            </ListItem>
                        </Link>
                        <Link to={'/payments'} className={classes.link}>
                            <ListItem button key={"payments"}>
                                <ListItemIcon><PaymentIcon /></ListItemIcon>
                                <ListItemText primary={"Płatności"}/>
                            </ListItem>
                        </Link>
                        {['Wizyty', 'Opinie'].map((text, index) => (
                            <ListItem button key={text}>
                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <List>
                        <ListItem onClick={UserApi.logout} button key={'logout'}>
                            <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                            <ListItemText primary={'Wyloguj'}/>
                        </ListItem>
                    </List>
                </div>
            </SwipeableDrawer>
            {renderMobileMenu}
            {renderMenu}
        </div>
    );
}

function mapStateToProps({auth}) {
    return {auth: auth};
}

export default connect(mapStateToProps)(Header)
