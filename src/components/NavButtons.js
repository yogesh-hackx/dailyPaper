import React from "react";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    },
}));

const NavButtons = (props) => {
    const classes = useStyles();

    const prevPageHandler = () => {
        props.change(-1);
    };

    const nextPageHandler = () => {
        props.change(1);
    };

    const styles = {
        buttonContainer: {
            display: 'flex',
            width: '100px',
            justifyContent: 'space-between',
            margin: '10px 0'
        }
    };

    return (
        <>
            <Backdrop className={classes.backdrop} open={props.loading}>
                <CircularProgress color="inherit" />
            </Backdrop>

            <div style={styles.buttonContainer}>
                <Fab
                    size="small"
                    color="secondary"
                    area-label="Next"
                    onClick={prevPageHandler}
                >
                    <NavigationIcon style={{ transform: "rotate(-90deg)" }} />
                </Fab>
                <Fab
                    size="small"
                    color="primary"
                    area-label="Next"
                    onClick={nextPageHandler}
                >
                    <NavigationIcon style={{ transform: "rotate(90deg)" }} />
                </Fab>
            </div>
        </>
    );
};

export default NavButtons;
