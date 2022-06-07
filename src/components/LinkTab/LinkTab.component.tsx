import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {Link, Tab, Tooltip} from "@material-ui/core";
import {LinkTabProps} from "./LinkTab.types";

function LinkTab(props: LinkTabProps) {
    const { to, label, value } = props;
    const {ref, ...rest} = props
    return (
        <Tab
            component={(rest) => 
                <Link to={to} component={RouterLink} underline="none" {...rest}>
                    {
                        label !== null && label.length > 20 ?
                        <Tooltip title={label}><span>{label}</span></Tooltip>
                        :
                        <span>{label}</span>
                    }
                    
                </Link>}
            {...rest}
        />
    );
}

export default LinkTab;
