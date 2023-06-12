import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getHouseDetails, setMessage } from '../redux/ht/Action';
import Header from './HousetableHeader';
import useStyles from './styles';

function HousetableDetails() {

    const classes = useStyles();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { houseID } = useParams();
    const [houseDetailsStatus, setHouseDetailsStatus] = useState(false);

    const houseDetails = useSelector((state) => state?.VcReducers?.houseDetails);

    // to change the state of the form 
    const toggleDetails = () => {
        setHouseDetailsStatus(!houseDetailsStatus);
    };
    // navigate to edit house 
    const handleEdit = () => {
        navigate(`/housetable/${houseID}`);
    };

    // get home details when refreshing
    useEffect(() => {
        try {
            dispatch(getHouseDetails(houseID, toggleDetails));
        } catch (error) {
            console.log(error);
        }

    }, []);
    return (
        <>
            <div className={classes.root}>
                <Card className={classes.card}>
                    <Header title={"Details "} />

                    <CardContent>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleEdit}
                            className={classes.addButton}
                        >
                            Edit Details House
                        </Button>
                        {houseDetailsStatus && <Grid container direction="column" spacing={2} className={classes.detailsContainer}  >
                            {Object.keys(houseDetails).map((key) => (
                                <Grid item key={key}>
                                    <Typography className={key === 'Risk' ? classes.riskTitle : classes.detailsText} >
                                        {[key]}:  {houseDetails[key]}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>}
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default HousetableDetails;