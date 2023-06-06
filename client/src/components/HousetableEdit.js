import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
    Card,
    CardContent,
} from '@material-ui/core';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addHouse, setMessage, updateHouseDetails } from '../redux/ht/Action';
import HouseDialog from './HousetableDialog';
import useStyles from './styles';
import Header from './HousetableHeader';


function EditHousetable() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const houseDetails = useSelector((state) => state?.VcReducers?.houseDetails || {});

    useEffect(() => {
        const { currentValue, loanAmount } = houseDetails;
        if (currentValue && loanAmount) {
            setHouse({ currentValue, loanAmount });
        }
    }, [houseDetails]);

    const [house, setHouse] = useState({ address: '', currentValue: '', loanAmount: '' })
    const [open, setOpen] = useState(false);

    const message = useSelector((state) => state?.VcReducers?.message);
    const pageTitle = new URLSearchParams(location.search).get("pageTitle");

    const isAddPage = pageTitle === 'add';

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleSave = () => {
        const requiredFields = ['currentValue', 'loanAmount', ...(isAddPage ? ['address'] : [])];
        const missingField = requiredFields.find(field => !house[field]);
        if (missingField) {
            dispatch(setMessage(`${missingField} is a required field.`));
            return;
        }

        let apiRoute = isAddPage ? addHouse : updateHouseDetails
        try {
            dispatch(apiRoute(house, (status) => {
                if (status) {
                    handleToggle();
                }
            }));
        } catch (error) {
            dispatch(setMessage(error));
        }
    };

    const changeImput = (event) => {

        dispatch(setMessage());
        setHouse({
            ...house,
            [event.target.name]: event.target.type === "number" ? parseFloat(event.target.value) : event.target.value
        });
    }

    const onCancel = () => {
        navigate("/housetable/home");
    };

    return (
        <>
            <div className={classes.root}>
                <Card className={classes.card}>

                    <Header title={`${isAddPage ? 'Add' : 'edit'}`} />

                    <CardContent>
                        {isAddPage && <TextField
                            name="address"
                            label="Address"
                            value={house.address}
                            onChange={changeImput}
                            fullWidth
                            className={classes.dialogTextField}
                        />}
                        <TextField
                            name="currentValue"
                            type='number'
                            label="Current Value"
                            value={house.currentValue}
                            onChange={changeImput} fullWidth
                            className={classes.dialogTextField}
                        />
                        <TextField
                            name="loanAmount"
                            type='number'
                            label="Loan Amount"
                            value={house.loanAmount}
                            onChange={changeImput}
                            fullWidth
                            className={classes.dialogTextField}
                        />
                        {message && <Typography className={classes.dialogError}>{message}</Typography>}
                        <Button onClick={handleSave} color="primary">
                            Calculating the risk of the house
                        </Button>
                        <Button onClick={onCancel} color="primary">
                            Cancel
                        </Button>

                    </CardContent>
                </Card>
                <HouseDialog open={open} handleToggle={handleToggle} isAddPage={isAddPage} />

            </div>

        </>
    );
}

export default EditHousetable;