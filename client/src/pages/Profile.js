import React, {Fragment} from "react";
import {connect} from "react-redux";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import {CssBaseline, Divider, Paper, Tooltip} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import EditIcon from '@material-ui/icons/Edit';
import IconButton from "@material-ui/core/IconButton";
import UpdateInfoDialog from "../components/UpdateInfoDialog";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(6)
    },
    typography: {
        margin: theme.spacing(1)
    },
    divider : {
        marginBottom: theme.spacing(2),
        width: "100%"
    },
    avatar: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        display: "flex",
        alignItems: "center"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(9),
        height: theme.spacing(9),
    },
    editInfo :{
        display: "flex"
    }
}));

const Profile = (props) => {
    const classes = useStyles();

    if (!props.auth) {
        return null;
    }

    const profileInfo = props.auth.profileInfo;

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography  component="h1" variant="h3">
                    Mój profil
                </Typography>
            </div>
            <Divider />
            <Paper className={classes.paper} elevation={3}>
                <div className={classes.avatar}>
                    {props.auth.image ? <Avatar alt="avatar" src={props.auth.image} className={classes.large}/> : <Avatar>OP</Avatar>}
                    <Typography className={classes.typography} variant="h4" component="h2">
                        {props.auth.firstName + " " + props.auth.lastName + " (" + props.auth.email + ")"}
                    </Typography>
                </div>
                <div className={classes.editInfo}>
                    <Typography className={classes.typography} style={{fontWeight: "bold"}} variant="h5" component="h2">
                        Informacje ogólne:
                    </Typography>
                    <UpdateInfoDialog />
                </div>
                {profileInfo && profileInfo.PWZNumber
                    ? <Fragment>
                        <Typography className={classes.typography} variant="h6" component="h2">
                        Numer PWZ: {profileInfo.PWZNumber}
                        </Typography>
                        <Typography className={classes.typography} variant="h6" component="h2">
                            <div>Specjalizacje: <span style={{color: "#11cb5f"}}>{profileInfo.specializations}</span></div>
                        </Typography>
                        <Typography className={classes.typography} variant="h6" component="h2">
                        Miasto: {profileInfo.city}
                        </Typography>
                        <Typography className={classes.typography} variant="h6" component="h2">
                        Dostępność: {profileInfo.availability}
                        </Typography>
                    </Fragment>
                    : <Typography className={classes.typography} variant="h6" component="h2">
                        Proszę uzupełnić informacje o swoim profilu
                    </Typography> }

            </Paper>
        </Container>
    )
}

function mapStateToProps({auth}) {
    return {auth: auth};
}

export default connect(mapStateToProps)(Profile)