import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import {Tooltip} from "@material-ui/core";
import {connect} from "react-redux";
import * as actions from "../actions";
import {Controller, useForm} from "react-hook-form";
import ValidationUtils from "../utils/ValidationUtils";


const UpdateInfoDialog = (props) => {
    const [open, setOpen] = React.useState(false);
    const { handleSubmit, control, register } = useForm();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (commit = false, data = null) => {
        if (commit) {
            props.updateProfile(data);
        }
        setOpen(false);
    };

    return (
        <div>
            <Tooltip title={"Edytuj informacje"} >
                <IconButton onClick={handleClickOpen} >
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Dialog open={open} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
                <form onSubmit={handleSubmit((data) => handleClose(true, data))}>
                <DialogContent>
                    <DialogContentText>
                        Proszę uzupełnić informacje dotyczące profilu. Po sprawdzeniu poprawności danych przez administratora, profil będzie pojawiać się w wynikach wyszukiwania.
                    </DialogContentText>
                    <Controller
                        name={"PWZNumber"}
                        control={control}
                        defaultValue={props.auth.profileInfo.PWZNumber}
                        render={({ field: {onChange, value}, fieldState: { error } }) => (
                        <TextField
                            autoFocus
                            margin="dense"
                            id={"PWZNumber"}
                            label="Numer PWZ"
                            type={"number"}
                            fullWidth
                            value={value}
                            onChange={onChange}
                            disabled={props.auth.profileInfo.PWZNumber}
                            error={!!error}
                            helperText={error ? error.message : null}
                            inputRef={register("PWZNumber", {
                                validate: ValidationUtils.validatePWZ
                            })}
                        />
                    )}
                    rules={{ required: 'Numer PWZ jest wymagany' }}
                    />
                    <Controller
                        name={"specializations"}
                        control={control}
                        defaultValue={props.auth.profileInfo.specializations}
                        render={({ field: {onChange, value}, fieldState: { error } }) => (
                        <TextField
                            name={"specializations"}
                            margin="dense"
                            id="specializations"
                            label="Specjalizacje"
                            type={"text"}
                            fullWidth
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={{ required: 'Pole specjalizacje jest wymagane' }}
                    />
                    <Controller
                        name={"city"}
                        control={control}
                        defaultValue={props.auth.profileInfo.city}
                        render={({ field: {onChange, value}, fieldState: { error } }) => (
                        <TextField
                            name={"city"}
                            margin="dense"
                            id="city"
                            label="Miasto"
                            type={"text"}
                            fullWidth
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={{ required: 'Pole miasto jest wymagane' }}
                    />
                    <Controller
                        name={"availability"}
                        control={control}
                        defaultValue={props.auth.profileInfo.availability}
                        render={({ field: {onChange, value}, fieldState: { error } }) => (
                        <TextField
                            name={"availability"}
                            margin="dense"
                            id="availability"
                            label="Dostępność"
                            type={"text"}
                            fullWidth
                            onChange={onChange}
                            value={value}
                            error={!!error}
                            helperText={error ? error.message : null}
                        />
                        )}
                        rules={{ required: 'Pole dostępność jest wymagane' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose(false)} color="primary">
                        Anuluj
                    </Button>
                    <Button type={'submit'} color="primary">
                        Zapisz
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
        </div>
    );
}

function mapStateToProps({auth}) {
    return {auth: auth};
}

export default connect(mapStateToProps, actions)(UpdateInfoDialog)
