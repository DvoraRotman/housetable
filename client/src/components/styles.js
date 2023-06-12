import { makeStyles } from '@material-ui/core/styles';
import background from "../image/background.png"
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        height: '100vh',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
    },
    card: {
        maxWidth: 800,
        position: 'relative',
        top: '10%',
        marginRight: '50%',
        marginLeft: theme.spacing(5),

    },
    header: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    title: {
        fontWeight: 700,
    },
    addButton: {
        margin: theme.spacing(1),
    },
    listItem: {
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(1),
    },
    listItemText: {
        marginRight: theme.spacing(4),
    },
    detailsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.spacing(1),
    },

    detailsTitle: {
        fontWeight: 700,
        marginBottom: theme.spacing(2),
    },
    detailsText: {
        marginBottom: theme.spacing(1),
    },
    dialogError: {
        color: 'red',
    },
    riskTitle: {
        color: theme.palette.primary.main,
        // fontWeight: 700,
        fontSize: '50px',
        // textAlign: 'center',
        // margin: theme.spacing(2, 0),
    },
}));
export default useStyles;
