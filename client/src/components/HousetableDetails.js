import React from 'react';
import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useStyles from './styles';
import Header from './HousetableHeader';

function HousetableDetails() {

    const classes = useStyles();
    const navigate = useNavigate();

    const houseDetails = useSelector((state) => state?.VcReducers?.houseDetails);

    const handleEdit = () => {
        navigate("/housetable?pageTitle=edit");

    };

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
                        <Grid container direction="column" spacing={2} className={classes.detailsContainer}>

                            <Grid item>
                                <Typography className={classes.detailsText} variant="body1">
                                    ID: {houseDetails?.id}
                                </Typography>
                                <Typography className={classes.detailsText} variant="body1">
                                    Address: {houseDetails?.address
                                    }
                                </Typography>
                                <Typography className={classes.detailsText} variant="body1">
                                    Current Value: {houseDetails?.currentValue}
                                </Typography>
                                <Typography className={classes.detailsText} variant="body1">
                                    Loan Amount: {houseDetails?.loanAmount}
                                </Typography>
                            </Grid>
                            <Typography className={classes.riskTitle} variant="h6">
                                Risk: {houseDetails?.risk}
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export default HousetableDetails;