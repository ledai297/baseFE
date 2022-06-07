import {TabProps} from "@material-ui/core";

export interface LinkTabProps extends TabProps{
    label: string,
    to: string,
    value: number
}
