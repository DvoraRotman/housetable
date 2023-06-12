import React, { useEffect, useState } from 'react';
import {
    Button,
    TextField,
    Typography,
} from '@material-ui/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addHouse, getHouseDetails, setMessage, updateHouseDetails } from '../redux/ht/Action';
import HouseDialog from './HousetableDialog';
import useStyles from './styles';
import validate from '../logic/validate';


function HousetableEdit({ toggleExpansion }) {

    const classes = useStyles();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { houseID } = useParams();

    const houseDetails = useSelector((state) => state?.VcReducers?.houseDetails || {});
    const message = useSelector((state) => state?.VcReducers?.message);

    const [house, setHouse] = useState({ address: '', currentValue: '', loanAmount: '' })
    const [open, setOpen] = useState(false);

    const isAddPage = !houseID

    const fields = [
        {
            name: 'address',
            type: 'text',
            label: 'Address',
        },
        {
            name: 'currentValue',
            type: 'number',
            label: 'Current Value',
        },
        {
            name: 'loanAmount',
            type: 'number',
            label: 'Loan Amount',
        }
    ];


    useEffect(() => {

        // if edit- get from db the house details
        if (!isAddPage) {
            const { 'Current Value': currentValue, 'Loan Amount': loanAmount } = houseDetails;
            if (currentValue && loanAmount) {
                setHouse({ currentValue, loanAmount });
            }
            else if (!currentValue && !loanAmount) {
                try {
                    dispatch(getHouseDetails(houseID));
                } catch (error) {
                    dispatch(setMessage(error));
                }

            }
        }
    }, [houseDetails]);


    //to change the state dialog
    const toggleDialog = () => {
        setOpen(!open);
    };
    // navigate to house details
    const handleDetails = () => {
        navigate(`/housetableDetails/${houseID}`);
    };

    //add house
    const handleSave = () => {
        //validation 
        const { status, message } = validate(house, isAddPage);

        if (status === 'failed') {
            dispatch(setMessage(message));
            return
        }

        let apiRoute = isAddPage ? addHouse : updateHouseDetails
        const dataToSend = !isAddPage ? { ...house, id: houseID } : house;

        try {
            dispatch(apiRoute(dataToSend, toggleDialog));
        } catch (error) {
            dispatch(setMessage(error));
        }
    };

    //update state
    const changeInput = (event) => {

        dispatch(setMessage());
        setHouse({
            ...house,
            [event.target.name]: event.target.type === "number" ? parseFloat(event.target.value) : event.target.value
        });
    }

    return (
        <>

            {fields.map(field => (
                (isAddPage || field.name !== 'address' && !isAddPage) ? (
                    <TextField
                        key={field.name}
                        value={house[field.name]}
                        onChange={changeInput}
                        fullWidth={true}
                        className={classes.dialogTextField}
                        {...field}
                    />
                ) : null
            ))}
            {message && <Typography className={classes.dialogError}>{message}</Typography>}
            <Button onClick={handleSave} color="primary">

                {isAddPage ? "Calculating the risk of the house" : "Updating the house details"}            </Button>
            <Button onClick={() => {
                if (isAddPage) {
                    toggleExpansion();
                } else {
                    handleDetails();
                }
                dispatch(setMessage());
            }} color="primary">
                Cancel
            </Button>

            <HouseDialog open={open} toggleDialog={toggleDialog} isAddPage={isAddPage} houseID={houseID} />


        </>
    );
}

export default HousetableEdit;