import React from 'react';
import {
    Typography,
    CardHeader,
} from '@material-ui/core';
import useStyles from './styles';


function Header({ title }) {

    const classes = useStyles();

    return (
        <>
            <CardHeader
                className={classes.header}
                title={
                    <Typography variant="h5" className={classes.title}>
                        {title} HouseTable
                    </Typography>
                }
            />
        </>
    );
}

export default Header;