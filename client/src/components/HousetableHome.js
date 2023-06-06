import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardContent,
} from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';
import useStyles from './styles';
import Header from './HousetableHeader';

function HousetableHome() {

    const classes = useStyles();
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/housetable?pageTitle=add");
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                <Header title={"Welcome to "} />
                <CardContent>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleEdit}
                        className={classes.addButton}
                    >
                        Add House
                    </Button>

                </CardContent>
            </Card>

        </div>
    );
}

export default HousetableHome;