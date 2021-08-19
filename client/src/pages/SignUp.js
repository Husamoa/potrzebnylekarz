import React, {useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Divider} from "@material-ui/core";
import GoogleButton from "react-google-button";
import {Link} from "react-router-dom";
import {Controller, useForm} from "react-hook-form";
import ValidationUtils from "../utils/ValidationUtils";
import {connect} from "react-redux";
import * as actions from "../actions";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    divider: {
        marginBottom: theme.spacing(2),
        width: "100%"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = (props) => {
    const classes = useStyles();
    const {handleSubmit, control, register, getValues} = useForm();

    useEffect(() => {
        if (props.auth) {
            props.history.push('/profile')
        }
    })

    const loginWithGoogle = () => {
        window.open('/auth/google', "_self")
    }

    const onSubmit = (data) => {
        console.log('SignUp data', data)
        props.registerUser(data)
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Zarejestruj się
                </Typography>
                <Divider className={classes.divider}/>
                <GoogleButton onClick={loginWithGoogle} style={{width: "100%", marginBottom: "5%"}} type={"dark"}
                              label={"Kontynuuj przez portal Google"}/>
                <form className={classes.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={"firstName"}
                                control={control}
                                defaultValue={''}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        autoComplete="fname"
                                        variant="outlined"
                                        fullWidth
                                        id="firstName"
                                        label="First Name"
                                        autoFocus
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                rules={{required: 'Pole imię jest wymagane'}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Controller
                                name={"lastName"}
                                control={control}
                                defaultValue={''}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="lastName"
                                        label="Nazwisko"
                                        autoComplete="lname"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                rules={{required: 'Pole nazwisko jest wymagane'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"username"}
                                control={control}
                                defaultValue={''}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Adres email"
                                        autoComplete="email"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                rules={{required: 'Pole email jest wymagane'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"password"}
                                control={control}
                                defaultValue={''}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Hasło"
                                        type="password"
                                        id="password"
                                        autoComplete="current-password"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                    />
                                )}
                                rules={{required: 'Pole hasło jest wymagane'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Controller
                                name={"passwordConfirmation"}
                                control={control}
                                defaultValue={''}
                                render={({field: {onChange, value}, fieldState: {error}}) => (
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label="Powtórz hasło"
                                        type="password"
                                        id="passwordConfirmation"
                                        value={value}
                                        onChange={onChange}
                                        error={!!error}
                                        helperText={error ? error.message : null}
                                        inputRef={register("passwordConfirmation", {
                                            validate: () => ValidationUtils.confirmPassword(value, getValues('password'))
                                        })}
                                    />
                                )}
                                rules={{required: 'Pole hasło jest wymagane'}}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary"/>}
                                label="Chcę otrzymywać wiadomośći marketingowe na ten adres email"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Zarejestruj
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link to={"/sing-in"} variant="body2">
                                Masz już konto? Zaloguj się
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}
function mapStateToProps({auth}) {
    return {auth: auth};
}

export default connect(mapStateToProps, actions)(SignUp);