import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Dialog as MaterialDialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import useStyles from './styles';

function HouseDialog({ open, handleToggle, isAddPage }) {
    const navigate = useNavigate();
    const classes = useStyles();

    const houseID = useSelector((state) => state?.VcReducers?.houseID);

    const handleDetails = () => {
        navigate("/housetable/details");
    };

    return (
        <MaterialDialog open={open} onClose={handleToggle} className={classes.dialog}>
            <DialogTitle className={classes.dialogTitle}>The risk calculation was carried out successfully</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {isAddPage && <DialogContentText >Newly created house's ID {houseID}</DialogContentText>}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleDetails}
                    className={classes.button}
                >
                    Click to see the house details
                </Button>
            </DialogContent>
        </MaterialDialog>
    );
}

export default HouseDialog;