import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    toTop: {
        Index: 2,
        position: 'fixed',
        bottom: theme.spacing(2),
        backgroundColor: theme.palette.primary.main,
        color: 'black',
        "&:hover, &.Mui-focusVisible": {
            transition: '0.3s',
            color: '#397BA6',
            backgroundColor: theme.palette.secondary.main
        },
        [theme.breakpoints.up('xs')]: {
            right: '5%',
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up('lg')]: {
            right: theme.spacing(2),
        },
    }
})
)
const Scroll = ({
    showBelow,
}) => {

    const classes = useStyles();

    const [show, setShow] = useState(showBelow ? false : true)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!show) setShow(true)
        } else {
            if (show) setShow(false)
        }
    }

    const handleClick = () => {
        window[`scrollTo`]({ top: 0, behavior: `smooth` })
    }

    useEffect(() => {
        if (showBelow) {
            window.addEventListener(`scroll`, handleScroll)
            return () => window.removeEventListener(`scroll`, handleScroll)
        }
    })

    return (
        <div>
            {show &&
                <IconButton size="small" onClick={handleClick} className={classes.toTop} aria-label="to top" component="span">
                    <ExpandLessIcon />
                </IconButton>
            }
        </div>
    )
}
export default Scroll