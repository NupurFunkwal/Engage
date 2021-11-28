import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import { Add, Apps, FormatAlignRight } from "@material-ui/icons"
import React from 'react'
import { CreateCourse, JoinCourse} from "..";
import { useLocalContext } from "../../context/context";
import { useStyles } from './style'
import logo from '../../assets/logo.png'

const Header = ({children}) => {
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) =>{
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () =>{
        setAnchorEl(null);
    };

    const {setCreateCourseDialog, setJoinCourseDialog, loggedInUser, logout} = useLocalContext();

    const handleCreate = () => {
        handleClose()
        setCreateCourseDialog(true)
    }

    const handleJoin = () =>{
        handleClose()
        setJoinCourseDialog(true)
    }

    return (
        <div className={classes.root}>
            <AppBar className={classes.appBar} position="static">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.headerWrapper}>
                        {children}
                        <a href="https://photon-7dda4.web.app/">
                            <img className={classes.logo}
                                src={logo}
                                alt="Photon"
                            />
                        </a>
                        <Typography variant="h6" className={classes.title}>
                            Photon Space
                        </Typography>
                    </div>

                    <div className={classes.header__wrapper__right}>
                        <Add onClick = {handleClick} className={classes.icon}/>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose = {handleClose}
                        >  
                            <MenuItem onClick={handleJoin}>Join Course</MenuItem>
                            <MenuItem onClick={handleCreate}>Create Course</MenuItem>
                        </Menu>
                        <div>
                            <Avatar onClick={() => logout()} src={loggedInUser?.photoURL} className={classes.icon}/>
                        </div>   
                    </div>
                </Toolbar>
            </AppBar>
            <CreateCourse />

            <JoinCourse>

            </JoinCourse>
        </div>
    );
};

export default Header;
