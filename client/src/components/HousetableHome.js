import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import useStyles from './styles';
import Header from './HousetableHeader';
import EditHousetable from './HousetableEdit';

function HousetableHome() {

    const classes = useStyles();
    const { houseID } = useParams();

    const [isExpanded, setIsExpanded] = useState(houseID ? true : false);

    //to change the state of the form to add a house or to edit an existing house
    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Header title={!isExpanded ? "Welcome to " : houseID ? "Edit Details" : "Add"} />
                <CardContent>
                    {!isExpanded ?
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={toggleExpansion}
                            className={classes.addButton}
                        >
                            Add House
                        </Button>
                        : <EditHousetable toggleExpansion={toggleExpansion} />}
                </CardContent>
            </Card>

        </div>
    );
}

export default HousetableHome;