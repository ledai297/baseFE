import {createStyles, Theme} from "@material-ui/core";

const styles = ((theme: Theme) =>
    createStyles({
        root: {
            flexShrink: 0,
            marginLeft: theme.spacing(2.5),
        },
    }));

export default styles;
