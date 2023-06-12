import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Button,
    Dialog as MaterialDialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import useStyles from './styles';

function HouseDialog({ open, toggleDialog, isAddPage, houseID }) {

    const classes = useStyles();

    const navigate = useNavigate();

    const houseIDReducers = useSelector((state) => state?.VcReducers?.houseID);

    // navigate to house details
    const handleDetails = () => {
        navigate(`/housetableDetails/${houseID ?? houseIDReducers}`);
    };

    return (
        <MaterialDialog open={open} onClose={toggleDialog} className={classes.dialog}>
            <DialogTitle className={classes.dialogTitle}>The risk calculation was carried out successfully</DialogTitle>
            <DialogContent className={classes.dialogContent}>
                {isAddPage && <DialogContentText >Newly created house's ID {houseIDReducers}</DialogContentText>}
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleDetails}
                    className={classes.button}
                >
                    {`Click to see ${!isAddPage ? 'updated ' : ''}the house details`}
                </Button>
            </DialogContent>
        </MaterialDialog>
    );
}

export default HouseDialog;